using AutoMapper;
using GranForno.Application.DTOs.Auth;
using GranForno.Application.DTOs.Gallery;
using GranForno.Application.DTOs.Product;
using GranForno.Application.DTOs.Reservation;
using GranForno.Application.DTOs.Settings;
using GranForno.Domain.Entities;

namespace GranForno.Application.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<User, UserDto>();
            CreateMap<Product, ProductDto>();
            CreateMap<GalleryImage, GalleryImageDto>();
            CreateMap<Reservation, ReservationDto>();
            CreateMap<RestaurantSetting, SettingsDto>()
                .ForMember(dest => dest.HorariosDisponiveis, opt =>
                    opt.MapFrom(src => DeserializeHorarios(src.HorariosDisponiveis)));
        }

        private static List<string> DeserializeHorarios(string? json)
        {
            if (string.IsNullOrEmpty(json))
                return new List<string>();
            try
            {
                return System.Text.Json.JsonSerializer.Deserialize<List<string>>(json) ?? new List<string>();
            }
            catch
            {
                return new List<string>();
            }
        }
    }
}
