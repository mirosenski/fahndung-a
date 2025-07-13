import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Eye, 
  Trash2, 
  Globe, 
  Shield, 
  Users, 
  FileText, 
  Calendar,
  TrendingUp,
  AlertTriangle
} from "lucide-react";

// Mock-Daten für Demo
const mockInvestigations = [
  {
    id: "1",
    title: "Max Mustermann",
    category: "WANTED_PERSON",
    priority: "URGENT",
    location: "Stuttgart",
    date: "2024-06-01",
    status: "PUBLISHED",
    caseNumber: "BW-1234/1",
    shortInfo: "Tatverdächtiger nach Raub",
  },
  {
    id: "2",
    title: "Anna Beispiel",
    category: "MISSING_PERSON",
    priority: "NORMAL",
    location: "Karlsruhe",
    date: "2024-05-30",
    status: "DRAFT",
    caseNumber: "BW-5678/2",
    shortInfo: "Vermisste Person",
  },
  {
    id: "3",
    title: "Unbekannte Person",
    category: "UNKNOWN_DEAD",
    priority: "NORMAL",
    location: "Freiburg",
    date: "2024-05-15",
    status: "PUBLISHED",
    caseNumber: "BW-9012/3",
    shortInfo: "Unbekannte Tote",
  },
  {
    id: "4",
    title: "Mountainbike gestohlen",
    category: "STOLEN_GOODS",
    priority: "NORMAL",
    location: "Heidelberg",
    date: "2024-05-10",
    status: "DRAFT",
    caseNumber: "BW-3456/4",
    shortInfo: "Gestohlenes Fahrrad",
  },
  {
    id: "5",
    title: "Elias Winter",
    category: "WANTED_PERSON",
    priority: "URGENT",
    location: "Heidelberg",
    date: "2024-06-02",
    status: "PUBLISHED",
    caseNumber: "BW-7890/5",
    shortInfo: "Tatverdächtiger nach Einbruch",
  },
];

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  const filteredInvestigations = mockInvestigations.filter((investigation) => {
    const matchesSearch = investigation.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         investigation.caseNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || investigation.category === selectedCategory;
    const matchesStatus = !selectedStatus || investigation.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const stats = {
    total: mockInvestigations.length,
    published: mockInvestigations.filter(i => i.status === "PUBLISHED").length,
    draft: mockInvestigations.filter(i => i.status === "DRAFT").length,
    urgent: mockInvestigations.filter(i => i.priority === "URGENT").length,
  };

  function getCategoryLabel(category: string): string {
    const labels = {
      "WANTED_PERSON": "Straftäter",
      "MISSING_PERSON": "Vermisste Person",
      "UNKNOWN_DEAD": "Unbekannte Tote",
      "STOLEN_GOODS": "Gesuchte Sachen",
    };
    return labels[category as keyof typeof labels] || category;
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

  return (
    <>
      <Head>
        <title>Dashboard - Fahndung A</title>
        <meta name="description" content="Dashboard für Fahndungsverwaltung" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Shield className="w-8 h-8 text-primary" />
              <h1 className="text-2xl font-bold">Dashboard</h1>
            </div>
            <nav className="flex items-center space-x-6">
              <Link href="/" className="text-sm font-medium hover:text-primary">
                Startseite
              </Link>
              <Link href="/admin" className="text-sm font-medium text-primary">
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
          {/* Header mit Aktionen */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold">Fahndungsverwaltung</h2>
              <p className="text-gray-600 mt-2">
                Verwalten Sie alle Fahndungen und erstellen Sie neue
              </p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button onClick={() => window.location.href = "/wizard-complete"}>
                <Plus className="w-4 h-4 mr-2" />
                Neue Fahndung
              </Button>
            </div>
          </div>

          {/* Statistiken */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Gesamt</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.total}</div>
                <p className="text-xs text-muted-foreground">
                  Alle Fahndungen
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
                  Öffentlich sichtbar
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
                  Noch nicht veröffentlicht
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
                  Hohe Priorität
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Such- und Filterbereich */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Suchen..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
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
                <Button variant="outline" onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("");
                  setSelectedStatus("");
                }}>
                  Filter zurücksetzen
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Fahndungsliste */}
          <Card>
            <CardHeader>
              <CardTitle>Fahndungen ({filteredInvestigations.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {filteredInvestigations.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">Keine Fahndungen gefunden</p>
                  <Button onClick={() => window.location.href = "/wizard-complete"}>
                    <Plus className="w-4 h-4 mr-2" />
                    Erste Fahndung erstellen
                  </Button>
                </div>
              ) : (
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
                      {filteredInvestigations.map((investigation) => (
                        <tr key={investigation.id} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4 text-sm font-mono">
                            {investigation.caseNumber}
                          </td>
                          <td className="py-3 px-4">
                            <div>
                              <div className="font-medium">{investigation.title}</div>
                              <div className="text-sm text-gray-500">{investigation.shortInfo}</div>
                            </div>
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
                                onClick={() => window.location.href = `/fahndung/${investigation.id}`}
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => window.location.href = `/wizard-complete?edit=${investigation.id}`}
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  if (confirm("Möchten Sie diese Fahndung wirklich löschen?")) {
                                    alert("Fahndung wurde gelöscht!");
                                  }
                                }}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
} 