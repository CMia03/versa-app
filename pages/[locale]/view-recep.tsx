// pages/view-recipe/[id].tsx
import { useRouter } from 'next/router';
import ItemData from '../components/item'; // Assurez-vous que le chemin d'importation est correct

const RecipeDetail = () => {
  const router = useRouter();
  const { id } = router.query; // Récupérer l'ID de l'URL

  const recipe = ItemData.find((item) => item.id === Number(id));

  if (!recipe) {
    return <div>Recette non trouvée</div>;
  }

  return (
    <div>
      <h1>{recipe.title}</h1>
      <h3>Description</h3>
      <p>{recipe.description}</p>
      <h3>Ingrédients</h3>
      <ul>
        {recipe.ingredients.map((ingredient: string, index: number) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <h3>Instructions</h3>
      <ol>
        {recipe.instructions.map((instruction: string, index: number) => (
          <li key={index}>{instruction}</li>
        ))}
      </ol>
    </div>
  );
};

export default RecipeDetail;
