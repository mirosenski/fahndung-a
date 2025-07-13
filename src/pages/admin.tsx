import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Shield, Plus, Search, Filter, FileText, Globe, Users, AlertTriangle, User, Settings, Database } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Input } from "~/components/ui/input";
import { UserManagement } from "~/components/admin/UserManagement";
import { api } from "~/utils/api";
import { getDemoSession } from "~/utils/session";
import { useRouter } from "next/router";

// Mock-Daten für Demo
const mockInvestigations = [
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
    status: "DRAFT",
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

function getStatusBadge(status: string) {
  const isPublished = status === "PUBLISHED";
  return (
    <Badge variant={isPublished ? "default" : "outline"}>
      {isPublished ? "Veröffentlicht" : "Entwurf"}
    </Badge>
  );
}

export default function AdminPage() {
  const router = useRouter();
  const [session, setSession] = useState<any>(null);
  const [isClient, setIsClient] = useState(false);
  const [activeTab, setActiveTab] = useState("investigations");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  useEffect(() => {
    setIsClient(true);
    const demoSession = getDemoSession();
    if (!demoSession) {
      router.push("/login");
      return;
    }
    setSession(demoSession);
  }, [router]);

  // tRPC Queries für echte Daten
  const { data: users } = api.user.list.useQuery(undefined, {
    retry: false,
  });

  const stats = {
    total: mockInvestigations.length,
    published: mockInvestigations.filter((i: any) => i.status === "PUBLISHED").length,
    draft: mockInvestigations.filter((i: any) => i.status === "DRAFT").length,
    urgent: mockInvestigations.filter((i: any) => i.priority === "URGENT").length,
    users: users?.length || 0,
  };

  const filteredInvestigations = mockInvestigations.filter((investigation: any) => {
    const matchesSearch = investigation.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         investigation.caseNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || investigation.category === selectedCategory;
    const matchesStatus = !selectedStatus || investigation.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleEditInvestigation = (id: string) => {
    // Hier würde die Logik zum Bearbeiten stehen
    alert(`Fahndung ${id} bearbeiten`);
  };

  const handlePublishInvestigation = (id: string) => {
    // Hier würde die Logik zum Veröffentlichen stehen
    alert(`Fahndung ${id} veröffentlicht`);
  };

  const handleDeleteInvestigation = (id: string) => {
    if (confirm("Sind Sie sicher, dass Sie diese Fahndung löschen möchten?")) {
      // Hier würde die Logik zum Löschen stehen
      alert(`Fahndung ${id} gelöscht`);
    }
  };

  if (!isClient || !session) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Lade Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Dashboard - Fahndung</title>
        <meta name="description" content="Dashboard für Fahndungsverwaltung" />
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
              <Link href={session ? "/admin" : "/login"} className="text-sm font-medium text-primary">
                Dashboard
              </Link>
              <Link href={session ? "/wizard-complete" : "/login"} className="text-sm font-medium hover:text-primary">
                Fahndung erstellen
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          {/* Header mit Aktionen */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold">Administration</h2>
              <p className="text-gray-600 mt-2">
                Verwalten Sie Fahndungen, Benutzer und Systemeinstellungen
              </p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline">
                <Settings className="w-4 h-4 mr-2" />
                Einstellungen
              </Button>
              <Button onClick={() => window.location.href = session ? "/wizard-complete" : "/login"}>
                <Plus className="w-4 h-4 mr-2" />
                Neue Fahndung
              </Button>
            </div>
          </div>

          {/* Statistiken */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Fahndungen</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.total}</div>
                <p className="text-xs text-muted-foreground">
                  Gesamt
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Veröffentlicht</CardTitle>
                <Globe className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.published}</div>
                <p className="text-xs text-muted-foreground">
                  Öffentlich
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Entwürfe</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.draft}</div>
                <p className="text-xs text-muted-foreground">
                  Entwürfe
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Eilfahndungen</CardTitle>
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.urgent}</div>
                <p className="text-xs text-muted-foreground">
                  Eilfahndungen
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Benutzer</CardTitle>
                <User className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.users}</div>
                <p className="text-xs text-muted-foreground">
                  Aktiv
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Tabs */}
          <div className="border-b mb-6">
            <nav className="flex space-x-8">
              <button
                onClick={() => setActiveTab("investigations")}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "investigations"
                    ? "border-primary text-primary"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>Fahndungen</span>
              </button>
              <button
                onClick={() => setActiveTab("users")}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "users"
                    ? "border-primary text-primary"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <User className="w-4 h-4" />
                <span>Benutzer</span>
              </button>
              <button
                onClick={() => setActiveTab("system")}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "system"
                    ? "border-primary text-primary"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <Database className="w-4 h-4" />
                <span>System</span>
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          {activeTab === "investigations" && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Fahndungen ({filteredInvestigations.length})</CardTitle>
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Suchen..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-64"
                    />
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md bg-white text-sm"
                    >
                      <option value="">Alle Kategorien</option>
                      <option value="WANTED_PERSON">Straftäter</option>
                      <option value="MISSING_PERSON">Vermisste Person</option>
                      <option value="UNKNOWN_DEAD">Unbekannte Tote</option>
                      <option value="STOLEN_GOODS">Gesuchte Sachen</option>
                    </select>
                    <select
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md bg-white text-sm"
                    >
                      <option value="">Alle Status</option>
                      <option value="PUBLISHED">Veröffentlicht</option>
                      <option value="DRAFT">Entwurf</option>
                    </select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-medium">Aktenzeichen</th>
                        <th className="text-left py-3 px-4 font-medium">Titel</th>
                        <th className="text-left py-3 px-4 font-medium">Kategorie</th>
                        <th className="text-left py-3 px-4 font-medium">Ort</th>
                        <th className="text-left py-3 px-4 font-medium">Datum</th>
                        <th className="text-left py-3 px-4 font-medium">Status</th>
                        <th className="text-left py-3 px-4 font-medium">Priorität</th>
                        <th className="text-left py-3 px-4 font-medium">Aktionen</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredInvestigations.map((investigation: any) => (
                        <tr key={investigation.id} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4 text-sm font-mono">
                            {investigation.caseNumber}
                          </td>
                          <td className="py-3 px-4">
                            <div className="font-medium">{investigation.title}</div>
                          </td>
                          <td className="py-3 px-4">
                            {getCategoryLabel(investigation.category)}
                          </td>
                          <td className="py-3 px-4">{investigation.location}</td>
                          <td className="py-3 px-4 text-sm">
                            {new Date(investigation.date).toLocaleDateString("de-DE")}
                          </td>
                          <td className="py-3 px-4">
                            {getStatusBadge(investigation.status)}
                          </td>
                          <td className="py-3 px-4">
                            {getPriorityBadge(investigation.priority)}
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex space-x-2">
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => handleEditInvestigation(investigation.id)}
                              >
                                Bearbeiten
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => handlePublishInvestigation(investigation.id)}
                              >
                                Veröffentlichen
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => handleDeleteInvestigation(investigation.id)}
                              >
                                Löschen
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === "users" && (
            <UserManagement />
          )}

          {activeTab === "system" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Datenbank</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Datenbank-Status:</span>
                      <Badge variant="default">Online</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Letzte Sicherung:</span>
                      <span>Heute 14:30</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Datenbank-Größe:</span>
                      <span>2.4 MB</span>
                    </div>
                    <Button className="w-full">
                      <Database className="w-4 h-4 mr-2" />
                      Sicherung erstellen
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>System-Einstellungen</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Automatische Backups:</span>
                      <Badge variant="default">Aktiviert</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>E-Mail-Benachrichtigungen:</span>
                      <Badge variant="outline">Deaktiviert</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Debug-Modus:</span>
                      <Badge variant="outline">Deaktiviert</Badge>
                    </div>
                    <Button className="w-full">
                      <Settings className="w-4 h-4 mr-2" />
                      Einstellungen bearbeiten
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
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