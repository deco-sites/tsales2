import { useEffect, useMemo, useState } from "preact/hooks";
import { useSignal } from "@preact/signals";
import { invoke } from "deco-sites/tsales2/runtime.ts";
import Swal from "npm:sweetalert2@11.0.17";
import { total } from "deco-sites/tsales2/sdk/useTotalVotes.ts";
import { sendEvent } from "../sdk/analytics.tsx";

const iconUnrated =
  `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-mood-smile"> <path stroke="none" d="M0 0h24v24H0z" fill="none"/> <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"/> <path d="M9 10l.01 0"/> <path d="M15 10l.01 0"/> <path d="M9.5 15a3.5 3.5 0 0 0 5 0"/></svg>`;
const iconRated =
  `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-mood-check"> <path stroke="none" d="M0 0h24v24H0z" fill="none"/> <path d="M20.925 13.163a8.998 8.998 0 0 0 -8.925 -10.163a9 9 0 0 0 0 18"/> <path d="M9 10h.01"/> <path d="M15 10h.01"/> <path d="M9.5 15c.658 .64 1.56 1 2.5 1s1.842 -.36 2.5 -1"/> <path d="M15 19l2 2l4 -4"/></svg>`;
const totalRated =
  `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-friends"> <path stroke="none" d="M0 0h24v24H0z" fill="none"/> <path d="M7 5m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"/> <path d="M5 22v-5l-1 -1v-4a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4l-1 1v5"/> <path d="M17 5m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"/> <path d="M15 22v-4h-2l2 -6a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1l2 6h-2v4"/></svg>`;

export interface Props {
  productID: string;
}

export default function RateSystem({ productID }: Props) {
  const [voted, setVoted] = useState(false);
  const rates = useSignal(0);

  useEffect(() => {
    const totalVotesHere = async (productID: string) => {
      const totalVotesProduct = await invoke["deco-sites/tsales2"].loaders
        .totalVotesProduct({ productID });
      rates.value = totalVotesProduct.product;
    };

    const getTotalVotes = async () => {
      const totalVotes = await invoke["deco-sites/tsales2"].loaders
        .totalVotes();

      total.value = totalVotes.total;
    };

    totalVotesHere(productID);
    getTotalVotes();

    setInterval(getTotalVotes, 30000);
  }, [productID]);

  const increment = async (productID: string) => {
    rates.value++;
    setVoted(true);

    await invoke["deco-sites/tsales2"].actions.sendVotes({
      productID: productID,
    });

    const votes = await invoke["deco-sites/tsales2"].loaders
      .totalVotes();

    total.value = votes.total;

    Swal.fire({
      position: "top-end",
      icon: "success",
      text: "Obrigado por curtir este produto!",
      showConfirmButton: false,
      timer: 1500,
    });

    sendEvent({
      name: "post_score",
      params: {
        score: rates.value,
      },
    });
  };

  return (
    <button
      class="text-sm p-2 cursor-pointer text-center flex justify-center items-sub gap-3"
      onClick={() => increment(productID)}
    >
      <div>
        <span
          class="text-gray-600 flex justify-center"
          dangerouslySetInnerHTML={{ __html: voted ? iconRated : iconUnrated }}
        >
        </span>{" "}
        {voted ? "Votou" : "Votar"}
      </div>
      <div class="mt-2 text-lg font-bold border-l-4 border-indigo-500">
        {rates.value}
      </div>
    </button>
  );
}
