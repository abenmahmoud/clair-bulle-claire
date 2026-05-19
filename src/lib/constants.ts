import { ContextType, TranslationDirection } from "@/types";

export const TRANSLATION_DIRECTIONS: {
  value: TranslationDirection;
  label: string;
  description: string;
}[] = [
  {
    value: "neurotypique-neuroatypique",
    label: "Neurotypique → Neuroatypique",
    description: "Traduire le langage implicite en langage explicite",
  },
  {
    value: "neuroatypique-neurotypique",
    label: "Neuroatypique → Neurotypique",
    description: "Traduire le langage direct en langage social",
  },
  {
    value: "adulte-enfant",
    label: "Adulte → Enfant",
    description: "Expliquer simplement aux enfants",
  },
  {
    value: "enfant-adulte",
    label: "Enfant → Adulte",
    description: "Comprendre ce qu'un enfant exprime",
  },
];

export const CONTEXT_TYPES: { value: ContextType; label: string }[] = [
  { value: "travail", label: "Travail" },
  { value: "couple", label: "Couple" },
  { value: "famille", label: "Famille" },
  { value: "amitie", label: "Amitié" },
  { value: "ecole", label: "École" },
  { value: "administration", label: "Administration" },
  { value: "inconnu", label: "Inconnu" },
];

export const COLORS = {
  primary: "#3563E9",
  primaryLight: "#EFF3FE",
  primaryDark: "#2547B3",
  secondary: "#5B9279",
  secondaryLight: "#E8F5EE",
  accent: "#E07A5F",
  accentLight: "#FDF1EE",
  sage: "#7B9E6B",
  sageLight: "#F0F5ED",
  sand: "#D4C4A8",
  sandLight: "#FAF7F2",
  lavender: "#9B8EC4",
  lavenderLight: "#F3F1F9",
  slate: "#64748B",
  slateLight: "#F1F5F9",
  amber: "#D4A017",
  amberLight: "#FDF8E8",
  danger: "#C2413A",
  dangerLight: "#FDF0EF",
  background: "#F8F6F0",
  surface: "#FFFFFF",
  surfaceMuted: "#F1F0EB",
  text: "#1E293B",
  textMuted: "#64748B",
  border: "#E2E0D9",
  borderLight: "#EEEDEA",
  success: "#5B9279",
  successLight: "#E8F5EE",
};

export const DEFAULT_DISCLAIMER =
  "Clair propose des hypothèses prudentes. L'intention réelle d'une personne ne peut pas être connue avec certitude.";

export const STORAGE_KEYS = {
  history: "clair_history",
  privacy: "clair_privacy_no_save",
  favorites: "clair_favorites",
};

export const APP_INFO = {
  name: "Clair",
  fullName: "Clair — Clarification sociale",
  version: "1.0.0",
  description: "Traduis l'implicite social en langage clair",
};
