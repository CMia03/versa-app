// pages/view-recipe/[id].tsx
import { useRouter } from 'next/router';
import ItemData from '../../components/item'; // Assurez-vous que le chemin d'importation est correct
import Layout from '@/pages/layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Typography } from "@/components/ui/Typography";

const RecipeDetail = () => {
    const router = useRouter();
    const { id } = router.query; // Récupérer l'ID de l'URL

    const recipe = ItemData.find((item) => item.id === Number(id));

    if (!recipe) {
        return <div>Recette non trouvée</div>;
    }

    return (
        <>
            <Layout>
                <Card className="w-full border-gray-300 m-4">
                    <CardHeader>
                        <CardTitle>
                            <Typography variant="h2" className='text-center'>{recipe.title}</Typography>
                        </CardTitle>
                        <CardDescription>
                            <Typography variant="h4" className='text-center'>{recipe.description}</Typography>
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Typography variant="p">Ingrédients</Typography>
                        <CardDescription>
                            {recipe.ingredients.map((ingredient: string, index: number) => (
                                <Typography variant="p" key={index}>{ingredient}</Typography>
                            ))}
                        </CardDescription>
                        <Typography variant="p">Instructions</Typography>
                        <CardDescription>
                            {recipe.instructions.map((instruction: string, index: number) => (
                                <Typography variant="p" key={index}>{instruction}</Typography>
                            ))}
                        </CardDescription>
                        <Typography variant="p">Et c'est près!!</Typography>
                        <Typography variant="p">Bonne appétit !!</Typography>


                    </CardContent>
                </Card>
            </Layout>
        </>
    );
};
export default RecipeDetail;
