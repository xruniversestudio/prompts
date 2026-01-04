import React, { useState, useEffect } from 'react';
import { 
  ArrowRightLeft, 
  Wallet, 
  ChevronLeft, 
  Info, 
  AlertTriangle,
  ArrowUpDown,
  History,
  Coins
} from 'lucide-react';

// --- البيانات الأساسية للفئات النقدية السورية الجديدة ---
const DENOMS = [
  { v: 500, n: 'خمسمئة', s: '🌾', c: 'bg-amber-600' },
  { v: 200, n: 'مئتان', s: '🫒', c: 'bg-lime-700' },
  { v: 100, n: 'مئة', s: '☁️', c: 'bg-blue-600' },
  { v: 50, n: 'خمسون', s: '🍊', c: 'bg-orange-500' },
  { v: 25, n: 'خمس وعشرون', s: '🍇', c: 'bg-purple-600' },
  { v: 10, n: 'عشرة', s: '🌹', c: 'bg-rose-600' },
];

const App = () => {
  const [screen, setScreen] = useState('home');

  const renderScreen = () => {
    switch(screen) {
      case 'home': return <HomeScreen onStart={(s) => setScreen(s)} />;
      case 'oldToNew': return <ConverterMode initialMode="oldToNew" onBack={() => setScreen('home')} />;
      case 'newToOld': return <ConverterMode initialMode="newToOld" onBack={() => setScreen('home')} />;
      case 'wallet': return <WalletOnlyMode onBack={() => setScreen('home')} />;
      default: return <HomeScreen onStart={(s) => setScreen(s)} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans selection:bg-orange-200" dir="rtl">
      <div className="max-w-md mx-auto min-h-screen bg-white shadow-2xl relative overflow-hidden flex flex-col border-x border-slate-100">
        {renderScreen()}
      </div>
    </div>
  );
};

// --- المكونات المشتركة ---

// مكون عرض توزيع الأوراق النقدية (الذي طلبته ليظهر في كل مكان)
const CashBreakdown = ({ amountInNew }) => {
  const [parts, setParts] = useState([]);
  const [leftover, setLeftover] = useState(0);

  useEffect(() => {
    let current = parseFloat(amountInNew) || 0;
    const res = [];
    DENOMS.forEach(d => {
      const count = Math.floor(current / d.v);
      if (count > 0) {
        res.push({ ...d, count });
        current -= (count * d.v);
      }
    });
    setParts(res);
    setLeftover(Math.round(current * 100) / 100);
  }, [amountInNew]);

  if (!amountInNew || amountInNew <= 0) return null;

  return (
    <div className="mt-8 space-y-4 animate-in fade-in slide-in-from-bottom duration-500">
      <div className="flex items-center justify-between px-2">
        <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
          <Wallet className="w-4 h-4" /> توزيع المبلغ (بالجديد)
        </h3>
      </div>
      
      <div className="grid gap-2">
        {parts.map(p => (
          <div key={p.v} className="bg-slate-50 p-3 rounded-2xl border border-slate-100 flex items-center justify-between group shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-xl shadow-inner border border-slate-100">
                {p.s}
              </div>
              <div>
                <div className="font-black text-slate-800 text-base">{p.v} <span className="text-[10px] text-slate-400 font-normal">({p.n})</span></div>
              </div>
            </div>
            <div className="bg-slate-900 text-white px-3 py-1 rounded-lg font-black text-sm">
              × {p.count}
            </div>
          </div>
        ))}
        
        {leftover > 0 && (
          <div className="bg-amber-50 rounded-2xl p-4 border border-amber-100 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
            <div>
              <p className="text-xs text-amber-800 leading-tight">
                بقي <span className="font-bold">{leftover} ليرة جديدة</span> (تعادل {leftover * 100} ل.س قديمة) لا توجد أوراق نقدية لها.
              </p>
            </div>
          </div>
        )}
        
        {parts.length === 0 && amountInNew < 10 && amountInNew > 0 && (
           <div className="text-center p-4 bg-orange-50 rounded-2xl border border-orange-100 text-orange-700 text-xs font-bold">
             المبلغ أصغر من أقل فئة نقدية (١٠ ليرات)
           </div>
        )}
      </div>
    </div>
  );
};

const Header = ({ title, onBack }) => (
  <div className="p-4 flex items-center gap-4 border-b border-slate-50 sticky top-0 bg-white/90 backdrop-blur-md z-30">
    <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full transition-colors active:scale-90">
      <ChevronLeft className="w-6 h-6 text-slate-600" />
    </button>
    <h2 className="text-lg font-black text-slate-800">{title}</h2>
  </div>
);

// --- الشاشات ---

const HomeScreen = ({ onStart }) => (
  <div className="flex-1 flex flex-col p-8 animate-in fade-in duration-700">
    <div className="mt-12 mb-10 text-center">
      <div className="inline-block p-4 bg-orange-50 rounded-full mb-4 shadow-inner">
        <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center text-white text-4xl shadow-lg ring-8 ring-orange-100 font-black">
          ل
        </div>
      </div>
      <h1 className="text-4xl font-black text-slate-900 tracking-tight">ليرتي</h1>
      <p className="text-slate-500 mt-2 font-medium">مساعدك الذكي للعملة السورية</p>
    </div>

    <div className="grid gap-4">
      <MenuButton 
        title="قديش بيساووا بالجديد؟" 
        sub="تحويل من العملة القديمة"
        icon={<ArrowRightLeft className="text-orange-500" />}
        onClick={() => onStart('oldToNew')}
      />
      <MenuButton 
        title="قديش كانوا بالقديم؟" 
        sub="تحويل من العملة الجديدة"
        icon={<History className="text-blue-500" />}
        onClick={() => onStart('newToOld')}
      />
      <MenuButton 
        title="شلون بدي ادفعهن؟" 
        sub="توزيع المبلغ على الفئات"
        icon={<Wallet className="text-emerald-500" />}
        onClick={() => onStart('wallet')}
      />
    </div>

    <div className="mt-auto pt-10 text-center">
      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-3">
        <Info className="w-5 h-5 text-slate-400 shrink-0" />
        <p className="text-[11px] text-slate-500 text-right leading-tight">
          هذا التطبيق يحسب العملة السورية بعد حذف صفرين (كل ١ ليرة جديدة تعادل ١٠٠ ليرة قديمة).
        </p>
      </div>
    </div>
  </div>
);

const MenuButton = ({ title, sub, icon, onClick }) => (
  <button 
    onClick={onClick}
    className="flex items-center gap-4 p-5 bg-white border-2 border-slate-100 rounded-2xl hover:border-orange-200 hover:bg-orange-50/30 transition-all active:scale-95 group shadow-sm text-right w-full"
  >
    <div className="p-3 bg-white rounded-xl shadow-md group-hover:shadow-orange-100 transition-all border border-slate-50">
      {icon}
    </div>
    <div>
      <div className="font-bold text-slate-900 text-lg">{title}</div>
      <div className="text-slate-400 text-sm">{sub}</div>
    </div>
  </button>
);

// شاشة التحويل الموحدة (تدعم التبديل وتوزيع الأوراق)
const ConverterMode = ({ initialMode, onBack }) => {
  const [val, setVal] = useState('');
  const [mode, setMode] = useState(initialMode); // 'oldToNew' or 'newToOld'

  const isOldToNew = mode === 'oldToNew';
  const result = isOldToNew ? (val / 100) : (val * 100);
  
  // القيمة بالجديد دائماً لاستخدامها في توزيع الأوراق
  const amountInNew = isOldToNew ? result : val;

  const handleToggle = () => {
    const currentResult = result;
    setMode(isOldToNew ? 'newToOld' : 'oldToNew');
    setVal(currentResult === 0 ? '' : currentResult.toString());
  };

  return (
    <div className="flex-1 flex flex-col animate-in slide-in-from-left duration-300">
      <Header title={isOldToNew ? "من قديم لجديد" : "من جديد لقديم"} onBack={onBack} />
      
      <div className="p-6 space-y-6 overflow-y-auto pb-10 flex-1">
        {/* قسم الإدخال */}
        <div className="relative">
          <div className="bg-slate-100 p-6 rounded-[2rem] border-2 border-transparent focus-within:border-orange-200 focus-within:bg-white transition-all">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">
              {isOldToNew ? "المبلغ بالقديم (ل.س)" : "المبلغ بالجديد (جديد)"}
            </label>
            <input 
              type="number" 
              placeholder="0"
              className="w-full text-4xl font-black bg-transparent outline-none"
              value={val}
              onChange={(e) => setVal(e.target.value)}
              autoFocus
            />
          </div>

          {/* زر التبديل العائم */}
          <button 
            onClick={handleToggle}
            className="absolute -bottom-5 left-1/2 -translate-x-1/2 bg-orange-500 text-white p-3 rounded-2xl shadow-lg shadow-orange-500/40 hover:scale-110 active:scale-90 transition-all z-20 border-4 border-white"
          >
            <ArrowUpDown className="w-5 h-5" />
          </button>
        </div>

        <div className="h-2"></div>

        {/* قسم النتيجة */}
        <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-xl text-center relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
          <div className="text-slate-500 text-[10px] font-black uppercase tracking-widest relative z-10">النتيجة</div>
          <div className="text-5xl font-black truncate relative z-10 py-2">
            {result.toLocaleString('ar-SY')}
          </div>
          <div className="text-orange-400 text-sm font-bold relative z-10">
            {isOldToNew ? "ليرة جديدة" : "ليرة قديمة"}
          </div>
        </div>

        {/* عرض توزيع الأوراق النقدية تلقائياً */}
        <CashBreakdown amountInNew={amountInNew} />
      </div>
    </div>
  );
};

// شاشة "شلون بدي ادفعهن" الصافية
const WalletOnlyMode = ({ onBack }) => {
  const [val, setVal] = useState('');
  
  return (
    <div className="flex-1 flex flex-col animate-in slide-in-from-left duration-300">
      <Header title="شلون بدي ادفعهن؟" onBack={onBack} />
      <div className="p-6 space-y-6 overflow-y-auto flex-1 pb-10">
        <div className="bg-emerald-50 p-6 rounded-[2rem] border-2 border-emerald-100">
          <label className="text-emerald-700 text-[10px] font-black uppercase tracking-widest block mb-1">المبلغ بالجديد</label>
          <input 
            type="number" 
            placeholder="أدخل المبلغ..."
            className="w-full bg-transparent text-4xl font-black text-emerald-900 outline-none"
            value={val}
            onChange={(e) => setVal(e.target.value)}
          />
        </div>
        
        <CashBreakdown amountInNew={val} />
        
        {!val && (
          <div className="flex flex-col items-center justify-center py-20 text-slate-300">
            <Wallet className="w-16 h-16 mb-4 opacity-20" />
            <p className="text-sm font-medium">أدخل مبلغاً لعرض طريقة دفعه</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
