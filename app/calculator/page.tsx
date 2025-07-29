"use client"
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Typography } from '@/components/ui/Typography';
import { Button } from '../../components/ui/button';
import { Input } from '@/components/ui/input';
import { Calculator as CalculatorIcon, RotateCcw, ArrowLeft } from 'lucide-react';

export default function Calculator() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);

  const handleClick = (value: string) => {
    setInput((prevInput) => prevInput + value);
  };

  const handleClear = () => {
    setInput('');
  };

  const handleBackspace = () => {
    setInput((prevInput) => prevInput.slice(0, -1));
  };

  const handleEvaluate = () => {
    try {
      const result = eval(input).toString();
      setHistory(prev => [...prev, `${input} = ${result}`]);
      setInput(result);
    } catch (error) {
      console.log('Error evaluating expression:', error);
      setInput('Error');
      setTimeout(() => setInput(''), 1000);
    }
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const buttons = [
    { value: '7', type: 'number' },
    { value: '8', type: 'number' },
    { value: '9', type: 'number' },
    { value: '/', type: 'operator', display: '÷' },
    { value: '4', type: 'number' },
    { value: '5', type: 'number' },
    { value: '6', type: 'number' },
    { value: '*', type: 'operator', display: '×' },
    { value: '1', type: 'number' },
    { value: '2', type: 'number' },
    { value: '3', type: 'number' },
    { value: '-', type: 'operator', display: '−' },
    { value: '0', type: 'number' },
    { value: '.', type: 'number' },
    { value: '00', type: 'number' },
    { value: '+', type: 'operator', display: '+' },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white mr-3">
              <CalculatorIcon className="w-6 h-6" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Calculatrice
            </h1>
          </div>
          <p className="text-gray-600">Calculez avec précision et style</p>
        </div>

        {/* Calculator Card */}
        <Card className="border-0 shadow-2xl bg-gradient-to-br from-white to-gray-50">
          <CardHeader className="pb-6">
            <CardTitle className="text-center text-gray-700 font-medium">
              Calculatrice Moderne
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Display */}
            <div className="space-y-2">
              <Input
                type="text"
                value={input}
                disabled
                className="w-full p-6 text-3xl text-right bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-xl border-none focus:outline-none font-mono shadow-inner"
                placeholder="0"
              />
              
              {/* History */}
              {history.length > 0 && (
                <div className="bg-gray-100 rounded-lg p-3 max-h-20 overflow-y-auto">
                  <div className="text-xs text-gray-500 mb-1">Historique:</div>
                  {history.slice(-3).map((item, index) => (
                    <div key={index} className="text-sm text-gray-600 font-mono">
                      {item}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Buttons Grid */}
            <div className="grid grid-cols-4 gap-3">
              {/* Clear and Backspace */}
              <Button
                onClick={clearHistory}
                className="p-4 text-lg font-semibold text-white bg-gradient-to-r from-red-500 to-red-600 rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                title="Effacer l'historique"
              >
                <RotateCcw className="w-5 h-5" />
              </Button>
              <Button
                onClick={handleBackspace}
                className="p-4 text-lg font-semibold text-white bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                title="Retour arrière"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <Button
                onClick={handleClear}
                className="p-4 text-lg font-semibold text-white bg-gradient-to-r from-gray-500 to-gray-600 rounded-xl hover:from-gray-600 hover:to-gray-700 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                C
              </Button>
              <Button
                onClick={handleEvaluate}
                className="p-4 text-lg font-semibold text-white bg-gradient-to-r from-green-500 to-green-600 rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-lg hover:shadow-xl row-span-2"
              >
                =
              </Button>

              {/* Number and Operator Buttons */}
              {buttons.map((button, index) => (
                <Button
                  key={index}
                  onClick={() => handleClick(button.value)}
                  className={`p-4 text-xl font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 ${
                    button.type === 'number'
                      ? 'text-gray-800 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300'
                      : 'text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700'
                  }`}
                >
                  {button.display || button.value}
                </Button>
              ))}
            </div>

            {/* Additional Functions */}
            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={() => handleClick('(')}
                className="p-3 text-lg font-semibold text-white bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-xl hover:from-indigo-600 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                (
              </Button>
              <Button
                onClick={() => handleClick(')')}
                className="p-3 text-lg font-semibold text-white bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-xl hover:from-indigo-600 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                )
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tips */}
        <div className="mt-8 text-center">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-100">
            <h3 className="font-semibold text-gray-800 mb-2">💡 Conseils d'utilisation</h3>
            <p className="text-sm text-gray-600">
              Utilisez les opérateurs +, -, ×, ÷ pour vos calculs. L'historique vous aide à suivre vos opérations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
