export type TranslationDirection =
  | "neurotypique-neuroatypique"
  | "neuroatypique-neurotypique"
  | "adulte-enfant"
  | "enfant-adulte";

export type ContextType =
  | "travail"
  | "couple"
  | "famille"
  | "amitie"
  | "ecole"
  | "administration"
  | "inconnu";

export type ConfidenceLevel = "faible" | "moyenne" | "prudente";

export type ResponseVariant =
  | "short"
  | "direct"
  | "soft"
  | "professional"
  | "boundary"
  | "child";

export interface AnalysisHypothesis {
  text: string;
  confidence: ConfidenceLevel;
}

export interface AnalysisResult {
  original: string;
  clearTranslation: string;
  literalMeaning: string;
  possibleSocialMeaning: string;
  certain: string[];
  uncertain: string[];
  hypotheses: AnalysisHypothesis[];
  clarifyingQuestion: string;
  shortAnswer: string;
  directAnswer: string;
  softAnswer: string;
  professionalAnswer: string;
  boundaryAnswer: string;
  childVersion?: string;
  voiceShortVersion: string;
  selfRegulationTip?: string;
}

export interface HistoryItem {
  id: string;
  original: string;
  result: AnalysisResult;
  direction: TranslationDirection;
  context: ContextType;
  savedAt: string;
  favorite: boolean;
}

export type ChildEmotion =
  | "triste"
  | "pas-compris"
  | "dire-non"
  | "demander-jouer"
  | "expliquer-adulte"
  | "pas-bien";

export interface EducatorTool {
  id: string;
  label: string;
  description: string;
  icon: string;
  color: string;
}

export interface ToastState {
  message: string;
  visible: boolean;
}
