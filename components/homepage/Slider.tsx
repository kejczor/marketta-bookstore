"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

export default function Slider({ banersNumber }: { banersNumber: number }) {
  const [currBaner, setCurrBaner] = useState(1);

  const slide = useCallback(
    (direction: "next" | "prev") => {
      if (direction === "next") setCurrBaner(currBaner === banersNumber ? 1 : currBaner + 1);
      else setCurrBaner(currBaner === 1 ? banersNumber : currBaner - 1);
    },
    [banersNumber, currBaner]
  );

  useEffect(() => {
    const slideId = setInterval(() => slide("next"), 5000);
    return () => clearInterval(slideId);
  }, [currBaner, slide]);

  return (
    <div className="relative text-2xl">
      <Image
        priority
        src={`/img/baners/${currBaner}.jpg`}
        alt=""
        width={0}
        height={0}
        sizes="100%"
        className="w-full h-auto"
      />
      <div className="flex justify-center">
        {[...Array(banersNumber)].map((_, i) => (
          <button
            key={i}
            className="group px-2 py-3 duration-200 hover:transition-all hover:py-1"
            onClick={() => setCurrBaner(i + 1)}
          >
            <div
              className={`w-9 h-1 duration-200 rounded-xl group-hover:h-3 group-hover:transition-all  ${
                currBaner === i + 1 ? "bg-blue-500" : "bg-neutral-500"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
