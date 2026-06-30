using GranForno.Domain.Entities;

namespace GranForno.Application.Interfaces
{
    public interface ITokenService
    {
        string GenerateAccessToken(User user);
    }
}
