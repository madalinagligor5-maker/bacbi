import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const isMocked = !supabaseUrl || !supabaseAnonKey;

// Mock Seed Data
const seedChapters = [
  { id: "00000000-0000-0000-0000-000000000101", traseu_id: "00000000-0000-0000-0000-000000000001", titlu: "Sistemul nervos", ordine: 1, dificultate: "Mediu" },
  { id: "00000000-0000-0000-0000-000000000102", traseu_id: "00000000-0000-0000-0000-000000000001", titlu: "Sistemul circulator", ordine: 2, dificultate: "Mediu" },
  { id: "00000000-0000-0000-0000-000000000103", traseu_id: "00000000-0000-0000-0000-000000000001", titlu: "Genetică - noțiuni de bază", ordine: 3, dificultate: "Dificil" }
];

const seedQuestions = [
  // Chapter 1: Nervos
  {
    id: "00000000-0000-0000-0000-000000001011",
    capitol_id: "00000000-0000-0000-0000-000000000101",
    tip: "grila",
    enunt: "Care este unitatea structurală și funcțională a sistemului nervos?",
    optiuni_json: ["Nefronul", "Neuronul", "Sinapsa", "Glila"],
    raspuns_corect: "Neuronul",
    explicatie: "Neuronul este celula nervoasă responsabilă de transmiterea influxului nervos.",
    dificultate: "Ușor"
  },
  {
    id: "00000000-0000-0000-0000-000000001012",
    capitol_id: "00000000-0000-0000-0000-000000000101",
    tip: "grila",
    enunt: "Ce structură asigură legătura funcțională dintre doi neuroni?",
    optiuni_json: ["Dendrita", "Axonul", "Sinapsa", "Mielina"],
    raspuns_corect: "Sinapsa",
    explicatie: "Sinapsa este zona de contact funcțional ce permite transmiterea semnalului chimic sau electric.",
    dificultate: "Ușor"
  },
  {
    id: "00000000-0000-0000-0000-000000001013",
    capitol_id: "00000000-0000-0000-0000-000000000101",
    tip: "grila",
    enunt: "Meningele spinal este alcătuit din câte membrane protectoare?",
    optiuni_json: ["Una", "Două", "Trei", "Patru"],
    raspuns_corect: "Trei",
    explicatie: "Membranele sunt dura mater, arahnoida și pia mater.",
    dificultate: "Mediu"
  },
  {
    id: "00000000-0000-0000-0000-000000001014",
    capitol_id: "00000000-0000-0000-0000-000000000101",
    tip: "grila",
    enunt: "Unde se află centrii nervoși ai reflexelor respiratorii și cardiovasculare?",
    optiuni_json: ["În cerebel", "În bulbul rahidian", "În măduva spinării", "În scoarța cerebrală"],
    raspuns_corect: "În bulbul rahidian",
    explicatie: "Bulbul rahidian controlează funcțiile vitale reflexe involuntare.",
    dificultate: "Mediu"
  },
  {
    id: "00000000-0000-0000-0000-000000001015",
    capitol_id: "00000000-0000-0000-0000-000000000101",
    tip: "grila",
    enunt: "Care dintre următoarele este un reflex necondiționat (înnăscut)?",
    optiuni_json: ["Scrierea", "Mersul pe bicicletă", "Salivația la vederea lămâii", "Reflexul rotulian"],
    raspuns_corect: "Reflexul rotulian",
    explicatie: "Reflexul rotulian este un reflex osteotendinos simplu, involuntar și înnăscut.",
    dificultate: "Ușor"
  },
  {
    id: "00000000-0000-0000-0000-000000001016",
    capitol_id: "00000000-0000-0000-0000-000000000101",
    tip: "grila",
    enunt: "Sistemul nervos parasimpatic este responsabil pentru:",
    optiuni_json: ["Reacția de fugă sau luptă", "Starea de repaus și digestie", "Coordonarea motorie fină", "Sensibilitatea tactilă"],
    raspuns_corect: "Starea de repaus și digestie",
    explicatie: "Sistemul parasimpatic conservă energia și susține procesele metabolice bazale.",
    dificultate: "Mediu"
  },
  {
    id: "00000000-0000-0000-0000-000000001017",
    capitol_id: "00000000-0000-0000-0000-000000000101",
    tip: "grila",
    enunt: "Cerebelul (creierul mic) are ca principală funcție:",
    optiuni_json: ["Gândirea logică", "Coordonarea mișcărilor și echilibrul", "Termoreglarea", "Secretarea hormonilor"],
    raspuns_corect: "Coordonarea mișcărilor și echilibrul",
    explicatie: "Cerebelul ajustează tonusul muscular și asigură precizia mișcărilor.",
    dificultate: "Ușor"
  },
  {
    id: "00000000-0000-0000-0000-000000001018",
    capitol_id: "00000000-0000-0000-0000-000000000101",
    tip: "grila",
    enunt: "Lichidul cefalorahidian (LCR) circulă în spațiul:",
    optiuni_json: ["Subdural", "Epidural", "Subarahnoidian", "Intracelular"],
    raspuns_corect: "Subarahnoidian",
    explicatie: "LCR circulă în spațiul subarahnoidian dintre arahnoidă și pia mater.",
    dificultate: "Dificil"
  },

  // Chapter 2: Circulator
  {
    id: "00000000-0000-0000-0000-000000001021",
    capitol_id: "00000000-0000-0000-0000-000000000102",
    tip: "grila",
    enunt: "Inima omului are un număr de:",
    optiuni_json: ["Două camere", "Trei camere", "Patru camere", "Cinci camere"],
    raspuns_corect: "Patru camere",
    explicatie: "Inima este complet septată în două atrii și două ventricule.",
    dificultate: "Ușor"
  },
  {
    id: "00000000-0000-0000-0000-000000001022",
    capitol_id: "00000000-0000-0000-0000-000000000102",
    tip: "grila",
    enunt: "Vasele care transportă sângele de la inimă spre țesuturi se numesc:",
    optiuni_json: ["Vene", "Capilare", "Artere", "Limfatice"],
    raspuns_corect: "Artere",
    explicatie: "Arterele pleacă din ventricule și duc sângele oxigenat sau neoxigenat în corp.",
    dificultate: "Ușor"
  },
  {
    id: "00000000-0000-0000-0000-000000001023",
    capitol_id: "00000000-0000-0000-0000-000000000102",
    tip: "grila",
    enunt: "Circulația mică (pulmonară) începe în:",
    optiuni_json: ["Ventriculul stâng", "Atriul stâng", "Ventriculul drept", "Atriul drept"],
    raspuns_corect: "Ventriculul drept",
    explicatie: "Circulația mică începe în ventriculul drept prin trunchiul pulmonar.",
    dificultate: "Mediu"
  },
  {
    id: "00000000-0000-0000-0000-000000001024",
    capitol_id: "00000000-0000-0000-0000-000000000102",
    tip: "grila",
    enunt: "Ce tip de sânge circulă prin venele pulmonare?",
    optiuni_json: ["Sânge neoxigenat", "Sânge oxigenat", "Limfă", "Sânge mixt"],
    raspuns_corect: "Sânge oxigenat",
    explicatie: "Venele pulmonare aduc sânge oxigenat de la plămâni în atriul stâng.",
    dificultate: "Mediu"
  },
  {
    id: "00000000-0000-0000-0000-000000001025",
    capitol_id: "00000000-0000-0000-0000-000000000102",
    tip: "grila",
    enunt: "Valvula bicuspidă (mitrală) se află între:",
    optiuni_json: ["Atriul drept și ventriculul drept", "Atriul stâng și ventriculul stâng", "Ventriculul stâng și aortă", "Atriul stâng și atriul drept"],
    raspuns_corect: "Atriul stâng și ventriculul stâng",
    explicatie: "Valvula mitrală separă atriul stâng de ventriculul stâng.",
    dificultate: "Mediu"
  },
  {
    id: "00000000-0000-0000-0000-000000001026",
    capitol_id: "00000000-0000-0000-0000-000000000102",
    tip: "grila",
    enunt: "Sistola reprezintă faza de:",
    optiuni_json: ["Relaxare a mușchiului cardiac", "Contractare a mușchiului cardiac", "Umplere a inimii", "Pauză generală"],
    raspuns_corect: "Contractare a mușchiului cardiac",
    explicatie: "Sistola reprezintă contracția miocardului ce evacuează sângele din camere.",
    dificultate: "Ușor"
  },
  {
    id: "00000000-0000-0000-0000-000000001027",
    capitol_id: "00000000-0000-0000-0000-000000000102",
    tip: "grila",
    enunt: "Care dintre următoarele celule sanguine sunt responsabile pentru coagularea sângelui?",
    optiuni_json: ["Hematiile", "Leucocitele", "Trombocitele", "Limfocitele"],
    raspuns_corect: "Trombocitele",
    explicatie: "Trombocitele participă activ la formarea cheagului de sânge (hemostază).",
    dificultate: "Ușor"
  },
  {
    id: "00000000-0000-0000-0000-000000001028",
    capitol_id: "00000000-0000-0000-0000-000000000102",
    tip: "grila",
    enunt: "Pacemakerul natural principal al inimii este:",
    optiuni_json: ["Nodulul atrioventricular", "Nodulul sinoatrial", "Fasciculul His", "Rețeaua Purkinje"],
    raspuns_corect: "Nodulul sinoatrial",
    explicatie: "Nodulul sinoatrial din atriul drept dictează ritmul cardiac sinusal normal.",
    dificultate: "Dificil"
  },

  // Chapter 3: Genetica
  {
    id: "00000000-0000-0000-0000-000000001031",
    capitol_id: "00000000-0000-0000-0000-000000000103",
    tip: "grila",
    enunt: "Care este macromocula responsabilă de stocarea informației genetice?",
    optiuni_json: ["ARN-ul mesager", "ADN-ul", "Proteina", "Lipida"],
    raspuns_corect: "ADN-ul",
    explicatie: "Acidul dezoxiribonucleic (ADN) conține instrucțiunile genetice ereditare.",
    dificultate: "Ușor"
  },
  {
    id: "00000000-0000-0000-0000-000000001032",
    capitol_id: "00000000-0000-0000-0000-000000000103",
    tip: "grila",
    enunt: "Câte legi ale eredității a formulat Gregor Mendel?",
    optiuni_json: ["Una", "Două", "Trei", "Patru"],
    raspuns_corect: "Două",
    explicatie: "Mendel a formulat Legea purității gameților și Legea segregării independente a perechilor de caractere.",
    dificultate: "Mediu"
  },
  {
    id: "00000000-0000-0000-0000-000000001033",
    capitol_id: "00000000-0000-0000-0000-000000000103",
    tip: "grila",
    enunt: "Procesul prin care se copiază informația din ADN în ARN se numește:",
    optiuni_json: ["Translație", "Replicare", "Transcripție", "Splicing"],
    raspuns_corect: "Transcripție",
    explicatie: "Transcripția reprezintă sinteza ARN-ului mesager pe matricea de ADN.",
    dificultate: "Mediu"
  },
  {
    id: "00000000-0000-0000-0000-000000001034",
    capitol_id: "00000000-0000-0000-0000-000000000103",
    tip: "grila",
    enunt: "Cum se numește o variantă alternativă a unei gene?",
    optiuni_json: ["Locus", "Genom", "Alelă", "Genotip"],
    raspuns_corect: "Alelă",
    explicatie: "Alelele determină variații diferite ale aceluiași caracter ereditar.",
    dificultate: "Ușor"
  },
  {
    id: "00000000-0000-0000-0000-000000001035",
    capitol_id: "00000000-0000-0000-0000-000000000103",
    tip: "grila",
    enunt: "Un organism heterozigot pentru o pereche de gene va fi notat ca:",
    optiuni_json: ["AA", "aa", "Aa", "AAb"],
    raspuns_corect: "Aa",
    explicatie: "Heterozigotul are două alele diferite (una dominantă și una recesivă).",
    dificultate: "Ușor"
  },
  {
    id: "00000000-0000-0000-0000-000000001036",
    capitol_id: "00000000-0000-0000-0000-000000000103",
    tip: "grila",
    enunt: "Ce bază azotată se găsește în ARN, dar nu și în ADN?",
    optiuni_json: ["Timiă", "Uracil", "Adenină", "Citozină"],
    raspuns_corect: "Uracil",
    explicatie: "Uracilul înlocuiește timina în structura acidului ribonucleic (ARN).",
    dificultate: "Ușor"
  },
  {
    id: "00000000-0000-0000-0000-000000001037",
    capitol_id: "00000000-0000-0000-0000-000000000103",
    tip: "grila",
    enunt: "Sindromul Down reprezintă o mutație de tip:",
    optiuni_json: ["Genică", "Trisomie autosomală (21)", "Monosomie", "Poloploidie"],
    raspuns_corect: "Trisomie autosomală (21)",
    explicatie: "Sindromul Down este caracterizat prin prezența unui cromozom 21 suplimentar.",
    dificultate: "Mediu"
  },
  {
    id: "00000000-0000-0000-0000-000000001038",
    capitol_id: "00000000-0000-0000-0000-000000000103",
    tip: "grila",
    enunt: "Codonul de start universal pentru traducerea proteinelor este:",
    optiuni_json: ["UAA", "AUG", "UGA", "UAG"],
    raspuns_corect: "AUG",
    explicatie: "AUG codifică metionina și servește drept semnal de start în translație.",
    dificultate: "Dificil"
  }
];

