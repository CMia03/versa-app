
import React from 'react';
import Layout from '@/pages/layout';
import Link from 'next/link';
import exercices from '../../components/exercices.json';
import { Typography } from '@/components/ui/Typography';
import { Badge } from "@/components/ui/badge"
import { CodeXml } from 'lucide-react';

const getBadgeColor = (difficulty: any) => {
    switch (difficulty) {
        case 'Facile':
            return 'success'; // Vert
        case 'Moyen':
            return 'warning'; // Orange
        case 'Difficile':
            return 'error'; // Rouge
        default:
            return 'default';
    }
};

export default function ExercisesList() {
    return (
        <Layout>
            <Typography variant="h3" className='flex'>Liste des Exercices &nbsp; <CodeXml /></Typography> <br />
            <ul>
                {exercices.map((exercise) => (
                    <li key={exercise.id}>
                        <Link href={`/pages/exercices/${exercise.id}`} legacyBehavior className='!cursor-pointer'>
                            <Typography variant="p">{exercise.title} - <Badge className={
                                exercise.difficulty === 'Difficile' ? 'bg-red-500' :
                                    exercise.difficulty === 'Facile' ? 'bg-green-500' :
                                        exercise.difficulty === 'Moyen' ? 'bg-orange-500' :
                                            ''
                            }>{exercise.difficulty}</Badge></Typography>
                        </Link>
                    </li>
                ))}
            </ul>
        </Layout>
    );
}
