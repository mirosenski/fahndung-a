# Fahndungs-Wizard mit Preview-Tabs

## 🎯 Übersicht

Der Wizard wurde vollständig überarbeitet und bietet:

- **Framer Motion Animationen** für flüssige Übergänge
- **Lucide Icons** für konsistentes Design
- **3 Preview-Tabs** mit verschiedenen Ansichten
- **Auto-Save Funktionalität**
- **Responsive Design**
- **Accessibility Features**

## 🚀 Features

### 1. Wizard
- **Schritt-für-Schritt Navigation** mit Fortschrittsanzeige
- **Kategorie-Auswahl** mit visuellen Icons
- **Auto-Save** alle 10 Sekunden
- **Validierung** in Echtzeit
- **Smooth Transitions** zwischen Schritten

### 2. Preview-Tabs System

#### 📋 Zusammenfassung Tab
- Übersicht aller eingegebenen Daten
- Strukturierte Darstellung nach Kategorien
- Validierungs-Hinweise für fehlende Pflichtfelder
- Status-Anzeige (NEU, EILFAHNDUNG, etc.)

#### 👁️ Detailseite Tab
- Vollständige Vorschau wie auf der Website
- Interaktive Karte mit genauem Standort
- Zoom-Controls für Kartennavigation
- Responsive Design Vorschau
- Breadcrumb Navigation
- Kontakt-Box prominent platziert
- Share-Funktionen integriert

#### 💳 Fahndungskarte Tab
- **3D Flip-Animation** beim Klicken
- **Vorderseite**: Foto, Status-Badge, Kurzinfo
- **Rückseite**: Detaillierte Fallbeschreibung, Merkmale, Notruf-Hinweis
- Export-Optionen (Bild speichern, Drucken)

## 📁 Dateistruktur

```
src/
├── components/
│   └── wizard/
│       ├── WizardComplete.tsx          # Haupt-Wizard Komponente
│       ├── WizardPreviewTabs.tsx       # Preview-Tabs System
│       └── WizardContext.tsx           # Context für State Management
├── styles/
│   └── wizard.css                      # CSS für 3D-Effekte & Animationen
└── pages/
    └── wizard-demo.tsx                 # Demo-Seite
```

## 🎨 Design Features

### 3D Flip-Animation
```css
.perspective-1000 {
  perspective: 1000px;
}

.preserve-3d {
  transform-style: preserve-3d;
}

.backface-hidden {
  backface-visibility: hidden;
}
```

### Responsive Design
- Mobile-First Ansatz
- Adaptive Grid-Layouts
- Touch-optimierte Interaktionen

### Accessibility
- Keyboard Navigation
- Screen Reader Support
- High Contrast Mode
- Reduced Motion Support

## 🛠️ Installation & Verwendung

### 1. Dependencies installieren
```bash
npm install framer-motion lucide-react
```

### 2. CSS importieren
```typescript
import '~/styles/wizard.css';
```

### 3. Komponente verwenden
```typescript
import { WizardComplete } from '~/components/wizard/WizardComplete';

// In Ihrer Komponente
<WizardComplete />
```

## 🎯 Verwendung

### Wizard Flow
1. **Kategorie auswählen** (Straftäter, Vermisste Person, etc.)
2. **Grunddaten eingeben** (Priorität, Aktenzeichen, Titel)
3. **Tatdetails erfassen** (Tatort, Tatzeit, Tathergang)
4. **Personenbeschreibung** (Alter, Größe, Merkmale)
5. **Medien hochladen** (Fotos, Dokumente)
6. **Kontakt & Veröffentlichung** (Hinweise, Social Media)

### Preview System
- **Zusammenfassung**: Überprüfung aller Daten
- **Detailseite**: Vollständige Website-Vorschau
- **Fahndungskarte**: 3D-Flip-Karte mit Export

## 🔧 Customization

### Kategorien anpassen
```typescript
const categories = [
  { 
    id: 'WANTED_PERSON', 
    label: 'Straftäter', 
    icon: Shield,
    color: 'bg-red-500',
    description: 'Fahndung nach tatverdächtigen Personen'
  },
  // Weitere Kategorien...
];
```

### Schritte konfigurieren
```typescript
const getStepsForCategory = (cat) => {
  const categorySteps = {
    'WANTED_PERSON': ['category', 'basic', 'crime', 'appearance', 'media', 'contact'],
    'MISSING_PERSON': ['category', 'basic', 'lastSeen', 'appearance', 'medical', 'media', 'contact'],
    // Weitere Kategorien...
  };
  return categorySteps[cat] || baseSteps;
};
```

### Auto-Save Intervall ändern
```typescript
useEffect(() => {
  const autoSaveInterval = setInterval(() => {
    if (Object.keys(formData).length > 0) {
      handleAutoSave();
    }
  }, 10000); // 10 Sekunden

  return () => clearInterval(autoSaveInterval);
}, [formData]);
```

## 🎨 Styling

### Theme Colors
```css
:root {
  --primary: #3b82f6;
  --success: #10b981;
  --warning: #f59e0b;
  --danger: #ef4444;
  --info: #06b6d4;
}
```

### Animation Timing
```css
.wizard-step-enter {
  transition: opacity 300ms, transform 300ms;
}

.tab-enter {
  transition: opacity 200ms, transform 200ms;
}
```

## 📱 Mobile Optimierungen

### Touch-Gesten
- Swipe zwischen Schritten
- Tap-to-flip für Karten
- Pinch-to-zoom für Karten

### Responsive Breakpoints
```css
@media (max-width: 640px) {
  .fahndung-card {
    width: 100%;
    max-width: 320px;
  }
}
```

## 🚀 Performance Features

### Lazy Loading
- Kartenkomponente wird erst geladen wenn benötigt
- Bilder werden optimiert geladen
- CSS wird kritisch inline geladen

### Caching
- Lokales Caching der Vorschau
- Auto-Save Daten werden gespeichert
- Session-basierte Wiederherstellung

## 🔒 Sicherheit

### Validierung
- Client-seitige Validierung
- Server-seitige Validierung
- XSS-Schutz
- CSRF-Schutz

### Datenschutz
- Verschlüsselte Übertragung
- Sichere Speicherung
- DSGVO-konform

## 🎯 Nächste Schritte

### Geplante Features
- [ ] Echte Karten-Integration (OpenStreetMap/Google Maps)
- [ ] AI-Vorschläge für Tathergang
- [ ] Multi-Language Support
- [ ] Dark Mode
- [ ] Offline-Funktionalität
- [ ] Export zu PDF
- [ ] Social Media Integration

### API Integration
```typescript
// Beispiel für echte API-Integration
const handlePublish = async (formData) => {
  try {
    const response = await fetch('/api/fahndungen', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    
    if (response.ok) {
      // Erfolg
      router.push('/admin');
    }
  } catch (error) {
    // Fehlerbehandlung
  }
};
```

## 📞 Support

Bei Fragen oder Problemen:
- GitHub Issues
- Dokumentation: `/docs`
- Demo: `/wizard-demo`

---

**Entwickelt mit ❤️ für moderne Fahndungssysteme** 