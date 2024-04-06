"use client";

import { useState, Dispatch } from "react";
import { calculateDIN } from "../din";
import { FormData, Results } from "../types";

type Props = { setResults: Dispatch<Results> };

export default function Form(props: Props) {
  const [formData, setFormData] = useState<FormData>({
    weight: 70,
    height: 160,
    age: 30,
    len: 300,
    level: 1,
    fuzz: false,
    result: 0,
  });

  const handleChange = (event: any) => {
    const target = event.target;
    const name = target.name;
    const value = target.type == "checkbox" ? target.checked : target.value;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const ans = calculateDIN(
      formData.weight,
      formData.height,
      formData.age,
      formData.len,
      formData.level,
      formData.fuzz,
    );
    setFormData({ ...formData, result: ans.result });
    props.setResults(ans);
    return ans;
  };

  return (
    <div className="m-4 lg:w-full lg:max-w-lg">
      <div className="text-gray-800 text-center text-6xl my-4 sm:my-4 md:my-8 lg:my-16">
        {formData.result > 0 ? formData.result : "0"}
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-800 text-md fond-bold mb-2"
            htmlFor="weight"
          >
            Weight (kg)
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 bg-transparent text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
            type="number"
            id="weight"
            name="weight"
            required
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-800 text-md fond-bold mb-2"
            htmlFor="height"
          >
            Height (cm)
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 bg-transparent text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
            type="number"
            id="height"
            name="height"
            required
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-800 text-md fond-bold mb-2"
            htmlFor="age"
          >
            Age
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
          >
            <option value="1">0-9 yr</option>
            <option value="30">10-49 yr</option>
            <option value="60">50+ yr</option>
          </select>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-800 text-md fond-bold mb-2"
            htmlFor="len"
          >
            Boot Length (mm)
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 bg-transparent text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
            type="number"
            id="len"
            name="len"
            required
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-800 text-md fond-bold mb-2"
            htmlFor="level"
          >
            Skier Type
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
            id="level"
            name="level"
            onChange={handleChange}
          >
            <option value="1">Beginner (Type I)</option>
            <option value="2">Intermediate (Type II)</option>
            <option value="3">Advanced (Type III)</option>
          </select>
        </div>
        <div className="flex mb-4">
          <input
            className="relative border-gray-800 rounded bg-transparent checked:bg-gray-900 leading-tight mr-2 accent-gray-900"
            type="checkbox"
            id="fuzz"
            name="fuzz"
            checked={formData.fuzz}
            onChange={handleChange}
          />
          <label
            className="block text-gray-800 text-md fond-bold mb-2"
            htmlFor="fuzz"
          >
            Fuzz
          </label>
        </div>
        <div className="my-4">
          <button
            className="w-full bg-gray-700 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Calculate
          </button>
        </div>
      </form>
    </div>
  );
}
