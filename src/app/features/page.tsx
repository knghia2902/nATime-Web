'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useLanguage } from '@/lib/i18n';

// SVGs for the 8 modules
function FeatureSvg({ type }: { type: string }) {
  if (type === 'biometric') {
    return (
      <svg viewBox="0 0 500 380" className="w-full h-auto rounded-2xl shadow-2xl border border-slate-800 bg-[#070b15]" xmlns="http://www.w3.org/2000/svg">
        {/* Mac OS Window Controls */}
        <circle cx="25" cy="20" r="5" fill="#ef4444" />
        <circle cx="40" cy="20" r="5" fill="#f59e0b" />
        <circle cx="55" cy="20" r="5" fill="#10b981" />
        <text x="80" y="24" fill="#64748b" fontSize="11" fontFamily="Inter, sans-serif">AI Face Terminal — Live Feed</text>
        
        {/* Camera Viewfinder */}
        <rect x="25" y="55" width="270" height="270" rx="16" fill="#0b0f19" stroke="#1e293b" strokeWidth="2" />
        
        {/* Decorative Grid Lines */}
        <line x1="25" y1="120" x2="295" y2="120" stroke="#1e293b" strokeDasharray="4 4" />
        <line x1="25" y1="190" x2="295" y2="190" stroke="#1e293b" strokeDasharray="4 4" />
        <line x1="25" y1="260" x2="295" y2="260" stroke="#1e293b" strokeDasharray="4 4" />
        <line x1="90" y1="55" x2="90" y2="325" stroke="#1e293b" strokeDasharray="4 4" />
        <line x1="160" y1="55" x2="160" y2="325" stroke="#1e293b" strokeDasharray="4 4" />
        <line x1="230" y1="55" x2="230" y2="325" stroke="#1e293b" strokeDasharray="4 4" />

        {/* Abstract Face Silhouette */}
        <path d="M160 90 C125 90, 110 130, 110 170 C110 220, 130 255, 160 255 C190 255, 210 220, 210 170 C210 130, 195 90, 160 90 Z" 
              fill="none" stroke="#6366f1" strokeWidth="3" opacity="0.8" />
        <path d="M110 170 C110 190, 125 200, 160 200 C195 200, 210 190, 210 170" 
              fill="none" stroke="#6366f1" strokeWidth="1.5" opacity="0.6" />
        <path d="M135 150 C140 145, 150 145, 155 150" fill="none" stroke="#6366f1" strokeWidth="2" />
        <path d="M165 150 C170 145, 180 145, 185 150" fill="none" stroke="#6366f1" strokeWidth="2" />
        <circle cx="145" cy="155" r="2.5" fill="#38bdf8" />
        <circle cx="175" cy="155" r="2.5" fill="#38bdf8" />
        <path d="M160 175 L160 190" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />
        <path d="M145 220 C150 225, 170 225, 175 220" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" />

        {/* Scanning Target Corners */}
        <path d="M45 85 L45 70 L60 70" fill="none" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" />
        <path d="M275 85 L275 70 L260 70" fill="none" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" />
        <path d="M45 295 L45 310 L60 310" fill="none" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" />
        <path d="M275 295 L275 310 L260 310" fill="none" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" />

        {/* AI Laser Scanning Bar */}
        <rect x="25" y="160" width="270" height="4" fill="url(#laserGrad)" opacity="0.9" />
        <rect x="25" y="164" width="270" height="40" fill="url(#laserGlow)" opacity="0.3" />

        {/* AI Landmark Points */}
        <circle cx="160" cy="90" r="4" fill="#a78bfa" className="animate-pulse" />
        <circle cx="110" cy="170" r="4" fill="#a78bfa" className="animate-pulse" />
        <circle cx="210" cy="170" r="4" fill="#a78bfa" className="animate-pulse" />
        <circle cx="160" cy="255" r="4" fill="#a78bfa" className="animate-pulse" />
        <circle cx="160" cy="175" r="3" fill="#a78bfa" />
        <circle cx="145" cy="220" r="3" fill="#a78bfa" />
        <circle cx="175" cy="220" r="3" fill="#a78bfa" />

        {/* Side Details Panel */}
        <g transform="translate(315, 55)">
          {/* Verified Status Pill */}
          <rect x="0" y="0" width="160" height="46" rx="8" fill="#064e3b" fillOpacity="0.4" stroke="#059669" strokeWidth="1.5" />
          <circle cx="22" cy="23" r="8" fill="#10b981" />
          <path d="M19 23 L21 25 L25 21" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <text x="38" y="27" fill="#34d399" fontSize="12" fontWeight="bold" fontFamily="Inter, sans-serif">VERIFIED AI</text>

          {/* Info Card */}
          <rect x="0" y="60" width="160" height="135" rx="8" fill="#0f172a" stroke="#1e293b" strokeWidth="1.5" />
          
          <text x="12" y="80" fill="#94a3b8" fontSize="10" fontFamily="Inter, sans-serif">EMPLOYEE</text>
          <text x="12" y="96" fill="#f8fafc" fontSize="12" fontWeight="bold" fontFamily="Inter, sans-serif">Phạm Minh Đức</text>
          
          <text x="12" y="122" fill="#94a3b8" fontSize="10" fontFamily="Inter, sans-serif">ID CODE</text>
          <text x="12" y="138" fill="#38bdf8" fontSize="12" fontWeight="mono" fontFamily="monospace">EMP-0942</text>
          
          <text x="12" y="164" fill="#94a3b8" fontSize="10" fontFamily="Inter, sans-serif">CONFIDENCE</text>
          <text x="12" y="180" fill="#10b981" fontSize="12" fontWeight="bold" fontFamily="Inter, sans-serif">99.85% Match</text>

          {/* Live activity log */}
          <text x="2" y="218" fill="#94a3b8" fontSize="10" fontWeight="bold" fontFamily="Inter, sans-serif">LIVE TRANSACTION</text>
          <rect x="0" y="226" width="160" height="44" rx="8" fill="#0b0f19" stroke="#1e293b" strokeWidth="1" />
          <text x="10" y="242" fill="#34d399" fontSize="10" fontWeight="bold" fontFamily="Inter, sans-serif">08:15:32 AM</text>
          <text x="10" y="258" fill="#e2e8f0" fontSize="10" fontFamily="Inter, sans-serif">Gate 1 — Entry Granted</text>
        </g>

        {/* Gradients */}
        <defs>
          <linearGradient id="laserGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0" />
            <stop offset="15%" stopColor="#38bdf8" stopOpacity="1" />
            <stop offset="50%" stopColor="#6366f1" stopOpacity="1" />
            <stop offset="85%" stopColor="#38bdf8" stopOpacity="1" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="laserGlow" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    );
  }
  
  if (type === 'access') {
    return (
      <svg viewBox="0 0 500 380" className="w-full h-auto rounded-2xl shadow-2xl border border-slate-800 bg-[#070b15]" xmlns="http://www.w3.org/2000/svg">
        {/* Mac OS Window Controls */}
        <circle cx="25" cy="20" r="5" fill="#ef4444" />
        <circle cx="40" cy="20" r="5" fill="#f59e0b" />
        <circle cx="55" cy="20" r="5" fill="#10b981" />
        <text x="80" y="24" fill="#64748b" fontSize="11" fontFamily="Inter, sans-serif">Access Zones & Gates Monitor</text>

        {/* 3 Grid Cards */}
        {/* Zone 1 - Main Lobby (Green/Open) */}
        <g transform="translate(25, 55)">
          <rect x="0" y="0" width="138" height="260" rx="12" fill="#0f172a" stroke="#1e293b" strokeWidth="1.5" />
          <text x="12" y="24" fill="#e2e8f0" fontSize="12" fontWeight="bold" fontFamily="Inter, sans-serif">Main Turnstile A</text>
          <text x="12" y="40" fill="#64748b" fontSize="10" fontFamily="Inter, sans-serif">Zone 01 — Lobby</text>
          
          {/* Turnstile Graphic */}
          <circle cx="69" cy="110" r="30" fill="#022c22" stroke="#059669" strokeWidth="2" />
          <line x1="69" y1="110" x2="69" y2="85" stroke="#10b981" strokeWidth="3" strokeLinecap="round" />
          <line x1="69" y1="110" x2="90" y2="125" stroke="#10b981" strokeWidth="3" strokeLinecap="round" />
          <line x1="69" y1="110" x2="48" y2="125" stroke="#10b981" strokeWidth="3" strokeLinecap="round" />
          
          {/* Status Pill */}
          <rect x="34" y="165" width="70" height="24" rx="12" fill="#064e3b" />
          <circle cx="44" cy="177" r="4" fill="#10b981" className="animate-pulse" />
          <text x="54" y="181" fill="#34d399" fontSize="10" fontWeight="bold" fontFamily="Inter, sans-serif">UNLOCKED</text>

          {/* User Log snippet */}
          <line x1="12" y1="205" x2="126" y2="205" stroke="#1e293b" />
          <text x="12" y="222" fill="#94a3b8" fontSize="9" fontFamily="Inter, sans-serif">LAST ACCESS</text>
          <text x="12" y="236" fill="#f8fafc" fontSize="10" fontWeight="bold" fontFamily="Inter, sans-serif">Trần Quốc Anh</text>
          <text x="12" y="248" fill="#64748b" fontSize="9" fontFamily="Inter, sans-serif">08:29:40 • Granted</text>
        </g>

        {/* Zone 2 - Server Room (Red/Locked) */}
        <g transform="translate(181, 55)">
          <rect x="0" y="0" width="138" height="260" rx="12" fill="#0f172a" stroke="#1e293b" strokeWidth="1.5" />
          <text x="12" y="24" fill="#e2e8f0" fontSize="12" fontWeight="bold" fontFamily="Inter, sans-serif">Server Room B</text>
          <text x="12" y="40" fill="#64748b" fontSize="10" fontFamily="Inter, sans-serif">Zone 04 — R&D HQ</text>
          
          {/* Door / Lock Graphic */}
          <rect x="49" y="80" width="40" height="60" rx="6" fill="#1e1b4b" stroke="#4f46e5" strokeWidth="2" />
          <circle cx="69" cy="110" r="14" fill="#7f1d1d" stroke="#ef4444" strokeWidth="1.5" />
          {/* Lock Icon */}
          <path d="M66 112 L66 108 A3 3 0 0 1 72 108 L72 112 Z M63 112 H75 V119 H63 Z" fill="#ef4444" />
          
          {/* Status Pill */}
          <rect x="39" y="165" width="60" height="24" rx="12" fill="#450a0a" />
          <circle cx="49" cy="177" r="4" fill="#ef4444" />
          <text x="59" y="181" fill="#fca5a5" fontSize="10" fontWeight="bold" fontFamily="Inter, sans-serif">SECURED</text>

          {/* User Log snippet */}
          <line x1="12" y1="205" x2="126" y2="205" stroke="#1e293b" />
          <text x="12" y="222" fill="#fca5a5" fontSize="9" fontWeight="bold" fontFamily="Inter, sans-serif">ALERT LOG</text>
          <text x="12" y="236" fill="#f8fafc" fontSize="10" fontWeight="bold" fontFamily="Inter, sans-serif">Invalid Card Attempt</text>
          <text x="12" y="248" fill="#ef4444" fontSize="9" fontFamily="Inter, sans-serif">09:12:11 • Rejected</text>
        </g>

        {/* Zone 3 - Warehouse Gate (Yellow/Alarm) */}
        <g transform="translate(337, 55)">
          <rect x="0" y="0" width="138" height="260" rx="12" fill="#0f172a" stroke="#1e293b" strokeWidth="1.5" />
          <text x="12" y="24" fill="#e2e8f0" fontSize="12" fontWeight="bold" fontFamily="Inter, sans-serif">Warehouse Gate</text>
          <text x="12" y="40" fill="#64748b" fontSize="10" fontFamily="Inter, sans-serif">Zone 09 — Logistics</text>
          
          {/* Alarm Gate Graphic */}
          <rect x="39" y="85" width="60" height="50" rx="4" fill="#78350f" fillOpacity="0.2" stroke="#d97706" strokeWidth="2" strokeDasharray="3 3" />
          <path d="M49 120 L89 100" stroke="#f59e0b" strokeWidth="4" strokeLinecap="round" />
          <circle cx="69" cy="110" r="8" fill="#f59e0b" />
          
          {/* Status Pill */}
          <rect x="42" y="165" width="54" height="24" rx="12" fill="#78350f" />
          <circle cx="52" cy="177" r="4" fill="#f59e0b" className="animate-ping" />
          <text x="62" y="181" fill="#fde047" fontSize="10" fontWeight="bold" fontFamily="Inter, sans-serif">WARN</text>

          {/* User Log snippet */}
          <line x1="12" y1="205" x2="126" y2="205" stroke="#1e293b" />
          <text x="12" y="222" fill="#fde047" fontSize="9" fontFamily="Inter, sans-serif">SENSOR STATE</text>
          <text x="12" y="236" fill="#f8fafc" fontSize="10" fontWeight="bold" fontFamily="Inter, sans-serif">Door Open Too Long</text>
          <text x="12" y="248" fill="#f59e0b" fontSize="9" fontFamily="Inter, sans-serif">Duration: 12 mins</text>
        </g>
        
        {/* Footer Metrics Overview */}
        <rect x="25" y="330" width="450" height="35" rx="8" fill="#0f172a" stroke="#1e293b" strokeWidth="1" />
        <text x="40" y="352" fill="#94a3b8" fontSize="11" fontFamily="Inter, sans-serif">System status:</text>
        <text x="120" y="352" fill="#34d399" fontSize="11" fontWeight="bold" fontFamily="Inter, sans-serif">● 24 Controllers Online</text>
        <text x="270" y="352" fill="#94a3b8" fontSize="11" fontFamily="Inter, sans-serif">Fire Alarm Linkage:</text>
        <text x="380" y="352" fill="#38bdf8" fontSize="11" fontWeight="bold" fontFamily="Inter, sans-serif">READY (STANDBY)</text>
      </svg>
    );
  }
  
  if (type === 'device') {
    return (
      <svg viewBox="0 0 500 380" className="w-full h-auto rounded-2xl shadow-2xl border border-slate-800 bg-[#070b15]" xmlns="http://www.w3.org/2000/svg">
        {/* Mac OS Window Controls */}
        <circle cx="25" cy="20" r="5" fill="#ef4444" />
        <circle cx="40" cy="20" r="5" fill="#f59e0b" />
        <circle cx="55" cy="20" r="5" fill="#10b981" />
        <text x="80" y="24" fill="#64748b" fontSize="11" fontFamily="Inter, sans-serif">Unified Device Manager Console</text>

        {/* Central Sync Server Hub */}
        <g transform="translate(195, 120)">
          <circle cx="55" cy="55" r="48" fill="url(#serverGrad)" stroke="#6366f1" strokeWidth="2" className="animate-pulse" />
          <rect x="35" y="35" width="40" height="40" rx="8" fill="#1e1b4b" stroke="#818cf8" strokeWidth="2" />
          {/* Cloud Database Icon inside Server */}
          <path d="M43 58 C43 52, 67 52, 67 58 C67 60, 63 62, 55 62 C47 62, 43 60, 43 58 Z" fill="none" stroke="#818cf8" strokeWidth="1.5" />
          <path d="M43 50 C43 45, 67 45, 67 50" fill="none" stroke="#818cf8" strokeWidth="1.5" />
          <path d="M43 43 C43 38, 67 38, 67 43" fill="none" stroke="#818cf8" strokeWidth="1.5" />
          <text x="55" y="98" fill="#e2e8f0" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="Inter, sans-serif">nATime Cloud Hub</text>
        </g>

        {/* Device Terminals */}
        {/* Device 1 - Hikvision Terminal (Left) */}
        <g transform="translate(30, 80)">
          <rect x="0" y="0" width="115" height="70" rx="10" fill="#0f172a" stroke="#1e293b" strokeWidth="1.5" />
          <rect x="8" y="8" width="8" height="8" rx="4" fill="#10b981" />
          <text x="22" y="16" fill="#94a3b8" fontSize="9" fontWeight="bold" fontFamily="Inter, sans-serif">HIKVISION AI</text>
          <text x="10" y="36" fill="#f1f5f9" fontSize="11" fontWeight="bold" fontFamily="Inter, sans-serif">DS-K1T671</text>
          <text x="10" y="52" fill="#64748b" fontSize="9" fontFamily="Inter, sans-serif">IP: 192.168.1.150</text>
          <text x="10" y="62" fill="#10b981" fontSize="8" fontWeight="bold" fontFamily="Inter, sans-serif">Synced • Ping 2ms</text>
        </g>

        {/* Device 2 - ZKTeco Terminal (Right) */}
        <g transform="translate(355, 80)">
          <rect x="0" y="0" width="115" height="70" rx="10" fill="#0f172a" stroke="#1e293b" strokeWidth="1.5" />
          <rect x="8" y="8" width="8" height="8" rx="4" fill="#10b981" />
          <text x="22" y="16" fill="#94a3b8" fontSize="9" fontWeight="bold" fontFamily="Inter, sans-serif">ZKTECO FACE</text>
          <text x="10" y="36" fill="#f1f5f9" fontSize="11" fontWeight="bold" fontFamily="Inter, sans-serif">SpeedFace V5</text>
          <text x="10" y="52" fill="#64748b" fontSize="9" fontFamily="Inter, sans-serif">IP: 192.168.1.162</text>
          <text x="10" y="62" fill="#10b981" fontSize="8" fontWeight="bold" fontFamily="Inter, sans-serif">Synced • Ping 4ms</text>
        </g>

        {/* Device 3 - Dahua Access Gate (Bottom Center) */}
        <g transform="translate(192, 265)">
          <rect x="0" y="0" width="115" height="70" rx="10" fill="#0f172a" stroke="#1e293b" strokeWidth="1.5" />
          <rect x="8" y="8" width="8" height="8" rx="4" fill="#10b981" />
          <text x="22" y="16" fill="#94a3b8" fontSize="9" fontWeight="bold" fontFamily="Inter, sans-serif">DAHUA GATE</text>
          <text x="10" y="36" fill="#f1f5f9" fontSize="11" fontWeight="bold" fontFamily="Inter, sans-serif">ASI7213X-T1</text>
          <text x="10" y="52" fill="#64748b" fontSize="9" fontFamily="Inter, sans-serif">IP: 192.168.2.110</text>
          <text x="10" y="62" fill="#38bdf8" fontSize="8" fontWeight="bold" fontFamily="Inter, sans-serif">Syncing (98%)</text>
        </g>

        {/* Network Connections lines */}
        <path d="M 145 115 Q 195 115, 205 145" fill="none" stroke="#6366f1" strokeWidth="2" strokeDasharray="5 5" />
        <path d="M 355 115 Q 305 115, 295 145" fill="none" stroke="#6366f1" strokeWidth="2" strokeDasharray="5 5" />
        <path d="M 250 265 L 250 228" fill="none" stroke="#38bdf8" strokeWidth="2" strokeDasharray="5 5" />
        
        {/* Pulsing signal rings */}
        <circle cx="150" cy="115" r="4" fill="#6366f1" />
        <circle cx="350" cy="115" r="4" fill="#6366f1" />
        <circle cx="250" cy="245" r="4" fill="#38bdf8" />

        {/* Real-time synchronization monitor card at the bottom left */}
        <g transform="translate(30, 240)">
          <rect x="0" y="0" width="135" height="95" rx="8" fill="#0b0f19" stroke="#1e293b" strokeWidth="1" />
          <text x="10" y="20" fill="#f8fafc" fontSize="10" fontWeight="bold" fontFamily="Inter, sans-serif">Sync Log Monitor</text>
          <text x="10" y="38" fill="#34d399" fontSize="9" fontFamily="monospace">12:13:10 -&gt; ZK Sync Success</text>
          <text x="10" y="52" fill="#34d399" fontSize="9" fontFamily="monospace">12:13:08 -&gt; Hik Sync Success</text>
          <text x="10" y="66" fill="#38bdf8" fontSize="9" fontFamily="monospace">12:12:45 -&gt; Push 15 Templates</text>
          <text x="10" y="80" fill="#94a3b8" fontSize="8" fontFamily="Inter, sans-serif">Sync Interval: 5s Realtime</text>
        </g>

        {/* Sync queue status card bottom right */}
        <g transform="translate(335, 240)">
          <rect x="0" y="0" width="135" height="95" rx="8" fill="#0b0f19" stroke="#1e293b" strokeWidth="1" />
          <text x="10" y="20" fill="#f8fafc" fontSize="10" fontWeight="bold" fontFamily="Inter, sans-serif">Queue Status</text>
          <text x="10" y="38" fill="#e2e8f0" fontSize="9" fontFamily="Inter, sans-serif">Pending Commands: 0</text>
          <text x="10" y="52" fill="#10b981" fontSize="9" fontWeight="bold" fontFamily="Inter, sans-serif">Active Tasks: 0 Idle</text>
          
          <rect x="10" y="64" width="115" height="8" rx="4" fill="#1e293b" />
          <rect x="10" y="64" width="115" height="8" rx="4" fill="#10b981" />
          <text x="10" y="85" fill="#10b981" fontSize="9" fontWeight="bold" fontFamily="Inter, sans-serif">DB & Terminals 100% OK</text>
        </g>

        <defs>
          <radialGradient id="serverGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#070b15" stopOpacity="0.2" />
          </radialGradient>
        </defs>
      </svg>
    );
  }
  
  if (type === 'visitor') {
    return (
      <svg viewBox="0 0 500 380" className="w-full h-auto rounded-2xl shadow-2xl border border-slate-800 bg-[#070b15]" xmlns="http://www.w3.org/2000/svg">
        {/* Mac OS Window Controls */}
        <circle cx="25" cy="20" r="5" fill="#ef4444" />
        <circle cx="40" cy="20" r="5" fill="#f59e0b" />
        <circle cx="55" cy="20" r="5" fill="#10b981" />
        <text x="80" y="24" fill="#64748b" fontSize="11" fontFamily="Inter, sans-serif">Visitor Pass Registry</text>

        {/* Grid Layout inside Monitor */}
        {/* Left Side: Pre-registration workflow */}
        <g transform="translate(25, 55)">
          <rect x="0" y="0" width="195" height="295" rx="12" fill="#0f172a" stroke="#1e293b" strokeWidth="1.5" />
          <text x="15" y="25" fill="#f8fafc" fontSize="11" fontWeight="bold" fontFamily="Inter, sans-serif">Visitor Registration Form</text>
          
          {/* Tiny Input forms mocks */}
          <text x="15" y="50" fill="#94a3b8" fontSize="9" fontFamily="Inter, sans-serif">FULL NAME</text>
          <rect x="15" y="58" width="165" height="24" rx="4" fill="#0b0f19" stroke="#1e293b" strokeWidth="1" />
          <text x="23" y="73" fill="#e2e8f0" fontSize="10" fontFamily="Inter, sans-serif">Nguyen Van Hung</text>
          
          <text x="15" y="96" fill="#94a3b8" fontSize="9" fontFamily="Inter, sans-serif">ID / PASSPORT NUMBER (OCR AUTOFILL)</text>
          <rect x="15" y="104" width="165" height="24" rx="4" fill="#0b0f19" stroke="#1e293b" strokeWidth="1" />
          <text x="23" y="119" fill="#38bdf8" fontSize="9" fontWeight="bold" fontFamily="Inter, sans-serif">✓ 001096001234 (ID Verified)</text>
          
          <text x="15" y="142" fill="#94a3b8" fontSize="9" fontFamily="Inter, sans-serif">SPONSOR / HOST</text>
          <rect x="15" y="150" width="165" height="24" rx="4" fill="#0b0f19" stroke="#1e293b" strokeWidth="1" />
          <text x="23" y="165" fill="#e2e8f0" fontSize="10" fontFamily="Inter, sans-serif">Trần Thị Lan (HR Dept)</text>
          
          {/* Safety Training checkbox */}
          <rect x="15" y="188" width="12" height="12" rx="3" fill="#064e3b" stroke="#10b981" strokeWidth="1" />
          <path d="M17 194 L19 196 L23 191" fill="none" stroke="#10b981" strokeWidth="1.5" />
          <text x="35" y="198" fill="#a7f3d0" fontSize="9" fontWeight="bold" fontFamily="Inter, sans-serif">Safety Briefing Completed</text>
          
          {/* Approval stamp / Status */}
          <rect x="15" y="215" width="165" height="30" rx="6" fill="#022c22" stroke="#059669" strokeWidth="1" />
          <text x="97" y="234" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="Inter, sans-serif">APPROVED • ACCESS LEVEL B</text>

          {/* Submit button */}
          <rect x="15" y="255" width="165" height="26" rx="6" fill="#4f46e5" />
          <text x="97" y="271" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="Inter, sans-serif">PRINT BADGE / QR</text>
        </g>

        {/* Right Side: Virtual Visitor Pass Badge */}
        <g transform="translate(245, 55)">
          {/* Badge Clip */}
          <rect x="90" y="-12" width="50" height="20" rx="4" fill="#64748b" />
          <rect x="105" y="-6" width="20" height="6" rx="1" fill="#334155" />

          {/* Badge Container */}
          <rect x="0" y="0" width="230" height="295" rx="16" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="2" />
          
          {/* Badge Header Bar */}
          <path d="M 0 16 A 16 16 0 0 1 16 0 L 214 0 A 16 16 0 0 1 230 16 L 230 50 L 0 50 Z" fill="url(#badgeHeader)" />
          <text x="115" y="24" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="Inter, sans-serif">nATime SYSTEMS</text>
          <text x="115" y="38" fill="#eef2ff" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="Inter, sans-serif">VISITOR PASS / KHÁCH</text>
          
          {/* QR Code Container */}
          <rect x="65" y="65" width="100" height="100" rx="8" fill="#ffffff" stroke="#e2e8f0" strokeWidth="2" />
          {/* Simulated QR Code patterns */}
          <rect x="75" y="75" width="24" height="24" fill="#0f172a" />
          <rect x="79" y="79" width="16" height="16" fill="#ffffff" />
          <rect x="83" y="83" width="8" height="8" fill="#0f172a" />

          <rect x="131" y="75" width="24" height="24" fill="#0f172a" />
          <rect x="135" y="79" width="16" height="16" fill="#ffffff" />
          <rect x="139" y="83" width="8" height="8" fill="#0f172a" />

          <rect x="75" y="131" width="24" height="24" fill="#0f172a" />
          <rect x="79" y="135" width="16" height="16" fill="#ffffff" />
          <rect x="83" y="139" width="8" height="8" fill="#0f172a" />

          {/* Random QR blocks */}
          <rect x="105" y="85" width="8" height="16" fill="#0f172a" />
          <rect x="115" y="75" width="8" height="8" fill="#0f172a" />
          <rect x="105" y="105" width="16" height="8" fill="#0f172a" />
          <rect x="125" y="115" width="16" height="16" fill="#0f172a" />
          <rect x="115" y="135" width="16" height="8" fill="#0f172a" />
          <rect x="105" y="145" width="8" height="8" fill="#0f172a" />
          <rect x="135" y="145" width="16" height="8" fill="#0f172a" />

          {/* Visitor Details */}
          <text x="115" y="188" fill="#0f172a" fontSize="13" fontWeight="bold" textAnchor="middle" fontFamily="Inter, sans-serif">Nguyễn Văn Hùng</text>
          <text x="115" y="204" fill="#475569" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="Inter, sans-serif">FPT Telecom Co., Ltd</text>

          <line x1="20" y1="215" x2="210" y2="215" stroke="#e2e8f0" strokeWidth="1" />

          {/* Verification Details */}
          <text x="30" y="234" fill="#475569" fontSize="8" fontFamily="Inter, sans-serif">VALID DATE</text>
          <text x="30" y="248" fill="#0f172a" fontSize="10" fontWeight="bold" fontFamily="Inter, sans-serif">11-Jul-2026</text>

          <text x="125" y="234" fill="#475569" fontSize="8" fontFamily="Inter, sans-serif">TIME SLOT</text>
          <text x="125" y="248" fill="#0f172a" fontSize="10" fontWeight="bold" fontFamily="Inter, sans-serif">08:00 AM - 06:00 PM</text>

          {/* Pass ID */}
          <rect x="20" y="262" width="190" height="20" rx="4" fill="#f1f5f9" />
          <text x="115" y="276" fill="#4f46e5" fontSize="9" fontWeight="mono" textAnchor="middle" fontFamily="monospace">PASS_ID: VR-2026-78401</text>
        </g>
        
        <defs>
          <linearGradient id="badgeHeader" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4f46e5" />
            <stop offset="100%" stopColor="#6366f1" />
          </linearGradient>
        </defs>
      </svg>
    );
  }
  
  if (type === 'weighbridge') {
    return (
      <svg viewBox="0 0 500 380" className="w-full h-auto rounded-2xl shadow-2xl border border-slate-800 bg-[#070b15]" xmlns="http://www.w3.org/2000/svg">
        {/* Mac OS Window Controls */}
        <circle cx="25" cy="20" r="5" fill="#ef4444" />
        <circle cx="40" cy="20" r="5" fill="#f59e0b" />
        <circle cx="55" cy="20" r="5" fill="#10b981" />
        <text x="80" y="24" fill="#64748b" fontSize="11" fontFamily="Inter, sans-serif">Smart Weighbridge Indicator & LPR</text>

        {/* LED Scale Display Box */}
        <g transform="translate(25, 55)">
          <rect x="0" y="0" width="190" height="75" rx="8" fill="#0b0f19" stroke="#1e293b" strokeWidth="1.5" />
          <rect x="8" y="8" width="12" height="12" rx="6" fill="#10b981" />
          <text x="25" y="18" fill="#94a3b8" fontSize="9" fontWeight="bold" fontFamily="Inter, sans-serif">WEIGHBRIDGE INDICATOR</text>
          
          {/* Digital LED Weight Display */}
          <rect x="12" y="28" width="166" height="38" rx="4" fill="#05050a" />
          <text x="166" y="58" fill="#ef4444" fontSize="30" fontWeight="bold" fontFamily="monospace" textAnchor="end" letterSpacing="2">24,560</text>
          <text x="14" y="54" fill="#7f1d1d" fontSize="24" fontWeight="bold" fontFamily="monospace" opacity="0.15">88,888</text>
          <text x="14" y="54" fill="#ef4444" fontSize="12" fontWeight="bold" fontFamily="Inter, sans-serif">kg</text>
          <text x="120" y="39" fill="#ef4444" fontSize="9" fontWeight="bold" fontFamily="Inter, sans-serif">STABLE</text>
        </g>

        {/* License Plate Camera feed Box */}
        <g transform="translate(235, 55)">
          <rect x="0" y="0" width="240" height="75" rx="8" fill="#0f172a" stroke="#1e293b" strokeWidth="1.5" />
          <text x="12" y="18" fill="#94a3b8" fontSize="9" fontWeight="bold" fontFamily="Inter, sans-serif">ANPR CAMERA — FRONT LPR</text>
          
          {/* License plate graphic */}
          <rect x="12" y="28" width="216" height="38" rx="6" fill="#1e293b" stroke="#334155" />
          {/* License Plate Sheet */}
          <rect x="48" y="34" width="120" height="26" rx="4" fill="#fef08a" stroke="#ca8a04" strokeWidth="1.5" />
          <text x="108" y="52" fill="#000000" fontSize="16" fontWeight="extrabold" fontFamily="monospace" textAnchor="middle" letterSpacing="1">29C-123.45</text>
          <text x="175" y="52" fill="#34d399" fontSize="10" fontWeight="bold" fontFamily="Inter, sans-serif">99.2%</text>
        </g>

        {/* Weighbridge Platform Schematic */}
        <g transform="translate(25, 150)">
          {/* Scales Platform Base */}
          <rect x="0" y="100" width="450" height="15" rx="4" fill="#334155" stroke="#475569" strokeWidth="1.5" />
          <line x1="20" y1="115" x2="20" y2="135" stroke="#64748b" strokeWidth="3" />
          <line x1="140" y1="115" x2="140" y2="135" stroke="#64748b" strokeWidth="3" />
          <line x1="310" y1="115" x2="310" y2="135" stroke="#64748b" strokeWidth="3" />
          <line x1="430" y1="115" x2="430" y2="135" stroke="#64748b" strokeWidth="3" />

          {/* Scale Load Cells status */}
          <circle cx="20" cy="125" r="4" fill="#10b981" />
          <circle cx="140" cy="125" r="4" fill="#10b981" />
          <circle cx="310" cy="125" r="4" fill="#10b981" />
          <circle cx="430" cy="125" r="4" fill="#10b981" />

          {/* Semi Truck outline */}
          <path d="M 50 100 
                   L 50 60
                   L 260 60
                   L 270 40
                   L 330 40
                   L 350 70
                   L 370 70
                   L 380 100
                   Z" fill="none" stroke="#6366f1" strokeWidth="2.5" strokeLinejoin="round" />
          {/* Truck Wheels */}
          <circle cx="80" cy="100" r="14" fill="#0f172a" stroke="#818cf8" strokeWidth="2" />
          <circle cx="115" cy="100" r="14" fill="#0f172a" stroke="#818cf8" strokeWidth="2" />
          <circle cx="210" cy="100" r="14" fill="#0f172a" stroke="#818cf8" strokeWidth="2" />
          <circle cx="245" cy="100" r="14" fill="#0f172a" stroke="#818cf8" strokeWidth="2" />
          <circle cx="340" cy="100" r="14" fill="#0f172a" stroke="#818cf8" strokeWidth="2" />

          {/* Infrared Anti-cheat Sensors positioning */}
          <line x1="-10" y1="50" x2="5" y2="50" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 3" />
          <rect x="-20" y="42" width="10" height="16" fill="#7f1d1d" />
          <text x="-5" y="35" fill="#ef4444" fontSize="8" fontWeight="bold" fontFamily="Inter, sans-serif">IR SENSOR 1 OK</text>

          <line x1="445" y1="50" x2="460" y2="50" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 3" />
          <rect x="460" y="42" width="10" height="16" fill="#7f1d1d" />
          <text x="400" y="35" fill="#ef4444" fontSize="8" fontWeight="bold" fontFamily="Inter, sans-serif">IR SENSOR 2 OK</text>
          
          {/* Traffic Light */}
          <rect x="410" y="-40" width="18" height="40" rx="4" fill="#1e293b" />
          <circle cx="419" cy="-30" r="4" fill="#ef4444" opacity="0.3" />
          <circle cx="419" cy="-10" r="4" fill="#10b981" className="animate-pulse" />
        </g>
        
        {/* Ticket printing status */}
        <g transform="translate(25, 310)">
          <rect x="0" y="0" width="450" height="50" rx="8" fill="#0f172a" stroke="#1e293b" strokeWidth="1" />
          <text x="15" y="20" fill="#94a3b8" fontSize="10" fontFamily="Inter, sans-serif">WEIGHBRIDGE TRANSACTION STATUS</text>
          <text x="15" y="36" fill="#10b981" fontSize="11" fontWeight="bold" fontFamily="Inter, sans-serif">✓ WEIGHED FIRST (GROSS) • TICKET #WB-20260711-0024</text>
          <text x="350" y="36" fill="#38bdf8" fontSize="10" fontWeight="bold" fontFamily="Inter, sans-serif">TARE RECALL AUTO</text>
        </g>
      </svg>
    );
  }
  
  if (type === 'asset') {
    return (
      <svg viewBox="0 0 500 380" className="w-full h-auto rounded-2xl shadow-2xl border border-slate-800 bg-[#070b15]" xmlns="http://www.w3.org/2000/svg">
        {/* Mac OS Window Controls */}
        <circle cx="25" cy="20" r="5" fill="#ef4444" />
        <circle cx="40" cy="20" r="5" fill="#f59e0b" />
        <circle cx="55" cy="20" r="5" fill="#10b981" />
        <text x="80" y="24" fill="#64748b" fontSize="11" fontFamily="Inter, sans-serif">IT Asset Lifecycle Dashboard</text>

        {/* Asset Details Header Card */}
        <g transform="translate(25, 55)">
          <rect x="0" y="0" width="450" height="90" rx="10" fill="#0f172a" stroke="#1e293b" strokeWidth="1.5" />
          <rect x="15" y="15" width="60" height="60" rx="8" fill="#1e1b4b" stroke="#4f46e5" strokeWidth="1.5" />
          {/* Laptop Schematic */}
          <path d="M 25 35 L 65 35 L 65 60 L 25 60 Z M 20 60 L 70 60 L 70 65 L 20 65 Z" fill="none" stroke="#818cf8" strokeWidth="1.5" />
          
          <text x="90" y="30" fill="#f8fafc" fontSize="13" fontWeight="bold" fontFamily="Inter, sans-serif">Apple MacBook Pro 16&quot; M3</text>
          <text x="90" y="48" fill="#94a3b8" fontSize="10" fontFamily="Inter, sans-serif">TAG NO: </text>
          <text x="135" y="48" fill="#38bdf8" fontSize="10" fontWeight="bold" fontFamily="monospace">IT-LAP-042</text>
          <text x="210" y="48" fill="#94a3b8" fontSize="10" fontFamily="Inter, sans-serif"> | DEPT: </text>
          <text x="250" y="48" fill="#e2e8f0" fontSize="10" fontWeight="bold" fontFamily="Inter, sans-serif">R&D Software</text>
          <text x="320" y="48" fill="#94a3b8" fontSize="10" fontFamily="Inter, sans-serif"> | VALUE: </text>
          <text x="365" y="48" fill="#10b981" fontSize="10" fontWeight="bold" fontFamily="Inter, sans-serif">$2,499.00</text>
          
          <text x="90" y="68" fill="#94a3b8" fontSize="10" fontFamily="Inter, sans-serif">ASSIGNED USER: </text>
          <text x="185" y="68" fill="#f1f5f9" fontSize="10" fontWeight="bold" fontFamily="Inter, sans-serif">Phạm Minh Đức (Developer)</text>
          
          {/* Status Badge */}
          <rect x="365" y="12" width="70" height="20" rx="10" fill="#064e3b" />
          <text x="400" y="25" fill="#34d399" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="Inter, sans-serif">IN USE (ACTIVE)</text>
        </g>

        {/* Lifecycle Flowchart */}
        <g transform="translate(25, 175)">
          <rect x="0" y="0" width="450" height="90" rx="10" fill="#0f172a" stroke="#1e293b" strokeWidth="1.5" />
          <text x="15" y="22" fill="#94a3b8" fontSize="10" fontWeight="bold" fontFamily="Inter, sans-serif">ASSET LIFECYCLE TIMELINE</text>

          {/* Timeline Nodes */}
          {/* Line */}
          <line x1="45" y1="50" x2="405" y2="50" stroke="#1e293b" strokeWidth="4" />
          <line x1="45" y1="50" x2="165" y2="50" stroke="#10b981" strokeWidth="4" />
          <line x1="165" y1="50" x2="285" y2="50" stroke="#4f46e5" strokeWidth="4" />

          {/* Node 1: Procured */}
          <circle cx="45" cy="50" r="10" fill="#10b981" />
          <circle cx="45" cy="50" r="4" fill="#ffffff" />
          <text x="45" y="75" fill="#10b981" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="Inter, sans-serif">Procured</text>
          <text x="45" y="85" fill="#64748b" fontSize="8" textAnchor="middle" fontFamily="Inter, sans-serif">12-Jun-2025</text>

          {/* Node 2: Assigned */}
          <circle cx="165" cy="50" r="10" fill="#10b981" />
          <circle cx="165" cy="50" r="4" fill="#ffffff" />
          <text x="165" y="75" fill="#10b981" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="Inter, sans-serif">Assigned</text>
          <text x="165" y="85" fill="#64748b" fontSize="8" textAnchor="middle" fontFamily="Inter, sans-serif">15-Jun-2025</text>

          {/* Node 3: Maintenance */}
          <circle cx="285" cy="50" r="10" fill="#4f46e5" className="animate-pulse" />
          <circle cx="285" cy="50" r="4" fill="#ffffff" />
          <text x="285" y="75" fill="#818cf8" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="Inter, sans-serif">Audited (OK)</text>
          <text x="285" y="85" fill="#64748b" fontSize="8" textAnchor="middle" fontFamily="Inter, sans-serif">11-Jul-2026</text>

          {/* Node 4: Retired */}
          <circle cx="405" cy="50" r="10" fill="#1e293b" stroke="#334155" strokeWidth="2" />
          <text x="405" y="75" fill="#64748b" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="Inter, sans-serif">Disposal</text>
          <text x="405" y="85" fill="#64748b" fontSize="8" textAnchor="middle" fontFamily="Inter, sans-serif">Pending</text>
        </g>

        {/* Asset Code Scanning Preview */}
        <g transform="translate(25, 290)">
          <rect x="0" y="0" width="450" height="65" rx="8" fill="#0b0f19" stroke="#1e293b" strokeWidth="1" />
          {/* barcode drawing */}
          <rect x="15" y="15" width="100" height="35" fill="#ffffff" rx="2" />
          <rect x="22" y="20" width="3" height="25" fill="#000000" />
          <rect x="28" y="20" width="1" height="25" fill="#000000" />
          <rect x="32" y="20" width="4" height="25" fill="#000000" />
          <rect x="38" y="20" width="2" height="25" fill="#000000" />
          <rect x="44" y="20" width="1" height="25" fill="#000000" />
          <rect x="48" y="20" width="3" height="25" fill="#000000" />
          <rect x="54" y="20" width="5" height="25" fill="#000000" />
          <rect x="62" y="20" width="2" height="25" fill="#000000" />
          <rect x="68" y="20" width="1" height="25" fill="#000000" />
          <rect x="72" y="20" width="4" height="25" fill="#000000" />
          <rect x="78" y="20" width="2" height="25" fill="#000000" />
          <rect x="84" y="20" width="3" height="25" fill="#000000" />
          <rect x="90" y="20" width="1" height="25" fill="#000000" />
          <rect x="94" y="20" width="4" height="25" fill="#000000" />
          {/* Laser scanning line over barcode */}
          <line x1="10" y1="32" x2="120" y2="32" stroke="#ef4444" strokeWidth="2" className="animate-pulse" />
          
          <text x="135" y="28" fill="#f8fafc" fontSize="10" fontWeight="bold" fontFamily="Inter, sans-serif">Mobile Scanner Action Log</text>
          <text x="135" y="44" fill="#38bdf8" fontSize="11" fontWeight="bold" fontFamily="Inter, sans-serif">Barcode scanned successfully. Synced to cloud repository.</text>
        </g>
      </svg>
    );
  }
  
  if (type === 'analytics') {
    return (
      <svg viewBox="0 0 500 380" className="w-full h-auto rounded-2xl shadow-2xl border border-slate-800 bg-[#070b15]" xmlns="http://www.w3.org/2000/svg">
        {/* Mac OS Window Controls */}
        <circle cx="25" cy="20" r="5" fill="#ef4444" />
        <circle cx="40" cy="20" r="5" fill="#f59e0b" />
        <circle cx="55" cy="20" r="5" fill="#10b981" />
        <text x="80" y="24" fill="#64748b" fontSize="11" fontFamily="Inter, sans-serif">Real-time Analytics Dashboard</text>

        {/* Top Metric Cards */}
        {/* Card 1 - On-time Rate */}
        <g transform="translate(25, 55)">
          <rect x="0" y="0" width="138" height="70" rx="8" fill="#0f172a" stroke="#1e293b" strokeWidth="1.5" />
          <text x="12" y="20" fill="#94a3b8" fontSize="9" fontWeight="bold" fontFamily="Inter, sans-serif">ON-TIME ATTENDANCE</text>
          <text x="12" y="44" fill="#f8fafc" fontSize="18" fontWeight="bold" fontFamily="Inter, sans-serif">98.54%</text>
          <text x="12" y="60" fill="#10b981" fontSize="9" fontWeight="bold" fontFamily="Inter, sans-serif">▲ +0.4% vs last week</text>
          {/* tiny sparkline */}
          <path d="M 85 50 Q 95 38, 105 45 T 125 35" fill="none" stroke="#10b981" strokeWidth="1.5" />
        </g>

        {/* Card 2 - Headcount Active */}
        <g transform="translate(181, 55)">
          <rect x="0" y="0" width="138" height="70" rx="8" fill="#0f172a" stroke="#1e293b" strokeWidth="1.5" />
          <text x="12" y="20" fill="#94a3b8" fontSize="9" fontWeight="bold" fontFamily="Inter, sans-serif">HEADCOUNT IN ZONE</text>
          <text x="12" y="44" fill="#38bdf8" fontSize="18" fontWeight="bold" fontFamily="Inter, sans-serif">1,248 / 1,300</text>
          <text x="12" y="60" fill="#38bdf8" fontSize="9" fontWeight="bold" fontFamily="Inter, sans-serif">● 96% Shift Occupancy</text>
        </g>

        {/* Card 3 - Late Count */}
        <g transform="translate(337, 55)">
          <rect x="0" y="0" width="138" height="70" rx="8" fill="#0f172a" stroke="#1e293b" strokeWidth="1.5" />
          <text x="12" y="20" fill="#94a3b8" fontSize="9" fontWeight="bold" fontFamily="Inter, sans-serif">ABSENT / LATE TODAY</text>
          <text x="12" y="44" fill="#ef4444" fontSize="18" fontWeight="bold" fontFamily="Inter, sans-serif">5 / 12</text>
          <text x="12" y="60" fill="#ef4444" fontSize="9" fontWeight="bold" fontFamily="Inter, sans-serif">▼ -2 cases vs yesterday</text>
        </g>

        {/* Central Bar Chart - Weekly Attendance Rates */}
        <g transform="translate(25, 145)">
          <rect x="0" y="0" width="280" height="210" rx="10" fill="#0f172a" stroke="#1e293b" strokeWidth="1.5" />
          <text x="15" y="25" fill="#f8fafc" fontSize="11" fontWeight="bold" fontFamily="Inter, sans-serif">Attendance Statistics (Weekly)</text>
          
          {/* Grid lines */}
          <line x1="40" y1="60" x2="260" y2="60" stroke="#1e293b" strokeWidth="1" />
          <line x1="40" y1="100" x2="260" y2="100" stroke="#1e293b" strokeWidth="1" />
          <line x1="40" y1="140" x2="260" y2="140" stroke="#1e293b" strokeWidth="1" />
          <line x1="40" y1="180" x2="260" y2="180" stroke="#1e293b" strokeWidth="1" />

          {/* Bars */}
          {/* Mon */}
          <rect x="55" y="70" width="16" height="110" rx="3" fill="#4f46e5" />
          <text x="63" y="196" fill="#94a3b8" fontSize="9" textAnchor="middle" fontFamily="Inter, sans-serif">M</text>
          {/* Tue */}
          <rect x="85" y="55" width="16" height="125" rx="3" fill="#4f46e5" />
          <text x="93" y="196" fill="#94a3b8" fontSize="9" textAnchor="middle" fontFamily="Inter, sans-serif">T</text>
          {/* Wed */}
          <rect x="115" y="62" width="16" height="118" rx="3" fill="#6366f1" />
          <text x="123" y="196" fill="#94a3b8" fontSize="9" textAnchor="middle" fontFamily="Inter, sans-serif">W</text>
          {/* Thu */}
          <rect x="145" y="50" width="16" height="130" rx="3" fill="#6366f1" />
          <text x="153" y="196" fill="#94a3b8" fontSize="9" textAnchor="middle" fontFamily="Inter, sans-serif">T</text>
          {/* Fri */}
          <rect x="175" y="58" width="16" height="122" rx="3" fill="#4f46e5" />
          <text x="183" y="196" fill="#94a3b8" fontSize="9" textAnchor="middle" fontFamily="Inter, sans-serif">F</text>
          {/* Sat */}
          <rect x="205" y="110" width="16" height="70" rx="3" fill="#818cf8" />
          <text x="213" y="196" fill="#94a3b8" fontSize="9" textAnchor="middle" fontFamily="Inter, sans-serif">S</text>
          {/* Sun */}
          <rect x="235" y="130" width="16" height="50" rx="3" fill="#818cf8" />
          <text x="243" y="196" fill="#94a3b8" fontSize="9" textAnchor="middle" fontFamily="Inter, sans-serif">S</text>
        </g>

        {/* Side Donut Chart - Shift Distribution */}
        <g transform="translate(320, 145)">
          <rect x="0" y="0" width="155" height="210" rx="10" fill="#0f172a" stroke="#1e293b" strokeWidth="1.5" />
          <text x="15" y="25" fill="#f8fafc" fontSize="11" fontWeight="bold" fontFamily="Inter, sans-serif">Shift Share</text>

          {/* Donut circle */}
          <circle cx="77" cy="95" r="40" fill="none" stroke="#1e293b" strokeWidth="16" />
          <circle cx="77" cy="95" r="40" fill="none" stroke="#4f46e5" strokeWidth="16" strokeDasharray="251.2" strokeDashoffset="75" />
          <circle cx="77" cy="95" r="40" fill="none" stroke="#38bdf8" strokeWidth="16" strokeDasharray="251.2" strokeDashoffset="190" />
          <circle cx="77" cy="95" r="40" fill="none" stroke="#10b981" strokeWidth="16" strokeDasharray="251.2" strokeDashoffset="240" />
          
          <text x="77" y="100" fill="#f8fafc" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="Inter, sans-serif">82%</text>
          
          {/* Legend */}
          <rect x="15" y="152" width="8" height="8" rx="2" fill="#4f46e5" />
          <text x="28" y="159" fill="#94a3b8" fontSize="9" fontFamily="Inter, sans-serif">Day Shift (72%)</text>

          <rect x="15" y="168" width="8" height="8" rx="2" fill="#38bdf8" />
          <text x="28" y="175" fill="#94a3b8" fontSize="9" fontFamily="Inter, sans-serif">Night Shift (18%)</text>

          <rect x="15" y="184" width="8" height="8" rx="2" fill="#10b981" />
          <text x="28" y="191" fill="#94a3b8" fontSize="9" fontFamily="Inter, sans-serif">Office Hours (10%)</text>
        </g>
      </svg>
    );
  }
  
  if (type === 'mobile') {
    return (
      <svg viewBox="0 0 500 380" className="w-full h-auto rounded-2xl shadow-2xl border border-slate-800 bg-[#070b15]" xmlns="http://www.w3.org/2000/svg">
        {/* Mac OS Window Controls */}
        <circle cx="25" cy="20" r="5" fill="#ef4444" />
        <circle cx="40" cy="20" r="5" fill="#f59e0b" />
        <circle cx="55" cy="20" r="5" fill="#10b981" />
        <text x="80" y="24" fill="#64748b" fontSize="11" fontFamily="Inter, sans-serif">Capacitor Mobile Application Portal</text>

        {/* Left Side: App Features list inside console */}
        <g transform="translate(25, 55)">
          <rect x="0" y="0" width="220" height="295" rx="10" fill="#0f172a" stroke="#1e293b" strokeWidth="1.5" />
          <text x="15" y="25" fill="#f8fafc" fontSize="12" fontWeight="bold" fontFamily="Inter, sans-serif">Employee Mobile Hub</text>
          
          <rect x="15" y="45" width="190" height="46" rx="6" fill="#1e1b4b" stroke="#4f46e5" strokeWidth="1" />
          <text x="25" y="63" fill="#818cf8" fontSize="10" fontWeight="bold" fontFamily="Inter, sans-serif">GPS GEOFENCING VALIDATED</text>
          <text x="25" y="78" fill="#e2e8f0" fontSize="10" fontFamily="Inter, sans-serif">Auto-locks location radius: 100m</text>

          <rect x="15" y="103" width="190" height="46" rx="6" fill="#022c22" stroke="#059669" strokeWidth="1" />
          <text x="25" y="121" fill="#34d399" fontSize="10" fontWeight="bold" fontFamily="Inter, sans-serif">AI FACE ON DEVICE</text>
          <text x="25" y="136" fill="#e2e8f0" fontSize="10" fontFamily="Inter, sans-serif">Biometric clock-in in offline mode</text>

          <rect x="15" y="161" width="190" height="46" rx="6" fill="#0f172a" stroke="#1e293b" strokeWidth="1" />
          <text x="25" y="179" fill="#94a3b8" fontSize="10" fontWeight="bold" fontFamily="Inter, sans-serif">REMOTE APPROVALS (OT / LEAVE)</text>
          <text x="25" y="194" fill="#e2e8f0" fontSize="10" fontFamily="Inter, sans-serif">1-Click Manager Decision Dispatch</text>

          {/* App download QR */}
          <rect x="15" y="222" width="55" height="55" rx="4" fill="#ffffff" />
          {/* mock mini QR */}
          <rect x="20" y="27" width="10" height="10" fill="#000000" transform="translate(0, 200)" />
          <rect x="55" y="27" width="10" height="10" fill="#000000" transform="translate(0, 200)" />
          <rect x="20" y="62" width="10" height="10" fill="#000000" transform="translate(0, 200)" />
          <rect x="35" y="42" width="15" height="15" fill="#000000" transform="translate(0, 200)" />
          
          <text x="82" y="244" fill="#f8fafc" fontSize="11" fontWeight="bold" fontFamily="Inter, sans-serif">Scan to Test</text>
          <text x="82" y="260" fill="#94a3b8" fontSize="9" fontFamily="Inter, sans-serif">iOS & Android App Store</text>
        </g>

        {/* Right Side: Virtual Smartphone Frame */}
        <g transform="translate(285, 40)">
          {/* Phone Body */}
          <rect x="0" y="0" width="166" height="320" rx="24" fill="#0b0f19" stroke="#334155" strokeWidth="4" />
          
          {/* Screen area */}
          <rect x="4" y="4" width="158" height="312" rx="20" fill="#070b15" />
          
          {/* Notch */}
          <rect x="43" y="4" width="80" height="14" rx="7" fill="#334155" />
          <circle cx="110" cy="11" r="2.5" fill="#1e293b" />
          
          {/* App Screen Content */}
          <text x="12" y="36" fill="#38bdf8" fontSize="9" fontWeight="bold" fontFamily="Inter, sans-serif">nATime Mobile</text>
          <text x="146" y="36" fill="#94a3b8" fontSize="8" textAnchor="end" fontFamily="Inter, sans-serif">12:13 PM</text>
          
          {/* User Profile Bar */}
          <rect x="12" y="48" width="142" height="36" rx="6" fill="#0f172a" />
          <circle cx="28" cy="66" r="12" fill="#4f46e5" />
          <text x="28" y="70" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="Inter, sans-serif">KN</text>
          <text x="46" y="62" fill="#f8fafc" fontSize="9" fontWeight="bold" fontFamily="Inter, sans-serif">K. Nghĩa</text>
          <text x="46" y="74" fill="#94a3b8" fontSize="8" fontFamily="Inter, sans-serif">ACS Integration Dept</text>

          {/* Map Preview geofencing */}
          <g transform="translate(12, 92)">
            <rect x="0" y="0" width="142" height="85" rx="8" fill="#1e293b" stroke="#334155" strokeWidth="1" />
            {/* grid representing map */}
            <line x1="0" y1="20" x2="142" y2="20" stroke="#334155" strokeWidth="0.5" />
            <line x1="0" y1="40" x2="142" y2="40" stroke="#334155" strokeWidth="0.5" />
            <line x1="0" y1="60" x2="142" y2="60" stroke="#334155" strokeWidth="0.5" />
            <line x1="30" y1="0" x2="30" y2="85" stroke="#334155" strokeWidth="0.5" />
            <line x1="70" y1="0" x2="70" y2="85" stroke="#334155" strokeWidth="0.5" />
            <line x1="110" y1="0" x2="110" y2="85" stroke="#334155" strokeWidth="0.5" />
            
            {/* Geofence Ring */}
            <circle cx="71" cy="42" r="28" fill="#10b981" fillOpacity="0.15" stroke="#10b981" strokeWidth="1.5" strokeDasharray="3 3" />
            <circle cx="71" cy="42" r="4" fill="#10b981" />
            <circle cx="71" cy="42" r="8" fill="none" stroke="#10b981" strokeWidth="1" className="animate-ping" />
            
            {/* User current Pin */}
            <path d="M 66 28 L 76 28 L 71 38 Z" fill="#ef4444" />
            
            <rect x="6" y="65" width="130" height="15" rx="4" fill="#064e3b" fillOpacity="0.8" />
            <text x="71" y="76" fill="#a7f3d0" fontSize="7.5" fontWeight="bold" textAnchor="middle" fontFamily="Inter, sans-serif">✓ Inside GPS Geofence Range</text>
          </g>

          {/* Clock In Button */}
          <g transform="translate(12, 185)">
            <circle cx="71" cy="42" r="34" fill="url(#mobileBtnGrad)" className="animate-pulse" />
            <circle cx="71" cy="42" r="26" fill="#4f46e5" />
            <text x="71" y="41" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="Inter, sans-serif">TAP TO</text>
            <text x="71" y="51" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="Inter, sans-serif">CHECK OUT</text>
          </g>

          {/* Today log summary */}
          <rect x="12" y="275" width="142" height="32" rx="6" fill="#0f172a" />
          <text x="20" y="287" fill="#94a3b8" fontSize="8" fontFamily="Inter, sans-serif">TODAY ATTENDANCE</text>
          <text x="20" y="299" fill="#10b981" fontSize="9" fontWeight="bold" fontFamily="Inter, sans-serif">✓ Clock-in: 08:02 AM (On Time)</text>
        </g>

        <defs>
          <linearGradient id="mobileBtnGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#818cf8" />
            <stop offset="100%" stopColor="#4f46e5" />
          </linearGradient>
        </defs>
      </svg>
    );
  }

  return null;
}

