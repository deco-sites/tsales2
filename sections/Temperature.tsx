import weather from "apps/weather/loaders/temperature.ts";

import type { SectionProps } from "deco/types.ts";

export interface Props {
  text: string;
}

export const loader = async (props: Props, req: Request) => {
  const temperature = await weather({
    lat: -22.8709,
    long: -43.3676,
  }, req);

  return { ...props, temperature };
};

export default function currentTemperature(
  { text, temperature }: SectionProps<typeof loader>,
) {
  return (
    <div class="temperature-container text-center xl:container xl:mx-auto mx-5 md:mx-10 py-10 md:py-24">
      <div class="temperature-description  lg:text-3xl d-flex">
        <h1 class="font-bold text-base-content text-[40px] leading-[120%]">
          Culturas
        </h1>
        <p class="text-base">{text}</p>
        <span>{temperature?.celsius}°C</span>
      </div>
    </div>
  );
}
