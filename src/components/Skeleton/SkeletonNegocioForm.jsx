const SkeletonNegocioForm = () => {
  return (
    <div className="w-full max-w-5xl mx-auto p-8 bg-black/40 backdrop-blur-lg rounded-2xl shadow-2xl text-white space-y-6 animate-pulse">
      <div className="h-6 w-1/3 bg-white/20 rounded" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="h-12 bg-white/10 rounded" />
        <div className="h-12 bg-white/10 rounded" />
        <div className="h-32 md:h-72 bg-white/10 rounded col-span-1 md:col-span-2" />
        <div className="h-12 bg-white/10 rounded" />
        <div className="h-12 bg-white/10 rounded" />
      </div>
      <div className="flex justify-end gap-4 pt-4">
        <div className="h-10 w-32 bg-white/20 rounded" />
        <div className="h-10 w-32 bg-orange-500 rounded" />
      </div>
    </div>
  );
};

export default SkeletonNegocioForm;
