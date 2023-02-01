import Image from "next/image";
import Link from "next/link";
import React from "react";

const SingleMeal = ({ meal }) => {
  return (
    <Link href={`/meals/${meal.idMeal}`} className="w-full h-full border p-2">
      <Image alt='meal image' src={meal.strMealThumb} height="200" width="300" className="w-full h-44 transition-all ease-in-out duration-300 hover:scale-95" />
      <div>
        <h4 className="text-center text-lg">{meal.strMeal}</h4>
      </div>
      
    </Link>
   
  );
};

export default SingleMeal;
