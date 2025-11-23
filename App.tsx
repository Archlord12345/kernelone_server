import React from 'react';
import { Gamepad2, Zap, Unlock, Clock, Github, MessageCircle, BookOpen, Heart, Blocks, Server } from 'lucide-react';
import StatusSection from './components/StatusSection';
import ServerAssistant from './components/ServerAssistant';

// High-quality, artistic/generated style images
const HERO_BG = "https://images.unsplash.com/photo-1629814484898-724393664329?q=80&w=2832&auto=format&fit=crop"; 
const FEATURE_IMG = "https://images.unsplash.com/photo-1599583767866-981f26f21c25?q=80&w=2938&auto=format&fit=crop";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white font-sans selection:bg-emerald-500 selection:text-white">
      
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-black/20 backdrop-blur-md border-b border-white/5">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-lg flex items-center justify-center shadow-emerald-500/20 shadow-lg transform rotate-3 hover:rotate-0 transition duration-300">
              <span className="font-pixel text-2xl font-bold text-white">M</span>
            </div>
            <span className="font-bold text-xl tracking-tight">Mine<span className="text-emerald-400">Hub</span></span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-gray-300 hover:text-white transition">Le Serveur</a>
            <a href="#rules" className="text-sm font-medium text-gray-300 hover:text-white transition">Règles</a>
            <a href="#community" className="text-sm font-medium text-gray-300 hover:text-white transition">Communauté</a>
            <button 
              onClick={() => document.getElementById('join')?.scrollIntoView({behavior: 'smooth'})}
              className="px-5 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold rounded-lg hover:from-emerald-500 hover:to-teal-500 transition transform hover:-translate-y-0.5 shadow-lg shadow-emerald-900/50"
            >
              Jouer Maintenant
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header id="home" className="relative h-[85vh] flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={HERO_BG} alt="Minecraft Landscape" className="w-full h-full object-cover opacity-60 scale-105 animate-float" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-[#0a0a0c]/60 to-transparent"></div>
          <div className="absolute inset-0 bg-radial-gradient from-transparent to-black/60"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-sm font-bold mb-8 animate-fade-in-up backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            PAPER MC 1.21.10 • CRACK ACCEPTÉ
          </div>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-6 leading-tight drop-shadow-2xl">
            Survie Classique <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-500">Juste du Fun</span>
          </h1>
          <p className="text-lg md:text-2xl text-gray-200 mb-10 max-w-2xl mx-auto leading-relaxed font-light drop-shadow-md">
            Retrouvez l'essence de Minecraft. Une survie authentique, quelques plugins pour le confort, et une communauté de 400 joueurs passionnés.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
             <button 
               onClick={() => navigator.clipboard.writeText('209.205.228.237:3104')}
               className="group px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-lg shadow-xl shadow-emerald-900/40 transition-all hover:scale-105 flex items-center justify-center gap-3"
             >
               <Gamepad2 className="w-6 h-6 group-hover:rotate-12 transition" />
               <span>Rejoindre (Copier IP)</span>
             </button>
             <button className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/10 rounded-xl font-bold text-lg backdrop-blur-md transition-all hover:scale-105 flex items-center justify-center gap-3">
               <BookOpen className="w-6 h-6" />
               Découvrir
             </button>
          </div>
        </div>
      </header>

      {/* Live Status Section */}
      <div id="join">
        <StatusSection />
      </div>

      {/* Features Grid */}
      <section id="features" className="py-24 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent"></div>
        <div className="absolute -left-20 top-40 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -right-20 bottom-40 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">L'Expérience MineHub</h2>
            <p className="text-gray-400 max-w-xl mx-auto text-lg">Nous croyons en un jeu simple mais puissant. Pas de "pay-to-win", juste du plaisir.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Heart className="w-8 h-8 text-pink-500" />}
              title="Gameplay Authentique"
              description="L'expérience Vanilla que vous aimez, subtilement améliorée. Construisez, explorez et survivez comme au premier jour."
            />
            <FeatureCard 
              icon={<Blocks className="w-8 h-8 text-emerald-400" />}
              title="Plugins Essentiels"
              description="Juste ce qu'il faut : protection de zone, téléportation et gestion d'économie simple pour fluidifier le jeu."
            />
            <FeatureCard 
              icon={<Unlock className="w-8 h-8 text-blue-400" />}
              title="Ouvert à Tous"
              description="Premium ou Crack, tout le monde est bienvenu. Rejoignez-nous instantanément sans launcher spécifique."
            />
          </div>
        </div>
      </section>

      {/* Rules/Info Section */}
      <section id="rules" className="py-24 bg-gray-900/30 border-y border-white/5 relative">
        <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 space-y-10">
             <div>
               <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Respect & Amusement</h2>
               <p className="text-gray-400 text-lg leading-relaxed">
                 Pour garantir que tout le monde s'amuse, nous avons établi quelques règles simples. 
                 Notre but est de créer un espace de détente où votre créativité est la seule limite.
               </p>
             </div>
             
             <div className="grid gap-6">
               <RuleItem number="01" title="Respect Mutuel" text="Soyez bienveillant. Le serveur est un lieu de détente pour tous." />
               <RuleItem number="02" title="Fair Play" text="Pas de triche, pas de vol dans les zones protégées. Jouez le jeu." />
               <RuleItem number="03" title="Skins pour tous" text="Utilisez la commande /skin pour personnaliser votre personnage, même en crack." />
             </div>
          </div>
          
          <div className="flex-1 relative w-full">
            <div className="absolute inset-0 bg-emerald-500/20 blur-[100px] rounded-full opacity-50"></div>
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
              <img 
                src={FEATURE_IMG}
                alt="Gameplay Ambiance" 
                className="relative w-full rounded-2xl shadow-2xl border border-white/10 transform transition duration-500 group-hover:scale-[1.01]"
              />
              
              {/* Overlay Stat Card */}
              <div className="absolute -bottom-6 -left-6 bg-gray-900/90 backdrop-blur-xl p-6 rounded-xl border border-gray-700 shadow-xl hidden md:block">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-emerald-500/20 rounded-lg">
                    <Clock className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Disponibilité</p>
                    <p className="text-2xl font-bold text-white">99.9%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community / Footer */}
      <footer id="community" className="bg-[#050507] pt-24 pb-12 border-t border-white/5">
        <div className="container mx-auto px-6 text-center">
          <div className="inline-block p-4 rounded-2xl bg-gray-900/50 border border-gray-800 mb-8">
            <h2 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">Rejoignez l'Aventure</h2>
            <p className="text-gray-400">Venez construire votre histoire avec nous.</p>
          </div>
          
          <div className="flex justify-center gap-6 mb-16">
            <SocialButton icon={<MessageCircle className="w-5 h-5" />} label="Discord" />
            <SocialButton icon={<Github className="w-5 h-5" />} label="Github" />
          </div>
          
          <div className="border-t border-gray-800/50 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
            <div className="text-left">
              <p>&copy; 2024 MineHub Server. Tous droits réservés.</p>
              <div className="flex items-center gap-2 mt-2 text-xs text-gray-600">
                <Server className="w-3 h-3" />
                <span>Propulsé par <span className="text-emerald-500/60 font-medium">Godlike</span></span>
              </div>
            </div>
            <div className="flex gap-6 mt-4 md:mt-0 font-medium">
              <a href="#" className="hover:text-emerald-400 transition">IP: 209.205.228.237:3104</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Gemini Powered Assistant */}
      <ServerAssistant />
      
    </div>
  );
};

