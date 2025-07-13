import Head from "next/head";
import Link from "next/link";
import { InvestigationCard } from "~/components/InvestigationCard";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { Plus, Search, Filter, User, Shield, Phone } from "lucide-react";

// Mock-Daten für Demo
const mockInvestigations = [
  {
    id: "1",
    title: "Max Mustermann",
    category: "WANTED_PERSON",
    priority: "URGENT",
    location: "Stuttgart",
    date: "2024-06-01",
    imageUrl: undefined,
  },
  {
    id: "2",
    title: "Anna Beispiel",
    category: "MISSING_PERSON",
    priority: "NORMAL",
    location: "Karlsruhe",
    date: "2024-05-30",
    imageUrl: undefined,
  },
  {
    id: "3",
    title: "Unbekannte Person",
    category: "UNKNOWN_DEAD",
    priority: "NORMAL",
    location: "Freiburg",
    date: "2024-05-15",
    imageUrl: undefined,
  },
  {
    id: "4",
    title: "Mountainbike gestohlen",
    category: "STOLEN_GOODS",
    priority: "NORMAL",
    location: "Heidelberg",
    date: "2024-05-10",
    imageUrl: undefined,
  },
];

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Fahndung A - Öffentliche Fahndungen</title>
        <meta name="description" content="Öffentliche Fahndungen der Polizei" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
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
              <Link href="/wizard-complete" className="text-sm font-medium hover:text-primary">
                Neue Fahndung
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-4">Öffentliche Fahndungen</h2>
            <p className="text-xl mb-8">
              Unterstützen Sie die Polizei bei der Aufklärung von Straftaten
            </p>
            <div className="flex justify-center space-x-4">
              <Button size="lg" onClick={() => window.location.href = "/wizard-complete"}>
                <Plus className="w-5 h-5 mr-2" />
                Neue Fahndung erstellen
              </Button>
              <Button variant="outline" size="lg">
                <Phone className="w-5 h-5 mr-2" />
                Kontakt
              </Button>
            </div>
          </div>
        </section>

        {/* Search and Filter */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Fahndungen durchsuchen..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </section>

        {/* Investigations Grid */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold">Aktuelle Fahndungen</h3>
              <Badge variant="outline">
                {mockInvestigations.length} Fahndungen
              </Badge>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {mockInvestigations.map((investigation) => (
                <InvestigationCard key={investigation.id} investigation={investigation} />
              ))}
            </div>

            {mockInvestigations.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-4">
                  Noch keine Fahndungen vorhanden
                </p>
                <Button onClick={() => window.location.href = "/wizard-complete"}>
                  <Plus className="w-4 h-4 mr-2" />
                  Erste Fahndung erstellen
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-gray-400">
            © 2024 Fahndung A - Ein System zur Verwaltung öffentlicher Fahndungen
          </p>
        </div>
      </footer>
    </>
  );
}
