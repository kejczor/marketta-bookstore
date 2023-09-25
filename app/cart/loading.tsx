export default function Loading() {
  return (
    <div className="animate-pulse grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-5">
      {[...Array(10)].map((_, i) => (
        <div key={i} className="flex bg-neutral-800 rounded-xl w-full h-15">
          <div className="bg-gray-700 w-40 h-60 rounded-s-xl shrink-0"></div>
          <div className="flex flex-col w-full [&>*]:bg-gray-700 [&>*]:mx-4">
            <div className="mt-6 h-10"></div>
            <div className="mt-4 h-7 w-9/12"></div>
            <div className="mt-auto mb-6 h-10"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
