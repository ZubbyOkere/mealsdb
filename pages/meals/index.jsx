import axios from "axios";
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import BeatLoader from "react-spinners/BeatLoader";
import Layout from "../../components/layout/Layout";
import Search from "../../components/search/Search";
import Categories from "../../components/categories/Categories";
import SingleMeal from "../../components/singlemeal/SingleMeal";

// to get catgeroes
const getCategories = async () => {
  const { data } = await axios.get("/categories.php");
  return data.categories;
};

// meals in categories
const getMeals = async ( {queryKey}) => {
  const {data} = await axios.get(`/filter.php?c=${queryKey[1]}`)
  return data?.meals || []
}
const getQueriedMeals = async ({ queryKey }) => {
  const { data } = await axios.get(`search.php?s=${queryKey[1]}`);
  return data?.meals || []
};








const Meals = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchText, setSearchText] = useState('');
  const [query, setQuery] = useState('');


// all categories
  const {
    data: categories,
    isLoading: categoryIsLoading,
    isError: categoryIsError,
    error: categoryError,
  } = useQuery(["categories"], getCategories);

  // meals in catgeroies
  const { data: singleCategory, isLoading, isError, } = useQuery(['getMealsInCategories', selectedCategory], getMeals)

  // queried search
  const {
    data: queriedData, isLoading: queryIsLoading, isError: queryError,
  } = useQuery(['mealsByQuery', query], getQueriedMeals, {
    enabled: query !== '',
  });

  
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (searchText) {
        setQuery(searchText);
        setSelectedCategory('');
      } else {
        setQuery('');
        if (categories) {
          setSelectedCategory(categories[0].strCategory);
        }
      }
    }, 300);
    return () => {
      setQuery('');
      clearTimeout(timeout);
    };
  }, [searchText, categories]);




  return (
    <Layout>
      <section>
        <Search searchText={searchText} setSearchText={setSearchText} />
        <p className="capitalize text-gray-500">
          search meals or select categories from below.
        </p>
        <Categories
          categories={categories}
          categoryIsLoading={categoryIsLoading}
          categoryIsError={categoryIsError}
          categoryError={categoryError}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          setQuery={setQuery}
        />
        {isLoading || categoryIsLoading ? (
        <div className=''>
          <BeatLoader color="#fff" loading={isLoading || categoryIsLoading}  size={10} />
        </div>
      ) : null}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-8 w-full my-16 place-items-center">
        { !isLoading && !isError
        && singleCategory && singleCategory.map((meal) => (
          <SingleMeal key={meal.idMeal} meal={meal} />
        ))}

      { !queryIsLoading && !queryError
        && queriedData && queriedData.map((meal) => (
          <SingleMeal key={meal.idMeal} meal={meal} />
        ))}
        {singleCategory && queriedData && singleCategory.length === 0 && queriedData.length === 0 && (
          <h5>No meals found</h5>
        )}


        </div>




      </section>
    </Layout>
  );
};

export default Meals;

// id meals from the api