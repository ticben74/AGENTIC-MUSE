import React, { useState } from 'react';
import { Landmark, Sparkles, BookOpen, Layers, Settings, HelpCircle, ArrowRight, Microscope, CreditCard, BadgeCheck } from 'lucide-react';
import ChatInterface from './components/ChatInterface';
import BlueprintLab from './components/BlueprintLab';
import PricingPlans from './components/PricingPlans';
import { GUIDE_SECTIONS, ICON_MAP } from './constants';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'guide' | 'lab' | 'pricing'>('guide');

  return (
    <div className="min-h-screen bg-[#0a192f] text-[#e6f1ff] overflow-x-hidden font-sans">
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#667eea10] rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-[#764ba210] rounded-full blur-[100px]"></div>
      </div>

      <nav className="relative z-50 sticky top-0 bg-[#0a192f]/80 backdrop-blur-md border-b border-[#233554] px-6 py-4">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-bold text-xl">
            <div className="bg-[#667eea] p-1.5 rounded-lg">
              <Landmark className="w-5 h-5 text-white" />
            </div>
            <span className="font-serif-ar tracking-wide">MuseumAI <span className="text-[#667eea]">Masterclass</span></span>
          </div>
          <div className="flex bg-[#112240] p-1 rounded-full border border-[#233554] overflow-x-auto max-w-full">
            <button 
              onClick={() => setActiveTab('guide')}
              className={`flex items-center gap-2 px-4 md:px-6 py-2 rounded-full text-xs md:text-sm font-bold transition-all whitespace-nowrap ${activeTab === 'guide' ? 'bg-[#667eea] text-white' : 'text-gray-400 hover:text-white'}`}
            >
              <BookOpen className="w-4 h-4" />
              الدليل
            </button>
            <button 
              onClick={() => setActiveTab('lab')}
              className={`flex items-center gap-2 px-4 md:px-6 py-2 rounded-full text-xs md:text-sm font-bold transition-all whitespace-nowrap ${activeTab === 'lab' ? 'bg-[#667eea] text-white' : 'text-gray-400 hover:text-white'}`}
            >
              <Microscope className="w-4 h-4" />
              المختبر
            </button>
            <button 
              onClick={() => setActiveTab('pricing')}
              className={`flex items-center gap-2 px-4 md:px-6 py-2 rounded-full text-xs md:text-sm font-bold transition-all whitespace-nowrap ${activeTab === 'pricing' ? 'bg-[#667eea] text-white' : 'text-gray-400 hover:text-white'}`}
            >
              <CreditCard className="w-4 h-4" />
              الاستدلال المالي
            </button>
          </div>
        </div>
      </nav>

      {activeTab === 'guide' && (
        <>
          <header className="relative z-10 container mx-auto px-6 py-12 text-center">
            <div className="inline-flex items-center gap-2 bg-amber-500/10 text-amber-500 px-4 py-1 rounded-full text-[10px] font-bold mb-6 border border-amber-500/20">
              <BadgeCheck className="w-3 h-3" />
              أكاديمية معتمدة من قبل الخبراء
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 font-serif-ar leading-tight">
              احتراف وكلاء <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#667eea] to-[#764ba2]">
                المتاحف الذكية
              </span>
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed mb-10">
              تعلم كيف تحول البيانات التاريخية إلى تجارب غامرة، واحصل على شهادة "مطور معتمد" عند إكمال المختبر التقني.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <button 
                onClick={() => setActiveTab('lab')}
                className="bg-[#667eea] hover:bg-[#5a6fd6] text-white px-8 py-3 rounded-full font-bold transition-all flex items-center gap-2 shadow-lg shadow-[#667eea30]"
              >
                ابدأ رحلة الاعتماد <ArrowRight className="w-4 h-4 rotate-180" />
              </button>
              <button 
                onClick={() => setActiveTab('pricing')}
                className="bg-transparent border border-[#233554] hover:border-[#667eea] text-gray-300 px-8 py-3 rounded-full font-bold transition-all"
              >
                خطط التشغيل
              </button>
            </div>
          </header>

          <main className="relative z-10 container mx-auto px-6 py-12">
            <div className="grid lg:grid-cols-12 gap-8">
              <div className="lg:col-span-7 space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {GUIDE_SECTIONS.map((section) => (
                    <div key={section.id} className="bg-[#112240] p-6 rounded-2xl border border-[#233554] hover:border-[#667eea50] transition-all group">
                      <div className="bg-[#1e3a5f] w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#667eea20] transition-all">
                        <div className="text-[#667eea]">{ICON_MAP[section.icon]}</div>
                      </div>
                      <h3 className="text-xl font-bold mb-3">{section.title}</h3>
                      <p className="text-gray-400 text-sm leading-relaxed whitespace-pre-line">{section.content}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="lg:col-span-5 h-[700px] sticky top-24">
                <ChatInterface />
              </div>
            </div>
          </main>
        </>
      )}

      {activeTab === 'lab' && <BlueprintLab onBack={() => setActiveTab('guide')} />}
      {activeTab === 'pricing' && <PricingPlans />}

      <footer className="relative z-10 container mx-auto px-6 py-20 border-t border-[#233554] mt-20 text-center">
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} MuseumAI Masterclass Academy. 
          <br />
          جميع الحقوق محفوظة للمؤسسات الثقافية الرقمية.
        </p>
      </footer>
    </div>
  );
};

export default App;