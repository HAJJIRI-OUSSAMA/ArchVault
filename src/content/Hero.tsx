'use client';
import React from 'react';

export default function Hero() {
    return (
        <section className="hero" id="hero">
            <div className="hero-shapes">
                <div className="hero-shape" />
                <div className="hero-shape" />
                <div className="hero-shape" />
            </div>
            <div className="hero-content">
                <div className="hero-badge">📘 Complete Reference Guide</div>
                <h1>Software Engineering<br />From First Principles</h1>
                <p>
                    A comprehensive, architect-level knowledge base covering everything from engineering
                    fundamentals to distributed systems, security, and production-grade DevOps — structured
                    as a progressive curriculum for aspiring professional engineers.
                </p>
                <div className="hero-stats">
                    <div className="hero-stat">
                        <div className="hero-stat-value">7</div>
                        <div className="hero-stat-label">Knowledge Domains</div>
                    </div>
                    <div className="hero-stat">
                        <div className="hero-stat-value">40+</div>
                        <div className="hero-stat-label">Architecture Diagrams</div>
                    </div>
                    <div className="hero-stat">
                        <div className="hero-stat-value">50+</div>
                        <div className="hero-stat-label">Code Examples</div>
                    </div>
                    <div className="hero-stat">
                        <div className="hero-stat-value">∞</div>
                        <div className="hero-stat-label">Trade-off Analyses</div>
                    </div>
                </div>
            </div>
        </section>
    );
}
