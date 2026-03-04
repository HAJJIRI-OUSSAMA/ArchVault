'use client';
import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';
import Hero from '@/content/Hero';
import Roadmap from '@/content/Roadmap';
import Foundations from '@/content/Foundations';
import Architecture from '@/content/Architecture';
import DesignPatterns from '@/content/DesignPatterns';
import DistributedSystems from '@/content/DistributedSystems';
import Databases from '@/content/Databases';
import DevOps from '@/content/DevOps';
import Security from '@/content/Security';

export default function HomePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const sectionIds = [
      'hero', 'roadmap',
      'foundations-what', 'foundations-mindset', 'foundations-tradeoffs', 'foundations-debt',
      'arch-monolith', 'arch-clean', 'arch-hexagonal', 'arch-layered', 'arch-event', 'arch-cqrs', 'arch-ddd', 'arch-gateway',
      'patterns-creational', 'patterns-structural', 'patterns-behavioral', 'patterns-di', 'patterns-composition',
      'dist-cap', 'dist-consistency', 'dist-scaling', 'dist-resilience', 'dist-tools',
      'db-sql-nosql', 'db-indexing', 'db-transactions', 'db-scaling', 'db-eventsourcing',
      'devops-cicd', 'devops-deploy', 'devops-iac', 'devops-observability', 'devops-sre',
      'sec-owasp', 'sec-auth', 'sec-oauth', 'sec-rbac', 'sec-zerotrust',
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter(e => e.isIntersecting);
        if (visible.length > 0) {
          // Pick the one closest to top
          const top = visible.reduce((a, b) =>
            a.boundingClientRect.top < b.boundingClientRect.top ? a : b
          );
          setActiveSection(top.target.id);
        }
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="app-layout">
      <Sidebar
        activeSection={activeSection}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <main className="main-content">
        <Navbar onMenuToggle={() => setSidebarOpen((o) => !o)} />
        <div className="content-wrapper">
          <Hero />
          <Roadmap />
          <Foundations />
          <Architecture />
          <DesignPatterns />
          <DistributedSystems />
          <Databases />
          <DevOps />
          <Security />
          <footer className="footer">
            <p>Software Engineering Documentation · Built as a progressive learning resource</p>
            <p style={{ marginTop: '4px' }}>
              References: Clean Architecture (Robert C. Martin) · Designing Data-Intensive Applications (Martin Kleppmann) · OWASP Foundation · Google SRE Book
            </p>
          </footer>
        </div>
      </main>
    </div>
  );
}
