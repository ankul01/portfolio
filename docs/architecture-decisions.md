# Architecture Decisions — Draft

## Architecture Decisions

Production architectures I've designed and led — real systems handling real traffic under real constraints.

These aren't textbook designs. They're the result of navigating tradeoffs between speed and correctness, convincing teams to invest in the right abstractions, and learning what actually matters when systems can't go down.

---

## Embedded Insurance Platform

*A production architecture handling 30K+ RPM with strict regulatory and financial correctness requirements.*

### The Context

Embedded insurance integrates coverage directly into partner transaction journeys — device protection during mobile checkout, loan protection bundled with credit disbursement, travel insurance in ticket booking. It's highly automated, API-driven, real-time, and partner-distributed across e-commerce, fintech, and NBFC platforms.

Building the platform that powers this at Acko meant solving a fundamentally different problem than traditional insurance. We needed a **configurable product engine, a reliable issuance pipeline, a financially correct ledger, and a compliant reporting backbone** — all without rewriting the core for each new partner or line of business.

### Architecture Overview

The platform is organized into **6 bounded contexts**:

| **Domain** | **Responsibility** |
| --- | --- |
| Product Configuration | Product, Plan, Cover, Benefit, SKU hierarchy |
| Pricing & Eligibility | Grid-based pricing, rule engine for eligibility |
| Policy & Issuance | Proposal → Underwriting → Policy → Certificate |
| Finance & Ledger | Double-entry accounting, float wallet |
| Claims | FNOL, assessment, approval, payment, reserve tracking |
| Partner & Overlay | Partner config, pricing/commission overrides |

### Key Architecture Decisions & Why I Made Them

### Decision 1: Immutable Product Versioning

**The problem:** Early on, we allowed in-place plan edits. A pricing change propagated to active policies in production — incorrect premiums, regulatory exposure, and a very long weekend of cleanup.

**The decision:** Plans are immutable once published. New version, soft-deprecate the old one, maintain backward compatibility. Partner overlays (custom pricing, modified eligibility) live in a separate layer.

**The tradeoff:** More storage, more version management complexity. But we never had that phone call again. In a regulated industry, **immutability is cheaper than incorrectness.**

---

### Decision 2: Grid-Based Pricing Over Runtime Actuarial Models

**The problem:** Traditional insurance uses complex actuarial models at runtime. Embedded insurance operates at a scale and speed where runtime computation introduces latency and failure points.

**The decision:** Pre-computed pricing grids versioned and preloaded in memory, with partner-level overrides. Example: Age 18–40 + Loan tenure <24 months = 0.8% rate.

**Why this matters:** When you're handling **30K+ RPM**, every millisecond of pricing computation counts. Grids give us **deterministic, auditable pricing** with zero runtime risk. The grid versioning also simplified IRDAI compliance — when regulators ask "what rate did this policy get?", we can point to the exact grid version.

---

### Decision 3: Double-Entry Immutable Ledger

**The problem:** This is where most naive insurance systems fail. When I inherited the financial pipeline, there were ~100 data inconsistencies between the ledger, finance systems, and compliance reports. Financial closures took 3 days.

**The decision:** Every financial movement creates balanced journal entries in an immutable, append-only ledger. Never mix business tables with ledger tables. Never update ledger rows — ever.

- **Premium collection:** Debit Partner Float → Credit Premium Receivable
- **Allocation:** Debit Premium Receivable → Credit Insurer Payable + Commission Payable
- **Settlement:** Debit Insurer Payable → Credit Bank Account

**The organizational challenge:** The engineering team initially wanted a simpler approach. An immutable ledger is harder to build, harder to debug, and requires more storage. I had to make the case that in a regulated financial system, **correctness is non-negotiable** — and that the alternative (a mutable financial record) was a ticking time bomb.

**The result:** Closure time dropped from 3 days to <6 hours. Reporting accuracy improved by ~30%. FinAcko became the single source of truth for regulatory and financial reporting across 30+ partners.

---

### Decision 4: Failure Handling as a First-Class Concern

**The philosophy:** In high-throughput insurance systems, every failure mode needs a recovery path, and every recovery path needs testing.

| **Scenario** | **Strategy** |
| --- | --- |
| Payment success, issuance failure | Compensation workflow → Retry → If irrecoverable, refund + reversal entry |
| Policy created, ledger fails | Mark pending, retry ledger. Never leave a policy without ledger entries |
| Ledger posted, COI fails | Non-financial failure — retry independently, never reverse ledger |
| Duplicate requests | Idempotency keys + unique proposal reference + state validation |

**The lesson:** Designing failure handling up front is what separates systems that work at demo scale from systems that work at production scale. We handle **~2,000 policies per minute** at peak — at that volume, even a 0.01% failure rate without a recovery path is unacceptable.

---

### Decision 5: Reporting Architecture — Separate Reads from Writes

**The decision:** Operational DB → Event Stream → Reporting Warehouse → Regulatory Reports. Never run heavy reports on the transactional database. Reporting is eventually consistent — never block issuance for a reporting write.

