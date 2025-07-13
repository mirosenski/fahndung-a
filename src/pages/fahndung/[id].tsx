import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Shield, ArrowLeft, Edit, Globe, Phone, MapPin, Calendar, User, FileText } from "lucide-react";

// Mock-Daten für Demo
const mockInvestigation = {
  id: "1",
  title: "Elias Winter",
  category: "WANTED_PERSON",
  priority: "URGENT",
  location: "Heidelberg",
  date: "2024-06-02",
  caseNumber: "BW-2034/7",
  shortInfo: "Tatverdächtiger nach Einbruch",
  description: "Elias Winter wird wegen Einbruch in Heidelberg gesucht. Der Tatverdächtige wurde zuletzt in der Altstadt gesehen.",
  context: "Der Einbruch ereignete sich am 02.06.2024 in der Heidelberger Altstadt. Zeugen haben die Person beschrieben.",
  question: "Wer erkennt die Person?",
  age: "28",
  height: "175 cm",
  build: "schlank",
  hairColor: "dunkelbraun",
  hairStyle: "kurz",
  eyes: "braun",
  features: "Tattoo am linken Unterarm",
  clothing: "schwarze Kapuzenjacke, dunkle Jeans",
  tel: "06221/110",
  email: "kripo.heidelberg@polizei.bwl.de",
  station: "PP Heidelberg",
  status: "PUBLISHED",
};

export default function InvestigationDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const [activeTab, setActiveTab] = useState("details");

  function getCategoryLabel(category: string): string {
    const labels = {
      "WANTED_PERSON": "Straftäter",
      "MISSING_PERSON": "Vermisste Person",
      "UNKNOWN_DEAD": "Unbekannte Tote",
      "STOLEN_GOODS": "Gesuchte Sachen",
    };
    return labels[category as keyof typeof labels] || category;
  }

  function getPriorityBadge(priority: string) {
    switch (priority) {
      case "URGENT":
        return <Badge variant="destructive">EILFAHNDUNG</Badge>;
      case "NORMAL":
        return <Badge variant="outline">Normal</Badge>;
      default:
        return <Badge variant="outline">{priority}</Badge>;
    }
  }

  function getStatusBadge(status: string) {
    switch (status) {
      case "PUBLISHED":
        return <Badge variant="default">Veröffentlicht</Badge>;
      case "DRAFT":
        return <Badge variant="secondary">Entwurf</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  }

  const tabs = [
    { id: "details", label: "Details", icon: FileText },
    { id: "description", label: "Beschreibung", icon: User },
    { id: "contact", label: "Kontakt", icon: Phone },
  ];

  return (
    <>
      <Head>
        <title>{mockInvestigation.title} - Fahndung A</title>
        <meta name="description" content={`Fahndung: ${mockInvestigation.title}`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Shield className="w-8 h-8 text-primary" />
              <h1 className="text-2xl font-bold">Fahndung A</h1>
            </div>
            <nav className="flex items-center space-x-6">
              <Link href="/" className="text-sm font-medium hover:text-primary">
                Startseite
              </Link>
              <Link href="/admin" className="text-sm font-medium hover:text-primary">
                Dashboard
              </Link>
              <Link href="/wizard-complete" className="text-sm font-medium hover:text-primary">
                Neue Fahndung
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <div className="flex items-center space-x-2 mb-6">
            <Link href="/" className="text-sm text-gray-500 hover:text-primary">
              Startseite
            </Link>
            <span className="text-gray-400">/</span>
            <Link href="/admin" className="text-sm text-gray-500 hover:text-primary">
              Dashboard
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-sm font-medium">Fahndung {id}</span>
          </div>

          {/* Header mit Aktionen */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" onClick={() => router.back()}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Zurück
              </Button>
              <div>
                <h1 className="text-3xl font-bold">{mockInvestigation.title}</h1>
                <p className="text-gray-600 mt-1">{mockInvestigation.shortInfo}</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline">
                <Edit className="w-4 h-4 mr-2" />
                Bearbeiten
              </Button>
              <Button>
                <Globe className="w-4 h-4 mr-2" />
                Veröffentlichen
              </Button>
            </div>
          </div>

          {/* Status und Badges */}
          <div className="flex items-center space-x-4 mb-6">
            {getPriorityBadge(mockInvestigation.priority)}
            <Badge variant="secondary">
              {getCategoryLabel(mockInvestigation.category)}
            </Badge>
            {getStatusBadge(mockInvestigation.status)}
            <div className="text-sm text-gray-500">
              Aktenzeichen: {mockInvestigation.caseNumber}
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b mb-6">
            <nav className="flex space-x-8">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab.id
                        ? "border-primary text-primary"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {activeTab === "details" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Fahndungsdetails</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-semibold mb-3">Grunddaten</h3>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Name:</span>
                            <span className="font-medium">{mockInvestigation.title}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Alter:</span>
                            <span className="font-medium">{mockInvestigation.age} Jahre</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Größe:</span>
                            <span className="font-medium">{mockInvestigation.height}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Statur:</span>
                            <span className="font-medium">{mockInvestigation.build}</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-3">Äußere Merkmale</h3>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Haarfarbe:</span>
                            <span className="font-medium">{mockInvestigation.hairColor}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Haarstil:</span>
                            <span className="font-medium">{mockInvestigation.hairStyle}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Augenfarbe:</span>
                            <span className="font-medium">{mockInvestigation.eyes}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Besondere Merkmale:</span>
                            <span className="font-medium">{mockInvestigation.features}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-3">Bekleidung</h3>
                      <p className="text-gray-700">{mockInvestigation.clothing}</p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {activeTab === "description" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Falldetails</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="font-semibold mb-3">Hauptfrage</h3>
                      <p className="text-lg font-medium text-primary">{mockInvestigation.question}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-3">Beschreibung</h3>
                      <p className="text-gray-700">{mockInvestigation.description}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-3">Hintergrund</h3>
                      <p className="text-gray-700">{mockInvestigation.context}</p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {activeTab === "contact" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Kontaktdaten</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-gray-500" />
                      <div>
                        <div className="font-medium">Telefon</div>
                        <div className="text-gray-600">{mockInvestigation.tel}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-5 h-5 text-gray-500" />
                      <div>
                        <div className="font-medium">Dienststelle</div>
                        <div className="text-gray-600">{mockInvestigation.station}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Calendar className="w-5 h-5 text-gray-500" />
                      <div>
                        <div className="font-medium">Datum</div>
                        <div className="text-gray-600">
                          {new Date(mockInvestigation.date).toLocaleDateString("de-DE")}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Zusammenfassung</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-gray-500" />
                    <div>
                      <div className="font-medium">Ort</div>
                      <div className="text-gray-600">{mockInvestigation.location}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-gray-500" />
                    <div>
                      <div className="font-medium">Datum</div>
                      <div className="text-gray-600">
                        {new Date(mockInvestigation.date).toLocaleDateString("de-DE")}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <FileText className="w-5 h-5 text-gray-500" />
                    <div>
                      <div className="font-medium">Aktenzeichen</div>
                      <div className="text-gray-600 font-mono">{mockInvestigation.caseNumber}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Aktionen</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full" variant="outline">
                    <Edit className="w-4 h-4 mr-2" />
                    Bearbeiten
                  </Button>
                  <Button className="w-full">
                    <Globe className="w-4 h-4 mr-2" />
                    Veröffentlichen
                  </Button>
                  <Button className="w-full" variant="outline">
                    <Phone className="w-4 h-4 mr-2" />
                    Kontakt aufnehmen
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </>
  );
} 