import Image from "next/image";
import { useState } from "react";

import Calculator from "./components/calculator";

interface FormData {
  weight: number;
  height: number;
  age: number;
  len: number;
  level: number;
  fuzz: boolean;
  result: number;
}

export default function Home() {
  return (
    <main className="p-4 lg:flex lg:gap-16 xl:gap-24 min-h-screen bg-white items-center justify-center">
      <Calculator />
    </main>
  );
}
