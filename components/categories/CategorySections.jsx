import React from "react";

const CategorySections = ({ category, selectedCategory, onClickHandler }) => {
  const isSelected = category.strCategory === selectedCategory;

  return (
    <>
      {isSelected ? (
        <button
          onClick={onClickHandler}
          className={`p-2 bg-slate-800 rounded-sm hover:bg-gray-600 cursor-pointer w-32 text-center`}
        >
          {category.strCategory}
        </button>
      ) : (
        <button
          onClick={onClickHandler}
          className={`p-2 bg-slate-600 rounded-sm hover:bg-gray-700 cursor-pointer w-32 text-center`}
        >
          {category.strCategory}
        </button>
      )}


    </>
  );
};

export default CategorySections;
