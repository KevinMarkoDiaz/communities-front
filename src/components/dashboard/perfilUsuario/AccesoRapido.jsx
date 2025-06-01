import CardComunidad from "./CardComunidad";

const comunidades = [
  "92f2de9e-b9c1-4d2d-bef0-3c2ffb4f8e75",
  "835a6343-3471-4f53-a2a3-5c8ee2713ae7",
  "fa32bce5-11b1-4948-9917-b8f1269d723c",
  "a15a2c95-f934-49c2-b1b6-49ca56afbb8e",
  "09b2ae45-007e-47ed-8ec2-4af55473af20",
];

export default function AccesoRapido() {
  return (
    <div>
      <h3 className="text-[#141C24] text-2xl font-bold leading-tight px-4 text-left pb-2 pt-5">
        Acceso Rápido
      </h3>
      {comunidades.map((id, index) => (
        <CardComunidad key={index} id={id} />
      ))}
    </div>
  );
}
