'use client';
import React from 'react';
import MermaidDiagram from '@/components/MermaidDiagram';
import CodeBlock from '@/components/CodeBlock';

export default function Security() {
    return (
        <section className="section" id="security">
            <div className="section-header">
                <div className="section-number">Module 07</div>
                <h2>Security Engineering</h2>
            </div>
            <p>Security is not a feature — it&apos;s a property of the system. Modern applications face sophisticated threats and must implement defense-in-depth. Reference: <a href="https://owasp.org" target="_blank" rel="noopener noreferrer">OWASP Foundation</a>.</p>

            {/* OWASP Top 10 */}
            <div id="sec-owasp">
                <h3>OWASP Top 10 (2021)</h3>
                <p>The OWASP Top 10 represents the most critical security risks to web applications, updated periodically based on data from hundreds of organizations.</p>

                <div className="comparison-table-wrapper">
                    <table className="comparison-table">
                        <thead><tr><th>#</th><th>Risk</th><th>Description</th><th>Prevention</th></tr></thead>
                        <tbody>
                            <tr><td><strong>A01</strong></td><td>Broken Access Control</td><td>Users act outside intended permissions</td><td>Deny by default, enforce server-side</td></tr>
                            <tr><td><strong>A02</strong></td><td>Cryptographic Failures</td><td>Weak crypto, exposed sensitive data</td><td>TLS everywhere, strong hashing (bcrypt/argon2)</td></tr>
                            <tr><td><strong>A03</strong></td><td>Injection</td><td>SQL, NoSQL, OS command injection</td><td>Parameterized queries, input validation</td></tr>
                            <tr><td><strong>A04</strong></td><td>Insecure Design</td><td>Flaws in architecture/design</td><td>Threat modeling, secure design patterns</td></tr>
                            <tr><td><strong>A05</strong></td><td>Security Misconfiguration</td><td>Default configs, verbose errors</td><td>Hardening, automated config scanning</td></tr>
                            <tr><td><strong>A06</strong></td><td>Vulnerable Components</td><td>Outdated libraries with known CVEs</td><td>SCA tools (Snyk, Dependabot)</td></tr>
                            <tr><td><strong>A07</strong></td><td>Auth Failures</td><td>Broken authentication</td><td>MFA, strong password policies, rate limiting</td></tr>
                            <tr><td><strong>A08</strong></td><td>Software &amp; Data Integrity</td><td>Untrusted CI/CD, insecure deserialization</td><td>Signed artifacts, integrity checks</td></tr>
                            <tr><td><strong>A09</strong></td><td>Logging &amp; Monitoring Failures</td><td>Insufficient logging for detection</td><td>Centralized logging, alerting, SIEM</td></tr>
                            <tr><td><strong>A10</strong></td><td>SSRF</td><td>Server-side request forgery</td><td>Allowlists, network segmentation</td></tr>
                        </tbody>
                    </table>
                </div>

                <MermaidDiagram chart={`graph TB
    ATK["Attacker"] -->|"SQL Injection"| WAF["WAF / Input Validation"]
    ATK -->|"Brute Force"| RL["Rate Limiter"]
    ATK -->|"XSS"| CSP["Content Security Policy"]
    ATK -->|"CSRF"| CSRF["CSRF Token Validation"]
    WAF --> APP["Application"]
    RL --> APP
    CSP --> APP
    CSRF --> APP
    APP --> AUTH["Auth Layer"]
    APP --> AUTHZ["Authorization Layer"]
    AUTH --> DB["Database"]
    style ATK fill:#ef4444,stroke:#dc2626,color:#fff
    style APP fill:#6366f1,stroke:#4f46e5,color:#fff
    style WAF fill:#10b981,stroke:#059669,color:#fff`}
                    caption="Fig 7.1 — Attack-prevention mapping: defense in depth"
                />
            </div>

            {/* Authentication vs Authorization */}
            <div id="sec-auth">
                <h3>Authentication vs Authorization</h3>
                <div className="comparison-table-wrapper">
                    <table className="comparison-table">
                        <thead><tr><th>Aspect</th><th>Authentication (AuthN)</th><th>Authorization (AuthZ)</th></tr></thead>
                        <tbody>
                            <tr><td><strong>Question</strong></td><td>&quot;Who are you?&quot;</td><td>&quot;What can you do?&quot;</td></tr>
                            <tr><td><strong>Verifies</strong></td><td>Identity</td><td>Permissions</td></tr>
                            <tr><td><strong>Mechanism</strong></td><td>Password, MFA, SSO, biometrics</td><td>RBAC, ABAC, ACL, policies</td></tr>
                            <tr><td><strong>Happens</strong></td><td>Before authorization</td><td>After authentication</td></tr>
                            <tr><td><strong>Failure</strong></td><td>401 Unauthorized</td><td>403 Forbidden</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* OAuth2 & JWT */}
            <div id="sec-oauth">
                <h3>OAuth2 &amp; JWT</h3>
                <p><strong>OAuth2</strong> is an authorization framework that enables third-party applications to obtain limited access to a service, without exposing user credentials. <strong>JWT</strong> (JSON Web Tokens) are compact, self-contained tokens for transmitting claims between parties.</p>

                <MermaidDiagram chart={`sequenceDiagram
    participant User
    participant Client App
    participant Auth Server
    participant Resource Server

    User->>Client App: Click "Login with Google"
    Client App->>Auth Server: Redirect to /authorize
    Auth Server->>User: Show consent screen
    User->>Auth Server: Grant permission
    Auth Server->>Client App: Authorization code
    Client App->>Auth Server: Exchange code for tokens
    Auth Server->>Client App: Access Token + Refresh Token
    Client App->>Resource Server: API call with Bearer token
    Resource Server->>Resource Server: Validate JWT
    Resource Server->>Client App: Protected resource`}
                    caption="Fig 7.2 — OAuth2 Authorization Code Flow"
                />

                <h4>JWT Structure</h4>
                <CodeBlock language="typescript" code={`// JWT has 3 parts: Header.Payload.Signature

// Header
{ "alg": "RS256", "typ": "JWT" }

// Payload (Claims)
{
  "sub": "user-123",        // Subject (user ID)
  "iss": "auth.example.com", // Issuer
  "aud": "api.example.com",  // Audience
  "exp": 1700000000,         // Expiration
  "iat": 1699996400,         // Issued at
  "roles": ["admin", "user"],
  "tenant_id": "org-456"
}

// Signature: RS256(base64(header) + "." + base64(payload), privateKey)

// ⚠️ Never store sensitive data in JWT payload — it's base64 encoded, NOT encrypted
// ⚠️ Always validate: signature, exp, iss, aud on the server side`} />

                <div className="antipattern">
                    <h4>⚠️ Anti-pattern: Storing JWTs in localStorage</h4>
                    <p>localStorage is accessible to any JavaScript on the page, making JWTs vulnerable to XSS attacks. Use <strong>httpOnly, secure, SameSite cookies</strong> instead. If you must use localStorage, implement a short-lived access token + refresh token rotation pattern.</p>
                </div>
            </div>

            {/* RBAC */}
            <div id="sec-rbac">
                <h3>RBAC &amp; Multi-tenant Security</h3>
                <p><strong>Role-Based Access Control (RBAC)</strong> assigns permissions to roles, then roles to users. This simplifies permission management compared to assigning permissions directly to users.</p>

                <MermaidDiagram chart={`graph TB
    U1["User: Alice"] --> R1["Role: Admin"]
    U2["User: Bob"] --> R2["Role: Editor"]
    U3["User: Carol"] --> R3["Role: Viewer"]
    R1 --> P1["Permission: Read"]
    R1 --> P2["Permission: Write"]
    R1 --> P3["Permission: Delete"]
    R1 --> P4["Permission: Manage Users"]
    R2 --> P1
    R2 --> P2
    R3 --> P1
    style R1 fill:#ef4444,stroke:#dc2626,color:#fff
    style R2 fill:#f59e0b,stroke:#d97706,color:#fff
    style R3 fill:#10b981,stroke:#059669,color:#fff`}
                    caption="Fig 7.3 — RBAC: users → roles → permissions"
                />

                <h4>Multi-tenant Security</h4>
                <ul>
                    <li><strong>Data isolation:</strong> Every query MUST be scoped by <code>tenant_id</code>. Use row-level security (PostgreSQL RLS) for enforcement at the database layer.</li>
                    <li><strong>Token scoping:</strong> JWTs must include <code>tenant_id</code>. The API layer validates that every request accesses only data belonging to that tenant.</li>
                    <li><strong>Network isolation:</strong> In regulated industries, use separate VPCs or namespaces per tenant.</li>
                    <li><strong>Key management:</strong> Per-tenant encryption keys for data-at-rest encryption.</li>
                </ul>

                <CodeBlock language="sql" code={`-- PostgreSQL Row-Level Security for multi-tenant isolation
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY tenant_isolation ON orders
  USING (tenant_id = current_setting('app.current_tenant')::uuid);

-- Set tenant context at the start of each request
SET app.current_tenant = 'tenant-uuid-here';

-- Now all queries are automatically scoped!
SELECT * FROM orders; -- Only returns rows for current tenant`} />
            </div>

            {/* Zero Trust */}
            <div id="sec-zerotrust">
                <h3>Zero Trust Architecture</h3>
                <p>Zero Trust operates on the principle: <strong>&quot;Never trust, always verify.&quot;</strong> Every request — whether from inside or outside the network — must be authenticated, authorized, and encrypted. There is no trusted internal network.</p>

                <MermaidDiagram chart={`graph TB
    subgraph "Zero Trust Principles"
      V["Verify Explicitly<br/>Always authenticate & authorize"]
      L["Least Privilege<br/>Minimum required access"]
      B["Assume Breach<br/>Minimize blast radius"]
    end
    subgraph "Implementation"
      V --> MFA["MFA + Device Trust"]
      V --> MTLS["mTLS Between Services"]
      L --> RBAC["RBAC + ABAC"]
      L --> JIT["Just-In-Time Access"]
      B --> SEG["Micro-segmentation"]
      B --> LOG["Comprehensive Logging"]
    end
    style V fill:#6366f1,stroke:#4f46e5,color:#fff
    style L fill:#10b981,stroke:#059669,color:#fff
    style B fill:#ef4444,stroke:#dc2626,color:#fff`}
                    caption="Fig 7.4 — Zero Trust: principles and implementation pillars"
                />

                <div className="callout info">
                    <strong>Secure architecture blueprint:</strong> Client → WAF → API Gateway (TLS termination, rate limiting) → Auth service (JWT validation) → Service mesh (mTLS) → Application (RBAC enforcement) → Database (RLS, encryption at rest). Every layer independently verifies trust.
                </div>
            </div>
        </section>
    );
}
