import React, { useState, useEffect } from 'react';
import Layout from '@/pages/layout';
import { useRouter } from 'next/router';
import Editor from '@monaco-editor/react';
import { Typography } from '@/components/ui/Typography';
import { Button } from '@/components/ui/button';
import { BugPlay  } from "lucide-react"

interface Test {
  input: string;
  output: string;
}
interface Exercise {
  id: number;
  title: string;
  description: string;
  tests: Test[];
}

import rawExercises from '../../components/exercices.json';
const exercices = rawExercises as Exercise[];

export default function ExercisePage() {
  const router = useRouter();
  const { id } = router.query;
  const [code, setCode] = useState<string>("// Écrivez votre solution ici");
  const [result, setResult] = useState<string>(""); 
  const [exercise, setExercise] = useState<Exercise | null>(null); 

  useEffect(() => {
    if (id) {
      const parsedId = parseInt(id as string, 10); 
      const foundExercise = exercices.find((ex) => ex.id === parsedId);
      setExercise(foundExercise || null);
    }
  }, [id]);

  const handleSubmit = () => {
    if (!exercise) return;

    let success = true;
    let feedback = ""; 

    for (const test of exercise.tests) {
      try {
        const input = JSON.parse(test.input); 
        const expectedOutput = JSON.parse(test.output);

        // Dynamically create a function to test the user's code
        const func = new Function('input', `${code}; return inverserChaine(input);`);
        const output = func(input);

        if (output !== expectedOutput) {
          success = false;
          feedback += `Échec pour l'entrée ${test.input}: attendu ${test.output}, obtenu ${output}. `;
        }
      } catch (error: unknown) {
        success = false;
        if (error instanceof Error) {
          feedback += `Erreur d'exécution pour l'entrée ${test.input}: ${error.message}. `;
        } else {
          feedback += `Erreur d'exécution pour l'entrée ${test.input}: Une erreur inconnue s'est produite. `;
        }
        break;
      }
    }
    setResult(success ? "Vous avez réussi !!" : `Échec, essayez encore. ${feedback}`);
  };

  if (!exercise) return <div>Exercice non trouvé</div>;

  return (
    <Layout>
      <Typography variant="h3" className='flex'>{exercise.title} &nbsp; <BugPlay /></Typography> 
      <Typography variant="p">{exercise.description}</Typography> <br />
      <Editor
        height="400px"
        defaultLanguage="javascript"
        defaultValue={code}
        theme="vs-dark"
        onChange={(value) => setCode(value || "")}
      />
      <Button onClick={handleSubmit} className='mt-5'>Soumettre</Button>
      {result && <Typography variant="p">Résultat: {result}</Typography>}
    </Layout>
  );
}
