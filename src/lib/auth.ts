import { supabase } from './supabase';
import { useStore } from '@/store';

export async function initAuth() {
  const { setUser } = useStore.getState();

  const { data: { session } } = await supabase.auth.getSession();
  
  if (session?.user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', session.user.id)
      .single();

    if (profile) {
      setUser(profile);
    }
  }

  supabase.auth.onAuthStateChange(async (event, session) => {
    if (event === 'SIGNED_OUT') {
      setUser(null);
      return;
    }

    if (session?.user) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();

      if (profile) {
        setUser(profile);
      }
    }
  });
}