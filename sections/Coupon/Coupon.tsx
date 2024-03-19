import Header from "../../components/ui/SectionHeader.tsx";

export interface Props {
  code?: string;
  text?: string;
}

const Coupon = ({ code, text }: Props) => {
  const cContent = code
    ? (
      <span class="text-center border border-dashed border-2 border-sky-500 p-2">
        {code}
      </span>
    )
    : "";
  return (
    <div class="coupom-area">
      <Header
        title={text || "BlogPosts"}
        fontSize={"Normal"}
        alignment={"center"}
      />

      <div class="text-center mt-10 mb-10">{cContent}</div>
    </div>
  );
};

export default Coupon;
