import React from 'react';

export interface ServerStatus {
  online: boolean;
  ip: string;
  port: number;
  players: {
    online: number;
    max: number;
  };
  motd: {
    raw: string[];
    clean: string[];
    html: string[];
  };
  version: string;
  icon?: string; // Base64 image
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}