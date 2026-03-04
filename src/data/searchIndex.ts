export interface SearchEntry {
    id: string;
    title: string;
    description: string;
    section: string;
}

export const searchIndex: SearchEntry[] = [
    // Foundations
    { id: 'foundations-what', title: 'What is Software Engineering?', description: 'Difference between developer and engineer, engineering discipline', section: 'Foundations' },
    { id: 'foundations-mindset', title: 'Engineering Mindset', description: 'Scalability, reliability, maintainability, cost-awareness', section: 'Foundations' },
    { id: 'foundations-tradeoffs', title: 'Trade-offs & Complexity', description: 'Managing complexity, making engineering trade-offs', section: 'Foundations' },
    { id: 'foundations-debt', title: 'Technical Debt', description: 'Understanding, managing and paying down technical debt', section: 'Foundations' },
    // Architecture
    { id: 'arch-monolith', title: 'Monolith vs Microservices', description: 'Comparing monolithic and microservices architectures', section: 'Architecture' },
    { id: 'arch-clean', title: 'Clean Architecture', description: 'Dependency rule, layers, use cases, Robert C. Martin', section: 'Architecture' },
    { id: 'arch-hexagonal', title: 'Hexagonal Architecture', description: 'Ports and adapters pattern, Alistair Cockburn', section: 'Architecture' },
    { id: 'arch-layered', title: 'Layered Architecture', description: 'Traditional n-tier architecture pattern', section: 'Architecture' },
    { id: 'arch-event', title: 'Event-Driven Architecture', description: 'Event sourcing, message brokers, pub/sub patterns', section: 'Architecture' },
    { id: 'arch-cqrs', title: 'CQRS', description: 'Command Query Responsibility Segregation pattern', section: 'Architecture' },
    { id: 'arch-ddd', title: 'Domain-Driven Design', description: 'Bounded contexts, aggregates, ubiquitous language', section: 'Architecture' },
    { id: 'arch-gateway', title: 'API Gateway & Service Mesh', description: 'Edge routing, service discovery, sidecar proxy', section: 'Architecture' },
    // Design Patterns
    { id: 'patterns-creational', title: 'Creational Patterns', description: 'Singleton, Factory, Abstract Factory, Builder, Prototype', section: 'Design Patterns' },
    { id: 'patterns-structural', title: 'Structural Patterns', description: 'Adapter, Decorator, Facade, Proxy, Composite', section: 'Design Patterns' },
    { id: 'patterns-behavioral', title: 'Behavioral Patterns', description: 'Observer, Strategy, Command, Iterator, State', section: 'Design Patterns' },
    { id: 'patterns-di', title: 'Dependency Injection & IoC', description: 'Inversion of Control, dependency injection containers', section: 'Design Patterns' },
    { id: 'patterns-composition', title: 'Composition over Inheritance', description: 'Favoring composition for flexible, maintainable designs', section: 'Design Patterns' },
    // Distributed Systems
    { id: 'dist-cap', title: 'CAP Theorem', description: 'Consistency, Availability, Partition tolerance', section: 'Distributed Systems' },
    { id: 'dist-consistency', title: 'Consistency Models', description: 'Strong vs eventual consistency, linearizability', section: 'Distributed Systems' },
    { id: 'dist-scaling', title: 'Scaling Strategies', description: 'Horizontal vs vertical scaling, load balancing', section: 'Distributed Systems' },
    { id: 'dist-resilience', title: 'Resilience Patterns', description: 'Circuit breaker, rate limiting, retries, idempotency', section: 'Distributed Systems' },
    { id: 'dist-tools', title: 'Tools & Infrastructure', description: 'Kafka, Redis, Nginx, Kubernetes, Docker', section: 'Distributed Systems' },
    // Databases
    { id: 'db-sql-nosql', title: 'SQL vs NoSQL', description: 'Relational vs document databases comparison', section: 'Databases' },
    { id: 'db-indexing', title: 'Indexing & Query Optimization', description: 'B-tree, hash indexes, query planning', section: 'Databases' },
    { id: 'db-transactions', title: 'Transactions & Isolation', description: 'ACID properties, isolation levels, concurrency control', section: 'Databases' },
    { id: 'db-scaling', title: 'Sharding & Replication', description: 'Horizontal partitioning, read replicas, multi-tenant', section: 'Databases' },
    { id: 'db-eventsourcing', title: 'Event Sourcing', description: 'Append-only event log, state reconstruction', section: 'Databases' },
    // DevOps
    { id: 'devops-cicd', title: 'CI/CD Pipelines', description: 'Continuous integration, delivery, deployment automation', section: 'DevOps' },
    { id: 'devops-deploy', title: 'Deployment Strategies', description: 'Blue-green, canary, rolling deployments', section: 'DevOps' },
    { id: 'devops-iac', title: 'Infrastructure as Code', description: 'Terraform, CloudFormation, GitOps', section: 'DevOps' },
    { id: 'devops-observability', title: 'Observability', description: 'Monitoring, logging, metrics, tracing, Prometheus, Grafana', section: 'DevOps' },
    { id: 'devops-sre', title: 'SRE Principles', description: 'SLO, SLA, error budgets, incident management', section: 'DevOps' },
    // Security
    { id: 'sec-owasp', title: 'OWASP Top 10', description: 'Most critical web application security risks', section: 'Security' },
    { id: 'sec-auth', title: 'Authentication & Authorization', description: 'AuthN vs AuthZ, identity management', section: 'Security' },
    { id: 'sec-oauth', title: 'OAuth2 & JWT', description: 'Token-based auth, authorization flows, JWT structure', section: 'Security' },
    { id: 'sec-rbac', title: 'RBAC & Multi-tenant Security', description: 'Role-based access, tenant isolation', section: 'Security' },
    { id: 'sec-zerotrust', title: 'Zero Trust Architecture', description: 'Never trust always verify, micro-segmentation', section: 'Security' },
];

export function searchContent(query: string): SearchEntry[] {
    if (!query.trim()) return [];
    const lowerQuery = query.toLowerCase();
    return searchIndex.filter(
        (entry) =>
            entry.title.toLowerCase().includes(lowerQuery) ||
            entry.description.toLowerCase().includes(lowerQuery) ||
            entry.section.toLowerCase().includes(lowerQuery)
    ).slice(0, 8);
}
