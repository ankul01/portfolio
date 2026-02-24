import Layout from '@/components/Layout';

export default function ArchitectureDecisionsPage() {
  return (
    <Layout>
      <h1>Architecture Decisions</h1>
      
      <p>
        Production architectures I&apos;ve designed and led — real systems handling real traffic under 
        real constraints.
      </p>
      
      <p>
        These aren&apos;t textbook designs. They&apos;re the result of navigating tradeoffs between speed 
        and correctness, convincing teams to invest in the right abstractions, and learning what actually 
        matters when systems can&apos;t go down.
      </p>

      <section id="embedded-insurance">
        <h2>Embedded Insurance Platform</h2>
        <p className="text-gray-600 italic">
          A production architecture handling high-throughput traffic with strict regulatory and financial correctness requirements.
        </p>

        <h3>The Context</h3>
        <p>
          Embedded insurance integrates coverage directly into partner transaction journeys — device protection 
          during mobile checkout, loan protection bundled with credit disbursement, travel insurance in ticket 
          booking. It&apos;s highly automated, API-driven, real-time, and partner-distributed across e-commerce, 
          fintech, and NBFC platforms.
        </p>
        <p>
          Building this platform meant solving a fundamentally different problem than traditional insurance. 
          We needed a <strong>configurable product engine, a reliable issuance pipeline, a financially correct 
          ledger, and a compliant reporting backbone</strong> — all without rewriting the core for each new 
          partner or line of business.
        </p>

        <h3>Architecture Overview</h3>
        <p>The platform is organized into <strong>6 bounded contexts</strong>:</p>
        
        <table className="w-full text-sm border-collapse border border-gray-200 my-4">
          <thead>
            <tr className="bg-gray-50">
              <th className="border border-gray-200 px-4 py-2 text-left font-semibold">Domain</th>
              <th className="border border-gray-200 px-4 py-2 text-left font-semibold">Responsibility</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-200 px-4 py-2">Product Configuration</td>
              <td className="border border-gray-200 px-4 py-2">Product, Plan, Cover, Benefit, SKU hierarchy</td>
            </tr>
            <tr>
              <td className="border border-gray-200 px-4 py-2">Pricing &amp; Eligibility</td>
              <td className="border border-gray-200 px-4 py-2">Grid-based pricing, rule engine for eligibility</td>
            </tr>
            <tr>
              <td className="border border-gray-200 px-4 py-2">Policy &amp; Issuance</td>
              <td className="border border-gray-200 px-4 py-2">Proposal → Underwriting → Policy → Certificate</td>
            </tr>
            <tr>
              <td className="border border-gray-200 px-4 py-2">Finance &amp; Ledger</td>
              <td className="border border-gray-200 px-4 py-2">Double-entry accounting, float wallet</td>
            </tr>
            <tr>
              <td className="border border-gray-200 px-4 py-2">Claims</td>
              <td className="border border-gray-200 px-4 py-2">FNOL, assessment, approval, payment, reserve tracking</td>
            </tr>
            <tr>
              <td className="border border-gray-200 px-4 py-2">Partner &amp; Overlay</td>
              <td className="border border-gray-200 px-4 py-2">Partner config, pricing/commission overrides</td>
            </tr>
          </tbody>
        </table>

        <h3>Key Architecture Decisions &amp; Why I Made Them</h3>

        <h4>Decision 1: Immutable Product Versioning</h4>
        <p>
          <strong>The problem:</strong> Early on, we allowed in-place plan edits. A pricing change propagated 
          to active policies in production — incorrect premiums, regulatory exposure, and significant cleanup effort.
        </p>
        <p>
          <strong>The decision:</strong> Plans are immutable once published. New version, soft-deprecate the 
          old one, maintain backward compatibility. Partner overlays (custom pricing, modified eligibility) 
          live in a separate layer.
        </p>
        <p>
          <strong>The tradeoff:</strong> More storage, more version management complexity. But we never had 
          that issue again. In a regulated industry, <strong>immutability is cheaper than incorrectness.</strong>
        </p>

        <h4>Decision 2: Grid-Based Pricing Over Runtime Actuarial Models</h4>
        <p>
          <strong>The problem:</strong> Traditional insurance uses complex actuarial models at runtime. 
          Embedded insurance operates at a scale and speed where runtime computation introduces latency and 
          failure points.
        </p>
        <p>
          <strong>The decision:</strong> Pre-computed pricing grids versioned and preloaded in memory, with 
          partner-level overrides.
        </p>
        <p>
          <strong>Why this matters:</strong> At high throughput, every millisecond of pricing computation 
          counts. Grids give us <strong>deterministic, auditable pricing</strong> with zero runtime risk. 
          The grid versioning also simplified regulatory compliance — when regulators ask &quot;what rate did 
          this policy get?&quot;, we can point to the exact grid version.
        </p>

        <h4>Decision 3: Double-Entry Immutable Ledger</h4>
        <p>
          <strong>The problem:</strong> This is where most naive insurance systems fail. When I inherited 
          the financial pipeline, there were data inconsistencies between the ledger, finance systems, and 
          compliance reports. Financial closures were slow.
        </p>
        <p>
          <strong>The decision:</strong> Every financial movement creates balanced journal entries in an 
          immutable, append-only ledger. Never mix business tables with ledger tables. Never update ledger 
          rows — ever.
        </p>
        <ul>
          <li><strong>Premium collection:</strong> Debit Partner Float → Credit Premium Receivable</li>
          <li><strong>Allocation:</strong> Debit Premium Receivable → Credit Insurer Payable + Commission Payable</li>
          <li><strong>Settlement:</strong> Debit Insurer Payable → Credit Bank Account</li>
        </ul>
        <p>
          <strong>The organizational challenge:</strong> The engineering team initially wanted a simpler 
          approach. An immutable ledger is harder to build, harder to debug, and requires more storage. I had 
          to make the case that in a regulated financial system, <strong>correctness is non-negotiable</strong> — 
          and that the alternative (a mutable financial record) was a ticking time bomb.
        </p>
        <p>
          <strong>The result:</strong> Closure time reduced significantly. Reporting accuracy improved. The 
          ledger became the single source of truth for regulatory and financial reporting across all partners.
        </p>

        <h4>Decision 4: Failure Handling as a First-Class Concern</h4>
        <p>
          <strong>The philosophy:</strong> In high-throughput insurance systems, every failure mode needs a 
          recovery path, and every recovery path needs testing.
        </p>
        
        <table className="w-full text-sm border-collapse border border-gray-200 my-4">
          <thead>
            <tr className="bg-gray-50">
              <th className="border border-gray-200 px-4 py-2 text-left font-semibold">Scenario</th>
              <th className="border border-gray-200 px-4 py-2 text-left font-semibold">Strategy</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-200 px-4 py-2">Payment success, issuance failure</td>
              <td className="border border-gray-200 px-4 py-2">Compensation workflow → Retry → If irrecoverable, refund + reversal entry</td>
            </tr>
            <tr>
              <td className="border border-gray-200 px-4 py-2">Policy created, ledger fails</td>
              <td className="border border-gray-200 px-4 py-2">Mark pending, retry ledger. Never leave a policy without ledger entries</td>
            </tr>
            <tr>
              <td className="border border-gray-200 px-4 py-2">Ledger posted, COI fails</td>
              <td className="border border-gray-200 px-4 py-2">Non-financial failure — retry independently, never reverse ledger</td>
            </tr>
            <tr>
              <td className="border border-gray-200 px-4 py-2">Duplicate requests</td>
              <td className="border border-gray-200 px-4 py-2">Idempotency keys + unique proposal reference + state validation</td>
            </tr>
          </tbody>
        </table>
        
        <p>
          <strong>The lesson:</strong> Designing failure handling up front is what separates systems that 
          work at demo scale from systems that work at production scale. At high volume, even a tiny failure 
          rate without a recovery path is unacceptable.
        </p>

        <h4>Decision 5: Reporting Architecture — Separate Reads from Writes</h4>
        <p>
          <strong>The decision:</strong> Operational DB → Event Stream → Reporting Warehouse → Regulatory 
          Reports. Never run heavy reports on the transactional database. Reporting is eventually consistent — 
          never block issuance for a reporting write.
        </p>
        <p>
          <strong>Why:</strong> When regulators and finance teams need reports, they need them accurate and 
          fast. But generating reports from a high-throughput database would degrade the very system generating 
          the data. This separation gave us <strong>compliant reporting with audit trails</strong> without 
          sacrificing platform performance.
        </p>

        <h3>Production Guarantees</h3>
        <ul>
          <li>Daily reconciliation comparing ledger vs float vs settlement</li>
          <li>Event replay safety for disaster recovery</li>
          <li>Versioned pricing models with full audit trails</li>
          <li>Immutable ledger (append-only, no updates)</li>
          <li>Unique constraints on proposal references</li>
          <li>Idempotency keys on all mutating APIs</li>
        </ul>

        <h3>Platform Results</h3>
        <ul>
          <li>High-throughput traffic at peak with zero-downtime migrations</li>
          <li>Hundreds of dealers onboarded with real-time settlement</li>
          <li>Full regulatory compliance across all partners</li>
          <li>Zero regulatory non-compliances across audits</li>
        </ul>
      </section>

      <section id="partnership-one">
        <h2>Unified Partner Integration Layer</h2>
        <p className="text-gray-600 italic">
          How I eliminated fragmented partner APIs across business lines and built a platform nobody asked for.
        </p>

        <h3>The Problem I Saw</h3>
        <p>
          The company had grown fast. Each business line had its own partner integration logic — different 
          authentication mechanisms, different API contracts, different onboarding flows. Every new partner 
          meant rebuilding integration logic that already existed somewhere else in the org.
        </p>
        <p>
          The cost wasn&apos;t just engineering hours. It was <strong>inconsistent partner experience, 
          painful debugging, and an inability to launch new products quickly</strong> because every launch 
          required re-integration with existing partners.
        </p>

        <h3>The Architecture Decision</h3>
        <p>
          I proposed and led a <strong>unified partner integration platform</strong> standardizing APIs, 
          authentication, and onboarding across all business lines.
        </p>
        <p>The key design decisions:</p>
        <ul>
          <li><strong>Shared authentication and authorization layer</strong> — one authentication mechanism for all partner interactions, regardless of product line</li>
          <li><strong>Unified policy issuance and claim service standards</strong> — common API contracts with product-specific extensions rather than product-specific APIs</li>
          <li><strong>Reusable SDKs and unified API documentation</strong> — partners integrate once, access all product lines</li>
          <li><strong>Multi-LOB coordination layer</strong> — routing and orchestration across business lines without coupling</li>
        </ul>

        <h3>The Organizational Challenge</h3>
        <p>
          The technical design was the easy part. The hard part was <strong>getting multiple independent teams 
          to agree on shared standards.</strong> Each team had their own integration patterns.
        </p>
        <p>
          I chose to lead by influence rather than authority. I didn&apos;t have organizational control over 
          the other teams. So I built the platform within my team first, proved the value, and let adoption 
          happen through results:
        </p>
        <ul>
          <li>Started with my own team as the proving ground</li>
          <li>Demonstrated measurable improvements in integration speed</li>
          <li>Made the alternative — continuing with fragmented APIs — obviously worse</li>
        </ul>

        <h3>Results</h3>
        <ul>
          <li>Engineering efficiency improved significantly by eliminating redundant integration logic</li>
          <li>New partner integration timelines reduced substantially</li>
          <li>Directly enabled rapid launches of multiple new product lines</li>
        </ul>
      </section>

      <section id="ackcelerator">
        <h2>Partner Onboarding Framework</h2>
        <p className="text-gray-600 italic">
          How I turned a multi-day manual process into a self-service flow.
        </p>

        <h3>The Problem</h3>
        <p>
          Every new partner onboarding required <strong>multiple days of engineering time</strong> — credential 
          setup, configuration, validation, QA checks, deployment approvals. With many active partners and a 
          growing pipeline, the engineering team was becoming a bottleneck to business growth.
        </p>

        <h3>The Architecture Decision</h3>
        <p>Build a <strong>self-service onboarding platform</strong> that eliminates engineering involvement from routine partner setup:</p>
        <ul>
          <li><strong>Self-serve APIs and UI workflows</strong> for configuration and credential management</li>
          <li><strong>Automated validation and QA checks</strong> — no engineering review needed for standard onboarding</li>
          <li><strong>Workflow automation integration</strong> for access and deployment approvals</li>
          <li><strong>Built on top of the unified API layer</strong> for instant partner connectivity</li>
        </ul>

        <h3>The Tradeoff</h3>
        <p>
          The pushback was real: <em>&quot;We only onboard a few partners a month. Why build a platform for that?&quot;</em>
        </p>
        <p>
          The bet wasn&apos;t about current volume. It was about where the business was heading. This was an{' '}
          <strong>investment in organizational scalability</strong> — and it paid off when we needed to 
          rapidly onboard partners for new product launches.
        </p>

        <h3>Results</h3>
        <ul>
          <li>Onboarding time reduced from days to hours</li>
          <li>Many partners onboarded with near-zero engineering involvement</li>
          <li>Internal throughput improved significantly</li>
          <li>Framework reused across all business lines for partner setup</li>
        </ul>
      </section>

      <section id="credit-life">
        <h2>New Business Line: Life Insurance</h2>
        <p className="text-gray-600 italic">
          Architecture decisions behind launching a new insurance vertical and a hybrid product.
        </p>

        <h3>The Problem</h3>
        <p>
          The company was a General Insurance company entering Life Insurance — a completely different regulatory 
          domain, actuarial model, and compliance framework. And after establishing the initial product, the 
          challenge deepened: could we combine GI and LI into a <strong>single hybrid product</strong>?
        </p>

        <h3>Key Architecture Decisions</h3>
        <p>
          <strong>Decision 1: Build for configurability, not speed.</strong> The team wanted to hardcode 
          assumptions to ship faster. I pushed for building issuance, endorsement, and claims systems that 
          could extend to future products. This slowed the initial launch — but subsequent products shipped 
          faster <em>because</em> the foundations were right.
        </p>
        <p>
          <strong>Decision 2: Cross-entity policy ownership model.</strong> For the hybrid product, we designed 
          a flexible ownership model allowing either LOB (GI or LI) to lead issuance while maintaining 
          independent claims control. This required <strong>dual-regulatory orchestration</strong> — premium 
          apportioning rules that satisfied both regulatory frameworks simultaneously.
        </p>
        <p>
          <strong>Decision 3: Compliance architecture.</strong> When new regulatory guidelines required 
          separating covers with different durations under distinct master policies, we designed a{' '}
          <strong>flexible policy framework</strong> — issuing multiple policies linked under a virtual 
          &quot;shallow&quot; policy while keeping partner integration unchanged. Zero partner-side API changes.
        </p>

        <h3>The Organizational Lesson</h3>
        <p>
          Building in regulated environments taught me that <strong>technical competence alone isn&apos;t 
          enough.</strong> Earning the trust of compliance, actuarial, and finance teams — all of whom had 
          legitimate concerns about a tech team moving fast — was more important than the architecture itself. 
          I invested weeks in cross-functional alignment before writing a line of code.
        </p>

        <h3>Results</h3>
        <ul>
          <li>Successfully launched new Life Insurance vertical with zero regulatory non-compliances</li>
          <li>Delivered a first-of-its-kind hybrid GI + LI product</li>
          <li>Core systems reused for subsequent product launches</li>
          <li>Scalable compliance architecture for future regulatory updates</li>
        </ul>
      </section>

      <section id="payments-checkout">
        <h2>Payments &amp; Checkout Platform (E-commerce)</h2>
        <p className="text-gray-600 italic">
          Architecture decisions for systems handling high-throughput traffic during flash sales.
        </p>

        <h3>The Context</h3>
        <p>
          At a major e-commerce company, I led checkout, payments, and order management — platforms that{' '}
          <strong>could not go down</strong> during flash sales and high-traffic events. This was where I 
          learned to think about scale, reliability, and the operational reality of mission-critical systems.
        </p>

        <h3>Key Architecture Decisions</h3>

        <h4>Decision 1: Closed-Wallet System for Instant Payments</h4>
        <p>
          <strong>The problem:</strong> External payment settlements took 5–7 days for refunds. In e-commerce, 
          slow refunds destroy customer trust.
        </p>
        <p>
          <strong>The decision:</strong> Built an internal wallet for instant payments and refunds without 
          external settlement delays. Users could add money and checkout instantly. Refunds credited 
          immediately to wallet balance.
        </p>
        <p>
          <strong>The tradeoff:</strong> Managing an internal float wallet introduced financial reconciliation 
          complexity. But instant refunds — versus multi-day bank reversals — was a customer experience decision 
          that justified the engineering investment.
        </p>

        <h4>Decision 2: Multi-Provider Payment Gateway with Automatic Failover</h4>
        <p>
          <strong>The problem:</strong> Single payment provider = single point of failure during the 
          highest-traffic moments.
        </p>
        <p><strong>The decision:</strong> Integrated multiple payment providers with:</p>
        <ul>
          <li>Automatic retry with provider rotation on failure</li>
          <li>Configurable routing rules (cost optimization, success rate)</li>
          <li>Health monitoring with circuit breakers</li>
        </ul>
        <p><strong>The result:</strong> Very high payment success rate through intelligent multi-provider routing.</p>

        <h4>Decision 3: Flash Sale Concurrency Patterns</h4>
        <p>
          <strong>The problem:</strong> During flash sales, thousands of users trying to buy the same limited 
          inventory simultaneously. Overselling = customer complaints, refund costs, and trust erosion.
        </p>
        <p><strong>The decisions:</strong></p>
        <ul>
          <li><strong>Pessimistic locking</strong> at the inventory layer to prevent oversells</li>
          <li><strong>Time-limited cart holds</strong> to prevent inventory stockpiling</li>
          <li><strong>Queue-based checkout</strong> during extreme traffic spikes</li>
          <li><strong>Inventory holds with timeout</strong> — reserve stock during checkout, release on failure</li>
        </ul>
        <p><strong>The result:</strong> Zero inventory oversells during flash sales. High throughput sustained during sale events.</p>

        <h4>Decision 4: HSM-Based Key Management</h4>
        <p>
          <strong>The problem:</strong> Payment gateway credentials stored in application config or environment 
          variables = security vulnerability.
        </p>
        <p>
          <strong>The decision:</strong> HSM-based encryption for all payment credentials. Credentials never 
          stored in application config. Key rotation without service restart.
        </p>
        <p>
          <strong>Why this matters:</strong> Not glamorous. Not visible. But foundational security decisions 
          are the ones that prevent the headlines you never want to see.
        </p>
      </section>

      <section id="sureos-migration">
        <h2>Core Platform Modernization</h2>
        <p className="text-gray-600 italic">
          Zero-downtime migration of high-throughput systems to a unified core platform.
        </p>

        <h3>The Problem</h3>
        <p>
          Multiple products ran on legacy stacks with frequent scalability issues. The migration to a modern 
          platform was essential for unification and future product reuse — but it involved migrating systems 
          handling high-throughput traffic at peak.
        </p>

        <h3>The Architecture Approach</h3>
        <ul>
          <li><strong>Phase-wise migration</strong> of issuance and claim modules with rollback capability at every stage</li>
          <li><strong>Domain-driven design patterns</strong> for clean service boundaries</li>
          <li><strong>Observability and metrics tracking</strong> for faster RCA and rollout safety</li>
          <li><strong>Shadow traffic testing</strong> before cutting over production traffic</li>
        </ul>

        <h3>The Leadership Challenge</h3>
        <p>
          The hardest part wasn&apos;t the technical migration — it was <strong>managing organizational 
          risk.</strong> A failed migration at high volume would impact real customers, real partners, and 
          real revenue. I had to balance the team&apos;s confidence with appropriate caution, ensure fallback 
          plans were tested (not just documented), and maintain stakeholder trust throughout a multi-phase rollout.
        </p>

        <h3>Results</h3>
        <ul>
          <li><strong>Zero downtime</strong> during migration — including the highest-traffic partner</li>
          <li>Uptime and infrastructure efficiency improved significantly</li>
          <li>Unified platform across all business lines, enabling faster releases</li>
          <li>Platform ready for new product lines</li>
        </ul>
      </section>

      <section id="principles">
        <h2>What Ties These Decisions Together</h2>
        
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6">
          <p className="font-semibold text-blue-900 mb-3">
            Across all these systems, three principles have guided my architecture decisions:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-blue-900">
            <li>
              <strong>Correctness over convenience</strong> — Immutable ledgers, idempotency keys, and 
              append-only logs are harder to build. But in regulated, high-throughput environments, 
              shortcuts become liabilities.
            </li>
            <li>
              <strong>Build the platform before you need it</strong> — The unified integration layer, 
              onboarding framework, and configurable product engine all required upfront investment that 
              wasn&apos;t tied to immediate features. Every one of them paid for itself multiple times over.
            </li>
            <li>
              <strong>The organizational decision is harder than the technical one</strong> — Choosing the 
              right architecture is important. But getting teams, stakeholders, and regulators aligned behind 
              that choice is where leadership actually happens.
            </li>
          </ol>
        </div>
      </section>
    </Layout>
  );
}
