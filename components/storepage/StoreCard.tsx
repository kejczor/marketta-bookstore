import Image from "next/image";
import Link from "next/link";

import { formatPrice } from "@utils/functions";
import AddToCartButton from "@components/buttons/AddToCartButton";
import type { StoreitemBasicDetails } from "@app/api/storeitems/route";

export default function StoreCard({
  id,
  title,
  author,
  price,
  publisher,
  imgURL,
  avargeRate,
}: StoreitemBasicDetails) {
  return (
    <div className="flex flex-grow bg-neutral-800 rounded-xl drop-shadow-2xl transition-all hover:scale-105">
      <Link href={`/store/${id}`}>
        <div className="w-40 h-64">
          <Image
            className="h-full w-full object-cover rounded-s-xl"
            alt="Binding of a book"
            src={imgURL}
            title={title}
            width={0}
            height={0}
            sizes="100%"
          />
        </div>
      </Link>
      <div className="flex flex-col m-4 w-full">
        <Link href={`/store/${id}`}>
          <h1 className="text-xl line-clamp-2" title={title}>
            {title}
          </h1>
        </Link>
        <div className="text-neutral-400 mb-auto">
          <p className="line-clamp-2">{author}</p>
          <p className="line-clamp-1">{publisher}</p>
        </div>
        <p className="mb-3 text-lg">{formatPrice(price)}</p>
        <AddToCartButton
          details={{
            id,
            title,
            author,
            price,
            publisher,
            imgURL,
            avargeRate,
          }}
        />
      </div>
    </div>
  );
}
