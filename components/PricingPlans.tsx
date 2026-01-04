import React from 'react';
import { CheckCircle2, Zap, Shield, Crown } from 'lucide-react';
import { PRICING_PLANS } from '../constants';

const PricingPlans: React.FC = () => {
  return (
    <div className="relative z-10 container mx-auto px-6 py-20 animate-in fade-in duration-700">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 font-serif-ar">خطط الاستدامة والتشغيل</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          اختر الباقة التي تناسب حجم مؤسستك الثقافية لضمان استمرارية تحديث وتطوير وكيلك الذكي.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {PRICING_PLANS.map((plan, idx) => (
          <div 
            key={idx}
            className={`relative p-8 rounded-3xl border transition-all duration-300 hover:-translate-y-2 ${
              plan.highlight 
                ? 'bg-gradient-to-b from-[#1e3a5f] to-[#112240] border-[#667eea] shadow-2xl shadow-[#667eea20]' 
                : 'bg-[#112240] border-[#233554]'
            }`}
          >
            {plan.highlight && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#667eea] text-white px-4 py-1 rounded-full text-xs font-bold flex items-center gap-2">
                <Crown className="w-3 h-3" /> الأكثر مبيعاً
              </div>
            )}
            
            <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
            <div className="mb-6">
              <span className="text-4xl font-bold">{plan.price}</span>
              {plan.price !== "تواصل معنا" && <span className="text-gray-400 text-sm"> دولار / شهرياً</span>}
            </div>

            <ul className="space-y-4 mb-8">
              {plan.features.map((feature, fIdx) => (
                <li key={fIdx} className="flex items-center gap-3 text-sm text-gray-300">
                  <CheckCircle2 className={`w-4 h-4 shrink-0 ${plan.highlight ? 'text-[#667eea]' : 'text-gray-500'}`} />
                  {feature}
                </li>
              ))}
            </ul>

            <button 
              className={`w-full py-4 rounded-xl font-bold transition-all ${
                plan.highlight 
                  ? 'bg-[#667eea] text-white hover:bg-[#5a6fd6]' 
                  : 'bg-transparent border border-[#233554] text-gray-400 hover:border-[#667eea] hover:text-white'
              }`}
            >
              {plan.button}
            </button>
          </div>
        ))}
      </div>

      <div className="mt-20 bg-[#112240] border border-[#233554] p-10 rounded-3xl text-center max-w-4xl mx-auto">
        <h3 className="text-2xl font-bold mb-4">لماذا الاستثمار في "النموذج الموحد"؟</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-4">
            <Shield className="w-8 h-8 text-[#667eea] mx-auto mb-3" />
            <h4 className="font-bold text-sm mb-2">استقلال تقني</h4>
            <p className="text-xs text-gray-500">عدم الاعتماد على شركات خارجية لإدارة بياناتك الثقافية.</p>
          </div>
          <div className="p-4">
            <Zap className="w-8 h-8 text-[#667eea] mx-auto mb-3" />
            <h4 className="font-bold text-sm mb-2">توفير هائل</h4>
            <p className="text-xs text-gray-500">تقليل تكاليف الـ API السحابية بنسبة تصل إلى 90%.</p>
          </div>
          <div className="p-4">
            <Crown className="w-8 h-8 text-[#667eea] mx-auto mb-3" />
            <h4 className="font-bold text-sm mb-2">سيادة ثقافية</h4>
            <p className="text-xs text-gray-500">نموذج يعكس لغتك، تاريخك، وقيمك بدقة تامة.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPlans;