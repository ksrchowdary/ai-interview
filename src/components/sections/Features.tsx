import { 
  Brain, 
  MessageSquareText, 
  LineChart, 
  Clock,
  Shield,
  Zap
} from 'lucide-react';

const features = [
  {
    title: "AI-Powered Interviews",
    description: "Practice with our advanced AI that adapts to your responses and provides real-time feedback.",
    icon: Brain
  },
  {
    title: "Instant Feedback",
    description: "Get detailed analysis of your answers, body language, and speaking patterns after each session.",
    icon: MessageSquareText
  },
  {
    title: "Performance Tracking",
    description: "Monitor your progress over time with detailed analytics and improvement suggestions.",
    icon: LineChart
  },
  {
    title: "24/7 Availability",
    description: "Practice whenever you want, as many times as you need, from anywhere in the world.",
    icon: Clock
  },
  {
    title: "Industry-Specific Questions",
    description: "Access a vast database of real interview questions tailored to your field.",
    icon: Shield
  },
  {
    title: "Quick Sessions",
    description: "Complete focused practice sessions in as little as 15 minutes.",
    icon: Zap
  }
];

export function Features() {
  return (
    <section id="features" className="py-24 bg-muted/50">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Everything you need to ace your interviews
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our comprehensive platform provides all the tools and features you need to prepare
            for your next interview with confidence.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div key={feature.title} className="bg-background p-6 rounded-lg border">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}