**Why:** When regulators and finance teams need reports, they need them accurate and fast. But generating reports from a database handling 30K+ RPM would degrade the very system generating the data. This separation gave us **IRDAI-ready reporting with audit trails** without sacrificing platform performance.

---

### Production Guarantees

- Daily reconciliation comparing ledger vs float vs settlement
- Event replay safety for disaster recovery
- Versioned pricing models with full audit trails
- Immutable ledger (append-only, no updates)
- Unique constraints on proposal references
- Idempotency keys on all mutating APIs

### Platform Results

- **30K+ RPM** at peak with zero-downtime migrations
- **₹400+ Cr annualized GWP** across Embedded and Life portfolios
- **500+ dealers** onboarded through mPOS with real-time settlement
- **100% IRDAI compliance** across 30+ partners with no integration changes
- **Zero regulatory non-compliances** across internal and partner audits

---

## Partnership-One: Unified Integration Layer

*How I eliminated fragmented partner APIs across LOBs and built a platform nobody asked for.*

### The Problem I Saw

Acko had grown fast. Embedded, Auto, Health — each LOB had its own partner integration logic. Different authentication mechanisms, different API contracts, different onboarding flows. Every new partner meant rebuilding integration logic that already existed somewhere else in the org.

The cost wasn't just engineering hours. It was **inconsistent partner experience, painful debugging, and an inability to launch new products quickly** because every launch required re-integration with existing partners.

### The Architecture Decision

I proposed and led **Partnership-One** — a unified partner integration platform standardizing APIs, authentication, and onboarding across all LOBs.

The key design decisions:

- **Shared authentication and authorization layer** — one authentication mechanism for all partner interactions, regardless of product line
- **Unified policy issuance and claim service standards** — common API contracts with product-specific extensions rather than product-specific APIs
- **Reusable SDKs and unified API documentation** — partners integrate once, access all product lines
- **Multi-LOB coordination layer** — routing and orchestration across Auto, Health, and Embedded without coupling

### The Organizational Challenge

The technical design was the easy part. The hard part was **getting three independent teams to agree on shared standards.** The Auto team had their own integration patterns. The Health team had theirs.

I chose to lead by influence rather than authority. I didn't have organizational control over the other teams. So I built the platform within Embedded first, proved the value, and let adoption happen through results:

- Started with my own team (Embedded) as the proving ground
- Demonstrated measurable improvements in integration speed
- Made the alternative — continuing with fragmented APIs — obviously worse

### Results

- Engineering efficiency improved by **~40%** by eliminating redundant integration logic
- New partner integration timelines reduced by **~50%**
- Directly enabled rapid launches: **Cyber Insurance** (~₹20–30 Cr GWP), **LAP** (~₹30 Cr GWP), and **HDB All-in-One** (~₹200 Cr GWP) — all built on Partnership-One

---

## Ackcelerator: Partner Onboarding Framework

*How I turned a 3–4 day manual process into a 2-hour self-service flow.*

### The Problem

Every new partner onboarding required **3–4 days of engineering time** — credential setup, configuration, validation, QA checks, deployment approvals. With 30+ active partners and a growing pipeline, the engineering team was becoming a bottleneck to business growth.

### The Architecture Decision

Build a **self-service onboarding platform** that eliminates engineering involvement from routine partner setup:

- **Self-serve APIs and UI workflows** for configuration and credential management
- **Automated validation and QA checks** — no engineering review needed for standard onboarding
- **Jira automation integration** for access and deployment approvals
- **Built on top of Partnership-One** — leveraging the unified API layer for instant partner connectivity

### The Tradeoff

The pushback was real: *"We only onboard a few partners a month. Why build a platform for that?"*

The bet wasn't about current volume. It was about where the business was heading. Ackcelerator was an **investment in organizational scalability** — and it paid off when we needed to rapidly onboard partners for Cyber, LAP, and HDB launches.

### Results

- Onboarding time: **3–4 days → ~2 hours** (98% reduction)
- **~20 partners** onboarded with near-zero engineering involvement
- Internal throughput improved by **~35%**
- Framework reused across all LOBs for partner setup

---

## Credit Life & Combi: Building New Business Lines

*Architecture decisions behind launching Life Insurance and India's first hybrid GI + LI product.*

### The Problem

Acko was a General Insurance company entering Life Insurance — a completely different regulatory domain, actuarial model, and compliance framework. And after establishing Credit Life, the challenge deepened: could we combine GI and LI into a **single hybrid product** that no one in India had built before?

### Key Architecture Decisions

**Decision 1: Build for configurability, not speed.** The team wanted to hardcode assumptions to ship Credit Life faster. I pushed for building issuance, endorsement, and claims systems that could extend to future products. This slowed the initial launch — but when Credit Life Combi came, we shipped it faster *because* the foundations were right.

**Decision 2: Cross-entity policy ownership model.** For the Combi product, we designed a flexible ownership model allowing either LOB (GI or LI) to lead issuance while maintaining independent claims control. This required **dual-regulatory orchestration** — premium apportioning rules that satisfied both IRDAI frameworks simultaneously.

