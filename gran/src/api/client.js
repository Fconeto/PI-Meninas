const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class ApiClient {
  constructor() {
    this.baseUrl = API_BASE;
  }

  getToken() {
    return localStorage.getItem('access_token');
  }

  setToken(token) {
    if (token) localStorage.setItem('access_token', token);
    else localStorage.removeItem('access_token');
  }

  getRefreshToken() {
    return localStorage.getItem('refresh_token');
  }

  setRefreshToken(token) {
    if (token) localStorage.setItem('refresh_token', token);
    else localStorage.removeItem('refresh_token');
  }

  async request(endpoint, options = {}) {
    const token = this.getToken();
    const headers = {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    };

    const config = {
      ...options,
      headers,
    };

    if (config.body && typeof config.body === 'object' && !(config.body instanceof FormData)) {
      config.body = JSON.stringify(config.body);
    }

    if (config.body instanceof FormData) {
      delete headers['Content-Type'];
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, config);

    if (response.status === 401) {
      const refreshToken = this.getRefreshToken();
      if (refreshToken && !endpoint.includes('refresh-token')) {
        try {
          const refreshResponse = await this.request('/auth/refresh-token', {
            method: 'POST',
            body: JSON.stringify({ refreshToken }),
          });
          if (refreshResponse.success) {
            this.setToken(refreshResponse.data.accessToken);
            this.setRefreshToken(refreshResponse.data.refreshToken);
            headers.Authorization = `Bearer ${refreshResponse.data.accessToken}`;
            const retryResponse = await fetch(`${this.baseUrl}${endpoint}`, { ...config, headers });
            return this.handleResponse(retryResponse);
          }
        } catch {
          this.setToken(null);
          this.setRefreshToken(null);
          window.location.href = '/login';
        }
      }
    }

    return this.handleResponse(response);
  }

  async handleResponse(response) {
    const data = await response.json();
    if (!response.ok) {
      const error = new Error(data.message || 'Erro na requisição');
      error.status = response.status;
      error.data = data;
      throw error;
    }
    return data;
  }

  get(endpoint, params = {}) {
    const query = Object.entries(params)
      .filter(([_, v]) => v !== undefined && v !== null && v !== '')
      .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
      .join('&');
    const url = query ? `${endpoint}?${query}` : endpoint;
    return this.request(url, { method: 'GET' });
  }

  post(endpoint, body) {
    return this.request(endpoint, { method: 'POST', body });
  }

  put(endpoint, body) {
    return this.request(endpoint, { method: 'PUT', body });
  }

  patch(endpoint, body) {
    return this.request(endpoint, { method: 'PATCH', body });
  }

  delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' });
  }

  upload(endpoint, file) {
    const formData = new FormData();
    formData.append('file', file);
    return this.request(endpoint, { method: 'POST', body: formData });
  }
}

export const api = new ApiClient();

const API_ORIGIN = new URL(API_BASE).origin;

export function formatImageUrl(url) {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  return `${API_ORIGIN}${url}`;
}
