'use client';
import React from 'react';
import MermaidDiagram from '@/components/MermaidDiagram';

export default function Foundations() {
    return (
        <section className="section" id="foundations">
            <div className="section-header">
                <div className="section-number">Module 01</div>
                <h2>Software Engineering Foundations</h2>
            </div>

            {/* What is Software Engineering */}
            <div id="foundations-what">
                <h3>What is Software Engineering?</h3>
                <p>
                    Software engineering is the <strong>systematic application of engineering principles</strong> to the
                    design, development, testing, deployment, and maintenance of software. Unlike ad-hoc coding,
                    engineering implies discipline, repeatability, and a focus on long-term quality.
                </p>
                <p>
                    The IEEE defines software engineering as: <em>&quot;The application of a systematic, disciplined,
                        quantifiable approach to the development, operation, and maintenance of software.&quot;</em>
                </p>

                <div className="card">
                    <div className="card-header">
                        <div className="card-icon accent">👨‍💻</div>
                        <div className="card-title">Developer vs Engineer</div>
                    </div>
                    <div className="comparison-table-wrapper">
                        <table className="comparison-table">
                            <thead>
                                <tr>
                                    <th>Aspect</th>
                                    <th>Developer</th>
                                    <th>Engineer</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr><td><strong>Focus</strong></td><td>Building features, writing code</td><td>Designing systems, solving problems at scale</td></tr>
                                <tr><td><strong>Scope</strong></td><td>Individual components or tasks</td><td>End-to-end system lifecycle</td></tr>
                                <tr><td><strong>Trade-offs</strong></td><td>Often implicit</td><td>Explicitly analyzed and documented</td></tr>
                                <tr><td><strong>Quality</strong></td><td>&quot;Does it work?&quot;</td><td>&quot;Will it work at scale, under failure, over time?&quot;</td></tr>
                                <tr><td><strong>Mindset</strong></td><td>Solution-oriented</td><td>Problem-oriented with constraints awareness</td></tr>
                                <tr><td><strong>Time horizon</strong></td><td>Current sprint/release</td><td>Multi-year system evolution</td></tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="callout tip">
                        <strong>Key insight:</strong> The difference is not about titles — it&apos;s about mindset. An engineer
                        thinks about the <em>entire system lifecycle</em>, not just the current ticket.
                    </div>
                </div>
            </div>

            {/* Engineering Mindset */}
            <div id="foundations-mindset">
                <h3>The Engineering Mindset</h3>
                <p>
                    Professional software engineering is governed by a set of core quality attributes that must be
                    balanced against each other. There is rarely a &quot;perfect&quot; solution — only appropriate trade-offs
                    for a given context.
                </p>

                <MermaidDiagram
                    chart={`graph TD
    A["Engineering Mindset"] --> B["Scalability"]
    A --> C["Reliability"]
    A --> D["Maintainability"]
    A --> E["Cost Awareness"]
    A --> F["Security"]
    B --> G["Can the system handle 10x load?"]
    C --> H["Does it work under failure?"]
    D --> I["Can a new engineer understand it?"]
    E --> J["Is the cost proportional to value?"]
    F --> K["Is it secure by design?"]
    style A fill:#6366f1,stroke:#4f46e5,color:#fff
    style B fill:#10b981,stroke:#059669,color:#fff
    style C fill:#f59e0b,stroke:#d97706,color:#fff
    style D fill:#3b82f6,stroke:#2563eb,color:#fff
    style E fill:#8b5cf6,stroke:#7c3aed,color:#fff
    style F fill:#ef4444,stroke:#dc2626,color:#fff`}
                    caption="Fig 1.1 — The five pillars of engineering thinking"
                />

                <h4>Scalability</h4>
                <p>
                    A system&apos;s ability to handle increased load — whether more users, more data, or more
                    throughput — without degrading performance. Scalability is not just &quot;adding more servers&quot;;
                    it requires architectural decisions about data partitioning, statelessness, caching strategies,
                    and asynchronous processing.
                </p>
                <p>
                    <strong>Vertical scaling</strong> (bigger machines) hits physical limits. <strong>Horizontal scaling</strong> (more
                    machines) introduces distribution complexity. The choice depends on cost, latency requirements,
                    and data consistency needs.
                </p>

                <h4>Reliability</h4>
                <p>
                    The system should continue to work correctly even when things go wrong — hardware faults,
                    software bugs, human errors. Reliability engineering involves redundancy, graceful degradation,
                    fault isolation, and chaos engineering practices.
                </p>
                <p>
                    As described in <em>Designing Data-Intensive Applications</em> (Martin Kleppmann): <em>&quot;The things
                        that can go wrong are called faults, and systems that anticipate faults and can cope with
                        them are called fault-tolerant or resilient.&quot;</em>
                </p>

                <h4>Maintainability</h4>
                <p>
                    The majority of software cost is in ongoing maintenance, not initial development. Maintainability
                    encompasses <strong>operability</strong> (easy for ops teams to run), <strong>simplicity</strong> (manageable
                    complexity), and <strong>evolvability</strong> (easy to make changes). Good engineering minimizes
                    accidental complexity while managing essential complexity.
                </p>

                <h4>Cost Awareness</h4>
                <p>
                    Engineering decisions have financial consequences. Over-engineering wastes resources;
                    under-engineering creates tech debt. A professional engineer considers cloud costs, team
                    velocity impact, operational overhead, and opportunity cost when making architectural decisions.
                </p>
            </div>

            {/* Trade-offs & Complexity */}
            <div id="foundations-tradeoffs">
                <h3>Trade-offs & Complexity Management</h3>
                <p>
                    Every engineering decision is a trade-off. There is no silver bullet. The mark of a senior
                    engineer is the ability to identify, articulate, and reason about trade-offs transparently.
                </p>

                <MermaidDiagram
                    chart={`graph LR
    A["Consistency"] <-->|"Trade-off"| B["Availability"]
    C["Simplicity"] <-->|"Trade-off"| D["Flexibility"]
    E["Performance"] <-->|"Trade-off"| F["Readability"]
    G["Speed of Delivery"] <-->|"Trade-off"| H["Code Quality"]
    style A fill:#6366f1,stroke:#4f46e5,color:#fff
    style B fill:#10b981,stroke:#059669,color:#fff
    style C fill:#f59e0b,stroke:#d97706,color:#fff
    style D fill:#3b82f6,stroke:#2563eb,color:#fff
    style E fill:#8b5cf6,stroke:#7c3aed,color:#fff
    style F fill:#ef4444,stroke:#dc2626,color:#fff
    style G fill:#ec4899,stroke:#db2777,color:#fff
    style H fill:#14b8a6,stroke:#0d9488,color:#fff`}
                    caption="Fig 1.2 — Common engineering trade-off pairs"
                />

                <h4>Essential vs Accidental Complexity</h4>
                <p>
                    <strong>Essential complexity</strong> is inherent in the problem domain — you can&apos;t remove it without
                    changing the problem. <strong>Accidental complexity</strong> is introduced by our tools, frameworks,
                    and design choices. Good engineering minimizes accidental complexity.
                </p>
                <p>
                    Fred Brooks articulated this in <em>&quot;No Silver Bullet&quot;</em> (1986): the hard part of software is
                    the conceptual structuring, not the representation in code.
                </p>

                <div className="callout info">
                    <strong>Practical framework for trade-off decisions:</strong><br />
                    1. <strong>Identify</strong> the competing quality attributes<br />
                    2. <strong>Quantify</strong> the impact of each option (latency, cost, dev time)<br />
                    3. <strong>Document</strong> the decision and rationale (ADR — Architecture Decision Record)<br />
                    4. <strong>Revisit</strong> when context changes (new scale, new requirements)
                </div>
            </div>

            {/* Technical Debt */}
            <div id="foundations-debt">
                <h3>Technical Debt</h3>
                <p>
                    Coined by Ward Cunningham, technical debt is the implied cost of future rework caused by
                    choosing a quick, limited solution now instead of a better approach that would take longer.
                </p>

                <MermaidDiagram
                    chart={`quadrantChart
    title Technical Debt Quadrant (Martin Fowler)
    x-axis Inadvertent --> Deliberate
    y-axis Reckless --> Prudent
    "We didn't know about patterns": [0.25, 0.25]
    "We must ship now, deal with consequences": [0.75, 0.25]
    "Now we know how we should have done it": [0.25, 0.75]
    "We know the trade-off, will fix post-launch": [0.75, 0.75]`}
                    caption="Fig 1.3 — The Technical Debt Quadrant (Martin Fowler)"
                />

                <h4>Managing Technical Debt</h4>
                <ul>
                    <li><strong>Track it explicitly</strong> — maintain a debt register with estimated cost-to-fix and interest (impact over time).</li>
                    <li><strong>Allocate capacity</strong> — dedicate 15-20% of each sprint to debt reduction.</li>
                    <li><strong>Prevent reckless debt</strong> — code reviews, linting, architectural fitness functions.</li>
                    <li><strong>Pay strategically</strong> — prioritize debt in high-change areas (the codebase &quot;hot spots&quot;).</li>
                    <li><strong>Make it visible</strong> — use metrics: cyclomatic complexity, coupling, code churn.</li>
                </ul>

                <div className="callout warning">
                    <strong>Warning:</strong> Not all debt is bad. <em>Prudent, deliberate</em> debt (shipping with known shortcuts
                    for time-to-market) is a valid business strategy — as long as you plan to pay it back and
                    understand the &quot;interest rate&quot; (growing maintenance cost over time).
                </div>
            </div>
        </section>
    );
}
