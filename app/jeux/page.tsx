import React from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import gameJson from "@/lib/data/jeux.json";
import { Users, Gamepad2, ArrowRight, Trophy, Star, Heart, Target } from "lucide-react";

const CollectifPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 py-8">
            <div className="max-w-7xl mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center mb-6">
                        <div className="p-4 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl text-white mr-4 shadow-lg">
                            <Users className="w-8 h-8" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                            Jeux Collectifs
                        </h1>
                    </div>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
                        Découvrez une collection de jeux amusants et engageants pour jouer en groupe. 
                        Parfait pour animer vos soirées et créer des moments inoubliables !
                    </p>
                    
                    {/* Stats */}
                    <div className="flex justify-center space-x-8">
                        <div className="text-center">
                            <div className="flex items-center justify-center mb-2">
                                <Gamepad2 className="w-5 h-5 text-purple-500 mr-2" />
                                <span className="text-2xl font-bold text-gray-800">{gameJson.length}</span>
                            </div>
                            <p className="text-sm text-gray-600">Jeux disponibles</p>
                        </div>
                        <div className="text-center">
                            <div className="flex items-center justify-center mb-2">
                                <Users className="w-5 h-5 text-pink-500 mr-2" />
                                <span className="text-2xl font-bold text-gray-800">2-20</span>
                            </div>
                            <p className="text-sm text-gray-600">Joueurs par jeu</p>
                        </div>
                        <div className="text-center">
                            <div className="flex items-center justify-center mb-2">
                                <Trophy className="w-5 h-5 text-orange-500 mr-2" />
                                <span className="text-2xl font-bold text-gray-800">100%</span>
                            </div>
                            <p className="text-sm text-gray-600">Amusement garanti</p>
                        </div>
                    </div>
                </div>

                {/* Games Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {gameJson.map((item, index) => (
                        <Card key={index} className="group border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white/80 backdrop-blur-sm overflow-hidden">
                            {/* Card Header with Icon */}
                            <CardHeader className="pb-4">
                                <div className="flex items-start justify-between mb-3">
                                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white font-bold text-lg mr-3">
                                        {index + 1}
                                    </div>
                                    <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                                        <Star className="w-3 h-3 mr-1" />
                                        Collectif
                                    </Badge>
                                </div>
                                <CardTitle className="text-xl font-bold text-gray-800 group-hover:text-purple-600 transition-colors duration-300 line-clamp-2">
                                    {item.titre}
                                </CardTitle>
                                <CardDescription className="text-gray-600 line-clamp-3 leading-relaxed">
                                    {item.but}
                                </CardDescription>
                            </CardHeader>
                            
                            <CardContent className="pt-0">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                                        <div className="flex items-center">
                                            <Users className="w-4 h-4 mr-1" />
                                            <span>Groupe</span>
                                        </div>
                                        <div className="flex items-center">
                                            <Heart className="w-4 h-4 mr-1" />
                                            <span>Fun</span>
                                        </div>
                                    </div>
                                    <Link href={`/jeux/${item.id}`}>
                                        <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                                            <span className="text-sm font-medium">Voir les règles</span>
                                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                                        </Button>
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Call to Action */}
                <div className="text-center mt-16">
                    <Card className="border-0 shadow-2xl bg-gradient-to-r from-purple-500 to-pink-500 text-white p-8 max-w-4xl mx-auto">
                        <div className="flex items-center justify-center mb-6">
                            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mr-4">
                                <Target className="w-8 h-8" />
                            </div>
                            <h2 className="text-3xl font-bold">Prêt à jouer ?</h2>
                        </div>
                        <p className="text-purple-100 text-lg mb-8 max-w-2xl mx-auto">
                            Choisissez un jeu, rassemblez vos amis et commencez l&apos;aventure ! 
                            Chaque jeu promet des moments de rire et de complicité.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            {gameJson.slice(0, 3).map((item, index) => (
                                <Link key={index} href={`/jeux/${item.id}`}>
                                    <Button 
                                        variant="outline" 
                                        className="border-white/30 text-white hover:bg-white/20 backdrop-blur-sm px-6 py-3 rounded-xl transition-all duration-300"
                                    >
                                        {item.titre}
                                    </Button>
                                </Link>
                            ))}
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default CollectifPage;
