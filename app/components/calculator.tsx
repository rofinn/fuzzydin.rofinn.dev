"use client";

import { useState } from "react";

import Form from "./form";
import Table from "./table";
import { Results } from "../types";

export default function Calculator() {
  const [results, setResults] = useState<Results>({
    result: 0,
    skier: { codes: [], weights: [] },
    boot: { codes: [], weights: [] },
  });

  return (
    <div className="flex flex-col p-4 lg:gap-12 xl:gap-18 justify-center">
      <div className="p-4 lg:flex lg:gap-16 xl:gap-24 justify-center">
        <Form setResults={setResults} />
        <Table results={results} />
      </div>
      <div className="flex flex-row text-sm justify-center" role="alert">
        <svg
          className="fill-current w-4 h-4 mr-2"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z" />
        </svg>
        <p>
          Intended as a guide and educational tool based off the ISO 11088:2018
          spec. Use at your own risk.
        </p>
      </div>
    </div>
  );
}
