import React from "react";
import { Typography } from "@/components/ui/Typography";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { UtensilsCrossed, MessageCircleQuestion, Calculator, Gamepad2, Code, Award  } from "lucide-react"
import Image from "next/image";
import { LockKeyhole } from 'lucide-react';

const welcomePages = () => {
    const Item = [
        {
            title: "Calculatrice",
            description: "Calculez le coût de votre projet.",
            image: <Calculator />,
            href: "/calculator"
        },
        {
            title: "Quiz",
            description: "Déployez votre nouveau projet en un clic.",
            image: <MessageCircleQuestion />,
            href: "/quiz"
        },
        {
            title: "Recette cuisine",
            description: "Découvrez des recettes de cuisine.",
            image: <UtensilsCrossed />,
            href: "/recep"

        },
        {
            title: "Tic tac Toe",
            description: "Un jeu où deux joueurs alignent des symboles sur une grille 3x3.",
            image: <Gamepad2 />,
            href: "/game"

        },
        {
            title: "Jeux de mémoire",
            description: "Consiste à associer des paires de cartes identiques .",
            image: <Gamepad2 />,
            href: "/memory-game"

        },
        {
            title: "Excercice Algorithme",
            description: "Un exercice d'algorithme consiste à résoudre un problème par des étapes logiques.",
            image: <Code />,
            href: "/exercices"
        },
        {
            title: "Générateur de mots de passe",
            description: "Un générateur de mots de passe crée des mots de passe aléatoires.",
            image: <LockKeyhole />,
            href: "/generate-pass"
        }, 
        {
            title: "Jeux collectif",
            description: "Les jeux collectifs sont des sports d'équipe basés sur la coopération et la stratégie.",
            image: <Award />,
            href: "/jeux"
        }
    ]

    return (
        <>
                <div>
                    <Typography variant="h1" className="text-start sm:md:text-center">Bienvenu dans versa app </Typography>
                    <Typography variant="p" className="text-start sm:md:text-center">L’application polyvalente pour toutes vos besoins regroupe des outils essentiels, simplifiant ainsi votre quotidien en une seule plateforme pratique.</Typography>
                    <div className="flex flex-wrap items-center justify-center">
                        {Item.map((item, index) => (
                            <Card key={index} className="w-[350px] border-gray-300 m-4">
                                <CardHeader>
                                    <CardTitle className="flex">
                                        <Typography variant="p">{item.title}</Typography> &nbsp;
                                        {typeof item.image === 'string' ? (
                                            <Image src={item.image} alt={item.title} width={50} height={50} />
                                        ) : (
                                            item.image
                                        )}
                                    </CardTitle>
                                    <CardDescription>
                                        <Typography variant="p">{item.description}</Typography>  
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Link href={item.href}><Typography variant="p" className="text-end text-blue-900">Allez à </Typography></Link>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
        </>
    );
}

export default welcomePages;