// components/Quiz.tsx
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

  // if (quizFinished) {
  //   return (
  //     <div>
  //       <Typography variant="h3" className='text-center'>Quiz terminé !</Typography>
  //       <Typography variant="p"> Vous avez obtenu {score} point sur {questions.length}.</Typography>

  //       <Button onClick={handleRestartQuiz} className='mt-3'><Typography variant="p"> Recommencer </Typography></Button>
  //     </div>
  //   );
  // }

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
                Suivant
              </Button>
            </CardFooter>
          </CardHeader>
        </Card>
      ) : (
        <AlertDialog open={quizFinished} onOpenChange={() => setQuizFinished(false)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>    <Typography variant="p">Quiz Terminé ! </Typography></AlertDialogTitle>
              <AlertDialogDescription>
                <Typography variant="p"> Vous avez obtenu {score} point sur {questions.length}.</Typography>
              </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
              <AlertDialogCancel onClick={handleRestartQuiz}><Typography variant="p">Recommencer</Typography></AlertDialogCancel>
              <AlertDialogAction onClick={() => setQuizFinished(false)}><Typography variant="p">Fermer</Typography></AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
};

export default Quiz;
