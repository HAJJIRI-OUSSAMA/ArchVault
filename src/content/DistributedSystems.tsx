'use client';
import React from 'react';
import MermaidDiagram from '@/components/MermaidDiagram';
import CodeBlock from '@/components/CodeBlock';

export default function DistributedSystems() {
    return (
        <section className="section" id="distributed">
            <div className="section-header">
                <div className="section-number">Module 04</div>
                <h2>Distributed Systems</h2>
            </div>
            <p>A distributed system is a collection of independent computers that appear to users as a single system. They introduce network uncertainty, partial failures, and clock synchronization challenges. Reference: <em>Designing Data-Intensive Applications</em> (Martin Kleppmann).</p>

            {/* CAP Theorem */}
            <div id="dist-cap">
                <h3>CAP Theorem</h3>
                <p>Formulated by Eric Brewer, the CAP theorem states that a distributed system can guarantee at most <strong>two</strong> of three properties: <strong>Consistency</strong>, <strong>Availability</strong>, and <strong>Partition Tolerance</strong>. Since network partitions are unavoidable, the real choice is between <strong>CP</strong> (consistency over availability) and <strong>AP</strong> (availability over consistency).</p>

                <MermaidDiagram chart={`graph TD
    CAP["CAP Theorem"] --> C["Consistency<br/>Every read receives the most recent write"]
    CAP --> A["Availability<br/>Every request receives a non-error response"]
    CAP --> P["Partition Tolerance<br/>System works despite network partitions"]
    C --- CP["CP Systems<br/>HBase, MongoDB, Redis Cluster"]
    A --- AP["AP Systems<br/>Cassandra, DynamoDB, CouchDB"]
    style CAP fill:#6366f1,stroke:#4f46e5,color:#fff
    style C fill:#3b82f6,stroke:#2563eb,color:#fff
    style A fill:#10b981,stroke:#059669,color:#fff
    style P fill:#f59e0b,stroke:#d97706,color:#fff`}
                    caption="Fig 4.1 — CAP Theorem: pick two (but P is non-negotiable)"
                />

                <div className="callout info">
                    <strong>In practice:</strong> CAP is a simplification. The PACELC theorem extends it: during a Partition, choose Availability or Consistency; Else (no partition), choose Latency or Consistency. DynamoDB, for example, is PA/EL — available during partitions, low-latency otherwise.
                </div>
            </div>

            {/* Consistency Models */}
            <div id="dist-consistency">
                <h3>Consistency Models</h3>
                <p>Consistency models define guarantees about when writes become visible to reads across distributed replicas.</p>

                <div className="comparison-table-wrapper">
                    <table className="comparison-table">
                        <thead><tr><th>Model</th><th>Guarantee</th><th>Latency</th><th>Use Case</th></tr></thead>
                        <tbody>
                            <tr><td><strong>Strong (Linearizable)</strong></td><td>Reads always see latest write</td><td>High (consensus required)</td><td>Bank balances, inventory</td></tr>
                            <tr><td><strong>Sequential</strong></td><td>Operations appear in program order</td><td>Medium</td><td>Distributed locks</td></tr>
                            <tr><td><strong>Causal</strong></td><td>Causally related ops are ordered</td><td>Medium-Low</td><td>Social media feeds</td></tr>
                            <tr><td><strong>Eventual</strong></td><td>Replicas converge given enough time</td><td>Low</td><td>DNS, shopping cart, likes</td></tr>
                        </tbody>
                    </table>
                </div>

                <MermaidDiagram chart={`sequenceDiagram
    participant Client A
    participant Primary
    participant Replica 1
    participant Replica 2
    Client A->>Primary: Write X = 42
    Primary->>Replica 1: Replicate (async)
    Primary->>Replica 2: Replicate (async)
    Note over Replica 1: X = 42 (after delay)
    Note over Replica 2: X still stale
    Client A->>Replica 2: Read X
    Replica 2-->>Client A: X = old value ❌
    Note over Replica 2: Eventually: X = 42 ✅`}
                    caption="Fig 4.2 — Eventual consistency: reads may see stale data on replicas"
                />
            </div>

            {/* Scaling Strategies */}
            <div id="dist-scaling">
                <h3>Scaling Strategies</h3>
                <div className="comparison-table-wrapper">
                    <table className="comparison-table">
                        <thead><tr><th>Aspect</th><th>Vertical Scaling</th><th>Horizontal Scaling</th></tr></thead>
                        <tbody>
                            <tr><td><strong>Method</strong></td><td>Bigger machine (more CPU/RAM)</td><td>More machines</td></tr>
                            <tr><td><strong>Limit</strong></td><td>Hardware ceiling</td><td>Theoretically unlimited</td></tr>
                            <tr><td><strong>Complexity</strong></td><td>Low</td><td>High (distribution, consensus)</td></tr>
                            <tr><td><strong>Downtime</strong></td><td>Required for upgrade</td><td>Zero downtime possible</td></tr>
                            <tr><td><strong>Cost curve</strong></td><td>Exponential</td><td>Linear</td></tr>
                        </tbody>
                    </table>
                </div>

                <h4>Load Balancing</h4>
                <MermaidDiagram chart={`graph TB
    Client["Clients"] --> LB["Load Balancer<br/>(Nginx / AWS ALB)"]
    LB --> S1["Server 1"]
    LB --> S2["Server 2"]
    LB --> S3["Server 3"]
    LB --> S4["Server N"]
    subgraph "Algorithms"
      RR["Round Robin"]
      LC["Least Connections"]
      WRR["Weighted Round Robin"]
      IP["IP Hash (Sticky)"]
    end
    style LB fill:#6366f1,stroke:#4f46e5,color:#fff`}
                    caption="Fig 4.3 — Load balancer distributing traffic across server pool"
                />

                <h4>Caching Strategies</h4>
                <p>Caching reduces latency and database load. Key patterns:</p>
                <ul>
                    <li><strong>Cache-Aside (Lazy Loading):</strong> Application checks cache first; on miss, reads from DB and populates cache. Most common pattern with Redis.</li>
                    <li><strong>Write-Through:</strong> Writes go to cache and DB simultaneously. Strong consistency, higher write latency.</li>
                    <li><strong>Write-Behind:</strong> Writes go to cache only; cache asynchronously syncs to DB. Very fast writes, risk of data loss.</li>
                    <li><strong>Read-Through:</strong> Cache sits between app and DB; cache handles misses automatically.</li>
                </ul>
            </div>

            {/* Resilience Patterns */}
            <div id="dist-resilience">
                <h3>Resilience Patterns</h3>

                <h4>Circuit Breaker</h4>
                <p>Prevents cascading failures by wrapping calls to external services. When failures exceed a threshold, the circuit &quot;opens&quot; and fails fast instead of waiting for timeouts.</p>

                <MermaidDiagram chart={`stateDiagram-v2
    [*] --> Closed
    Closed --> Open: Failure threshold exceeded
    Open --> HalfOpen: Timeout expires
    HalfOpen --> Closed: Probe succeeds
    HalfOpen --> Open: Probe fails`}
                    caption="Fig 4.4 — Circuit Breaker state machine"
                />

                <CodeBlock language="typescript" code={`class CircuitBreaker {
  private failures = 0;
  private state: 'CLOSED' | 'OPEN' | 'HALF_OPEN' = 'CLOSED';
  private nextRetry = 0;

  constructor(
    private threshold: number = 5,
    private timeout: number = 30000
  ) {}

  async call<T>(fn: () => Promise<T>): Promise<T> {
    if (this.state === 'OPEN') {
      if (Date.now() < this.nextRetry) throw new Error('Circuit is OPEN');
      this.state = 'HALF_OPEN';
    }

    try {
      const result = await fn();
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure();
      throw error;
    }
  }

  private onSuccess() { this.failures = 0; this.state = 'CLOSED'; }
  private onFailure() {
    this.failures++;
    if (this.failures >= this.threshold) {
      this.state = 'OPEN';
      this.nextRetry = Date.now() + this.timeout;
    }
  }
}`} />

                <h4>Rate Limiting</h4>
                <p>Controls the rate of requests to protect services from being overwhelmed. Common algorithms: <strong>Token Bucket</strong> (smooth bursts), <strong>Sliding Window</strong> (precise rate calculation), <strong>Fixed Window</strong> (simple but allows burst at boundaries).</p>

                <h4>Idempotency</h4>
                <p>An operation is idempotent if performing it multiple times has the same effect as performing it once. Critical for safe retries in distributed systems. Implementation: use unique <code>idempotency keys</code> per request, stored server-side to detect duplicates.</p>

                <h4>Retry Strategies</h4>
                <ul>
                    <li><strong>Immediate retry:</strong> For transient errors (brief network blips)</li>
                    <li><strong>Exponential backoff:</strong> Wait 1s, 2s, 4s, 8s... Prevents thundering herd</li>
                    <li><strong>Exponential backoff + jitter:</strong> Add randomness to backoff to avoid synchronized retries across clients</li>
                    <li><strong>Circuit breaker + retry:</strong> Combine for comprehensive resilience</li>
                </ul>
            </div>

            {/* Tools */}
            <div id="dist-tools">
                <h3>Tools &amp; Infrastructure</h3>
                <MermaidDiagram chart={`graph TB
    subgraph "Container Orchestration"
      K8S["Kubernetes"] --> POD1["Pod: User Service"]
      K8S --> POD2["Pod: Order Service"]
      K8S --> POD3["Pod: Payment Service"]
    end
    subgraph "Message Streaming"
      KAFKA["Apache Kafka"] --> T1["Topic: orders"]
      KAFKA --> T2["Topic: payments"]
    end
    subgraph "Caching"
      REDIS["Redis Cluster"]
    end
    subgraph "Reverse Proxy"
      NGINX["Nginx / Envoy"]
    end
    NGINX --> K8S
    POD1 --> KAFKA
    POD2 --> KAFKA
    POD1 --> REDIS
    style K8S fill:#326ce5,stroke:#2457b5,color:#fff
    style KAFKA fill:#231f20,stroke:#000,color:#fff
    style REDIS fill:#dc382d,stroke:#b22222,color:#fff
    style NGINX fill:#009639,stroke:#006d2c,color:#fff`}
                    caption="Fig 4.5 — Modern distributed infrastructure stack"
                />

                <div className="comparison-table-wrapper">
                    <table className="comparison-table">
                        <thead><tr><th>Tool</th><th>Purpose</th><th>Key Feature</th></tr></thead>
                        <tbody>
                            <tr><td><strong>Docker</strong></td><td>Containerization</td><td>Reproducible environments, image layering</td></tr>
                            <tr><td><strong>Kubernetes</strong></td><td>Container orchestration</td><td>Auto-scaling, self-healing, rolling updates</td></tr>
                            <tr><td><strong>Apache Kafka</strong></td><td>Event streaming</td><td>Partitioned log, replay, exactly-once semantics</td></tr>
                            <tr><td><strong>Redis</strong></td><td>In-memory cache/store</td><td>Sub-millisecond reads, pub/sub, data structures</td></tr>
                            <tr><td><strong>Nginx</strong></td><td>Reverse proxy / LB</td><td>High-performance HTTP, SSL termination</td></tr>
                        </tbody>
                    </table>
                </div>

                <div className="callout warning">
                    <strong>Failure scenario:</strong> If Kafka is down, producers can&apos;t write events. Mitigation: local disk buffer (outbox pattern), dead letter queue for failed messages, alerting on consumer lag via Prometheus.
                </div>
            </div>
        </section>
    );
}
