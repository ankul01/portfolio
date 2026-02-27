import Layout from '@/components/Layout';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <Layout>
      <h1>Ankul Choudhry — Engineering Leader</h1>
      
      <p>
        <strong>Engineering leader who builds high-performing teams and scalable platforms.</strong>{' '}
        14+ years shipping mission-critical systems in fintech and e-commerce — from zero-to-one 
        products to platforms handling high-throughput traffic under strict regulatory constraints.
      </p>
      
      <p>
        I&apos;ve spent my career progressing from individual contributor to technical lead to 
        engineering leader responsible for organizations of 15+ engineers. Along the way, I&apos;ve 
        learned that great engineering leadership lives at the intersection of technical depth, 
        team design, and relentless focus on delivery.
      </p>

      <p>
        This site is a collection of my thinking on leadership, system design, and the craft of 
        building software at scale.
      </p>

      <section id="background">
        <h2>Background</h2>
        
        <p>
          I hold a Master&apos;s in Computer Applications from <strong>NIT Tiruchirappalli</strong> (2011) — 
          one of India&apos;s premier technical institutions. The systems courses stuck with me, and that 
          foundation in distributed systems and architecture continues to shape how I approach building 
          software today.
        </p>
      </section>

      <section id="experience">
        <h2>Experience</h2>

        <h3>Acko General Insurance</h3>
        <p className="text-sm text-gray-500 italic">
          <strong>Senior Engineering Manager</strong> | Oct 2025 – Present<br />
          <strong>Engineering Manager</strong> | Dec 2022 – Sep 2025
        </p>
        
        <p>
          At Acko, I lead a multi-layered engineering organization of <strong>15+ engineers</strong> across 
          embedded insurance, lending, and partner integrations. We own mission-critical platforms handling 
          high-throughput traffic under strict regulatory constraints — the kind of systems 
          where correctness isn&apos;t optional.
        </p>

        <p><strong>What I built:</strong></p>
        <ul>
          <li>Integrated <strong>AI-based fraud detection</strong> that improved detection accuracy while reducing manual reviews</li>
          <li>Established a new <strong>Life Insurance line of business</strong> from scratch and delivered an industry-first hybrid insurance product</li>
          <li>Designed a <strong>reusable integration framework</strong> that cut partner onboarding time significantly</li>
          <li>Built a <strong>multi-brand dealer POS platform</strong> with real-time settlement — onboarded hundreds of dealers</li>
          <li>Led a <strong>zero-downtime migration</strong> of high-throughput issuance and claims systems to a unified core platform, improving uptime and scalability</li>
        </ul>

        <p><strong>How I led:</strong></p>
        <ul>
          <li>Grew the team from a small squad to a 15+ person organization, hiring across multiple levels and functions</li>
          <li>Introduced structured architecture reviews and engineering quality practices that improved delivery predictability</li>
          <li>Partnered closely with product, compliance, and business teams to navigate complex regulatory requirements while maintaining engineering velocity</li>
          <li>Stayed hands-on throughout — participating in design reviews, contributing to critical backend components, and staying close to the technical decisions that matter</li>
        </ul>

        <h3>Snapdeal</h3>
        <p className="text-sm text-gray-500 italic">
          <strong>Lead Software Engineer → Engineering Manager</strong> | Jan 2018 – Nov 2022
        </p>
        
        <p>
          Joined as Lead Software Engineer and was promoted to Engineering Manager. Led checkout, payments, 
          and order management — platforms handling high-throughput traffic during high-traffic e-commerce events. 
          This is where I learned to think about scale, reliability, and the operational reality of systems 
          that can&apos;t go down.
        </p>

        <p><strong>What I built:</strong></p>
        <ul>
          <li>Implemented <strong>secure payment gateway key management</strong> — foundational work that isn&apos;t glamorous but matters enormously</li>
          <li>Built <strong>real-time refund and reconciliation systems</strong> that significantly improved settlement accuracy</li>
          <li>Designed and shipped a <strong>closed-wallet system</strong> for instant payments and refunds, integrating UPI and external wallet providers</li>
        </ul>

        <p><strong>How I led:</strong></p>
        <ul>
          <li>Owned end-to-end delivery for some of the most critical checkout flows during peak sale events</li>
          <li>Mentored junior engineers and helped several grow into senior and lead roles</li>
          <li>Drove cross-team collaboration to ensure payment system reliability during high-traffic events</li>
        </ul>

        <h3>Nagarro</h3>
        <p className="text-sm text-gray-500 italic">
          <strong>Software Developer → Senior Developer → Technical Lead</strong> | 2011 – 2017
        </p>
        
        <p>
          Built B2B e-commerce platforms, booking systems, and data pipelines across healthcare, gaming, 
          and enterprise domains. Progressed through three levels — from Software Developer to Senior Developer 
          to Technical Lead — building the foundation for my engineering leadership career.
        </p>
        <ul>
          <li>Translated complex business requirements into technical designs across diverse industries</li>
          <li>Mentored a team of engineers and owned key system components end-to-end</li>
          <li>This progression from IC to technical leadership set the foundation for everything that followed</li>
        </ul>
      </section>

      <section id="leadership-impact">
        <h2>Leadership Impact</h2>
        
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6">
          <p className="font-semibold text-blue-900">
            I don&apos;t just build systems — I build the teams that build systems.
          </p>
        </div>

        <ul>
          <li><strong>Hiring &amp; Team Building</strong>: Scaled engineering teams from small squads to 15+ person organizations, hiring across multiple levels</li>
          <li><strong>Mentorship</strong>: Coached engineers from junior to senior and lead roles, with a focus on ownership and technical depth</li>
          <li><strong>Cross-functional Collaboration</strong>: Worked closely with product, design, compliance, and business stakeholders to deliver complex products in regulated environments</li>
          <li><strong>Zero-to-One Delivery</strong>: Launched entirely new business lines and platforms from concept to production</li>
          <li><strong>Operational Excellence</strong>: Established architecture review practices, on-call processes, and delivery rituals that improved team predictability and reduced firefighting</li>
        </ul>
      </section>

      <section id="how-i-lead">
        <h2>How I Lead</h2>

        <h3>Stay Technical</h3>
        <p>
          The best engineering leaders never fully step away from the code and architecture. I participate 
          in design reviews, contribute to critical components, and ensure I understand our systems deeply 
          enough to make sound organizational decisions.
        </p>

        <h3>Build for Predictability</h3>
        <p>
          Heroic efforts are a sign of broken systems. I focus on building teams and processes that deliver 
          reliably — sprint after sprint — without burning people out. Sustainable pace is a feature, not a compromise.
        </p>

        <h3>Invest in the Craft</h3>
        <p>
          I&apos;ve been exploring AI-assisted development workflows, and we&apos;ve seen measurable reduction in 
          development cycle time. The tools are changing fast, and staying curious about them matters. 
          I encourage my teams to experiment and adopt what works.
        </p>

        <h3>Teams Compound</h3>
        <p>
          Individual heroics don&apos;t scale. I spend a lot of time thinking about team design, hiring, and 
          creating environments where engineers can do their best work. When you invest in the right people 
          and give them the right context, the results compound over time.
        </p>
      </section>

      <section id="technical-depth">
        <h2>Technical Depth</h2>
        
        <table className="w-full text-sm border-collapse border border-gray-200 my-4">
          <thead>
            <tr className="bg-gray-50">
              <th className="border border-gray-200 px-4 py-2 text-left font-semibold">Area</th>
              <th className="border border-gray-200 px-4 py-2 text-left font-semibold">Technologies &amp; Tools</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-200 px-4 py-2">Languages &amp; Frameworks</td>
              <td className="border border-gray-200 px-4 py-2">Java, Spring Boot, Microservices Architecture</td>
            </tr>
            <tr>
              <td className="border border-gray-200 px-4 py-2">Cloud &amp; Infrastructure</td>
              <td className="border border-gray-200 px-4 py-2">AWS, Distributed Systems, Event-Driven Architecture</td>
            </tr>
            <tr>
              <td className="border border-gray-200 px-4 py-2">Data &amp; Messaging</td>
              <td className="border border-gray-200 px-4 py-2">Kafka, MySQL, Real-Time Data Pipelines</td>
            </tr>
            <tr>
              <td className="border border-gray-200 px-4 py-2">Emerging Areas</td>
              <td className="border border-gray-200 px-4 py-2">AI-based Fraud Detection, AI-Assisted Development Workflows</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section id="connect">
        <h2>Let&apos;s Connect</h2>
        
        <p>
          If you&apos;re building something ambitious and looking for an engineering leader who stays close 
          to the tech, I&apos;d love to hear from you.
        </p>
        
        <ul>
          <li>
            <strong>Email</strong>:{' '}
            <Link href="mailto:ankulnitt@gmail.com">ankulnitt@gmail.com</Link>
          </li>
          <li>
            <strong>LinkedIn</strong>:{' '}
            <Link href="https://www.linkedin.com/in/ankul-choudhry" target="_blank" rel="noopener noreferrer">
              linkedin.com/in/ankul-choudhry
            </Link>
          </li>
        </ul>
      </section>
    </Layout>
  );
}
