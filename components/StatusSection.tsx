import React, { useEffect, useState } from 'react';
import { Copy, Check, Users, Signal, AlertTriangle } from 'lucide-react';
import { ServerStatus } from '../types';
import { FULL_IP } from '../constants';
import { fetchServerStatus } from '../services/minecraftService';

const StatusSection: React.FC = () => {
  const [status, setStatus] = useState<ServerStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const getStatus = async () => {
      try {
        const data = await fetchServerStatus();
        setStatus(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    getStatus();
    const interval = setInterval(getStatus, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(FULL_IP);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) return <div className="h-48 flex items-center justify-center text-emerald-500 font-pixel text-xl">Connexion au satellite...</div>;

  const isOnline = status?.online;

  return (
    <div className="relative -mt-20 z-10 container mx-auto px-4">
      <div className="bg-gray-900/80 backdrop-blur-xl border border-gray-700 rounded-2xl shadow-2xl p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8 max-w-5xl mx-auto">
        
        {/* Server Icon & Basic Info */}
        <div className="flex items-center gap-6 w-full md:w-auto">
          <div className="relative">
            {status?.icon ? (
              <img src={status.icon} alt="Server Icon" className="w-20 h-20 rounded-xl shadow-lg border-2 border-gray-600" />
            ) : (
              <div className="w-20 h-20 bg-gray-800 rounded-xl border-2 border-gray-600 flex items-center justify-center">
                <span className="text-3xl font-pixel text-gray-500">MC</span>
              </div>
            )}
            <div className={`absolute -bottom-2 -right-2 w-6 h-6 rounded-full border-4 border-gray-900 ${isOnline ? 'bg-emerald-500' : 'bg-red-500'}`}></div>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-2xl font-bold text-white tracking-tight">Statut du Serveur</h2>
              <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase ${isOnline ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                {isOnline ? 'En Ligne' : 'Hors Ligne'}
              </span>
            </div>
            <p className="text-gray-400 text-sm">Version: <span className="text-gray-200 font-mono">{status?.version}</span></p>
          </div>
        </div>

        {/* IP Copy Section */}
        <div className="flex-1 w-full md:w-auto flex justify-center">
          <button 
            onClick={handleCopy}
            className="group relative w-full md:w-auto bg-black/40 hover:bg-black/60 border border-emerald-500/30 hover:border-emerald-400 rounded-xl py-4 px-6 transition-all duration-300 flex items-center justify-between md:justify-center gap-4 group"
          >
            <div className="text-left">
              <span className="block text-xs text-emerald-500/70 font-bold uppercase tracking-wider mb-1">Adresse IP</span>
              <span className="font-mono text-lg md:text-xl text-emerald-100 tracking-wide">{FULL_IP}</span>
            </div>
            <div className="bg-emerald-500/10 p-2 rounded-lg group-hover:bg-emerald-500/20 transition">
              {copied ? <Check className="w-6 h-6 text-emerald-400" /> : <Copy className="w-6 h-6 text-emerald-500" />}
            </div>
            {copied && (
              <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-emerald-500 text-black text-xs font-bold px-3 py-1 rounded shadow-lg animate-bounce">
                Copié !
              </span>
            )}
          </button>
        </div>

        {/* Player Count */}
        <div className="flex items-center gap-8 w-full md:w-auto justify-around md:justify-end border-t md:border-t-0 border-gray-700 pt-6 md:pt-0">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 text-gray-400 mb-1">
              <Users className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Joueurs</span>
            </div>
            <span className="text-3xl font-pixel text-white">
              {status?.players.online}<span className="text-gray-600 text-xl">/{status?.players.max}</span>
            </span>
          </div>
          <div className="text-center">
             <div className="flex items-center justify-center gap-2 text-gray-400 mb-1">
              <Signal className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Ping</span>
            </div>
            <span className="text-3xl font-pixel text-emerald-400">
              {isOnline ? '32ms' : '--'}
            </span>
          </div>
        </div>

      </div>
      
      {/* MOTD Display */}
      {status?.motd.clean && status.motd.clean.length > 0 && (
         <div className="max-w-3xl mx-auto mt-6 text-center">
            <p className="text-gray-400 italic font-pixel text-lg">"{status.motd.clean.join(' ')}"</p>
         </div>
      )}
    </div>
  );
};

export default StatusSection;