'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { ItemData } from '@/lib/item'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, Users, ChefHat, UtensilsCrossed, CheckCircle, Heart, Share2, BookOpen } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function RecipeDetail() {
    const params = useParams();
    const id = params.id;
    const recipe = ItemData.find((item) => item.id === Number(id));

    if (!recipe) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-red-50">
                <Card className="border-0 shadow-2xl bg-white p-8 text-center">
                    <UtensilsCrossed className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-gray-700 mb-2">Recette non trouvée</h2>
                    <p className="text-gray-500 mb-6">La recette que vous recherchez n&apos;existe pas.</p>
                    <Link href="/recep">
                        <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Retour aux recettes
                        </Button>
                    </Link>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50">
            {/* Header with Back Button */}
            <div className="max-w-7xl mx-auto px-4 py-6">
                <Link href="/recep">
                    <Button variant="ghost" className="mb-6 hover:bg-white/50 transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Retour aux recettes
                    </Button>
                </Link>

                {/* Hero Section */}
                <div className="relative mb-8">
                    <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
                        <Image 
                            src={typeof recipe.image === 'string' ? recipe.image : recipe.image.src}
                            alt={recipe.title}
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                            <h1 className="text-4xl md:text-5xl font-bold mb-4">{recipe.title}</h1>
                            <p className="text-xl text-orange-100 max-w-3xl">{recipe.description}</p>
                            
                            {/* Recipe Stats */}
                            <div className="flex items-center space-x-8 mt-6">
                                <div className="flex items-center">
                                    <Clock className="w-5 h-5 mr-2 text-orange-300" />
                                    <span className="font-medium">30 min</span>
                                </div>
                                <div className="flex items-center">
                                    <Users className="w-5 h-5 mr-2 text-orange-300" />
                                    <span className="font-medium">4 personnes</span>
                                </div>
                                <div className="flex items-center">
                                    <ChefHat className="w-5 h-5 mr-2 text-orange-300" />
                                    <span className="font-medium">Facile</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Ingredients Section */}
                    <div className="lg:col-span-1">
                        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                            <CardHeader className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-t-lg">
                                <div className="flex items-center">
                                    <UtensilsCrossed className="w-6 h-6 mr-3" />
                                    <CardTitle className="text-xl">Ingrédients</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="p-6">
                                <div className="space-y-3">
                                    {recipe.ingredients.map((ingredient: string, index: number) => (
                                        <div key={index} className="flex items-center p-3 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg border border-orange-100 hover:shadow-md transition-all duration-200">
                                            <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                                            <span className="text-gray-700 font-medium">{ingredient}</span>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Instructions Section */}
                    <div className="lg:col-span-2">
                        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                            <CardHeader className="bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-t-lg">
                                <div className="flex items-center">
                                    <BookOpen className="w-6 h-6 mr-3" />
                                    <CardTitle className="text-xl">Instructions</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="p-6">
                                <div className="space-y-6">
                                    {recipe.instructions.map((instruction: string, index: number) => (
                                        <div key={index} className="flex items-start space-x-4">
                                            <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                                                {index + 1}
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-gray-700 leading-relaxed text-lg">{instruction}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-center space-x-4 mt-8">
                    <Button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                        <Heart className="w-5 h-5 mr-2" />
                        Ajouter aux favoris
                    </Button>
                    <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                        <Share2 className="w-5 h-5 mr-2" />
                        Partager
                    </Button>
                </div>

                {/* Success Message */}
                <div className="text-center mt-12">
                    <Card className="border-0 shadow-2xl bg-gradient-to-r from-green-500 to-emerald-500 text-white p-8 max-w-2xl mx-auto">
                        <div className="flex items-center justify-center mb-4">
                            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                                <CheckCircle className="w-8 h-8" />
                            </div>
                        </div>
                        <h2 className="text-2xl font-bold mb-2">Et c&apos;est prêt !</h2>
                        <p className="text-green-100 text-lg mb-4">Votre délicieuse recette est maintenant terminée.</p>
                        <div className="text-3xl font-bold">🍽️ Bon appétit ! 🍽️</div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
