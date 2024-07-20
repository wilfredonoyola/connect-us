'use client';

import { useState } from "react";
import SkeletonLoader from "./components/SkeletonLoader";

export default function Home() {
  const [loading, setLoading] = useState<boolean>(false)

  if(loading){
    return <SkeletonLoader></SkeletonLoader>;
  }

  return (
    <main className="flex flex-col min-h-screen items-center justify-start">
      <div className="flex flex-col lg:flex-row justify-start w-full md:h-[500px] h-[800px] lg:h-[600px]">
        <h3>Home connect-us</h3>
      </div>
    </main>
  );
}
