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
      setSession(data.session);
      await checkStaffStatus(data.session);
      setLoading(false);
    }

    async function checkStaffStatus(currentSession) {
      if (!currentSession?.user) {
        setIsStaff(false);
        return;
      }
      // Relies on the "staff can read own profile" RLS policy --
      // a non-staff authenticated user simply gets no row back here,
      // rather than an error, and is treated as not staff.
      const { data } = await supabase
        .from("staff_profiles")
        .select("id")
        .eq("id", currentSession.user.id)
        .maybeSingle();
      if (mounted) setIsStaff(!!data);
    }

    init();

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_event, newSession) => {
        setSession(newSession);
        await checkStaffStatus(newSession);
      }
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
