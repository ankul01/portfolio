import Layout from '@/components/Layout';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <Layout>
      <h1>Welcome!</h1>
      
      <p>
        I&apos;m Ankul. I&apos;ve spent the last 14+ years building products, platforms, and engineering 
        teams — first as an individual contributor, then as a technical lead, and now as an 
        engineering leader responsible for organizations of 15+ engineers.
      </p>
      
      <p>
        This site is a collection of my thinking on leadership, system design, and the craft of 
        building software at scale. Hopefully it&apos;s useful to you wherever you are on your own journey.
      </p>

      <section id="background">
        <h2>Background</h2>
        
        <p>
          I studied Computer Applications at <strong>NIT Tiruchirappalli</strong>, graduating in 2011. 
          The systems courses stuck with me — that foundation in distributed systems and architecture 
          continues to shape how I think about building software today.
        </p>

        <h3>Get in Touch</h3>
        <p>
          I&apos;m always happy to connect with fellow engineering leaders and practitioners.
        </p>
        <ul>
          <li>
            <Link href="https://www.linkedin.com/in/ankul-choudhry" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </Link>
          </li>
          <li>
            <Link href="mailto:ankulnitt@gmail.com">ankulnitt@gmail.com</Link>
          </li>
        </ul>
      </section>

      <section id="experience">
        <h2>Experience</h2>

        <h3>Acko General Insurance</h3>
        <p>
          For the past few years, I&apos;ve been building embedded insurance platforms at{' '}
          <Link href="https://acko.com" target="_blank" rel="noopener noreferrer">Acko</Link>. 
          It&apos;s been some of the most challenging and rewarding work of my career.
        </p>
        <p>
          Today, as <strong>Senior Engineering Manager</strong>, I lead a multi-layered organization 
          of 15+ engineers across embedded insurance, lending, and partner integrations. We own 
          mission-critical platforms handling 30K+ requests per minute under strict regulatory constraints — 
          the kind of systems where correctness isn&apos;t optional.
        </p>
        <p>
          Some highlights from my time here:
        </p>
        <ul>
          <li>
            Led a <strong>zero-downtime migration</strong> of our high-throughput issuance and claims 
            systems (peaks around 2,000 policies/min) to a unified core platform. We improved uptime 
            by ~25% and scalability by ~30%.
          </li>
          <li>
            Built a multi-brand dealer POS platform with real-time settlement. We onboarded 500+ dealers 
            and enabled ~₹100 Cr in annualized throughput.
          </li>
          <li>
            Designed a reusable integration framework that cut partner onboarding from about a week 
            to a couple of hours.
          </li>
          <li>
            Established a new Life Insurance line of business from scratch and delivered an 
            industry-first hybrid insurance product.
          </li>
          <li>
            Introduced ML-based fraud detection that improved accuracy by ~40% while reducing 
            manual reviews.
          </li>
        </ul>
        <p>
          I&apos;ve remained hands-on throughout — participating in architecture reviews, contributing 
          to critical backend components, and staying close to the technical decisions that matter. 
          I believe the best engineering leaders don&apos;t lose touch with the work.
        </p>

        <h3>Snapdeal</h3>
        <p>
          I spent four years at{' '}
          <Link href="https://snapdeal.com" target="_blank" rel="noopener noreferrer">Snapdeal</Link>{' '}
          leading checkout, payments, and order management — platforms handling 25K+ RPM during 
          high-traffic e-commerce events.
        </p>
        <p>
          This was where I learned to think about scale, reliability, and the operational reality 
          of systems that can&apos;t go down. Some of the work I&apos;m proudest of:
        </p>
        <ul>
          <li>
            Designed and shipped a <strong>closed-wallet system</strong> for instant payments and 
            refunds, integrating UPI and external wallet providers.
          </li>
          <li>
            Built real-time refund and reconciliation systems that significantly improved 
            settlement accuracy.
          </li>
          <li>
            Implemented secure payment gateway key management — the kind of foundational work 
            that isn&apos;t glamorous but matters enormously.
          </li>
        </ul>

        <h3>Early Career</h3>
        <p>
          I started my career at <strong>Nagarro</strong>, where I spent six years progressing from 
          software developer to technical lead. I built B2B e-commerce platforms, booking systems, 
          and data pipelines across healthcare, gaming, and enterprise domains.
        </p>
        <p>
          Those years taught me the fundamentals: how to translate business requirements into 
          technical designs, how to mentor engineers, and how to own key system components end-to-end. 
          The progression from IC to technical leadership set the foundation for everything that followed.
        </p>
      </section>

      <section id="philosophy">
        <h2>Philosophy</h2>
        
        <p>
          Over the years, I&apos;ve developed a few convictions about how to build great engineering 
          organizations:
        </p>

        <p>
          <strong>Stay technical.</strong> The best engineering leaders I&apos;ve worked with never 
          fully step away from the code and architecture. I participate in design reviews, 
          contribute to critical components, and make sure I understand our systems deeply enough 
          to make good organizational decisions.
        </p>

        <p>
          <strong>Build for predictability.</strong> Heroic efforts are a sign of broken systems. 
          I focus on building teams and processes that deliver reliably, sprint after sprint, 
          without burning people out.
        </p>

        <p>
          <strong>Invest in the craft.</strong> I&apos;ve been exploring AI-assisted development 
          workflows, and we&apos;ve seen ~25% reduction in development cycle time. The tools are 
          changing fast, and staying curious about them matters.
        </p>

        <p>
          <strong>Teams compound.</strong> Individual heroics don&apos;t scale. I spend a lot of time 
          thinking about team design, hiring, and creating environments where engineers can do 
          their best work. Sustainable high performance comes from the team, not from any one person.
        </p>

        <h3>Technical Background</h3>
        <p>
          Most of my hands-on work has been in <strong>Java and Spring Boot</strong>, building 
          microservices on AWS. I&apos;ve spent a lot of time with Kafka, MySQL, and the operational 
          reality of keeping distributed systems running at scale.
        </p>
        <p>
          More recently, I&apos;ve been working with ML-based fraud detection systems and exploring 
          how AI can improve engineering workflows — both interesting frontiers.
        </p>
      </section>
    </Layout>
  );
}
