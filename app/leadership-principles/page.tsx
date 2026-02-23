import Layout from '@/components/Layout';

export default function LeadershipPrinciplesPage() {
  return (
    <Layout>
      <h1>Leadership Principles</h1>
      
      <p>
        These are the principles I&apos;ve developed over 14+ years of building and leading 
        engineering teams. They&apos;re not theoretical frameworks — they&apos;re convictions 
        shaped by shipping production systems, scaling organizations, and learning from 
        mistakes.
      </p>

      <section id="philosophy">
        <h2>Philosophy</h2>
        
        <p>
          <strong>Leadership is multiplication, not addition.</strong>
        </p>
        
        <p>
          The best engineering leaders don&apos;t add their intelligence to the team — they 
          create conditions where team intelligence amplifies. The whole becomes greater 
          than the sum of its parts. Each person thinks more deeply, surfaces problems 
          early, and takes ownership.
        </p>
        
        <p>
          This shapes everything else: how I hire, how I delegate, how I make decisions, 
          and how I measure success. The goal isn&apos;t to be the smartest person in the room. 
          It&apos;s to build a team that doesn&apos;t need me to be.
        </p>
      </section>

      <section id="building-teams">
        <h2>Building Teams That Scale</h2>
        
        <p>
          <strong>The Principle:</strong> Hire for trajectory, create clarity before autonomy, 
          and invest in onboarding as a forcing function.
        </p>
        
        <p>
          Teams plateau not because of talent or technology, but because of unclear expectations 
          and implicit knowledge that never gets made explicit. Scaling a team requires making 
          the invisible visible — writing down what &quot;good&quot; looks like before expecting people 
          to achieve it.
        </p>

        <h3>Anti-patterns to Avoid</h3>
        <ul>
          <li>Hiring only for current skills instead of learning velocity</li>
          <li>Giving autonomy before providing context (&quot;figure it out&quot; culture)</li>
          <li>Treating onboarding as a one-week checkbox instead of a 90-day investment</li>
          <li>Assuming high performers will &quot;just know&quot; what success looks like</li>
        </ul>

        <h3>What Good Looks Like</h3>
        <ul>
          <li>Every role has written success criteria before the hire</li>
          <li>New engineers ship meaningful work in their first two weeks</li>
          <li>Team rituals exist that surface problems before they escalate</li>
          <li>Knowledge is documented, not trapped in individuals&apos; heads</li>
        </ul>

        <p>
          <strong>Try this:</strong> Write down what &quot;exceeds expectations&quot; looks like for 
          one role on your team. Share it with them and ask if they agree.
        </p>
      </section>

      <section id="multiplying">
        <h2>Multiplying vs Bottlenecking</h2>
        
        <p>
          <strong>The Principle:</strong> Remove yourself from the critical path. The goal 
          is a team that operates without you.
        </p>
        
        <p>
          Many leaders become accidental bottlenecks by acting as the primary problem-solver. 
          Teams wait for direction, ideas die in silence, and problems hide until they explode. 
          This feels like being needed — but it&apos;s actually slowing everyone down.
        </p>

        <h3>Signs You&apos;re Bottlenecking</h3>
        <ul>
          <li>Decisions wait for your input before moving forward</li>
          <li>You&apos;re the only one proposing solutions in design reviews</li>
          <li>Your calendar is packed, but the team feels stuck</li>
          <li>When you take vacation, things slow down or stop</li>
        </ul>

        <h3>How to Multiply</h3>
        <ul>
          <li>Define clear success criteria before work begins, then step back</li>
          <li>Coach someone else to make the decision you would have made</li>
          <li>Ask &quot;What do you think we should do?&quot; before offering your opinion</li>
          <li>Delegate decisions, not just tasks</li>
        </ul>

        <p>
          <strong>Try this:</strong> Identify one decision you made this week that someone 
          else could have made. Next time, coach them through making it themselves.
        </p>
      </section>

      <section id="decision-making">
        <h2>Decision-Making at Speed</h2>
        
        <p>
          <strong>The Principle:</strong> Reversible decisions should be made quickly. 
          Get into details only when there&apos;s no clear path or violent disagreement.
        </p>
        
        <p>
          Most decisions are reversible. Treating every choice as high-stakes leads to 
          analysis paralysis and slow delivery. The cost of delayed decisions often 
          exceeds the cost of imperfect ones. But some decisions — architecture, hiring, 
          team structure — deserve deep involvement.
        </p>

        <h3>Anti-patterns to Avoid</h3>
        <ul>
          <li>Applying the same rigor to reversible and irreversible decisions</li>
          <li>Waiting for perfect information that will never arrive</li>
          <li>Making decisions in meetings that should have been made asynchronously</li>
          <li>Failing to write decisions down, leading to repeated debates</li>
        </ul>

        <h3>What Good Looks Like</h3>
        <ul>
          <li>Type 2 (reversible) decisions happen in hours, not weeks</li>
          <li>Type 1 (irreversible) decisions get architecture reviews and documentation</li>
          <li>Decision records (ADRs) exist for choices that will be questioned later</li>
          <li>The team knows who has authority to decide what</li>
        </ul>

        <p>
          <strong>Try this:</strong> Take the last significant decision your team made 
          and write a one-page ADR. Share it. See if it surfaces disagreements you 
          didn&apos;t know existed.
        </p>
      </section>

      <section id="alignment">
        <h2>Alignment Without Bureaucracy</h2>
        
        <p>
          <strong>The Principle:</strong> Written strategy beats recurring meetings. 
          Align through shared artifacts, not synchronous coordination.
        </p>
        
        <p>
          Cross-team alignment breaks down not from lack of meetings, but from lack of 
          clarity. When strategy isn&apos;t written, everyone operates on different assumptions. 
          Adding more syncs doesn&apos;t fix this — it just creates the illusion of alignment 
          while burning time.
        </p>

        <h3>Anti-patterns to Avoid</h3>
        <ul>
          <li>Recurring meetings that exist because &quot;we&apos;ve always had them&quot;</li>
          <li>Strategy that lives in someone&apos;s head but isn&apos;t documented</li>
          <li>Protecting engineering from other functions instead of educating them</li>
          <li>Assuming other teams understand how engineering works</li>
        </ul>

        <h3>What Good Looks Like</h3>
        <ul>
          <li>Strategy docs answer: What are we doing? Why? What are we NOT doing?</li>
          <li>Cross-team dependencies are visible in shared roadmaps</li>
          <li>RFCs and design docs create asynchronous alignment</li>
          <li>Other leaders understand engineering constraints and tradeoffs</li>
        </ul>

        <p>
          <strong>Try this:</strong> Cancel one recurring meeting and replace it with a 
          written update. See if anyone misses it.
        </p>
      </section>

      <section id="execution">
        <h2>Execution Under Uncertainty</h2>
        
        <p>
          <strong>The Principle:</strong> Negotiate scope, not timelines. Ship the 80% 
          that matters; defer the 20% that doesn&apos;t.
        </p>
        
        <p>
          Every project faces pressure: aggressive deadlines, shifting requirements, 
          technical constraints. The instinct is to push back on timelines — but timelines 
          are often fixed by business reality. The better lever is scope: what can we 
          cut without losing the core value?
        </p>

        <h3>Anti-patterns to Avoid</h3>
        <ul>
          <li>Committing to everything and hoping you&apos;ll figure it out</li>
          <li>Cutting architectural corners that create long-term debt</li>
          <li>Treating all requirements as equally important</li>
          <li>Saying &quot;no&quot; without offering an alternative</li>
        </ul>

        <h3>What Good Looks Like</h3>
        <ul>
          <li>Clear distinction between must-have and nice-to-have before work begins</li>
          <li>Scope negotiations happen with data, not opinions</li>
          <li>Architecture is protected even when features are cut</li>
          <li>The team ships reliably, not heroically</li>
        </ul>

        <p>
          <strong>Try this:</strong> For your next project, write down what you would 
          cut if you had 20% less time. Discuss it before you need to.
        </p>
      </section>
    </Layout>
  );
}
