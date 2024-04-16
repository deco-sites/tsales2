import RateSystem from "../islands/RateSystem.tsx";

import { useOffer } from "../sdk/useOffer.ts";
import { productFlag } from "../flags/productFlag.ts";

import Image from "apps/website/components/Image.tsx";

export interface Props {
  titleShelf?: string;
  productsVtex?: productFlag;
  animateImage: boolean;
}

export function ErrorFallback(error: Error) {
  return (
    <div className="w-full max-w-5xl flex sm:flex-col md:flex-row items-start md:items-center gap-6 my-12 p-6 rounded-xl mt-2 bg-zinc-200 mx-auto">
      <div className="w-full md:w-1/3 flex justify-center md:justify-start">
        <figure>
          <Image
            class="card"
            src="/image/produto-teste2.png"
            alt="Cultura da Loja"
            width={160}
            height={195}
            loading="lazy"
          />
        </figure>
      </div>
      <div className="w-full md:w-2/3 flex flex-col md:flex-row">
        <div className="w-full md:w-1/2">
          <h2 className="text-gray-900 font-bold">Cultura da Loja</h2>
          <p className="mt-2 text-gray-600 text-sm line-clamp-1 md:line-clamp-3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Necessitatibus mollitia architecto vel obcaecati nisi libero
            voluptatem nesciunt.
          </p>
        </div>
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start">
          <a href="/culturas">
            <button className="bg-black text-white border font-bold p-2 rounded h-7 btn no-animatio mt-4 md:mt-0">
              para saber mais
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}

export function LoadingFallback() {
  return (
    <div className="text-center flex justify-center mt-6 mb-6">
      <span class="loading loading-spinner" />
    </div>
  );
}

export default function HorizontalProductCard(
  { titleShelf, animateImage, productsVtex }: Props,
) {
  if (!productsVtex?.length) {
    return ErrorFallback(new Error("Sem produtos para renderizar"));
  }

  function formatCurrency(amount: number, prefix = "R$ ") {
    const value = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    })
      .format(amount)
      .replace(/R\$\s{1}/g, prefix);
    return value;
  }

  return (
    <div className="w-full max-w-5xl px-4 mx-auto py-8 lg:py-10 flex flex-col gap-8 lg:gap-10 mb-10">
      <h1 class="text-2xl font-light leading-8 lg:leading-10 text-base-content lg:text-3xl text-center">
        {titleShelf}
      </h1>
      {productsVtex?.map((product) => {
        const productID = product.productID;
        const image = product.image[0].url;
        const productName = product.name;
        const productDescription = product.description;
        const productListPrice = product.offers.lowPrice;
        const productPrice = product.offers.highPrice;
        const productUrl = product.url;

        const { listPrice, price } = useOffer(product.offers);

        return (
          <div class="flex flex-col md:flex-row gap-3 sm:gap-4 md:gap-8 flex-1 items-center sm:items-start text-center">
            <div className="flex flex-col gap-1 md:gap-8 flex-1 sm:pr-20 md:pr-0">
              <figure>
                <Image
                  class="card"
                  src={image}
                  alt={productName}
                  width={160}
                  height={195}
                  loading="lazy"
                  className={`w-48 md:w-48 duration-300 ${
                    animateImage ? "hover:scale-110" : ""
                  }`}
                />
              </figure>
            </div>

            <div className="w-full md:w-2/3 flex flex-col md:flex-row">
              <div className="w-full md:w-1/2">
                <h2 className="text-gray-900 font-bold">{productName}</h2>
                <p className="mt-2 text-gray-600 text-sm line-clamp-1 md:line-clamp-3">
                  {productDescription}
                </p>
              </div>
              <div className="w-full md:w-1/2 flex flex-col items-center">
                <div className="grid">
                  {!!listPrice && <s>{formatCurrency(listPrice)}</s>}

                  {!!price && (
                    <span className="text-gray-900 font-bold text-center text-xl">
                      {formatCurrency(price)}
                    </span>
                  )}
                </div>

                <div className="grid">
                  <a href={productUrl}>
                    <button className="w-48 bg-black text-white border font-bold p-2 rounded h-7 btn no-animatio mt-3 mb-4 md:mt-0">
                      Ver produto
                    </button>
                  </a>
                </div>
              </div>
            </div>
            <RateSystem productID={productID} />
          </div>
        );
      })}
    </div>
  );
}
