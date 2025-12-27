
import React from 'react';
import { PatientData, RiskLevel } from '../types';
import { INDUCTION_I_MAPPING } from '../constants';
import { PlayCircle, CheckCircle2, AlertCircle, ArrowRight, Activity } from 'lucide-react';

interface Props {
  patient: PatientData;
  setPatient: React.Dispatch<React.SetStateAction<PatientData>>;
  risk: RiskLevel;
}

const TreatmentPlan: React.FC<Props> = ({ patient, setPatient, risk }) => {
  // Determine Induction I based on protocol flowchart logic
  const getInductionI = () => {
    if (patient.markers.includes('runx1_runx1t1')) return 'DAE (标准剂量 SDC)';
    if (patient.markers.some(m => ['cbfb_myh11', 'kmt2a_mllt11', 'kmt2a_mllt3'].includes(m))) return 'HAE (基于 HHT)';
    return 'MAG/IdAG + 维奈克拉 (低剂量 LDC)';
  };

  const getConsolidation = () => {
    switch (risk) {
      case RiskLevel.LOW: return 'HA, EA, LA (3 个疗程大剂量阿糖胞苷)';
      case RiskLevel.INTERMEDIATE: return 'HA, EA, LA + 造血干细胞移植 (如有合适供者)';
      case RiskLevel.HIGH: return 'HA, EA, LA + 强制造血干细胞移植 (若无法移植则选用 FLAG/CLAG)';
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 bg-slate-50 border-b border-slate-200">
          <h2 className="text-xl font-bold text-slate-800 flex items-center">
            <PlayCircle className="w-6 h-6 mr-2 text-indigo-500" />
            第二步：诱导与巩固治疗路径
          </h2>
          <p className="text-sm text-slate-500 mt-1">制定方案并记录治疗反应，以动态调整最终风险分层。</p>
        </div>

        <div className="p-8">
          <div className="flex flex-col space-y-8 relative">
            {/* Step: Induction I */}
            <div className="flex items-start">
              <div className="z-10 bg-indigo-600 rounded-full p-2 text-white shadow-md">
                <Activity className="w-5 h-5" />
              </div>
              <div className="ml-6 flex-grow">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-bold text-slate-800">诱导 I (Induction I)</h4>
                  <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-full border border-indigo-100 uppercase">
                    第 1-4 周
                  </span>
                </div>
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                  <div className="text-indigo-700 font-bold mb-1">{getInductionI()}</div>
                  <div className="text-xs text-slate-500">基于初诊分子遗传学标记。</div>
                </div>
                
                <div className="mt-4 p-4 border border-dashed border-slate-300 rounded-lg">
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">记录结果 (MRD %):</label>
                  <div className="flex items-center space-x-4">
                    <input 
                      type="number" 
                      placeholder="例: 0.5"
                      step="0.01"
                      value={patient.mrd1 || ''}
                      onChange={(e) => setPatient(p => ({ ...p, mrd1: Number(e.target.value) }))}
                      className="w-32 px-3 py-2 border rounded-md text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    {patient.mrd1 !== undefined && (
                      <span className={`text-sm font-semibold ${patient.mrd1 < 1 ? 'text-emerald-600' : 'text-rose-600'}`}>
                        {patient.mrd1 < 1 ? '反应：< 1% (良好)' : '反应：≥ 1% (欠佳)'}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Vertical Line */}
            <div className="absolute left-4 top-10 bottom-10 w-0.5 bg-slate-200 z-0"></div>

            {/* Step: Induction II */}
            <div className="flex items-start">
              <div className="z-10 bg-indigo-600 rounded-full p-2 text-white shadow-md">
                <Activity className="w-5 h-5" />
              </div>
              <div className="ml-6 flex-grow">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-bold text-slate-800">诱导 II (Induction II)</h4>
                  <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-full border border-indigo-100 uppercase">
                    第 5-8 周
                  </span>
                </div>
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                  <div className="text-indigo-700 font-bold mb-1">
                    {patient.mrd1 !== undefined && patient.mrd1 >= 1 
                      ? `${getInductionI().split(' ')[0]} + 维奈克拉 (升级方案)` 
                      : `${getInductionI().split(' ')[0]} (标准重复)`}
                  </div>
                  <div className="text-xs text-slate-500">
                    {patient.mrd1 !== undefined && patient.mrd1 >= 1 ? '因诱导 I MRD ≥ 1%，加入靶向药物。' : '按原计划继续。'}
                  </div>
                </div>

                <div className="mt-4 p-4 border border-dashed border-slate-300 rounded-lg">
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">最终反应 (MRD %):</label>
                  <div className="flex items-center space-x-4">
                    <input 
                      type="number" 
                      placeholder="例: 0.05"
                      step="0.001"
                      value={patient.mrd2 || ''}
                      onChange={(e) => setPatient(p => ({ ...p, mrd2: Number(e.target.value) }))}
                      className="w-32 px-3 py-2 border rounded-md text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    {patient.mrd2 !== undefined && (
                      <span className={`text-sm font-semibold ${patient.mrd2 < 0.1 ? 'text-emerald-600' : 'text-rose-600'}`}>
                        {patient.mrd2 < 0.1 ? '结果：MRD 阴性' : '结果：MRD 阳性 (风险自动升级为高危)'}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Step: Consolidation */}
            <div className="flex items-start">
              <div className="z-10 bg-indigo-600 rounded-full p-2 text-white shadow-md">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div className="ml-6 flex-grow">
                <h4 className="font-bold text-slate-800 mb-2">巩固治疗阶段 (Consolidation)</h4>
                <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
                  <div className="text-emerald-800 font-bold mb-1">{getConsolidation()}</div>
                  <div className="text-xs text-emerald-600">
                    {risk === RiskLevel.HIGH ? '需密切监测并尽早启动造血干细胞移植规划。' : '继续标准大剂量阿糖胞苷巩固疗程。'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* TKI / Inhibitor Alerts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {patient.markers.includes('flt3_itd') && (
          <div className="flex items-center p-4 bg-amber-50 border border-amber-200 rounded-xl text-amber-800">
            <AlertCircle className="w-5 h-5 mr-3" />
            <div className="text-sm">
              <strong>检测到 FLT3-ITD：</strong> 请在诱导及巩固阶段加入索拉非尼或吉列替尼。
            </div>
          </div>
        )}
        {patient.markers.includes('kit_exon_17') && (
          <div className="flex items-center p-4 bg-amber-50 border border-amber-200 rounded-xl text-amber-800">
            <AlertCircle className="w-5 h-5 mr-3" />
            <div className="text-sm">
              <strong>检测到 KIT Exon 17：</strong> 建议尽早考虑加入阿伐替尼。
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TreatmentPlan;
