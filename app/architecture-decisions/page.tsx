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
          A production architecture handling 30K+ RPM with strict regulatory and financial correctness requirements.
        </p>

        <h3>The Context</h3>
        <p>
          Embedded insurance integrates coverage directly into partner transaction journeys — device protection 
          during mobile checkout, loan protection bundled with credit disbursement, travel insurance in ticket 
          booking. It&apos;s highly automated, API-driven, real-time, and partner-distributed across e-commerce, 
          fintech, and NBFC platforms.
        </p>
        <p>
          Building the platform that powers this at Acko meant solving a fundamentally different problem than 
          traditional insurance. We needed a <strong>configurable product engine, a reliable issuance pipeline, 
          a financially correct ledger, and a compliant reporting backbone</strong> — all without rewriting the 
          core for each new partner or line of business.
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
          to active policies in production — incorrect premiums, regulatory exposure, and a very long weekend 
          of cleanup.
        </p>
        <p>
          <strong>The decision:</strong> Plans are immutable once published. New version, soft-deprecate the 
          old one, maintain backward compatibility. Partner overlays (custom pricing, modified eligibility) 
          live in a separate layer.
        </p>
        <p>
          <strong>The tradeoff:</strong> More storage, more version management complexity. But we never had 
          that phone call again. In a regulated industry, <strong>immutability is cheaper than incorrectness.</strong>
        </p>

        <h4>Decision 2: Grid-Based Pricing Over Runtime Actuarial Models</h4>
        <p>
          <strong>The problem:</strong> Traditional insurance uses complex actuarial models at runtime. 
          Embedded insurance operates at a scale and speed where runtime computation introduces latency and 
          failure points.
        </p>
        <p>
          <strong>The decision:</strong> Pre-computed pricing grids versioned and preloaded in memory, with 
          partner-level overrides. Example: Age 18–40 + Loan tenure &lt;24 months = 0.8% rate.
        </p>
        <p>
          <strong>Why this matters:</strong> When you&apos;re handling <strong>30K+ RPM</strong>, every 
          millisecond of pricing computation counts. Grids give us <strong>deterministic, auditable pricing</strong> with 
          zero runtime risk. The grid versioning also simplified IRDAI compliance — when regulators ask 
          &quot;what rate did this policy get?&quot;, we can point to the exact grid version.
        </p>

        <h4>Decision 3: Double-Entry Immutable Ledger</h4>
        <p>
          <strong>The problem:</strong> This is where most naive insurance systems fail. When I inherited 
          the financial pipeline, there were ~100 data inconsistencies between the ledger, finance systems, 
          and compliance reports. Financial closures took 3 days.
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
          <strong>The result:</strong> Closure time dropped from 3 days to &lt;6 hours. Reporting accuracy 
          improved by ~30%. FinAcko became the single source of truth for regulatory and financial reporting 
          across 30+ partners.
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
          work at demo scale from systems that work at production scale. We handle <strong>~2,000 policies 
          per minute</strong> at peak — at that volume, even a 0.01% failure rate without a recovery path 
          is unacceptable.
        </p>

        <h4>Decision 5: Reporting Architecture — Separate Reads from Writes</h4>
        <p>
          <strong>The decision:</strong> Operational DB → Event Stream → Reporting Warehouse → Regulatory 
          Reports. Never run heavy reports on the transactional database. Reporting is eventually consistent — 
          never block issuance for a reporting write.
        </p>
        <p>
          <strong>Why:</strong> When regulators and finance teams need reports, they need them accurate and 
          fast. But generating reports from a database handling 30K+ RPM would degrade the very system 
          generating the data. This separation gave us <strong>IRDAI-ready reporting with audit trails</strong> without 
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
          <li><strong>30K+ RPM</strong> at peak with zero-downtime migrations</li>
          <li><strong>₹400+ Cr annualized GWP</strong> across Embedded and Life portfolios</li>
          <li><strong>500+ dealers</strong> onboarded through mPOS with real-time settlement</li>
          <li><strong>100% IRDAI compliance</strong> across 30+ partners with no integration changes</li>
          <li><strong>Zero regulatory non-compliances</strong> across internal and partner audits</li>
        </ul>
      </section>

      <section id="partnership-one">
        <h2>Partnership-One: Unified Integration Layer</h2>
        <p className="text-gray-600 italic">
          How I eliminated fragmented partner APIs across LOBs and built a platform nobody asked for.
        </p>

        <h3>The Problem I Saw</h3>
        <p>
          Acko had grown fast. Embedded, Auto, Health — each LOB had its own partner integration logic. 
          Different authentication mechanisms, different API contracts, different onboarding flows. Every 
          new partner meant rebuilding integration logic that already existed somewhere else in the org.
        </p>
        <p>
          The cost wasn&apos;t just engineering hours. It was <strong>inconsistent partner experience, 
          painful debugging, and an inability to launch new products quickly</strong> because every launch 
          required re-integration with existing partners.
        </p>

        <h3>The Architecture Decision</h3>
        <p>
          I proposed and led <strong>Partnership-One</strong> — a unified partner integration platform 
          standardizing APIs, authentication, and onboarding across all LOBs.
        </p>
        <p>The key design decisions:</p>
        <ul>
          <li><strong>Shared authentication and authorization layer</strong> — one authentication mechanism for all partner interactions, regardless of product line</li>
          <li><strong>Unified policy issuance and claim service standards</strong> — common API contracts with product-specific extensions rather than product-specific APIs</li>
          <li><strong>Reusable SDKs and unified API documentation</strong> — partners integrate once, access all product lines</li>
          <li><strong>Multi-LOB coordination layer</strong> — routing and orchestration across Auto, Health, and Embedded without coupling</li>
        </ul>

        <h3>The Organizational Challenge</h3>
        <p>
          The technical design was the easy part. The hard part was <strong>getting three independent teams 
          to agree on shared standards.</strong> The Auto team had their own integration patterns. The Health 
          team had theirs.
        </p>
        <p>
          I chose to lead by influence rather than authority. I didn&apos;t have organizational control over 
          the other teams. So I built the platform within Embedded first, proved the value, and let adoption 
          happen through results:
        </p>
        <ul>
          <li>Started with my own team (Embedded) as the proving ground</li>
          <li>Demonstrated measurable improvements in integration speed</li>
          <li>Made the alternative — continuing with fragmented APIs — obviously worse</li>
        </ul>

        <h3>Results</h3>
        <ul>
          <li>Engineering efficiency improved by <strong>~40%</strong> by eliminating redundant integration logic</li>
          <li>New partner integration timelines reduced by <strong>~50%</strong></li>
          <li>Directly enabled rapid launches: <strong>Cyber Insurance</strong> (~₹20–30 Cr GWP), <strong>LAP</strong> (~₹30 Cr GWP), and <strong>HDB All-in-One</strong> (~₹200 Cr GWP) — all built on Partnership-One</li>
        </ul>
      </section>

      <section id="ackcelerator">
        <h2>Ackcelerator: Partner Onboarding Framework</h2>
        <p className="text-gray-600 italic">
          How I turned a 3–4 day manual process into a 2-hour self-service flow.
        </p>

        <h3>The Problem</h3>
        <p>
          Every new partner onboarding required <strong>3–4 days of engineering time</strong> — credential 
          setup, configuration, validation, QA checks, deployment approvals. With 30+ active partners and a 
          growing pipeline, the engineering team was becoming a bottleneck to business growth.
        </p>

        <h3>The Architecture Decision</h3>
        <p>Build a <strong>self-service onboarding platform</strong> that eliminates engineering involvement from routine partner setup:</p>
        <ul>
          <li><strong>Self-serve APIs and UI workflows</strong> for configuration and credential management</li>
          <li><strong>Automated validation and QA checks</strong> — no engineering review needed for standard onboarding</li>
          <li><strong>Jira automation integration</strong> for access and deployment approvals</li>
          <li><strong>Built on top of Partnership-One</strong> — leveraging the unified API layer for instant partner connectivity</li>
        </ul>

        <h3>The Tradeoff</h3>
        <p>
          The pushback was real: <em>&quot;We only onboard a few partners a month. Why build a platform for that?&quot;</em>
        </p>
        <p>
          The bet wasn&apos;t about current volume. It was about where the business was heading. Ackcelerator 
          was an <strong>investment in organizational scalability</strong> — and it paid off when we needed 
          to rapidly onboard partners for Cyber, LAP, and HDB launches.
        </p>

        <h3>Results</h3>
        <ul>
          <li>Onboarding time: <strong>3–4 days → ~2 hours</strong> (98% reduction)</li>
          <li><strong>~20 partners</strong> onboarded with near-zero engineering involvement</li>
          <li>Internal throughput improved by <strong>~35%</strong></li>
          <li>Framework reused across all LOBs for partner setup</li>
        </ul>
      </section>

      <section id="credit-life">
        <h2>Credit Life &amp; Combi: Building New Business Lines</h2>
        <p className="text-gray-600 italic">
          Architecture decisions behind launching Life Insurance and India&apos;s first hybrid GI + LI product.
        </p>

        <h3>The Problem</h3>
        <p>
          Acko was a General Insurance company entering Life Insurance — a completely different regulatory 
          domain, actuarial model, and compliance framework. And after establishing Credit Life, the challenge 
          deepened: could we combine GI and LI into a <strong>single hybrid product</strong> that no one in 
          India had built before?
        </p>

        <h3>Key Architecture Decisions</h3>
        <p>
          <strong>Decision 1: Build for configurability, not speed.</strong> The team wanted to hardcode 
          assumptions to ship Credit Life faster. I pushed for building issuance, endorsement, and claims 
          systems that could extend to future products. This slowed the initial launch — but when Credit Life 
          Combi came, we shipped it faster <em>because</em> the foundations were right.
        </p>
        <p>
          <strong>Decision 2: Cross-entity policy ownership model.</strong> For the Combi product, we designed 
          a flexible ownership model allowing either LOB (GI or LI) to lead issuance while maintaining 
          independent claims control. This required <strong>dual-regulatory orchestration</strong> — premium 
          apportioning rules that satisfied both IRDAI frameworks simultaneously.
        </p>
        <p>
          <strong>Decision 3: IRDAI compliance architecture.</strong> When new IRDAI guidelines in 2025 
          required separating covers with different durations under distinct master policies, we designed a{' '}
          <strong>Shallow Product &amp; Shallow Policy framework</strong> — issuing multiple policies linked 
          under a virtual &quot;shallow&quot; policy while keeping partner integration unchanged. Zero partner-side 
          API changes across 30+ active partners.
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
          <li>Credit Life: <strong>~₹15–20 Cr annual GWP</strong> with zero regulatory non-compliances</li>
          <li>Credit Life Combi: <strong>India&apos;s first hybrid GI + LI product</strong> — projected <strong>~₹50–60 Cr GWP</strong></li>
          <li>Core systems reused in HDB All-in-One (<strong>~₹200 Cr</strong> contract)</li>
          <li>Scalable compliance architecture for future regulatory updates</li>
        </ul>
      </section>

      <section id="payments-checkout">
        <h2>Payments &amp; Checkout Platform (Snapdeal)</h2>
        <p className="text-gray-600 italic">
          Architecture decisions for systems handling 25K+ RPM during high-traffic e-commerce events.
        </p>

        <h3>The Context</h3>
        <p>
          At Snapdeal, I led checkout, payments, and order management — platforms that <strong>could not go 
          down</strong> during flash sales and high-traffic events. This was where I learned to think about 
          scale, reliability, and the operational reality of mission-critical systems.
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
          complexity. But instant refunds — versus 5–7 day bank reversals — was a customer experience decision 
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
        <p><strong>The result:</strong> 99.9%+ payment success rate through intelligent multi-provider routing.</p>

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
        <p><strong>The result:</strong> Zero inventory oversells during flash sales. 25K+ RPM sustained during sale events.</p>

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
        <h2>SureOS Migration: Core Platform Modernization</h2>
        <p className="text-gray-600 italic">
          Zero-downtime migration of high-throughput systems to a unified core platform.
        </p>

        <h3>The Problem</h3>
        <p>
          Embedded and Electronics products ran on legacy stacks with frequent scalability issues. The 
          migration to SureOS was essential for platform unification and future product reuse — but it 
          involved migrating systems handling <strong>~2,000 policies per minute</strong> at peak.
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
          risk.</strong> A failed migration at 2,000 policies/min would impact real customers, real partners, 
          and real revenue. I had to balance the team&apos;s confidence with appropriate caution, ensure 
          fallback plans were tested (not just documented), and maintain stakeholder trust throughout a 
          multi-phase rollout.
        </p>

        <h3>Results</h3>
        <ul>
          <li><strong>Zero downtime</strong> during migration — including the Rapido passenger plan (60% of total issuance traffic)</li>
          <li>Uptime improved by <strong>~25%</strong>, infra costs reduced by <strong>~15%</strong></li>
          <li>Unified platform across Embedded LOBs, enabling faster releases</li>
          <li>Added credit product readiness, enabling Credit Life and LAP issuance on SureOS</li>
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
              <strong>Build the platform before you need it</strong> — Partnership-One, Ackcelerator, and 
              the configurable product engine all required upfront investment that wasn&apos;t tied to immediate 
              features. Every one of them paid for itself multiple times over.
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
