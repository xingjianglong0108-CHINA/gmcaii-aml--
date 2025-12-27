
import React, { useState, useMemo } from 'react';
import { PatientData, RiskLevel } from './types';
import { GENETIC_MARKERS } from './constants';
import RiskCalculator from './components/RiskCalculator';
import TreatmentPlan from './components/TreatmentPlan';
import PatientSummary from './components/PatientSummary';
import { Activity, ClipboardList, Stethoscope, Info } from 'lucide-react';

const App: React.FC = () => {
  const [patient, setPatient] = useState<PatientData>({
    age: 10,
    weight: 30,
    wbc: 5,
    markers: [],
  });

  const [activeTab, setActiveTab] = useState<'diagnosis' | 'treatment' | 'followup'>('diagnosis');

  // Logic to calculate initial risk
  const initialRisk = useMemo(() => {
    const hasHighMarker = GENETIC_MARKERS.some(m => 
      patient.markers.includes(m.id) && m.defaultRisk === RiskLevel.HIGH
    );
    const hasLowMarker = GENETIC_MARKERS.some(m => 
      patient.markers.includes(m.id) && m.defaultRisk === RiskLevel.LOW
    );
    
    // Protocol Rule: WBC >= 100 with Low marker -> Intermediate
    if (patient.wbc >= 100 && hasLowMarker) return RiskLevel.INTERMEDIATE;
    // Protocol Rule: WBC >= 100 without Low marker -> High
    if (patient.wbc >= 100 && !hasLowMarker) return RiskLevel.HIGH;
    
    if (hasHighMarker) return RiskLevel.HIGH;
    if (hasLowMarker) return RiskLevel.LOW;
    
    return RiskLevel.INTERMEDIATE; // Default to intermediate if "Others"
  }, [patient]);

  // Logic to calculate adjusted risk after MRD
  const finalRisk = useMemo(() => {
    if (patient.mrd2 !== undefined && patient.mrd2 >= 0.1) {
      return RiskLevel.HIGH;
    }
    return initialRisk;
  }, [initialRisk, patient.mrd2]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-indigo-700 text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Activity className="w-8 h-8 text-indigo-200" />
            <h1 className="text-xl font-bold tracking-tight">GMCAII 儿童 AML 决策工具</h1>
          </div>
          <div className="flex space-x-1">
            <button 
              onClick={() => setActiveTab('diagnosis')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition ${activeTab === 'diagnosis' ? 'bg-indigo-800 text-white' : 'text-indigo-100 hover:bg-indigo-600'}`}
            >
              <div className="flex items-center space-x-2">
                <ClipboardList className="w-4 h-4" />
                <span>风险评估</span>
              </div>
            </button>
            <button 
              onClick={() => setActiveTab('treatment')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition ${activeTab === 'treatment' ? 'bg-indigo-800 text-white' : 'text-indigo-100 hover:bg-indigo-600'}`}
            >
              <div className="flex items-center space-x-2">
                <Stethoscope className="w-4 h-4" />
                <span>治疗规划</span>
              </div>
            </button>
            <button 
              onClick={() => setActiveTab('followup')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition ${activeTab === 'followup' ? 'bg-indigo-800 text-white' : 'text-indigo-100 hover:bg-indigo-600'}`}
            >
              <div className="flex items-center space-x-2">
                <Info className="w-4 h-4" />
                <span>方案详情 & 随访</span>
              </div>
            </button>
          </div>
        </div>
      </header>

      <main className="flex-grow max-w-7xl mx-auto w-full px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Patient Context (Sticky) */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <PatientSummary 
              patient={patient} 
              initialRisk={initialRisk} 
              finalRisk={finalRisk} 
            />
          </div>
        </div>

        {/* Right Columns: Main Interaction */}
        <div className="lg:col-span-2 space-y-8">
          {activeTab === 'diagnosis' && (
            <RiskCalculator patient={patient} setPatient={setPatient} />
          )}
          
          {activeTab === 'treatment' && (
            <TreatmentPlan patient={patient} setPatient={setPatient} risk={finalRisk} />
          )}

          {activeTab === 'followup' && (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">
                <Info className="w-6 h-6 mr-2 text-indigo-500" />
                研究方案信息 (GMCAII)
              </h2>
              <div className="space-y-6 text-slate-600 leading-relaxed">
                <section>
                  <h3 className="font-semibold text-slate-800 text-lg mb-2">研究背景</h3>
                  <p>
                    GMCAII（基于基因分型结合 MRD 驱动的缓解诱导）是一项针对儿童和青少年 AML 的多中心 II 期临床研究（2024.01-2028.12）。
                    其主要目标是相较于 AML2018 方案，进一步提高 MRD 阴性 CR 率，改善 EFS 和 CIR。
                  </p>
                </section>
                <section>
                  <h3 className="font-semibold text-slate-800 text-lg mb-2">关键监测点</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li><strong>D26/D32:</strong> 强制性的骨髓评估，用于评估诱导治疗反应。</li>
                    <li><strong>MRD 阈值:</strong> 诱导 II 后的 0.1% 是风险升级的关键判定阈值。</li>
                    <li><strong>LDC vs SDC:</strong> 根据初始分子分型选择低剂量（LDC）或标准剂量（SDC）方案。</li>
                  </ul>
                </section>
                <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-md">
                  <p className="text-sm italic">
                    注：本工具仅作为临床决策参考，不可替代专家的医学判断。请务必参考 GMCAII 完整方案 PDF 以获取准确的药物剂量及入组/排除标准。
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className="bg-slate-100 border-t border-slate-200 py-6">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-500 text-sm">
          &copy; 2024 GMCAII AML 研究组。交互式临床支持工具。
        </div>
      </footer>
    </div>
  );
};

export default App;
