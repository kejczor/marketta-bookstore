"use client";

import Image from "next/image";
import Button from "@components/buttons/Button";
import { useState } from "react";

export default function OpinionForm() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [starsCount, setStarsCount] = useState(0);
  return isFormVisible ? (
    <div className="flex items-center justify-center h-full">
      <form className="bg-neutral-800 p-10 rounded-xl space-y-4">
        <h1 className="font-bold text-3xl text-center">Give an opinion</h1>
        <div className="text-center">
          {[...Array(5)].map((_, i) => (
            <button type="button" key={i} onClick={() => setStarsCount(i + 1)}>
              <Image
                src={"/svg/yellow-star.svg"}
                alt="star"
                width={40}
                height={40}
                className={`inline ${i < starsCount ? "saturate-1" : "saturate-0"}`}
              />
            </button>
          ))}
        </div>
        <textarea className="resize-y w-full" name="description" placeholder="Rate this product ..." />
        <Button type="submit" className="mx-auto">
          <Image src={"/svg/add-symbol.svg"} alt="add symbol" width={20} height={20} />
          <span>Publish opinion</span>
        </Button>
      </form>
    </div>
  ) : (
    <Button type="submit" className="">
      <Image src={"/svg/add-symbol.svg"} alt="add symbol" width={20} height={20} />
      <span>Publish opinion</span>
    </Button>
  );
}
