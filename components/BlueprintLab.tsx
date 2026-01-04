
import React, { useState } from 'react';
import { 
  Database, 
  Cpu, 
  Binary, 
  Rocket, 
  ChevronLeft, 
  CheckCircle2, 
  Upload, 
  Search, 
  Shield, 
  Zap,
  HardDrive,
  Cloud,
  FileCode,
  Terminal,
  Download,
  Copy,
  ExternalLink,
  Award,
  Crown,
  BadgeCheck,
  Share2,
  // Added Landmark to fix the 'Cannot find name' error
  Landmark
} from 'lucide-react';

interface LabStep {
  id: number;
  title: string;
  icon: React.ReactNode;
}

const steps: LabStep[] = [
  { id: 1, title: 'تجهيز البيانات', icon: <Database className="w-5 h-5" /> },
  { id: 2, title: 'إنشاء المتجهات', icon: <Binary className="w-5 h-5" /> },
  { id: 3, title: 'اختيار النموذج', icon: <Award className="w-5 h-5" /> },
  { id: 4, title: 'الاعتماد التقني', icon: <BadgeCheck className="w-5 h-5" /> },
];

const BlueprintLab: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [modelChoice, setModelChoice] = useState<'unified' | 'cloud' | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);

  const nextStep = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setCurrentStep(prev => Math.min(prev + 1, 4));
      setIsProcessing(false);
    }, 1200);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('تم نسخ الكود بنجاح!');
  };

  const pythonTemplate = `
import ollama
from langchain_community.vectorstores import Chroma
from langchain_community.embeddings import OllamaEmbeddings

# 1. إعداد النموذج المتحفي الموحد (مدرب مسبقاً)
CHAT_MODEL = "museum-specialized-phi3"
EMBED_MODEL = "nomic-embed-text"

# 2. تحميل البيانات المتجهة
embeddings = OllamaEmbeddings(model=EMBED_MODEL)
vectorstore = Chroma(persist_directory="./museum_db", embedding_function=embeddings)

# 3. محرك الاستدلال المحلي
def museum_query(question):
    docs = vectorstore.similarity_search(question, k=3)
    context = "\\n".join([d.page_content for d in docs])
    
    prompt = f"بصفتك الدليل الموحد، أجب بناءً على السياق: {context}\\nالسؤال: {question}"
    response = ollama.chat(model=CHAT_MODEL, messages=[{'role': 'user', 'content': prompt}])
    return response['message']['content']
  `;

  return (
    <div className="relative z-10 container mx-auto px-6 py-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-[#667eea] hover:text-[#5a6fd6] font-bold mb-8 transition-colors"
      >
        <ChevronLeft className="w-5 h-5 rotate-180" />
        العودة للدليل
      </button>

      <div className="bg-[#112240] rounded-3xl border border-[#233554] overflow-hidden shadow-2xl">
        {/* Header Section */}
        <div className="bg-[#1e3a5f] p-8 border-b border-[#233554] flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h2 className="text-3xl font-bold mb-2 font-serif-ar">مختبر التنفيذ والاعتماد</h2>
            <p className="text-gray-400 text-sm">أكمل الخطوات لتحصل على شهادة "مطور وكلاء المتاحف الذكية".</p>
          </div>
          <div className="flex items-center gap-2 bg-[#0a192f] p-2 rounded-2xl border border-[#233554]">
            {steps.map((step) => (
              <div 
                key={step.id}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  currentStep === step.id 
                    ? 'bg-[#667eea] text-white' 
                    : currentStep > step.id 
                    ? 'text-[#667eea]' 
                    : 'text-gray-500'
                }`}
              >
                {currentStep > step.id ? <CheckCircle2 className="w-4 h-4" /> : step.icon}
                <span className="hidden md:inline">{step.title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="p-8 md:p-12 min-h-[500px] flex flex-col items-center justify-center text-center">
          
          {currentStep === 1 && (
            <div className="max-w-xl space-y-8 animate-in fade-in zoom-in duration-300">
              <div className="w-20 h-20 bg-[#667eea10] rounded-3xl flex items-center justify-center mx-auto border border-[#667eea30]">
                <Database className="w-10 h-10 text-[#667eea]" />
              </div>
              <h3 className="text-2xl font-bold">الخطوة 1: توحيد مصادر البيانات</h3>
              <p className="text-gray-400">تجميع كافة البيانات التاريخية في مستودع رقمي موحد لبدء عملية التدريب.</p>
              <button onClick={nextStep} disabled={isProcessing} className="bg-[#667eea] text-white px-8 py-4 rounded-xl font-bold w-full">
                {isProcessing ? 'جاري التحويل...' : 'بدء الرقمنة'}
              </button>
            </div>
          )}

          {currentStep === 2 && (
            <div className="max-w-xl space-y-8 animate-in fade-in zoom-in duration-300">
              <div className="w-20 h-20 bg-[#667eea10] rounded-3xl flex items-center justify-center mx-auto border border-[#667eea30]">
                <Binary className="w-10 h-10 text-[#667eea]" />
              </div>
              <h3 className="text-2xl font-bold">الخطوة 2: بناء فضاء المتجهات</h3>
              <p className="text-gray-400">تحويل المعرفة إلى لغة رياضية يفهمها الوكيل الموحد.</p>
              <button onClick={nextStep} disabled={isProcessing} className="bg-[#667eea] text-white px-8 py-4 rounded-xl font-bold w-full">
                {isProcessing ? 'جاري بناء الفضاء...' : 'توليد المتجهات'}
              </button>
            </div>
          )}

          {currentStep === 3 && (
            <div className="max-w-4xl space-y-8 animate-in fade-in zoom-in duration-300">
              <h3 className="text-3xl font-bold">الخطوة 3: اختيار النموذج</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <button onClick={() => setModelChoice('unified')} className={`p-8 rounded-3xl border text-right transition-all ${modelChoice === 'unified' ? 'bg-[#667eea20] border-[#667eea]' : 'bg-[#0a192f]'}`}>
                  <Award className="w-10 h-10 mb-4 text-amber-500" />
                  <h4 className="font-bold">النموذج الموحد (Museum Edition)</h4>
                  <p className="text-xs text-gray-400 mt-2">خيار النخبة للسيادة الثقافية والخصوصية.</p>
                </button>
                <button onClick={() => setModelChoice('cloud')} className="p-8 rounded-3xl border border-[#233554] bg-[#0a192f] text-right opacity-50">
                  <Cloud className="w-10 h-10 mb-4 text-gray-500" />
                  <h4 className="font-bold">النموذج السحابي العام</h4>
                  <p className="text-xs text-gray-400 mt-2">خيار سريع مع تحديات في الخصوصية.</p>
                </button>
              </div>
              {modelChoice === 'unified' && (
                <button onClick={nextStep} disabled={isProcessing} className="bg-amber-500 text-[#0a192f] px-12 py-4 rounded-xl font-bold">
                  {isProcessing ? 'جاري التثبيت...' : 'تثبيت النموذج الموحد'}
                </button>
              )}
            </div>
          )}

          {currentStep === 4 && (
            <div className="max-w-4xl space-y-8 animate-in fade-in zoom-in duration-300">
              {!showCertificate ? (
                <>
                  <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto border-4 border-green-500 animate-bounce">
                    <BadgeCheck className="w-10 h-10 text-green-500" />
                  </div>
                  <h3 className="text-3xl font-bold font-serif-ar">لقد أتممت بناء وكيلك الذكي!</h3>
                  <p className="text-gray-400">بناءً على اختيارك لـ "النموذج الموحد"، أنت الآن مؤهل للحصول على اعتماد المطورين.</p>
                  
                  <div className="flex flex-col md:flex-row gap-4 justify-center">
                    <button 
                      onClick={() => setShowCertificate(true)}
                      className="bg-gradient-to-r from-amber-500 to-amber-600 text-[#0a192f] px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-3 shadow-xl shadow-amber-500/20"
                    >
                      <Award className="w-5 h-5" /> استلام الشهادة الرقمية
                    </button>
                    <button className="bg-[#1e3a5f] text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-3">
                      <Download className="w-5 h-5" /> تحميل حقيبة الأدوات
                    </button>
                  </div>
                </>
              ) : (
                <div className="bg-white text-[#0a192f] p-10 rounded-2xl border-8 border-amber-500 relative overflow-hidden shadow-2xl animate-in zoom-in duration-500 max-w-2xl mx-auto">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500 -mr-16 -mt-16 rotate-45"></div>
                  <Landmark className="w-12 h-12 text-amber-500 mb-6 mx-auto" />
                  <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Museum AI Academy</h4>
                  <h2 className="text-3xl font-bold font-serif-ar mb-4">شهادة اعتماد تقني</h2>
                  <div className="w-20 h-1 bg-[#0a192f] mx-auto mb-6"></div>
                  <p className="mb-6 italic">نُقر بأن المطور قد أتم بنجاح محاكاة بناء</p>
                  <h3 className="text-xl font-bold text-amber-600 mb-8">وكيل الذكاء الاصطناعي الموحد للمتاحف</h3>
                  <div className="flex justify-between items-end border-t border-gray-100 pt-6">
                    <div className="text-right">
                      <p className="text-[10px] text-gray-400">تاريخ الإصدار</p>
                      <p className="text-xs font-bold">{new Date().toLocaleDateString('ar-EG')}</p>
                    </div>
                    <div className="bg-amber-100 p-2 rounded-lg">
                      <BadgeCheck className="w-8 h-8 text-amber-500" />
                    </div>
                  </div>

                  <div className="mt-8 flex gap-3 justify-center">
                    <button className="text-[10px] bg-gray-100 px-3 py-1 rounded-full flex items-center gap-1 hover:bg-gray-200 transition-colors">
                      <Share2 className="w-3 h-3" /> مشاركة على LinkedIn
                    </button>
                    <button onClick={() => setShowCertificate(false)} className="text-[10px] text-gray-400 hover:text-red-500">إغلاق</button>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default BlueprintLab;
