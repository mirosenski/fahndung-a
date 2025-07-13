# Vercel Deployment Anleitung

## 1. PostgreSQL Datenbank einrichten

### Option A: Vercel Postgres (Empfohlen)
1. Gehe zu deinem Vercel Dashboard
2. Wähle dein Projekt aus
3. Gehe zu "Storage" → "Connect Database"
4. Wähle "Postgres" aus
5. Folge den Anweisungen zur Einrichtung

### Option B: Externe PostgreSQL-Datenbank
- **Neon (Empfohlen):** https://neon.tech
- **Supabase:** https://supabase.com
- **Railway:** https://railway.app

## 2. Umgebungsvariablen in Vercel setzen

Gehe zu deinem Vercel Dashboard → Projekt → Settings → Environment Variables:

```
DATABASE_URL=postgresql://username:password@host:port/database
AUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=https://your-domain.vercel.app
```

## 3. Datenbank synchronisieren

Nach dem Deployment:
```bash
# Lokale Entwicklung
pnpm db:push:local

# Produktion (über Vercel CLI)
vercel env pull .env.production
pnpm db:push:prod
```

## 4. Demo-Benutzer erstellen

```bash
# Lokal
pnpm create-demo-user

# Produktion (über Vercel Functions)
# Erstelle eine Vercel Function für die Benutzererstellung
```

## 5. Deployment überprüfen

1. Gehe zu deiner Vercel-URL
2. Teste die Admin-Funktionen
3. Überprüfe die Datenbankverbindung

## Troubleshooting

### Datenbankverbindung fehlschlägt
- Überprüfe die `DATABASE_URL` in Vercel
- Stelle sicher, dass die Datenbank öffentlich zugänglich ist
- Teste die Verbindung lokal

### Build-Fehler
- Überprüfe alle erforderlichen Umgebungsvariablen
- Stelle sicher, dass `DATABASE_URL` korrekt formatiert ist
- Überprüfe die Prisma-Konfiguration

### Runtime-Fehler
- Überprüfe die Logs in Vercel Dashboard
- Stelle sicher, dass die Datenbank migriert wurde
- Teste die API-Endpunkte 