'use client';

import React, { useState } from 'react';
import { 
  Sparkles, Send, MessageSquare, BookOpen, Code, 
  FileText 
} from 'lucide-react';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState('');

  const quickActions = [
    { title: 'Chat AI', icon: <MessageSquare className="w-5 h-5 text-indigo-500" />, desc: 'Ngobrol seru & tanya apa saja' },
    { title: 'Study Helper', icon: <BookOpen className="w-5 h-5 text-blue-500" />, desc: 'Bantu belajar & ringkas materi' },
    { title: 'Coding Partner', icon: <Code className="w-5 h-5 text-purple-500" />, desc: 'Tulis & perbaiki kode program' },
    { title: 'Writing Assistant', icon: <FileText className="w-5 h-5 text-pink-500" />, desc: 'Buat esai, cerita, atau email' },
  ];

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    setResponse('');

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, personality: 'Friendly' }),
      });
      const data = await res.json();
      setResponse(data.result || 'Maaf, terjadi kesalahan.');
    } catch (err) {
      setResponse('Gagal terhubung ke server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-4xl mx-auto px-4 py-8 min-h-screen flex flex-col justify-between">
      {/* Header / Brand */}
      <header className="flex items-center justify-between mb-8 bg-white/80 backdrop-blur-md p-4 rounded-2xl shadow-sm border border-purple-100">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-tr from-pink-400 to-purple-500 p-2.5 rounded-xl shadow-md text-white">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-bold text-xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              RAPZY AI
            </h1>
            <p className="text-xs text-slate-500 font-medium">Your Friendly AI Assistant</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className="bg-emerald-100 text-emerald-700 text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Online
          </span>
        </div>
      </header>

      {/* Main Hero & Input Section */}
      <div className="my-auto text-center space-y-6">
        <div className="space-y-2">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight">
            What can I help you with?
          </h2>
          <p className="text-slate-600 text-sm md:text-base">
            Tanya materi, buat kode, atau mulai obrolan santai bersama asisten kartunmu!
          </p>
        </div>

        {/* Input Box */}
        <form onSubmit={handleSend} className="max-w-2xl mx-auto relative bg-white rounded-2xl shadow-lg border border-purple-100 p-2 transition-all focus-within:ring-2 focus-within:ring-purple-400">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend(e);
              }
            }}
            placeholder="Ask anything... (Tekan Enter untuk kirim)"
            className="w-full p-3 bg-transparent resize-none outline-none text-slate-700 placeholder-slate-400 text-sm md:text-base max-h-32 min-h-[50px]"
            rows={2}
          />
          <div className="flex items-center justify-between px-2 pb-1">
            <span className="text-xs text-slate-400">Shift + Enter untuk baris baru</span>
            <button
              type="submit"
              disabled={loading || !prompt.trim()}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white p-2.5 rounded-xl shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </form>

        {/* AI Response Card */}
        {(loading || response) && (
          <div className="max-w-2xl mx-auto bg-white border border-purple-100 rounded-2xl p-5 shadow-md text-left transition-all">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-purple-100 text-purple-600 p-1.5 rounded-lg text-xs font-bold">RAPZY AI</span>
            </div>
            {loading ? (
              <div className="flex items-center space-x-2 text-slate-400 text-sm py-2">
                <div className="w-4 h-4 border-2 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
                <span>Sedang meracik jawaban...</span>
              </div>
            ) : (
              <p className="text-slate-700 text-sm whitespace-pre-wrap leading-relaxed">{response}</p>
            )}
          </div>
        )}

        {/* Quick Action Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto pt-4">
          {quickActions.map((item, index) => (
            <div 
              key={index} 
              onClick={() => setPrompt(`Tolong bantu saya untuk fitur ${item.title}: `)}
              className="bg-white/70 hover:bg-white border border-purple-50 hover:border-purple-200 p-4 rounded-2xl shadow-sm hover:shadow-md transition-all text-left cursor-pointer group"
            >
              <div className="mb-2 p-2 w-fit bg-purple-50 group-hover:bg-purple-100 rounded-xl transition-colors">
                {item.icon}
              </div>
              <h3 className="font-semibold text-slate-800 text-sm">{item.title}</h3>
              <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center text-xs text-slate-400 py-4">
        © 2026 RAPZY AI. Clean, Colorful, & Professional.
      </footer>
    </main>
  );
}

