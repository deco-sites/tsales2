import { AppContext } from "deco-sites/tsales2/apps/site.ts";

export interface totalVotesProductProps {
  productID: string;
}

export default async function totalVotesProduct(
  props: totalVotesProductProps,
  _req: Request,
  _ctx: AppContext,
) {
  const response = await fetch(
    `https://camp-api.deco.cx/event/${props.productID}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "tsales2",
      },
    },
  );

  return response.json();
}
