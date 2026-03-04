'use client';
import React from 'react';
import MermaidDiagram from '@/components/MermaidDiagram';
import CodeBlock from '@/components/CodeBlock';

export default function Databases() {
    return (
        <section className="section" id="databases">
            <div className="section-header">
                <div className="section-number">Module 05</div>
                <h2>Databases &amp; Data Modeling</h2>
            </div>
            <p>Data is the foundation of every application. Choosing the right database, modeling data effectively, and understanding consistency/performance trade-offs are core engineering skills.</p>

            {/* SQL vs NoSQL */}
            <div id="db-sql-nosql">
                <h3>SQL vs NoSQL</h3>
                <div className="comparison-table-wrapper">
                    <table className="comparison-table">
                        <thead><tr><th>Aspect</th><th>SQL (PostgreSQL)</th><th>NoSQL (MongoDB)</th></tr></thead>
                        <tbody>
                            <tr><td><strong>Data Model</strong></td><td>Relational tables with schemas</td><td>Document, key-value, graph, wide-column</td></tr>
                            <tr><td><strong>Schema</strong></td><td>Strict, enforced (schema-on-write)</td><td>Flexible (schema-on-read)</td></tr>
                            <tr><td><strong>Query Language</strong></td><td>SQL (declarative, standardized)</td><td>Proprietary APIs (MQL, etc.)</td></tr>
                            <tr><td><strong>Joins</strong></td><td>Native, optimized</td><td>Limited or manual (embedding/linking)</td></tr>
                            <tr><td><strong>Transactions</strong></td><td>Full ACID</td><td>Document-level; multi-doc since v4.0</td></tr>
                            <tr><td><strong>Scaling</strong></td><td>Vertical primary; read replicas</td><td>Native horizontal sharding</td></tr>
                            <tr><td><strong>Best For</strong></td><td>Complex queries, relationships, consistency</td><td>Flexible schemas, high write throughput, hierarchical data</td></tr>
                        </tbody>
                    </table>
                </div>

                <MermaidDiagram chart={`erDiagram
    USERS ||--o{ ORDERS : places
    USERS {
      uuid id PK
      string email
      string name
      timestamp created_at
    }
    ORDERS ||--|{ ORDER_ITEMS : contains
    ORDERS {
      uuid id PK
      uuid user_id FK
      decimal total
      string status
      timestamp created_at
    }
    ORDER_ITEMS {
      uuid id PK
      uuid order_id FK
      uuid product_id FK
      int quantity
      decimal price
    }
    PRODUCTS ||--o{ ORDER_ITEMS : "referenced by"
    PRODUCTS {
      uuid id PK
      string name
      decimal price
      int stock
    }`}
                    caption="Fig 5.1 — Relational schema: E-commerce data model"
                />

                <h4>Example Queries</h4>
                <CodeBlock language="sql" code={`-- PostgreSQL: Find top customers by order value (last 30 days)
SELECT u.name, u.email,
       COUNT(o.id) AS order_count,
       SUM(o.total) AS total_spent
FROM users u
JOIN orders o ON o.user_id = u.id
WHERE o.created_at >= NOW() - INTERVAL '30 days'
  AND o.status = 'completed'
GROUP BY u.id, u.name, u.email
ORDER BY total_spent DESC
LIMIT 10;`} />

                <CodeBlock language="javascript" code={`// MongoDB equivalent (aggregation pipeline)
db.orders.aggregate([
  { $match: {
    status: "completed",
    created_at: { $gte: new Date(Date.now() - 30*24*60*60*1000) }
  }},
  { $group: {
    _id: "$user_id",
    order_count: { $sum: 1 },
    total_spent: { $sum: "$total" }
  }},
  { $sort: { total_spent: -1 } },
  { $limit: 10 },
  { $lookup: {
    from: "users", localField: "_id",
    foreignField: "_id", as: "user"
  }},
  { $unwind: "$user" },
  { $project: {
    name: "$user.name", email: "$user.email",
    order_count: 1, total_spent: 1
  }}
]);`} />
            </div>

            {/* Indexing & Optimization */}
            <div id="db-indexing">
                <h3>Indexing &amp; Query Optimization</h3>
                <p>Indexes are data structures (typically B-trees or LSM-trees) that speed up reads at the cost of slower writes and storage overhead. Without proper indexing, queries do full table scans — O(n) instead of O(log n).</p>

                <MermaidDiagram chart={`graph TB
    Q["SELECT * FROM orders<br/>WHERE user_id = ? AND status = ?"]
    Q --> IDX{Index exists?}
    IDX -->|"Yes"| SEEK["Index Seek<br/>O(log n) — fast ✅"]
    IDX -->|"No"| SCAN["Full Table Scan<br/>O(n) — slow ❌"]
    style SEEK fill:#10b981,stroke:#059669,color:#fff
    style SCAN fill:#ef4444,stroke:#dc2626,color:#fff`}
                    caption="Fig 5.2 — Impact of indexing on query performance"
                />

                <CodeBlock language="sql" code={`-- Create composite index for common query patterns
CREATE INDEX idx_orders_user_status
  ON orders (user_id, status)
  INCLUDE (total, created_at);  -- covering index

-- Partial index: only index active records
CREATE INDEX idx_active_users
  ON users (email)
  WHERE active = true;

-- Check query plan
EXPLAIN ANALYZE
SELECT * FROM orders
WHERE user_id = '...' AND status = 'pending';`} />

                <div className="callout tip">
                    <strong>Index best practices:</strong> Index columns used in WHERE, JOIN, and ORDER BY. Use composite indexes matching your most frequent query patterns. Monitor with <code>pg_stat_user_indexes</code> to find unused indexes.
                </div>
            </div>

            {/* Transactions & Isolation */}
            <div id="db-transactions">
                <h3>Transactions &amp; Isolation Levels</h3>
                <p>ACID properties guarantee reliable transaction processing: <strong>Atomicity</strong> (all or nothing), <strong>Consistency</strong> (valid state transitions), <strong>Isolation</strong> (concurrent transactions don&apos;t interfere), <strong>Durability</strong> (committed data survives crashes).</p>

                <div className="comparison-table-wrapper">
                    <table className="comparison-table">
                        <thead><tr><th>Isolation Level</th><th>Dirty Read</th><th>Non-Repeatable Read</th><th>Phantom Read</th><th>Performance</th></tr></thead>
                        <tbody>
                            <tr><td><strong>Read Uncommitted</strong></td><td>Possible</td><td>Possible</td><td>Possible</td><td>Fastest</td></tr>
                            <tr><td><strong>Read Committed</strong></td><td>Prevented</td><td>Possible</td><td>Possible</td><td>Fast</td></tr>
                            <tr><td><strong>Repeatable Read</strong></td><td>Prevented</td><td>Prevented</td><td>Possible</td><td>Moderate</td></tr>
                            <tr><td><strong>Serializable</strong></td><td>Prevented</td><td>Prevented</td><td>Prevented</td><td>Slowest</td></tr>
                        </tbody>
                    </table>
                </div>

                <div className="callout info">
                    <strong>PostgreSQL default:</strong> Read Committed. For financial applications or inventory, consider Serializable or use explicit row-level locking (<code>SELECT ... FOR UPDATE</code>).
                </div>
            </div>

            {/* Sharding & Replication */}
            <div id="db-scaling">
                <h3>Sharding &amp; Replication</h3>
                <MermaidDiagram chart={`graph TB
    subgraph "Replication (Read Scaling)"
      P["Primary (Writes)"] --> R1["Replica 1 (Reads)"]
      P --> R2["Replica 2 (Reads)"]
      P --> R3["Replica 3 (Reads)"]
    end
    subgraph "Sharding (Write Scaling)"
      Router["Shard Router"] --> S1["Shard 1<br/>Users A-H"]
      Router --> S2["Shard 2<br/>Users I-P"]
      Router --> S3["Shard 3<br/>Users Q-Z"]
    end
    style P fill:#6366f1,stroke:#4f46e5,color:#fff
    style Router fill:#f59e0b,stroke:#d97706,color:#fff`}
                    caption="Fig 5.3 — Replication for read scaling, Sharding for write scaling"
                />

                <h4>Multi-tenant Database Strategies</h4>
                <ul>
                    <li><strong>Shared schema, tenant column:</strong> Adding <code>tenant_id</code> to every table. Simplest but requires careful query scoping.</li>
                    <li><strong>Schema per tenant:</strong> Each tenant gets its own schema in the same database. Better isolation.</li>
                    <li><strong>Database per tenant:</strong> Complete isolation. Highest cost, best for regulated industries.</li>
                </ul>

                <div className="callout warning">
                    <strong>SaaS case study:</strong> Slack uses a sharded MySQL architecture partitioned by workspace. Each shard handles ~500 workspaces. Cross-shard queries are avoided by design — all data needed for a workspace lives on one shard. This enables horizontal scaling while keeping queries fast and isolated.
                </div>
            </div>

            {/* Event Sourcing */}
            <div id="db-eventsourcing">
                <h3>Event Sourcing</h3>
                <p>Instead of storing current state, store an immutable log of all state-changing events. Current state is derived by replaying events. This provides a complete audit trail and enables temporal queries.</p>

                <MermaidDiagram chart={`sequenceDiagram
    participant Client
    participant Command Handler
    participant Event Store
    participant Read Model

    Client->>Command Handler: CreateOrder(items)
    Command Handler->>Event Store: Append OrderCreated
    Client->>Command Handler: AddItem(item)
    Command Handler->>Event Store: Append ItemAdded
    Client->>Command Handler: ConfirmOrder()
    Command Handler->>Event Store: Append OrderConfirmed
    Event Store-->>Read Model: Project events → current state
    Client->>Read Model: GetOrder() → denormalized view`}
                    caption="Fig 5.4 — Event Sourcing: append-only event log with projections"
                />

                <div className="pros-cons">
                    <div className="pros"><h4>✅ Pros</h4><ul><li>Complete audit trail</li><li>Temporal queries (state at any point in time)</li><li>Event replay for debugging</li><li>Natural fit for CQRS</li></ul></div>
                    <div className="cons"><h4>⚠️ Cons</h4><ul><li>Increased storage</li><li>Schema evolution complexity</li><li>Eventually consistent reads</li><li>Steeper learning curve</li></ul></div>
                </div>
            </div>
        </section>
    );
}
