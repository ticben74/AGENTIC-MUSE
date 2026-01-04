import React from 'react';
import { BookOpen, Cpu, ShieldAlert, Zap, Landmark, Globe, ShieldCheck, LayoutGrid, Activity, Award, CreditCard, BadgeCheck } from 'lucide-react';
import { GuideSection } from './types';

export const GUIDE_SECTIONS: GuideSection[] = [
  {
    id: 'intro',
    title: 'مقدمة في الذكاء الاصطناعي للمتاحف',
    icon: 'Landmark',
    content: 'تحول الذكاء الاصطناعي من مجرد أداة تقنية إلى شريك إبداعي في المتاحف. يساعد في تحليل المجموعات، تحسين تجربة الزوار، وتوفير وصول أعمق للمعلومات التاريخية.'
  },
  {
    id: 'unified-model',
    title: 'استراتيجية النموذج المحلي الموحد',
    icon: 'Award',
    content: 'بدلاً من الاعتماد على نماذج عامة، نعتمد استراتيجية النموذج الموحد الذي يتم تدريبه خصيصاً على المهام المتحفية (مثل فك النقوش، سرد القصص التاريخية، والتدقيق الأثري).\n\n### لماذا النموذج الموحد؟\n* **الدقة التخصصية:** فهم المصطلحات التاريخية المعقدة.\n* **الخصوصية المطلقة:** يعمل داخل جدران المتحف.\n* **استمرارية الخدمة:** لا يتأثر بانقطاع الإنترنت.'
  },
  {
    id: 'rag',
    title: 'تقنية RAG (التوليد المعزز بالاسترجاع)',
    icon: 'Cpu',
    content: 'تعتمد تقنية RAG في المتاحف على ربط النموذج اللغوي بمستودع معرفي موثوق لضمان أعلى درجات الدقة. تقنياً، يتم تقسيم المعلومات إلى متجهات (Embeddings) في قاعدة بيانات متجهة.'
  },
  {
    id: 'edge-ai',
    title: 'التشغيل المحلي والنماذج الطرفية (Edge AI)',
    icon: 'ShieldCheck',
    content: 'يوفر التشغيل المحلي مزايا استراتيجية للمتاحف بضمان خصوصية بيانات الزوار وسرعة الاستجابة في المواقع الأثرية.\n\n### تقنيات تحسين النموذج (Model Optimization Techniques):\n* **التقليم (Pruning):** إزالة الأوزان غير الضرورية لتقليل الحجم وتسريع الأداء.\n* **تقطير المعرفة (Knowledge Distillation):** تدريب نموذج خفيف ليفاكي أداء نموذج ضخم.\n* **محركات الاستنتاج:** استخدام ONNX Runtime و TensorRT لتحقيق استجابة فائقة السرعة.\n\n### تقنيات إدارة وتحسين الذاكرة (Memory Management):\n* **تكميم النماذج المتقدم (Advanced Quantization):** استخدام صيغ متطورة مثل GGUF بترميز (q4_K_M) لضغط الأوزان من 16-bit إلى 4-bit. هذه التقنية تضمن تقليل استهلاك الذاكرة العشوائية (RAM) بنسبة تصل إلى 75% مع الحفاظ على منطق الحوار وسلاسة اللغة.\n* **توزيع الحمل الهجين (Hybrid Offloading):** استراتيجية ذكية لتقسيم طبقات النموذج (Layers) بين ذاكرة الرسوميات (vRAM) وذاكرة النظام (System RAM). هذا يسمح بتشغيل نماذج تتجاوز سعة كرت الشاشة المتوفر في أكشاك المتحف (Kiosks) عبر الاستفادة من الذاكرة المركزية للجهاز.\n* **نماذج التضمين الموفرة (Resource-Efficient Embeddings):** اعتماد نماذج تضمين ذات أبعاد متجهية مدروسة (مثل `all-MiniLM-L6-v2` أو `BGE-Small`). هذه النماذج توفر توازناً مثالياً بين سرعة استرجاع المعلومات من الأرشيف المتحفي وبين تقليل البصمة الذاكرية الإجمالية للنظام.\n\n### تحديات التنفيذ في البيئة المتحفية (Challenges):\n* **قيود العتاد (Hardware Limitations):** أجهزة المتاحف الميدانية غالباً ما تكون ذات قدرات معالجة متوسطة.\n* **استدامة وصيانة النماذج (Model Maintenance):** تحديث المحتوى المعرفي دون الحاجة لإعادة تدريب النموذج بالكامل.\n* **المخاطر الأمنية (Security Concerns):** تأمين الأجهزة من التلاعب الفيزيائي وحماية قواعد بيانات المتجهات.\n\n### أفضل الممارسات المقترحة (Best Practices):\n* **تحديثات OTA المشفرة:** لإرسال تحسينات النموذج بأمان.\n* **استخدام وحدات NPU:** استغلال المعالجات العصبية المخصصة في أجهزة مثل Jetson لتحسين كفاءة الطاقة.\n* **تجزئة السياق (Context Window Optimization):** تحديد طول السياق بدقة لتجنب استهلاك الذاكرة المفرط عند المحادثات الطويلة.'
  },
  {
    id: 'monetization-guide',
    title: 'نموذج الاستدامة المالية',
    icon: 'CreditCard',
    content: 'بناء وكيل ذكاء اصطناعي يتطلب خطة استدامة. يمكن للمتاحف تفعيل باقات "الدليل الفائق" للزوار كخدمة إضافية (Premium Context) توفر معلومات حصرية وتحليلات فنية معقمة.'
  }
];

export const ICON_MAP: Record<string, React.ReactNode> = {
  Landmark: <Landmark className="w-5 h-5" />,
  Cpu: <Cpu className="w-5 h-5" />,
  ShieldAlert: <ShieldAlert className="w-5 h-5" />,
  Globe: <Globe className="w-5 h-5" />,
  Zap: <Zap className="w-5 h-5" />,
  ShieldCheck: <ShieldCheck className="w-5 h-5" />,
  LayoutGrid: <LayoutGrid className="w-5 h-5" />,
  Activity: <Activity className="w-5 h-5" />,
  Award: <Award className="w-5 h-5" />,
  CreditCard: <CreditCard className="w-5 h-5" />,
  BadgeCheck: <BadgeCheck className="w-5 h-5" />
};

export const PRICING_PLANS = [
  {
    name: "الباقة المجانية (المجتمع)",
    price: "0",
    features: ["الوصول للدليل الأساسي", "تحميل قوالب Python", "دعم مجتمعي عبر GitHub"],
    button: "ابدأ الآن",
    highlight: false
  },
  {
    name: "باقة المحترفين (المتاحف المتوسطة)",
    price: "299",
    features: ["النموذج الموحد (Museum Edition)", "أدوات تخصيص البيانات", "دعم فني عبر البريد", "شهادة اعتماد المؤسسة"],
    button: "اشترك الآن",
    highlight: true
  },
  {
    name: "باقة المؤسسات (المتاحف الوطنية)",
    price: "تواصل معنا",
    features: ["تدريب نموذج مخصص بالكامل", "تركيب خوادم Edge محلية", "تدريب ميداني للموظفين", "دعم فني 24/7"],
    button: "اطلب استشارة",
    highlight: false
  }
];