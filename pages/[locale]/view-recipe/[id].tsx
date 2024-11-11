// pages/view-recipe/[id].tsx
import { useRouter } from 'next/router';
import { ItemData } from '@/lib/item'
import Layout from '@/pages/layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Typography } from "@/components/ui/Typography";
import { Badge } from "@/components/ui/badge"

const RecipeDetail = () => {
    const router = useRouter();
    const { id } = router.query; // Récupérer l'ID de l'URL

    const recipe = ItemData.find((item) => item.id === Number(id));

    if (!recipe) {
        return <div>Recette non trouv&eacute;e</div>;
    }
    return (
        <>
            <Layout>
                <Card className="w-full border-gray-300 m-4 bg-cover" style={{ backgroundImage: `url(${recipe.image.src})` }}>
                    <CardHeader>
                        <CardTitle>
                            <Typography variant="h2" className='text-center bg-white text-primary'>{recipe.title}</Typography>
                        </CardTitle> <br />
                        <CardDescription className='text-center'>
                            <Badge variant="outline" className='bg-white' ><Typography variant="h4">{recipe.description}</Typography></Badge>
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Badge variant="outline" className='bg-white' >
                            <Typography variant="h3" className=''>
                                Ingr&eacute;dients
                            </Typography>
                        </Badge>
                        <CardDescription> <br />
                            {recipe.ingredients.map((ingredient: string, index: number) => (
                                <Badge variant="outline" className='bg-white' key={index} style={{ display: 'block', marginBottom: '8px' }}>
                                    <Typography variant="p" className='text-sm'>
                                        {ingredient}
                                    </Typography>
                                </Badge>
                            ))}
                        </CardDescription> <br />
                        <Badge variant="outline" className='bg-white' >
                            <Typography variant="h3" className=''>
                                Instructions
                            </Typography>
                        </Badge>
                        <CardDescription> <br />
                            {recipe.instructions.map((instruction: string, index: number) => (
                                <Badge variant="outline" className='bg-white' key={index} style={{ display: 'block', marginBottom: '8px' }}>
                                    <Typography variant="p" className='text-sm'>
                                        {instruction}
                                    </Typography>
                                </Badge>
                            ))}
                        </CardDescription> <br />

                        <Badge variant="outline" className='bg-white' >
                            <Typography variant="h3" className=''>
                                Et c&apos;est pr&egrave;s!!
                            </Typography>
                        </Badge>  <br /><br />
                        <Badge variant="outline" className='bg-white' >
                            <Typography variant="h3" className=''>
                                Bonne app&eacute;tit
                            </Typography>
                        </Badge>
                    </CardContent>
                </Card>
            </Layout>
        </>
    );
};
export default RecipeDetail;
