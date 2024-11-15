'use client';

import React from "react";
import { Typography } from "@/components/ui/Typography";
import { useParams } from "next/navigation";
import gameJson from "@/lib/data/jeux.json";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import fond from "@/public/images/fond.jpg"

interface Game {
    id: number;
    titre: string;
    but: string;
    comment_jouer: string;
    variante?: string;
}

export default function GameDetailPage() {
    const params = useParams();
    const id = params.id;
    
    const game = gameJson.find((g: Game) => g.id === Number(id));

    if (!game) {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-cover bg-center">
                <Typography variant="h1" className="text-4xl font-bold mb-4 text-white">Jeu non trouvé</Typography>
                <Typography variant="p" className="text-lg text-white">Retournez à la page des jeux collectifs.</Typography>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-cover bg-center" style={{ backgroundImage: `url(${fond.src})` }}>
            <Typography variant="h1" className="text-4xl font-bold mb-10">{game.titre}</Typography>
            <Card className="max-w-xl w-full bg-white opacity-90">
                <CardHeader>
                    <Typography variant="h2" className="text-2xl font-semibold">But du Jeu</Typography>
                </CardHeader>
                <CardContent>
                    <Typography variant="p" className="mb-4">{game.but}</Typography>
                    <Typography variant="h3" className="text-xl font-semibold">Comment jouer</Typography>
                    <Typography variant="p" className="mb-4">{game.comment_jouer}</Typography>
                    {game.variante && (
                        <>
                            <Typography variant="h3" className="text-xl font-semibold">Variante</Typography>
                            <Typography variant="p">{game.variante}</Typography>
                        </>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
