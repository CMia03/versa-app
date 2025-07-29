'use client';

import React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import gameJson from "@/lib/data/jeux.json";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Gamepad2, Target, Users, Clock, Star, Heart, Zap, BookOpen, Play, Trophy, AlertTriangle } from "lucide-react";

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
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50">
                <Card className="border-0 shadow-2xl bg-white p-8 text-center">
                    <AlertTriangle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-gray-700 mb-2">Jeu non trouvé</h2>
                    <p className="text-gray-500 mb-6">Le jeu que vous recherchez n&apos;existe pas.</p>
                    <Link href="/jeux">
                        <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Retour aux jeux
                        </Button>
                    </Link>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 py-8">
            <div className="max-w-6xl mx-auto px-4">
                {/* Header */}
                <div className="mb-8">
                    <Link href="/jeux">
                        <Button variant="ghost" className="mb-6 hover:bg-white/50 transition-colors">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Retour aux jeux
                        </Button>
                    </Link>
                    
                    <div className="text-center mb-8">
                        <div className="flex items-center justify-center mb-6">
                            <div className="p-4 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl text-white mr-4 shadow-lg">
                                <Gamepad2 className="w-8 h-8" />
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                {game.titre}
                            </h1>
                        </div>
                        
                        {/* Game Stats */}
                        <div className="flex justify-center space-x-8 mb-6">
                            <div className="text-center">
                                <div className="flex items-center justify-center mb-2">
                                    <Users className="w-5 h-5 text-purple-500 mr-2" />
                                    <span className="text-xl font-bold text-gray-800">2-20</span>
                                </div>
                                <p className="text-sm text-gray-600">Joueurs</p>
                            </div>
                            <div className="text-center">
                                <div className="flex items-center justify-center mb-2">
                                    <Clock className="w-5 h-5 text-pink-500 mr-2" />
                                    <span className="text-xl font-bold text-gray-800">15-30</span>
                                </div>
                                <p className="text-sm text-gray-600">Minutes</p>
                            </div>
                            <div className="text-center">
                                <div className="flex items-center justify-center mb-2">
                                    <Star className="w-5 h-5 text-orange-500 mr-2" />
                                    <span className="text-xl font-bold text-gray-800">4.8</span>
                                </div>
                                <p className="text-sm text-gray-600">Note</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Game Objective */}
                    <div className="lg:col-span-1">
                        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm h-fit">
                            <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-t-lg">
                                <CardTitle className="text-xl flex items-center">
                                    <Target className="w-5 h-5 mr-3" />
                                    Objectif du Jeu
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6">
                                <p className="text-gray-700 leading-relaxed mb-6">
                                    {game.but}
                                </p>
                                
                                <div className="space-y-4">
                                    <div className="p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg border border-purple-200">
                                        <div className="flex items-center mb-2">
                                            <Heart className="w-4 h-4 text-purple-600 mr-2" />
                                            <span className="font-semibold text-purple-800">Niveau d&apos;amusement</span>
                                        </div>
                                        <p className="text-sm text-purple-700">
                                            Très élevé - Parfait pour les groupes
                                        </p>
                                    </div>
                                    
                                    <div className="p-4 bg-gradient-to-r from-pink-50 to-pink-100 rounded-lg border border-pink-200">
                                        <div className="flex items-center mb-2">
                                            <Zap className="w-4 h-4 text-pink-600 mr-2" />
                                            <span className="font-semibold text-pink-800">Énergie requise</span>
                                        </div>
                                        <p className="text-sm text-pink-700">
                                            Modérée - Adapté à tous les âges
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Game Rules */}
                    <div className="lg:col-span-2">
                        <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm">
                            <CardHeader className="bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-t-lg">
                                <CardTitle className="text-xl flex items-center">
                                    <BookOpen className="w-5 h-5 mr-3" />
                                    Comment Jouer
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-8">
                                <div className="prose prose-lg max-w-none">
                                    <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-xl border border-gray-200 mb-6">
                                        <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                                            <Play className="w-5 h-5 mr-2 text-purple-600" />
                                            Instructions
                                        </h3>
                                        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                                            {game.comment_jouer}
                                        </p>
                                    </div>

                                    {game.variante && (
                                        <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-6 rounded-xl border border-orange-200">
                                            <h3 className="text-lg font-semibold text-orange-800 mb-3 flex items-center">
                                                <Trophy className="w-5 h-5 mr-2" />
                                                Variante
                                            </h3>
                                            <p className="text-orange-700 leading-relaxed">
                                                {game.variante}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Tips Section */}
                        <div className="mt-8">
                            <Card className="border-0 shadow-xl bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                                <CardContent className="p-6">
                                    <div className="flex items-start space-x-4">
                                        <div className="p-2 bg-white/20 rounded-lg">
                                            <Star className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold mb-2">💡 Conseils pour bien jouer</h3>
                                            <ul className="space-y-1 text-green-100 text-sm">
                                                <li>• Assurez-vous que tous les joueurs comprennent les règles</li>
                                                <li>• Créez une ambiance conviviale et encourageante</li>
                                                <li>• Adaptez les règles selon l&apos;âge des participants</li>
                                                <li>• N&apos;oubliez pas que l&apos;important c&apos;est de s&apos;amuser !</li>
                                            </ul>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-center space-x-4 mt-12">
                    <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                        <Play className="w-5 h-5 mr-2" />
                        Commencer le Jeu
                    </Button>
                    <Link href="/jeux">
                        <Button variant="outline" className="border-2 border-gray-300 hover:border-gray-400 text-gray-700 px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                            <Gamepad2 className="w-5 h-5 mr-2" />
                            Autres Jeux
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
