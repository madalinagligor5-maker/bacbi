// Tipuri de domeniu BacPilot

export type Subject =
  | "romana"
  | "matematica"
  | "biologie"
  | "istorie"
  | "geografie"
  | "informatica"
  | "fizica"
  | "chimie";

export type Difficulty = "usor" | "mediu" | "dificil";

export interface Question {
  id: string;
  subject: Subject;
  text: string;
  options?: string[];
  correctAnswer?: string;
  difficulty: Difficulty;
}

export interface ExamResult {
  id: string;
  subject: Subject;
  score: number;
  maxScore: number;
  completedAt: string;
}

export interface UserProfile {
  id: string;
  email: string;
  displayName?: string;
  targetGrade?: number;
}
