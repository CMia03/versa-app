'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Editor from '@monaco-editor/react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BugPlay, ArrowLeft, Play, CheckCircle, XCircle, AlertTriangle, Code, Target, Clock, Zap, RefreshCw, Copy } from 'lucide-react';
import Link from 'next/link';

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

import rawExercises from '../../../lib/data/exercices.json';
const exercices = rawExercises as Exercise[];

export default function ExercisePage() {
  const params = useParams();
  const id = params.id;
  const [code, setCode] = useState<string>("// Écrivez votre solution ici\nfunction inverserChaine(input) {\n  // Votre code ici\n  return input;\n}");
  const [result, setResult] = useState<string>("");
  const [exercise, setExercise] = useState<Exercise | null>(null);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [testResults, setTestResults] = useState<Array<{ success: boolean; input: string; expected: string; actual: string; error?: string }>>([]);
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    if (id) {
      const parsedId = parseInt(id as string, 10);
      const foundExercise = exercices.find((ex) => ex.id === parsedId);
      setExercise(foundExercise || null);
    }
  }, [id]);

  const handleSubmit = () => {
    if (!exercise) return;

    setIsRunning(true);
    setResult("");
    setTestResults([]);

    // Simuler un délai pour l'exécution
    setTimeout(() => {
      let success = true;
      let feedback = "";
      const results: Array<{ success: boolean; input: string; expected: string; actual: string; error?: string }> = [];

      for (const test of exercise.tests) {
        try {
          const input = JSON.parse(test.input);
          const expectedOutput = JSON.parse(test.output);

          const func = new Function('input', `${code}; return inverserChaine(input);`);
          const output = func(input);

          const testSuccess = output === expectedOutput;
          if (!testSuccess) {
            success = false;
            feedback += `Échec pour l'entrée ${test.input}: attendu ${test.output}, obtenu ${output}. `;
          }

          results.push({
            success: testSuccess,
            input: test.input,
            expected: test.output,
            actual: String(output)
          });
        } catch (error: unknown) {
          success = false;
          const errorMessage = error instanceof Error ? error.message : 'Une erreur inconnue s\'est produite';
          feedback += `Erreur d'exécution pour l'entrée ${test.input}: ${errorMessage}. `;
          
          results.push({
            success: false,
            input: test.input,
            expected: test.output,
            actual: 'Erreur',
            error: errorMessage
          });
          break;
        }
      }

      setTestResults(results);
      setResult(success ? "🎉 Félicitations ! Tous les tests sont passés !" : `❌ Certains tests ont échoué. ${feedback}`);
      setIsRunning(false);
    }, 1000);
  };

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Erreur lors de la copie:', err);
    }
  };

  const handleResetCode = () => {
    setCode("// Écrivez votre solution ici\nfunction inverserChaine(input) {\n  // Votre code ici\n  return input;\n}");
    setResult("");
    setTestResults([]);
  };

  if (!exercise) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <Card className="border-0 shadow-2xl bg-white p-8 text-center">
          <AlertTriangle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-700 mb-2">Exercice non trouvé</h2>
          <p className="text-gray-500 mb-6">L&apos;exercice que vous recherchez n&apos;existe pas.</p>
          <Link href="/exercices">
            <Button className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour aux exercices
            </Button>
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Link href="/exercices">
            <Button variant="ghost" className="mb-6 hover:bg-white/50 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour aux exercices
            </Button>
          </Link>
          
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl text-white mr-4 shadow-lg">
                <BugPlay className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  {exercise.title}
                </h1>
                <div className="flex items-center space-x-4 mt-2">
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    <Code className="w-3 h-3 mr-1" />
                    JavaScript
                  </Badge>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    <Target className="w-3 h-3 mr-1" />
                    Algorithmique
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Exercise Description */}
          <div className="lg:col-span-1">
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm h-fit">
              <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-t-lg">
                <CardTitle className="text-xl flex items-center">
                  <Target className="w-5 h-5 mr-3" />
                  Description
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-gray-700 leading-relaxed mb-6">
                  {exercise.description}
                </p>
                
                <div className="space-y-4">
                  <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200">
                    <div className="flex items-center mb-2">
                      <Clock className="w-4 h-4 text-blue-600 mr-2" />
                      <span className="font-semibold text-blue-800">Tests</span>
                    </div>
                    <p className="text-sm text-blue-700">
                      {exercise.tests.length} cas de test à passer
                    </p>
                  </div>
                  
                  <div className="p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border border-green-200">
                    <div className="flex items-center mb-2">
                      <Zap className="w-4 h-4 text-green-600 mr-2" />
                      <span className="font-semibold text-green-800">Objectif</span>
                    </div>
                    <p className="text-sm text-green-700">
                      Implémentez la fonction inverserChaine()
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Code Editor */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-t-lg">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl flex items-center">
                    <Code className="w-5 h-5 mr-3" />
                    Éditeur de Code
                  </CardTitle>
                  <div className="flex space-x-2">
                    <Button
                      onClick={handleCopyCode}
                      variant="outline"
                      size="sm"
                      className={`border-white/30 text-white hover:bg-white/20 ${
                        copied ? 'bg-green-500 border-green-500' : ''
                      }`}
                    >
                      {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                    <Button
                      onClick={handleResetCode}
                      variant="outline"
                      size="sm"
                      className="border-white/30 text-white hover:bg-white/20"
                    >
                      <RefreshCw className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <Editor
                  height="400px"
                  defaultLanguage="javascript"
                  value={code}
                  theme="vs-dark"
                  onChange={(value) => setCode(value || "")}
                  options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    lineNumbers: 'on',
                    roundedSelection: false,
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                  }}
                />
              </CardContent>
            </Card>

            {/* Action Button */}
            <div className="mt-6 text-center">
              <Button
                onClick={handleSubmit}
                disabled={isRunning}
                className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-lg font-semibold disabled:opacity-50"
              >
                {isRunning ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    Exécution en cours...
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5 mr-3" />
                    Exécuter les Tests
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Results Section */}
        {(result || testResults.length > 0) && (
          <div className="mt-8">
            <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm">
              <CardHeader className={`rounded-t-lg ${
                result.includes('Félicitations') 
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
                  : 'bg-gradient-to-r from-red-500 to-pink-500'
              } text-white`}>
                <CardTitle className="text-xl flex items-center">
                  {result.includes('Félicitations') ? (
                    <CheckCircle className="w-5 h-5 mr-3" />
                  ) : (
                    <XCircle className="w-5 h-5 mr-3" />
                  )}
                  Résultats des Tests
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="mb-4">
                  <p className={`text-lg font-semibold ${
                    result.includes('Félicitations') ? 'text-green-700' : 'text-red-700'
                  }`}>
                    {result}
                  </p>
                </div>

                {testResults.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="font-semibold text-gray-800 mb-3">Détails des tests :</h3>
                    {testResults.map((test, index) => (
                      <div
                        key={index}
                        className={`p-4 rounded-lg border-2 ${
                          test.success
                            ? 'bg-green-50 border-green-200'
                            : 'bg-red-50 border-red-200'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-gray-800">
                            Test {index + 1}
                          </span>
                          {test.success ? (
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          ) : (
                            <XCircle className="w-5 h-5 text-red-600" />
                          )}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
                          <div>
                            <span className="font-medium text-gray-600">Entrée:</span>
                            <code className="block bg-gray-100 p-1 rounded mt-1">{test.input}</code>
                          </div>
                          <div>
                            <span className="font-medium text-gray-600">Attendu:</span>
                            <code className="block bg-gray-100 p-1 rounded mt-1">{test.expected}</code>
                          </div>
                          <div>
                            <span className="font-medium text-gray-600">Obtenu:</span>
                            <code className={`block p-1 rounded mt-1 ${
                              test.success ? 'bg-green-100' : 'bg-red-100'
                            }`}>
                              {test.actual}
                            </code>
                          </div>
                        </div>
                        {test.error && (
                          <div className="mt-2 p-2 bg-red-100 rounded text-red-700 text-sm">
                            <strong>Erreur:</strong> {test.error}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
