import Layout from '@/components/Layout';

export default function CaseStudiesPage() {
  return (
    <Layout>
      <h1>Case Studies</h1>
      <p>
        Production architectures I&apos;ve designed and built — real systems handling 
        real traffic under real constraints. Each case study covers the problem, 
        key design decisions, and lessons learned.
      </p>

      <section id="embedded-insurance">
        <h2>Embedded Insurance Platform</h2>
        <p>
          A production architecture handling <strong>30K+ RPM</strong> with strict regulatory 
          and financial correctness requirements.
        </p>

        <h3>What is Embedded Insurance?</h3>
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

        <h3>Architecture Blueprint</h3>
        <p>The platform is organized into 6 bounded contexts:</p>
        <ul>
          <li><strong>Product Configuration</strong> — Product, Plan, Cover, Benefit, SKU hierarchy</li>
          <li><strong>Pricing &amp; Eligibility</strong> — Grid-based pricing, rule engine for eligibility</li>
          <li><strong>Policy &amp; Issuance</strong> — Proposal → Underwriting → Policy → Certificate</li>
          <li><strong>Claims</strong> — FNOL, assessment, approval, payment, reserve tracking</li>
          <li><strong>Finance &amp; Ledger</strong> — Double-entry accounting, float wallet</li>
          <li><strong>Partner &amp; Overlay</strong> — Partner config, pricing/commission overrides</li>
        </ul>

        <h3>Key Design Decisions</h3>

        <h4>1. Immutable Product Versioning</h4>
        <p>
          Plans are immutable once published. Never modify live plans — create a new version, 
          soft-deprecate the old one, maintain backward compatibility. Partner overlays 
          (custom pricing, modified eligibility) stay in a separate layer.
        </p>

        <h4>2. Grid-Based Pricing</h4>
        <p>
          Embedded insurance uses pre-computed pricing grids rather than actuarial models at runtime. 
          Example: Age 18–40 + Loan tenure &lt;24 months = 0.8% rate. Grids are versioned, 
          preloaded in memory, with partner-level overrides.
        </p>

        <h4>3. Double-Entry Ledger</h4>
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

        <h4>4. Failure Handling</h4>
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

        <h4>5. Reporting Architecture</h4>
        <p>
          Operational DB → Event Stream → Reporting Warehouse → Regulatory Reports. 
          Never run heavy reports on the transactional database. Reporting is eventually 
          consistent — never block issuance for a reporting write.
        </p>

        <h3>Production-Grade Guarantees</h3>
        <ul>
          <li>Idempotency keys on all mutating APIs</li>
          <li>Unique constraints on proposal references</li>
          <li>Immutable ledger (append-only, no updates)</li>
          <li>Versioned pricing models</li>
          <li>Event replay safety</li>
          <li>Daily reconciliation jobs comparing ledger vs float vs settlement</li>
        </ul>

        <h3>Results</h3>
        <ul>
          <li>Handles <strong>30K+ RPM</strong> at peak</li>
          <li>Zero-downtime migrations for high-throughput issuance systems</li>
          <li>500+ dealer onboarding with self-service frameworks</li>
          <li>~₹100 Cr annualized throughput through dealer POS</li>
          <li>IRDAI-ready reporting with audit trails</li>
        </ul>

        <h3>Key Takeaway</h3>
        <p>
          Embedded insurance is not just about attaching a plan to a checkout screen. It&apos;s about 
          building a <strong>configurable product engine</strong>, a <strong>reliable issuance pipeline</strong>, 
          a <strong>financially correct ledger</strong>, and a <strong>compliant reporting backbone</strong> — 
          all without rewriting the core for each new partner or line of business.
        </p>
      </section>

      <section id="payments-checkout">
        <h2>Payments &amp; Checkout Platform</h2>
        <p>
          At Snapdeal, I led checkout and payments systems handling <strong>25K+ RPM</strong> during 
          high-traffic e-commerce events.
        </p>

        <h3>Key Challenges</h3>
        <ul>
          <li>High concurrency during flash sales</li>
          <li>Multiple payment providers with different reliability profiles</li>
          <li>Real-time inventory holds and releases</li>
          <li>Instant refunds without settlement delays</li>
        </ul>

        <h3>Architecture Decisions</h3>

        <h4>1. Closed-Wallet System</h4>
        <p>
          Built an internal wallet for instant payments and refunds without external settlement delays. 
          Users could add money to their wallet and checkout instantly. Refunds credited immediately 
          to wallet balance instead of waiting for bank reversals.
        </p>

        <h4>2. Multi-Provider Payment Gateway</h4>
        <p>
          Integrated multiple payment providers with automatic failover. Each provider had:
        </p>
        <ul>
          <li>Health monitoring with circuit breakers</li>
          <li>Configurable routing rules (cost optimization, success rate)</li>
          <li>Automatic retry with provider rotation on failure</li>
        </ul>

        <h4>3. Real-Time Reconciliation</h4>
        <p>
          Automated matching of payment gateway transactions with internal records:
        </p>
        <ul>
          <li>Webhook listeners for async payment confirmations</li>
          <li>Polling for providers without webhooks</li>
          <li>Mismatch detection and alerting</li>
          <li>Daily settlement reports for finance</li>
        </ul>

        <h4>4. Secure Key Management</h4>
        <p>
          HSM-based encryption for payment gateway credentials. Credentials never stored in 
          application config or environment variables. Rotation without service restart.
        </p>

        <h3>Flash Sale Patterns</h3>
        <p>
          High-concurrency inventory management during flash sales:
        </p>
        <ul>
          <li><strong>Inventory holds:</strong> Reserve stock during checkout, release on timeout/failure</li>
          <li><strong>Oversell prevention:</strong> Pessimistic locking at inventory layer</li>
          <li><strong>Queue-based checkout:</strong> Virtual queue during extreme traffic</li>
          <li><strong>Cart expiration:</strong> Time-limited holds to prevent stockpiling</li>
        </ul>

        <h3>Results</h3>
        <ul>
          <li><strong>25K+ RPM</strong> sustained during sale events</li>
          <li>99.9%+ payment success rate through multi-provider routing</li>
          <li>Instant refunds via wallet (vs 5-7 day bank reversals)</li>
          <li>Zero inventory oversells during flash sales</li>
        </ul>

        <h3>Key Takeaway</h3>
        <p>
          The operational reality of systems that can&apos;t go down taught me to think 
          differently about reliability, monitoring, and graceful degradation. 
          Every failure mode needs a recovery path, and every recovery path needs testing.
        </p>
      </section>
    </Layout>
  );
}
