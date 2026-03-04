'use client';
import React from 'react';
import MermaidDiagram from '@/components/MermaidDiagram';
import CodeBlock from '@/components/CodeBlock';

export default function DevOps() {
    return (
        <section className="section" id="devops">
            <div className="section-header">
                <div className="section-number">Module 06</div>
                <h2>DevOps &amp; Production Engineering</h2>
            </div>
            <p>DevOps bridges development and operations, emphasizing automation, continuous delivery, and reliability. Production engineering ensures systems are observable, resilient, and maintainable in production.</p>

            {/* CI/CD */}
            <div id="devops-cicd">
                <h3>CI/CD Pipelines</h3>
                <p><strong>Continuous Integration:</strong> Developers merge code frequently; each merge triggers automated build and tests. <strong>Continuous Delivery:</strong> Code is always in a deployable state. <strong>Continuous Deployment:</strong> Every passing build is automatically deployed to production.</p>

                <MermaidDiagram chart={`graph LR
    A["Git Push"] --> B["Build"]
    B --> C["Unit Tests"]
    C --> D["Integration Tests"]
    D --> E["Security Scan"]
    E --> F["Build Docker Image"]
    F --> G["Push to Registry"]
    G --> H{"Manual Approval?"}
    H -->|CD| I["Deploy to Staging"]
    I --> J["Smoke Tests"]
    J --> K["Deploy to Production"]
    H -->|Auto| K
    style A fill:#6366f1,stroke:#4f46e5,color:#fff
    style K fill:#10b981,stroke:#059669,color:#fff`}
                    caption="Fig 6.1 — CI/CD pipeline: from commit to production"
                />

                <CodeBlock language="yaml" code={`# GitHub Actions — CI/CD Pipeline
name: CI/CD Pipeline
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20' }
      - run: npm ci
      - run: npm run lint
      - run: npm test -- --coverage
      - run: npm run build

  deploy:
    needs: test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Deploy to production
        run: |
          docker build -t app:$GITHUB_SHA .
          docker push registry.example.com/app:$GITHUB_SHA
          kubectl set image deployment/app app=registry.example.com/app:$GITHUB_SHA`} />
            </div>

            {/* Deployment Strategies */}
            <div id="devops-deploy">
                <h3>Deployment Strategies</h3>

                <MermaidDiagram chart={`graph TB
    subgraph "Blue-Green Deployment"
      LB1["Load Balancer"] --> BLUE["Blue (Current v1)"]
      LB1 -.->|"Switch"| GREEN["Green (New v2)"]
    end
    subgraph "Canary Release"
      LB2["Load Balancer"] -->|"95%"| V1["v1 (Stable)"]
      LB2 -->|"5%"| V2["v2 (Canary)"]
    end
    subgraph "Rolling Update"
      LB3["Load Balancer"] --> R1["v2 ✅"]
      LB3 --> R2["v2 ✅"]
      LB3 --> R3["v1 → v2 🔄"]
      LB3 --> R4["v1"]
    end
    style BLUE fill:#3b82f6,stroke:#2563eb,color:#fff
    style GREEN fill:#10b981,stroke:#059669,color:#fff
    style V2 fill:#f59e0b,stroke:#d97706,color:#fff`}
                    caption="Fig 6.2 — Deployment strategies comparison"
                />

                <div className="comparison-table-wrapper">
                    <table className="comparison-table">
                        <thead><tr><th>Strategy</th><th>Risk</th><th>Rollback Speed</th><th>Resource Cost</th><th>Best For</th></tr></thead>
                        <tbody>
                            <tr><td><strong>Blue-Green</strong></td><td>Low</td><td>Instant (switch LB)</td><td>2x infrastructure</td><td>Critical services, zero-downtime</td></tr>
                            <tr><td><strong>Canary</strong></td><td>Very Low</td><td>Fast (route away)</td><td>Minimal extra</td><td>User-facing changes, gradual rollout</td></tr>
                            <tr><td><strong>Rolling</strong></td><td>Medium</td><td>Moderate</td><td>Minimal</td><td>Stateless services on K8s</td></tr>
                            <tr><td><strong>Recreate</strong></td><td>High</td><td>Slow</td><td>None</td><td>Dev/staging environments only</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Infrastructure as Code */}
            <div id="devops-iac">
                <h3>Infrastructure as Code (IaC)</h3>
                <p>IaC manages infrastructure through machine-readable definition files rather than manual processes. Benefits: reproducibility, version control, peer review, automated provisioning.</p>

                <CodeBlock language="hcl" code={`# Terraform — AWS ECS Service
resource "aws_ecs_service" "app" {
  name            = "app-service"
  cluster         = aws_ecs_cluster.main.id
  task_definition = aws_ecs_task_definition.app.arn
  desired_count   = 3
  launch_type     = "FARGATE"

  load_balancer {
    target_group_arn = aws_lb_target_group.app.arn
    container_name   = "app"
    container_port   = 3000
  }

  network_configuration {
    subnets          = aws_subnet.private[*].id
    security_groups  = [aws_security_group.app.id]
    assign_public_ip = false
  }
}`} />
                <div className="callout tip">
                    <strong>GitOps:</strong> Store all infrastructure definitions in Git. Changes are applied via pull requests, providing audit trail, peer review, and easy rollback. Tools: ArgoCD, Flux.
                </div>
            </div>

            {/* Observability */}
            <div id="devops-observability">
                <h3>Observability</h3>
                <p>Observability is the ability to understand a system&apos;s internal state from its external outputs. The three pillars: <strong>Logs</strong> (discrete events), <strong>Metrics</strong> (aggregated measurements), <strong>Traces</strong> (request flow across services).</p>

                <MermaidDiagram chart={`graph TB
    APP["Application Services"] -->|"Metrics"| PROM["Prometheus"]
    APP -->|"Logs"| LOKI["Loki / ELK"]
    APP -->|"Traces"| JAEGER["Jaeger / Tempo"]
    PROM --> GRAF["Grafana Dashboard"]
    LOKI --> GRAF
    JAEGER --> GRAF
    GRAF --> ALERT["Alertmanager"]
    ALERT --> PD["PagerDuty / Slack"]
    style GRAF fill:#f59e0b,stroke:#d97706,color:#fff
    style PROM fill:#e6522c,stroke:#c4441e,color:#fff`}
                    caption="Fig 6.3 — Observability stack: metrics, logs, traces → Grafana"
                />

                <div className="callout info">
                    <strong>Incident walkthrough:</strong> A Grafana dashboard shows p99 latency spiking to 2s (SLO: 500ms). Prometheus alert fires → PagerDuty pages on-call. Engineer checks traces in Jaeger, identifies slow DB query. Checks logs: missing index on new column. Fix: add index, verify latency drops. Post-incident: update runbook, add index as part of migration CI check.
                </div>
            </div>

            {/* SRE */}
            <div id="devops-sre">
                <h3>SRE Principles</h3>
                <p>Site Reliability Engineering (Google) applies software engineering practices to operations. Core concepts:</p>

                <ul>
                    <li><strong>SLI (Service Level Indicator):</strong> A measurable metric — e.g., request latency p99, error rate, throughput.</li>
                    <li><strong>SLO (Service Level Objective):</strong> A target for an SLI — e.g., &quot;99.9% of requests complete in under 300ms.&quot;</li>
                    <li><strong>SLA (Service Level Agreement):</strong> A contractual commitment with consequences — e.g., &quot;99.95% uptime or credits issued.&quot;</li>
                    <li><strong>Error Budget:</strong> The tolerable amount of unreliability. If SLO = 99.9%, error budget = 0.1% (~43 min/month). When budget is exhausted, slow down feature releases and focus on reliability.</li>
                </ul>

                <div className="comparison-table-wrapper">
                    <table className="comparison-table">
                        <thead><tr><th>Availability</th><th>Downtime/Year</th><th>Downtime/Month</th><th>Typical For</th></tr></thead>
                        <tbody>
                            <tr><td><strong>99%</strong></td><td>3.65 days</td><td>7.3 hours</td><td>Internal tools</td></tr>
                            <tr><td><strong>99.9%</strong></td><td>8.76 hours</td><td>43.8 minutes</td><td>SaaS products</td></tr>
                            <tr><td><strong>99.99%</strong></td><td>52.6 minutes</td><td>4.38 minutes</td><td>Payment systems</td></tr>
                            <tr><td><strong>99.999%</strong></td><td>5.26 minutes</td><td>26.3 seconds</td><td>Core infrastructure</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}
