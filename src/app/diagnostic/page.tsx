"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Trees, ShieldAlert, Award, Compass, RefreshCw, BarChart, ArrowRight, BookOpen } from "lucide-react";

interface Question {
  id: string;
  capitol_id: string;
  tip: string;
  enunt: string;
  optiuni_json: string[];
  raspuns_corect: string;
  explicatie: string;
  dificultate: string;
}

interface Chapter {
  id: string;
  titlu: string;
}

export default function DiagnosticPage() {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<{ [qId: string]: string }>({});
  const [savingAttempt, setSavingAttempt] = useState(false);
  const [testComplete, setTestComplete] = useState(false);

  // Load Auth, Chapters, and Questions
  useEffect(() => {
    async function loadTestData() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }
      setUserId(user.id);

      // Fetch Chapters
      const { data: capData } = await supabase.from("capitole").select("*");
      if (capData) setChapters(capData);

      // Fetch Questions
      const { data: qData } = await supabase.from("intrebari").select("*");
      if (qData && qData.length > 0) {
        setQuestions(qData);
        // Shuffle the questions randomly
        const shuffled = [...qData].sort(() => Math.random() - 0.5);
        setShuffledQuestions(shuffled);
      }
    }
    loadTestData();
  }, [router]);

  const handleSelectAnswer = async (selectedOption: string) => {
    if (!userId || savingAttempt || testComplete) return;

    const currentQuestion = shuffledQuestions[currentIndex];
    const isCorrect = selectedOption === currentQuestion.raspuns_corect;

    // Record response locally in state
    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: selectedOption,
    }));

    setSavingAttempt(true);

    try {
      // Save attempt to Supabase / Local Mock database
      await supabase.from("incercari").insert([
        {
          user_id: userId,
          intrebare_id: currentQuestion.id,
          raspuns_dat: selectedOption,
          corect: isCorrect,
          context: "diagnostic",
        },
      ]);
    } catch (err) {
      console.error("Eroare la salvarea încercării:", err);
    }

    setSavingAttempt(false);

    // Proceed to next or complete
    if (currentIndex + 1 < shuffledQuestions.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setTestComplete(true);
    }
  };

  // Score calculations
  const getChapterPerformance = () => {
    const results: { 
      [chapterId: string]: { 
        title: string; 
        total: number; 
        correct: number; 
        percent: number; 
        status: "green" | "yellow" | "red" 
      } 
    } = {};

    // Initialize map
    chapters.forEach((cap) => {
      results[cap.id] = { title: cap.titlu, total: 0, correct: 0, percent: 0, status: "red" };
    });

    // Populate counts
    shuffledQuestions.forEach((q) => {
      const selected = userAnswers[q.id];
      if (selected && results[q.capitol_id]) {
        results[q.capitol_id].total += 1;
        if (selected === q.raspuns_corect) {
          results[q.capitol_id].correct += 1;
        }
      }
    });

    // Calculate percentages
    Object.keys(results).forEach((id) => {
      const cap = results[id];
      if (cap.total > 0) {
        cap.percent = Math.round((cap.correct / cap.total) * 100);
      } else {
        cap.percent = 0;
      }

      if (cap.percent > 80) {
        cap.status = "green";
      } else if (cap.percent >= 50) {
        cap.status = "yellow";
      } else {
        cap.status = "red";
      }
    });

    return results;
  };

  const getOverallPerformance = () => {
    let totalQuestions = shuffledQuestions.length;
    let totalCorrect = 0;
    
    shuffledQuestions.forEach((q) => {
      if (userAnswers[q.id] === q.raspuns_corect) {
        totalCorrect += 1;
      }
    });

    const percent = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;
    return { totalQuestions, totalCorrect, percent };
  };

  if (shuffledQuestions.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#0B0F19]">
        <RefreshCw className="h-8 w-8 animate-spin text-blue-500 mb-2" />
        <p className="text-sm text-gray-400">Se încarcă testul diagnostic...</p>
      </div>
    );
  }

  const overall = getOverallPerformance();
  const currentQuestion = shuffledQuestions[currentIndex];

  // Motivational Messages based on score
  const getMotivationalMessage = (percent: number) => {
    if (percent >= 80) {
      return {
        title: "Excelent! Ai o bază extrem de solidă.",
        desc: "Stăpânești foarte bine materia. Planul tău personalizat se va concentra pe consolidare, detalii de finețe și simulări de nota 10.",
      };
    } else if (percent >= 50) {
      return {
        title: "Bun! Ai cunoștințe de bază, dar există goluri importante.",
        desc: "Progresul tău este promițător. Planul tău zilnic va prioritiza capitolele marcate cu galben și roșu pentru a-ți asigura o medie mare la examen.",
      };
    } else {
      return {
        title: "Niciun motiv de îngrijorare! Ești exact unde trebuie să fii.",
        desc: "Testul diagnostic ne arată exact de unde trebuie să începem. Cu lecții structurate zilnic și exersarea greșelilor, vei crește rapid punctajul.",
      };
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-[#F3F4F6] py-10 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        
        {/* State 1: Running the quiz */}
        {!testComplete ? (
          <div>
            {/* Header / Track info */}
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs uppercase font-extrabold tracking-wider text-blue-500 flex items-center gap-1.5">
                <Compass className="h-4 w-4" /> Test Diagnostic: Biologie B2
              </span>
              <span className="text-xs text-gray-400 font-semibold">
                Întrebarea {currentIndex + 1} din {shuffledQuestions.length}
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-[#161D30] rounded-full h-2.5 mb-8 overflow-hidden border border-[#2B354F]/60">
              <div 
                className="bg-blue-500 h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / shuffledQuestions.length) * 100}%` }}
              ></div>
            </div>

            {/* Quiz Box */}
            <div className="bg-[#161D30] border border-[#2B354F] rounded-3xl p-6 sm:p-8 shadow-xl">
              
              <div className="mb-2">
                <span className="text-[10px] bg-blue-900/30 text-blue-400 border border-blue-800/40 px-2 py-0.5 rounded-md font-bold uppercase">
                  Capitolul: {chapters.find(c => c.id === currentQuestion.capitol_id)?.titlu || "Biologie"}
                </span>
              </div>

              <h2 className="text-lg sm:text-xl font-bold text-white mb-8 leading-snug">
                {currentQuestion.enunt}
              </h2>

              {/* Answers Grid */}
              <div className="grid grid-cols-1 gap-3">
                {currentQuestion.optiuni_json.map((option, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectAnswer(option)}
                    className="w-full p-4 rounded-2xl border border-[#2B354F] bg-[#0B0F19] text-left hover:border-blue-500 hover:bg-blue-950/15 transition-all text-sm font-medium text-white flex items-center justify-between group active:scale-[0.99]"
                  >
                    <span>{option}</span>
                    <span className="h-5 w-5 rounded-full border border-gray-600 group-hover:border-blue-500 flex items-center justify-center text-[10px] text-gray-400 group-hover:text-blue-500 font-bold shrink-0 ml-2">
                      {String.fromCharCode(65 + idx)}
                    </span>
                  </button>
                ))}
              </div>

            </div>
          </div>
        ) : (
          /* State 2: Results Display */
          <div className="animate-in fade-in zoom-in-95 duration-200">
            
            {/* Success Shield Badge */}
            <div className="text-center mb-8">
              <div className="inline-flex bg-blue-600/10 text-blue-500 p-4 rounded-full mb-3">
                <Award className="h-10 w-10" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Test Diagnostic Finalizat!</h1>
              <p className="text-sm text-gray-400 mt-1">Am calculat profilul tău de cunoștințe pe capitole</p>
            </div>

            {/* Overall Score Badge */}
            <div className="bg-[#161D30] border border-[#2B354F] rounded-3xl p-6 mb-6 text-center shadow-md">
              <span className="text-xs uppercase tracking-wider text-gray-400 font-bold">Punctaj General</span>
              <div className="text-4xl sm:text-5xl font-extrabold text-white mt-2 mb-1">
                {overall.percent}%
              </div>
              <p className="text-xs text-gray-400">
                Ai răspuns corect la {overall.totalCorrect} din {overall.totalQuestions} întrebări.
              </p>
            </div>

            {/* Curricular Chapters Performance Map */}
            <div className="mb-8">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4 flex items-center gap-1.5">
                <BarChart className="h-4 w-4 text-blue-500" /> Harta nivelului tău de pregătire
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {Object.keys(getChapterPerformance()).map((capId) => {
                  const cap = getChapterPerformance()[capId];
                  
                  // Color configuration based on performance status
                  const getStatusClasses = (status: "green" | "yellow" | "red") => {
                    switch (status) {
                      case "green":
                        return {
                          bg: "bg-emerald-950/20 border-emerald-500/30",
                          text: "text-emerald-400",
                          badge: "bg-emerald-500/20 text-emerald-300",
                          label: "Master",
                        };
                      case "yellow":
                        return {
                          bg: "bg-amber-950/20 border-amber-500/30",
                          text: "text-amber-400",
                          badge: "bg-amber-500/20 text-amber-300",
                          label: "Mediu",
                        };
                      default:
                        return {
                          bg: "bg-red-950/20 border-red-500/30",
                          text: "text-red-400",
                          badge: "bg-red-500/20 text-red-300",
                          label: "De exersat",
                        };
                    }
                  };

                  const currentStatus = getStatusClasses(cap.status);

                  return (
                    <div 
                      key={capId} 
                      className={`p-5 rounded-2xl border flex flex-col justify-between h-40 ${currentStatus.bg}`}
                    >
                      <div>
                        <span className={`text-[9px] font-extrabold tracking-wider uppercase px-2 py-0.5 rounded-md ${currentStatus.badge}`}>
                          {currentStatus.label}
                        </span>
                        <h4 className="font-bold text-white text-sm mt-3 line-clamp-2 leading-snug">
                          {cap.title}
                        </h4>
                      </div>

                      <div className="flex items-end justify-between mt-4">
                        <span className="text-[10px] text-gray-400">Scor:</span>
                        <span className={`text-xl font-extrabold ${currentStatus.text}`}>
                          {cap.percent}%
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Motivational Panel */}
            <div className="bg-blue-950/15 border border-blue-500/20 rounded-3xl p-6 mb-8">
              <h3 className="font-bold text-white text-base">
                {getMotivationalMessage(overall.percent).title}
              </h3>
              <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                {getMotivationalMessage(overall.percent).desc}
              </p>
            </div>

            {/* CTA action */}
            <button
              onClick={() => router.push("/dashboard")}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl text-sm font-semibold shadow-md flex items-center justify-center gap-2 transition-all active:scale-[0.99]"
            >
              <span>Vezi planul tău personalizat</span>
              <ArrowRight className="h-4.5 w-4.5" />
            </button>

          </div>
        )}

      </div>
    </div>
  );
}
