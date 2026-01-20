import React, { useState, useEffect, useRef } from 'react';
import {
  Plus,
  Clock,
  TrendingUp,
  Brain,
  Check,
  X,
  ArrowRight,
  ShoppingBag,
  List,
  History,
  Settings,
  Lock,
  Unlock,
  Sparkles,
  AlertTriangle,
  Globe,
  Star,
  Wallet,
  Download,
  Upload,
  FileJson,
  Key,
  Zap,
  Trash2
} from 'lucide-react';

// --- Translations ---
const translations = {
  ja: {
    title: "Mono-sashi",
    tabList: "リスト",
    tabAdd: "追加",
    tabHistory: "履歴",
    cancel: "キャンセル",
    step: "ステップ",
    whatDoYouWant: "何が欲しいですか？",
    itemName: "商品名",
    itemPrice: "金額",
    urlMemo: "URL / メモ",
    next: "次へ",
    howAreYou: "今の状態は？",
    haltDesc: "状態を記録しておくだけで、後で振り返る時に役立ちます。",
    recordDone: "記録完了",
    finalConfirm: "最終確認",
    aiConfirm: "客観的な価値を確認してリストに追加します。",
    aiSuggestion: "価値の再発見",
    aiLoading: "計算中...",
    aiBasedOn: "あなたの設定に基づいた提案",
    investment: "もし投資に回していたら (10年後)",
    coolingPeriod: "冷却期間を選ぶ",
    days: "日間",
    period24h: "24時間",
    period1w: "1週間",
    period1m: "1ヶ月",
    addToList: "リストに追加する",
    waitingList: "待機リスト",
    noItems: "欲しいものはありません。\n素晴らしい自制心です。",
    unlockable: "解除可能",
    daysLeft: "あと {days} 日",
    potentialSavings: "保留中",
    pendingItems: "個",
    targetItem: "Target Item",
    addedDate: "追加日",
    haltState: "追加時の精神状態 (HALT)",
    calmState: "落ち着いた状態でした",
    altProposal: "代替案",
    coolingDone: "冷却期間終了",
    coolingDoneDesc: "待機期間が経過しました。\n冷静な判断ができます。",
    dontBuy: "買わない",
    bought: "購入した",
    coolingNow: "現在、冷却期間中です。",
    emergencyBuy: "緊急購入（ルールを破る）",
    reallyBuy: "本当に今すぐ買いますか？",
    yesBuy: "はい、買います",
    historyTitle: "履歴と順応の記録",
    avoided: "回避した無駄遣い",
    totalSpent: "総出費",
    boughtStatus: "購入済み",
    rejectedStatus: "見送った",
    satisfactionLog: "満足度の記録",
    addReview: "今の満足度を記録",
    selectRating: "評価を選択してください",
    settingsTitle: "設定・データ",
    back: "戻る",
    topicsLabel: "価値のモノサシ（比較対象）",
    topicsDesc: "「これにお金を使うなら幸せ」という体験と金額を登録してください。",
    topicNamePlaceholder: "例: ランチ, 旅行",
    topicPricePlaceholder: "金額",
    noTopics: "まだ登録されていません",
    addTopic: "追加",
    investRate: "投資想定利回り（10年後計算用）",
    hungry: "空腹",
    angry: "怒り",
    lonely: "孤独",
    tired: "疲労",
    year: "年",
    month: "月",
    all: "すべて",
    purchasedOn: "購入日",
    rejectedOn: "見送り日",
    currencyLabel: "通貨記号",
    budgetLabel: "贅沢予算設定",
    budgetRemaining: "許容額",
    budgetUsed: "使用額",
    backupData: "データのバックアップ",
    backupDesc: "データをファイルとして保存・復元します",
    export: "保存 (Export)",
    importData: "復元 (Import)",
    importConfirm: "現在のデータが上書きされます。よろしいですか？",
    importSuccess: "データを復元しました。",
    importError: "ファイルの読み込みに失敗しました。",
    debugTitle: "デバッグ・テスト",
    debugDesc: "テスト用に、全アイテムの待機時間を強制終了します。",
    debugButton: "全アイテムを即時解除 (Time Skip)",
    debugConfirm: "リスト内の全てのアイテムを「解除可能」状態にしますか？",
    debugSuccess: "全てのアイテムのロックを強制解除しました（日付を過去に変更しました）。\nリストに戻ります。",
    apiKeyLabel: "Gemini APIキー（上級者向け）",
    apiKeyDesc: "入力するとAIがユニークな提案をしてくれます。未入力でも基本機能は全て使えます。",
    apiKeyPlaceholder: "AIzaSy... (任意)",
    expUnitLabel: "比較基準の金額",
    expUnitDesc: "「1回分」の金額（例：飲み代5000円）",
  },
  en: {
    title: "Mono-sashi",
    tabList: "List",
    tabAdd: "Add",
    tabHistory: "History",
    cancel: "Cancel",
    step: "Step",
    whatDoYouWant: "What do you want?",
    itemName: "Item Name",
    itemPrice: "Price",
    urlMemo: "URL / Note",
    next: "Next",
    howAreYou: "How are you feeling?",
    haltDesc: "Recording your state helps you reflect later.",
    recordDone: "Record Done",
    finalConfirm: "Confirmation",
    aiConfirm: "Check objective value and add to list.",
    aiSuggestion: "Value Check",
    aiLoading: "Calculating...",
    aiBasedOn: "Based on your preferences",
    investment: "If invested (after 10 years)",
    coolingPeriod: "Select Cooling Period",
    days: "days",
    period24h: "24 Hours",
    period1w: "1 Week",
    period1m: "1 Month",
    addToList: "Add to List",
    waitingList: "Waiting List",
    noItems: "Nothing on the list.\nGreat self-control!",
    unlockable: "Ready",
    daysLeft: "{days} days left",
    potentialSavings: "Pending",
    pendingItems: "items",
    targetItem: "Target Item",
    addedDate: "Added",
    haltState: "State of Mind (HALT)",
    calmState: "You were calm",
    altProposal: "Alternative",
    coolingDone: "Cooling Period Over",
    coolingDoneDesc: "The wait is over.\nYou can decide calmly now.",
    dontBuy: "Don't Buy",
    bought: "Bought",
    coolingNow: "Currently in cooling period.",
    emergencyBuy: "Emergency Buy (Break Rule)",
    reallyBuy: "Buy it now?",
    yesBuy: "Yes, Buy",
    historyTitle: "History & Adaptation",
    avoided: "Money Saved",
    totalSpent: "Total Spent",
    boughtStatus: "Bought",
    rejectedStatus: "Rejected",
    satisfactionLog: "Satisfaction Log",
    addReview: "Log Satisfaction",
    selectRating: "Select Rating",
    settingsTitle: "Settings & Data",
    back: "Back",
    topicsLabel: "Value Standards",
    topicsDesc: "Register experiences and costs that make you happy.",
    topicNamePlaceholder: "e.g. Lunch, Trip",
    topicPricePlaceholder: "Cost",
    noTopics: "No topics yet",
    addTopic: "Add",
    investRate: "Investment Return Rate (10y)",
    hungry: "Hungry",
    angry: "Angry",
    lonely: "Lonely",
    tired: "Tired",
    year: "Year",
    month: "Month",
    all: "All",
    purchasedOn: "Purchased",
    rejectedOn: "Rejected",
    currencyLabel: "Currency Symbol",
    budgetLabel: "Luxury Budget Setting",
    budgetRemaining: "Allowance",
    budgetUsed: "Used",
    backupData: "Data Backup",
    backupDesc: "Save or restore your data via file.",
    export: "Export",
    importData: "Import",
    importConfirm: "Current data will be overwritten. Continue?",
    importSuccess: "Data restored successfully.",
    importError: "Failed to load file.",
    debugTitle: "Debug / Test",
    debugDesc: "Force finish waiting period for all items.",
    debugButton: "Unlock All Items (Time Skip)",
    debugConfirm: "Make all items unlockable immediately?",
    debugSuccess: "All items unlocked (dates set to past). Returning to list.",
    apiKeyLabel: "Gemini API Key (Optional)",
    apiKeyDesc: "Enables AI insights. App works fully without it.",
    apiKeyPlaceholder: "AIzaSy... (Optional)",
    expUnitLabel: "Reference Unit Price",
    expUnitDesc: "Cost of one 'experience' (e.g. Dinner cost)",
  }
};

