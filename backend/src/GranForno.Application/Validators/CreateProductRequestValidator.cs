using FluentValidation;
using GranForno.Application.DTOs.Product;

namespace GranForno.Application.Validators
{
    public class CreateProductRequestValidator : AbstractValidator<CreateProductRequest>
    {
        public CreateProductRequestValidator()
        {
            RuleFor(x => x.Nome).NotEmpty().MaximumLength(200);
            RuleFor(x => x.Preco).GreaterThan(0).WithMessage("Preço deve ser maior que zero");
            RuleFor(x => x.Categoria).NotEmpty().MaximumLength(100);
            RuleFor(x => x.Descricao).MaximumLength(1000);
            RuleFor(x => x.Ingredientes).MaximumLength(1000);
            RuleFor(x => x.Observacoes).MaximumLength(500);
            RuleFor(x => x.Imagem).MaximumLength(500);
        }
    }
}
