import Layout from '@/components/Layout';

export default function LeadershipPrinciplesPage() {
  return (
    <Layout>
      <h1>How I Lead</h1>
      
      <p className="text-lg text-gray-600 italic mb-8">
        These aren&apos;t abstract beliefs. They&apos;re principles forged through building production systems 
        under regulatory pressure, scaling teams through hypergrowth, and learning — sometimes the hard way — 
        what separates sustainable engineering organizations from ones that burn bright and burn out.
      </p>

      <section id="stay-technical">
        <h2>Stay Technical — Because the Best Decisions Happen Close to the Code</h2>
        
        <p>
          I&apos;ve watched engineering leaders gradually disconnect from the systems they&apos;re responsible for. 
          It starts small — skipping design reviews, delegating architecture decisions, trusting dashboards 
          over direct observation. And then one day, you&apos;re making organizational decisions about systems 
          you no longer understand.
        </p>
        
        <p>I refuse to let that happen.</p>
        
        <p>
          At Acko, I remain hands-on across architecture reviews, critical backend components, and system 
          design decisions. When we migrated our highest-traffic partner — Rapido, processing{' '}
          <strong>~2,000 policies per minute</strong> — to a new core platform, I wasn&apos;t watching from the 
          sidelines. I was in the architecture reviews, challenging assumptions, and reviewing rollback plans.
        </p>
        
        <p>
          When we built <strong>FraudShield</strong>, I partnered directly with the Data Science team to 
          integrate ML-based anomaly detection models. Not because my team couldn&apos;t handle it, but because 
          understanding <em>how</em> the fraud detection layer worked was essential to making good decisions 
          about <em>where</em> it fit in our platform architecture.
        </p>
        
        <p>
          <strong>The principle:</strong> Technical depth isn&apos;t optional for engineering leaders — it&apos;s 
          the foundation of good judgment. I participate in design reviews not to micromanage, but because 
          understanding systems deeply is the only way to make sound organizational decisions about them.
        </p>
      </section>

      <section id="build-predictability">
        <h2>Build for Predictability — Because Heroics Are a Symptom, Not a Solution</h2>
        
        <p>
          Early in my leadership journey, I mistook urgency for impact. A team pulling all-nighters to hit 
          a deadline felt like commitment. A last-minute save during a production incident felt like heroism.
        </p>
        
        <p>
          It took me time to recognize the pattern: <strong>heroic efforts are a symptom of broken systems, 
          not a sign of a strong team.</strong>
        </p>
        
        <p>At Acko, I&apos;ve built delivery practices designed to eliminate the need for heroics:</p>
        
        <ul>
          <li>
            <strong>Implemented a Jira automation framework</strong> with 10+ rules that improved SDLC 
            compliance by ~25%, enforced code review discipline, and standardized sprint hygiene across 
            all Embedded teams
          </li>
          <li>
            <strong>Established an incident governance framework</strong> that cut escalation resolution 
            time by 25% — not through faster firefighting, but through better prevention
          </li>
          <li>
            <strong>Promoted data-driven retrospectives</strong> with actionable tracking, so the same 
            problems don&apos;t recur
          </li>
        </ul>
        
        <p>
          When we delivered the <strong>HDB All-in-One</strong> launch — a ₹200 Cr multi-category product 
          in under 3 weeks — it wasn&apos;t because the team worked around the clock. It was because our 
          delivery infrastructure, partner onboarding frameworks, and engineering practices were already 
          in place. The sprint felt fast, but it was <strong>predictable</strong>.
        </p>
        
        <p>
          <strong>The principle:</strong> Sustainable pace is a feature, not a compromise. I build teams 
          and processes that deliver reliably — sprint after sprint — without burning people out. When you 
          invest in predictability, speed becomes a natural byproduct.
        </p>
      </section>

      <section id="invest-craft">
        <h2>Invest in the Craft — Because the Tools Are Changing and Curiosity Isn&apos;t Optional</h2>
        
        <p>
          Engineering leadership isn&apos;t just about managing people and processes. It&apos;s about staying 
          curious about <em>how</em> we build software — and being willing to challenge established practices 
          when better approaches emerge.
        </p>
        
        <p>
          I&apos;ve been exploring <strong>AI-assisted development workflows</strong> with my teams, and 
          we&apos;ve seen a <strong>~25% reduction in development cycle time</strong>. But the number isn&apos;t 
          the point. The point is creating a culture where engineers are encouraged to{' '}
          <strong>experiment with new tools and approaches</strong> rather than defaulting to what&apos;s familiar.
        </p>
        
        <p>
          When we built <strong>FraudShield</strong>, we brought ML-based detection into a team that had 
          never worked with machine learning models before. We partnered with Data Science, learned new 
          patterns, and built something that improved fraud detection accuracy by <strong>~40%</strong> while 
          reducing manual reviews. The team grew technically because we chose to lean into unfamiliar 
          territory instead of staying in our comfort zone.
        </p>
        
        <p>
          I also standardized <strong>SDLC process documentation</strong> across all Embedded LOBs and 
          established automated deployment pipelines — not because process is glamorous, but because craft 
          includes the discipline of how you ship, not just what you ship.
        </p>
        
        <p>
          <strong>The principle:</strong> The best engineering teams are learning organizations. I encourage 
          experimentation, invest in tooling, and create environments where trying new approaches is 
          celebrated — even when they don&apos;t work. Staying curious about the craft is what keeps teams sharp.
        </p>
      </section>

      <section id="teams-compound">
        <h2>Teams Compound — Because Individual Heroics Don&apos;t Scale</h2>
        
        <p>
          The most important thing I build isn&apos;t software. It&apos;s the team that builds the software.
        </p>
        
        <p>
          Over the past three years at Acko, I&apos;ve scaled engineering teams from small squads to a{' '}
          <strong>15+ person organization</strong> spanning multiple LOBs. But scaling isn&apos;t just about 
          headcount. It&apos;s about building the conditions where people grow into the best version of their 
          engineering selves.
        </p>
        
        <p>Here&apos;s what that looks like in practice:</p>
        
        <ul>
          <li>
            <strong>Mentored 2 engineering manager candidates and 5 senior engineers</strong> for promotion 
            readiness — investing in their growth trajectories, not just their current output
          </li>
          <li>
            <strong>Rebuilt the Partner Automation and SWAT teams</strong> for higher delivery accountability — 
            sometimes the right team design decision is restructuring, not just hiring
          </li>
          <li>
            <strong>Ran a Claims Hackathon</strong> to encourage experimentation and process automation — 
            giving engineers space to explore ideas outside sprint commitments
          </li>
          <li>
            <strong>Active in EM and SDE3 hiring panels</strong> and reviewer for cross-team design proposals — 
            extending influence beyond my direct org
          </li>
        </ul>
        
        <p>
          When you invest in the right people and give them the right context, the results compound over time. 
          The HDB All-in-One launch, the Credit Life Combi product, the SureOS migration — none of these were 
          the work of any one person. They were the output of a team that had been deliberately built to 
          handle exactly this kind of complexity.
        </p>
        
        <p>
          <strong>The principle:</strong> Individual heroics don&apos;t scale. I spend significant time thinking 
          about team design, hiring, mentorship, and creating environments where engineers can do their best 
          work. The compounding effect of a well-built team is the most powerful force in engineering.
        </p>
      </section>

      <section id="own-outcome">
        <h2>Own the Outcome — Because Accountability Is the Foundation of Trust</h2>
        
        <p>
          I believe engineering leaders should own outcomes end-to-end — not just the technical delivery, 
          but the business impact, the stakeholder alignment, and the operational follow-through.
        </p>
        
        <p>At Acko, this has meant:</p>
        
        <ul>
          <li>
            <strong>Full accountability for 6+ major launches</strong> (Credit Life, Combi, HDB, mPOS, 
            Cyber, LAP) — from architecture to production to business metrics
          </li>
          <li>
            <strong>Owning the FinAcko stabilization</strong> — resolving ~100 historical data issues and 
            achieving reporting accuracy alignment with Finance and Compliance teams
          </li>
          <li>
            <strong>Handling partner escalations independently</strong> — Oppo activations, Muthoot 
            integrations, Cred issues — with proactive root cause analysis and closure
          </li>
          <li>
            <strong>Shifting the Embedded engineering culture</strong> from dependency-based to 
            accountability-driven delivery
          </li>
        </ul>
        
        <p>
          I&apos;ve learned that <strong>accountability isn&apos;t about being responsible when things go right. 
          It&apos;s about being the person who steps up when things go wrong</strong> — the partner escalation 
          at midnight, the compliance issue that needs immediate attention, the production incident that 
          requires judgment calls under pressure.
        </p>
        
        <p>
          <strong>The principle:</strong> Trust is built through consistent ownership. When your team, your 
          stakeholders, and your partners know that you own the outcome — not just the sprint ticket — 
          everything else becomes easier. Accountability is the foundation that makes predictability, 
          technical depth, and team growth possible.
        </p>
      </section>

      <div className="bg-amber-50 border-l-4 border-amber-500 p-4 my-8">
        <p className="text-amber-900">
          <strong>Note:</strong> These principles are a living document. I plan to add specific stories and 
          turning points as I reflect more deeply on the moments that shaped each one. The best leadership 
          principles aren&apos;t statements — they&apos;re stories.
        </p>
      </div>
    </Layout>
  );
}
