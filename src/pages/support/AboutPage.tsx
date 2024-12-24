import { Topbar } from '@/components/layout/Topbar';
import { Footer } from '@/components/layout/Footer';

export function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Topbar />
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">About InterviewAI</h1>
          
          <div className="prose prose-neutral dark:prose-invert">
            <p className="text-lg text-muted-foreground mb-6">
              InterviewAI is revolutionizing the way people prepare for job interviews through 
              AI-powered practice sessions and personalized feedback.
            </p>

            <h2 className="text-2xl font-semibold mt-12 mb-4">Our Mission</h2>
            <p>
              We believe everyone deserves the opportunity to present their best selves during 
              job interviews. Our mission is to make expert interview preparation accessible 
              to all through innovative AI technology.
            </p>

            <h2 className="text-2xl font-semibold mt-12 mb-4">Our Story</h2>
            <p>
              Founded in 2023, InterviewAI was born from a simple observation: traditional 
              interview preparation methods weren't meeting the needs of modern job seekers. 
              We set out to create a platform that combines the flexibility of self-paced 
              learning with the effectiveness of personalized coaching.
            </p>

            <h2 className="text-2xl font-semibold mt-12 mb-4">Our Technology</h2>
            <p>
              Powered by advanced AI models, our platform provides realistic interview 
              scenarios and instant, actionable feedback. We continuously improve our 
              technology to ensure the most effective preparation experience possible.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}