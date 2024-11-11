import React from 'react'
import Layout from "../layout";
import { Typography } from "@/components/ui/Typography";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from 'next/link';
import { ItemData } from '@/lib/item';
import { Soup } from 'lucide-react';
const recepPage = () => {
    return (
        <>
            <Layout>
                <div className="mt-6">
                    <Typography variant="h4" className="text-start sm:md:text-center items-center justify-center flex">Une Collection de Recettes Diverses à Essayer &nbsp; <Soup /> </Typography>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                        {ItemData.map((item, index) => (
                            <Card key={index} className="border-gray-300 flex h-full w-full max-w-sm">
                                <div className="flex-1">
                                    <CardHeader>
                                        <CardTitle>
                                            <Typography variant="p">{item.title}</Typography>
                                        </CardTitle>
                                        <CardDescription>
                                            <Typography variant="p">{item.description}</Typography>
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="flex flex-col justify-between items-end h-full mt-auto">
                                        <Link href={`/pages/view-recipe/${item.id}`} className="self-end">
                                            <Typography variant="p" className="text-end text-blue-900">
                                                Voir la recette
                                            </Typography>
                                        </Link>
                                    </CardContent>
                                </div>
                                <div className="w-1/3">
                                    <img src={typeof item.image === 'string' ? item.image : item.image.src} alt={item.title} className="w-full h-full object-cover rounded-sm" />
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default recepPage;