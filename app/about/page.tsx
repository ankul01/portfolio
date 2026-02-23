import Layout from '@/components/Layout';

export default function AboutPage() {
  return (
    <Layout>
      <h1>About Me</h1>
      <p>
        Welcome to my personal portfolio. This page provides an overview of my background,
        experience, and professional philosophy.
      </p>

      <section id="background">
        <h2>Background</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
        <p>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu 
          fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in 
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </section>

      <section id="experience">
        <h2>Experience</h2>
        <p>
          With over a decade of experience in software engineering and technical leadership,
          I have contributed to building scalable systems and high-performing teams.
        </p>
        <h3>Key Highlights</h3>
        <ul>
          <li>Led engineering teams of 10+ engineers across multiple product areas</li>
          <li>Architected systems handling millions of requests per day</li>
          <li>Mentored junior engineers and established engineering best practices</li>
          <li>Delivered critical projects on time while maintaining high quality standards</li>
        </ul>
      </section>

      <section id="philosophy">
        <h2>Philosophy</h2>
        <p>
          I believe in building systems and teams that are sustainable, scalable, and focused
          on delivering value. My approach combines technical excellence with a deep understanding
          of business needs.
        </p>
        <h3>Core Beliefs</h3>
        <ul>
          <li>Simplicity is the ultimate sophistication</li>
          <li>Great teams are built on trust and psychological safety</li>
          <li>Technical decisions should be driven by business impact</li>
          <li>Continuous learning is essential for growth</li>
        </ul>
      </section>
    </Layout>
  );
}
