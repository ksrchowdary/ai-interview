import { Topbar } from '@/components/layout/Topbar';
import { Footer } from '@/components/layout/Footer';

export function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Topbar />
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
          
          <div className="prose prose-neutral dark:prose-invert">
            <p className="text-lg text-muted-foreground mb-6">
              Last updated: January 1, 2024
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
              <p>
                We collect information you provide directly to us, including:
              </p>
              <ul className="list-disc pl-6 mt-2">
                <li>Account information (name, email, password)</li>
                <li>Profile information (resume, skills, job preferences)</li>
                <li>Interview recordings and transcripts</li>
                <li>Payment information</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
              <p>
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-6 mt-2">
                <li>Provide and improve our services</li>
                <li>Personalize your experience</li>
                <li>Process payments</li>
                <li>Send you updates and marketing communications</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">3. Data Security</h2>
              <p>
                We implement appropriate security measures to protect your personal information.
                This includes encryption, secure servers, and regular security audits.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">4. Your Rights</h2>
              <p>
                You have the right to:
              </p>
              <ul className="list-disc pl-6 mt-2">
                <li>Access your personal information</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Object to data processing</li>
              </ul>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}