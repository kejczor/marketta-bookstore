export default function Loading() {
  return (
    <div className="animate-pulse [&_*:not(section)]:bg-gray-700 grid grid-cols-1 md:grid-cols-2">
      <div className="mx-auto w-2/3 h-96 mb-5" />
      <section className="space-y-2 [&>h3]:h-7 [&>h3]:w-64">
        <h1 className="h-16 p-2"></h1>
        <div className="w-32 h-10" />
        <h3></h3>
        <h3></h3>
        <h3></h3>
        <h3></h3>
        <h3></h3>
      </section>
    </div>
  );
}
