export default function StoreCardSkeleton() {
  return (
    <div className="card store-card store-card-skeleton">
      <div className="book-img"></div>
      <div className="book-info">
        <div className="title"></div>
        <div className="author"></div>
        <div className="publisher"></div>
        <div className="price"></div>
        <div className="skeleton-button"></div>
      </div>
    </div>
  );
}
