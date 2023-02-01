import { useQueries } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { BeatLoader } from 'react-spinners';
import Layout from '../../components/layout/Layout'
import { getSingleMeal } from '../meals/[id]';

const SavedMeals = () => {
  const [savedMealsId, setSavedMealsId] = useState([]);


  const queries = savedMealsId.map((id) => (
    {
      queryKey: ['singleMeal', id],
      queryFn: getSingleMeal
    }
  ))

    const savedMealsResult = useQueries({queries})

    useEffect(() => {
      if (localStorage.getItem('savedMeals')) {
        setSavedMealsId(JSON.parse(localStorage.getItem('savedMeals')));
      }
    }, []);

  return (
    <Layout>
      <section>
        <h1 className='uppercase text-2xl text-gray-500'>saved meals</h1>
        <div>
          {savedMealsId.length <= 0 && <p>you have no meals saved yet</p>}
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full gap-x-10 gap-y-10 my-10 place-items-center'>
              {savedMealsResult && savedMealsResult.map(({
                data, isLoading
              }, index) => {
                if(isLoading){
                  return(
                    <>
                      <BeatLoader loading={isLoading} size={10} key={savedMealsId[[index]]} />
                    </>
                  )
                }


                return(
                  <>
                    <Link className='w-full text-center bg-slate-700 text-gray-500 capitalize rounded-md h-72 p-2' href={`/meals/${data.idMeal}`} key={data.idMeal}>

                      <div>
                        <Image src={data.strMealThumb} alt='saved meal' width='300' height='300' className='w-full h-32 object-cover' />
                      </div>
                      <h4 className='capitalize my-2 text-gray-400 text-sm font-semibold'>{data.strMeal}</h4>

                      <div className='my-4 bg-gray-800 text-white rounded-md'>
                      <p>category: {data.strCategory}</p>
                      <p>type: {data.strArea}</p>
                      </div>
                    </Link>
                  </>
                )
              })}
            </div>
        </div>
      </section>
    </Layout>
  )
}

export default SavedMeals