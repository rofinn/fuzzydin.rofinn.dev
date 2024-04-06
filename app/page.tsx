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
    <main className="py-4 lg:py-16 xl:py-24 min-h-screen bg-white">
      <Calculator />
    </main>
  );
}
