import type { AnalysisResult, ContextType, TranslationDirection } from "./index";

export type ScenarioCategory =
  | "travail"
  | "famille"
  | "couple"
  | "amitie"
  | "ecole"
  | "administration";

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
}
