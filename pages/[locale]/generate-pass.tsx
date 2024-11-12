import React from 'react';
import { useState } from 'react';
import { Typography } from '@/components/ui/Typography';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import Layout from '../layout';
import { LockKeyhole } from 'lucide-react';
import { Slider } from "@/components/ui/slider"


const generatePassword = (length: number, includeUppercase: boolean, includeNumbers: boolean, includeSymbols: boolean): string => {
  const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
  const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numberChars = '0123456789';
  const symbolChars = '!@#$%^&*()_-+=<>?/';

  let characters = lowercaseChars;

  if (includeUppercase) characters += uppercaseChars;
  if (includeNumbers) characters += numberChars;
  if (includeSymbols) characters += symbolChars;

  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    password += characters[randomIndex];
  }

  return password;
};

const PasswordGenerator: React.FC = () => {
  const [length, setLength] = useState<number>(12); // Default password length
  const [includeUppercase, setIncludeUppercase] = useState<boolean>(true);
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(true);
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(true);
  const [password, setPassword] = useState<string>('');

  // Handle password generation
  const handleGeneratePassword = () => {
    const newPassword = generatePassword(length, includeUppercase, includeNumbers, includeSymbols);
    setPassword(newPassword);
  };

  return (
    <Layout>
      <Typography variant="h2" className='flex'>
        Générateur de mot de passe   <LockKeyhole />
      </Typography>
      <div className="mb-4">
        <Label htmlFor="length" className="block mb-2"><Typography variant="p">Longueur du mot de passe : {length}</Typography></Label>
        <Slider
          id="length"
          min={8}
          max={32}
          value={[length]}
          onValueChange={(value) => setLength(value[0])}
          className="w-full"
        />
      </div>

      <div className="mb-4">
        <label className='flex'>
          <input
            type="checkbox"
            checked={includeUppercase}
            onChange={() => setIncludeUppercase(!includeUppercase)}
            className="mr-2"
          />
          <Typography variant="p" className='mb-6'>Inclure des lettres majuscules</Typography>
        </label>
      </div>

      <div className="mb-4">
        <label className='flex'>
          <input
            type="checkbox"
            checked={includeNumbers}
            onChange={() => setIncludeNumbers(!includeNumbers)}
            className="mr-2"
          />

          <Typography variant="p" className='mb-6'> Inclure des chiffres</Typography>

        </label>
      </div>

      <div className="mb-4">
        <label className='flex'>
          <input
            type="checkbox"
            checked={includeSymbols}
            onChange={() => setIncludeSymbols(!includeSymbols)}
            className="mr-2"
          />
          <Typography variant="p" className='mb-6'>   Inclure des symboles</Typography>

        </label>
      </div>

      <div className="mb-4">
        <input
          type="text"
          value={password}
          readOnly
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <Button
        onClick={handleGeneratePassword}
        className=" text-white py-2 px-4 rounded"
      >
        Générer le mot de passe
      </Button>
    </Layout>
  );
};
export default PasswordGenerator;
