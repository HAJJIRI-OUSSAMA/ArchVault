'use client';
import React from 'react';
import MermaidDiagram from '@/components/MermaidDiagram';
import CodeBlock from '@/components/CodeBlock';

export default function Architecture() {
    return (
        <section className="section" id="architecture">
            <div className="section-header">
                <div className="section-number">Module 02</div>
                <h2>Architecture &amp; System Design</h2>
            </div>
            <p>Architecture defines how a system is structured, how components interact, and how quality attributes are achieved. The right architecture depends on team size, expected scale, deployment environment, and business constraints. References: <em>Clean Architecture</em> (Robert C. Martin), <em>Designing Data-Intensive Applications</em> (Martin Kleppmann).</p>

            {/* Monolith vs Microservices */}
            <div id="arch-monolith">
                <h3>Monolith vs Microservices</h3>
                <p>The most fundamental architectural decision is how to decompose a system. A <strong>monolith</strong> deploys as a single unit; <strong>microservices</strong> decompose into independently deployable services. A <strong>modular monolith</strong> is a pragmatic middle ground — a single deployable with well-defined internal module boundaries.</p>

                <MermaidDiagram chart={`graph TB
    subgraph Monolith
      A["Single Deployable"] --> B["UI Layer"]
      A --> C["Business Logic"]
      A --> D["Data Layer"]
      D --> E["Single DB"]
    end
    subgraph Microservices
      F["API Gateway"] --> G["User Service"]
      F --> H["Order Service"]
      F --> I["Payment Service"]
      G --> J["User DB"]
      H --> K["Order DB"]
      I --> L["Payment DB"]
    end
    style A fill:#6366f1,stroke:#4f46e5,color:#fff
    style F fill:#10b981,stroke:#059669,color:#fff`}
                    caption="Fig 2.1 — Monolith vs Microservices: structural comparison"
                />

                <div className="pros-cons">
                    <div className="pros">
                        <h4>✅ Monolith Pros</h4>
                        <ul>
                            <li>Simple development &amp; deployment</li>
                            <li>Easy debugging &amp; tracing</li>
                            <li>No network overhead between modules</li>
                            <li>Strong consistency with single DB</li>
                            <li>Lower operational cost initially</li>
                        </ul>
                    </div>
                    <div className="cons">
                        <h4>⚠️ Monolith Cons</h4>
                        <ul>
                            <li>Scaling is all-or-nothing</li>
                            <li>Deployment risk increases with size</li>
                            <li>Team coupling — merge conflicts</li>
                            <li>Technology lock-in</li>
                            <li>Can become a &quot;big ball of mud&quot;</li>
                        </ul>
                    </div>
                </div>

                <div className="callout info">
                    <strong>Real-world example:</strong> Shopify runs a massive modular monolith. They chose explicit module boundaries within one codebase over microservices, avoiding distributed systems complexity while maintaining team autonomy through well-defined interfaces.
                </div>

                <div className="comparison-table-wrapper">
                    <table className="comparison-table">
                        <thead><tr><th>Aspect</th><th>Monolith</th><th>Microservices</th><th>Modular Monolith</th></tr></thead>
                        <tbody>
                            <tr><td><strong>Deploy unit</strong></td><td>Single artifact</td><td>Many independent services</td><td>Single artifact, modular internals</td></tr>
                            <tr><td><strong>Team scaling</strong></td><td>Harder beyond ~10 devs</td><td>Independent teams per service</td><td>Module-owned teams</td></tr>
                            <tr><td><strong>Data consistency</strong></td><td>Strong (single DB)</td><td>Eventual (distributed)</td><td>Strong (single DB)</td></tr>
                            <tr><td><strong>Operational cost</strong></td><td>Low</td><td>High (K8s, service mesh, etc.)</td><td>Low</td></tr>
                            <tr><td><strong>Best for</strong></td><td>MVPs, small teams</td><td>Large orgs, independent scaling</td><td>Growing teams, domain clarity</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Clean Architecture */}
            <div id="arch-clean">
                <h3>Clean Architecture</h3>
                <p>Proposed by Robert C. Martin, Clean Architecture enforces the <strong>Dependency Rule</strong>: source code dependencies must point inward — toward higher-level policies. The inner circles know nothing about the outer circles.</p>

                <MermaidDiagram chart={`graph TB
    subgraph "Clean Architecture Layers"
      E["Entities<br/>(Enterprise Business Rules)"] 
      U["Use Cases<br/>(Application Business Rules)"]
      I["Interface Adapters<br/>(Controllers, Gateways, Presenters)"]
      F["Frameworks & Drivers<br/>(Web, DB, UI, External)"]
    end
    F -->|depends on| I
    I -->|depends on| U
    U -->|depends on| E
    style E fill:#6366f1,stroke:#4f46e5,color:#fff
    style U fill:#818cf8,stroke:#6366f1,color:#fff
    style I fill:#a5b4fc,stroke:#818cf8,color:#1e293b
    style F fill:#c7d2fe,stroke:#a5b4fc,color:#1e293b`}
                    caption="Fig 2.2 — Clean Architecture: dependencies point inward"
                />

                <div className="use-when">
                    <h4>✅ When to Use</h4>
                    <ul>
                        <li>Complex domain logic that changes independently of UI/DB</li>
                        <li>Long-lived applications requiring testability</li>
                        <li>Teams that need clear boundaries between concerns</li>
                    </ul>
                </div>
                <div className="avoid-when">
                    <h4>⚠️ When to Avoid</h4>
                    <ul>
                        <li>Simple CRUD apps — overhead not justified</li>
                        <li>Rapid prototyping — too much boilerplate early on</li>
                        <li>Very small teams (&lt;3 developers)</li>
                    </ul>
                </div>

                <p><strong>Real-world example:</strong> Netflix&apos;s backend services follow Clean Architecture principles: domain entities are isolated from delivery mechanisms, allowing them to swap transport layers (gRPC, REST, GraphQL) without touching business logic.</p>
            </div>

            {/* Hexagonal Architecture */}
            <div id="arch-hexagonal">
                <h3>Hexagonal Architecture (Ports &amp; Adapters)</h3>
                <p>Proposed by Alistair Cockburn, this pattern isolates the application core from external concerns via <strong>ports</strong> (interfaces the core exposes) and <strong>adapters</strong> (implementations connecting to external systems).</p>

                <MermaidDiagram chart={`graph LR
    subgraph "Driving Side (Primary)"
      REST["REST Controller"]
      CLI["CLI Adapter"]
      GQL["GraphQL Adapter"]
    end
    subgraph "Application Core"
      IP["Input Port"] --> APP["Domain Logic"]
      APP --> OP["Output Port"]
    end
    subgraph "Driven Side (Secondary)"
      DB["DB Adapter"]
      MQ["Message Queue Adapter"]
      EXT["External API Adapter"]
    end
    REST --> IP
    CLI --> IP
    GQL --> IP
    OP --> DB
    OP --> MQ
    OP --> EXT
    style APP fill:#6366f1,stroke:#4f46e5,color:#fff
    style IP fill:#10b981,stroke:#059669,color:#fff
    style OP fill:#10b981,stroke:#059669,color:#fff`}
                    caption="Fig 2.3 — Hexagonal Architecture: Ports & Adapters"
                />

                <div className="callout tip">
                    <strong>Key benefit:</strong> You can test the entire application core without any infrastructure. Swap the database, switch from REST to gRPC, or replace a vendor API — the core never changes.
                </div>
            </div>

            {/* Layered Architecture */}
            <div id="arch-layered">
                <h3>Layered Architecture</h3>
                <p>The classic N-tier pattern separates concerns into horizontal layers. Each layer only communicates with the layer directly below it. While simple, it can lead to &quot;sinkhole&quot; anti-patterns where requests pass through layers without any processing.</p>

                <MermaidDiagram chart={`graph TB
    P["Presentation Layer<br/>(Controllers, Views)"]
    B["Business Logic Layer<br/>(Services, Rules)"]
    PE["Persistence Layer<br/>(Repositories, ORM)"]
    D["Database Layer<br/>(SQL, NoSQL)"]
    P --> B --> PE --> D
    style P fill:#6366f1,stroke:#4f46e5,color:#fff
    style B fill:#818cf8,stroke:#6366f1,color:#fff
    style PE fill:#a5b4fc,stroke:#818cf8,color:#1e293b
    style D fill:#c7d2fe,stroke:#a5b4fc,color:#1e293b`}
                    caption="Fig 2.4 — Traditional Layered Architecture"
                />
                <div className="pros-cons">
                    <div className="pros"><h4>✅ Pros</h4><ul><li>Easy to understand</li><li>Good separation of concerns</li><li>Widely known by teams</li></ul></div>
                    <div className="cons"><h4>⚠️ Cons</h4><ul><li>Can become monolithic over time</li><li>&quot;Sinkhole&quot; anti-pattern</li><li>Tight coupling between layers</li></ul></div>
                </div>
            </div>

            {/* Event-Driven Architecture */}
            <div id="arch-event">
                <h3>Event-Driven Architecture</h3>
                <p>Components communicate by producing and consuming events asynchronously. This decouples producers from consumers, enabling high scalability and resilience. Event-driven systems are foundational to modern architectures at companies like LinkedIn, Uber, and Netflix.</p>

                <MermaidDiagram chart={`graph LR
    P1["Order Service"] -->|"OrderPlaced"| EB["Event Bus<br/>(Kafka / RabbitMQ)"]
    EB -->|"OrderPlaced"| C1["Inventory Service"]
    EB -->|"OrderPlaced"| C2["Notification Service"]
    EB -->|"OrderPlaced"| C3["Analytics Service"]
    C1 -->|"InventoryReserved"| EB
    style EB fill:#6366f1,stroke:#4f46e5,color:#fff
    style P1 fill:#10b981,stroke:#059669,color:#fff`}
                    caption="Fig 2.5 — Event-Driven Architecture with Event Bus"
                />

                <div className="use-when"><h4>✅ When to Use</h4><ul><li>High-throughput systems needing async processing</li><li>Services that need loose coupling</li><li>Complex workflows with multiple consumers</li><li>Audit trails and event replay capabilities</li></ul></div>

                <p><strong>Scalability:</strong> Event buses like Apache Kafka can handle millions of events per second with horizontal scaling via partitioning. Consumer groups enable parallel processing.</p>
            </div>

            {/* CQRS */}
            <div id="arch-cqrs">
                <h3>CQRS — Command Query Responsibility Segregation</h3>
                <p>CQRS separates the write model (Commands) from the read model (Queries). This allows independent optimization: writes can use a normalized relational model, while reads use denormalized, pre-computed views for fast queries.</p>

                <MermaidDiagram chart={`graph TB
    Client["Client"] --> CMD["Command Handler<br/>(Write Model)"]
    Client --> QRY["Query Handler<br/>(Read Model)"]
    CMD --> WDB["Write Database<br/>(Normalized)"]
    WDB -->|"Sync/Events"| RDB["Read Database<br/>(Denormalized Views)"]
    QRY --> RDB
    style CMD fill:#ef4444,stroke:#dc2626,color:#fff
    style QRY fill:#10b981,stroke:#059669,color:#fff
    style Client fill:#6366f1,stroke:#4f46e5,color:#fff`}
                    caption="Fig 2.6 — CQRS: separate read and write paths"
                />

                <div className="callout warning">
                    <strong>Trade-off:</strong> CQRS introduces eventual consistency between write and read models. The read model may lag behind the write model. This is acceptable for many use cases but problematic for real-time balance displays or inventory counts.
                </div>
            </div>

            {/* DDD */}
            <div id="arch-ddd">
                <h3>Domain-Driven Design (DDD)</h3>
                <p>DDD, formalized by Eric Evans, focuses on modeling software around the business domain. Key tactical patterns include Entities, Value Objects, Aggregates, Domain Events, and Repositories. The strategic pattern of <strong>Bounded Contexts</strong> defines clear boundaries where a particular domain model is valid.</p>

                <MermaidDiagram chart={`graph TB
    subgraph "Bounded Context: Orders"
      O_AGG["Order Aggregate"]
      O_ENT["Order Entity"]
      O_VO["Money Value Object"]
      O_REPO["Order Repository"]
      O_AGG --> O_ENT
      O_AGG --> O_VO
    end
    subgraph "Bounded Context: Shipping"
      S_AGG["Shipment Aggregate"]
      S_ENT["Shipment Entity"]
      S_VO["Address Value Object"]
      S_REPO["Shipment Repository"]
      S_AGG --> S_ENT
      S_AGG --> S_VO
    end
    O_AGG -.->|"Domain Event:<br/>OrderConfirmed"| S_AGG
    style O_AGG fill:#6366f1,stroke:#4f46e5,color:#fff
    style S_AGG fill:#10b981,stroke:#059669,color:#fff`}
                    caption="Fig 2.7 — DDD: Bounded Contexts communicating via Domain Events"
                />

                <h4>Ubiquitous Language</h4>
                <p>DDD insists that developers and domain experts use the <strong>same language</strong>. If the business says &quot;Order,&quot; the code has an <code>Order</code> class. This eliminates translation overhead and reduces misunderstandings between technical and business teams.</p>
            </div>

            {/* API Gateway & Service Mesh */}
            <div id="arch-gateway">
                <h3>API Gateway &amp; Service Mesh</h3>
                <p>In microservices, an <strong>API Gateway</strong> acts as the single entry point for all client requests, handling routing, authentication, rate limiting, and protocol translation. A <strong>Service Mesh</strong> (e.g., Istio, Linkerd) handles inter-service communication with sidecar proxies, providing observability, mTLS, and traffic management without application code changes.</p>

                <MermaidDiagram chart={`graph TB
    Client["Client"] --> GW["API Gateway<br/>(Kong / AWS ALB)"]
    GW --> S1["Service A + Sidecar"]
    GW --> S2["Service B + Sidecar"]
    S1 <-->|"mTLS via Mesh"| S2
    S1 --> S3["Service C + Sidecar"]
    CP["Control Plane<br/>(Istio / Linkerd)"] -.->|"Config"| S1
    CP -.->|"Config"| S2
    CP -.->|"Config"| S3
    style GW fill:#6366f1,stroke:#4f46e5,color:#fff
    style CP fill:#f59e0b,stroke:#d97706,color:#fff`}
                    caption="Fig 2.8 — API Gateway + Service Mesh topology"
                />

                <div className="comparison-table-wrapper">
                    <table className="comparison-table">
                        <thead><tr><th>Aspect</th><th>API Gateway</th><th>Service Mesh</th></tr></thead>
                        <tbody>
                            <tr><td><strong>Scope</strong></td><td>North-South (client → services)</td><td>East-West (service ↔ service)</td></tr>
                            <tr><td><strong>Handles</strong></td><td>Routing, auth, rate limiting</td><td>mTLS, retries, circuit breaking, observability</td></tr>
                            <tr><td><strong>Implementation</strong></td><td>Centralized proxy</td><td>Sidecar proxies per service</td></tr>
                            <tr><td><strong>Examples</strong></td><td>Kong, AWS API Gateway, Nginx</td><td>Istio, Linkerd, Consul Connect</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}
