import Layout from '@/components/Layout';

export default function SystemDesignsPage() {
  return (
    <Layout>
      <h1>System Designs</h1>
      <p>
        This section covers system design fundamentals, patterns, and case studies
        from my experience building scalable distributed systems.
      </p>

      <section id="fundamentals">
        <h2>Fundamentals</h2>
        <p>
          Understanding system design fundamentals is essential for building robust,
          scalable applications.
        </p>
        <h3>Core Concepts</h3>
        <ul>
          <li><strong>CAP Theorem:</strong> Consistency, Availability, Partition Tolerance trade-offs</li>
          <li><strong>ACID vs BASE:</strong> When to use strong vs eventual consistency</li>
          <li><strong>Latency vs Throughput:</strong> Understanding performance trade-offs</li>
          <li><strong>Synchronous vs Asynchronous:</strong> Communication patterns</li>
        </ul>
        <p>
          These fundamentals form the foundation for making informed architectural decisions.
        </p>
      </section>

      <section id="scalability">
        <h2>Scalability</h2>
        <p>
          Scaling systems effectively requires understanding both horizontal and vertical
          scaling strategies.
        </p>
        <h3>Scaling Strategies</h3>
        <ul>
          <li><strong>Horizontal Scaling:</strong> Adding more machines to distribute load</li>
          <li><strong>Vertical Scaling:</strong> Adding more power to existing machines</li>
          <li><strong>Database Sharding:</strong> Partitioning data across multiple databases</li>
          <li><strong>Caching:</strong> Reducing load on primary data stores</li>
          <li><strong>CDNs:</strong> Distributing content closer to users</li>
        </ul>
        <p>
          The key is understanding when each strategy is appropriate and the trade-offs involved.
        </p>
      </section>

      <section id="reliability">
        <h2>Reliability</h2>
        <p>
          Building reliable systems requires planning for failure and implementing
          appropriate safeguards.
        </p>
        <h3>Reliability Patterns</h3>
        <ul>
          <li><strong>Redundancy:</strong> Eliminating single points of failure</li>
          <li><strong>Circuit Breakers:</strong> Preventing cascade failures</li>
          <li><strong>Retries with Backoff:</strong> Handling transient failures gracefully</li>
          <li><strong>Health Checks:</strong> Detecting and routing around failures</li>
          <li><strong>Graceful Degradation:</strong> Maintaining partial functionality under load</li>
        </ul>
      </section>

      <section id="architecture-patterns">
        <h2>Architecture Patterns</h2>
        <p>
          Common architectural patterns provide proven solutions to recurring problems.
        </p>
        <h3>Key Patterns</h3>
        <ul>
          <li><strong>Microservices:</strong> Decomposing monoliths into independent services</li>
          <li><strong>Event-Driven Architecture:</strong> Decoupling through events and messages</li>
          <li><strong>CQRS:</strong> Separating read and write models for optimization</li>
          <li><strong>Saga Pattern:</strong> Managing distributed transactions</li>
          <li><strong>API Gateway:</strong> Centralizing cross-cutting concerns</li>
        </ul>
        <p>
          Choosing the right pattern depends on your specific requirements, team expertise,
          and operational capabilities.
        </p>
      </section>

      <section id="case-studies">
        <h2>Case Studies</h2>
        <p>
          Real-world examples of system design challenges and solutions.
        </p>
        <h3>Example: High-Traffic Event System</h3>
        <p>
          Designed and implemented a system handling 10M+ events per day with sub-second
          latency requirements. Key decisions included:
        </p>
        <ul>
          <li>Kafka for event streaming and buffering</li>
          <li>Redis for real-time aggregations</li>
          <li>PostgreSQL with TimescaleDB for historical data</li>
          <li>Kubernetes for auto-scaling based on queue depth</li>
        </ul>
        <h3>Example: Global Content Delivery</h3>
        <p>
          Architected a content delivery system serving users across 50+ countries with
          P99 latency under 100ms. The solution leveraged:
        </p>
        <ul>
          <li>Multi-region deployment with active-active configuration</li>
          <li>Edge caching with intelligent cache invalidation</li>
          <li>Geographic load balancing with health-aware routing</li>
        </ul>
      </section>
    </Layout>
  );
}
