import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [isStaff, setIsStaff] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function init() {
      const { data } = await supabase.auth.getSession();
      if (!mounted) return;
      console.log("[AuthContext] Session on init:", {
        hasSession: !!data.session,
        userId: data.session?.user?.id,
        email: data.session?.user?.email,
      });
      setSession(data.session);
      await checkStaffStatus(data.session);
      setLoading(false);
    }

    async function checkStaffStatus(currentSession) {
      if (!currentSession?.user) {
        console.log("[AuthContext] No session/user, setting isStaff=false");
        setIsStaff(false);
        return;
      }
      console.log(
        "[AuthContext] Checking staff status for user:",
        currentSession.user.id,
      );
      // Relies on the "staff can read own profile" RLS policy --
      // a non-staff authenticated user simply gets no row back here,
      // rather than an error, and is treated as not staff.
      const { data, error } = await supabase
        .from("staff_profiles")
        .select("id")
        .eq("id", currentSession.user.id)
        .maybeSingle();
      console.log("[AuthContext] Staff check result:", { data, error });
      if (mounted) setIsStaff(!!data);
    }

    init();

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_event, newSession) => {
        setSession(newSession);
        await checkStaffStatus(newSession);
      },
    );

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  const signOut = () => supabase.auth.signOut();

  return (
    <AuthContext.Provider value={{ session, isStaff, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (ctx === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}
