"use client";

import Image from "next/image";

import { Todos } from "./components/todos";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-10">
      <div className="flex place-items-center mr-10">
        <Image
          src="/ampt.svg"
          alt="Ampt Logo"
          width={230}
          height={50}
          className="mt-2"
        />
        <p className="ml-2 mr-5 text-xl">+</p>
        <Image src="/nextjs.svg" alt="Next.js Logo" width={180} height={37} />
      </div>
      <div className="p-10">
        <Todos />
      </div>
    </main>
  );
}
