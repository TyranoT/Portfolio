export const GITHUB_URL = "https://github.com/TyranoT";
export const LINKEDIN_URL =
  "https://www.linkedin.com/in/italo-monteiro-leite/";

export const INSTAGRAM_URL = "https://www.instagram.com/italo.ml04/";

const WHATSAPP_DEFAULT_MESSAGE =
  "Olá! Vi seu portfólio e gostaria de conversar.";
export const WHATSAPP_URL = `https://wa.me/5583998840478?text=${encodeURIComponent(
  WHATSAPP_DEFAULT_MESSAGE
)}`;

export const EMAIL = "italomleitez@gmail.com";
export const EMAIL_MAILTO = `mailto:${EMAIL}`;

export const SOCIAL = {
  github: GITHUB_URL,
  linkedin: LINKEDIN_URL,
  instagram: INSTAGRAM_URL,
  whatsapp: WHATSAPP_URL,
  email: EMAIL_MAILTO,
} as const;
