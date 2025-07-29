"use client"
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar, Plus, Edit3, Trash2, ChevronLeft, ChevronRight, Clock, MapPin, Users, Tag } from 'lucide-react';

interface Event {
  id: string;
  title: string;
  description: string;
  date: Date;
  time: string;
  location: string;
  category: string;
  attendees: string[];
  createdAt: Date;
}

export default function CalendarPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    category: 'personal',
    attendees: ''
  });

  const categories = [
    { id: 'personal', name: 'Personnel', color: 'from-blue-500 to-cyan-500' },
    { id: 'work', name: 'Travail', color: 'from-green-500 to-emerald-500' },
    { id: 'meeting', name: 'Réunion', color: 'from-purple-500 to-violet-500' },
    { id: 'health', name: 'Santé', color: 'from-red-500 to-pink-500' },
    { id: 'social', name: 'Social', color: 'from-yellow-500 to-orange-500' }
  ];

  useEffect(() => {
    const savedEvents = localStorage.getItem('versa-calendar-events');
    if (savedEvents) {
      setEvents(JSON.parse(savedEvents));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('versa-calendar-events', JSON.stringify(events));
  }, [events]);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();
    
    return { daysInMonth, startingDay };
  };

  const getMonthName = (date: Date) => {
    return date.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
  };

  const getWeekDays = () => {
    return ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
  };

  const getCalendarDays = () => {
    const { daysInMonth, startingDay } = getDaysInMonth(currentDate);
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDay; i++) {
      days.push(null);
    }
    
    // Add all days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(currentDate.getFullYear(), currentDate.getMonth(), i));
    }
    
    return days;
  };

  const getEventsForDate = (date: Date) => {
    return events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.toDateString() === date.toDateString();
    });
  };

  const addEvent = () => {
    if (!newEvent.title || !newEvent.date) return;

    const event: Event = {
      id: Date.now().toString(),
      title: newEvent.title,
      description: newEvent.description,
      date: new Date(newEvent.date),
      time: newEvent.time,
      location: newEvent.location,
      category: newEvent.category,
      attendees: newEvent.attendees ? newEvent.attendees.split(',').map(a => a.trim()) : [],
      createdAt: new Date()
    };

    setEvents([...events, event]);
    setNewEvent({
      title: '',
      description: '',
      date: '',
      time: '',
      location: '',
      category: 'personal',
      attendees: ''
    });
    setShowAddForm(false);
  };

  const updateEvent = () => {
    if (!editingEvent) return;

    const updatedEvent = {
      ...editingEvent,
      title: newEvent.title,
      description: newEvent.description,
      date: new Date(newEvent.date),
      time: newEvent.time,
      location: newEvent.location,
      category: newEvent.category,
      attendees: newEvent.attendees ? newEvent.attendees.split(',').map(a => a.trim()) : []
    };

    setEvents(events.map(event => event.id === editingEvent.id ? updatedEvent : event));
    setEditingEvent(null);
    setNewEvent({
      title: '',
      description: '',
      date: '',
      time: '',
      location: '',
      category: 'personal',
      attendees: ''
    });
    setShowAddForm(false);
  };

  const deleteEvent = (eventId: string) => {
    setEvents(events.filter(event => event.id !== eventId));
  };

  const editEvent = (event: Event) => {
    setEditingEvent(event);
    setNewEvent({
      title: event.title,
      description: event.description,
      date: event.date.toISOString().split('T')[0],
      time: event.time,
      location: event.location,
      category: event.category,
      attendees: event.attendees.join(', ')
    });
    setShowAddForm(true);
  };

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const getCategoryColor = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category?.color || 'from-gray-500 to-gray-600';
  };

  const getCategoryName = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category?.name || 'Autre';
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSelected = (date: Date) => {
    return selectedDate && date.toDateString() === selectedDate.toDateString();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-gradient-to-r from-rose-500 to-red-500 rounded-xl text-white mr-3">
              <Calendar className="w-6 h-6" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-rose-500 to-red-500 bg-clip-text text-transparent">
              Calendrier & Événements
            </h1>
          </div>
          <p className="text-gray-600">Planifiez vos événements et gérez votre agenda personnel</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Calendar */}
          <div className="lg:col-span-3">
            <Card className="border-0 shadow-2xl bg-gradient-to-br from-white to-gray-50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-gray-700 font-medium">
                    {getMonthName(currentDate)}
                  </CardTitle>
                  <div className="flex space-x-2">
                    <Button
                      onClick={previousMonth}
                      className="p-2 bg-gray-100 text-gray-600 hover:bg-gray-200"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={nextMonth}
                      className="p-2 bg-gray-100 text-gray-600 hover:bg-gray-200"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Week Days Header */}
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {getWeekDays().map(day => (
                    <div key={day} className="p-2 text-center text-sm font-medium text-gray-600">
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-1">
                  {getCalendarDays().map((date, index) => (
                    <div
                      key={index}
                      onClick={() => setSelectedDate(date)}
                      className={`min-h-24 p-2 border border-gray-100 cursor-pointer transition-all duration-200 ${
                        date
                          ? isToday(date)
                            ? 'bg-gradient-to-r from-rose-100 to-red-100 border-rose-200'
                            : isSelected(date)
                            ? 'bg-gradient-to-r from-blue-100 to-cyan-100 border-blue-200'
                            : 'hover:bg-gray-50'
                          : 'bg-gray-50'
                      }`}
                    >
                      {date && (
                        <>
                          <div className="text-sm font-medium text-gray-800 mb-1">
                            {date.getDate()}
                          </div>
                          <div className="space-y-1">
                            {getEventsForDate(date).slice(0, 2).map(event => (
                              <div
                                key={event.id}
                                className={`text-xs p-1 rounded truncate text-white bg-gradient-to-r ${getCategoryColor(event.category)}`}
                                title={event.title}
                              >
                                {event.title}
                              </div>
                            ))}
                            {getEventsForDate(date).length > 2 && (
                              <div className="text-xs text-gray-500">
                                +{getEventsForDate(date).length - 2} autres
                              </div>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Add Event Button */}
            <Card className="border-0 shadow-2xl bg-gradient-to-br from-white to-gray-50">
              <CardContent className="p-4">
                <Button
                  onClick={() => {
                    setShowAddForm(!showAddForm);
                    setEditingEvent(null);
                    setNewEvent({
                      title: '',
                      description: '',
                      date: selectedDate ? selectedDate.toISOString().split('T')[0] : '',
                      time: '',
                      location: '',
                      category: 'personal',
                      attendees: ''
                    });
                  }}
                  className="w-full bg-gradient-to-r from-rose-500 to-red-500 text-white hover:from-rose-600 hover:to-red-600"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Ajouter un Événement
                </Button>
              </CardContent>
            </Card>

            {/* Selected Date Events */}
            {selectedDate && (
              <Card className="border-0 shadow-2xl bg-gradient-to-br from-white to-gray-50">
                <CardHeader>
                  <CardTitle className="text-gray-700 font-medium text-sm">
                    Événements du {selectedDate.toLocaleDateString('fr-FR')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {getEventsForDate(selectedDate).length === 0 ? (
                    <p className="text-gray-500 text-sm">Aucun événement ce jour</p>
                  ) : (
                    getEventsForDate(selectedDate).map(event => (
                      <div key={event.id} className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-medium text-gray-800 text-sm">{event.title}</h4>
                          <div className="flex space-x-1">
                            <Button
                              onClick={() => editEvent(event)}
                              className="p-1 bg-blue-100 text-blue-600 hover:bg-blue-200"
                            >
                              <Edit3 className="w-3 h-3" />
                            </Button>
                            <Button
                              onClick={() => deleteEvent(event.id)}
                              className="p-1 bg-red-100 text-red-600 hover:bg-red-200"
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                        {event.time && (
                          <div className="flex items-center text-xs text-gray-600 mb-1">
                            <Clock className="w-3 h-3 mr-1" />
                            {event.time}
                          </div>
                        )}
                        {event.location && (
                          <div className="flex items-center text-xs text-gray-600 mb-1">
                            <MapPin className="w-3 h-3 mr-1" />
                            {event.location}
                          </div>
                        )}
                        <span className={`inline-block px-2 py-1 rounded-full text-xs text-white bg-gradient-to-r ${getCategoryColor(event.category)}`}>
                          {getCategoryName(event.category)}
                        </span>
                      </div>
                    ))
                  )}
                </CardContent>
              </Card>
            )}

            {/* Categories */}
            <Card className="border-0 shadow-2xl bg-gradient-to-br from-white to-gray-50">
              <CardHeader>
                <CardTitle className="text-gray-700 font-medium text-sm flex items-center">
                  <Tag className="w-4 h-4 mr-2" />
                  Catégories
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {categories.map(category => (
                  <div key={category.id} className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${category.color}`}></div>
                    <span className="text-sm text-gray-700">{category.name}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Add/Edit Event Form */}
        {showAddForm && (
          <Card className="border-0 shadow-2xl bg-gradient-to-br from-white to-gray-50 mt-6">
            <CardHeader>
              <CardTitle className="text-gray-700 font-medium">
                {editingEvent ? 'Modifier l\'événement' : 'Nouvel Événement'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  placeholder="Titre de l'événement"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                />
                <select
                  value={newEvent.category}
                  onChange={(e) => setNewEvent({...newEvent, category: e.target.value})}
                  className="p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
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
                value={newEvent.description}
                onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input
                  type="date"
                  value={newEvent.date}
                  onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                />
                <Input
                  type="time"
                  value={newEvent.time}
                  onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
                />
                <Input
                  placeholder="Lieu"
                  value={newEvent.location}
                  onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
                />
              </div>
              <Input
                placeholder="Participants (séparés par des virgules)"
                value={newEvent.attendees}
                onChange={(e) => setNewEvent({...newEvent, attendees: e.target.value})}
              />
              <div className="flex justify-end space-x-2">
                <Button
                  onClick={() => {
                    setShowAddForm(false);
                    setEditingEvent(null);
                  }}
                  className="px-6 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200"
                >
                  Annuler
                </Button>
                <Button
                  onClick={editingEvent ? updateEvent : addEvent}
                  className="px-6 py-2 bg-gradient-to-r from-rose-500 to-red-500 text-white hover:from-rose-600 hover:to-red-600"
                >
                  {editingEvent ? 'Modifier' : 'Ajouter'}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Tips */}
        <div className="text-center mt-8">
          <div className="bg-gradient-to-r from-rose-50 to-red-50 rounded-xl p-4 border border-rose-100">
            <h3 className="font-semibold text-gray-800 mb-2">💡 Conseils d'utilisation</h3>
            <p className="text-sm text-gray-600">
              Cliquez sur une date pour voir les événements du jour. Utilisez les catégories pour organiser vos événements. 
              Vos événements sont automatiquement sauvegardés.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 