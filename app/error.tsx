"use client";

import Link from "next/link";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="text-center">
      <h2 className="text-3xl bg-red-500 mb-5">{error.message}</h2>
      <button className="text-blue-500 text-lg" onClick={() => reset()}>
        Try reload
      </button>
      <p className="text-sm">or</p>
      <Link className="text-blue-500 text-lg" href={"/"}>
        Back to home
      </Link>
    </div>
  );
}