// --- API Helpers ---
const defaultApiKey = "";

// Helper to find best matching topic
function findBestMatchTopic(price, topics) {
  if (!topics || topics.length === 0) return null;

  // 1. Try to find a topic with price close to target (0.5x ~ 2.0x)
  const closeMatch = topics.find(t => t.price >= price * 0.5 && t.price <= price * 2.0);
  if (closeMatch) return closeMatch;

  // 2. Try to find a topic that is cheaper (to show multiplier)
  // Sort descending by price to find the most expensive one that fits
  const cheaperMatches = topics.filter(t => t.price < price).sort((a, b) => b.price - a.price);
  if (cheaperMatches.length > 0) return cheaperMatches[0];

  // 3. Fallback: just return the first one (or cheapest/most expensive)
  return topics[0];
}

// Internal Logic Advisor (No AI required)
function generateOfflineAdvice(price, settings, lang) {
  const isEn = lang === 'en';
  const topics = settings.favoriteTopics || [];

  const bestTopic = findBestMatchTopic(price, topics);

  if (!bestTopic) {
    // Default fallback if no topics registered
    const unitPrice = 5000;
    const count = (price / unitPrice).toFixed(1);
    return {
      text: isEn
        ? `That's about ${count} nice dinners!`
        : `その金額で、素敵なディナーが約${count}回楽しめます！`,
      type: 'logic'
    };
  }

  const count = (price / bestTopic.price).toFixed(1);
  const isClose = count >= 0.8 && count <= 1.2;

  let message = "";
  if (isClose) {
    message = isEn
      ? `This costs about the same as one "${bestTopic.name}".`
      : `これは「${bestTopic.name}」1回分と同じくらいの金額です。`;
  } else if (price < bestTopic.price) {
    // Cheaper than topic
    const percent = Math.round((price / bestTopic.price) * 100);
    message = isEn
      ? `This is ${percent}% of a "${bestTopic.name}". Saving up?`
      : `これは「${bestTopic.name}」の${percent}%の金額です。我慢してそっちに使いませんか？`;
  } else {
    // More expensive than topic
    const flooredCount = Math.floor(price / bestTopic.price);
    message = isEn
      ? `For this price, you could enjoy "${bestTopic.name}" ${flooredCount} times!`
      : `この金額があれば、「${bestTopic.name}」が${flooredCount}回も楽しめます！`;
  }

  return { text: message, type: 'logic' };
}

async function generateExperienceComparison(price, settings, lang) {
  const userApiKey = settings.geminiApiKey;
  const currency = settings.currencySymbol;

  // 1. If NO API Key provided, use Offline Logic
  if (!userApiKey && !defaultApiKey) {
    return generateOfflineAdvice(price, settings, lang);
  }

  // 2. If API Key exists, try to use Gemini
  const keyToUse = userApiKey || defaultApiKey;
  const isEn = lang === 'en';

  // Format topics for AI prompt: "Lunch(1500), Trip(30000)"
  const topicListStr = settings.favoriteTopics
    .map(t => `${t.name}(${t.price})`)
    .join(', ');

  const systemPrompt = `
    You are a witty financial advisor.
    The user wants to buy an item for ${currency}${price}.
    Compare this cost to their favorite experiences: [${topicListStr}].
    Choose the most appropriate comparison from the list based on the price.
    If the list is empty, use general examples.

    Constraints:
    1. Short and punchy (under 60 chars).
    2. Respond in ${isEn ? 'English' : 'Japanese'}.
    3. Return JSON: { "text": "Suggestion content" }
  `;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${keyToUse}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: "Suggest an alternative." }] }],
          systemInstruction: { parts: [{ text: systemPrompt }] },
          generationConfig: { responseMimeType: "application/json" }
        })
      }
    );

    if (!response.ok) throw new Error('API Error');
    const data = await response.json();
    const result = JSON.parse(data.candidates[0].content.parts[0].text);
    return { text: result.text, type: 'ai' };

  } catch (error) {
    console.warn("AI failed, falling back to logic:", error);
    return generateOfflineAdvice(price, settings, lang);
  }
}

// --- Components ---