interface FeatureSection {
  id: string;
  badge: { vi: string; en: string };
  title: { vi: string; en: string };
  description: { vi: string; en: string };
  bullets: Array<{ vi: string; en: string }>;
  svgType: string;
}

export default function FeaturesPage() {
  const { t } = useLanguage();
  const [activeSection, setActiveSection] = useState('biometric-attendance');

  const featuresData: FeatureSection[] = [
    {
      id: 'biometric-attendance',
      badge: { vi: '01. Sinh Trắc Học & AI', en: '01. Biometrics & AI' },
      title: { vi: 'Chấm công sinh trắc học & AI', en: 'Biometric & AI Time Attendance' },
      description: {
        vi: 'Chấm công bằng công nghệ sinh trắc học và AI tiên tiến, nhận diện khuôn mặt chính xác dưới 0.5 giây ngay cả khi đeo khẩu trang, ngăn chặn triệt để tình trạng chấm công hộ.',
        en: 'Attendance tracking powered by advanced biometric and AI technology, facial recognition accurate within 0.5s even with masks, preventing attendance fraud.'
      },
      bullets: [
        { vi: 'Nhận diện khuôn mặt AI (Face Recognition) với độ chính xác 99.8%.', en: 'AI Facial Recognition with 99.8% precision rate.' },
        { vi: 'Thuật toán chống giả mạo sinh trắc học (Anti-spoofing) bằng ảnh chụp hoặc video.', en: 'Anti-spoofing algorithm to block photo or video spoofing attempts.' },
        { vi: 'Tích hợp chấm công vân tay, mống mắt, thẻ từ RFID và mã QR.', en: 'Integrated fingerprint, iris scanning, RFID card, and QR code check-ins.' },
        { vi: 'Hỗ trợ chấm công GPS và Geofencing trên ứng dụng di động của nhân viên.', en: 'Supports GPS and Geofencing attendance on employee mobile applications.' }
      ],
      svgType: 'biometric'
    },
    {
      id: 'access-control',
      badge: { vi: '02. Kiểm Soát Cổng Ra Vào', en: '02. Gate Access Control' },
      title: { vi: 'Kiểm soát cửa & Cổng kiểm soát ra vào', en: 'Access Control & Gate Control' },
      description: {
        vi: 'Hệ thống kiểm soát cửa ra vào và cổng phân làn (turnstiles/flap barriers) tự động, phân quyền truy cập chi tiết cho từng nhân sự và khu vực nhạy cảm.',
        en: 'Automated entry door and gate control system (turnstiles/flap barriers), providing fine-grained access permissions for personnel in sensitive zones.'
      },
      bullets: [
        { vi: 'Phân quyền ra vào linh hoạt theo khung giờ (Timezones) và nhóm người dùng.', en: 'Flexible access scheduling based on timezones and user groups.' },
        { vi: 'Giám sát trạng thái cửa/cổng thời gian thực (Đang đóng, đang mở, cảnh báo mở quá lâu).', en: 'Real-time monitoring of door/gate status (Closed, Open, Forced-open alarm).' },
        { vi: 'Tự động mở toàn bộ cổng khi xảy ra sự cố khẩn cấp hoặc báo cháy (Fire integration).', en: 'Auto-release all gates during emergency evacuations or fire alarms.' },
        { vi: 'Chế độ Anti-passback ngăn chặn việc quay vòng thẻ hoặc đi theo đuôi (tailgating).', en: 'Anti-passback mode to prevent card sharing or tailgating entry.' }
      ],
      svgType: 'access'
    },
    {
      id: 'device-management',
      badge: { vi: '03. Quản Lý Thiết Bị', en: '03. Device Management' },
      title: { vi: 'Quản lý đồng bộ thiết bị (Hikvision, ZKTeco)', en: 'Unified Device Management (Hikvision, ZKTeco)' },
      description: {
        vi: 'Kết nối trực tiếp và đồng bộ dữ liệu tập trung với hàng ngàn thiết bị camera AI, máy nhận diện khuôn mặt và máy chấm công từ các thương hiệu hàng đầu như Hikvision, ZKTeco.',
        en: 'Directly connect and centrally synchronize data with thousands of AI cameras, facial recognition terminals, and time attendance devices from top brands like Hikvision and ZKTeco.'
      },
      bullets: [
        { vi: 'Tự động đồng bộ hồ sơ nhân viên, khuôn mặt, vân tay xuống thiết bị đầu cuối chỉ trong vài giây.', en: 'Instantly sync employee profiles, facial templates, and fingerprints to terminal devices in seconds.' },
        { vi: 'Thu thập dữ liệu quẹt thẻ/nhận diện (Transaction logs) theo thời gian thực từ xa.', en: 'Remotely gather card swipes and recognition logs (transactions) in real time.' },
        { vi: 'Giám sát trạng thái hoạt động (Online/Offline) và điều khiển thiết bị (Restart, Open Gate) từ xa.', en: 'Monitor online/offline health status and control devices (reboot, open gate) remotely.' },
        { vi: 'Hỗ trợ kết nối qua Cloud, LAN hoặc giao thức bảo mật HTTPS/WSS.', en: 'Supports Cloud connection, LAN, or HTTPS/WSS secure protocols.' }
      ],
      svgType: 'device'
    },
    {
      id: 'visitor-contractor',
      badge: { vi: '04. Nhà Thầu & Khách', en: '04. Contractor & Visitor' },
      title: { vi: 'Quản lý Nhân sự nhà thầu & Khách vãng lai', en: 'Contractor & Visitor Management' },
      description: {
        vi: 'Tối ưu hóa quy trình đăng ký, phê duyệt và giám sát hoạt động của các nhà thầu và khách ghé thăm doanh nghiệp, đảm bảo an ninh tuyệt đối cho nhà máy và văn phòng.',
        en: 'Streamline the registration, approval, and monitoring workflows for contractors and visitors, ensuring maximum security for factories and offices.'
      },
      bullets: [
        { vi: 'Đăng ký trước thông tin khách (Pre-registration) qua cổng thông tin Web portal.', en: 'Pre-register visitor information easily through a dedicated Web portal.' },
        { vi: 'Tự động quét và trích xuất thông tin từ CCCD/Hộ chiếu bằng công nghệ OCR.', en: 'Auto-scan and extract data from ID/Passport using advanced OCR technology.' },
        { vi: 'Cấp thẻ khách/mã QR dùng một lần hoặc có giới hạn thời gian truy cập.', en: 'Issue temporary QR codes or guest cards with strict expiry periods.' },
        { vi: 'Quản lý hồ sơ an toàn lao động, chứng chỉ của nhân sự nhà thầu trước khi vào công trình.', en: 'Manage labor safety records and training certificates for contractors before entry.' }
      ],
      svgType: 'visitor'
    },
    {
      id: 'weighbridge',
      badge: { vi: '05. Trạm Cân Xe Tự Động', en: '05. Weighbridge Station' },
      title: { vi: 'Trạm cân xe tự động hóa', en: 'Automated Weighbridge Station' },
      description: {
        vi: 'Giải pháp trạm cân ô tô tự động hóa hoàn toàn, kết hợp camera nhận diện biển số (ANPR), cảm biến chống gian lận vị trí và rào chắn thông minh.',
        en: 'Fully automated truck weighbridge solution, integrating Automatic Number Plate Recognition (ANPR) cameras, anti-cheat position sensors, and smart barriers.'
      },
      bullets: [
        { vi: 'Tự động nhận diện biển số xe (ANPR) chính xác 98% trong mọi điều kiện thời tiết.', en: 'AI-powered license plate recognition (ANPR) with 98% accuracy in all weather conditions.' },
        { vi: 'Hệ thống cảm biến hồng ngoại (IR) xác định vị trí đỗ xe chuẩn trên bàn cân.', en: 'Infrared (IR) sensor grid ensuring correct vehicle positioning on the scale.' },
        { vi: 'Tự động cân 2 lần (Gross/Tare) để tính toán khối lượng tịnh (Net Weight).', en: 'Automated double-weighing (Gross/Tare) to calculate the exact Net Weight.' },
        { vi: 'Chụp ảnh xe và tài xế, in phiếu cân có mã QR bảo mật để chống làm giả.', en: 'Capture vehicle/driver snapshots and print secure QR-coded weight receipts.' }
      ],
      svgType: 'weighbridge'
    },
    {
      id: 'asset-management',
      badge: { vi: '06. Tài Sản CNTT', en: '06. IT Asset Management' },
      title: { vi: 'Quản lý vòng đời tài sản CNTT', en: 'IT Asset Lifecycle Management' },
      description: {
        vi: 'Quản lý và theo dõi chặt chẽ mọi thiết bị phần cứng, phần mềm từ lúc mua sắm, bàn giao sử dụng, bảo dưỡng định kỳ cho đến khi thanh lý.',
        en: 'Track and manage every hardware and software asset from procurement, assignment, routine maintenance, to eventual retirement and disposal.'
      },
      bullets: [
        { vi: 'Quét mã QR/Barcode dán nhãn tài sản để cập nhật thông tin nhanh chóng trên di động.', en: 'Scan QR/Barcode asset labels for quick record lookups and mobile updates.' },
        { vi: 'Ghi nhận lịch sử bàn giao tài sản, ký biên bản bàn giao điện tử (e-sign).', en: 'Maintain full ownership logs with electronic sign-offs for handovers.' },
        { vi: 'Lập kế hoạch bảo trì, bảo dưỡng định kỳ, cảnh báo tài sản sắp hết hạn bảo hành.', en: 'Schedule periodic maintenance audits and receive expiring warranty alerts.' },
        { vi: 'Tự động tính khấu hao tài sản và báo cáo tình trạng sử dụng toàn doanh nghiệp.', en: 'Automatically calculate asset depreciation and run comprehensive utilization audits.' }
      ],
      svgType: 'asset'
    },
    {
      id: 'analytics-reports',
      badge: { vi: '07. Báo Cáo & Phân Tích', en: '07. Reports & Analytics' },
      title: { vi: 'Báo cáo & Phân tích thời gian thực', en: 'Real-time Reports & Analytics' },
      description: {
        vi: 'Cung cấp hệ thống báo cáo đa dạng, biểu đồ trực quan giúp nhà quản trị theo dõi sát sao tình hình đi muộn, về sớm, nghỉ phép và công suất lao động tức thời.',
        en: 'Deliver rich reporting suites and interactive dashboard widgets for tracking late arrivals, early leaves, leaves of absence, and real-time operational capacity.'
      },
      bullets: [
        { vi: 'Báo cáo chấm công tự động xuất ra Excel, PDF, CSV định kỳ theo ngày/tuần/tháng.', en: 'Generate automatic attendance reports in Excel, PDF, and CSV formats daily/weekly/monthly.' },
        { vi: 'Biểu đồ Dashboard trực quan hóa tỉ lệ chuyên cần và phân bổ nhân sự theo ca.', en: 'Visual dashboards displaying attendance rates, overtime distributions, and shift coverage.' },
        { vi: 'Xuất dữ liệu bảng công thô tích hợp trực tiếp với các phần mềm ERP/Payroll lớn (SAP, Oracle).', en: 'Raw timesheet data outputs with direct pipelines to major ERP/Payroll software (SAP, Oracle).' },
        { vi: 'Gửi cảnh báo đi trễ, vắng mặt đột xuất qua Email/SMS/Telegram cho quản lý.', en: 'Dispatch immediate late-arrival or unexplained absence alerts via Email, SMS, or Telegram.' }
      ],
      svgType: 'analytics'
    },
    {
      id: 'mobile-app',
      badge: { vi: '08. Ứng Dụng Mobile', en: '08. Mobile App' },
      title: { vi: 'Ứng dụng mobile Capacitor tiện lợi', en: 'Convenient Capacitor Mobile App' },
      description: {
        vi: 'Ứng dụng di động đa nền tảng được phát triển trên Capacitor (iOS & Android) giúp nhân viên tự chấm công và quản lý ngày phép cá nhân nhanh chóng.',
        en: 'Cross-platform mobile app built on Capacitor (iOS & Android) enabling employees to clock in/out, view timesheets, and manage personal leaves on the go.'
      },
      bullets: [
        { vi: 'Chấm công di động bằng nhận diện khuôn mặt kết hợp định vị GPS trong phạm vi cho phép.', en: 'Mobile check-in using facial recognition matched with secure GPS geofencing radius.' },
        { vi: 'Đăng ký xin nghỉ phép, làm thêm giờ (OT), giải trình công trực tuyến trên app.', en: 'Submit leave requests, overtime (OT) claims, and timesheet adjustments directly.' },
        { vi: 'Phê duyệt đơn từ trực tiếp từ xa dành cho cấp quản lý chỉ bằng 1 chạm.', en: 'Managers review, approve, or reject employee requests with a single tap.' },
        { vi: 'Nhận thông báo đẩy (Push notifications) tức thời về ca làm việc và bảng công hàng tháng.', en: 'Receive real-time push notifications for shift rosters and monthly payroll summaries.' }
      ],
      svgType: 'mobile'
    }
  ];

  // Set up intersection observer to track which section is currently scrolled into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-30% 0px -50% 0px',
        threshold: 0.1
      }
    );

    featuresData.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 140; // sticky bar height + header spacing
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveSection(id);
    }
  };

  return (
    <>
      <Navbar />
      <main className="flex-1 w-full bg-background text-foreground pt-16">
        {/* Top Header Banner Gradient */}
        <section className="relative overflow-hidden bg-slate-950 text-white py-20 lg:py-28">
          {/* Decorative gradients */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/80 via-slate-950 to-indigo-950/70 z-0" />
          <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-indigo-500/10 blur-[120px] z-0" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-violet-500/10 blur-[100px] z-0" />
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
            {/* Breadcrumb Path */}
            <div className="flex items-center gap-2 text-sm text-slate-400 mb-6">
              <Link href="/" className="hover:text-primary transition-colors">
                {t('Trang chủ', 'Home')}
              </Link>
              <span>/</span>
              <span className="text-slate-200">{t('Tính năng chi tiết', 'Detailed Features')}</span>
            </div>

            {/* Title & Description */}
            <div className="max-w-3xl">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
                <span className="text-gradient block">{t('Tính năng chi tiết', 'Detailed Features')}</span>
              </h1>
              <p className="text-lg sm:text-xl text-slate-300 leading-relaxed">
                {t(
                  'Khám phá chiều sâu công nghệ và giải pháp quản lý toàn diện từ nATime. Nền tảng được tối ưu hóa cho môi trường vận hành quy mô doanh nghiệp.',
                  'Explore the depth of technology and comprehensive management solutions from nATime. A platform optimized for enterprise-scale operational environments.'
                )}
              </p>
            </div>
          </div>
        </section>

        {/* Sticky Sub-navigation Bar */}
        <div className="sticky top-16 z-30 bg-background/80 backdrop-blur-md border-b border-border/80 shadow-sm transition-all duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between gap-4 overflow-x-auto py-3 no-scrollbar">
              <div className="flex items-center gap-2 md:gap-3 whitespace-nowrap">
                {featuresData.map((feature) => (
                  <button
                    key={feature.id}
                    onClick={() => handleScrollTo(feature.id)}
                    className={`px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm font-medium rounded-full transition-all cursor-pointer ${
                      activeSection === feature.id
                        ? 'bg-primary text-white shadow-md shadow-primary/20 scale-[1.02]'
                        : 'bg-card hover:bg-card-hover text-muted hover:text-foreground border border-border/80'
                    }`}
                  >
                    {t(feature.badge.vi, feature.badge.en)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Sections (Alternating Layout) */}
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 md:space-y-36">
            {featuresData.map((feature, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div
                  key={feature.id}
                  id={feature.id}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center scroll-mt-36"
                >
                  {/* Text Details Container */}
                  <div
                    className={`lg:col-span-5 space-y-6 order-1 ${
                      isEven ? 'lg:order-1' : 'lg:order-2'
                    }`}
                  >
                    <span className="inline-block px-3.5 py-1 text-xs font-semibold tracking-wider text-primary bg-primary-light dark:bg-primary-light/10 rounded-full">
                      {t(feature.badge.vi, feature.badge.en)}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                      {t(feature.title.vi, feature.title.en)}
                    </h2>
                    <p className="text-base text-muted leading-relaxed">
                      {t(feature.description.vi, feature.description.en)}
                    </p>
                    
                    {/* Bullet list */}
                    <ul className="space-y-3 pt-2">
                      {feature.bullets.map((bullet, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-3">
                          <span className="flex-shrink-0 mt-1 h-5 w-5 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          </span>
                          <span className="text-sm text-foreground/95">{t(bullet.vi, bullet.en)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* SVG Mock Illustration Container */}
                  <div
                    className={`lg:col-span-7 order-2 ${
                      isEven ? 'lg:order-2' : 'lg:order-1'
                    }`}
                  >
                    <div className="relative group overflow-hidden rounded-2xl bg-slate-900/5 p-2 dark:bg-slate-950/20 border border-border/50 shadow-xl transition-all duration-500 hover:shadow-2xl hover:border-primary/20">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl opacity-10 group-hover:opacity-20 blur transition duration-500" />
                      <div className="relative rounded-2xl overflow-hidden">
                        <FeatureSvg type={feature.svgType} />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Global CTA Section */}
        <section className="bg-slate-950 text-white py-16 lg:py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/60 to-slate-950" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-indigo-500/10 rounded-full blur-[120px]" />
          
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              {t(
                'Sẵn sàng tối ưu hóa quản lý cho doanh nghiệp của bạn?',
                'Ready to optimize operations for your business?'
              )}
            </h2>
            <p className="text-slate-300 max-w-2xl mx-auto text-base sm:text-lg">
              {t(
                'Liên hệ với đội ngũ chuyên gia nATime để được tư vấn thiết kế giải pháp và demo trực tiếp các tính năng phù hợp nhất với mô hình của bạn.',
                'Contact our nATime experts for tailor-made solution consulting and a live feature demonstration suited for your business model.'
              )}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="#contact"
                className="px-6 py-3.5 bg-primary text-white text-sm font-semibold rounded-lg shadow-lg hover:bg-primary-hover hover:scale-[1.02] transition-all cursor-pointer"
              >
                {t('Yêu cầu Demo ngay', 'Request Demo Now')}
              </a>
              <Link
                href="/"
                className="px-6 py-3.5 bg-white/10 hover:bg-white/15 text-white text-sm font-semibold rounded-lg transition-all cursor-pointer border border-white/10"
              >
                {t('Quay lại Trang chủ', 'Back to Home')}
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
