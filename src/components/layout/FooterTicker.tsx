'use client';

import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('https://quartermasters-api-placeholder.com', { // Need real endpoint
  autoConnect: false,
});

export function FooterTicker() {
  const [messages, setMessages] = useState<string[]>([
    "OPERATIONAL STATUS: NOMINAL",
    "MARKET INDEX: +0.42%",
    "PORT ACTIVITY: HIGH",
    "LOGISTICS NETWORK: ACTIVE",
    "SECURITY LEVEL: ALPHA",
    "HR COMPLIANCE: 100%",
  ]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Ideally connect to real socket
    // socket.connect();
    // socket.on('connect', () => setIsConnected(true));
    // socket.on('disconnect', () => setIsConnected(false));
    // socket.on('ticker_update', (data) => setMessages(prev => [data.message, ...prev.slice(0, 5)]));

    // return () => {
    //   socket.off('connect');
    //   socket.off('disconnect');
    //   socket.off('ticker_update');
    // };
  }, []);

  return (
    <div className="relative flex overflow-hidden whitespace-nowrap">
      <div className="animate-marquee flex gap-12 py-1">
        {[...messages, ...messages].map((msg, i) => (
          <div key={i} className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-accent-gold)]">
            <span className={`h-1.5 w-1.5 rounded-full ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-yellow-500'}`} />
            {msg}
          </div>
        ))}
      </div>
      <div className="absolute top-0 animate-marquee2 flex gap-12 py-1">
        {[...messages, ...messages].map((msg, i) => (
          <div key={i} className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-accent-gold)]">
            <span className={`h-1.5 w-1.5 rounded-full ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-yellow-500'}`} />
            {msg}
          </div>
        ))}
      </div>
    </div>
  );
}
