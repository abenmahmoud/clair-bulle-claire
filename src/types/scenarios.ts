import type { AnalysisResult, ContextType, TranslationDirection } from "./index";

export type ScenarioCategory =
  | "travail"
  | "famille"
  | "couple"
  | "amitie"
  | "ecole"
  | "administration";

export type SensitivityLevel = "standard" | "sensible" | "tres-sensible";

export type ScenarioMode = "adulte" | "bulle-claire";

export interface Scenario {
  id: string;
  title: string;
  category: ScenarioCategory;
  context: ContextType;
  direction: TranslationDirection;
  inputText: string;
  result: AnalysisResult;
  reviewedBy?: "brouillon" | "relu-interne" | "valide-comite";
  addedAt: string;
  ageMin: number;
  ageMax: number;
  sensitive: SensitivityLevel;
  mode: ScenarioMode;
}
