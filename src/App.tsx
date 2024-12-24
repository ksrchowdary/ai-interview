import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import { LandingPage } from '@/pages/Landing';
import { DashboardPage } from '@/pages/Dashboard';
import { InterviewsPage } from '@/pages/Interviews';
import { AnalyticsPage } from '@/pages/Analytics';
import { CreditsPage } from '@/pages/Credits';
import { NewInterviewPage } from '@/pages/NewInterview';
import { InterviewPage } from '@/pages/Interview';
import { ProfilePage } from '@/pages/Profile';
import { DocumentsPage } from '@/pages/Profile/Documents';
import { JobsPage } from '@/pages/Profile/Jobs';
import { SkillsPage } from '@/pages/Profile/Skills';
import { NotFoundPage } from '@/pages/NotFound';
import { AboutPage } from '@/pages/support/AboutPage';
import { ContactPage } from '@/pages/support/ContactPage';
import { PrivacyPage } from '@/pages/legal/PrivacyPage';
import { TermsPage } from '@/pages/legal/TermsPage';
import { CookiesPage } from '@/pages/legal/CookiesPage';
import { ROUTES } from '@/lib/routes';
import { useAuth } from '@/hooks/useAuth';

export default function App() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <Routes>
        <Route 
          path={ROUTES.HOME} 
          element={isAuthenticated ? <Navigate to={ROUTES.DASHBOARD} /> : <LandingPage />} 
        />
        <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />
        <Route path={ROUTES.INTERVIEWS} element={<InterviewsPage />} />
        <Route path={ROUTES.ANALYTICS} element={<AnalyticsPage />} />
        <Route path={ROUTES.CREDITS} element={<CreditsPage />} />
        <Route path={ROUTES.NEW_INTERVIEW} element={<NewInterviewPage />} />
        <Route path={ROUTES.INTERVIEW} element={<InterviewPage />} />
        <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
        <Route path={ROUTES.DOCUMENTS} element={<DocumentsPage />} />
        <Route path={ROUTES.JOB_DESCRIPTIONS} element={<JobsPage />} />
        <Route path={ROUTES.SKILLS} element={<SkillsPage />} />
        
        {/* Support Pages */}
        <Route path={ROUTES.ABOUT} element={<AboutPage />} />
        <Route path={ROUTES.CONTACT} element={<ContactPage />} />
        <Route path={ROUTES.PRIVACY} element={<PrivacyPage />} />
        <Route path={ROUTES.TERMS} element={<TermsPage />} />
        <Route path={ROUTES.COOKIES} element={<CookiesPage />} />
        
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Toaster />
    </>
  );
}