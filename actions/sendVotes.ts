import { AppContext } from "deco-sites/tsales2/apps/site.ts";

export interface sendVotesProps {
  productID: string;
}

export default async function sendVotes(
  props: sendVotesProps,
  _req: Request,
  _ctx: AppContext,
) {
  const data = { productId: props.productID };

  const response = await fetch("https://camp-api.deco.cx/event", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": "tsales2",
    },
    body: JSON.stringify(data),
  });

  return response.json();
}
