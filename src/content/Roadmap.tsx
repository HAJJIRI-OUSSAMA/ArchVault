'use client';
import React from 'react';

const roadmapItems = [
    { level: 'beginner', title: 'Software Engineering Foundations', desc: 'What is engineering? Mindset, trade-offs, complexity management, technical debt.' },
    { level: 'beginner', title: 'Programming Paradigms & Clean Code', desc: 'OOP, functional basics, SOLID principles, readability, naming conventions.' },
    { level: 'intermediate', title: 'Design Patterns', desc: 'Creational, Structural, Behavioral patterns. DI, IoC, Composition over Inheritance.' },
    { level: 'intermediate', title: 'Architecture & System Design', desc: 'Monolith, Microservices, Clean Architecture, Hexagonal, Event-Driven, CQRS, DDD.' },
    { level: 'intermediate', title: 'Databases & Data Modeling', desc: 'SQL vs NoSQL, indexing, transactions, sharding, replication, event sourcing.' },
    { level: 'advanced', title: 'Distributed Systems', desc: 'CAP theorem, consistency models, scaling, resilience patterns, Kafka, Redis, K8s.' },
    { level: 'advanced', title: 'DevOps & Production Engineering', desc: 'CI/CD, deployment strategies, IaC, observability, SRE principles.' },
    { level: 'advanced', title: 'Security Engineering', desc: 'OWASP Top 10, OAuth2, JWT, RBAC, Zero Trust, threat modeling.' },
];

export default function Roadmap() {
    return (
        <section className="section" id="roadmap">
            <div className="section-header">
                <div className="section-number">Learning Path</div>
                <h2>Engineering Roadmap</h2>
            </div>
            <p>Follow this progressive learning path from foundational concepts to advanced production engineering. Each stage builds on the previous, creating a solid understanding of professional software engineering.</p>
            <div className="roadmap">
                <div className="roadmap-track" />
                {roadmapItems.map((item, i) => (
                    <div className="roadmap-item" key={i}>
                        <div className={`roadmap-dot ${item.level}`} />
                        <div className="roadmap-content">
                            <span className={`roadmap-level ${item.level}`}>{item.level}</span>
                            <h4>{item.title}</h4>
                            <p>{item.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
