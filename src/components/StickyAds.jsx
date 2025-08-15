// src/components/StickyAds.jsx
import BannerSlot from "./ads/BannerSlot";

export default function StickyAds({ communityId }) {
  return (
    <aside className="hidden lg:flex flex-col w-[300px] min-h-full gap-6 lg:w-[200px] xl:w-[240px] 2xl:w-[280px]">
      {[0, 1].map((i) => (
        <div key={i} className="flex-1 min-h-screen relative">
          <div className="sticky top-[120px] p-2">
            <BannerSlot
              placement={i === 0 ? "sidebar_right_1" : "sidebar_right_2"}
              communityId={communityId}
              adUnit={
                i === 0
                  ? import.meta.env.VITE_ADSENSE_SLOT_SIDEBAR_1
                  : import.meta.env.VITE_ADSENSE_SLOT_SIDEBAR_2
              }
              enableGoogleAds={true}
              className="bg-gradient-to-r from-[#fff7ec] to-[#f3e8ff]   shadow-2xl"
              containerStyle={{ minHeight: "250px" }}
              fixedHeight="250px"
              imgClassName="max-h-[246px] "
            />
          </div>
        </div>
      ))}
    </aside>
  );
}
