using FluentValidation;
using GranForno.Application.DTOs.Settings;

namespace GranForno.Application.Validators
{
    public class UpdateSettingsRequestValidator : AbstractValidator<UpdateSettingsRequest>
    {
        public UpdateSettingsRequestValidator()
        {
            RuleFor(x => x.Telefone).MaximumLength(20);
            RuleFor(x => x.WhatsApp).MaximumLength(20);
            RuleFor(x => x.DeliveryUrl).MaximumLength(500);
            RuleFor(x => x.Endereco).MaximumLength(500);
            RuleFor(x => x.HorarioFuncionamento).MaximumLength(500);
            RuleFor(x => x.TotalMesas).GreaterThanOrEqualTo(0).When(x => x.TotalMesas.HasValue);
            RuleFor(x => x.CapacidadePorMesa).GreaterThanOrEqualTo(1).When(x => x.CapacidadePorMesa.HasValue);
            RuleFor(x => x.MaxReservasPorHorario).GreaterThanOrEqualTo(0).When(x => x.MaxReservasPorHorario.HasValue);
        }
    }
}
