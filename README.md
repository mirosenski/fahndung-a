# Fahndung - Öffentliche Fahndungen

Ein System zur Verwaltung öffentlicher Fahndungen und Vermisstenmeldungen.

## 🚀 Deployment auf Vercel

### 1. Datenbank einrichten

Für Vercel benötigen Sie eine PostgreSQL-Datenbank. Empfohlene Optionen:

- **Vercel Postgres** (einfachste Option)
- **Neon** (kostenlos)
- **Supabase** (kostenlos)

### 2. Umgebungsvariablen in Vercel

Fügen Sie diese Umgebungsvariablen in Ihrem Vercel-Projekt hinzu:

```env
DATABASE_URL="postgresql://username:password@host:port/database"
```

### 3. Deployment

1. **Repository zu Vercel verbinden**
   - Gehen Sie zu [vercel.com](https://vercel.com)
   - Verbinden Sie Ihr GitHub-Repository
   - Wählen Sie das Repository aus

2. **Build-Einstellungen**
   - Framework: Next.js
   - Build Command: `prisma generate && prisma db push && next build`
   - Install Command: `pnpm install`

3. **Deploy**
   - Klicken Sie auf "Deploy"
   - Vercel wird automatisch die Datenbank migrieren

### 4. Demo-Login

Nach dem Deployment können Sie sich mit den Demo-Zugangsdaten anmelden:

- **E-Mail:** admin@demo.de
- **Passwort:** demo123

## 🛠 Lokale Entwicklung

```bash
# Abhängigkeiten installieren
pnpm install

# Datenbank generieren
pnpm prisma generate

# Entwicklungsserver starten
pnpm dev
```

## 📁 Projektstruktur

```
src/
├── components/          # React-Komponenten
│   ├── admin/          # Admin-Dashboard Komponenten
│   ├── layout/         # Layout-Komponenten
│   └── ui/             # UI-Komponenten
├── pages/              # Next.js Seiten
│   ├── admin.tsx       # Admin-Dashboard
│   ├── login.tsx       # Login-Seite
│   └── index.tsx       # Startseite
├── server/             # Backend-Logik
│   ├── api/            # tRPC API
│   └── db.ts           # Datenbankverbindung
└── utils/              # Hilfsfunktionen
    ├── api.ts          # tRPC-Client
    └── session.ts      # Session-Management
```

## 🔧 Technologien

- **Frontend:** Next.js, React, TypeScript
- **Styling:** Tailwind CSS
- **UI-Komponenten:** Radix UI
- **Backend:** tRPC, Prisma
- **Datenbank:** PostgreSQL (Produktion), SQLite (Entwicklung)
- **Authentication:** Demo-Login (Session-basiert)

## 📝 Features

- ✅ Demo-Login mit Session-Management
- ✅ Admin-Dashboard mit Benutzerverwaltung
- ✅ Datenbankanbindung mit Prisma
- ✅ Responsive Design
- ✅ tRPC für type-safe API
- ✅ Vercel-Deployment bereit

## 🚨 Wichtige Hinweise

1. **Datenbank:** Für Produktion PostgreSQL verwenden
2. **Umgebungsvariablen:** DATABASE_URL in Vercel setzen
3. **Demo-Login:** Nur für Entwicklung/Demo-Zwecke
4. **Sicherheit:** Für Produktion echte Authentifizierung implementieren
