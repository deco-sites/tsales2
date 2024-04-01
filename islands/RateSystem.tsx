import { useEffect, useMemo, useState } from "preact/hooks";
import { useSignal } from "@preact/signals";

const iconUnrated =
  `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-mood-smile"> <path stroke="none" d="M0 0h24v24H0z" fill="none"/> <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"/> <path d="M9 10l.01 0"/> <path d="M15 10l.01 0"/> <path d="M9.5 15a3.5 3.5 0 0 0 5 0"/></svg>`;
const iconRated =
  `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-mood-check"> <path stroke="none" d="M0 0h24v24H0z" fill="none"/> <path d="M20.925 13.163a8.998 8.998 0 0 0 -8.925 -10.163a9 9 0 0 0 0 18"/> <path d="M9 10h.01"/> <path d="M15 10h.01"/> <path d="M9.5 15c.658 .64 1.56 1 2.5 1s1.842 -.36 2.5 -1"/> <path d="M15 19l2 2l4 -4"/></svg>`;
const totalRated =
  `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-friends"> <path stroke="none" d="M0 0h24v24H0z" fill="none"/> <path d="M7 5m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"/> <path d="M5 22v-5l-1 -1v-4a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4l-1 1v5"/> <path d="M17 5m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"/> <path d="M15 22v-4h-2l2 -6a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1l2 6h-2v4"/></svg>`;

export interface Props {
  infinite?: boolean;
  initialRates?: number;
}

export default function RateSystem({ infinite, initialRates }: Props) {
  const [voted, setVoted] = useState(false);
  const rates = useSignal(initialRates ?? 0);

  const increment = () => {
    rates.value++;
    if (!infinite) {
      setVoted(true);
    }
  };

  const decrement = () => {
    rates.value--;
    setVoted(false);
  };

  return (
    <div class="border p-5 flex justify-between items-center">
      <button
        class={`text-sm p-2 border rounded-sm cursor-pointer text-center ` +
          (voted ? "bg-black text-white" : "")}
        onClick={voted ? decrement : increment}
      >
        <span
          class="text-gray-600 flex justify-center"
          dangerouslySetInnerHTML={{ __html: voted ? iconRated : iconUnrated }}
        >
        </span>{" "}
        {voted ? "Votou" : "Votar"}
      </button>
      <div className="total-rates border text-center">
        <span
          class="text-gray-600 flex justify-center"
          dangerouslySetInnerHTML={{ __html: totalRated }}
        >
        </span>{" "}
        <strong>{rates.value}</strong> Votos
      </div>
    </div>
  );
}
