"use client";

import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Progress } from "~/components/ui/progress";
import { Badge } from "~/components/ui/badge";
import { 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  FileText, 
  User, 
  UserCheck, 
  ClipboardList, 
  Phone,
  Shield,
  Eye,
  Globe
} from "lucide-react";
import { useWizard } from "./WizardContext";
import { WIZARD_STEPS, DEMO_CASES } from "~/types/wizard";

export function WizardComplete() {
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

  const [selectedDemo, setSelectedDemo] = useState("");

  if (!isClient) {
    return <div>Loading...</div>;
  }

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep((currentStep + 1) as any);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep((currentStep - 1) as any);
    }
  };

  const handleDemoSelect = (demoKey: string) => {
    setSelectedDemo(demoKey);
    loadDemoData(demoKey);
  };

  const handleFinish = () => {
    alert("Fahndung wurde erfolgreich erstellt!");
    router.push("/admin");
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Kategorie *</label>
                <select
                  value={data.step1.category}
                  onChange={(e) => updateData("step1", { category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="">Kategorie wählen</option>
                  <option value="WANTED_PERSON">Straftäter</option>
                  <option value="MISSING_PERSON">Vermisste Person</option>
                  <option value="UNKNOWN_DEAD">Unbekannte Tote</option>
                  <option value="STOLEN_GOODS">Gesuchte Sachen</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Priorität *</label>
                <select
                  value={data.step1.priority}
                  onChange={(e) => updateData("step1", { priority: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="Normal">Normal</option>
                  <option value="EILFAHNDUNG">EILFAHNDUNG</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Aktenzeichen *</label>
                <input
                  type="text"
                  value={data.step1.caseNumber}
                  onChange={(e) => updateData("step1", { caseNumber: e.target.value })}
                  placeholder="z.B. BW-1234/1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Interner Titel</label>
                <input
                  type="text"
                  value={data.step1.internalTitle}
                  onChange={(e) => updateData("step1", { internalTitle: e.target.value })}
                  placeholder="Interner Titel für die Verwaltung"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Name *</label>
                <input
                  type="text"
                  value={data.step2.displayName}
                  onChange={(e) => updateData("step2", { displayName: e.target.value })}
                  placeholder="Name der gesuchten Person"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Ort *</label>
                <input
                  type="text"
                  value={data.step2.location}
                  onChange={(e) => updateData("step2", { location: e.target.value })}
                  placeholder="Ort der Fahndung"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Kurzinformation</label>
                <input
                  type="text"
                  value={data.step2.shortInfo}
                  onChange={(e) => updateData("step2", { shortInfo: e.target.value })}
                  placeholder="Kurze Beschreibung"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Datum</label>
                <input
                  type="date"
                  value={data.step2.date}
                  onChange={(e) => updateData("step2", { date: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Alter</label>
                <input
                  type="text"
                  value={data.step3.age}
                  onChange={(e) => updateData("step3", { age: e.target.value })}
                  placeholder="z.B. 28"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Größe</label>
                <input
                  type="text"
                  value={data.step3.height}
                  onChange={(e) => updateData("step3", { height: e.target.value })}
                  placeholder="z.B. 175 cm"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Statur</label>
                <input
                  type="text"
                  value={data.step3.build}
                  onChange={(e) => updateData("step3", { build: e.target.value })}
                  placeholder="z.B. schlank"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Haarfarbe</label>
                <input
                  type="text"
                  value={data.step3.hairColor}
                  onChange={(e) => updateData("step3", { hairColor: e.target.value })}
                  placeholder="z.B. dunkelbraun"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Haarstil</label>
                <input
                  type="text"
                  value={data.step3.hairStyle}
                  onChange={(e) => updateData("step3", { hairStyle: e.target.value })}
                  placeholder="z.B. kurz"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Augenfarbe</label>
                <input
                  type="text"
                  value={data.step3.eyes}
                  onChange={(e) => updateData("step3", { eyes: e.target.value })}
                  placeholder="z.B. braun"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Besondere Merkmale</label>
                <input
                  type="text"
                  value={data.step3.features}
                  onChange={(e) => updateData("step3", { features: e.target.value })}
                  placeholder="z.B. Tattoo am linken Unterarm"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Bekleidung</label>
              <input
                type="text"
                value={data.step3.clothing}
                onChange={(e) => updateData("step3", { clothing: e.target.value })}
                placeholder="z.B. schwarze Kapuzenjacke, dunkle Jeans"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Hauptfrage *</label>
              <input
                type="text"
                value={data.step4.question}
                onChange={(e) => updateData("step4", { question: e.target.value })}
                placeholder="z.B. Wer erkennt die Person?"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Beschreibung *</label>
              <textarea
                value={data.step4.description}
                onChange={(e) => updateData("step4", { description: e.target.value })}
                placeholder="Detaillierte Beschreibung des Falls"
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Hintergrund</label>
              <textarea
                value={data.step4.context}
                onChange={(e) => updateData("step4", { context: e.target.value })}
                placeholder="Zusätzliche Hintergrundinformationen"
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Telefon *</label>
                <input
                  type="tel"
                  value={data.step5.tel}
                  onChange={(e) => updateData("step5", { tel: e.target.value })}
                  placeholder="z.B. 06221/110"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">E-Mail</label>
                <input
                  type="email"
                  value={data.step5.email}
                  onChange={(e) => updateData("step5", { email: e.target.value })}
                  placeholder="z.B. kripo@polizei.bwl.de"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Dienststelle *</label>
                <input
                  type="text"
                  value={data.step5.station}
                  onChange={(e) => updateData("step5", { station: e.target.value })}
                  placeholder="z.B. PP Heidelberg"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Ort</label>
                <input
                  type="text"
                  value={data.step5.location}
                  onChange={(e) => updateData("step5", { location: e.target.value })}
                  placeholder="z.B. Heidelberg"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="preview"
                  checked={data.step5.preview}
                  onChange={(e) => updateData("step5", { preview: e.target.checked })}
                  className="rounded"
                />
                <label htmlFor="preview" className="text-sm font-medium">
                  Vorschau aktivieren
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="publish"
                  checked={data.step5.publish}
                  onChange={(e) => updateData("step5", { publish: e.target.checked })}
                  className="rounded"
                />
                <label htmlFor="publish" className="text-sm font-medium">
                  Sofort veröffentlichen
                </label>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Shield className="w-8 h-8 text-primary" />
              <Link href="/" className="text-2xl font-bold hover:text-primary">
                Fahndung
              </Link>
            </div>
            <nav className="flex items-center space-x-6">
              <Link href="/admin" className="text-sm font-medium hover:text-primary">
                Dashboard
              </Link>
              <Link href="/wizard-complete" className="text-sm font-medium text-primary">
                Neue Fahndung
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <h1 className="text-3xl font-bold">Neue Fahndung erstellen</h1>
            </div>
            <Button variant="outline" onClick={() => router.push("/")}>
              Abbrechen
            </Button>
          </div>

        {/* Demo-Auswahl (nur im ersten Schritt) */}
        {currentStep === 1 && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Demo-Daten laden</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Object.keys(DEMO_CASES).map((demoKey) => (
                  <Button
                    key={demoKey}
                    variant={selectedDemo === demoKey ? "default" : "outline"}
                    onClick={() => handleDemoSelect(demoKey)}
                    className="justify-start"
                  >
                    <Check className="w-4 h-4 mr-2" />
                    {demoKey}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Fortschritt</span>
            <span className="text-sm text-gray-500">{currentStep} von 5</span>
          </div>
          <Progress value={getProgress()} className="h-2" />
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Schritte</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {WIZARD_STEPS.map((step) => {
                    const Icon = step.icon === "file-text" ? FileText :
                                step.icon === "user" ? User :
                                step.icon === "user-check" ? UserCheck :
                                step.icon === "clipboard-list" ? ClipboardList :
                                step.icon === "phone" ? Phone : FileText;
                    
                    return (
                      <div
                        key={step.id}
                        className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer ${
                          currentStep === step.id
                            ? "bg-primary text-primary-foreground"
                            : currentStep > step.id
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-600"
                        }`}
                                                 onClick={() => setCurrentStep(step.id as any)}
                      >
                        <Icon className="w-5 h-5" />
                        <div className="flex-1">
                          <div className="font-medium">{step.title}</div>
                          <div className="text-xs opacity-75">{step.description}</div>
                        </div>
                        {currentStep > step.id && <Check className="w-4 h-4" />}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>{WIZARD_STEPS[currentStep - 1]?.title}</CardTitle>
              </CardHeader>
              <CardContent>
                {renderStepContent()}
              </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex justify-between mt-6">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={!canGoPrevious()}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Zurück
              </Button>
              
              <div className="flex space-x-2">
                <Button variant="outline" onClick={resetData}>
                  Zurücksetzen
                </Button>
                {currentStep === 5 ? (
                  <Button onClick={handleFinish} disabled={!canGoNext()}>
                    <Globe className="w-4 h-4 mr-2" />
                    Fahndung erstellen
                  </Button>
                ) : (
                  <Button onClick={handleNext} disabled={!canGoNext()}>
                    Weiter
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
        </main>

        {/* Footer */}
        <footer className="bg-gray-800 text-white py-8">
          <div className="container mx-auto px-4 text-center">
            <p className="text-sm text-gray-400">
              © 2024 Fahndung - Ein System zur Verwaltung öffentlicher Fahndungen
            </p>
          </div>
        </footer>
    </>
  );
} 