import React from "react";
import Layout from "../../layout";
import { Typography } from "@/components/ui/Typography";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import gameJson from "@/lib/data/jeux.json";
import social from "@/public/images/social-game.png";
import Image from "next/image";

const CollectifPage: React.FC = () => {
    return (
        <Layout>
            <div className="flex flex-col items-center justify-center bg-[#1D4851] rounded-xl">
                <Typography variant="h1" className="text-4xl font-bold mb-4 text-white mt-20 flex">Bienvenue dans le jeu collectif &nbsp;<Image src={social} alt="" width={50} height={50}  style={{ filter: 'invert(1) grayscale(1) contrast(100%)' }} /></Typography>
                <Typography variant="p" className="text-lg mb-4 text-white">Choisissez un jeu collectif :</Typography>
                <div className="flex flex-wrap items-center justify-center">
                    {gameJson.map((item, index) => (
                        <Card key={index} className="w-[350px] border-gray-300 m-4">
                            <CardHeader>
                                <CardTitle className="flex">
                                    <Typography variant="p">{item.titre}</Typography> &nbsp;

                                </CardTitle>
                                <CardDescription>
                                    <Typography variant="p">{item.but}</Typography>
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Link href={`/pages/jeux/${item.id}`} ><Typography variant="p" className="text-end text-blue-900">Explication </Typography></Link>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default CollectifPage;
