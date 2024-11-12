
import React from 'react';
import Layout from '@/pages/layout';
import Link from 'next/link';
import exercices from '../../components/exercices.json';
import { Typography } from '@/components/ui/Typography';
import { Badge } from "@/components/ui/badge"
import { Code } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function ExercisesList() {
    return (
        <Layout>
             <Typography variant="h3" className='flex'>Bienvenue sur la Plateforme d&apos;Exercices d&apos;Algorithmique &nbsp;<Code /></Typography>
             <Typography variant="p">Explorez des exercices pour améliorer vos compétences en programmation.</Typography> <br />
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]"> 
                            <Typography variant="p">
                              ID
                            </Typography>
                        </TableHead>
                        <TableHead>
                            <Typography variant="p">
                                Sujet
                            </Typography>
                        </TableHead>
                        <TableHead className="text-right">
                           <Typography variant="p">
                              Niveau
                            </Typography>
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {exercices.map((exercise) => (
                        <TableRow key={exercise.id}>

                            <TableCell className="font-medium"> 
                                <Typography variant="p">
                                    {exercise.id}
                                </Typography>
                            </TableCell>
                            <TableCell className="font-medium">  
                                <Link href={`/pages/exercices/${exercise.id}`} legacyBehavior className='!cursor-pointer'>
                                  <Typography variant="p">
                                    {exercise.title}
                                  </Typography>
                                </Link>
                            </TableCell>
                            <TableCell className="font-medium text-right">
                                <Badge className={
                                exercise.difficulty === 'Difficile' ? 'bg-red-500' :
                                    exercise.difficulty === 'Facile' ? 'bg-green-500' :
                                        exercise.difficulty === 'Moyen' ? 'bg-blue-600' :
                                            ''
                                    }>{exercise.difficulty}
                                </Badge> 
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Layout>
    );
}
