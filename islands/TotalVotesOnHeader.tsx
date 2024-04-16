import { total } from "deco-sites/tsales2/sdk/useTotalVotes.ts";
import Icon from "deco-sites/tsales2/components/ui/Icon.tsx";

export default function TotalVotesOnHeader() {
  return (
    <div class="flex items-center text-xs font-thin gap-1">
      <Icon id="Heart" size={24} strokeWidth={0.4} /> {total.value}
    </div>
  );
}
