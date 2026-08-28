import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

// Exporting indicator for the client UI state
export const isMocked = !supabaseUrl || !supabaseAnonKey;

// Mock Client definition for testing offline/without credentials
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

  auth = {
    signUp: async ({ email, password, options }: any) => {
      // simulate delay
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

      // Save user session
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

  // Database operations
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
                if (table === "parinte_elev_link" && field === "cod_invitatie") {
                  const links = this.getLinks();
                  const link = links.find((l) => l.cod_invitatie === value);
                  return { data: link || null, error: link ? null : { message: "Invite link not found" } };
                }
                return { data: null, error: { message: "Not implemented" } };
              }
            };
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
                        // Also update current active session if it matches
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
                return { data: null, error: { message: "Not implemented" } };
              }
            };
          }
        };
      }
    };
  }
}

export const supabase = isMocked 
  ? (new MockSupabaseClient() as any) 
  : createClient(supabaseUrl, supabaseAnonKey);
