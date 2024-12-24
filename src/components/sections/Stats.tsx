const stats = [
  { label: "Active Users", value: "20K+" },
  { label: "Interviews Conducted", value: "100K+" },
  { label: "Success Rate", value: "89%" },
  { label: "Companies Hired From", value: "500+" }
];

export function Stats() {
  return (
    <section className="py-16 bg-primary">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary-foreground mb-2">
                {stat.value}
              </div>
              <div className="text-primary-foreground/80 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}