'use client'

import Image from "next/image";
import { useState } from 'react';

import { calculateDIN } from './din';

interface FormData {
  weight: number;
  height: number;
  age: number;
  len: number;
  level: number;
  fuzz: boolean;
  result: number;
};

export default function Home() {
  const [formData, setFormData] = useState<FormData>(
    {
      weight: 70,
      height: 160,
      age: 30,
      len: 300,
      level: 1,
      fuzz: false,
      result: 0
    }
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [ name ]: value });
  };

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const ans = calculateDIN(
      formData.weight,
      formData.height,
      formData.age,
      formData.len,
      formData.level,
      formData.fuzz
    );
    setFormData({ ...formData, result: ans });
    return ans
  }

  return (
    <main className="flex min-h-screen flex-col bg-gray-700 items-center justify-between p-4 sm:p-8 md:p-16 lg:p-24 xl:p-32">
      <div className="w-full max-w-lg bg-white shadow-md rounded px-8 pt-6 mb-4">
        <div className="text-gray-700 text-center text-6xl my-16">
          {formData.result > 0 && formData.result}
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-md fond-bold mb-2" htmlFor="weight">Weight (kg)</label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" id="weight" name="weight" required onChange={handleChange} />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-md fond-bold mb-2" htmlFor="height">Height (cm)</label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" id="height" name="height" required onChange={handleChange}/>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-md fond-bold mb-2" htmlFor="age">Age</label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" id="age" name="age" required onChange={handleChange}/>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-md fond-bold mb-2" htmlFor="len">Boot Length (mm)</label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" id="len" name="len" required onChange={handleChange}/>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-md fond-bold mb-2" htmlFor="level">Skier Level (ie: aggressiveness)</label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" id="level" name="level" required onChange={handleChange}/>
          </div>
          <div className="flex mb-4">
            <input className="mr-2 leading-tight" type="checkbox" id="fuzz" name="fuzz" onChange={handleChange}/>
            <label className="block text-gray-700 text-md fond-bold mb-2" htmlFor="fuzz">Fuzz</label>
          </div>
          <div className="my-4">
            <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" >Calculate</button>
          </div>
        </form>
      </div>
    </main>
  );
}
