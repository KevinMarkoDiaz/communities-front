export default function StickyAds() {
  return (
    <aside className="hidden lg:flex flex-col w-[300px] min-h-full gap-10 lg:w-[200px] xl:w-[240px] 2xl:w-[280px]">
      {[1, 2].map((_, index) => (
        <div
          key={index}
          className="flex-1 min-h-screen bg-[radial-gradient(#ccc_1px,transparent_1px)] bg-[size:8px_8px] rounded-t-xl shadow-inner relative"
        >
          <div className="sticky top-[96px] p-2">
            <div className="ads-box h-[250px] bg-white shadow-md rounded p-2 text-center border border-dashed">
              Ad Box 1
            </div>
          </div>
        </div>
      ))}
    </aside>
  );
}
