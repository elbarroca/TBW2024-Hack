import { Github, Globe, LucideIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

interface SocialLink {
  icon: LucideIcon | (() => JSX.Element);
  href: string;
  label: string;
}

const XIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const Footer = () => {
  const socialLinks: SocialLink[] = [
    { icon: Github, href: "https://github.com", label: "GitHub" },
    { icon: XIcon, href: "https://x.com", label: "X (Twitter)" },
    { icon: Globe, href: "https://mentora.com", label: "Website" },
  ]

  const navigationLinks = [
    { href: "/", label: "Home" },
    { href: "/courses", label: "Courses" },
    { href: "/content", label: "Content" },
    { href: "/about", label: "About" },
  ]

  return (
    <footer className="bg-background border-t">
      <div className="container px-4 py-8 mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Branding Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img 
                src="/logo.svg" 
                alt="Mentora" 
                className="h-20 w-auto"
              />
            </div>
            <p className="text-sm text-muted-foreground">
              Empowering communities through Web3 education and innovative technology.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <nav className="space-y-2">
              {navigationLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <span>contact@mentora.com</span>
              </div>
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <Button
                    key={social.label}
                    variant="ghost"
                    size="icon"
                    className="hover:text-primary"
                    asChild
                  >
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visit our ${social.label} page`}
                    >
                      {typeof social.icon === 'function' ? (
                        <social.icon />
                      ) : (
                        <social.icon className="h-5 w-5" />
                      )}
                    </a>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Mentora. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer