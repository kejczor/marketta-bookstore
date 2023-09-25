// "use client";
import StoreCard from "@components/storepage/StoreCard";
import { Storeitem } from "@prisma/client";
import { prisma } from "@prisma/db";

type StoreProps = {
  sort: "popular" | "publish-date" | "cheap" | "expensive";
  itemsOnPage: number;
  pageIndex: number;
};

export default async function Store({ sort, itemsOnPage, pageIndex }: StoreProps) {
  const storeitems = await prisma.storeitem.findMany();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-5">
      {storeitems.map((storeitem) => (
        <div key={storeitem.id} className="flex justify-center [&>*]:max-w-3xl">
          <StoreCard {...storeitem} />
        </div>
      ))}
    </div>
  );
}

// export default function Store({ sort, itemsOnPage, pageIndex }: StoreProps) {
//   // const storeitemsNumberRes = fetch(`${process.env.HOST}/api/storeitems-number`);
//   // const storeitemsNumber = Array.from(await storeitemsNumberRes.json());

//   const [storeitems, setStoreitems] = useState<storeitem[]>([]);

//   useEffect(() => {
//     fetch(
//       `/api/storeitems
//         ?sort=${sort}
//         &page_items=${itemsOnPage}
//         &page_index=${pageIndex}`.replaceAll(" ", "")
//     )
//       .then((res) => res.json())
//       .then((data) => {
//         console.log(data);
//         setStoreitems(Object.values(data));
//       });
//     // const storeitems: storeitem[] = storeitemsRes.json();
//   }, [sort, itemsOnPage, pageIndex]);

//   return (
//     <section>
//       <div>
//         {/* {storeitems.map((storeitem, i) => (
//           <StoreCard key={storeitem.id} {...storeitem} />
//         ))} */}
//       </div>
//     </section>
//   );
// }
