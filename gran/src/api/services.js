import { api } from './client';

export const authService = {
  login: (email, password) =>
    api.post('/auth/login', { email, password }),

  register: (data) =>
    api.post('/auth/register', data),

  me: () =>
    api.get('/auth/me'),

  updateProfile: (data) =>
    api.put('/auth/profile', data),

  changePassword: (data) =>
    api.post('/auth/change-password', data),

  refreshToken: (refreshToken) =>
    api.post('/auth/refresh-token', { refreshToken }),

  logout: (refreshToken) =>
    api.post('/auth/logout', { refreshToken }),

  forgotPassword: (email) =>
    api.post('/auth/forgot-password', { email }),

  resetPassword: (token, newPassword) =>
    api.post('/auth/reset-password', { token, newPassword }),
};

export const productsService = {
  getAll: (params = {}) =>
    api.get('/products', params),

  getById: (id) =>
    api.get(`/products/${id}`),

  create: (data) =>
    api.post('/products', data),

  update: (id, data) =>
    api.put(`/products/${id}`, data),

  delete: (id) =>
    api.delete(`/products/${id}`),
};

export const galleryService = {
  getAll: (params = {}) =>
    api.get('/gallery', params),

  getById: (id) =>
    api.get(`/gallery/${id}`),

  create: (data) =>
    api.post('/gallery', data),

  update: (id, data) =>
    api.put(`/gallery/${id}`, data),

  delete: (id) =>
    api.delete(`/gallery/${id}`),
};

export const reservationsService = {
  getAll: () =>
    api.get('/reservations'),

  getMy: () =>
    api.get('/reservations/my'),

  getById: (id) =>
    api.get(`/reservations/${id}`),

  create: (data) =>
    api.post('/reservations', data),

  updateStatus: (id, status) =>
    api.patch(`/reservations/${id}/status`, { status }),

  getAvailability: (params = {}) =>
    api.get('/reservations/availability', params),
};

export const settingsService = {
  get: () =>
    api.get('/settings'),

  update: (data) =>
    api.put('/settings', data),
};

export const uploadService = {
  upload: (file) =>
    api.upload('/upload', file),
};

export const adminService = {
  getDashboard: () =>
    api.get('/admin/dashboard'),
};
