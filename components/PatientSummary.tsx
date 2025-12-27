
import React from 'react';
import { PatientData, RiskLevel } from '../types';
import { GENETIC_MARKERS } from '../constants';
import { User, ShieldAlert, TrendingUp, FlaskConical } from 'lucide-react';

interface Props {
  patient: PatientData;
  initialRisk: RiskLevel;
  finalRisk: RiskLevel;
}

const PatientSummary: React.FC<Props> = ({ patient, initialRisk, finalRisk }) => {
  const getRiskColor = (risk: RiskLevel) => {
    switch (risk) {
      case RiskLevel.LOW: return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case RiskLevel.INTERMEDIATE: return 'bg-amber-100 text-amber-800 border-amber-200';
      case RiskLevel.HIGH: return 'bg-rose-100 text-rose-800 border-rose-200';
      default: return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  const selectedMarkers = GENETIC_MARKERS.filter(m => patient.markers.includes(m.id));

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-5 border-b border-slate-100 bg-slate-50">
        <h3 className="text-lg font-bold text-slate-800 flex items-center">
          <User className="w-5 h-5 mr-2 text-indigo-500" />
          患者档案预览
        </h3>
      </div>
      
      <div className="p-5 space-y-6">
        {/* Basic Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
            <span className="text-xs font-semibold text-slate-400 uppercase block mb-1">年龄</span>
            <span className="text-lg font-bold text-slate-700">{patient.age} 岁</span>
          </div>
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
            <span className="text-xs font-semibold text-slate-400 uppercase block mb-1">体重</span>
            <span className="text-lg font-bold text-slate-700">{patient.weight} kg</span>
          </div>
          <div className="col-span-2 p-3 rounded-lg bg-slate-50 border border-slate-100">
            <span className="text-xs font-semibold text-slate-400 uppercase block mb-1">初始 WBC 计数</span>
            <span className="text-lg font-bold text-slate-700">{patient.wbc} × 10⁹/L</span>
          </div>
        </div>

        {/* Initial Risk Badge */}
        <div>
          <span className="text-xs font-semibold text-slate-400 uppercase block mb-2">初始风险分层</span>
          <div className={`px-4 py-2 rounded-lg border text-sm font-bold flex items-center justify-center ${getRiskColor(initialRisk)}`}>
            <ShieldAlert className="w-4 h-4 mr-2" />
            {initialRisk}
          </div>
        </div>

        {/* MRD and Final Risk */}
        {(patient.mrd1 !== undefined || patient.mrd2 !== undefined) && (
          <div className="pt-4 border-t border-slate-100">
            <span className="text-xs font-semibold text-slate-400 uppercase block mb-2">治疗反应评估</span>
            <div className="space-y-3">
              {patient.mrd1 !== undefined && (
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500">MRD (诱导 I 后):</span>
                  <span className={`font-mono font-bold ${patient.mrd1 < 1 ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {patient.mrd1}%
                  </span>
                </div>
              )}
              {patient.mrd2 !== undefined && (
                <>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-500">MRD (诱导 II 后):</span>
                    <span className={`font-mono font-bold ${patient.mrd2 < 0.1 ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {patient.mrd2}%
                    </span>
                  </div>
                  <div className={`mt-2 p-3 rounded-lg border text-sm font-bold flex items-center justify-center ${getRiskColor(finalRisk)}`}>
                    <TrendingUp className="w-4 h-4 mr-2" />
                    最终评估: {finalRisk}
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* Selected Markers */}
        {selectedMarkers.length > 0 && (
          <div className="pt-4 border-t border-slate-100">
            <span className="text-xs font-semibold text-slate-400 uppercase block mb-2">遗传学标记</span>
            <div className="flex flex-wrap gap-2">
              {selectedMarkers.map(m => (
                <span key={m.id} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-100">
                  <FlaskConical className="w-3 h-3 mr-1" />
                  {m.label}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientSummary;
