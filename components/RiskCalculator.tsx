
import React from 'react';
import { PatientData } from '../types';
import { GENETIC_MARKERS } from '../constants';
import { FlaskConical, Target, Thermometer } from 'lucide-react';

interface Props {
  patient: PatientData;
  setPatient: React.Dispatch<React.SetStateAction<PatientData>>;
}

const RiskCalculator: React.FC<Props> = ({ patient, setPatient }) => {
  const toggleMarker = (id: string) => {
    setPatient(prev => ({
      ...prev,
      markers: prev.markers.includes(id) 
        ? prev.markers.filter(m => m !== id)
        : [...prev.markers, id]
    }));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-6 bg-slate-50 border-b border-slate-200">
        <h2 className="text-xl font-bold text-slate-800 flex items-center">
          <FlaskConical className="w-6 h-6 mr-2 text-indigo-500" />
          第一步：初诊临床评估
        </h2>
        <p className="text-sm text-slate-500 mt-1">请根据初诊活检结果，选择患者的人口统计学信息及分子遗传学标记。</p>
      </div>

      <div className="p-8 space-y-10">
        {/* Quantitative Section */}
        <section>
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4 flex items-center">
            <Thermometer className="w-4 h-4 mr-2" />
            基本信息与实验室指标
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">年龄 (岁)</label>
              <input 
                type="number" 
                value={patient.age}
                onChange={(e) => setPatient(p => ({ ...p, age: Number(e.target.value) }))}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">体重 (kg)</label>
              <input 
                type="number" 
                value={patient.weight}
                onChange={(e) => setPatient(p => ({ ...p, weight: Number(e.target.value) }))}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">初始 WBC (× 10⁹/L)</label>
              <input 
                type="number" 
                value={patient.wbc}
                onChange={(e) => setPatient(p => ({ ...p, wbc: Number(e.target.value) }))}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
              />
            </div>
          </div>
        </section>

        {/* Markers Section */}
        <section>
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4 flex items-center">
            <Target className="w-4 h-4 mr-2" />
            遗传学亚型与基因突变
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {GENETIC_MARKERS.map(marker => (
              <button
                key={marker.id}
                onClick={() => toggleMarker(marker.id)}
                className={`flex items-start p-3 rounded-lg border text-left transition ${
                  patient.markers.includes(marker.id)
                    ? 'bg-indigo-50 border-indigo-400 ring-1 ring-indigo-400'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className={`w-4 h-4 mt-0.5 rounded-full border flex-shrink-0 mr-3 flex items-center justify-center ${
                  patient.markers.includes(marker.id) ? 'bg-indigo-600 border-indigo-600' : 'bg-white border-slate-300'
                }`}>
                  {patient.markers.includes(marker.id) && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-800">{marker.label}</div>
                  <div className="text-xs text-slate-400 capitalize">{marker.category}</div>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Exclusion Reminders */}
        <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 text-xs text-slate-500">
          <strong>方案提示：</strong> 排除标准包括 APL、AMKL、Down 综合征相关 AML 及 MDS 转化的 AML。不伴 KIT 突变的 CBF-AML 通常定义为低危。
        </div>
      </div>
    </div>
  );
};

export default RiskCalculator;
