import React from 'react';

type RecipeProps = {
  title: string;
  ingredients?: string[];
  instructions?: string[];
};

const RecipeCard: React.FC<RecipeProps> = ({ title, ingredients = [], instructions = [] }) => {
  return (
    <div className="border p-4 rounded-lg shadow-lg max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">{title}</h1>
      
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Ingredients</h2>
        <ul className="list-disc pl-5">
          {ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-xl font-semibold">Instructions</h2>
        <ol className="list-decimal pl-5">
          {instructions.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default RecipeCard;