class MockSupabaseClient {
  private getStorageItem(key: string) {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(key);
  }

  private setStorageItem(key: string, value: string) {
    if (typeof window !== "undefined") {
      localStorage.setItem(key, value);
    }
  }

  private getProfiles(): any[] {
    const data = this.getStorageItem("mock_users_profiles");
    return data ? JSON.parse(data) : [];
  }

  private saveProfiles(profiles: any[]) {
    this.setStorageItem("mock_users_profiles", JSON.stringify(profiles));
  }

  private getLinks(): any[] {
    const data = this.getStorageItem("mock_links");
    return data ? JSON.parse(data) : [];
  }

  private saveLinks(links: any[]) {
    this.setStorageItem("mock_links", JSON.stringify(links));
  }

  private getAttempts(): any[] {
    const data = this.getStorageItem("mock_attempts");
    return data ? JSON.parse(data) : [];
  }

  private saveAttempts(attempts: any[]) {
    this.setStorageItem("mock_attempts", JSON.stringify(attempts));
  }

  auth = {
    signUp: async ({ email, password, options }: any) => {
      await new Promise((r) => setTimeout(r, 400));
      const profiles = this.getProfiles();
      const existing = profiles.find((p) => p.email === email);
      if (existing) {
        return { data: { user: null }, error: { message: "Utilizatorul există deja." } };
      }

      const userId = crypto.randomUUID ? crypto.randomUUID() : "user-" + Math.random().toString(36).substring(2, 9);
      const rol = options?.data?.rol || "elev";

      const newProfile = {
        id: userId,
        email,
        rol,
        traseu_activ_id: null,
        creat_la: new Date().toISOString(),
      };

      profiles.push(newProfile);
      this.saveProfiles(profiles);

      this.setStorageItem("mock_user_session", JSON.stringify(newProfile));
      return { data: { user: { id: userId, email } }, error: null };
    },

    signInWithPassword: async ({ email, password }: any) => {
      await new Promise((r) => setTimeout(r, 400));
      const profiles = this.getProfiles();
      const user = profiles.find((p) => p.email === email);
      if (!user) {
        return { data: { user: null }, error: { message: "Date de logare invalide." } };
      }
      this.setStorageItem("mock_user_session", JSON.stringify(user));
      return { data: { user: { id: user.id, email: user.email } }, error: null };
    },

    signOut: async () => {
      if (typeof window !== "undefined") {
        localStorage.removeItem("mock_user_session");
      }
      return { error: null };
    },

    getUser: async () => {
      const session = this.getStorageItem("mock_user_session");
      if (!session) return { data: { user: null }, error: null };
      const user = JSON.parse(session);
      return { data: { user: { id: user.id, email: user.email } }, error: null };
    },
  };

