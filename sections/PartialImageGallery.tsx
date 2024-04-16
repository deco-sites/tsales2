import { ImageWidget } from "apps/admin/widgets.ts";

import { usePartialSection } from "deco/hooks/usePartialSection.ts";

export interface Props {
  title: string;
  images: ImageWidget[];
  showQuantity: number;
}

export default function PartialImageGallery(
  { title, images, showQuantity }: Props,
) {
  return (
    <div>
      <h1 class="font-bold text-base-content text-[40px] leading-[120%] text-center">
        {title}
      </h1>
      <div className="flex flex-wrap gap-2 md:gap-4 justify-center mb-5">
        {images.slice(0, showQuantity).map((image, index) => {
          return (
            <div className="w-40 md:w-72 md:h-48 md:max-h-48 flex justify-center items-center overflow-hidden rounded md:rounded-xl duration-300 hover:scale-110">
              <img
                width={304}
                height={200}
                key={index}
                src={image}
                alt={image}
              />
            </div>
          );
        })}
      </div>

      {showQuantity < images.length && (
        <div className="flex justify-center items-center">
          <button
            className="btn btn-primary"
            {...usePartialSection({
              mode: "replace",
              props: { showQuantity: showQuantity + 1 },
            })}
          >
            Ver mais
          </button>
        </div>
      )}
    </div>
  );
}
