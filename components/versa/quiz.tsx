// components/Quiz.tsx
"use client"
import { useState } from 'react';
import { Typography } from '@/components/ui/Typography';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface Question {
  question: string;
  options: string[];
  answer: string;
}

const questions: Question[] = [
  {
    question: "Quelle est la capitale de la France ?",
    options: ["Paris", "Lyon", "Marseille", "Toulouse"],
    answer: "Paris",
  },
  {
    question: "Qui a écrit 'Les Misérables' ?",
    options: ["Victor Hugo", "Emile Zola", "Molière", "Voltaire"],
    answer: "Victor Hugo",
  },
  {
    question: "Quel est le plus grand océan du monde ?",
    options: ["Océan Atlantique", "Océan Indien", "Océan Arctique", "Océan Pacifique"],
    answer: "Océan Pacifique",
  },
  {
    question: "Quelle est la planète la plus proche du Soleil ?",
    options: ["Terre", "Mars", "Vénus", "Mercure"],
    answer: "Mercure",
  },
  {
    question: "Qui a peint la Joconde ?",
    options: ["Vincent Van Gogh", "Leonard de Vinci", "Claude Monet", "Pablo Picasso"],
    answer: "Leonard de Vinci",
  },
  {
    question: "Combien y a-t-il de continents dans le monde ?",
    options: ["5", "6", "7", "8"],
    answer: "7",
  },
  {
    question: "Quelle est la langue la plus parlée dans le monde ?",
    options: ["Anglais", "Mandarin", "Espagnol", "Français"],
    answer: "Mandarin",
  },
  {
    question: "Qui a écrit 'Le Petit Prince' ?",
    options: ["J.K. Rowling", "Antoine de Saint-Exupéry", "Albert Camus", "Marcel Proust"],
    answer: "Antoine de Saint-Exupéry",
  },
  {
    question: "Quel est le plus long fleuve du monde ?",
    options: ["Nil", "Amazone", "Mississippi", "Yangtsé"],
    answer: "Nil",
  },
  {
    question: "Quel est l'élément chimique dont le symbole est 'O' ?",
    options: ["Oxygène", "Osmium", "Or", "Ozone"],
    answer: "Oxygène",
  },
  {
    question: "En quelle année a eu lieu la Révolution française ?",
    options: ["1789", "1776", "1804", "1815"],
    answer: "1789",
  },
  {
    question: "Quel est l'animal terrestre le plus rapide ?",
    options: ["Guépard", "Lion", "Tigre", "Antilope"],
    answer: "Guépard",
  },
];



const Quiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const handleAnswerSelection = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === questions[currentQuestionIndex].answer) {
      setScore(score + 1);
    }
    setSelectedAnswer(null);

    if (currentQuestionIndex === questions.length - 1) {
      setQuizFinished(true);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setQuizFinished(false);
  };

  return (
    <div>
      {!quizFinished ? (
        <Card>
          <CardHeader>
            <CardTitle>
              <Typography variant="p" className="text-center mt-2 mb-2">
                {questions[currentQuestionIndex].question}
              </Typography>
            </CardTitle>
            <CardContent>
              <div className="space-y-4">
                {/* First Row */}
                <div className="flex justify-between space-x-4">
                  {questions[currentQuestionIndex].options.slice(0, 2).map((option, index) => (
                    <Button
                      key={index}
                      onClick={() => handleAnswerSelection(option)}
                      className={`w-full text-black ${selectedAnswer === option ? 'bg-primary text-white' : 'bg-transparent'}`}
                    >
                      <Typography variant="p">{option}</Typography>
                    </Button>
                  ))}
                </div>

                {/* Second Row */}
                <div className="flex justify-between space-x-4">
                  {questions[currentQuestionIndex].options.slice(2, 4).map((option, index) => (
                    <Button
                      key={index}
                      onClick={() => handleAnswerSelection(option)}
                      className={`w-full text-black ${selectedAnswer === option ? 'bg-primary text-white' : 'bg-transparent'}`}
                    >
                      <Typography variant="p">{option}</Typography>
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="justify-end">
              <Button onClick={handleNextQuestion} disabled={!selectedAnswer} className="mt-2">
                <Typography variant="p">Suivant</Typography>
              </Button>
            </CardFooter>
          </CardHeader>
        </Card>
      ) : (
        <AlertDialog open={quizFinished} onOpenChange={() => setQuizFinished(false)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                <span>Quiz Terminé !</span>
              </AlertDialogTitle>
              <AlertDialogDescription>
                <span>Vous avez obtenu {score} point sur {questions.length}.</span>
              </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
              <AlertDialogCancel onClick={handleRestartQuiz}>
                <span>Recommencer</span>
              </AlertDialogCancel>
              <AlertDialogAction onClick={() => setQuizFinished(false)}>
                <span>Fermer</span>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

      )}
    </div>
  );
};

export default Quiz;
