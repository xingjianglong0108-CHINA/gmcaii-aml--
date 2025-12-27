
export enum RiskLevel {
  LOW = '低危',
  INTERMEDIATE = '中危',
  HIGH = '高危'
}

export interface GeneticMarker {
  id: string;
  label: string;
  category: '融合基因' | '基因突变' | '核型异常';
  defaultRisk: RiskLevel;
}

export interface PatientData {
  age: number;
  weight: number;
  wbc: number; // WBC count * 10^9/L
  markers: string[];
  mrd1?: number; // MRD after Induction I (%)
  mrd2?: number; // MRD after Induction II (%)
}

export interface InductionPlan {
  name: string;
  drugs: string[];
  description: string;
}
