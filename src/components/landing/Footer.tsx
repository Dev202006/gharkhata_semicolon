import { Wallet } from "lucide-react";

const footerLinks = [
  { label: "About", href: "#" },
  { label: "Privacy", href: "#" },
  { label: "Terms", href: "#" },
  { label: "Contact", href: "#" },
];

export const Footer = () => {
  return (
    <footer className="border-t border-border bg-muted/20 py-12">
      <div className="container px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg gradient-primary flex items-center justify-center">
              <Wallet className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-semibold text-foreground">FamilyFinance</span>
          </div>
          
          <nav className="flex items-center gap-6">
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
          
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} FamilyFinance. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
