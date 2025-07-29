"use client"
import React from 'react';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Badge } from "@/components/ui/badge";
import { LockKeyhole, Copy, RefreshCw, Shield, Eye, EyeOff, CheckCircle, AlertTriangle, Zap, Settings } from 'lucide-react';
import { Slider } from "@/components/ui/slider";

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

const getPasswordStrength = (password: string): { score: number; label: string; color: string; icon: React.ReactNode } => {
  if (!password) return { score: 0, label: 'Aucun', color: 'bg-gray-500', icon: <AlertTriangle className="w-4 h-4" /> };
  
  let score = 0;
  if (password.length >= 8) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  switch (score) {
    case 0:
    case 1:
      return { score, label: 'Très faible', color: 'bg-red-500', icon: <AlertTriangle className="w-4 h-4" /> };
    case 2:
      return { score, label: 'Faible', color: 'bg-orange-500', icon: <AlertTriangle className="w-4 h-4" /> };
    case 3:
      return { score, label: 'Moyen', color: 'bg-yellow-500', icon: <Shield className="w-4 h-4" /> };
    case 4:
      return { score, label: 'Fort', color: 'bg-green-500', icon: <Shield className="w-4 h-4" /> };
    case 5:
      return { score, label: 'Très fort', color: 'bg-emerald-500', icon: <CheckCircle className="w-4 h-4" /> };
    default:
      return { score, label: 'Inconnu', color: 'bg-gray-500', icon: <AlertTriangle className="w-4 h-4" /> };
  }
};

const PasswordGenerator: React.FC = () => {
  const [length, setLength] = useState<number>(12);
  const [includeUppercase, setIncludeUppercase] = useState<boolean>(true);
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(true);
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(true);
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const handleGeneratePassword = () => {
    const newPassword = generatePassword(length, includeUppercase, includeNumbers, includeSymbols);
    setPassword(newPassword);
    setCopied(false);
  };

  const handleCopyPassword = async () => {
    if (password) {
      try {
        await navigator.clipboard.writeText(password);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Erreur lors de la copie:', err);
      }
    }
  };

  const passwordStrength = getPasswordStrength(password);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="p-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl text-white mr-4 shadow-lg">
              <LockKeyhole className="w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Générateur de Mot de Passe
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Créez des mots de passe sécurisés et uniques pour protéger vos comptes en ligne
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Password Display */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm">
              <CardHeader className="text-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-t-lg">
                <CardTitle className="text-2xl flex items-center justify-center">
                  <Shield className="w-6 h-6 mr-3" />
                  Mot de Passe Généré
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="space-y-6">
                  {/* Password Display */}
                  <div className="relative">
                    <div className="flex items-center space-x-3">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        readOnly
                        placeholder="Cliquez sur 'Générer' pour créer un mot de passe"
                        className="flex-1 p-4 text-lg font-mono bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                      />
                      <Button
                        onClick={() => setShowPassword(!showPassword)}
                        variant="outline"
                        size="icon"
                        className="w-12 h-12 border-2 border-gray-200 hover:border-blue-500 transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </Button>
                      <Button
                        onClick={handleCopyPassword}
                        variant="outline"
                        size="icon"
                        className={`w-12 h-12 border-2 transition-all duration-300 ${
                          copied 
                            ? 'border-green-500 bg-green-50 text-green-600' 
                            : 'border-gray-200 hover:border-blue-500'
                        }`}
                      >
                        {copied ? <CheckCircle className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                      </Button>
                    </div>
                    {copied && (
                      <div className="absolute -bottom-8 left-0 text-green-600 text-sm font-medium flex items-center">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Mot de passe copié !
                      </div>
                    )}
                  </div>

                  {/* Password Strength */}
                  {password && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">Force du mot de passe:</span>
                        <Badge className={`${passwordStrength.color} text-white border-0 flex items-center space-x-1`}>
                          {passwordStrength.icon}
                          <span>{passwordStrength.label}</span>
                        </Badge>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`${passwordStrength.color} h-2 rounded-full transition-all duration-500`}
                          style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Settings Panel */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-t-lg">
                <CardTitle className="text-xl flex items-center">
                  <Settings className="w-5 h-5 mr-3" />
                  Paramètres
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="space-y-8">
                  {/* Length Slider */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label className="text-lg font-semibold text-gray-700">Longueur: {length} caractères</Label>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        {length < 12 ? 'Court' : length < 16 ? 'Moyen' : 'Long'}
                      </Badge>
                    </div>
                    <Slider
                      min={8}
                      max={32}
                      value={[length]}
                      onValueChange={(value) => setLength(value[0])}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>8</span>
                      <span>16</span>
                      <span>24</span>
                      <span>32</span>
                    </div>
                  </div>

                  {/* Options */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <label className="flex items-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border-2 border-green-200 hover:border-green-300 transition-colors cursor-pointer">
                      <input
                        type="checkbox"
                        checked={includeUppercase}
                        onChange={() => setIncludeUppercase(!includeUppercase)}
                        className="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-500 mr-3"
                      />
                      <div>
                        <div className="font-semibold text-green-800">Lettres majuscules</div>
                        <div className="text-sm text-green-600">A-Z</div>
                      </div>
                    </label>

                    <label className="flex items-center p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border-2 border-blue-200 hover:border-blue-300 transition-colors cursor-pointer">
                      <input
                        type="checkbox"
                        checked={includeNumbers}
                        onChange={() => setIncludeNumbers(!includeNumbers)}
                        className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mr-3"
                      />
                      <div>
                        <div className="font-semibold text-blue-800">Chiffres</div>
                        <div className="text-sm text-blue-600">0-9</div>
                      </div>
                    </label>

                    <label className="flex items-center p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border-2 border-purple-200 hover:border-purple-300 transition-colors cursor-pointer">
                      <input
                        type="checkbox"
                        checked={includeSymbols}
                        onChange={() => setIncludeSymbols(!includeSymbols)}
                        className="w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500 mr-3"
                      />
                      <div>
                        <div className="font-semibold text-purple-800">Symboles</div>
                        <div className="text-sm text-purple-600">!@#$%^&*</div>
                      </div>
                    </label>
                  </div>

                  {/* Generate Button */}
                  <div className="text-center">
                    <Button
                      onClick={handleGeneratePassword}
                      className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-lg font-semibold"
                    >
                      <RefreshCw className="w-5 h-5 mr-3" />
                      Générer le Mot de Passe
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Tips Section */}
        <div className="mt-12">
          <Card className="border-0 shadow-xl bg-gradient-to-r from-green-500 to-emerald-500 text-white">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-white/20 rounded-lg">
                  <Zap className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">💡 Conseils de sécurité</h3>
                  <ul className="space-y-1 text-green-100 text-sm">
                    <li>• Utilisez des mots de passe d&apos;au moins 12 caractères</li>
                    <li>• Combinez lettres, chiffres et symboles</li>
                    <li>• Ne réutilisez jamais le même mot de passe</li>
                    <li>• Changez régulièrement vos mots de passe</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PasswordGenerator;
