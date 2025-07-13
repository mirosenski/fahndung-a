"use client";

import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, Save, AlertCircle, CheckCircle, Upload, MapPin, Calendar, User, FileText, Shield, Camera, Eye, CreditCard, Phone, Mail, Share2, Printer, RotateCw, Info } from 'lucide-react';
import { useRouter } from "next/navigation";
import { useWizard } from "./WizardContext";
import WizardPreviewTabs from "./WizardPreviewTabs";
import { Header } from "~/components/layout/Header";
import { Footer } from "~/components/layout/Footer";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Badge } from "~/components/ui/badge";

interface FormData {
  [key: string]: any;
}

interface Category {
  id: string;
  label: string;
  icon: any;
  color: string;
  description: string;
}

export function Wizard() {
  const router = useRouter();
  const { 
    currentStep, 
    data, 
    isClient,
    setCurrentStep, 
    updateData, 
    resetData, 
    loadDemoData,
    getProgress,
    canGoNext,
    canGoPrevious 
  } = useWizard();

  const [category, setCategory] = useState<string>('');
  const [formData, setFormData] = useState<FormData>({});
  const [isAutoSaving, setIsAutoSaving] = useState<boolean>(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [errors, setErrors] = useState<FormData>({});
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const [selectedDemo, setSelectedDemo] = useState<string>("");

  // Auto-save functionality
  useEffect(() => {
    const autoSaveInterval = setInterval(() => {
      if (Object.keys(formData).length > 0) {
        handleAutoSave();
      }
    }, 10000);

    return () => clearInterval(autoSaveInterval);
  }, [formData]);

  const handleAutoSave = async () => {
    setIsAutoSaving(true);
    // Simulate save
    setTimeout(() => {
      setIsAutoSaving(false);
      setLastSaved(new Date());
    }, 1000);
  };

  const categories: Category[] = [
    { 
      id: 'WANTED_PERSON', 
      label: 'Straftäter', 
      icon: Shield,
      color: 'bg-red-500',
      description: 'Fahndung nach tatverdächtigen Personen'
    },
    { 
      id: 'MISSING_PERSON', 
      label: 'Vermisste Person', 
      icon: User,
      color: 'bg-blue-500',
      description: 'Suche nach vermissten Personen'
    },
    { 
      id: 'UNKNOWN_DEAD', 
      label: 'Unbekannte Tote', 
      icon: AlertCircle,
      color: 'bg-gray-500',
      description: 'Identifizierung unbekannter Verstorbener'
    },
    { 
      id: 'STOLEN_GOODS', 
      label: 'Gesuchte Sachen', 
      icon: FileText,
      color: 'bg-green-500',
      description: 'Fahndung nach gestohlenem Eigentum'
    }
  ];

  const getStepsForCategory = (cat: string): string[] => {
    const baseSteps = ['category', 'basic', 'media', 'contact'];
    const categorySteps: { [key: string]: string[] } = {
      'WANTED_PERSON': ['category', 'basic', 'crime', 'appearance', 'media', 'contact'],
      'MISSING_PERSON': ['category', 'basic', 'lastSeen', 'appearance', 'medical', 'media', 'contact'],
      'UNKNOWN_DEAD': ['category', 'basic', 'discovery', 'appearance', 'belongings', 'media', 'contact'],
      'STOLEN_GOODS': ['category', 'basic', 'item', 'theft', 'media', 'contact']
    };
    return categorySteps[cat] || baseSteps;
  };

  const steps = getStepsForCategory(category);
  const progress = steps.length > 0 ? (currentStep / steps.length) * 100 : 0;

  const nextStep = () => {
    if (validateStep()) {
      if (currentStep >= steps.length) {
        setShowPreview(true);
      } else {
        setCurrentStep((currentStep + 1) as any);
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((currentStep - 1) as any);
    }
  };

  const validateStep = (): boolean => {
    // Simple validation
    return true;
  };

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleBackToWizard = () => {
    setShowPreview(false);
  };

  const handleDemoSelect = (demoKey: string) => {
    setSelectedDemo(demoKey);
    loadDemoData(demoKey);
  };

  const handleFinish = () => {
    alert("Fahndung wurde erfolgreich erstellt!");
    router.replace("/admin");
  };

  const renderStepContent = () => {
    const currentStepName = steps[currentStep - 1];

    if (!currentStepName) {
      return <div>Step not found</div>;
    }

    switch (currentStepName) {
      case 'category':
        return <CategorySelection />;
      case 'basic':
        return <BasicInfoStep />;
      case 'crime':
        return <CrimeDetailsStep />;
      case 'appearance':
        return <AppearanceStep />;
      case 'media':
        return <MediaUploadStep />;
      case 'contact':
        return <ContactStep />;
      default:
        return <div>Step not found: {currentStepName}</div>;
    }
  };

  const CategorySelection = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Wählen Sie die Fahndungskategorie</h2>
        <p className="text-gray-600">Bitte wählen Sie die passende Kategorie für Ihre Fahndung aus.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <Card 
              key={cat.id}
              className={`cursor-pointer transition-all hover:shadow-md ${
                category === cat.id 
                  ? 'ring-2 ring-blue-500 bg-blue-50' 
                  : 'hover:border-gray-300'
              }`}
              onClick={() => {
                setCategory(cat.id);
                updateFormData('category', cat.id);
              }}
            >
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-lg ${cat.color} text-white`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{cat.label}</h3>
                    <p className="text-sm text-gray-600 mt-1">{cat.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );

  const BasicInfoStep = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Grundlegende Informationen</h2>
        <p className="text-gray-600">Erfassen Sie die wichtigsten Basisdaten.</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="priority">
            Priorität <span className="text-red-500">*</span>
          </Label>
          <select 
            id="priority"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            onChange={(e) => updateFormData('priority', e.target.value)}
            defaultValue={formData.priority || ''}
          >
            <option value="">Bitte wählen</option>
            <option value="NORMAL">Normal</option>
            <option value="URGENT">Dringend</option>
            <option value="CRITICAL">EILFAHNDUNG</option>
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="caseNumber">
            Aktenzeichen <span className="text-red-500">*</span>
          </Label>
          <Input
            id="caseNumber"
            type="text"
            placeholder="z.B. BW-2024/123"
            onChange={(e) => updateFormData('caseNumber', e.target.value)}
            defaultValue={formData.caseNumber || ''}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="internalTitle">
            Interner Titel
          </Label>
          <Input
            id="internalTitle"
            type="text"
            placeholder="Kurzer interner Titel"
            onChange={(e) => updateFormData('internalTitle', e.target.value)}
            defaultValue={formData.internalTitle || ''}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="publicTitle">
            Öffentlicher Titel <span className="text-red-500">*</span>
          </Label>
          <Input
            id="publicTitle"
            type="text"
            placeholder="Titel für die Öffentlichkeit"
            onChange={(e) => updateFormData('publicTitle', e.target.value)}
            defaultValue={formData.publicTitle || ''}
          />
        </div>
      </div>
    </div>
  );

  const CrimeDetailsStep = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Tatdetails</h2>
        <p className="text-gray-600">Beschreiben Sie die Straftat und Umstände.</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Tatvorwurf <span className="text-red-500">*</span>
          </label>
          <select 
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            onChange={(e) => updateFormData('crimeType', e.target.value)}
          >
            <option value="">Bitte wählen</option>
            <option value="murder">Mord/Totschlag</option>
            <option value="robbery">Raub/Überfall</option>
            <option value="fraud">Betrug</option>
            <option value="assault">Körperverletzung</option>
            <option value="other">Sonstiges</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Tatort <span className="text-red-500">*</span>
          </label>
          <div className="flex space-x-2">
            <input
              type="text"
              className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Ort eingeben"
              onChange={(e) => updateFormData('crimeLocation', e.target.value)}
            />
            <button className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
              <MapPin className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Tatzeit
          </label>
          <input
            type="datetime-local"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            onChange={(e) => updateFormData('crimeDate', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Tathergang
          </label>
          <textarea
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={4}
            placeholder="Beschreiben Sie den Tathergang..."
            onChange={(e) => updateFormData('crimeDescription', e.target.value)}
          />
          <p className="text-sm text-gray-500 mt-1">AI-Vorschläge verfügbar</p>
        </div>
      </div>
    </div>
  );

  const AppearanceStep = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Personenbeschreibung</h2>
        <p className="text-gray-600">Detaillierte Beschreibung der gesuchten Person.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Geschlecht</label>
          <select className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option value="">Bitte wählen</option>
            <option value="male">Männlich</option>
            <option value="female">Weiblich</option>
            <option value="diverse">Divers</option>
            <option value="unknown">Unbekannt</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Alter (geschätzt)</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="z.B. 25-30 Jahre"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Größe</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="z.B. 180 cm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Statur</label>
          <select className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option value="">Bitte wählen</option>
            <option value="slim">Schlank</option>
            <option value="normal">Normal</option>
            <option value="athletic">Sportlich</option>
            <option value="strong">Kräftig</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Besondere Merkmale</label>
        <textarea
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          rows={3}
          placeholder="Tattoos, Narben, Auffälligkeiten..."
        />
      </div>
    </div>
  );

  const MediaUploadStep = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Bilder und Medien</h2>
        <p className="text-gray-600">Laden Sie relevante Bilder und Dokumente hoch.</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Hauptbild</label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors cursor-pointer">
            <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-600">Klicken oder Datei hierher ziehen</p>
            <p className="text-sm text-gray-500 mt-2">JPG, PNG bis 10MB</p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Weitere Bilder</label>
          <div className="grid grid-cols-3 gap-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center hover:border-gray-400 transition-colors cursor-pointer">
                <Camera className="w-8 h-8 text-gray-400" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const ContactStep = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Kontakt & Veröffentlichung</h2>
        <p className="text-gray-600">Kontaktinformationen für Hinweise.</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Hinweise an <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="z.B. Kripo Stuttgart"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Telefon</label>
            <input
              type="tel"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="0711/110"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">E-Mail</label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="hinweise@polizei.de"
            />
          </div>
        </div>

        <div className="border-t pt-4">
          <label className="flex items-center space-x-3">
            <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" />
            <span>Sofort veröffentlichen</span>
          </label>
          <label className="flex items-center space-x-3 mt-2">
            <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" />
            <span>In sozialen Medien teilen</span>
          </label>
        </div>
      </div>
    </div>
  );

  // Early return for loading state
  if (!isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Laden...</p>
        </div>
      </div>
    );
  }

  // Show Preview Tabs if in preview mode
  if (showPreview) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <Header />

        {/* Preview Content */}
        <div className="max-w-6xl mx-auto px-4 py-8">
          <WizardPreviewTabs 
            formData={formData} 
            category={category}
            onBackToWizard={handleBackToWizard}
          />
        </div>

        {/* Footer */}
        <Footer />
      </div>
    );
  }

    return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />

      {/* Progress Bar */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">
              Schritt {currentStep} von {steps.length || 1}
            </span>
            <span className="text-sm text-gray-500">
              {Math.round(progress)}% abgeschlossen
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div
          className="bg-white rounded-lg shadow-sm p-8"
        >
          {renderStepContent()}
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Zurück
          </Button>

          <Button
            onClick={nextStep}
            disabled={!category && currentStep === 1}
          >
            {currentStep >= (steps.length || 1) ? 'Vorschau anzeigen' : 'Weiter'}
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
} 