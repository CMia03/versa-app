import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from 'next/link';
import Image from 'next/image';
import { ItemData } from '@/lib/item';
import { Soup, Clock, Users, ChefHat, ArrowRight } from 'lucide-react';

const recepPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50">
            {/* Header Section */}
            <div className="text-center py-12 px-4">
                <div className="flex items-center justify-center mb-6">
                    <div className="p-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl text-white mr-4 shadow-lg">
                        <Soup className="w-8 h-8" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                        Collection de Recettes
                    </h1>
                </div>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                    Découvrez une collection variée de recettes délicieuses pour tous les goûts et toutes les occasions
                </p>
                
                {/* Stats */}
                <div className="flex justify-center mt-8 space-x-8">
                    <div className="text-center">
                        <div className="flex items-center justify-center mb-2">
                            <Clock className="w-5 h-5 text-orange-500 mr-2" />
                            <span className="text-2xl font-bold text-gray-800">{ItemData.length}</span>
                        </div>
                        <p className="text-sm text-gray-600">Recettes</p>
                    </div>
                    <div className="text-center">
                        <div className="flex items-center justify-center mb-2">
                            <Users className="w-5 h-5 text-red-500 mr-2" />
                            <span className="text-2xl font-bold text-gray-800">+100</span>
                        </div>
                        <p className="text-sm text-gray-600">Minutes de cuisine</p>
                    </div>
                    <div className="text-center">
                        <div className="flex items-center justify-center mb-2">
                            <ChefHat className="w-5 h-5 text-yellow-500 mr-2" />
                            <span className="text-2xl font-bold text-gray-800">4.8</span>
                        </div>
                        <p className="text-sm text-gray-600">Note moyenne</p>
                    </div>
                </div>
            </div>

            {/* Recipes Grid */}
            <div className="max-w-7xl mx-auto px-4 pb-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {ItemData.map((item, index) => (
                        <Card key={index} className="group border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-white to-gray-50 overflow-hidden">
                            {/* Image Section */}
                            <div className="relative h-48 overflow-hidden">
                                <Image 
                                    src={typeof item.image === 'string' ? item.image : item.image.src} 
                                    alt={item.title} 
                                    width={400}
                                    height={200}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" 
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <div className="absolute top-3 right-3">
                                    <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
                                        <Soup className="w-4 h-4 text-orange-500" />
                                    </div>
                                </div>
                            </div>

                            {/* Content Section */}
                            <CardHeader className="pb-4">
                                <CardTitle className="text-lg font-bold text-gray-800 group-hover:text-orange-600 transition-colors duration-300 line-clamp-2">
                                    {item.title}
                                </CardTitle>
                                <CardDescription className="text-gray-600 line-clamp-3 leading-relaxed">
                                    {item.description}
                                </CardDescription>
                            </CardHeader>

                            <CardContent className="pt-0">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                                        <div className="flex items-center">
                                            <Clock className="w-4 h-4 mr-1" />
                                            <span>30 min</span>
                                        </div>
                                        <div className="flex items-center">
                                            <Users className="w-4 h-4 mr-1" />
                                            <span>4 pers</span>
                                        </div>
                                    </div>
                                    <Link 
                                        href={`/recep/${item.id}`} 
                                        className="flex items-center space-x-1 px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-300 shadow-md hover:shadow-lg group-hover:scale-105"
                                    >
                                        <span className="text-sm font-medium">Voir</span>
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Call to Action */}
                <div className="text-center mt-16">
                    <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-8 text-white shadow-2xl">
                        <h2 className="text-2xl font-bold mb-4">Prêt à cuisiner ?</h2>
                        <p className="text-orange-100 mb-6">
                            Explorez nos recettes et découvrez de nouvelles saveurs pour émerveiller vos papilles !
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            {ItemData.slice(0, 4).map((item, index) => (
                                <Link 
                                    key={index} 
                                    href={`/recep/${item.id}`}
                                    className="px-6 py-3 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-all duration-300 font-medium"
                                >
                                    {item.title}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default recepPage;