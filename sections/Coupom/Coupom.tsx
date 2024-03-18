import Header from "../../components/ui/SectionHeader.tsx";

export interface Props {
  code?: string;
  text?: string;
}

const Coupom = ({ code, text }: Props) => {
  const cContent = code ? <span>{code}</span> : "";
  return (
    <div class="coupom-area">
      <Header
        title={text || "BlogPosts"}
        fontSize={"Normal"}
        alignment={"center"}
      />

      {cContent}
    </div>
  );
};

export default Coupom;
