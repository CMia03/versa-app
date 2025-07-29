
import React from 'react';
import Link from 'next/link';
import exercices from '../../lib/data/exercices.json';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Code, BookOpen, Target, TrendingUp, ArrowRight, Brain, Zap, Star } from 'lucide-react';

export default function ExercisesList() {
    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case 'Facile':
                return 'bg-gradient-to-r from-green-500 to-emerald-500';
            case 'Moyen':
                return 'bg-gradient-to-r from-blue-500 to-cyan-500';
            case 'Difficile':
                return 'bg-gradient-to-r from-red-500 to-pink-500';
            default:
                return 'bg-gradient-to-r from-gray-500 to-gray-600';
        }
    };

    const getDifficultyIcon = (difficulty: string) => {
        switch (difficulty) {
            case 'Facile':
                return <Star className="w-4 h-4" />;
            case 'Moyen':
                return <Target className="w-4 h-4" />;
            case 'Difficile':
                return <Zap className="w-4 h-4" />;
            default:
                return <Code className="w-4 h-4" />;
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8">
            <div className="max-w-7xl mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center mb-6">
                        <div className="p-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl text-white mr-4 shadow-lg">
                            <Code className="w-8 h-8" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                            Plateforme d&apos;Exercices
                        </h1>
                    </div>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
                        Explorez une collection d&apos;exercices algorithmiques pour améliorer vos compétences en programmation. 
                        De la théorie à la pratique, progressez à votre rythme !
                    </p>
                    
                    {/* Stats */}
                    <div className="flex justify-center space-x-8">
                        <div className="text-center">
                            <div className="flex items-center justify-center mb-2">
                                <BookOpen className="w-5 h-5 text-blue-500 mr-2" />
                                <span className="text-2xl font-bold text-gray-800">{exercices.length}</span>
                            </div>
                            <p className="text-sm text-gray-600">Exercices</p>
                        </div>
                        <div className="text-center">
                            <div className="flex items-center justify-center mb-2">
                                <Target className="w-5 h-5 text-indigo-500 mr-2" />
                                <span className="text-2xl font-bold text-gray-800">3</span>
                            </div>
                            <p className="text-sm text-gray-600">Niveaux</p>
                        </div>
                        <div className="text-center">
                            <div className="flex items-center justify-center mb-2">
                                <Brain className="w-5 h-5 text-purple-500 mr-2" />
                                <span className="text-2xl font-bold text-gray-800">100%</span>
                            </div>
                            <p className="text-sm text-gray-600">Pratique</p>
                        </div>
                    </div>
                </div>

                {/* Difficulty Filter */}
                <div className="flex justify-center mb-8">
                    <div className="flex space-x-2 bg-white/80 backdrop-blur-sm rounded-xl p-2 shadow-lg">
                        {['Tous', 'Facile', 'Moyen', 'Difficile'].map((level) => (
                            <Button
                                key={level}
                                variant="ghost"
                                className="px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors"
                            >
                                {level}
                            </Button>
                        ))}
                    </div>
                </div>

                {/* Exercises Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {exercices.map((exercise) => (
                        <Card key={exercise.id} className="group border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white/80 backdrop-blur-sm overflow-hidden">
                            <CardHeader className="pb-4">
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex items-center">
                                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center text-white font-bold text-sm mr-3">
                                            {exercise.id}
                                        </div>
                                        <Badge className={`${getDifficultyColor(exercise.difficulty)} text-white border-0 flex items-center space-x-1`}>
                                            {getDifficultyIcon(exercise.difficulty)}
                                            <span>{exercise.difficulty}</span>
                                        </Badge>
                                    </div>
                                </div>
                                <CardTitle className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                                    {exercise.title}
                                </CardTitle>
                                <CardDescription className="text-gray-600 line-clamp-3 leading-relaxed">
                                    Exercice d&apos;algorithmique pour améliorer vos compétences en programmation et résolution de problèmes.
                                </CardDescription>
                            </CardHeader>
                            
                            <CardContent className="pt-0">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                                        <div className="flex items-center">
                                            <TrendingUp className="w-4 h-4 mr-1" />
                                            <span>Progression</span>
                                        </div>
                                        <div className="flex items-center">
                                            <Brain className="w-4 h-4 mr-1" />
                                            <span>Logique</span>
                                        </div>
                                    </div>
                                    <Link href={`/exercices/${exercise.id}`}>
                                        <Button className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                                            <span className="text-sm font-medium">Commencer</span>
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
                    <Card className="border-0 shadow-2xl bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-8 max-w-4xl mx-auto">
                        <div className="flex items-center justify-center mb-6">
                            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mr-4">
                                <Code className="w-8 h-8" />
                            </div>
                            <h2 className="text-3xl font-bold">Prêt à coder ?</h2>
                        </div>
                        <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
                            Commencez par un exercice facile et progressez vers des défis plus complexes. 
                            Chaque exercice vous rapproche de la maîtrise de l&apos;algorithmique !
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            {exercices.slice(0, 3).map((exercise) => (
                                <Link key={exercise.id} href={`/exercices/${exercise.id}`}>
                                    <Button 
                                        variant="outline" 
                                        className="border-white/30 text-white hover:bg-white/20 backdrop-blur-sm px-6 py-3 rounded-xl transition-all duration-300"
                                    >
                                        {exercise.title}
                                    </Button>
                                </Link>
                            ))}
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
