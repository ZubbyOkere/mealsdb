import React from "react";

const Ingredients = ({ ingredientsWithMeasures }) => {
  return (
    <div>
      <table className="w-full md:w-72">
        <tbody className="">
          {ingredientsWithMeasures.map((ingredient) => (
            <tr className="border" key={ingredient.index}>
              <td className="p-2">
                <p>{ingredient.ingredient}</p>
              </td>
              <td className="p-2">
                <p>{ingredient.measure}</p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Ingredients;