**Decision 3: IRDAI compliance architecture.** When new IRDAI guidelines in 2025 required separating covers with different durations under distinct master policies, we designed a **Shallow Product & Shallow Policy framework** — issuing multiple policies linked under a virtual "shallow" policy while keeping partner integration unchanged. Zero partner-side API changes across 30+ active partners.

### The Organizational Lesson

Building in regulated environments taught me that **technical competence alone isn't enough.** Earning the trust of compliance, actuarial, and finance teams — all of whom had legitimate concerns about a tech team moving fast — was more important than the architecture itself. I invested weeks in cross-functional alignment before writing a line of code.

### Results

- Credit Life: **~₹15–20 Cr annual GWP** with zero regulatory non-compliances
- Credit Life Combi: **India's first hybrid GI + LI product** — projected **~₹50–60 Cr GWP**
- Core systems reused in HDB All-in-One (**~₹200 Cr** contract)
- Scalable compliance architecture for future regulatory updates

---

## Payments & Checkout Platform (Snapdeal)

*Architecture decisions for systems handling 25K+ RPM during high-traffic e-commerce events.*

### The Context

At Snapdeal, I led checkout, payments, and order management — platforms that **could not go down** during flash sales and high-traffic events. This was where I learned to think about scale, reliability, and the operational reality of mission-critical systems.

### Key Architecture Decisions

### Decision 1: Closed-Wallet System for Instant Payments

**The problem:** External payment settlements took 5–7 days for refunds. In e-commerce, slow refunds destroy customer trust.

**The decision:** Built an internal wallet for instant payments and refunds without external settlement delays. Users could add money and checkout instantly. Refunds credited immediately to wallet balance.

**The tradeoff:** Managing an internal float wallet introduced financial reconciliation complexity. But instant refunds — versus 5–7 day bank reversals — was a customer experience decision that justified the engineering investment.

### Decision 2: Multi-Provider Payment Gateway with Automatic Failover

**The problem:** Single payment provider = single point of failure during the highest-traffic moments.

**The decision:** Integrated multiple payment providers with:

- Automatic retry with provider rotation on failure
- Configurable routing rules (cost optimization, success rate)
- Health monitoring with circuit breakers

**The result:** 99.9%+ payment success rate through intelligent multi-provider routing.

### Decision 3: Flash Sale Concurrency Patterns

**The problem:** During flash sales, thousands of users trying to buy the same limited inventory simultaneously. Overselling = customer complaints, refund costs, and trust erosion.

**The decisions:**

- **Pessimistic locking** at the inventory layer to prevent oversells
- **Time-limited cart holds** to prevent inventory stockpiling
- **Queue-based checkout** during extreme traffic spikes
- **Inventory holds with timeout** — reserve stock during checkout, release on failure

**The result:** Zero inventory oversells during flash sales. 25K+ RPM sustained during sale events.

### Decision 4: HSM-Based Key Management

**The problem:** Payment gateway credentials stored in application config or environment variables = security vulnerability.

**The decision:** HSM-based encryption for all payment credentials. Credentials never stored in application config. Key rotation without service restart.

**Why this matters:** Not glamorous. Not visible. But foundational security decisions are the ones that prevent the headlines you never want to see.

---

## SureOS Migration: Core Platform Modernization

*Zero-downtime migration of high-throughput systems to a unified core platform.*

### The Problem

Embedded and Electronics products ran on legacy stacks with frequent scalability issues. The migration to SureOS was essential for platform unification and future product reuse — but it involved migrating systems handling **~2,000 policies per minute** at peak.

### The Architecture Approach

- **Phase-wise migration** of issuance and claim modules with rollback capability at every stage
- **Domain-driven design patterns** for clean service boundaries
- **Observability and metrics tracking** for faster RCA and rollout safety
- **Shadow traffic testing** before cutting over production traffic

### The Leadership Challenge

The hardest part wasn't the technical migration — it was **managing organizational risk.** A failed migration at 2,000 policies/min would impact real customers, real partners, and real revenue. I had to balance the team's confidence with appropriate caution, ensure fallback plans were tested (not just documented), and maintain stakeholder trust throughout a multi-phase rollout.

### Results

- **Zero downtime** during migration — including the Rapido passenger plan (60% of total issuance traffic)
- Uptime improved by **~25%**, infra costs reduced by **~15%**
- Unified platform across Embedded LOBs, enabling faster releases
- Added credit product readiness, enabling Credit Life and LAP issuance on SureOS

---

## What Ties These Decisions Together

<aside>
🎯

Across all these systems, three principles have guided my architecture decisions:

1. **Correctness over convenience** — Immutable ledgers, idempotency keys, and append-only logs are harder to build. But in regulated, high-throughput environments, shortcuts become liabilities.
2. **Build the platform before you need it** — Partnership-One, Ackcelerator, and the configurable product engine all required upfront investment that wasn't tied to immediate features. Every one of them paid for itself multiple times over.
3. **The organizational decision is harder than the technical one** — Choosing the right architecture is important. But getting teams, stakeholders, and regulators aligned behind that choice is where leadership actually happens.
</aside>