  from(table: string) {
    return {
      select: (columns: string = "*") => {
        return {
          single: async () => {
            if (table === "users") {
              const session = this.getStorageItem("mock_user_session");
              if (!session) return { data: null, error: { message: "Not logged in" } };
              const current = JSON.parse(session);
              const profiles = this.getProfiles();
              const fullProfile = profiles.find(p => p.id === current.id);
              return { data: fullProfile || current, error: null };
            }
            return { data: null, error: { message: "Not implemented" } };
          },
          eq: (field: string, value: any) => {
            return {
              single: async () => {
                if (table === "users" && field === "id") {
                  const profiles = this.getProfiles();
                  const profile = profiles.find((p) => p.id === value);
                  return { data: profile || null, error: profile ? null : { message: "User not found" } };
                }
                return { data: null, error: { message: "Not implemented" } };
              },
              // For fetching questions or chapters by track/chapter
              eq: (subField: string, subValue: any) => {
                return {
                  async: async () => {
                    return { data: [], error: null };
                  }
                };
              }
            };
          },
          // Generic query return for all items (Chapters, Questions)
          then: async (resolve: any) => {
            if (table === "capitole") {
              resolve({ data: seedChapters, error: null });
            } else if (table === "intrebari") {
              resolve({ data: seedQuestions, error: null });
            } else {
              resolve({ data: [], error: null });
            }
          }
        };
      },

      update: (updates: any) => {
        return {
          eq: (field: string, value: any) => {
            return {
              select: () => {
                return {
                  single: async () => {
                    if (table === "users" && field === "id") {
                      const profiles = this.getProfiles();
                      const index = profiles.findIndex((p) => p.id === value);
                      if (index !== -1) {
                        profiles[index] = { ...profiles[index], ...updates };
                        this.saveProfiles(profiles);
                        const session = this.getStorageItem("mock_user_session");
                        if (session) {
                          const current = JSON.parse(session);
                          if (current.id === value) {
                            this.setStorageItem("mock_user_session", JSON.stringify(profiles[index]));
                          }
                        }
                        return { data: profiles[index], error: null };
                      }
                    }
                    return { data: null, error: { message: "Update failed" } };
                  }
                };
              }
            };
          }
        };
      },

      insert: (rows: any[]) => {
        return {
          select: () => {
            return {
              single: async () => {
                if (table === "parinte_elev_link") {
                  const links = this.getLinks();
                  const newLink = {
                    id: crypto.randomUUID ? crypto.randomUUID() : "link-" + Math.random().toString(36).substring(2, 9),
                    ...rows[0]
                  };
                  links.push(newLink);
                  this.saveLinks(links);
                  return { data: newLink, error: null };
                }
                if (table === "incercari") {
                  const attempts = this.getAttempts();
                  const newAttempts = rows.map(r => ({
                    id: crypto.randomUUID ? crypto.randomUUID() : "att-" + Math.random().toString(36).substring(2, 9),
                    creat_la: new Date().toISOString(),
                    ...r
                  }));
                  attempts.push(...newAttempts);
                  this.saveAttempts(attempts);
                  return { data: newAttempts[0], error: null };
                }
                return { data: null, error: { message: "Not implemented" } };
              }
            };
          },
          // Standard insert without single returning, resolves instantly
          then: async (resolve: any) => {
            if (table === "incercari") {
              const attempts = this.getAttempts();
              const newAttempts = rows.map(r => ({
                id: crypto.randomUUID ? crypto.randomUUID() : "att-" + Math.random().toString(36).substring(2, 9),
                creat_la: new Date().toISOString(),
                ...r
              }));
              attempts.push(...newAttempts);
              this.saveAttempts(attempts);
              resolve({ data: newAttempts, error: null });
            } else {
              resolve({ data: [], error: null });
            }
          }
        };
      }
    };
  }
}

export const supabase = isMocked 
  ? (new MockSupabaseClient() as any) 
  : createClient(supabaseUrl, supabaseAnonKey);
