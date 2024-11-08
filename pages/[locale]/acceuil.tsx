import React from "react";
import { Typography } from "@/components/ui/Typography";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Layout from "../layout";
import Link from "next/link";


const welcomePages = () => {
    const Item = [
        {
            title: "Calculatrice",
            description: "Calculez le coût de votre projet.",
            image: "",
            href: "/pages/calulator"
        },
        {
            title: "Quiz",
            description: "Déployez votre nouveau projet en un clic.",
            image: "",
            href: "/pages/quiz"
        },
        {
            title: "Recette cuisine",
            description: "Découvrez des recettes de cuisine.",
            image: "",
            href: "/pages/recep"

        }
    ]

    return (
        <>
            <Layout>
                <div className="">
                    <Typography variant="h1" className="text-start sm:md:text-center">Bienvenu dans versa app </Typography>
                    <Typography variant="p" className="text-start sm:md:text-center">L’application polyvalente pour toutes vos besoins regroupe des outils essentiels comme une calculatrice, des quiz interactifs et des recettes de cuisine, simplifiant ainsi votre quotidien en une seule plateforme pratique.</Typography>
                    <div className="flex flex-wrap items-center justify-center">
                        {Item.map((item, index) => (
                            <Card key={index} className="w-[350px] border-gray-300 m-4">
                                <CardHeader>
                                    <CardTitle>
                                        <Typography variant="p">{item.title}</Typography> 
                                        </CardTitle>
                                    <CardDescription>
                                        <Typography variant="p">{item.description}</Typography>  
                                       </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    {/* {item.image && <img src={item.image} alt={item.title} />} */}
                                    <Link href={item.href}><Typography variant="p" className="text-end text-blue-900">Allez à </Typography> </Link>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </Layout>
        </>
    );
}

export default welcomePages;