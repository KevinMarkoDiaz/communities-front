// components/home/HeroBanner.jsx
export default function HeroBanner({ onBuscar }) {
  return (
    <div className="@container">
      <div className="@[480px]:p-4">
        <div
          className="flex min-h-[480px] flex-col gap-6 @[480px]:gap-8 @[480px]:rounded-xl items-center justify-center p-4 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.4)), url("https://cdn.usegalileo.ai/sdxl10/8c7f5a3b-925d-40aa-b474-feb1d9e00f02.png")`,
          }}
        >
          <h1 className="text-white text-4xl font-black text-center tracking-[-0.033em] @[480px]:text-5xl">
            Find the best local businesses, events, and news
          </h1>

          <div className="w-full max-w-[480px]">{onBuscar && onBuscar()}</div>
        </div>
      </div>
    </div>
  );
}
