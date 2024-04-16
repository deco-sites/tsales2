import RateSystem from "../islands/RateSystem.tsx";

export default function RateProduct() {
  return (
    <div class="p-16">
      <div className="rate">
        <h4>Produto 01</h4>
        <RateSystem productID="1" />
      </div>
      <hr />
      <div className="rate">
        <h4>Produto 02</h4>
        <RateSystem productID="2" />
      </div>
    </div>
  );
}