const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden ${className}`}>
    {children}
  </div>
);

const Button = ({ onClick, children, variant = "primary", className = "", disabled = false, isLoading = false }) => {
  const baseStyle = "px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 active:scale-95 disabled:active:scale-100 disabled:opacity-50 disabled:cursor-not-allowed";
  const variants = {
    primary: "bg-slate-900 text-white hover:bg-slate-800",
    secondary: "bg-white text-slate-700 border border-slate-300 hover:bg-slate-50",
    danger: "bg-red-50 text-red-600 border border-red-200 hover:bg-red-100",
    ghost: "bg-transparent text-slate-600 hover:bg-slate-100",
    ai: "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white border-none hover:opacity-90 shadow-md"
  };
  return (
    <button
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`${baseStyle} ${variants[variant]} ${className}`}
    >
      {isLoading ? (
        <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2"></span>
      ) : children}
    </button>
  );
};

// --- Sub-Views ---

const AddItemView = ({ newItem, setNewItem, onAdd, onCancel, settings, lang, t }) => {
  const [step, setStep] = useState(1);
  const [aiSuggestion, setAiSuggestion] = useState(null);
  const [suggestionType, setSuggestionType] = useState(null); // 'ai' or 'logic'
  const [isAiLoading, setIsAiLoading] = useState(false);
  const priceNum = parseInt(newItem.price) || 0;

  useEffect(() => {
    if (step === 3 && !aiSuggestion && priceNum > 0) {
      const fetchAi = async () => {
        setIsAiLoading(true);
        // This function now handles both AI and Logic fallback internally
        const result = await generateExperienceComparison(priceNum, settings, lang);
        setAiSuggestion(result.text);
        setSuggestionType(result.type);
        setIsAiLoading(false);
      };
      fetchAi();
    }
  }, [step, priceNum, settings, aiSuggestion, lang]);

  const calculateFutureValue = (price) => Math.floor(price * Math.pow(1 + settings.investmentRate, 10));

  const getPeriodLabel = (days) => {
    if (days === 1) return t.period24h;
    if (days === 7) return t.period1w;
    if (days === 30) return t.period1m;
    return `${days} ${t.days}`;
  };

  return (
    <div className="max-w-md mx-auto p-4 space-y-6 animate-fade-in pb-24">
      <div className="flex items-center justify-between mb-6">
        <Button variant="ghost" onClick={onCancel}>{t.cancel}</Button>
        <span className="font-bold text-slate-700">{t.step} {step}/3</span>
      </div>

      {step === 1 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-800">{t.whatDoYouWant}</h2>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">{t.itemName}</label>
              <input
                type="text"
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 outline-none"
                placeholder="..."
                value={newItem.name}
                onChange={e => setNewItem({...newItem, name: e.target.value})}
                autoFocus
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">{t.itemPrice} ({settings.currencySymbol})</label>
              <input
                type="number"
                inputMode="numeric"
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                placeholder="0"
                value={newItem.price}
                onChange={e => setNewItem({...newItem, price: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">{t.urlMemo}</label>
              <input
                type="text"
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 outline-none"
                placeholder="https://..."
                value={newItem.url}
                onChange={e => setNewItem({...newItem, url: e.target.value})}
              />
            </div>
          </div>
          <Button
            className="w-full mt-4"
            disabled={!newItem.name || !newItem.price}
            onClick={() => setStep(2)}
          >
            {t.next} <ArrowRight size={18} />
          </Button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-800 mb-2">{t.howAreYou}</h2>
            <p className="text-slate-500 text-sm">{t.haltDesc}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { key: 'hungry', label: t.hungry, icon: '🍔' },
              { key: 'angry', label: t.angry, icon: '💢' },
              { key: 'lonely', label: t.lonely, icon: '😢' },
              { key: 'tired', label: t.tired, icon: '😴' }
            ].map(opt => (
              <button
                key={opt.key}
                onClick={() => setNewItem({
                  ...newItem,
                  halt: { ...newItem.halt, [opt.key]: !newItem.halt[opt.key] }
                })}
                className={`p-4 rounded-xl border-2 transition-all ${
                  newItem.halt[opt.key]
                    ? 'border-slate-800 bg-slate-800 text-white shadow-lg transform scale-105'
                    : 'border-slate-100 bg-white text-slate-600 hover:border-slate-300'
                }`}
              >
                <div className="text-2xl mb-1">{opt.icon}</div>
                <div className="font-bold">{opt.label}</div>
              </button>
            ))}
          </div>
          <Button className="w-full" onClick={() => setStep(3)}>
            {t.recordDone} <ArrowRight size={18} />
          </Button>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-6">
          <div className="text-center mb-4">
            <h2 className="text-2xl font-bold text-slate-800">{t.finalConfirm}</h2>
            <p className="text-slate-500 text-sm">{t.aiConfirm}</p>
          </div>
          <Card className="p-5 bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-100 relative">
             <div className="flex items-center gap-2 mb-2 text-indigo-700 font-bold text-sm">
                {suggestionType === 'ai' ? <Sparkles size={16} /> : <Zap size={16} />}
                {t.aiSuggestion}
             </div>
             {isAiLoading ? (
               <div className="animate-pulse flex space-x-4">
                 <div className="flex-1 space-y-2 py-1">
                   <div className="h-4 bg-indigo-200 rounded w-3/4"></div>
                   <div className="h-4 bg-indigo-200 rounded w-1/2"></div>
                 </div>
               </div>
             ) : (
               <div className="text-lg font-bold text-slate-800">
                 「{aiSuggestion || "..."}」
               </div>
             )}
             <p className="text-xs text-indigo-400 mt-2">
               {t.aiBasedOn}
             </p>
          </Card>
          <Card className="p-5 bg-slate-50 border-slate-200">
            <div className="text-sm text-slate-500 mb-1">{t.investment}</div>
            <div className="text-3xl font-bold text-emerald-600 flex items-center gap-2">
              <TrendingUp size={24} />
              {settings.currencySymbol}{calculateFutureValue(priceNum).toLocaleString()}
            </div>
          </Card>
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <label className="block text-sm font-bold text-slate-700 mb-3">{t.coolingPeriod}</label>
            <div className="grid grid-cols-3 gap-2">
              {[1, 7, 30].map(days => (
                <button
                  key={days}
                  onClick={() => setNewItem({...newItem, duration: days})}
                  className={`py-2 px-1 rounded-lg text-sm font-bold transition-all ${
                    newItem.duration === days
                      ? 'bg-slate-900 text-white shadow-md'
                      : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                  }`}
                >
                  {getPeriodLabel(days)}
                </button>
              ))}
            </div>
          </div>
          <div className="pt-4">
            <Button className="w-full py-4 text-lg" onClick={onAdd}>
              <Clock className="mr-2" /> {t.addToList}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

const DashboardView = ({ items, onSelectItem, onViewChange, toggleLang, lang, t, settings, view }) => {
  const activeItems = items.filter(i => i.status === 'waiting');
  const potentialSavings = activeItems.reduce((acc, curr) => acc + curr.price, 0);

  // Budget Calculation
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const thisMonthSpent = items
    .filter(i => i.status === 'bought' && i.boughtDate)
    .filter(i => {
      const d = new Date(i.boughtDate);
      return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
    })
    .reduce((acc, curr) => acc + curr.price, 0);

  const remainingBudget = settings.monthlyBudget - thisMonthSpent;
  const budgetProgress = Math.min(100, (thisMonthSpent / settings.monthlyBudget) * 100);

  return (
    <div className="pb-24">
      <div className="bg-slate-900 text-white p-6 rounded-b-3xl mb-4 shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold flex items-center gap-2">
            <Brain className="text-emerald-400" /> {t.title}
          </h1>
          <div className="flex gap-2">
            <button onClick={toggleLang} className="px-3 py-1 bg-white/10 rounded-full hover:bg-white/20 text-xs font-bold flex items-center gap-1">
               <Globe size={14} /> {lang.toUpperCase()}
            </button>
            <button onClick={() => onViewChange('settings')} className="p-2 bg-white/10 rounded-full hover:bg-white/20">
              <Settings size={20} />
            </button>
          </div>
        </div>
        <div className="flex justify-between items-end">
          <div>
            <p className="text-slate-400 text-sm mb-1">{t.potentialSavings}</p>
            <p className="text-3xl font-bold">{settings.currencySymbol}{potentialSavings.toLocaleString()}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-slate-400">{t.waitingList}</p>
            <p className="text-xl font-bold">{activeItems.length} <span className="text-sm font-normal">{t.pendingItems}</span></p>
          </div>
        </div>
      </div>

      <div className="px-4 mb-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-bold text-slate-700 flex items-center gap-2 text-sm">
              <Wallet size={16} className="text-indigo-500" /> {t.budgetRemaining}
            </h2>
            <span className={`text-lg font-bold ${remainingBudget < 0 ? 'text-red-500' : 'text-slate-800'}`}>
              {settings.currencySymbol}{remainingBudget.toLocaleString()}
            </span>
          </div>
          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mb-1">
             <div
               className={`h-full rounded-full ${remainingBudget < 0 ? 'bg-red-500' : 'bg-indigo-500'}`}
               style={{ width: `${budgetProgress}%` }}
             ></div>
          </div>
        </div>
      </div>

      <div className="px-4 space-y-3">
        <h2 className="font-bold text-slate-700 text-sm">{t.waitingList}</h2>
        {activeItems.length === 0 ? (
          <div className="text-center py-10 text-slate-400 bg-slate-50 rounded-xl border border-dashed border-slate-300">
            <ShoppingBag size={40} className="mx-auto mb-3 opacity-20" />
            <p className="whitespace-pre-wrap text-sm">{t.noItems}</p>
          </div>
        ) : (
          activeItems.map(item => {
            const now = new Date();
            const targetDate = new Date(item.unlockDate);
            const isUnlockable = targetDate < now;
            const daysLeft = Math.max(0, Math.ceil((targetDate - now) / (1000 * 60 * 60 * 24)));
            const totalDuration = item.duration || 30;

            let displayTime = t.daysLeft.replace('{days}', daysLeft);
            if (!isUnlockable && daysLeft === 1 && totalDuration === 1) {
               const hoursLeft = Math.max(0, Math.ceil((targetDate - now) / (1000 * 60 * 60)));
               if (hoursLeft <= 24) displayTime = `${hoursLeft} h left`;
            }

            return (
              <div
                key={item.id}
                onClick={() => onSelectItem(item)}
                className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm active:scale-[0.98] transition-transform cursor-pointer relative overflow-hidden"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-slate-800">{item.name}</h3>
                    <p className="text-sm text-slate-500">{settings.currencySymbol}{item.price.toLocaleString()}</p>
                  </div>
                  {isUnlockable ? (
                    <span className="bg-emerald-100 text-emerald-700 text-xs px-2 py-1 rounded-full font-bold flex items-center gap-1 h-6">
                      <Unlock size={12} /> {t.unlockable}
                    </span>
                  ) : (
                    <span className="bg-slate-100 text-slate-600 text-xs px-2 py-1 rounded-full font-bold flex items-center gap-1 h-6">
                      <Lock size={12} /> {displayTime}
                    </span>
                  )}
                </div>
                <div className="w-full bg-slate-100 h-1 rounded-full mt-2 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${isUnlockable ? 'bg-emerald-500' : 'bg-blue-500'}`}
                    style={{ width: `${isUnlockable ? 100 : Math.min(100, ((totalDuration - daysLeft) / totalDuration) * 100)}%` }}
                  ></div>
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 pb-6 pt-2 px-6 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-20">
        <div className="flex justify-between items-center max-w-md mx-auto relative">
          <button
            onClick={() => onViewChange('dashboard')}
            className={`flex flex-col items-center p-2 rounded-lg transition-colors w-16 ${view === 'dashboard' ? 'text-slate-900 font-bold' : 'text-slate-400 hover:text-slate-600'}`}
          >
            <List size={24} />
            <span className="text-[10px] mt-1">{t.tabList}</span>
          </button>
          <div className="relative -top-8">
            <button
              onClick={() => onViewChange('add')}
              className="bg-slate-900 text-white w-16 h-16 rounded-full shadow-xl flex items-center justify-center hover:bg-slate-800 hover:scale-105 transition-all border-4 border-slate-50"
            >
              <Plus size={32} />
            </button>
          </div>
          <button
            onClick={() => onViewChange('history')}
            className={`flex flex-col items-center p-2 rounded-lg transition-colors w-16 ${view === 'history' ? 'text-slate-900 font-bold' : 'text-slate-400 hover:text-slate-600'}`}
          >
            <History size={24} />
            <span className="text-[10px] mt-1">{t.tabHistory}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const ItemDetailView = ({ item, settings, onBack, onStatusChange, lang, t }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState(null);
  const [suggestionType, setSuggestionType] = useState(null);

  useEffect(() => {
    if (item && !aiSuggestion) {
       // Logic-based generation (with optional AI fallback if key exists)
       generateExperienceComparison(item.price, settings, lang).then(res => {
         setAiSuggestion(res?.text);
         setSuggestionType(res?.type);
       });
    }
  }, [item, lang, settings]);

  if (!item) return null;
  const now = new Date();
  const targetDate = new Date(item.unlockDate);
  const isUnlockable = targetDate < now;
  const daysLeft = Math.max(0, Math.ceil((targetDate - now) / (1000 * 60 * 60 * 24)));
  const isHaltTriggered = (halt) => Object.values(halt).some(v => v);

  return (
    <div className="p-4 max-w-md mx-auto min-h-screen bg-white pb-20">
      <Button variant="ghost" onClick={onBack} className="mb-4">
        ← {t.back}
      </Button>

      <div className="space-y-6">
        <div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{t.targetItem}</span>
          <h1 className="text-3xl font-bold text-slate-900 leading-tight">{item.name}</h1>
          <p className="text-2xl font-medium text-slate-600 mt-2">{settings.currencySymbol}{item.price.toLocaleString()}</p>
          {item.url && (
            <p className="text-sm text-blue-500 mt-1 truncate">{item.url}</p>
          )}
        </div>

        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-3">
          <h3 className="font-bold text-slate-700 flex items-center gap-2">
            <Brain size={18} /> {t.haltState}
          </h3>
          {isHaltTriggered(item.halt) ? (
            <div className="flex gap-2 flex-wrap">
              {item.halt.hungry && <span className="px-2 py-1 bg-slate-200 text-slate-700 text-xs rounded-md font-bold">{t.hungry}</span>}
              {item.halt.angry && <span className="px-2 py-1 bg-slate-200 text-slate-700 text-xs rounded-md font-bold">{t.angry}</span>}
              {item.halt.lonely && <span className="px-2 py-1 bg-slate-200 text-slate-700 text-xs rounded-md font-bold">{t.lonely}</span>}
              {item.halt.tired && <span className="px-2 py-1 bg-slate-200 text-slate-700 text-xs rounded-md font-bold">{t.tired}</span>}
            </div>
          ) : (
            <p className="text-sm text-emerald-600 flex items-center gap-1">
              <Check size={14} /> {t.calmState}
            </p>
          )}
          <div className="mt-2 text-xs text-slate-400">
             {t.addedDate}: {new Date(item.dateAdded).toLocaleDateString()}
          </div>
        </div>

        {aiSuggestion && (
           <Card className="p-4 bg-indigo-50 border-indigo-100">
             <div className="flex items-center gap-2 mb-1 text-indigo-700 font-bold text-xs">
                {suggestionType === 'ai' ? <Sparkles size={12} /> : <Zap size={12} />}
                {t.altProposal}
             </div>
             <p className="text-sm font-medium text-slate-700">{aiSuggestion}</p>
           </Card>
        )}

        {isUnlockable ? (
          <div className="space-y-4 animate-fade-in">
            <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-xl text-center">
              <Unlock size={48} className="mx-auto text-emerald-500 mb-3" />
              <h3 className="text-xl font-bold text-emerald-800 mb-2">{t.coolingDone}</h3>
              <p className="text-emerald-700 text-sm mb-4 whitespace-pre-wrap">
                {t.coolingDoneDesc}
              </p>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="danger" onClick={() => onStatusChange(item.id, 'rejected')}>
                  <X size={18} /> {t.dontBuy}
                </Button>
                <Button onClick={() => onStatusChange(item.id, 'bought')}>
                  <Check size={18} /> {t.bought}
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-slate-900 text-white p-6 rounded-xl text-center relative overflow-hidden transition-all">
            <div className="absolute top-0 left-0 w-full h-1 bg-slate-800">
              <div className="h-full bg-blue-500" style={{ width: `${(( (item.duration || 30) - daysLeft) / (item.duration || 30)) * 100}%` }}></div>
            </div>
            <Lock size={48} className="mx-auto text-slate-500 mb-3" />
            <h3 className="text-2xl font-bold mb-1">{t.daysLeft.replace('{days}', daysLeft)}</h3>
            <p className="text-slate-400 text-sm">
              {t.coolingNow}
            </p>

            {!showConfirm ? (
              <button
                onClick={() => setShowConfirm(true)}
                className="mt-6 text-xs text-slate-500 underline hover:text-white cursor-pointer p-2 transition-colors"
              >
                {t.emergencyBuy}
              </button>
            ) : (
              <div className="mt-6 animate-fade-in bg-slate-800 p-4 rounded-lg border border-slate-700">
                 <div className="flex items-center justify-center gap-2 text-amber-400 mb-3">
                    <AlertTriangle size={16} />
                    <span className="font-bold text-sm">{t.reallyBuy}</span>
                 </div>
                 <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setShowConfirm(false)}
                      className="py-2 text-xs font-bold text-slate-400 hover:text-white"
                    >
                      {t.cancel}
                    </button>
                    <button
                      onClick={() => onStatusChange(item.id, 'bought')}
                      className="py-2 px-3 bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold rounded"
                    >
                      {t.yesBuy}
                    </button>
                 </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const HistoryView = ({ items, onAddReview, onViewChange, t, lang, settings, view }) => {
  const [selectedYear, setSelectedYear] = useState('All');
  const [selectedMonth, setSelectedMonth] = useState('All');
  const [reviewingItemId, setReviewingItemId] = useState(null);

  const historyItems = items.filter(i => i.status !== 'waiting');

  const years = [...new Set(historyItems.map(i => new Date(i.dateAdded).getFullYear()))].sort((a,b) => b-a);
  const months = Array.from({length: 12}, (_, i) => i + 1);

  const filteredItems = historyItems.filter(item => {
    const d = new Date(item.dateAdded);
    if (selectedYear !== 'All' && d.getFullYear() !== parseInt(selectedYear)) return false;
    if (selectedMonth !== 'All' && d.getMonth() + 1 !== parseInt(selectedMonth)) return false;
    return true;
  });

  return (
    <div className="pb-24 px-4 pt-6 bg-slate-50 min-h-screen">
      <div className="flex justify-between items-end mb-6">
        <h2 className="text-2xl font-bold text-slate-800">{t.historyTitle}</h2>
      </div>

      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
         <select
           className="p-2 rounded-lg border border-slate-200 bg-white text-sm font-bold text-slate-700"
           value={selectedYear}
           onChange={(e) => setSelectedYear(e.target.value)}
         >
           <option value="All">{t.all} {t.year}</option>
           {years.map(y => <option key={y} value={y}>{y} {t.year}</option>)}
         </select>
         <select
           className="p-2 rounded-lg border border-slate-200 bg-white text-sm font-bold text-slate-700"
           value={selectedMonth}
           onChange={(e) => setSelectedMonth(e.target.value)}
         >
           <option value="All">{t.all} {t.month}</option>
           {months.map(m => <option key={m} value={m}>{m} {t.month}</option>)}
         </select>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
         <Card className="p-4 bg-emerald-50 border-emerald-100">
           <div className="text-2xl font-bold text-emerald-700">
             {settings.currencySymbol}{items.filter(i => i.status === 'rejected').reduce((acc, c) => acc + c.price, 0).toLocaleString()}
           </div>
           <div className="text-xs text-emerald-600 font-bold">{t.avoided}</div>
         </Card>
         <Card className="p-4 bg-slate-50 border-slate-200">
           <div className="text-2xl font-bold text-slate-700">
             {settings.currencySymbol}{items.filter(i => i.status === 'bought').reduce((acc, c) => acc + c.price, 0).toLocaleString()}
           </div>
           <div className="text-xs text-slate-500 font-bold">{t.totalSpent}</div>
         </Card>
      </div>

      <div className="space-y-4">
        {filteredItems.map(item => (
          <div key={item.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm relative">
            <div className="flex justify-between mb-2">
              <span className="font-bold text-slate-800">{item.name}</span>
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${item.status === 'bought' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-500'}`}>
                {item.status === 'bought' ? t.boughtStatus : t.rejectedStatus}
              </span>
            </div>
            <div className="text-xs text-slate-400 mb-2">
               {item.status === 'bought' ? t.purchasedOn : t.rejectedOn}: {item.boughtDate ? new Date(item.boughtDate).toLocaleDateString(lang === 'en' ? 'en-US' : 'ja-JP') : '-'}
            </div>

            {item.status === 'bought' && (
              <div className="mt-4 pt-4 border-t border-slate-100">
                {reviewingItemId === item.id ? (
                  <div className="mb-3 bg-slate-50 p-3 rounded-lg animate-fade-in text-center">
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-xs text-slate-500 font-bold">{t.selectRating}</p>
                      <button onClick={() => setReviewingItemId(null)} className="text-slate-400 hover:text-slate-600"><X size={14}/></button>
                    </div>
                    <div className="flex justify-center gap-2">
                      {[1, 2, 3, 4, 5].map(star => (
                        <button
                          key={star}
                          onClick={() => {
                            onAddReview(item.id, star);
                            setReviewingItemId(null);
                          }}
                          className="text-3xl hover:scale-110 transition-transform text-slate-300 hover:text-yellow-400 focus:text-yellow-400 p-1"
                        >
                          ★
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setReviewingItemId(item.id)}
                    className="w-full py-3 mt-2 bg-slate-100 rounded-lg font-bold text-slate-600 flex items-center justify-center gap-2 hover:bg-slate-200 transition-colors"
                  >
                    <Plus size={18} /> {t.addReview}
                  </button>
                )}

                <div className="space-y-2 mt-4">
                   {item.reviews && item.reviews.length > 0 && (
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{t.satisfactionLog}</p>
                   )}

                   {!item.reviews && item.satisfaction && (
                      <div className="flex items-center justify-between text-xs bg-slate-50 p-2 rounded">
                        <span className="text-slate-400">-</span>
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => <Star key={i} size={12} fill={i < item.satisfaction ? "currentColor" : "none"} className={i < item.satisfaction ? "" : "text-slate-200"} />)}
                        </div>
                      </div>
                   )}

                   {item.reviews && item.reviews.map((rev, idx) => (
                      <div key={idx} className="flex items-center justify-between text-xs bg-slate-50 p-2 rounded">
                         <span className="text-slate-500 font-mono">
                           {new Date(rev.date).toLocaleDateString(lang === 'en' ? 'en-US' : 'ja-JP')}
                         </span>
                         <div className="flex text-yellow-400 gap-0.5">
                           {[...Array(5)].map((_, i) => (
                             <Star key={i} size={12} fill={i < rev.rating ? "currentColor" : "none"} className={i < rev.rating ? "" : "text-slate-200"} />
                           ))}
                         </div>
                      </div>
                   ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 pb-6 pt-2 px-6 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-20">
        <div className="flex justify-between items-center max-w-md mx-auto relative">
          <button
            onClick={() => onViewChange('dashboard')}
            className={`flex flex-col items-center p-2 rounded-lg transition-colors w-16 ${view === 'dashboard' ? 'text-slate-900 font-bold' : 'text-slate-400 hover:text-slate-600'}`}
          >
            <List size={24} />
            <span className="text-[10px] mt-1">{t.tabList}</span>
          </button>
          <div className="relative -top-8">
            <button
              onClick={() => onViewChange('add')}
              className="bg-slate-900 text-white w-16 h-16 rounded-full shadow-xl flex items-center justify-center hover:bg-slate-800 hover:scale-105 transition-all border-4 border-slate-50"
            >
              <Plus size={32} />
            </button>
          </div>
          <button
            onClick={() => onViewChange('history')}
            className={`flex flex-col items-center p-2 rounded-lg transition-colors w-16 ${view === 'history' ? 'text-slate-900 font-bold' : 'text-slate-400 hover:text-slate-600'}`}
          >
            <History size={24} />
            <span className="text-[10px] mt-1">{t.tabHistory}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const SettingsView = ({ settings, setSettings, onBack, t, items, setItems, onViewChange, onDebugUnlock }) => {
  const [newTopicName, setNewTopicName] = useState("");
  const [newTopicPrice, setNewTopicPrice] = useState("");
  const fileInputRef = useRef(null);

  const handleAddTopic = () => {
    if (newTopicName.trim() && newTopicPrice) {
      const newTopic = {
        name: newTopicName.trim(),
        price: parseInt(newTopicPrice)
      };
      setSettings({
        ...settings,
        favoriteTopics: [...(settings.favoriteTopics || []), newTopic]
      });
      setNewTopicName("");
      setNewTopicPrice("");
    }
  };

  const handleRemoveTopic = (index) => {
    const newTopics = [...settings.favoriteTopics];
    newTopics.splice(index, 1);
    setSettings({...settings, favoriteTopics: newTopics});
  };

  const handleExport = () => {
    const data = {
      items: items,
      settings: settings,
      exportDate: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `monosashi_backup_${new Date().toISOString().slice(0,10)}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!window.confirm(t.importConfirm)) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        if (data.items && data.settings) {
          setItems(data.items);
          setSettings(data.settings);
          alert(t.importSuccess);
        } else {
          alert(t.importError);
        }
      } catch (err) {
        alert(t.importError);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="p-4 max-w-md mx-auto pb-24">
       <Button variant="ghost" onClick={onBack} className="mb-6">← {t.back}</Button>
       <h2 className="text-2xl font-bold mb-6">{t.settingsTitle}</h2>

       <div className="space-y-8">
         <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">{t.currencyLabel}</label>
            <input
               className="w-24 p-2 border rounded-lg mb-4"
               placeholder="¥"
               value={settings.currencySymbol}
               onChange={(e) => setSettings({...settings, currencySymbol: e.target.value})}
            />
            <label className="block text-sm font-bold text-slate-700 mb-2">{t.budgetLabel}</label>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-slate-500">{settings.currencySymbol}</span>
              <input
                type="number"
                className="flex-1 p-2 border rounded-lg"
                value={settings.monthlyBudget}
                onChange={(e) => setSettings({...settings, monthlyBudget: parseInt(e.target.value) || 0})}
              />
            </div>
         </div>

         {/* Topics Section */}
         <div className="border-t border-slate-100 pt-6">
           <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
             <Sparkles size={16} className="text-indigo-500"/>
             {t.topicsLabel}
           </label>
           <p className="text-xs text-slate-500 mb-3">{t.topicsDesc}</p>

           <div className="flex gap-2 mb-3">
             <input
               className="flex-[2] p-2 border rounded-lg text-sm"
               placeholder={t.topicNamePlaceholder}
               value={newTopicName}
               onChange={(e) => setNewTopicName(e.target.value)}
             />
             <input
               type="number"
               className="flex-1 p-2 border rounded-lg text-sm"
               placeholder={t.topicPricePlaceholder}
               value={newTopicPrice}
               onChange={(e) => setNewTopicPrice(e.target.value)}
               onKeyDown={(e) => e.key === 'Enter' && handleAddTopic()}
             />
             <Button onClick={handleAddTopic} variant="secondary" className="w-12 h-full py-2">
               <Plus size={16} />
             </Button>
           </div>

           <div className="flex flex-wrap gap-2">
             {settings.favoriteTopics.map((topic, index) => (
               <div key={index} className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-sm font-bold flex items-center gap-2">
                 <span>{topic.name} <span className="opacity-70 text-xs">({settings.currencySymbol}{topic.price})</span></span>
                 <button onClick={() => handleRemoveTopic(index)} className="hover:text-indigo-900">
                   <X size={12} />
                 </button>
               </div>
             ))}
             {settings.favoriteTopics.length === 0 && (
               <p className="text-sm text-slate-400 italic">{t.noTopics}</p>
             )}
           </div>
         </div>

         <div className="border-t border-slate-100 pt-6">
           <label className="block text-sm font-bold text-slate-700 mb-2">{t.investRate}</label>
           <div className="flex items-center gap-2">
             <input
               type="number"
               step="0.01"
               className="w-24 p-2 border rounded-lg"
               value={settings.investmentRate}
               onChange={(e) => setSettings({...settings, investmentRate: parseFloat(e.target.value) || 0})}
             />
             <span className="text-sm">（0.05 = 5%）</span>
           </div>
         </div>

         {/* API Key Section (Advanced) */}
         <div className="border-t border-slate-100 pt-6">
            <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
              <Key size={16} className="text-slate-400"/>
              {t.apiKeyLabel}
            </label>
            <p className="text-xs text-slate-500 mb-3 opacity-80">{t.apiKeyDesc}</p>
            <input
               type="password"
               className="w-full p-2 border border-slate-200 rounded-lg text-sm mb-1 bg-slate-50"
               placeholder={t.apiKeyPlaceholder}
               value={settings.geminiApiKey || ""}
               onChange={(e) => setSettings({...settings, geminiApiKey: e.target.value})}
            />
         </div>

         {/* Backup & Restore */}
         <div className="border-t border-slate-100 pt-6">
           <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
             <FileJson size={16} className="text-slate-500"/>
             {t.backupData}
           </label>
           <p className="text-xs text-slate-500 mb-3">{t.backupDesc}</p>
           <div className="grid grid-cols-2 gap-4">
             <Button onClick={handleExport} variant="secondary" className="w-full">
               <Download size={16} /> {t.export}
             </Button>
             <div className="relative">
                <input
                  type="file"
                  accept=".json"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleImport}
                />
                <Button onClick={() => fileInputRef.current?.click()} variant="secondary" className="w-full">
                  <Upload size={16} /> {t.importData}
                </Button>
             </div>
           </div>
         </div>

         <div className="border-t border-slate-100 pt-6">
           <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
             <span className="text-[10px] bg-slate-200 text-slate-600 px-1.5 py-0.5 rounded font-mono">DEV</span>
             {t.debugTitle}
           </label>
           <p className="text-xs text-slate-500 mb-3">{t.debugDesc}</p>
           <Button
             onClick={onDebugUnlock}
             variant="danger"
             className="w-full bg-orange-50 text-orange-600 border-orange-200 hover:bg-orange-100"
           >
             <Unlock size={16} /> {t.debugButton}
           </Button>
         </div>
       </div>
    </div>
  );
};

// --- Main App ---

export default function MindfulSpendApp() {
  const [items, setItems] = useState([]);
  const [view, setView] = useState('dashboard');
  const [lang, setLang] = useState('ja');
  const [settings, setSettings] = useState({
    experienceUnit: 5000,
    experienceName: "友人とのディナー",
    favoriteTopics: [
        { name: "美味しいランチ", price: 1500 },
        { name: "温泉旅行", price: 30000 },
        { name: "推しのライブ", price: 8000 }
    ],
    investmentRate: 0.05,
    monthlyBudget: 50000,
    currencySymbol: "¥",
    geminiApiKey: ""
  });

  const [newItem, setNewItem] = useState({
    name: '',
    price: '',
    url: '',
    duration: 30,
    halt: { hungry: false, angry: false, lonely: false, tired: false }
  });

  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const savedItems = localStorage.getItem('monosashi_items');
    const savedSettings = localStorage.getItem('monosashi_settings');
    const savedLang = localStorage.getItem('monosashi_lang');

    if (savedItems) {
      setItems(JSON.parse(savedItems));
    } else {
      // Initialize with Sample Data
      const now = new Date();
      const past = new Date(now.getTime() - 24 * 60 * 60 * 1000 * 31); // 31 days ago
      const future = new Date(now.getTime() + 24 * 60 * 60 * 1000 * 20); // 20 days later

      const sampleItems = [
        {
          id: 'sample-1',
          name: '高級エスプレッソマシン',
          price: 85000,
          url: '',
          duration: 30,
          dateAdded: new Date(now.getTime() - 24 * 60 * 60 * 1000 * 2).toISOString(), // Added 2 days ago
          unlockDate: future.toISOString(), // Still locked
          status: 'waiting',
          halt: { hungry: false, angry: false, lonely: false, tired: true },
          forceUnlock: false
        },
        {
          id: 'sample-2',
          name: 'ワイヤレスイヤホン',
          price: 32000,
          url: '',
          duration: 7,
          dateAdded: past.toISOString(), // Added long ago
          unlockDate: past.toISOString(), // Unlocked
          status: 'waiting',
          halt: { hungry: true, angry: false, lonely: false, tired: false },
          forceUnlock: false
        },
        {
          id: 'sample-3',
          name: 'ゲーミングキーボード',
          price: 24000,
          url: '',
          duration: 7,
          dateAdded: past.toISOString(),
          unlockDate: past.toISOString(),
          status: 'bought', // Bought
          boughtDate: new Date(now.getTime() - 24 * 60 * 60 * 1000 * 5).toISOString(),
          reviews: [{ date: new Date().toISOString(), rating: 5 }],
          halt: { hungry: false, angry: false, lonely: true, tired: false },
          forceUnlock: false
        }
      ];
      setItems(sampleItems);
    }

    if (savedSettings) {
       const parsed = JSON.parse(savedSettings);

       // Migration: String[] -> Object[]
       if (parsed.favoriteTopics && parsed.favoriteTopics.length > 0 && typeof parsed.favoriteTopics[0] === 'string') {
          parsed.favoriteTopics = parsed.favoriteTopics.map(t => ({ name: t, price: 5000 }));
       }

       if (parsed.favoriteTopics === undefined) parsed.favoriteTopics = [
           { name: "美味しいランチ", price: 1500 },
           { name: "温泉旅行", price: 30000 }
       ];
       if (parsed.currencySymbol === undefined) parsed.currencySymbol = "¥";
       if (parsed.monthlyBudget === undefined) parsed.monthlyBudget = 50000;
       if (parsed.geminiApiKey === undefined) parsed.geminiApiKey = "";
       if (parsed.experienceUnit === undefined) parsed.experienceUnit = 5000;
       setSettings(parsed);
    }
    if (savedLang) setLang(savedLang);
  }, []);

  useEffect(() => {
    localStorage.setItem('monosashi_items', JSON.stringify(items));
    localStorage.setItem('monosashi_settings', JSON.stringify(settings));
    localStorage.setItem('monosashi_lang', lang);
  }, [items, settings, lang]);

  const toggleLang = () => {
    setLang(l => l === 'ja' ? 'en' : 'ja');
  };

  const handleAddItem = () => {
    const priceNum = parseInt(newItem.price) || 0;
    const duration = newItem.duration || 30;
    const item = {
      id: Date.now().toString(),
      ...newItem,
      price: priceNum,
      duration: duration,
      dateAdded: new Date().toISOString(),
      unlockDate: new Date(Date.now() + duration * 24 * 60 * 60 * 1000).toISOString(),
      status: 'waiting',
      satisfaction: null,
      reviews: [],
      reviewDate: null,
      boughtDate: null,
    };
    setItems([item, ...items]);
    setNewItem({ name: '', price: '', url: '', duration: 30, halt: { hungry: false, angry: false, lonely: false, tired: false } });
    setView('dashboard');
  };

  const handleStatusChange = (id, newStatus) => {
    const now = new Date().toISOString();
    const updatedItems = items.map(i => i.id === id ? {
      ...i,
      status: newStatus,
      reviewDate: now,
      boughtDate: newStatus === 'bought' ? now : null
    } : i);
    setItems(updatedItems);

    if (selectedItem && selectedItem.id === id) {
      setSelectedItem({ ...selectedItem, status: newStatus });
    }

    if (newStatus === 'bought' || newStatus === 'rejected') {
      setView('history');
    }
  };

  const handleAddReview = (id, rating) => {
    if (rating >= 1 && rating <= 5) {
      setItems(items.map(i => {
         if (i.id !== id) return i;
         const newReviews = i.reviews ? [...i.reviews] : [];
         newReviews.push({
           date: new Date().toISOString(),
           rating: rating
         });
         newReviews.sort((a,b) => new Date(b.date) - new Date(a.date));
         return { ...i, reviews: newReviews };
      }));
    }
  };

  const handleSelectItem = (item) => {
    setSelectedItem(item);
    setView('item-detail');
  };

  const handleDebugUnlock = () => {
    const t = translations[lang] || translations['ja'];
    // Removed confirm/alert to ensure execution in all environments
    console.log("Debug: Attempting to unlock items");
    console.log("Current items:", items);

    const pastDate = new Date('2000-01-01T00:00:00Z').toISOString();

    const updatedItems = items.map(item =>
      item.status === 'waiting' ? { ...item, unlockDate: pastDate } : item
    );

    console.log("Updated items:", updatedItems);

    setItems(updatedItems);
    localStorage.setItem('monosashi_items', JSON.stringify(updatedItems));

    setView('dashboard');
  };

  const t = translations[lang] || translations['ja'];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      {view === 'dashboard' && (
        <DashboardView
          items={items}
          onSelectItem={handleSelectItem}
          onViewChange={setView}
          toggleLang={toggleLang}
          lang={lang}
          t={t}
          settings={settings}
          view={view}
        />
      )}
      {view === 'add' && (
        <AddItemView
          newItem={newItem}
          setNewItem={setNewItem}
          onAdd={handleAddItem}
          onCancel={() => setView('dashboard')}
          settings={settings}
          lang={lang}
          t={t}
        />
      )}
      {view === 'item-detail' && (
        <ItemDetailView
          item={selectedItem}
          settings={settings}
          onBack={() => setView('dashboard')}
          onStatusChange={handleStatusChange}
          lang={lang}
          t={t}
        />
      )}
      {view === 'history' && (
        <HistoryView
          items={items}
          onAddReview={handleAddReview}
          onViewChange={setView}
          lang={lang}
          t={t}
          settings={settings}
          view={view}
        />
      )}
      {view === 'settings' && (
        <SettingsView
          settings={settings}
          setSettings={setSettings}
          onBack={() => setView('dashboard')}
          t={t}
          items={items}
          setItems={setItems}
          onViewChange={setView}
          onDebugUnlock={handleDebugUnlock}
        />
      )}
    </div>
  );
}
