export type WizardStep = 1 | 2 | 3 | 4 | 5;

export interface WizardData {
  step1: {
    category: string;
    priority: string;
    caseNumber: string;
    internalTitle: string;
  };
  step2: {
    displayName: string;
    shortInfo: string;
    location: string;
    date: string;
    status: string;
  };
  step3: {
    age: string;
    height: string;
    build: string;
    hairColor: string;
    hairStyle: string;
    eyes: string;
    features: string;
    clothing: string;
  };
  step4: {
    question: string;
    description: string;
    context: string;
  };
  step5: {
    tel: string;
    email: string;
    formUrl: string;
    station: string;
    location: string;
    areaInsteadOfPoint: boolean;
    preview: boolean;
    publish: boolean;
  };
}

export const WIZARD_STEPS = [
  {
    id: 1,
    title: "Grunddaten",
    description: "Fallkategorie und grundlegende Informationen",
    icon: "file-text",
  },
  {
    id: 2,
    title: "Karteninfos",
    description: "Name und Ort der Fahndung",
    icon: "user",
  },
  {
    id: 3,
    title: "Personenbeschreibung",
    description: "Äußere Merkmale und Bekleidung",
    icon: "user-check",
  },
  {
    id: 4,
    title: "Falldetails",
    description: "Beschreibung und Hintergrund",
    icon: "clipboard-list",
  },
  {
    id: 5,
    title: "Kontakt & Veröffentlichung",
    description: "Kontaktdaten und Veröffentlichung",
    icon: "phone",
  },
];

export const DEMO_CASES = {
  "Manuell": {
    step1: { category: "", priority: "Normal", caseNumber: "", internalTitle: "" },
    step2: { displayName: "", shortInfo: "", location: "", date: "", status: "NEU" },
    step3: { age: "", height: "", build: "", hairColor: "", hairStyle: "", eyes: "", features: "", clothing: "" },
    step4: { question: "", description: "", context: "" },
    step5: { tel: "", email: "", formUrl: "", station: "", location: "", areaInsteadOfPoint: false, preview: true, publish: false },
  },
  "Straftäter": {
    step1: { category: "Straftäter", priority: "EILFAHNDUNG", caseNumber: "BW-2034/7", internalTitle: "Elias Winter – Heidelberg" },
    step2: { displayName: "Elias Winter", shortInfo: "Tatverdächtiger nach Einbruch", location: "Heidelberg", date: "2024-06-02", status: "NEU" },
    step3: { age: "28", height: "175 cm", build: "schlank", hairColor: "dunkelbraun", hairStyle: "kurz", eyes: "braun", features: "Tattoo am linken Unterarm", clothing: "schwarze Kapuzenjacke, dunkle Jeans" },
    step4: { question: "Wer erkennt die Person?", description: "Elias Winter wird wegen Einbruch in Heidelberg gesucht. Der Tatverdächtige wurde zuletzt in der Altstadt gesehen.", context: "Der Einbruch ereignete sich am 02.06.2024 in der Heidelberger Altstadt. Zeugen haben die Person beschrieben." },
    step5: { tel: "06221/110", email: "kripo.heidelberg@polizei.bwl.de", formUrl: "", station: "PP Heidelberg", location: "Heidelberg", areaInsteadOfPoint: false, preview: true, publish: false },
  },
  "Vermisste Person": {
    step1: { category: "Vermisste Person", priority: "Normal", caseNumber: "BW-5678/2", internalTitle: "Anna Schmidt – Karlsruhe" },
    step2: { displayName: "Anna Schmidt", shortInfo: "Vermisste Person", location: "Karlsruhe", date: "2024-05-30", status: "NEU" },
    step3: { age: "45", height: "165 cm", build: "normal", hairColor: "blond", hairStyle: "mittel", eyes: "blau", features: "Brille", clothing: "blaue Bluse, schwarze Hose" },
    step4: { question: "Wer hat Anna Schmidt gesehen?", description: "Anna Schmidt wird seit dem 30.05.2024 vermisst. Sie wurde zuletzt in Karlsruhe gesehen.", context: "Die Familie ist besorgt und bittet um Hinweise." },
    step5: { tel: "0721/110", email: "kripo.karlsruhe@polizei.bwl.de", formUrl: "", station: "PP Karlsruhe", location: "Karlsruhe", areaInsteadOfPoint: false, preview: true, publish: false },
  },
}; 