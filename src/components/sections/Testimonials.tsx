import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Software Engineer",
    company: "Google",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    content: "InterviewAI helped me prepare for my technical interviews with confidence. The AI feedback was incredibly helpful!"
  },
  {
    name: "Michael Rodriguez",
    role: "Product Manager",
    company: "Microsoft",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
    content: "The practice interviews felt so real. I was well-prepared for my actual interviews thanks to this platform."
  },
  {
    name: "Emily Watson",
    role: "UX Designer",
    company: "Apple",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
    content: "The detailed feedback helped me improve my communication skills significantly. Highly recommended!"
  }
];

export function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-muted/50">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            What our users say
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of professionals who have improved their interview skills with our platform
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.name}>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={testimonial.image} alt={testimonial.name} />
                    <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.role} at {testimonial.company}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{testimonial.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}