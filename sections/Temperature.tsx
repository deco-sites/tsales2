import weather, { Temperature } from "apps/weather/loaders/temperature.ts";

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

export default function Temperature(
  { text, temperature }: SectionProps<typeof loader>,
) {
  return (
    <div class="temperature-container text-center block mt-10 mb-10 bg-red-500">
      <div class="temperature-description  lg:text-3xl d-flex">
        <span class="text-base block">{text}</span>
        <span>{temperature?.celsius}°C</span>
      </div>
    </div>
  );
}
