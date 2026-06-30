using FluentValidation;
using GranForno.Application.DTOs.Reservation;
using GranForno.Domain.Enums;

namespace GranForno.Application.Validators
{
    public class CreateReservationRequestValidator : AbstractValidator<CreateReservationRequest>
    {
        public CreateReservationRequestValidator()
        {
            RuleFor(x => x.Tipo)
                .NotEmpty()
                .Must(t => t == "mesa" || t == "ambiente")
                .WithMessage("Tipo deve ser 'mesa' ou 'ambiente'");

            RuleFor(x => x.Data)
                .NotEmpty()
                .Must(d => d.Date >= DateTime.UtcNow.Date)
                .WithMessage("Data não pode ser no passado");

            RuleFor(x => x.Horario).NotEmpty();
            RuleFor(x => x.QuantidadePessoas).InclusiveBetween(1, 100);
            RuleFor(x => x.TipoEvento).MaximumLength(100);
            RuleFor(x => x.Decoracao).MaximumLength(500);
            RuleFor(x => x.Observacoes).MaximumLength(1000);
        }
    }
}
