import { Topbar } from '@/components/layout/Topbar';
import { Footer } from '@/components/layout/Footer';

export function CookiesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Topbar />
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Cookie Policy</h1>
          
          <div className="prose prose-neutral dark:prose-invert">
            <p className="text-lg text-muted-foreground mb-6">
              Last updated: January 1, 2024
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">1. What Are Cookies</h2>
              <p>
                Cookies are small text files that are stored on your computer or mobile device 
                when you visit our website. They help us provide you with a better experience 
                by remembering your preferences and analyzing how you use our service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">2. Types of Cookies We Use</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold">Essential Cookies</h3>
                  <p>Required for the website to function properly. These cannot be disabled.</p>
                </div>
                
                <div>
                  <h3 className="font-semibold">Performance Cookies</h3>
                  <p>Help us understand how visitors interact with our website.</p>
                </div>
                
                <div>
                  <h3 className="font-semibold">Functionality Cookies</h3>
                  <p>Remember your preferences and personalize your experience.</p>
                </div>
                
                <div>
                  <h3 className="font-semibold">Marketing Cookies</h3>
                  <p>Used to deliver relevant advertisements and track their effectiveness.</p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">3. Managing Cookies</h2>
              <p>
                You can control and/or delete cookies as you wish. You can delete all cookies 
                that are already on your computer and you can set most browsers to prevent 
                them from being placed.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">4. Third-Party Cookies</h2>
              <p>
                We use third-party services that may also set cookies on your device. We do 
                not have control over these cookies. Please refer to the respective privacy 
                policies of these third parties for more information.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}