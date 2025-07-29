"use client"
import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Heart, Play, Pause, RotateCcw, Volume2, VolumeX, Clock, Sparkles } from 'lucide-react';

interface MeditationSession {
  id: string;
  title: string;
  duration: number;
  description: string;
  type: 'breathing' | 'mindfulness' | 'relaxation' | 'sleep';
  color: string;
}

export default function Meditation() {
  const [currentSession, setCurrentSession] = useState<MeditationSession | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [breathingPhase, setBreathingPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const breathingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const sessions: MeditationSession[] = [
    {
      id: '1',
      title: 'Respiration Consciente',
      duration: 300, // 5 minutes
      description: 'Technique de respiration pour calmer l\'esprit et réduire le stress',
      type: 'breathing',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: '2',
      title: 'Méditation de Pleine Conscience',
      duration: 600, // 10 minutes
      description: 'Méditation guidée pour développer la présence et la conscience',
      type: 'mindfulness',
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: '3',
      title: 'Relaxation Profonde',
      duration: 900, // 15 minutes
      description: 'Séance de relaxation pour détendre le corps et l\'esprit',
      type: 'relaxation',
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: '4',
      title: 'Sommeil Réparateur',
      duration: 1200, // 20 minutes
      description: 'Méditation pour favoriser un sommeil profond et réparateur',
      type: 'sleep',
      color: 'from-indigo-500 to-blue-500'
    },
    {
      id: '5',
      title: 'Respiration 4-7-8',
      duration: 180, // 3 minutes
      description: 'Technique de respiration pour l\'anxiété et l\'endormissement',
      type: 'breathing',
      color: 'from-teal-500 to-cyan-500'
    },
    {
      id: '6',
      title: 'Méditation du Matin',
      duration: 300, // 5 minutes
      description: 'Séance matinale pour bien commencer la journée',
      type: 'mindfulness',
      color: 'from-orange-500 to-red-500'
    }
  ];

  useEffect(() => {
    if (isPlaying && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setIsPlaying(false);
            return 0;
          }
          return prev - 1;
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
  }, [isPlaying, timeLeft]);

  useEffect(() => {
    if (isPlaying && currentSession?.type === 'breathing') {
      breathingIntervalRef.current = setInterval(() => {
        setBreathingPhase(prev => {
          if (prev === 'inhale') return 'hold';
          if (prev === 'hold') return 'exhale';
          return 'inhale';
        });
      }, 4000); // 4 secondes par phase
    } else {
      if (breathingIntervalRef.current) {
        clearInterval(breathingIntervalRef.current);
      }
    }

    return () => {
      if (breathingIntervalRef.current) {
        clearInterval(breathingIntervalRef.current);
      }
    };
  }, [isPlaying, currentSession]);

  const startSession = (session: MeditationSession) => {
    setCurrentSession(session);
    setTimeLeft(session.duration);
    setIsPlaying(true);
  };

  const pauseSession = () => {
    setIsPlaying(false);
  };

  const resumeSession = () => {
    setIsPlaying(true);
  };

  const resetSession = () => {
    setIsPlaying(false);
    setTimeLeft(currentSession?.duration || 0);
    setBreathingPhase('inhale');
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getBreathingText = () => {
    switch (breathingPhase) {
      case 'inhale': return 'Inspirez profondément...';
      case 'hold': return 'Retenez votre souffle...';
      case 'exhale': return 'Expirez lentement...';
      default: return 'Respirez...';
    }
  };

  const getBreathingColor = () => {
    switch (breathingPhase) {
      case 'inhale': return 'text-blue-600';
      case 'hold': return 'text-green-600';
      case 'exhale': return 'text-purple-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-gradient-to-r from-pink-400 to-rose-500 rounded-xl text-white mr-3">
              <Heart className="w-6 h-6" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-400 to-rose-500 bg-clip-text text-transparent">
              Méditation & Relaxation
            </h1>
          </div>
          <p className="text-gray-600">Détendez-vous avec des exercices de méditation guidés</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sessions List */}
          <div className="lg:col-span-1">
            <Card className="border-0 shadow-2xl bg-gradient-to-br from-white to-gray-50">
              <CardHeader>
                <CardTitle className="text-gray-700 font-medium flex items-center">
                  <Sparkles className="w-5 h-5 mr-2 text-pink-500" />
                  Séances Disponibles
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {sessions.map(session => (
                  <div
                    key={session.id}
                    onClick={() => startSession(session)}
                    className={`p-4 rounded-lg cursor-pointer transition-all duration-200 hover:scale-105 ${
                      currentSession?.id === session.id
                        ? `bg-gradient-to-r ${session.color} text-white`
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h5 className={`font-medium ${
                        currentSession?.id === session.id ? 'text-white' : 'text-gray-800'
                      }`}>
                        {session.title}
                      </h5>
                      <div className={`flex items-center space-x-1 ${
                        currentSession?.id === session.id ? 'text-white' : 'text-gray-500'
                      }`}>
                        <Clock className="w-4 h-4" />
                        <span className="text-sm">{formatTime(session.duration)}</span>
                      </div>
                    </div>
                    <p className={`text-sm ${
                      currentSession?.id === session.id ? 'text-pink-100' : 'text-gray-600'
                    }`}>
                      {session.description}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Meditation Player */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-2xl bg-gradient-to-br from-white to-gray-50">
              <CardHeader>
                <CardTitle className="text-gray-700 font-medium">
                  {currentSession ? currentSession.title : 'Sélectionnez une séance'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {currentSession ? (
                  <>
                    {/* Timer Display */}
                    <div className="text-center">
                      <div className="text-6xl md:text-7xl font-mono font-bold bg-gradient-to-r from-pink-400 to-rose-500 bg-clip-text text-transparent mb-4">
                        {formatTime(timeLeft)}
                      </div>
                      
                      {/* Breathing Indicator */}
                      {currentSession.type === 'breathing' && isPlaying && (
                        <div className="mb-6">
                          <div className={`text-2xl font-medium ${getBreathingColor()} mb-6`}>
                          {getBreathingText()}
                          </div>
                          <div className={`w-32 h-32 mx-auto rounded-full border-4 border-current py-4 ${getBreathingColor()} flex items-center justify-center transition-all duration-2000 ${
                            breathingPhase === 'inhale' ? 'scale-125' : 
                            breathingPhase === 'hold' ? 'scale-110' : 'scale-100'
                          }`}>
                            <Heart className="w-8 h-8" />
                          </div>
                        </div>
                      )}

                      {/* Progress Bar */}
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
                        <div 
                          className="bg-gradient-to-r from-pink-400 to-rose-500 h-2 rounded-full transition-all duration-1000"
                          style={{ 
                            width: `${((currentSession.duration - timeLeft) / currentSession.duration) * 100}%` 
                          }}
                        ></div>
                      </div>
                    </div>

                    {/* Controls */}
                    <div className="flex justify-center space-x-4">
                      {!isPlaying ? (
                        <Button
                          onClick={resumeSession}
                          className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all duration-200 shadow-lg hover:shadow-xl"
                        >
                          <Play className="w-5 h-5 mr-2" />
                          Reprendre
                        </Button>
                      ) : (
                        <Button
                          onClick={pauseSession}
                          className="px-8 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-200 shadow-lg hover:shadow-xl"
                        >
                          <Pause className="w-5 h-5 mr-2" />
                          Pause
                        </Button>
                      )}
                      
                      <Button
                        onClick={resetSession}
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

                    {/* Session Info */}
                    <div className="text-center">
                      <p className="text-gray-600 mb-2">{currentSession.description}</p>
                      <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
                        <span>Durée: {formatTime(currentSession.duration)}</span>
                        <span>Type: {currentSession.type}</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-12">
                    <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Sélectionnez une séance pour commencer votre méditation</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Tips */}
        <div className="text-center mt-8">
          <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl p-4 border border-pink-100">
            <h3 className="font-semibold text-gray-800 mb-2">💡 Conseils de méditation</h3>
            <p className="text-sm text-gray-600">
              Trouvez un endroit calme et confortable. Asseyez-vous ou allongez-vous confortablement. 
              Concentrez-vous sur votre respiration et laissez vos pensées passer sans les juger.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 