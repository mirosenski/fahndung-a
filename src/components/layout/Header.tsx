"use client";

import Link from "next/link";
import { Shield, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "~/components/ui/button";
import { getDemoSession, clearDemoSession } from "~/utils/session";

export function Header() {
  const [session, setSession] = useState<any>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const demoSession = getDemoSession();
    setSession(demoSession);
  }, []);

  const handleLogout = () => {
    clearDemoSession();
    setSession(null);
    window.location.href = "/";
  };

  if (!isClient) {
    return (
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
              <Link href="/login" className="text-sm font-medium text-primary">
                Dashboard
              </Link>
              <Link href="/login" className="text-sm font-medium hover:text-primary">
                Fahndung erstellen
              </Link>
            </nav>
          </div>
        </div>
      </header>
    );
  }

  return (
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
            <Link 
              href={session ? "/admin" : "/login"} 
              className="text-sm font-medium text-primary"
            >
              Dashboard
            </Link>
            <Link 
              href={session ? "/wizard-complete" : "/login"} 
              className="text-sm font-medium hover:text-primary"
            >
              Fahndung erstellen
            </Link>
            {session && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleLogout}
                className="text-gray-600 hover:text-gray-800"
              >
                <LogOut className="w-4 h-4 mr-1" />
                Abmelden
              </Button>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
} 