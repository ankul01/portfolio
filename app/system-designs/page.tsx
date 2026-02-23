import Layout from '@/components/Layout';

export default function SystemDesignsPage() {
  return (
    <Layout>
      <h1>System Designs</h1>
      <p>
        This section covers system design thinking from my experience building high-throughput 
        platforms in insurance, payments, and e-commerce. The focus is on practical patterns 
        that work at scale under real-world constraints.
      </p>

      <section id="core-concepts">
        <h2>Core System Design Concepts</h2>
        <p>
          These are the foundational concepts that appear repeatedly across system design problems. 
          Understanding when and why to use each is more important than memorizing implementations.
        </p>

        <h3>1. CAP Theorem</h3>
        <p>
          <strong>What it is:</strong> In a distributed system, you can only guarantee two of three 
          properties: <strong>Consistency</strong> (all nodes see the same data), <strong>Availability</strong> (every 
          request gets a response), and <strong>Partition Tolerance</strong> (system works despite network failures).
        </p>
        <p>
          <strong>When to use:</strong> Since network partitions are inevitable, the real choice is 
          between CP (consistency over availability) and AP (availability over consistency).
        </p>
        <ul>
          <li><strong>CP systems:</strong> Banking, inventory management, booking systems — where stale data causes real harm</li>
          <li><strong>AP systems:</strong> Social feeds, analytics, caching — where eventual consistency is acceptable</li>
        </ul>

        <h3>2. Consistency Models</h3>
        <p>
          <strong>What it is:</strong> The contract between a distributed system and its clients about 
          when writes become visible to reads.
        </p>
        <table className="w-full text-sm border-collapse border border-gray-200 my-4">
          <thead>
            <tr className="bg-gray-50">
              <th className="border border-gray-200 px-3 py-2 text-left">Model</th>
              <th className="border border-gray-200 px-3 py-2 text-left">Guarantee</th>
              <th className="border border-gray-200 px-3 py-2 text-left">Use Case</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-200 px-3 py-2">Strong Consistency</td>
              <td className="border border-gray-200 px-3 py-2">Read always sees latest write</td>
              <td className="border border-gray-200 px-3 py-2">Financial transactions, inventory</td>
            </tr>
            <tr>
              <td className="border border-gray-200 px-3 py-2">Eventual Consistency</td>
              <td className="border border-gray-200 px-3 py-2">Reads converge to latest write over time</td>
              <td className="border border-gray-200 px-3 py-2">Social feeds, DNS, caching</td>
            </tr>
            <tr>
              <td className="border border-gray-200 px-3 py-2">Causal Consistency</td>
              <td className="border border-gray-200 px-3 py-2">Causally related writes seen in order</td>
              <td className="border border-gray-200 px-3 py-2">Collaborative editing, comments</td>
            </tr>
            <tr>
              <td className="border border-gray-200 px-3 py-2">Read-your-writes</td>
              <td className="border border-gray-200 px-3 py-2">User sees their own writes immediately</td>
              <td className="border border-gray-200 px-3 py-2">User profile updates</td>
            </tr>
          </tbody>
        </table>

        <h3>3. Unique ID Generation</h3>
        <p>
          <strong>What it is:</strong> Generating globally unique identifiers in distributed systems 
          without coordination.
        </p>
        <p><strong>Common approaches:</strong></p>
        <ul>
          <li><strong>UUID v4:</strong> Random 128-bit IDs. Simple but not sortable, poor index locality</li>
          <li><strong>Snowflake IDs:</strong> 64-bit IDs encoding timestamp + machine ID + sequence. Sortable, compact</li>
          <li><strong>ULID:</strong> Like UUID but lexicographically sortable by time</li>
          <li><strong>Database sequences:</strong> Simple but creates a coordination bottleneck</li>
        </ul>
        <p>
          <strong>When to use Snowflake:</strong> High-throughput systems needing sortable IDs (Twitter, Discord). 
          Trade-off: requires machine ID coordination.
        </p>

        <h3>4. Database Isolation Levels</h3>
        <p>
          <strong>What it is:</strong> Controls how transaction changes are visible to other concurrent transactions.
        </p>
        <table className="w-full text-sm border-collapse border border-gray-200 my-4">
          <thead>
            <tr className="bg-gray-50">
              <th className="border border-gray-200 px-3 py-2 text-left">Level</th>
              <th className="border border-gray-200 px-3 py-2 text-left">Prevents</th>
              <th className="border border-gray-200 px-3 py-2 text-left">Trade-off</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-200 px-3 py-2">Read Uncommitted</td>
              <td className="border border-gray-200 px-3 py-2">Nothing</td>
              <td className="border border-gray-200 px-3 py-2">Fastest, but dirty reads possible</td>
            </tr>
            <tr>
              <td className="border border-gray-200 px-3 py-2">Read Committed</td>
              <td className="border border-gray-200 px-3 py-2">Dirty reads</td>
              <td className="border border-gray-200 px-3 py-2">Default in PostgreSQL, good balance</td>
            </tr>
            <tr>
              <td className="border border-gray-200 px-3 py-2">Repeatable Read</td>
              <td className="border border-gray-200 px-3 py-2">Dirty + non-repeatable reads</td>
              <td className="border border-gray-200 px-3 py-2">More locking, consistent within txn</td>
            </tr>
            <tr>
              <td className="border border-gray-200 px-3 py-2">Serializable</td>
              <td className="border border-gray-200 px-3 py-2">All anomalies</td>
              <td className="border border-gray-200 px-3 py-2">Slowest, but fully correct</td>
            </tr>
          </tbody>
        </table>
        <p>
          <strong>Rule of thumb:</strong> Use Read Committed for most workloads. Use Serializable 
          for financial transactions where correctness trumps performance.
        </p>

        <h3>5. Optimistic vs Pessimistic Locking</h3>
        <p>
          <strong>Pessimistic locking:</strong> Lock the resource before modifying. Other transactions wait.
        </p>
        <ul>
          <li><strong>How:</strong> <code>SELECT ... FOR UPDATE</code></li>
          <li><strong>When:</strong> High contention, short transactions, write-heavy workloads</li>
          <li><strong>Trade-off:</strong> Can cause deadlocks and reduced throughput</li>
        </ul>
        <p>
          <strong>Optimistic locking:</strong> Read without locking, check for conflicts at write time.
        </p>
        <ul>
          <li><strong>How:</strong> Version column — <code>UPDATE ... WHERE version = X</code></li>
          <li><strong>When:</strong> Low contention, read-heavy workloads, longer transactions</li>
          <li><strong>Trade-off:</strong> Retries on conflict, wasted work if contention is high</li>
        </ul>

        <h3>6. Distributed Transactions &amp; Saga Pattern</h3>
        <p>
          <strong>The problem:</strong> In microservices, a business operation spans multiple services 
          with separate databases. Traditional 2PC (two-phase commit) doesn&apos;t scale.
        </p>
        <p>
          <strong>Saga pattern:</strong> Break the transaction into local transactions with compensating 
          actions. If step 3 fails, run compensations for steps 2 and 1.
        </p>
        <ul>
          <li><strong>Choreography:</strong> Services emit events, others react. Simple but hard to track.</li>
          <li><strong>Orchestration:</strong> Central coordinator manages the saga. Easier to debug.</li>
        </ul>
        <p>
          <strong>When to use:</strong> Any cross-service operation that must be atomic — order placement, 
          payment + inventory + shipping.
        </p>

        <h3>7. Rate Limiting</h3>
        <p>
          <strong>What it is:</strong> Controlling the rate of requests to protect systems from overload.
        </p>
        <table className="w-full text-sm border-collapse border border-gray-200 my-4">
          <thead>
            <tr className="bg-gray-50">
              <th className="border border-gray-200 px-3 py-2 text-left">Algorithm</th>
              <th className="border border-gray-200 px-3 py-2 text-left">How It Works</th>
              <th className="border border-gray-200 px-3 py-2 text-left">Best For</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-200 px-3 py-2">Token Bucket</td>
              <td className="border border-gray-200 px-3 py-2">Tokens added at fixed rate, consumed per request</td>
              <td className="border border-gray-200 px-3 py-2">Allowing bursts while enforcing average rate</td>
            </tr>
            <tr>
              <td className="border border-gray-200 px-3 py-2">Leaky Bucket</td>
              <td className="border border-gray-200 px-3 py-2">Requests queue and drain at fixed rate</td>
              <td className="border border-gray-200 px-3 py-2">Smoothing traffic, no bursts</td>
            </tr>
            <tr>
              <td className="border border-gray-200 px-3 py-2">Fixed Window</td>
              <td className="border border-gray-200 px-3 py-2">Count requests per time window</td>
              <td className="border border-gray-200 px-3 py-2">Simple, but edge-of-window bursts</td>
            </tr>
            <tr>
              <td className="border border-gray-200 px-3 py-2">Sliding Window</td>
              <td className="border border-gray-200 px-3 py-2">Rolling window avoids boundary issues</td>
              <td className="border border-gray-200 px-3 py-2">Accurate rate limiting</td>
            </tr>
          </tbody>
        </table>
        <p>
          <strong>Burst-tolerant tip:</strong> Use Token Bucket when you want to allow short bursts 
          (e.g., user refreshing page) while enforcing a sustained rate limit.
        </p>

        <h3>8. Bloom Filters</h3>
        <p>
          <strong>What it is:</strong> A space-efficient probabilistic data structure that tells you 
          if an element is <em>definitely not</em> in a set or <em>possibly</em> in a set.
        </p>
        <ul>
          <li><strong>False positives:</strong> Possible (says &quot;maybe yes&quot; when answer is no)</li>
          <li><strong>False negatives:</strong> Never (if it says &quot;no&quot;, it&apos;s definitely no)</li>
        </ul>
        <p><strong>When to use:</strong></p>
        <ul>
          <li>Checking if a username is taken before hitting the database</li>
          <li>Filtering out non-existent keys before expensive lookups (LSM trees, Cassandra)</li>
          <li>Spam detection, recommendation deduplication</li>
        </ul>
        <p>
          <strong>Trade-off:</strong> Cannot delete elements. Use Counting Bloom Filter if deletions needed.
        </p>

        <h3>9. Consensus Algorithms (Raft)</h3>
        <p>
          <strong>What it is:</strong> Algorithms that allow distributed nodes to agree on a value 
          even when some nodes fail.
        </p>
        <p>
          <strong>Raft</strong> is the most understandable consensus algorithm, designed as an alternative 
          to Paxos. It elects a leader who handles all writes, replicating to followers.
        </p>
        <ul>
          <li><strong>Leader election:</strong> If leader fails, followers timeout and elect a new one</li>
          <li><strong>Log replication:</strong> Leader appends entries, followers replicate</li>
          <li><strong>Safety:</strong> Committed entries are never lost, even during leader changes</li>
        </ul>
        <p><strong>Where it&apos;s used:</strong> etcd, Consul, CockroachDB, TiKV</p>
        <p>
          <strong>When to use:</strong> When you need a distributed system to agree on state — 
          configuration management, distributed locks, leader election.
        </p>

        <h3>10. Geohash</h3>
        <p>
          <strong>What it is:</strong> A hierarchical spatial index that encodes latitude/longitude 
          into a string. Nearby locations share common prefixes.
        </p>
        <ul>
          <li><strong>Example:</strong> <code>9q8yy</code> (5 chars) represents a ~5km x 5km cell</li>
          <li><strong>More characters = higher precision:</strong> 6 chars ≈ 1km, 8 chars ≈ 20m</li>
        </ul>
        <p><strong>When to use:</strong></p>
        <ul>
          <li>Finding nearby restaurants, drivers, stores</li>
          <li>Geofencing and location-based search</li>
          <li>Indexing location data in databases (prefix queries)</li>
        </ul>
        <p>
          <strong>Trade-off:</strong> Edge effects — two nearby points can have very different geohashes 
          if they&apos;re on opposite sides of a cell boundary. Query neighboring cells to compensate.
        </p>
        <p>
          <strong>Alternatives:</strong> Quadtrees (hierarchical subdivision), H3 (hexagonal grid by Uber), 
          S2 (spherical geometry by Google).
        </p>
      </section>

      <section id="scalability">
        <h2>Scalability</h2>
        <p>
          Scaling systems effectively requires understanding both horizontal and vertical 
          strategies — and knowing when each is appropriate.
        </p>
        <h3>Scaling Strategies</h3>
        <ul>
          <li><strong>Horizontal Scaling:</strong> Stateless services behind load balancers</li>
          <li><strong>Database Sharding:</strong> Partitioning data across multiple databases</li>
          <li><strong>Caching:</strong> Reducing load on primary data stores (Redis, in-memory grids)</li>
          <li><strong>Event-Driven Architecture:</strong> Decoupling through message queues (Kafka)</li>
          <li><strong>Read/Write Separation:</strong> CQRS patterns for optimized access paths</li>
        </ul>
      </section>

      <section id="reliability">
        <h2>Reliability</h2>
        <p>
          Building reliable systems means planning for failure — not hoping it won&apos;t happen.
        </p>
        <h3>Reliability Patterns</h3>
        <ul>
          <li><strong>Redundancy:</strong> Eliminating single points of failure</li>
          <li><strong>Circuit Breakers:</strong> Preventing cascade failures</li>
          <li><strong>Retries with Backoff:</strong> Handling transient failures gracefully</li>
          <li><strong>Graceful Degradation:</strong> Maintaining partial functionality under load</li>
          <li><strong>Compensation Workflows:</strong> Recovering from partial failures in distributed transactions</li>
        </ul>
      </section>

      <section id="architecture-patterns">
        <h2>Architecture Patterns</h2>
        <p>
          Patterns I&apos;ve applied in production systems — each with specific trade-offs.
        </p>
        <h3>Key Patterns</h3>
        <ul>
          <li><strong>Microservices:</strong> Decomposing monoliths into independently deployable services</li>
          <li><strong>Event Sourcing:</strong> Storing state as a sequence of events</li>
          <li><strong>CQRS:</strong> Separating read and write models for optimization</li>
          <li><strong>Saga Pattern:</strong> Managing distributed transactions without 2PC</li>
          <li><strong>Double-Entry Ledger:</strong> Financial correctness through balanced accounting</li>
        </ul>
      </section>
    </Layout>
  );
}
