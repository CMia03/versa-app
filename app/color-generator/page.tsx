"use client"
import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '@/components/ui/input';
import { Palette, RefreshCw, Copy, Download, Eye, EyeOff } from 'lucide-react';

export default function ColorGenerator() {
  const [colors, setColors] = useState<string[]>([]);
  const [selectedColor, setSelectedColor] = useState('#667eea');
  const [showHex, setShowHex] = useState(true);
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const generateRandomColor = () => {
    return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
  };

  const generatePalette = useCallback(() => {
    const newColors = Array.from({ length: 5 }, () => generateRandomColor());
    setColors(newColors);
  }, []);

  const generateFromColor = (baseColor: string) => {
    const palette = [
      baseColor,
      adjustBrightness(baseColor, 0.2),
      adjustBrightness(baseColor, -0.2),
      adjustHue(baseColor, 30),
      adjustHue(baseColor, -30)
    ];

    setColors(palette);
  };

  const adjustBrightness = (color: string, factor: number) => {
    const base = color.replace('#', '');
    const r = parseInt(base.substr(0, 2), 16);
    const g = parseInt(base.substr(2, 2), 16);
    const b = parseInt(base.substr(4, 2), 16);

    const newR = Math.max(0, Math.min(255, Math.round(r + (255 - r) * factor)));
    const newG = Math.max(0, Math.min(255, Math.round(g + (255 - g) * factor)));
    const newB = Math.max(0, Math.min(255, Math.round(b + (255 - b) * factor)));

    return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
  };

  const adjustHue = (color: string, degrees: number) => {
    const base = color.replace('#', '');
    const r = parseInt(base.substr(0, 2), 16) / 255;
    const g = parseInt(base.substr(2, 2), 16) / 255;
    const b = parseInt(base.substr(4, 2), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    h = (h * 360 + degrees) % 360;
    h /= 360;

    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };

    let newR, newG, newB;
    if (s === 0) {
      newR = newG = newB = l;
    } else {
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      newR = hue2rgb(p, q, h + 1/3);
      newG = hue2rgb(p, q, h);
      newB = hue2rgb(p, q, h - 1/3);
    }

    return `#${Math.round(newR * 255).toString(16).padStart(2, '0')}${Math.round(newG * 255).toString(16).padStart(2, '0')}${Math.round(newB * 255).toString(16).padStart(2, '0')}`;
  };

  const copyToClipboard = async (color: string) => {
    try {
      await navigator.clipboard.writeText(color);
      setCopiedColor(color);
      setTimeout(() => setCopiedColor(null), 2000);
    } catch (err) {
      console.error('Failed to copy color:', err);
    }
  };

  const getContrastColor = (hexColor: string) => {
    const base = hexColor.replace('#', '');
    const r = parseInt(base.substr(0, 2), 16);
    const g = parseInt(base.substr(2, 2), 16);
    const b = parseInt(base.substr(4, 2), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 128 ? '#000000' : '#ffffff';
  };

  useEffect(() => {
    generatePalette();
  }, [generatePalette]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-gradient-to-r from-violet-500 to-purple-500 rounded-xl text-white mr-3">
              <Palette className="w-6 h-6" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-500 to-purple-500 bg-clip-text text-transparent">
              Générateur de Couleurs
            </h1>
          </div>
          <p className="text-gray-600">Créez et explorez des palettes de couleurs harmonieuses</p>
        </div>

        {/* Color Input */}
        <Card className="border-0 shadow-2xl bg-gradient-to-br from-white to-gray-50 mb-6">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <Input
                  type="color"
                  value={selectedColor}
                  onChange={(e) => setSelectedColor(e.target.value)}
                  className="w-full h-12 rounded-lg cursor-pointer"
                />
              </div>
              <Button
                onClick={() => generateFromColor(selectedColor)}
                className="px-6 py-3 bg-gradient-to-r from-violet-500 to-purple-500 text-white rounded-xl hover:from-violet-600 hover:to-purple-600 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Générer Palette
              </Button>
              <Button
                onClick={generatePalette}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <RefreshCw className="w-5 h-5 mr-2" />
                Aléatoire
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Color Palette */}
        <Card className="border-0 shadow-2xl bg-gradient-to-br from-white to-gray-50 mb-6">
          <CardHeader className="pb-6">
            <div className="flex items-center justify-between">
              <CardTitle className="text-gray-700 font-medium">Palette de Couleurs</CardTitle>
              <Button
                onClick={() => setShowHex(!showHex)}
                className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
              >
                {showHex ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {colors.map((color, index) => (
                <div key={index} className="group relative">
                  <div
                    className="h-32 rounded-xl shadow-lg cursor-pointer transition-transform duration-200 hover:scale-105"
                    style={{ backgroundColor: color }}
                    onClick={() => copyToClipboard(color)}
                  >
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <Copy className="w-6 h-6" style={{ color: getContrastColor(color) }} />
                    </div>
                  </div>
                  {showHex && (
                    <div className="mt-2 text-center">
                      <p className="text-sm font-mono text-gray-700">{color}</p>
                      {copiedColor === color && (
                        <p className="text-xs text-green-600 font-medium">Copié !</p>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Color Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Card className="border-0 shadow-2xl bg-gradient-to-br from-white to-gray-50">
            <CardHeader>
              <CardTitle className="text-gray-700 font-medium">Couleur Sélectionnée</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div
                  className="h-20 rounded-xl shadow-lg"
                  style={{ backgroundColor: selectedColor }}
                ></div>
                <div className="space-y-2">
                  <p className="text-sm font-mono text-gray-700">HEX: {selectedColor}</p>
                  <p className="text-sm font-mono text-gray-700">
                    RGB: {(() => {
                      const base = selectedColor.replace('#', '');
                      const r = parseInt(base.substr(0, 2), 16);
                      const g = parseInt(base.substr(2, 2), 16);
                      const b = parseInt(base.substr(4, 2), 16);
                      return `${r}, ${g}, ${b}`;
                    })()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-2xl bg-gradient-to-br from-white to-gray-50">
            <CardHeader>
              <CardTitle className="text-gray-700 font-medium">Outils</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button
                  onClick={() => copyToClipboard(selectedColor)}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copier la couleur
                </Button>
                <Button
                  onClick={() => copyToClipboard(colors.join(', '))}
                  className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Copier la palette
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tips */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-violet-50 to-purple-50 rounded-xl p-4 border border-violet-100">
            <h3 className="font-semibold text-gray-800 mb-2">💡 Conseils d&apos;utilisation</h3>
            <p className="text-sm text-gray-600">
              Cliquez sur une couleur pour la copier. Utilisez le sélecteur de couleur pour créer des palettes harmonieuses basées sur une couleur de votre choix.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 