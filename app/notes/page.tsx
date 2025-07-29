"use client"
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '@/components/ui/input';
import { BookOpen, Plus, Save, Trash2, Search, Calendar, Tag, Edit3 } from 'lucide-react';

interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export default function Notes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [currentNote, setCurrentNote] = useState<Note | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('all');

  useEffect(() => {
    const savedNotes = localStorage.getItem('versa-notes');
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('versa-notes', JSON.stringify(notes));
  }, [notes]);

  const createNewNote = () => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: 'Nouvelle note',
      content: '',
      tags: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };
    setNotes([newNote, ...notes]);
    setCurrentNote(newNote);
    setIsEditing(true);
  };

  const saveNote = () => {
    if (!currentNote) return;

    const updatedNote = {
      ...currentNote,
      updatedAt: new Date()
    };

    setNotes(notes.map(note => 
      note.id === currentNote.id ? updatedNote : note
    ));
    setCurrentNote(updatedNote);
    setIsEditing(false);
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter(note => note.id !== id));
    if (currentNote?.id === id) {
      setCurrentNote(null);
      setIsEditing(false);
    }
  };

  const addTag = (tag: string) => {
    if (!currentNote || !tag.trim()) return;
    
    const cleanTag = tag.trim().toLowerCase();
    if (!currentNote.tags.includes(cleanTag)) {
      const updatedNote = {
        ...currentNote,
        tags: [...currentNote.tags, cleanTag]
      };
      setCurrentNote(updatedNote);
    }
  };

  const removeTag = (tagToRemove: string) => {
    if (!currentNote) return;
    
    const updatedNote = {
      ...currentNote,
      tags: currentNote.tags.filter(tag => tag !== tagToRemove)
    };
    setCurrentNote(updatedNote);
  };

  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = selectedTag === 'all' || note.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  const allTags = Array.from(new Set(notes.flatMap(note => note.tags)));

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl text-white mr-3">
              <BookOpen className="w-6 h-6" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
              Notes & Journal
            </h1>
          </div>
          <p className="text-gray-600">Prenez des notes et organisez vos pensées quotidiennes</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sidebar - Notes List */}
          <div className="lg:col-span-1">
            <Card className="border-0 shadow-2xl bg-gradient-to-br from-white to-gray-50 h-full">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-gray-700 font-medium">Mes Notes</CardTitle>
                  <Button
                    onClick={createNewNote}
                    className="p-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg hover:from-amber-600 hover:to-orange-600"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Rechercher..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {/* Tags Filter */}
                {allTags.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-700">Filtrer par tag:</p>
                    <div className="flex flex-wrap gap-2">
                      <Button
                        onClick={() => setSelectedTag('all')}
                        className={`text-xs px-2 py-1 ${
                          selectedTag === 'all'
                            ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        Toutes
                      </Button>
                      {allTags.map(tag => (
                        <Button
                          key={tag}
                          onClick={() => setSelectedTag(tag)}
                          className={`text-xs px-2 py-1 ${
                            selectedTag === tag
                              ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          #{tag}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Notes List */}
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {filteredNotes.map(note => (
                    <div
                      key={note.id}
                      onClick={() => {
                        setCurrentNote(note);
                        setIsEditing(false);
                      }}
                      className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                        currentNote?.id === note.id
                          ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white'
                          : 'bg-gray-50 hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className={`font-medium truncate ${
                            currentNote?.id === note.id ? 'text-white' : 'text-gray-800'
                          }`}>
                            {note.title}
                          </h3>
                          <p className={`text-xs mt-1 line-clamp-2 ${
                            currentNote?.id === note.id ? 'text-amber-100' : 'text-gray-600'
                          }`}>
                            {note.content}
                          </p>
                          <div className="flex items-center mt-2">
                            <Calendar className={`w-3 h-3 mr-1 ${
                              currentNote?.id === note.id ? 'text-amber-100' : 'text-gray-400'
                            }`} />
                            <span className={`text-xs ${
                              currentNote?.id === note.id ? 'text-amber-100' : 'text-gray-500'
                            }`}>
                              {formatDate(note.updatedAt)}
                            </span>
                          </div>
                        </div>
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteNote(note.id);
                          }}
                          className={`p-1 ${
                            currentNote?.id === note.id
                              ? 'text-white hover:bg-amber-600'
                              : 'text-gray-400 hover:text-red-500'
                          }`}
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content - Note Editor */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-2xl bg-gradient-to-br from-white to-gray-50 h-full">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-gray-700 font-medium">
                    {currentNote ? 'Éditer la note' : 'Sélectionnez une note'}
                  </CardTitle>
                  {currentNote && (
                    <div className="flex space-x-2">
                      <Button
                        onClick={() => setIsEditing(!isEditing)}
                        className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg hover:from-blue-600 hover:to-cyan-600"
                      >
                        <Edit3 className="w-4 h-4" />
                      </Button>
                      {isEditing && (
                        <Button
                          onClick={saveNote}
                          className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600"
                        >
                          <Save className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {currentNote ? (
                  <>
                    {/* Title */}
                    <Input
                      placeholder="Titre de la note"
                      value={currentNote.title}
                      onChange={(e) => setCurrentNote({...currentNote, title: e.target.value})}
                      disabled={!isEditing}
                      className="text-xl font-semibold"
                    />

                    {/* Tags */}
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Tag className="w-4 h-4 text-gray-500" />
                        <span className="text-sm font-medium text-gray-700">Tags:</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {currentNote.tags.map(tag => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 rounded-full text-xs flex items-center"
                          >
                            #{tag}
                            {isEditing && (
                              <button
                                onClick={() => removeTag(tag)}
                                className="ml-1 text-amber-600 hover:text-amber-800"
                              >
                                ×
                              </button>
                            )}
                          </span>
                        ))}
                        {isEditing && (
                          <Input
                            placeholder="Ajouter un tag..."
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                addTag(e.currentTarget.value);
                                e.currentTarget.value = '';
                              }
                            }}
                            className="w-24 text-xs"
                          />
                        )}
                      </div>
                    </div>

                    {/* Content */}
                    <textarea
                      placeholder="Contenu de votre note..."
                      value={currentNote.content}
                      onChange={(e) => setCurrentNote({...currentNote, content: e.target.value})}
                      disabled={!isEditing}
                      className="w-full h-64 p-4 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />

                    {/* Metadata */}
                    <div className="text-xs text-gray-500 space-y-1">
                      <p>Créé le: {formatDate(currentNote.createdAt)}</p>
                      <p>Modifié le: {formatDate(currentNote.updatedAt)}</p>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-12">
                    <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Sélectionnez une note ou créez-en une nouvelle</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Tips */}
        <div className="text-center mt-8">
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-4 border border-amber-100">
            <h3 className="font-semibold text-gray-800 mb-2">💡 Conseils d&apos;utilisation</h3>
            <p className="text-sm text-gray-600">
              Utilisez les tags pour organiser vos notes. La recherche fonctionne sur le titre et le contenu. Vos notes sont automatiquement sauvegardées.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 