using FluentValidation;
using GranForno.Application.DTOs.Gallery;

namespace GranForno.Application.Validators
{
    public class CreateGalleryImageRequestValidator : AbstractValidator<CreateGalleryImageRequest>
    {
        public CreateGalleryImageRequestValidator()
        {
            RuleFor(x => x.Titulo).NotEmpty().MaximumLength(200);
            RuleFor(x => x.Imagem).NotEmpty().MaximumLength(500);
            RuleFor(x => x.Descricao).MaximumLength(500);
            RuleFor(x => x.Categoria).MaximumLength(100);
        }
    }
}
