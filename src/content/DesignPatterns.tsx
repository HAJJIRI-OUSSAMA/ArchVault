'use client';
import React from 'react';
import MermaidDiagram from '@/components/MermaidDiagram';
import CodeBlock from '@/components/CodeBlock';

export default function DesignPatterns() {
  return (
    <section className="section" id="patterns">
      <div className="section-header">
        <div className="section-number">Module 03</div>
        <h2>Design Patterns (Modern Context)</h2>
      </div>
      <p>Design patterns are reusable solutions to common software design problems, catalogued in <em>Design Patterns: Elements of Reusable Object-Oriented Software</em> (GoF, 1994). We present them here in a modern TypeScript context with anti-pattern warnings.</p>

      {/* Creational */}
      <div id="patterns-creational">
        <h3>Creational Patterns</h3>
        <p>Creational patterns abstract the instantiation process, making the system independent of how objects are created, composed, and represented.</p>

        <h4>Singleton</h4>
        <p><strong>Problem:</strong> Ensure a class has only one instance and provide a global point of access.</p>
        <MermaidDiagram chart={`classDiagram
    class Singleton {
      -static instance: Singleton
      -constructor()
      +static getInstance(): Singleton
      +operation(): void
    }`} caption="Fig 3.1 — Singleton UML" />

        <CodeBlock language="typescript" code={`class DatabaseConnection {
  private static instance: DatabaseConnection;
  private constructor(private readonly connectionString: string) {}

  static getInstance(): DatabaseConnection {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection(
        process.env.DATABASE_URL!
      );
    }
    return DatabaseConnection.instance;
  }

  async query(sql: string): Promise<unknown> {
    // Execute query on the shared connection
    console.log(\`Executing: \${sql}\`);
    return {};
  }
}`} />

        <div className="antipattern">
          <h4>⚠️ Anti-pattern Warning</h4>
          <p>Singletons create hidden global state and make unit testing difficult. Prefer <strong>dependency injection</strong> with a singleton-scoped container registration instead of the class managing its own lifecycle.</p>
        </div>

        <h4>Factory Method</h4>
        <p><strong>Problem:</strong> Define an interface for creating objects, but let subclasses decide which class to instantiate.</p>

        <CodeBlock language="typescript" code={`interface Notification {
  send(message: string): void;
}

class EmailNotification implements Notification {
  send(message: string) { console.log(\`📧 Email: \${message}\`); }
}

class SMSNotification implements Notification {
  send(message: string) { console.log(\`📱 SMS: \${message}\`); }
}

class PushNotification implements Notification {
  send(message: string) { console.log(\`🔔 Push: \${message}\`); }
}

// Factory
function createNotification(channel: 'email' | 'sms' | 'push'): Notification {
  const map: Record<string, () => Notification> = {
    email: () => new EmailNotification(),
    sms: () => new SMSNotification(),
    push: () => new PushNotification(),
  };
  return map[channel]();
}

// Usage
const notif = createNotification('email');
notif.send('Welcome aboard!');`} />

        <h4>Builder</h4>
        <p><strong>Problem:</strong> Construct complex objects step by step, allowing different representations from the same construction process.</p>
        <CodeBlock language="typescript" code={`class QueryBuilder {
  private table = '';
  private conditions: string[] = [];
  private orderField = '';
  private limitCount = 0;

  from(table: string): this { this.table = table; return this; }
  where(condition: string): this { this.conditions.push(condition); return this; }
  orderBy(field: string): this { this.orderField = field; return this; }
  limit(count: number): this { this.limitCount = count; return this; }

  build(): string {
    let sql = \`SELECT * FROM \${this.table}\`;
    if (this.conditions.length) sql += \` WHERE \${this.conditions.join(' AND ')}\`;
    if (this.orderField) sql += \` ORDER BY \${this.orderField}\`;
    if (this.limitCount) sql += \` LIMIT \${this.limitCount}\`;
    return sql;
  }
}

// Usage — readable, flexible, type-safe
const query = new QueryBuilder()
  .from('users')
  .where('active = true')
  .where('role = \\'admin\\'')
  .orderBy('created_at DESC')
  .limit(10)
  .build();`} />
      </div>

      {/* Structural */}
      <div id="patterns-structural">
        <h3>Structural Patterns</h3>
        <p>Structural patterns deal with object composition, creating larger structures from individual parts while keeping them flexible and efficient.</p>

        <h4>Adapter</h4>
        <p><strong>Problem:</strong> Convert the interface of a class into another interface clients expect. Lets classes work together that couldn&apos;t otherwise.</p>

        <MermaidDiagram chart={`classDiagram
    class Target {
      <<interface>>
      +request(): string
    }
    class Adaptee {
      +specificRequest(): string
    }
    class Adapter {
      -adaptee: Adaptee
      +request(): string
    }
    Target <|.. Adapter
    Adapter --> Adaptee`} caption="Fig 3.2 — Adapter Pattern UML" />

        <CodeBlock language="typescript" code={`// Legacy payment processor with incompatible interface
class LegacyPaymentGateway {
  makePayment(amount: number, curr: string) {
    return { status: 'OK', ref: 'LGW-' + Date.now() };
  }
}

// Modern interface our app expects
interface PaymentProcessor {
  charge(amountCents: number, currency: string): Promise<{ success: boolean; id: string }>;
}

// Adapter bridges the gap
class LegacyPaymentAdapter implements PaymentProcessor {
  constructor(private legacy: LegacyPaymentGateway) {}

  async charge(amountCents: number, currency: string) {
    const result = this.legacy.makePayment(amountCents / 100, currency);
    return { success: result.status === 'OK', id: result.ref };
  }
}`} />

        <h4>Decorator</h4>
        <p><strong>Problem:</strong> Attach additional responsibilities to an object dynamically, providing a flexible alternative to subclassing.</p>

        <CodeBlock language="typescript" code={`interface Logger {
  log(message: string): void;
}

class ConsoleLogger implements Logger {
  log(message: string) { console.log(message); }
}

// Decorator: adds timestamp
class TimestampLogger implements Logger {
  constructor(private inner: Logger) {}
  log(message: string) {
    this.inner.log(\`[\${new Date().toISOString()}] \${message}\`);
  }
}

// Decorator: adds log level
class LevelLogger implements Logger {
  constructor(private inner: Logger, private level: string) {}
  log(message: string) {
    this.inner.log(\`[\${this.level}] \${message}\`);
  }
}

// Compose decorators
const logger = new TimestampLogger(new LevelLogger(new ConsoleLogger(), 'INFO'));
logger.log('Server started'); // [2024-01-15T10:30:00Z] [INFO] Server started`} />

        <h4>Facade</h4>
        <p><strong>Problem:</strong> Provide a simplified interface to a complex subsystem. Reduces coupling between client code and internal complexity.</p>
        <CodeBlock language="typescript" code={`// Complex subsystem classes
class VideoDecoder { decode(file: string) { return 'decoded-' + file; } }
class AudioMixer { mix(audio: string) { return 'mixed-' + audio; } }
class Renderer { render(video: string, audio: string) { return \`rendered(\${video},\${audio})\`; } }

// Facade simplifies usage
class MediaConverter {
  private decoder = new VideoDecoder();
  private mixer = new AudioMixer();
  private renderer = new Renderer();

  convert(inputFile: string): string {
    const video = this.decoder.decode(inputFile);
    const audio = this.mixer.mix(inputFile);
    return this.renderer.render(video, audio);
  }
}

// Client uses simple interface
const converter = new MediaConverter();
converter.convert('movie.mp4');`} />
      </div>

      {/* Behavioral */}
      <div id="patterns-behavioral">
        <h3>Behavioral Patterns</h3>
        <p>Behavioral patterns characterize complex control flow and define how objects interact and distribute responsibility.</p>

        <h4>Observer</h4>
        <p><strong>Problem:</strong> Define a one-to-many dependency so that when one object changes state, all dependents are notified automatically. Foundation of event-driven systems.</p>

        <MermaidDiagram chart={`classDiagram
    class EventEmitter {
      -listeners: Map
      +on(event, handler): void
      +emit(event, data): void
      +off(event, handler): void
    }
    class OrderService {
      +placeOrder(): void
    }
    class EmailService {
      +onOrderPlaced(): void
    }
    class AnalyticsService {
      +onOrderPlaced(): void
    }
    EventEmitter <|-- OrderService
    OrderService ..> EmailService : notifies
    OrderService ..> AnalyticsService : notifies`} caption="Fig 3.3 — Observer Pattern" />

        <CodeBlock language="typescript" code={`type Handler<T = unknown> = (data: T) => void;

class EventEmitter {
  private listeners = new Map<string, Set<Handler>>();

  on<T>(event: string, handler: Handler<T>): void {
    if (!this.listeners.has(event)) this.listeners.set(event, new Set());
    this.listeners.get(event)!.add(handler as Handler);
  }

  emit<T>(event: string, data: T): void {
    this.listeners.get(event)?.forEach(handler => handler(data));
  }

  off(event: string, handler: Handler): void {
    this.listeners.get(event)?.delete(handler);
  }
}

// Usage
const bus = new EventEmitter();
bus.on<{ id: string }>('order:placed', (data) => {
  console.log(\`Send confirmation for order \${data.id}\`);
});
bus.emit('order:placed', { id: 'ORD-42' });`} />

        <h4>Strategy</h4>
        <p><strong>Problem:</strong> Define a family of algorithms, encapsulate each one, and make them interchangeable at runtime.</p>

        <CodeBlock language="typescript" code={`interface CompressionStrategy {
  compress(data: Buffer): Buffer;
  name: string;
}

const gzipStrategy: CompressionStrategy = {
  name: 'gzip',
  compress(data: Buffer) { /* gzip implementation */ return data; }
};

const brotliStrategy: CompressionStrategy = {
  name: 'brotli',
  compress(data: Buffer) { /* brotli implementation */ return data; }
};

class FileCompressor {
  constructor(private strategy: CompressionStrategy) {}

  setStrategy(strategy: CompressionStrategy) {
    this.strategy = strategy;
  }

  compress(data: Buffer): Buffer {
    console.log(\`Compressing with \${this.strategy.name}\`);
    return this.strategy.compress(data);
  }
}

// Swap algorithms at runtime
const compressor = new FileCompressor(gzipStrategy);
compressor.compress(Buffer.from('data'));
compressor.setStrategy(brotliStrategy);
compressor.compress(Buffer.from('data'));`} />
      </div>

      {/* DI & IoC */}
      <div id="patterns-di">
        <h3>Dependency Injection &amp; Inversion of Control</h3>
        <p><strong>Inversion of Control (IoC)</strong> is the principle: don&apos;t call us, we&apos;ll call you. Instead of a class creating its own dependencies, they are &quot;injected&quot; from the outside. <strong>Dependency Injection (DI)</strong> is the most common implementation of IoC.</p>

        <MermaidDiagram chart={`graph TB
    subgraph "Without DI (Tight Coupling)"
      A1["OrderService"] -->|"creates"| B1["MySQLRepository"]
    end
    subgraph "With DI (Loose Coupling)"
      A2["OrderService"] -->|"depends on"| I["Repository Interface"]
      B2["MySQLRepository"] -.->|"implements"| I
      B3["PostgresRepository"] -.->|"implements"| I
      B4["InMemoryRepository"] -.->|"implements"| I
    end
    style A2 fill:#10b981,stroke:#059669,color:#fff
    style I fill:#6366f1,stroke:#4f46e5,color:#fff
    style A1 fill:#ef4444,stroke:#dc2626,color:#fff`} caption="Fig 3.4 — DI enables loose coupling via abstractions" />

        <CodeBlock language="typescript" code={`// Define the interface (port)
interface UserRepository {
  findById(id: string): Promise<User | null>;
  save(user: User): Promise<void>;
}

// Service depends on abstraction, not implementation
class UserService {
  constructor(private readonly repo: UserRepository) {} // Injected!

  async getUser(id: string) {
    const user = await this.repo.findById(id);
    if (!user) throw new Error('User not found');
    return user;
  }
}

// In production: inject real repo
const service = new UserService(new PostgresUserRepository(db));

// In tests: inject mock
const testService = new UserService(new InMemoryUserRepository());`} />

        <div className="callout tip">
          <strong>Benefits of DI:</strong> Testability (swap real DB for in-memory), flexibility (change implementations without changing consumers), and explicit dependencies (constructor signature documents what a class needs).
        </div>
      </div>

      {/* Composition over Inheritance */}
      <div id="patterns-composition">
        <h3>Composition over Inheritance</h3>
        <p>The GoF book itself recommends: <em>&quot;Favor object composition over class inheritance.&quot;</em> Inheritance creates rigid hierarchies; composition creates flexible, reusable building blocks.</p>

        <CodeBlock language="typescript" code={`// ❌ Inheritance: rigid hierarchy
class Animal { move() {} }
class FlyingAnimal extends Animal { fly() {} }
class SwimmingAnimal extends Animal { swim() {} }
// What about a duck that flies AND swims? Multiple inheritance problem!

// ✅ Composition: flexible behaviors
interface Behavior { execute(): void; }

const canFly: Behavior = { execute() { console.log('Flying!'); } };
const canSwim: Behavior = { execute() { console.log('Swimming!'); } };
const canWalk: Behavior = { execute() { console.log('Walking!'); } };

class Animal {
  constructor(
    public name: string,
    private behaviors: Behavior[]
  ) {}

  performAll() { this.behaviors.forEach(b => b.execute()); }
}

const duck = new Animal('Duck', [canFly, canSwim, canWalk]);
duck.performAll(); // Flying! Swimming! Walking!`} />

        <div className="antipattern">
          <h4>⚠️ Anti-pattern: Deep Inheritance Hierarchies</h4>
          <p>Inheritance trees deeper than 2-3 levels become brittle. Changes to a base class ripple unpredictably. The &quot;banana, gorilla, jungle&quot; problem: you wanted a banana, but got a gorilla holding the banana and the entire jungle.</p>
        </div>
      </div>
    </section>
  );
}
