import Head from "next/head";
import Link from "next/link";
import { Search, Plus, FileText, AlertTriangle, User, Calendar } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Input } from "~/components/ui/input";
import { Header } from "~/components/layout/Header";

// Mock-Daten für Demo
const recentInvestigations = [
  {
    id: "1",
    caseNumber: "BW-1234/1",
    title: "Max Mustermann",
    category: "WANTED_PERSON",
    priority: "URGENT",
    location: "Stuttgart",
    date: "2024-06-01",
    status: "PUBLISHED",
  },
  {
    id: "2",
    caseNumber: "BW-5678/2",
    title: "Anna Beispiel",
    category: "MISSING_PERSON",
    priority: "NORMAL",
    location: "Karlsruhe",
    date: "2024-05-30",
    status: "PUBLISHED",
  },
  {
    id: "3",
    caseNumber: "BW-9012/3",
    title: "Unbekannte Person",
    category: "UNKNOWN_DEAD",
    priority: "NORMAL",
    location: "Freiburg",
    date: "2024-05-15",
    status: "PUBLISHED",
  },
];

function getCategoryLabel(category: string): string {
  switch (category) {
    case "WANTED_PERSON": return "Straftäter";
    case "MISSING_PERSON": return "Vermisste Person";
    case "UNKNOWN_DEAD": return "Unbekannte Tote";
    case "STOLEN_GOODS": return "Gesuchte Sachen";
    default: return category;
  }
}

function getPriorityBadge(priority: string) {
  const isUrgent = priority === "URGENT";
  return (
    <Badge variant={isUrgent ? "destructive" : "secondary"}>
      {isUrgent ? "EILFAHNDUNG" : "Normal"}
    </Badge>
  );
}

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Fahndung - Öffentliche Fahndungen</title>
        <meta name="description" content="Öffentliche Fahndungen und Vermisstenmeldungen" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-white border-b">
          <div className="container mx-auto px-4 py-16">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-4">
                Öffentliche Fahndungen
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Hier finden Sie aktuelle Fahndungen und Vermisstenmeldungen der Polizei Baden-Württemberg.
                Helfen Sie mit, Personen zu finden oder wichtige Informationen zu liefern.
              </p>
              
              {/* Suchleiste */}
              <div className="max-w-md mx-auto mb-8">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Nach Namen, Ort oder Aktenzeichen suchen..."
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="flex justify-center space-x-4">
                <Button size="lg">
                  <Search className="w-4 h-4 mr-2" />
                  Alle Fahndungen anzeigen
                </Button>
                <Button variant="outline" size="lg">
                  <Plus className="w-4 h-4 mr-2" />
                  Neue Fahndung erstellen
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Statistiken */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Aktive Fahndungen</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground">
                    Veröffentlicht
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Eilfahndungen</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3</div>
                  <p className="text-xs text-muted-foreground">
                    Dringend
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Erfolgreich gelöst</CardTitle>
                  <User className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">8</div>
                  <p className="text-xs text-muted-foreground">
                    Dieses Jahr
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Letzte Aktualisierung</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Heute</div>
                  <p className="text-xs text-muted-foreground">
                    14:30 Uhr
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Aktuelle Fahndungen */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold">Aktuelle Fahndungen</h2>
              <Link href="/investigations" className="text-primary hover:underline">
                Alle anzeigen →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentInvestigations.map((investigation) => (
                <Card key={investigation.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{investigation.title}</CardTitle>
                      {getPriorityBadge(investigation.priority)}
                    </div>
                    <p className="text-sm text-gray-500">{investigation.caseNumber}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Kategorie:</span>
                        <span className="text-sm font-medium">
                          {getCategoryLabel(investigation.category)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Ort:</span>
                        <span className="text-sm font-medium">{investigation.location}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Datum:</span>
                        <span className="text-sm font-medium">
                          {new Date(investigation.date).toLocaleDateString("de-DE")}
                        </span>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t">
                      <Button className="w-full" variant="outline">
                        Details anzeigen
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Info Section */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl font-bold mb-6">Wie können Sie helfen?</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Search className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold mb-2">Achten Sie auf Details</h3>
                  <p className="text-gray-600 text-sm">
                    Schauen Sie sich die Fotos und Beschreibungen genau an. Auch kleine Details können wichtig sein.
                  </p>
                </div>
                <div>
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                    <AlertTriangle className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold mb-2">Nicht selbst eingreifen</h3>
                  <p className="text-gray-600 text-sm">
                    Wenn Sie eine gesuchte Person sehen, rufen Sie sofort die Polizei an. Greifen Sie nicht selbst ein.
                  </p>
                </div>
                <div>
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold mb-2">Informationen melden</h3>
                  <p className="text-gray-600 text-sm">
                    Haben Sie Informationen? Melden Sie diese über die angegebenen Kontaktwege.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
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
