import { motion } from "framer-motion";
import { Shield, Lock, Heart, Eye } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Built for Families",
    description: "Designed with real households in mind. Simple enough for everyone.",
  },
  {
    icon: Lock,
    title: "Privacy First",
    description: "Your data stays yours. Encrypted and never shared with third parties.",
  },
  {
    icon: Eye,
    title: "No Ads, Ever",
    description: "We don't sell your data or show you ads. Your trust is our business.",
  },
  {
    icon: Heart,
    title: "Reduce Anxiety",
    description: "Clear insights without overwhelming complexity. Money made calm.",
  },
];

export const TrustSection = () => {
  return (
    <section className="py-24">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4">
            Why Families Trust Us
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            We built this for our own families first. Now we're sharing it with yours.
          </p>
        </motion.div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-card border border-border rounded-2xl p-6 h-full hover:border-primary/20 hover:shadow-card-hover transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
