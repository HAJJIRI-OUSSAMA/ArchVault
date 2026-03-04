import { FiBook, FiLayers, FiGrid, FiCloud, FiDatabase, FiSettings, FiShield, FiMap } from 'react-icons/fi';
import { IconType } from 'react-icons';

export interface NavItem {
    id: string;
    label: string;
    icon: IconType;
    children?: { id: string; label: string }[];
}

export const navigation: NavItem[] = [
    {
        id: 'hero',
        label: 'Overview',
        icon: FiBook,
    },
    {
        id: 'roadmap',
        label: 'Learning Roadmap',
        icon: FiMap,
    },
    {
        id: 'foundations',
        label: 'Foundations',
        icon: FiBook,
        children: [
            { id: 'foundations-what', label: 'What is Software Engineering?' },
            { id: 'foundations-mindset', label: 'Engineering Mindset' },
            { id: 'foundations-tradeoffs', label: 'Trade-offs & Complexity' },
            { id: 'foundations-debt', label: 'Technical Debt' },
        ],
    },
    {
        id: 'architecture',
        label: 'Architecture & Design',
        icon: FiLayers,
        children: [
            { id: 'arch-monolith', label: 'Monolith vs Microservices' },
            { id: 'arch-clean', label: 'Clean Architecture' },
            { id: 'arch-hexagonal', label: 'Hexagonal Architecture' },
            { id: 'arch-layered', label: 'Layered Architecture' },
            { id: 'arch-event', label: 'Event-Driven Architecture' },
            { id: 'arch-cqrs', label: 'CQRS' },
            { id: 'arch-ddd', label: 'Domain-Driven Design' },
            { id: 'arch-gateway', label: 'API Gateway & Service Mesh' },
        ],
    },
    {
        id: 'patterns',
        label: 'Design Patterns',
        icon: FiGrid,
        children: [
            { id: 'patterns-creational', label: 'Creational Patterns' },
            { id: 'patterns-structural', label: 'Structural Patterns' },
            { id: 'patterns-behavioral', label: 'Behavioral Patterns' },
            { id: 'patterns-di', label: 'DI & IoC' },
            { id: 'patterns-composition', label: 'Composition over Inheritance' },
        ],
    },
    {
        id: 'distributed',
        label: 'Distributed Systems',
        icon: FiCloud,
        children: [
            { id: 'dist-cap', label: 'CAP Theorem' },
            { id: 'dist-consistency', label: 'Consistency Models' },
            { id: 'dist-scaling', label: 'Scaling Strategies' },
            { id: 'dist-resilience', label: 'Resilience Patterns' },
            { id: 'dist-tools', label: 'Tools & Infrastructure' },
        ],
    },
    {
        id: 'databases',
        label: 'Databases',
        icon: FiDatabase,
        children: [
            { id: 'db-sql-nosql', label: 'SQL vs NoSQL' },
            { id: 'db-indexing', label: 'Indexing & Optimization' },
            { id: 'db-transactions', label: 'Transactions & Isolation' },
            { id: 'db-scaling', label: 'Sharding & Replication' },
            { id: 'db-eventsourcing', label: 'Event Sourcing' },
        ],
    },
    {
        id: 'devops',
        label: 'DevOps',
        icon: FiSettings,
        children: [
            { id: 'devops-cicd', label: 'CI/CD Pipelines' },
            { id: 'devops-deploy', label: 'Deployment Strategies' },
            { id: 'devops-iac', label: 'Infrastructure as Code' },
            { id: 'devops-observability', label: 'Observability' },
            { id: 'devops-sre', label: 'SRE Principles' },
        ],
    },
    {
        id: 'security',
        label: 'Security',
        icon: FiShield,
        children: [
            { id: 'sec-owasp', label: 'OWASP Top 10' },
            { id: 'sec-auth', label: 'Authentication & Authorization' },
            { id: 'sec-oauth', label: 'OAuth2 & JWT' },
            { id: 'sec-rbac', label: 'RBAC & Multi-tenant' },
            { id: 'sec-zerotrust', label: 'Zero Trust Architecture' },
        ],
    },
];
