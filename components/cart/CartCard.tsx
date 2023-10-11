import Image from "next/image";
import Link from "next/link";

import { formatPrice } from "@utils/functions";
import type { StoreitemBasicDetails } from "@app/api/storeitems/route";
import AddToCartButtonExtended from "@components/buttons/AddToCartButtonDropdown";

export default function CartCard({ details }: { details: StoreitemBasicDetails }) {
  return (
    <>
      <div className="flex">
        <Link href={`/store/${details.id}`}>
          <div className="w-40 h-64">
            <Image
              className="h-full w-full object-cover rounded-xl"
              alt="Binding of a book"
              src={details.imgURL}
              title={details.title}
              width={0}
              height={0}
              sizes="100%"
            />
          </div>
        </Link>
        <div className="flex flex-col m-4 w-full">
          <Link href={`/store/${details.id}`}>
            <h1 className="text-xl line-clamp-2" title={details.title}>
              {details.title}
            </h1>
          </Link>
          <div className="text-neutral-400 mb-auto">
            <p className="line-clamp-2">{details.author}</p>
            <p className="line-clamp-1">{details.publisher}</p>
          </div>
          <div className="text-lg flex items-center justify-end">
            <span className="mr-7">{formatPrice(details.price)}</span>
            <AddToCartButtonExtended details={details} />
          </div>
        </div>
      </div>
    </>
  );
}
