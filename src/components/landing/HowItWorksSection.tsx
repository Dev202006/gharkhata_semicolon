import { motion } from "framer-motion";
import { Users, PlusCircle, TrendingUp } from "lucide-react";

const steps = [
  {
    icon: Users,
    title: "Create a Family",
    description: "Set up your household in seconds. Choose your currency and start fresh.",
  },
  {
    icon: PlusCircle,
    title: "Add Members & Expenses",
    description: "Invite family members and log income, expenses, and savings together.",
  },
  {
    icon: TrendingUp,
    title: "Plan, Save, Relax",
    description: "Watch your money flow clearly. Set goals and budgets that actually work.",
  },
];

export const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-24 bg-muted/30">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Getting started takes less than a minute. No complex setup, no learning curve.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative"
            >
              <div className="bg-card rounded-2xl p-8 shadow-card hover:shadow-card-hover transition-all duration-300 h-full">
                <div className="flex items-center justify-center w-14 h-14 rounded-xl gradient-primary mb-6">
                  <step.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                
                <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center text-sm font-semibold">
                  {index + 1}
                </div>
                
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
