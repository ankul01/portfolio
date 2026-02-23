import Layout from '@/components/Layout';

export default function LeadershipPrinciplesPage() {
  return (
    <Layout>
      <h1>Leadership Principles</h1>
      <p>
        This section outlines my approach to engineering leadership, covering team building,
        prioritization, alignment, decision-making, and communication.
      </p>

      <section id="building-team">
        <h2>Building a Team from Scratch</h2>
        <p>
          Building a high-performing engineering team requires careful attention to hiring,
          onboarding, and culture development.
        </p>
        <h3>Key Principles</h3>
        <ul>
          <li>Hire for potential and cultural fit, not just current skills</li>
          <li>Create clear expectations and growth paths from day one</li>
          <li>Establish team rituals that promote collaboration and learning</li>
          <li>Invest in onboarding to accelerate time-to-productivity</li>
        </ul>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ante ipsum
          primis in faucibus orci luctus et ultrices posuere cubilia curae.
        </p>
      </section>

      <section id="prioritization">
        <h2>Prioritization Frameworks</h2>
        <p>
          Effective prioritization is crucial for maximizing impact with limited resources.
        </p>
        <h3>Frameworks I Use</h3>
        <ul>
          <li><strong>ICE Score:</strong> Impact, Confidence, Ease - weighted scoring for quick decisions</li>
          <li><strong>RICE:</strong> Reach, Impact, Confidence, Effort - for product features</li>
          <li><strong>MoSCoW:</strong> Must have, Should have, Could have, Won&apos;t have</li>
          <li><strong>Cost of Delay:</strong> For time-sensitive decisions</li>
        </ul>
        <p>
          The key is not which framework you use, but that you have a consistent,
          transparent process that the team understands and trusts.
        </p>
      </section>

      <section id="cross-team-alignment">
        <h2>Cross-team Alignment</h2>
        <p>
          As organizations grow, cross-team alignment becomes increasingly critical for
          avoiding duplication, managing dependencies, and shipping cohesive products.
        </p>
        <h3>Alignment Strategies</h3>
        <ul>
          <li>Regular sync meetings with clear agendas and outcomes</li>
          <li>Shared documentation and decision records</li>
          <li>Clear ownership boundaries with well-defined interfaces</li>
          <li>Cross-team guilds for shared technical concerns</li>
        </ul>
      </section>

      <section id="decision-making">
        <h2>Decision-Making</h2>
        <p>
          Good decision-making balances speed with thoroughness, and individual judgment
          with collective wisdom.
        </p>
        <h3>Decision Framework</h3>
        <ul>
          <li><strong>Type 1 vs Type 2:</strong> Reversible decisions should be made quickly</li>
          <li><strong>RAPID:</strong> Recommend, Agree, Perform, Input, Decide</li>
          <li><strong>Document decisions:</strong> ADRs for technical choices</li>
          <li><strong>Set deadlines:</strong> Avoid analysis paralysis</li>
        </ul>
        <p>
          The best decision is often a good decision made quickly, rather than a perfect
          decision made too late.
        </p>
      </section>

      <section id="communication">
        <h2>Communication</h2>
        <p>
          Clear, consistent communication is the foundation of effective leadership.
        </p>
        <h3>Communication Principles</h3>
        <ul>
          <li>Over-communicate context, especially during uncertainty</li>
          <li>Be transparent about constraints and trade-offs</li>
          <li>Adapt your communication style to your audience</li>
          <li>Create safe spaces for difficult conversations</li>
          <li>Document important decisions and share broadly</li>
        </ul>
        <p>
          Great leaders are great communicators. They translate between technical and
          business contexts, and ensure everyone has the information they need.
        </p>
      </section>
    </Layout>
  );
}
