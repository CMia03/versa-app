import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Typography } from '@/components/ui/Typography';
import { Button } from '../../components/ui/button';
import { Input } from '@/components/ui/input';

export default function Calculator() {
  const [input, setInput] = useState('');

  const handleClick = (value: string) => {
    setInput((prevInput) => prevInput + value);
  };

  const handleClear = () => {
    setInput('');
  };

  const handleEvaluate = () => {
    try {
      setInput(eval(input).toString()); // Evaluating the expression
    } catch (error) {
      console.log('Error evaluating expression:', error);
      // setInput('Error');
    }
  };

  return (

    <Card className="w-[350px] border-gray-300 m-12">
      <CardHeader>
        <CardTitle>
          <Typography variant="p">Calculer</Typography>
        </CardTitle>
        <Input
          type="text"
          value={input}
          disabled
          className="w-full p-4 text-3xl text-right bg-gray-700 text-white rounded-lg border-none focus:outline-none"
        />
        <div className='grid grid-cols-4 gap-4'>


          <Button
            onClick={() => handleClick('7')}
            className="p-6 text-2xl font-semibold text-white bg-gray-600 rounded-lg hover:bg-gray-500"
          >
            7
          </Button>
          <Button
            onClick={() => handleClick('8')}
            className="p-6 text-2xl font-semibold text-white bg-gray-600 rounded-lg hover:bg-gray-500"
          >
            8
          </Button>
          <Button
            onClick={() => handleClick('9')}
            className="p-6 text-2xl font-semibold text-white bg-gray-600 rounded-lg hover:bg-gray-500"
          >
            9
          </Button>
          <Button
            onClick={() => handleClick('/')}
            className="p-6 text-2xl font-semibold text-white bg-orange-600 rounded-lg hover:bg-orange-500"
          >
            ÷
          </Button>

          <Button
            onClick={() => handleClick('4')}
            className="p-6 text-2xl font-semibold text-white bg-gray-600 rounded-lg hover:bg-gray-500"
          >
            4
          </Button>
          <Button
            onClick={() => handleClick('5')}
            className="p-6 text-2xl font-semibold text-white bg-gray-600 rounded-lg hover:bg-gray-500"
          >
            5
          </Button>
          <Button
            onClick={() => handleClick('6')}
            className="p-6 text-2xl font-semibold text-white bg-gray-600 rounded-lg hover:bg-gray-500"
          >
            6
          </Button>
          <Button
            onClick={() => handleClick('*')}
            className="p-6 text-2xl font-semibold text-white bg-orange-600 rounded-lg hover:bg-orange-500"
          >
            ×
          </Button>

          <Button
            onClick={() => handleClick('1')}
            className="p-6 text-2xl font-semibold text-white bg-gray-600 rounded-lg hover:bg-gray-500"
          >
            1
          </Button>
          <Button
            onClick={() => handleClick('2')}
            className="p-6 text-2xl font-semibold text-white bg-gray-600 rounded-lg hover:bg-gray-500"
          >
            2
          </Button>
          <Button
            onClick={() => handleClick('3')}
            className="p-6 text-2xl font-semibold text-white bg-gray-600 rounded-lg hover:bg-gray-500"
          >
            3
          </Button>
          <Button
            onClick={() => handleClick('-')}
            className="p-6 text-2xl font-semibold text-white bg-orange-600 rounded-lg hover:bg-orange-500"
          >
            −
          </Button>

          <Button
            onClick={() => handleClick('0')}
            className="p-6 text-2xl font-semibold text-white bg-gray-600 rounded-lg hover:bg-gray-500"
          >
            0
          </Button>
          <Button
            onClick={() => handleClick('.')}
            className="p-6 text-2xl font-semibold text-white bg-gray-600 rounded-lg hover:bg-gray-500"
          >
            .
          </Button>
          <Button
            onClick={handleEvaluate}
            className="p-6 text-2xl font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-500"
          >
            =
          </Button>
          <Button
            onClick={() => handleClick('+')}
            className="p-6 text-2xl font-semibold text-white bg-orange-600 rounded-lg hover:bg-orange-500"
          >
            +
          </Button>

          <Button
            onClick={handleClear}
            className="col-span-4 p-6 text-2xl font-semibold text-white bg-red-600 rounded-lg hover:bg-red-500"
          >
            C
          </Button>
        </div>

      </CardHeader>
      <CardContent>

      </CardContent>
    </Card>
  )
}
