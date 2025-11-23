export const SERVER_IP = "209.205.228.237";
export const SERVER_PORT = "3104";
export const FULL_IP = `${SERVER_IP}:${SERVER_PORT}`;

// Using a public CORS-friendly API for Minecraft server status
export const STATUS_API_URL = `https://api.mcsrvstat.us/3/${FULL_IP}`;

export const NAV_LINKS = [
  { name: 'Accueil', href: '#home' },
  { name: 'À propos', href: '#about' },
  { name: 'Règles', href: '#rules' },
  { name: 'Communauté', href: '#community' },
];