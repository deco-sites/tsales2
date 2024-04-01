import RateSystem from "../islands/RateSystem.tsx";

export default function RateProduct() {
  return (
    <div class="p-16">
      <div className="rate-limited">
        <h4>Voto ilimitado</h4>
        <RateSystem infinite={true} initialRates={50} />
      </div>
      <hr />
      <div className="rate-unlimited">
        <h4>Voto limitado</h4>
        <RateSystem />
      </div>
    </div>
  );
}
