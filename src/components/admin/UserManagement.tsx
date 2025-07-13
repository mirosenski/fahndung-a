"use client";

import { useState } from "react";
import { Plus, Edit, Trash2, User, Shield, Mail, Calendar } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Input } from "~/components/ui/input";
import { api } from "~/utils/api";
import { UserDialog } from "./UserDialog";

export function UserManagement() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // tRPC Queries und Mutations
  const { data: users, isLoading, refetch } = api.user.list.useQuery();
  const createUserMutation = api.user.create.useMutation({
    onSuccess: () => {
      refetch();
      setIsCreateDialogOpen(false);
    },
  });
  const updateUserMutation = api.user.update.useMutation({
    onSuccess: () => {
      refetch();
      setEditingUser(null);
    },
  });
  const deleteUserMutation = api.user.delete.useMutation({
    onSuccess: () => {
      refetch();
    },
  });

  const handleCreateUser = (userData: { name?: string; email: string; role: "ADMIN" | "USER" }) => {
    createUserMutation.mutate(userData);
  };

  const handleUpdateUser = (userData: { id?: string; name?: string; email?: string; role?: "ADMIN" | "USER" }) => {
    if (!userData.id) {
      alert("Fehler: Benutzer-ID fehlt!");
      return;
    }
    updateUserMutation.mutate(userData as { id: string; name?: string; email?: string; role?: "ADMIN" | "USER" });
  };

  const handleDeleteUser = (userId: string) => {
    if (confirm("Sind Sie sicher, dass Sie diesen Benutzer löschen möchten?")) {
      deleteUserMutation.mutate({ id: userId });
    }
  };

  const handleEditUser = (user: any) => {
    setEditingUser(user);
  };

  const filteredUsers = users?.filter(user =>
    user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  function getRoleBadge(role: string) {
    const isAdmin = role === "ADMIN";
    return (
      <Badge variant={isAdmin ? "destructive" : "secondary"}>
        {isAdmin ? "Administrator" : "Benutzer"}
      </Badge>
    );
  }

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-600">Lade Benutzer...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Benutzer ({filteredUsers.length})</CardTitle>
            <div className="flex space-x-2">
              <Input
                placeholder="Benutzer suchen..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64"
              />
              <Button onClick={() => setIsCreateDialogOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Neuen Benutzer erstellen
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Name</th>
                  <th className="text-left py-3 px-4 font-medium">E-Mail</th>
                  <th className="text-left py-3 px-4 font-medium">Rolle</th>
                  <th className="text-left py-3 px-4 font-medium">Erstellt</th>
                  <th className="text-left py-3 px-4 font-medium">Aktionen</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-gray-500" />
                        <div className="font-medium">{user.name || "Unbekannt"}</div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <Mail className="w-4 h-4 text-gray-500" />
                        <span>{user.email}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      {getRoleBadge(user.role)}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <span className="text-sm">
                          {new Date(user.createdAt).toLocaleDateString("de-DE")}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleEditUser(user)}
                        >
                          <Edit className="w-4 h-4 mr-1" />
                          Bearbeiten
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleDeleteUser(user.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4 mr-1" />
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

      {/* Dialog für neuen Benutzer */}
      <UserDialog
        isOpen={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        onSubmit={handleCreateUser}
        title="Neuen Benutzer erstellen"
        submitLabel="Erstellen"
      />

      {/* Dialog für Benutzer bearbeiten */}
      <UserDialog
        isOpen={!!editingUser}
        onClose={() => setEditingUser(null)}
        onSubmit={handleUpdateUser}
        title="Benutzer bearbeiten"
        submitLabel="Speichern"
        user={editingUser}
      />
    </>
  );
} 