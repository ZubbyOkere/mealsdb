import React, { useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { BeatLoader } from "react-spinners";
import Image from "next/image";
import { FaHeartBroken, FaHeart } from "react-icons/fa";
import toast from "react-hot-toast";
import Layout from "../../components/layout/Layout";
import Ingredients from "../../components/ingredients/Ingredients";

// export this so you can import in the saved meals
export const getSingleMeal = async ({ queryKey }) => {
  const { data } = await axios.get(`/lookup.php?i=${queryKey[1]}`);
  return data?.meals?.[0];
};

const MealsDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const {
    data: singleMealFullDetails,
    isLoading,
    isError,
  } = useQuery(["singleMeal", id], getSingleMeal);
  const [isSaved, setIsSaved] = React.useState(false);


  // saved meals
  useEffect(() => {
    if (localStorage.getItem('savedMeals')) {
      const savedMeals = JSON.parse(localStorage.getItem('savedMeals'));
      if (savedMeals.includes(id)) {
        setIsSaved(true);
      } else {
        setIsSaved(false);
      }
    } else {
      localStorage.setItem('savedMeals', JSON.stringify([]));
    }
  }, [id]);

  if (isError) {
    return <div>Error</div>;
  }

  if (isLoading || !singleMealFullDetails) {
    return (
      <Layout>
        <section>
          <BeatLoader color="#fff" size={10} />
        </section>
      </Layout>
    );
  }


  // for ingreadient
  const ingredients = Object.keys(singleMealFullDetails)
    .filter((key) => key.startsWith("strIngredient"))
    .filter(
      (key) =>
        singleMealFullDetails[key] !== "" && singleMealFullDetails[key] !== null
    );

  const ingredientsWithMeasures = ingredients.map((key, index) => ({
    index: index + 1,
    ingredient: singleMealFullDetails[key],
    measure: singleMealFullDetails[`strMeasure${index + 1}`],
  }));

  // to save meal
  const handleSaveButtonClick = async () => {
    const savedMeals = JSON.parse(localStorage.getItem('savedMeals'));
    if (!isSaved) {
      savedMeals.push(singleMealFullDetails.idMeal);
      localStorage.setItem('savedMeals', JSON.stringify(savedMeals));
      toast.success('Meal saved');
      setIsSaved(true);
    } else {
      savedMeals.splice(savedMeals.indexOf(singleMealFullDetails.idMeal), 1);
      localStorage.setItem('savedMeals', JSON.stringify(savedMeals));
      setIsSaved(false);
      toast.error('Meal Removed');
    }
  };



  return (
    <Layout>
      <section>
        <h1 className="uppercase text-center text-2xl text-gray-600">
          meal details
        </h1>
        <div className="flex gap-x-20 my-10">
          <div className="w-full">
            <Image
              alt={singleMealFullDetails.strMeal}
              width="500"
              height="500"
              src={singleMealFullDetails.strMealThumb}
              className="w-full h-80 object-cover"
            />
          </div>
          <div className="w-full">
            <h1 className="uppercase text-2xl mb-5 text-gray-200">
              {singleMealFullDetails.strMeal}
            </h1>

            <span className="my-5">
              <ul className="flex gap-x-5 items-center">
                <li>{singleMealFullDetails.strCategory}</li>
                <li>{singleMealFullDetails.strArea}</li>
                <li>{singleMealFullDetails?.strTags?.split(",").join(", ")}</li>
              </ul>
            </span>

            <div className="my-4">
              {isSaved && <p className="text-xs text-gray-500">You have saved meal already</p>}

              <button
                onClick={handleSaveButtonClick}
                className="btn my-5 capitalize w-32 flex justify-center items-center gap-x-3 bg-red-400 hover:bg-red-800"
              >
                {isSaved ? (
                  <>
                    <FaHeartBroken />
                    remove
                  </>
                ) : (
                  <>
                    <FaHeart color="red" />
                    save meal
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="my-10">
          <h1 className="uppercase text-2xl text-gray-600">ingredients</h1>

          <Ingredients ingredientsWithMeasures={ingredientsWithMeasures} />

          <h1 className="my-5 capitalize text-gray-600">instructions</h1>
          {singleMealFullDetails.strInstructions
            .split(".")
            .filter((sentence) => sentence !== "")
            .map((sentence) => (
              <>
                <p className="text-gray-300">{sentence}</p>
              </>
            ))}
        </div>
      </section>
    </Layout>
  );
};

export default MealsDetails;
