import { Topbar } from '@/components/layout/Topbar';
import { Footer } from '@/components/layout/Footer';

export function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Topbar />
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
          
          <div className="prose prose-neutral dark:prose-invert">
            <p className="text-lg text-muted-foreground mb-6">
              Last updated: January 1, 2024
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
              <p>
                By accessing or using InterviewAI, you agree to be bound by these Terms of 
                Service and all applicable laws and regulations.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">2. User Accounts</h2>
              <p>
                You are responsible for:
              </p>
              <ul className="list-disc pl-6 mt-2">
                <li>Maintaining the confidentiality of your account</li>
                <li>All activities that occur under your account</li>
                <li>Notifying us of any unauthorized use</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">3. Service Usage</h2>
              <p>
                You agree not to:
              </p>
              <ul className="list-disc pl-6 mt-2">
                <li>Use the service for any illegal purpose</li>
                <li>Share account access with others</li>
                <li>Attempt to bypass any security measures</li>
                <li>Upload malicious content or code</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">4. Payments and Refunds</h2>
              <p>
                All purchases are final. Refunds may be issued at our discretion for:
              </p>
              <ul className="list-disc pl-6 mt-2">
                <li>Technical issues preventing service use</li>
                <li>Billing errors</li>
                <li>Other exceptional circumstances</li>
              </ul>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}