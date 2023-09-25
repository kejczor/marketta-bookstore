import { Opinion } from "@prisma/client";
import { prisma } from "@prisma/db";
import Image from "next/image";

export default async function OpinionCard({ opinion }: { opinion: Opinion }) {
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      id: opinion.authorId,
    },
  });

  return (
    <div className="">
      <div className="flex items-center mb-2">
        <Image
          className="aspect-square rounded-full mx-4"
          src={user.profileImgURL}
          alt="author's profile image"
          width={45}
          height={45}
        />
        <h2 className="text-2xl font-bold">{user.username}</h2>
      </div>
      <p>{opinion.description}</p>
    </div>
  );
}
