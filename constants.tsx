
import { GeneticMarker, RiskLevel } from './types';

export const GENETIC_MARKERS: GeneticMarker[] = [
  // 低危标记
  { id: 'runx1_runx1t1', label: 't(8;21) / RUNX1-RUNX1T1', category: '融合基因', defaultRisk: RiskLevel.LOW },
  { id: 'cbfb_myh11', label: 'inv(16) 或 t(16;16) / CBFβ-MYH11', category: '融合基因', defaultRisk: RiskLevel.LOW },
  { id: 'kmt2a_mllt11', label: 't(1;11) / KMT2A-MLLT11', category: '融合基因', defaultRisk: RiskLevel.LOW },
  { id: 'npm1_mut', label: 'NPM1 突变 (正常核型)', category: '基因突变', defaultRisk: RiskLevel.LOW },
  { id: 'cebpa_bzip', label: 'CEBPA bZIP 突变', category: '基因突变', defaultRisk: RiskLevel.LOW },
  
  // 中/高危标记
  { id: 'kmt2a_mllt3', label: 't(9;11) / KMT2A-MLLT3', category: '融合基因', defaultRisk: RiskLevel.INTERMEDIATE },
  { id: 'kit_non_17', label: 'KIT 突变 (非 exon 17)', category: '基因突变', defaultRisk: RiskLevel.INTERMEDIATE },
  { id: 'kit_exon_17', label: 'KIT Exon 17 突变', category: '基因突变', defaultRisk: RiskLevel.HIGH },
  { id: 'flt3_itd', label: 'FLT3-ITD', category: '基因突变', defaultRisk: RiskLevel.HIGH },
  { id: 'tp53', label: 'TP53 突变', category: '基因突变', defaultRisk: RiskLevel.HIGH },
  { id: 'complex_karyotype', label: '复杂核型 (≥3 种异常)', category: '核型异常', defaultRisk: RiskLevel.HIGH },
  { id: 'minus_5_7', label: '-5, -7, 5q-, 7q-', category: '核型异常', defaultRisk: RiskLevel.HIGH },
  { id: 'nup98_re', label: 'NUP98 重排', category: '融合基因', defaultRisk: RiskLevel.HIGH },
  { id: 'mecom_re', label: 'MECOM 重排 / inv(3) / t(3;3)', category: '融合基因', defaultRisk: RiskLevel.HIGH },
  { id: 'bcr_abl1', label: 't(9;22) / BCR-ABL1', category: '融合基因', defaultRisk: RiskLevel.HIGH },
  { id: 'ubtf_itd', label: 'UBTF-ITD', category: '基因突变', defaultRisk: RiskLevel.HIGH },
];

export const INDUCTION_I_MAPPING = {
  'runx1_runx1t1': 'DAE',
  'cbfb_myh11': 'HAE',
  'kmt2a_mllt11': 'HAE',
  'kmt2a_mllt3': 'HAE',
  'others': 'MAG/IdAG + 维奈克拉'
};
