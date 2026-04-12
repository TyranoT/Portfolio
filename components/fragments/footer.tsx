import { FiGithub, FiLinkedin, FiInstagram } from "react-icons/fi";
import { GITHUB_URL, INSTAGRAM_URL, LINKEDIN_URL } from "@/lib/social-links";

const LINKS = [
  { Icon: FiGithub, url: GITHUB_URL, label: "GitHub" },
  { Icon: FiLinkedin, url: LINKEDIN_URL, label: "LinkedIn" },
  { Icon: FiInstagram, url: INSTAGRAM_URL, label: "Instagram" },
];

export default function Footer() {
  return (
    <footer className="w-full py-8 px-6 bg-night-deep border-t border-foreground/5">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-foreground/30 text-sm">
          &copy; {new Date().getFullYear()} Italo Monteiro. Feito com Next.js
        </p>

        <div className="flex items-center gap-4">
          {LINKS.map(({ Icon, url, label }) => (
            <a
              key={label}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-foreground/30 hover:text-kiwi transition-colors"
            >
              <Icon className="w-4 h-4" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
