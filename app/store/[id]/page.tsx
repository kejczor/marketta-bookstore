import AddToCartButton from "@components/buttons/AddToCartButton";
import SpecificAddToCartButton from "@components/buttons/SpecificAddToCartButton";
import OpinionCard from "@components/storepage/storeitem-desc/OpinionCard";
import OpinionForm from "@components/storepage/storeitem-desc/OpinionForm";
import { prisma } from "@prisma/db";
import { formatPrice } from "@utils/functions";
import Image from "next/image";

export default async function StoreitemDescription({ params }: { params: { id: string } }) {
  const storeitem = await prisma.storeitem.findUnique({
    where: { id: params.id },
    include: { Opinions: true },
  });

  if (storeitem == null) throw new Error("This product is no longer available");

  return (
    <div className="space-y-8 [&>section>h2]:text-3xl [&>section>h2]:border-b-2 [&>section>h2]:border-blue-400 [&>section>h2]:mb-3">
      <section className="grid grid-cols-1 md:grid-cols-2">
        <Image src={storeitem.imgURL} alt="" width={0} height={0} sizes="100%" className="block mx-auto w-2/3 mb-5" />
        <div className="[&>h3>span]:text-sm [&>h3>span]:text-neutral-500 [&>h3>span]:mr-1 [&>*:not(:last-child)]:mb-2">
          <h1 className="text-4xl  bg-blue-400 p-2">{storeitem.title}</h1>
          <div className="flex  items-center">
            <Image src={"/svg/yellow-star.svg"} alt="star" width={25} height={25} className="mr-2" />
            <h3>
              {storeitem.avargeRate.toFixed(1)}
              <span className="text-sm text-neutral-500 ml-1">({storeitem.Opinions.length})</span>
            </h3>
          </div>
          <h3>
            <span>Author:</span>
            {storeitem.author}
          </h3>
          <h3>
            <span>Publisher:</span>
            {storeitem.publisher}
          </h3>
          <h3>
            <span>Publication:</span>
            {storeitem.publicationYear}
          </h3>
          <h3>
            <span>Binding:</span>
            {storeitem.binding}
          </h3>
          <h3>
            <span>Pages:</span>
            {storeitem.pages}
          </h3>
          <h2 className="text-2xl text-right mr-5 mt-12 mb-5">{formatPrice(storeitem.price)}</h2>
          <SpecificAddToCartButton details={storeitem} />
        </div>
      </section>
      <section>
        <h2>Description</h2>
        <p>{storeitem.description}</p>
      </section>
      <section>
        <h2>
          Opinions
          <span className="text-sm text-neutral-500 ml-1">({storeitem.Opinions.length})</span>
        </h2>
        <div>
          <OpinionForm />
          {storeitem.Opinions.map((opinion) => (
            <OpinionCard key={opinion.authorId} opinion={opinion} />
          ))}
        </div>
      </section>
    </div>
  );
}
