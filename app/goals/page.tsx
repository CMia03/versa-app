"use client"
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '@/components/ui/input';
import { Target, Plus, CheckCircle, Circle, Trash2, TrendingUp, Calendar, Award, Star } from 'lucide-react';

interface Goal {
  id: string;
  title: string;
  description: string;
  category: string;
  target: number;
  current: number;
  unit: string;
  deadline: Date;
  completed: boolean;
  createdAt: Date;
  milestones: Milestone[];
}

interface Milestone {
  id: string;
  title: string;
  target: number;
  completed: boolean;
}

export default function Goals() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    category: 'personal',
    target: 1,
    unit: '',
    deadline: ''
  });

  const categories = [
    { id: 'personal', name: 'Personnel', color: 'from-blue-500 to-cyan-500' },
    { id: 'professional', name: 'Professionnel', color: 'from-green-500 to-emerald-500' },
    { id: 'health', name: 'Santé', color: 'from-red-500 to-pink-500' },
    { id: 'learning', name: 'Apprentissage', color: 'from-purple-500 to-violet-500' },
    { id: 'financial', name: 'Financier', color: 'from-yellow-500 to-orange-500' }
  ];

  useEffect(() => {
    const savedGoals = localStorage.getItem('versa-goals');
    if (savedGoals) {
      setGoals(JSON.parse(savedGoals));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('versa-goals', JSON.stringify(goals));
  }, [goals]);

  const addGoal = () => {
    if (!newGoal.title || !newGoal.description) return;

    const goal: Goal = {
      id: Date.now().toString(),
      title: newGoal.title,
      description: newGoal.description,
      category: newGoal.category,
      target: newGoal.target,
      current: 0,
      unit: newGoal.unit,
      deadline: new Date(newGoal.deadline),
      completed: false,
      createdAt: new Date(),
      milestones: []
    };

    setGoals([goal, ...goals]);
    setNewGoal({
      title: '',
      description: '',
      category: 'personal',
      target: 1,
      unit: '',
      deadline: ''
    });
    setShowAddForm(false);
  };

  const updateProgress = (goalId: string, increment: number) => {
    setGoals(goals.map(goal => {
      if (goal.id === goalId) {
        const newCurrent = Math.max(0, Math.min(goal.target, goal.current + increment));
        return {
          ...goal,
          current: newCurrent,
          completed: newCurrent >= goal.target
        };
      }
      return goal;
    }));
  };

  const deleteGoal = (goalId: string) => {
    setGoals(goals.filter(goal => goal.id !== goalId));
  };

  const getProgressPercentage = (goal: Goal) => {
    return Math.min(100, (goal.current / goal.target) * 100);
  };

  const getDaysUntilDeadline = (deadline: Date) => {
    const today = new Date();
    const diffTime = deadline.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getCategoryColor = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category?.color || 'from-gray-500 to-gray-600';
  };

  const getCategoryName = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category?.name || 'Autre';
  };

  const completedGoals = goals.filter(goal => goal.completed);
  const activeGoals = goals.filter(goal => !goal.completed);
  const totalProgress = goals.length > 0 
    ? goals.reduce((sum, goal) => sum + getProgressPercentage(goal), 0) / goals.length 
    : 0;

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-gradient-to-r from-sky-500 to-blue-500 rounded-xl text-white mr-3">
              <Target className="w-6 h-6" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-sky-500 to-blue-500 bg-clip-text text-transparent">
              Objectifs & Suivi
            </h1>
          </div>
          <p className="text-gray-600">Définissez et suivez vos objectifs personnels et professionnels</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-gray-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Objectifs Actifs</p>
                  <p className="text-2xl font-bold text-gray-800">{activeGoals.length}</p>
                </div>
                <Target className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-gray-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Objectifs Complétés</p>
                  <p className="text-2xl font-bold text-gray-800">{completedGoals.length}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-gray-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Progression Moyenne</p>
                  <p className="text-2xl font-bold text-gray-800">{Math.round(totalProgress)}%</p>
                </div>
                <TrendingUp className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-gray-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Taux de Réussite</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {goals.length > 0 ? Math.round((completedGoals.length / goals.length) * 100) : 0}%
                  </p>
                </div>
                <Award className="w-8 h-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Add Goal Button */}
        <div className="text-center mb-6">
          <Button
            onClick={() => setShowAddForm(!showAddForm)}
            className="px-8 py-3 bg-gradient-to-r from-sky-500 to-blue-500 text-white rounded-xl hover:from-sky-600 hover:to-blue-600 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <Plus className="w-5 h-5 mr-2" />
            Ajouter un Objectif
          </Button>
        </div>

        {/* Add Goal Form */}
        {showAddForm && (
          <Card className="border-0 shadow-2xl bg-gradient-to-br from-white to-gray-50 mb-8">
            <CardHeader>
              <CardTitle className="text-gray-700 font-medium">Nouvel Objectif</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  placeholder="Titre de l'objectif"
                  value={newGoal.title}
                  onChange={(e) => setNewGoal({...newGoal, title: e.target.value})}
                />
                <select
                  value={newGoal.category}
                  onChange={(e) => setNewGoal({...newGoal, category: e.target.value})}
                  className="p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <Input
                placeholder="Description"
                value={newGoal.description}
                onChange={(e) => setNewGoal({...newGoal, description: e.target.value})}
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input
                  type="number"
                  placeholder="Objectif"
                  value={newGoal.target}
                  onChange={(e) => setNewGoal({...newGoal, target: parseInt(e.target.value) || 1})}
                />
                <Input
                  placeholder="Unité (ex: kg, km, livres)"
                  value={newGoal.unit}
                  onChange={(e) => setNewGoal({...newGoal, unit: e.target.value})}
                />
                <Input
                  type="date"
                  value={newGoal.deadline}
                  onChange={(e) => setNewGoal({...newGoal, deadline: e.target.value})}
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button
                  onClick={() => setShowAddForm(false)}
                  className="px-6 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200"
                >
                  Annuler
                </Button>
                <Button
                  onClick={addGoal}
                  className="px-6 py-2 bg-gradient-to-r from-sky-500 to-blue-500 text-white hover:from-sky-600 hover:to-blue-600"
                >
                  Ajouter
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Goals List */}
        <div className="space-y-6">
          {goals.map(goal => (
            <Card key={goal.id} className="border-0 shadow-lg bg-gradient-to-br from-white to-gray-50">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      {goal.completed ? (
                        <CheckCircle className="w-6 h-6 text-green-500" />
                      ) : (
                        <Circle className="w-6 h-6 text-gray-400" />
                      )}
                      <h3 className={`text-xl font-semibold ${goal.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                        {goal.title}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r ${getCategoryColor(goal.category)}`}>
                        {getCategoryName(goal.category)}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-3">{goal.description}</p>
                    
                    {/* Progress Bar */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Progression: {goal.current} / {goal.target} {goal.unit}</span>
                        <span>{Math.round(getProgressPercentage(goal))}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-500 ${
                            goal.completed 
                              ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
                              : 'bg-gradient-to-r from-sky-500 to-blue-500'
                          }`}
                          style={{ width: `${getProgressPercentage(goal)}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Deadline */}
                    <div className="flex items-center mt-3 text-sm text-gray-500">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>
                        Échéance: {goal.deadline.toLocaleDateString('fr-FR')} 
                        ({getDaysUntilDeadline(goal.deadline)} jours restants)
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col space-y-2 ml-4">
                    {!goal.completed && (
                      <div className="flex space-x-1">
                        <Button
                          onClick={() => updateProgress(goal.id, -1)}
                          className="p-2 bg-red-100 text-red-600 hover:bg-red-200"
                        >
                          -
                        </Button>
                        <Button
                          onClick={() => updateProgress(goal.id, 1)}
                          className="p-2 bg-green-100 text-green-600 hover:bg-green-200"
                        >
                          +
                        </Button>
                      </div>
                    )}
                    <Button
                      onClick={() => deleteGoal(goal.id)}
                      className="p-2 bg-red-100 text-red-600 hover:bg-red-200"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {goals.length === 0 && (
          <Card className="border-0 shadow-2xl bg-gradient-to-br from-white to-gray-50">
            <CardContent className="text-center py-12">
              <Target className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Aucun objectif défini</h3>
              <p className="text-gray-500 mb-4">Commencez par ajouter votre premier objectif pour commencer à progresser !</p>
              <Button
                onClick={() => setShowAddForm(true)}
                className="px-6 py-2 bg-gradient-to-r from-sky-500 to-blue-500 text-white hover:from-sky-600 hover:to-blue-600"
              >
                <Plus className="w-4 h-4 mr-2" />
                Ajouter un Objectif
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Tips */}
        <div className="text-center mt-8">
          <div className="bg-gradient-to-r from-sky-50 to-blue-50 rounded-xl p-4 border border-sky-100">
            <h3 className="font-semibold text-gray-800 mb-2">💡 Conseils pour atteindre vos objectifs</h3>
            <p className="text-sm text-gray-600">
              Définissez des objectifs SMART (Spécifiques, Mesurables, Atteignables, Réalistes, Temporels). 
              Suivez régulièrement votre progression et célébrez vos réussites !
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 