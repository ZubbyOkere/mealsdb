import axios from "axios";
import React from "react";
import CategorySections from "./CategorySections";

const Categories = ({
  categoryIsLoading,
  categoryIsError,
  categoryError,
  categories,
  setSelectedCategory,
  selectedCategory,
  setQuery,
}) => {
  if (categoryIsLoading) {
    return <div className="my-4">Loading...</div>;
  }
  if (categoryIsError) {
    return (
      <div>
        Error:
        {categoryError.message}
      </div>
    );
  }

  return (
    <div className="my-5 flex gap-x-3 justify-center w-full items-center flex-wrap gap-y-5">
      {categories.map((category) => (
        <>
          <CategorySections
            selectedCategory={selectedCategory}
            key={category.idCategory}
            category={category}
            onClickHandler={() => {
              setSelectedCategory(category.strCategory);
              setQuery('');
            }}
          />
        </>
      ))}
    </div>
  );
};

export default Categories;