// Sub-components for cleaner App.tsx

const FeatureCard: React.FC<{ icon: React.ReactNode, title: string, description: string }> = ({ icon, title, description }) => (
  <div className="p-8 rounded-3xl bg-gray-900/40 border border-white/5 hover:bg-gray-900/60 hover:border-emerald-500/30 transition duration-300 group h-full backdrop-blur-sm">
    <div className="mb-6 w-14 h-14 rounded-2xl bg-gradient-to-br from-gray-800 to-black border border-white/5 flex items-center justify-center group-hover:scale-110 group-hover:from-emerald-900/40 group-hover:to-gray-900 transition duration-300 shadow-lg">
      {icon}
    </div>
    <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-emerald-400 transition">{title}</h3>
    <p className="text-gray-400 leading-relaxed font-light">{description}</p>
  </div>
);

const RuleItem: React.FC<{ number: string, title: string, text: string }> = ({ number, title, text }) => (
  <div className="flex items-start gap-6 p-6 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-emerald-500/20 transition duration-300">
    <span className="font-pixel text-4xl text-emerald-500/40">{number}</span>
    <div>
      <h4 className="text-xl font-bold text-white mb-2">{title}</h4>
      <p className="text-gray-400 leading-relaxed">{text}</p>
    </div>
  </div>
);

const SocialButton: React.FC<{ icon: React.ReactNode, label: string }> = ({ icon, label }) => (
  <button className="flex items-center gap-3 px-8 py-4 bg-gray-900 border border-gray-800 rounded-full hover:bg-gray-800 hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-900/20 transition group">
    <span className="text-gray-400 group-hover:text-emerald-400 transition">{icon}</span>
    <span className="font-bold tracking-wide group-hover:text-white transition">{label}</span>
  </button>
);

export default App;