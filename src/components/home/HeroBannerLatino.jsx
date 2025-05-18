export default function HeroBannerLatino() {
  return (
    <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
      <div className="@container">
        <div className="@[480px]:p-4">
          <div
            className="flex min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat @[480px]:gap-8 @[480px]:rounded-xl items-start justify-end px-4 pb-10 @[480px]:px-10"
            style={{
              backgroundImage:
                'linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.4)), url("https://cdn.usegalileo.ai/sdxl10/64320c48-288e-48ad-9b2d-c00071aa1fb8.png")',
            }}
          >
            <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] text-center @[480px]:text-5xl">
              Celebramos lo que somos. <br />
              Conectamos a los latinos que hacen vibrar a EE.UU.
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}
