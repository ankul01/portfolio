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

      <section id="fundamentals">
        <h2>Fundamentals</h2>
        <p>
          Before diving into specific systems, these foundational concepts shape how I approach 
          architecture decisions.
        </p>
        <h3>Core Concepts</h3>
        <ul>
          <li><strong>CAP Theorem:</strong> Consistency, Availability, Partition Tolerance — pick two</li>
          <li><strong>ACID vs BASE:</strong> When to use strong vs eventual consistency</li>
          <li><strong>Latency vs Throughput:</strong> Understanding performance trade-offs</li>
          <li><strong>Idempotency:</strong> Safe retry semantics for distributed operations</li>
        </ul>
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

      <section id="case-studies">
        <h2>Case Studies</h2>
        
        <h3>Embedded Insurance Platform</h3>
        <p>
          This is a production architecture I designed for an embedded insurance platform — 
          handling 30K+ RPM with strict regulatory and financial correctness requirements.
        </p>

        <h4>What is Embedded Insurance?</h4>
        <p>
          Embedded insurance integrates coverage directly into a primary transaction journey — 
          device protection during mobile checkout, loan protection bundled with credit disbursement, 
          travel insurance in ticket booking. Unlike traditional models, it&apos;s:
        </p>
        <ul>
          <li><strong>Partner-distributed</strong> — e-commerce, fintech, NBFC platforms sell the product</li>
          <li><strong>API-driven and real-time</strong> — no manual underwriting delays</li>
          <li><strong>SKU-based</strong> — sellable units attached to transactions</li>
          <li><strong>Highly automated</strong> — across issuance, finance, and claims</li>
        </ul>

        <h4>Architecture Blueprint</h4>
        <p>The platform is organized into 6 bounded contexts:</p>
        <ul>
          <li><strong>Product Configuration</strong> — Product, Plan, Cover, Benefit, SKU hierarchy</li>
          <li><strong>Pricing &amp; Eligibility</strong> — Grid-based pricing, rule engine for eligibility</li>
          <li><strong>Policy &amp; Issuance</strong> — Proposal → Underwriting → Policy → Certificate</li>
          <li><strong>Claims</strong> — FNOL, assessment, approval, payment, reserve tracking</li>
          <li><strong>Finance &amp; Ledger</strong> — Double-entry accounting, float wallet</li>
          <li><strong>Partner &amp; Overlay</strong> — Partner config, pricing/commission overrides</li>
        </ul>

        <h4>Key Design Decisions</h4>

        <p><strong>1. Immutable Product Versioning</strong></p>
        <p>
          Plans are immutable once published. Never modify live plans — create a new version, 
          soft-deprecate the old one, maintain backward compatibility. Partner overlays 
          (custom pricing, modified eligibility) stay in a separate layer.
        </p>

        <p><strong>2. Grid-Based Pricing</strong></p>
        <p>
          Embedded insurance uses pre-computed pricing grids rather than actuarial models at runtime. 
          Example: Age 18–40 + Loan tenure &lt;24 months = 0.8% rate. Grids are versioned, 
          preloaded in memory, with partner-level overrides.
        </p>

        <p><strong>3. Double-Entry Ledger</strong></p>
        <p>
          This is where most naive systems fail. Every financial movement creates balanced 
          journal entries in an <strong>immutable, append-only ledger</strong>:
        </p>
        <ul>
          <li>Premium collection: Debit Partner Float → Credit Premium Receivable</li>
          <li>Allocation: Debit Premium Receivable → Credit Insurer Payable + Commission Payable</li>
          <li>Settlement: Debit Insurer Payable → Credit Bank Account</li>
        </ul>
        <p>
          Never mix business tables with ledger tables. Never update ledger rows — ever.
        </p>

        <p><strong>4. Failure Handling</strong></p>
        <table className="w-full text-sm border-collapse border border-gray-200 my-4">
          <thead>
            <tr className="bg-gray-50">
              <th className="border border-gray-200 px-3 py-2 text-left">Scenario</th>
              <th className="border border-gray-200 px-3 py-2 text-left">Strategy</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-200 px-3 py-2">Payment success, issuance failure</td>
              <td className="border border-gray-200 px-3 py-2">Compensation workflow → Retry → If irrecoverable, refund + reversal entry</td>
            </tr>
            <tr>
              <td className="border border-gray-200 px-3 py-2">Policy created, ledger fails</td>
              <td className="border border-gray-200 px-3 py-2">Mark as pending, retry ledger, never leave policy without ledger entries</td>
            </tr>
            <tr>
              <td className="border border-gray-200 px-3 py-2">Ledger posted, COI fails</td>
              <td className="border border-gray-200 px-3 py-2">Non-financial failure — retry independently, never reverse ledger</td>
            </tr>
            <tr>
              <td className="border border-gray-200 px-3 py-2">Duplicate requests</td>
              <td className="border border-gray-200 px-3 py-2">Idempotency keys + unique proposal reference + state validation</td>
            </tr>
          </tbody>
        </table>

        <p><strong>5. Reporting Architecture</strong></p>
        <p>
          Operational DB → Event Stream → Reporting Warehouse → Regulatory Reports. 
          Never run heavy reports on the transactional database. Reporting is eventually 
          consistent — never block issuance for a reporting write.
        </p>

        <h4>Production-Grade Guarantees</h4>
        <ul>
          <li>Idempotency keys on all mutating APIs</li>
          <li>Unique constraints on proposal references</li>
          <li>Immutable ledger (append-only, no updates)</li>
          <li>Versioned pricing models</li>
          <li>Event replay safety</li>
          <li>Daily reconciliation jobs comparing ledger vs float vs settlement</li>
        </ul>

        <h4>Results</h4>
        <ul>
          <li>Handles <strong>30K+ RPM</strong> at peak</li>
          <li>Zero-downtime migrations for high-throughput issuance systems</li>
          <li>500+ dealer onboarding with self-service frameworks</li>
          <li>~₹100 Cr annualized throughput through dealer POS</li>
          <li>IRDAI-ready reporting with audit trails</li>
        </ul>

        <h4>Key Takeaway</h4>
        <p>
          Embedded insurance is not just about attaching a plan to a checkout screen. It&apos;s about 
          building a <strong>configurable product engine</strong>, a <strong>reliable issuance pipeline</strong>, 
          a <strong>financially correct ledger</strong>, and a <strong>compliant reporting backbone</strong> — 
          all without rewriting the core for each new partner or line of business.
        </p>

        <hr className="my-8 border-gray-200" />

        <h3>Payments &amp; Checkout Platform</h3>
        <p>
          At Snapdeal, I led checkout and payments systems handling 25K+ RPM during 
          high-traffic e-commerce events.
        </p>

        <h4>Key Challenges</h4>
        <ul>
          <li>High concurrency during flash sales</li>
          <li>Multiple payment providers with different reliability profiles</li>
          <li>Real-time inventory holds and releases</li>
          <li>Instant refunds without settlement delays</li>
        </ul>

        <h4>Solutions</h4>
        <ul>
          <li>
            <strong>Closed-wallet system</strong> — Instant payments and refunds without 
            external settlement delays
          </li>
          <li>
            <strong>Real-time reconciliation</strong> — Automated matching of payment 
            gateway transactions with internal records
          </li>
          <li>
            <strong>Secure key management</strong> — HSM-based encryption for payment 
            gateway credentials
          </li>
          <li>
            <strong>Circuit breakers per provider</strong> — Automatic failover when a 
            payment gateway degrades
          </li>
        </ul>

        <p>
          The operational reality of systems that can&apos;t go down taught me to think 
          differently about reliability, monitoring, and graceful degradation.
        </p>
      </section>
    </Layout>
  );
}
