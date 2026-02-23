import Layout from '@/components/Layout';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <Layout>
      <h1>About Me</h1>
      
      <p className="text-lg">
        I architect distributed systems that handle <strong>30K+ requests per minute</strong> and 
        build the engineering organizations that sustain them.
      </p>
      
      <p>
        With 14+ years shipping production systems in fintech, insurance, and e-commerce, 
        I operate at the intersection of <strong>deep technical work and organizational leadership</strong> — 
        designing low-latency, high-throughput platforms while scaling teams that deliver predictably 
        under regulatory and correctness constraints.
      </p>

      <section id="background">
        <h2>Background</h2>
        
        <p>
          My career has followed a deliberate path from hands-on systems engineering to technical leadership. 
          I started building scalable B2B platforms and data pipelines, progressed through payments and 
          checkout systems at scale, and now lead platform organizations in regulated industries.
        </p>
        
        <p>
          I hold an <strong>MCA from NIT Tiruchirappalli</strong> (2008–2011), where I developed a strong 
          foundation in systems thinking that continues to inform how I approach architecture and team design.
        </p>

        <h3>Get in Touch</h3>
        <ul>
          <li>
            <Link href="https://www.linkedin.com/in/ankul-choudhry" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </Link>
          </li>
          <li>
            <Link href="mailto:ankulnitt@gmail.com">ankulnitt@gmail.com</Link>
          </li>
          <li>
            <Link href="https://github.com/ankul01" target="_blank" rel="noopener noreferrer">
              GitHub
            </Link>
          </li>
        </ul>
      </section>

      <section id="experience">
        <h2>Experience</h2>

        <h3>Currently</h3>
        <p>
          <strong>Senior Engineering Manager at Acko General Insurance</strong> (Oct 2025 – Present)
        </p>
        <p>
          Leading a multi-layered engineering organization of <strong>15+ engineers</strong>, 
          including senior engineers and team leads. I own platforms across embedded insurance, 
          lending, and partner integrations — mission-critical systems operating under strict 
          regulatory constraints.
        </p>
        <p>Key focus areas:</p>
        <ul>
          <li>End-to-end ownership of <strong>Java/Spring Boot microservices handling 30K+ RPM</strong></li>
          <li>Architecture reviews and design decisions for high-throughput transactional systems</li>
          <li>ML-based fraud detection improving accuracy by <strong>~40%</strong></li>
          <li>AI-assisted development workflows reducing cycle time by <strong>~25%</strong></li>
        </ul>

        <h3>Previously</h3>

        <h4>Engineering Manager — Acko General Insurance</h4>
        <p><em>Dec 2022 – Sep 2025 | Bangalore</em></p>
        <p>
          Scaled embedded insurance platforms and led zero-downtime migrations of high-throughput systems.
        </p>
        <ul>
          <li>Scaled platforms to <strong>30K+ RPM</strong> with improved reliability and observability</li>
          <li><strong>Zero-downtime migration</strong> of issuance and claims systems (peaks ~2,000 policies/min) — 
              improved uptime by ~25%, scalability by ~30%</li>
          <li>Built multi-brand dealer POS platform: <strong>500+ dealers</strong>, <strong>~₹100 Cr annualized throughput</strong></li>
          <li>Designed reusable integration platform — reduced integration timelines by <strong>~50%</strong></li>
          <li>Self-service onboarding frameworks cutting partner setup from ~1 week to <strong>~2 hours</strong></li>
          <li>Established regulated <strong>Life Insurance LOB from scratch</strong></li>
        </ul>

        <h4>Engineering Manager / Lead Software Engineer — Snapdeal</h4>
        <p><em>Jan 2018 – Nov 2022 | Gurgaon</em></p>
        <p>
          Led checkout, payments, and order management platforms in high-traffic e-commerce.
        </p>
        <ul>
          <li><strong>Checkout and payments platforms</strong> handling 25K+ RPM</li>
          <li>Designed and delivered <strong>closed-wallet system</strong> for instant payments/refunds with UPI integration</li>
          <li>Built real-time <strong>refund and reconciliation systems</strong> improving financial accuracy</li>
          <li>Implemented secure payment gateway key management for compliance</li>
        </ul>

        <h4>Software Developer → Technical Lead — Nagarro</h4>
        <p><em>Aug 2011 – Dec 2017 | Gurgaon</em></p>
        <p>
          Progressed from individual contributor to technical leadership over 6 years.
        </p>
        <ul>
          <li>Built scalable B2B platforms across healthcare, gaming, and enterprise domains</li>
          <li>Owned key system components and mentored engineers</li>
          <li>Translated business requirements into scalable technical designs</li>
        </ul>
      </section>

      <section id="philosophy">
        <h2>Philosophy</h2>
        
        <p>
          I believe the best engineering leaders remain <strong>technically sharp</strong> while 
          building organizations that don&apos;t depend on them. My approach combines hands-on involvement 
          in architecture and design with systems thinking about team structure and delivery processes.
        </p>

        <h3>How I Lead</h3>
        <ul>
          <li><strong>Hands-on by default</strong> — I stay close to architecture reviews, critical 
              backend components, and design decisions</li>
          <li><strong>Predictable delivery</strong> — I build processes that ship reliably, 
              not heroically</li>
          <li><strong>Technical depth enables leadership</strong> — understanding systems deeply 
              allows me to make better organizational decisions</li>
          <li><strong>Teams over individuals</strong> — sustainable high performance comes from 
              team design, not individual output</li>
        </ul>

        <h3>Technical Expertise</h3>
        <p>
          <strong>Systems:</strong> Java, Spring Boot, Microservices, Kafka, MySQL, RESTful APIs
        </p>
        <p>
          <strong>Infrastructure:</strong> AWS (EC2, S3, Lambda, RDS), distributed systems, 
          high-throughput transactional platforms
        </p>
        <p>
          <strong>Emerging:</strong> AI-assisted development workflows, ML-based fraud detection, 
          document intelligence
        </p>

        <h3>Leadership</h3>
        <p>
          <strong>Organization:</strong> Scaled teams to 15+ engineers, org design, hiring and coaching
        </p>
        <p>
          <strong>Execution:</strong> Engineering strategy, delivery predictability, Agile/Scrum, 
          stakeholder communication
        </p>
      </section>
    </Layout>
  );
}
