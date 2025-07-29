"use client"
import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '@/components/ui/input';
import { Clock, Play, Pause, RotateCcw, Volume2, VolumeX } from 'lucide-react';

export default function Timer() {
  const [mode, setMode] = useState<'timer' | 'stopwatch'>('timer');
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [inputMinutes, setInputMinutes] = useState('');
  const [isMuted, setIsMuted] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime(prev => {
          if (mode === 'timer' && prev <= 0) {
            setIsRunning(false);
            playAlarm();
            return 0;
          }
          return mode === 'timer' ? prev - 1 : prev + 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, mode]);

  const playAlarm = () => {
    if (!isMuted && audioRef.current) {
      audioRef.current.play();
    }
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startTimer = () => {
    if (mode === 'timer' && time === 0 && inputMinutes) {
      setTime(parseInt(inputMinutes) * 60);
      setInputMinutes('');
    }
    setIsRunning(true);
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTime(0);
    setInputMinutes('');
  };

  const quickSet = (minutes: number) => {
    setTime(minutes * 60);
    setMode('timer');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl text-white mr-3">
              <Clock className="w-6 h-6" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
              Minuteur & Chronomètre
            </h1>
          </div>
          <p className="text-gray-600">Gérez votre temps efficacement</p>
        </div>

        {/* Mode Selector */}
        <Card className="border-0 shadow-2xl bg-gradient-to-br from-white to-gray-50 mb-6">
          <CardContent className="p-6">
            <div className="flex space-x-2">
              <Button
                onClick={() => setMode('timer')}
                className={`flex-1 ${mode === 'timer' 
                  ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                Minuteur
              </Button>
              <Button
                onClick={() => setMode('stopwatch')}
                className={`flex-1 ${mode === 'stopwatch' 
                  ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                Chronomètre
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Timer Display */}
        <Card className="border-0 shadow-2xl bg-gradient-to-br from-white to-gray-50 mb-6">
          <CardHeader className="pb-6">
            <CardTitle className="text-center text-gray-700 font-medium">
              {mode === 'timer' ? 'Minuteur' : 'Chronomètre'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Time Display */}
            <div className="text-center">
              <div className="text-6xl md:text-7xl font-mono font-bold bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
                {formatTime(time)}
              </div>
            </div>

            {/* Timer Input */}
            {mode === 'timer' && !isRunning && time === 0 && (
              <div className="space-y-4">
                <Input
                  type="number"
                  placeholder="Minutes"
                  value={inputMinutes}
                  onChange={(e) => setInputMinutes(e.target.value)}
                  className="text-center text-2xl font-mono"
                />
                <div className="grid grid-cols-3 gap-2">
                  <Button onClick={() => quickSet(5)} className="bg-gray-100 text-gray-700 hover:bg-gray-200">
                    5 min
                  </Button>
                  <Button onClick={() => quickSet(10)} className="bg-gray-100 text-gray-700 hover:bg-gray-200">
                    10 min
                  </Button>
                  <Button onClick={() => quickSet(25)} className="bg-gray-100 text-gray-700 hover:bg-gray-200">
                    25 min
                  </Button>
                </div>
              </div>
            )}

            {/* Controls */}
            <div className="flex justify-center space-x-4">
              {!isRunning ? (
                <Button
                  onClick={startTimer}
                  className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Démarrer
                </Button>
              ) : (
                <Button
                  onClick={pauseTimer}
                  className="px-8 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  <Pause className="w-5 h-5 mr-2" />
                  Pause
                </Button>
              )}
              
              <Button
                onClick={resetTimer}
                className="px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-xl hover:from-gray-600 hover:to-gray-700 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <RotateCcw className="w-5 h-5" />
              </Button>
            </div>

            {/* Sound Toggle */}
            <div className="flex justify-center">
              <Button
                onClick={() => setIsMuted(!isMuted)}
                className={`p-3 rounded-xl transition-all duration-200 ${
                  isMuted 
                    ? 'bg-gray-100 text-gray-600 hover:bg-gray-200' 
                    : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600'
                }`}
              >
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tips */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-xl p-4 border border-red-100">
            <h3 className="font-semibold text-gray-800 mb-2">💡 Conseils d'utilisation</h3>
            <p className="text-sm text-gray-600">
              {mode === 'timer' 
                ? 'Utilisez le minuteur pour la technique Pomodoro ou pour cuisiner. Les boutons rapides vous font gagner du temps !'
                : 'Le chronomètre est parfait pour mesurer vos performances ou vos sessions de travail.'
              }
            </p>
          </div>
        </div>

        {/* Hidden Audio Element */}
        <audio ref={audioRef} preload="auto">
          <source src="data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT" type="audio/wav" />
        </audio>
      </div>
    </div>
  );
} 