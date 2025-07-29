// components/Quiz.tsx
"use client"
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Brain, Trophy, CheckCircle, XCircle, ArrowRight, RefreshCw, Star, Target, BookOpen } from 'lucide-react';

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

const getScoreMessage = (score: number, total: number) => {
  const percentage = (score / total) * 100;
  if (percentage >= 90) return { message: "Excellent ! 🎉", color: "text-emerald-600", icon: <Trophy className="w-5 h-5" /> };
  if (percentage >= 75) return { message: "Très bien ! 👏", color: "text-green-600", icon: <Star className="w-5 h-5" /> };
  if (percentage >= 60) return { message: "Bien ! 👍", color: "text-blue-600", icon: <CheckCircle className="w-5 h-5" /> };
  if (percentage >= 40) return { message: "Pas mal ! 🤔", color: "text-yellow-600", icon: <Target className="w-5 h-5" /> };
  return { message: "À améliorer ! 📚", color: "text-red-600", icon: <BookOpen className="w-5 h-5" /> };
};

const Quiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);

  const handleAnswerSelection = (answer: string) => {
    if (!showCorrectAnswer) {
      setSelectedAnswer(answer);
    }
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === questions[currentQuestionIndex].answer) {
      setScore(score + 1);
    }
    
    setShowCorrectAnswer(true);
    
    setTimeout(() => {
      setSelectedAnswer(null);
      setShowCorrectAnswer(false);

      if (currentQuestionIndex === questions.length - 1) {
        setQuizFinished(true);
      } else {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }
    }, 1500);
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setQuizFinished(false);
    setShowCorrectAnswer(false);
  };

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  const scoreInfo = getScoreMessage(score, questions.length);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-6">
            <div className="p-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl text-white mr-4 shadow-lg">
              <Brain className="w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Quiz Culture Générale
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Testez vos connaissances avec notre quiz interactif. 12 questions pour évaluer votre culture générale !
          </p>
        </div>

        {!quizFinished ? (
          <div className="space-y-6">
            {/* Progress Bar */}
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      <Target className="w-3 h-3 mr-1" />
                      Question {currentQuestionIndex + 1} / {questions.length}
                    </Badge>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      <Trophy className="w-3 h-3 mr-1" />
                      Score: {score}
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-600">
                    {Math.round(progress)}% complété
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </CardContent>
            </Card>

            {/* Question Card */}
            <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm">
              <CardHeader className="text-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-t-lg">
                <CardTitle className="text-2xl flex items-center justify-center">
                  <BookOpen className="w-6 h-6 mr-3" />
                  Question {currentQuestionIndex + 1}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="space-y-6">
                  {/* Question */}
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 leading-relaxed">
                      {currentQuestion.question}
                    </h2>
                  </div>

                  {/* Options Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {currentQuestion.options.map((option, index) => {
                      const isSelected = selectedAnswer === option;
                      const isCorrect = option === currentQuestion.answer;
                      const isWrong = isSelected && !isCorrect;
                      
                      return (
                        <Button
                          key={index}
                          onClick={() => handleAnswerSelection(option)}
                          disabled={showCorrectAnswer}
                          className={`
                            h-auto p-6 text-left justify-start transition-all duration-300
                            ${showCorrectAnswer && isCorrect 
                              ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg scale-105' 
                              : showCorrectAnswer && isWrong
                              ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg'
                              : isSelected
                              ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-md'
                              : 'bg-gradient-to-r from-gray-50 to-gray-100 hover:from-blue-50 hover:to-indigo-50 border-2 border-gray-200 hover:border-blue-300 text-gray-700'
                            }
                            ${showCorrectAnswer && isCorrect ? 'animate-pulse' : ''}
                          `}
                        >
                          <div className="flex items-center space-x-3">
                            <div className={`
                              w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm
                              ${showCorrectAnswer && isCorrect 
                                ? 'bg-white/20 text-white' 
                                : showCorrectAnswer && isWrong
                                ? 'bg-white/20 text-white'
                                : isSelected
                                ? 'bg-white/20 text-white'
                                : 'bg-gray-200 text-gray-600'
                              }
                            `}>
                              {String.fromCharCode(65 + index)}
                            </div>
                            <span className="font-medium text-lg">{option}</span>
                            {showCorrectAnswer && isCorrect && (
                              <CheckCircle className="w-5 h-5 ml-auto" />
                            )}
                            {showCorrectAnswer && isWrong && (
                              <XCircle className="w-5 h-5 ml-auto" />
                            )}
                          </div>
                        </Button>
                      );
                    })}
                  </div>

                  {/* Feedback Message */}
                  {showCorrectAnswer && (
                    <div className={`text-center p-4 rounded-xl ${
                      selectedAnswer === currentQuestion.answer 
                        ? 'bg-green-50 border-2 border-green-200' 
                        : 'bg-red-50 border-2 border-red-200'
                    }`}>
                      <div className="flex items-center justify-center space-x-2">
                        {selectedAnswer === currentQuestion.answer ? (
                          <>
                            <CheckCircle className="w-5 h-5 text-green-600" />
                            <span className="text-green-700 font-semibold">Correct ! Bien joué !</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-5 h-5 text-red-600" />
                            <span className="text-red-700 font-semibold">
                              Incorrect. La bonne réponse était : {currentQuestion.answer}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Next Button */}
            <div className="text-center">
              <Button
                onClick={handleNextQuestion}
                disabled={!selectedAnswer || showCorrectAnswer}
                className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-lg font-semibold disabled:opacity-50"
              >
                {showCorrectAnswer ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    Question suivante...
                  </>
                ) : (
                  <>
                    <ArrowRight className="w-5 h-5 mr-3" />
                    Valider la réponse
                  </>
                )}
              </Button>
            </div>
          </div>
        ) : (
          <AlertDialog open={quizFinished} onOpenChange={() => setQuizFinished(false)}>
            <AlertDialogContent className="max-w-md">
              <AlertDialogHeader className="text-center">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                    {scoreInfo.icon}
                  </div>
                </div>
                <AlertDialogTitle className="text-2xl font-bold text-gray-800">
                  Quiz Terminé !
                </AlertDialogTitle>
                <AlertDialogDescription className="space-y-4">
                  <div className={`text-lg font-semibold ${scoreInfo.color} flex items-center justify-center`}>
                    {scoreInfo.icon}
                    <span className="ml-2">{scoreInfo.message}</span>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-800 mb-2">
                      {score} / {questions.length}
                    </div>
                    <div className="text-sm text-gray-600">
                      {Math.round((score / questions.length) * 100)}% de réussite
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-green-400 to-emerald-500 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${(score / questions.length) * 100}%` }}
                    ></div>
                  </div>
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter className="flex-col space-y-2">
                <AlertDialogAction 
                  onClick={handleRestartQuiz}
                  className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Recommencer le Quiz
                </AlertDialogAction>
                <AlertDialogCancel className="w-full border-2 border-gray-300 hover:border-gray-400 text-gray-700 px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                  Fermer
                </AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>
    </div>
  );
};

export default Quiz;
