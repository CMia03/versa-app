import React from 'react'
import Layout from "../layout";
import { Typography } from "@/components/ui/Typography";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Item from "../components/item";
import Link from 'next/link';
const recepPage = () => {
    return (
        <>
            <Layout>
                <div className="mt-6">
                    <Typography variant="h4" className="text-start sm:md:text-center">Une Collection de Recettes Diverses à Essayer </Typography>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                        {Item.map((item, index) => (
                            <Card key={index} className="border-gray-300">
                                <CardHeader>
                                    <CardTitle>
                                        <Typography variant="p">{item.title}</Typography>
                                    </CardTitle>
                                    <CardDescription>
                                        <Typography variant="p">{item.description}</Typography>
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="flex flex-col justify-between h-full">
                                    {/* {item.image && (
                                        <Image src={item.image} alt={item.title} className="object-cover h-[200px] w-full" />
                                    )} */}
                                     <Link href={`/pages/view-recipe/${item.id}`}>
                            <Typography variant="p" className="text-end text-blue-900">
                                Voir la recette
                            </Typography>
                        </Link>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default recepPage;