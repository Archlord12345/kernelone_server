import { ServerStatus } from '../types';
import { STATUS_API_URL } from '../constants';

export const fetchServerStatus = async (): Promise<ServerStatus> => {
  try {
    const response = await fetch(STATUS_API_URL);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    
    return {
      online: data.online,
      ip: data.ip,
      port: data.port,
      players: {
        online: data.players?.online || 0,
        max: data.players?.max || 400, // Default to 400 if not returned
      },
      motd: {
        raw: data.motd?.raw || [],
        clean: data.motd?.clean || ['Un Serveur Minecraft'],
        html: data.motd?.html || [],
      },
      version: data.version || 'Paper 1.21.10',
      icon: data.icon,
    };
  } catch (error) {
    console.error("Failed to fetch server status:", error);
    // Return a fallback offline status
    return {
      online: false,
      ip: '',
      port: 0,
      players: { online: 0, max: 400 },
      motd: { raw: [], clean: ['Serveur hors ligne ou injoignable'], html: [] },
      version: 'Paper 1.21.10',
    };
  }
};