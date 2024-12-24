import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";

const plans = [
  {
    name: "Starter",
    credits: 10,
    price: 19,
    features: ["Basic interview scenarios", "Text feedback", "Performance tracking"]
  },
  {
    name: "Professional",
    credits: 25,
    price: 39,
    popular: true,
    features: ["Advanced scenarios", "Video feedback", "Custom questions", "Priority support"]
  },
  {
    name: "Enterprise",
    credits: 100,
    price: 99,
    features: ["All features", "Team management", "Custom integrations", "Dedicated support"]
  }
];

export function Credits() {
  return (
    <section id="pricing" className="py-24">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Recharge Your Interview Credits
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that best fits your interview preparation needs
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <Card key={plan.name} className={plan.popular ? "border-primary" : ""}>
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>{plan.credits} Interview Credits</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-6">${plan.price}</div>
                <ul className="space-y-2">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-2 text-primary"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" variant={plan.popular ? "default" : "outline"}>
                  Get Started
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}