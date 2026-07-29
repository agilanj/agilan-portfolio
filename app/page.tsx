"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import Image from "next/image";
import gsap from "gsap";
import { ArrowDownRight, ArrowUpRight, Award, BriefcaseBusiness, CheckCircle2, Code2, Download, Github, Layers3, Linkedin, LockKeyhole, Mail, Menu, Send, ShieldCheck, Sparkles, Terminal, X } from "lucide-react";
import { Badge, Button, Card, Section } from "@/components/ui";

const resumeUrl = "https://drive.google.com/file/d/1_FjHU9-CmCOpRasB9h68-gkH_xtG-wdJ/view?usp=sharing";
const githubUrl = "https://github.com/agilanj";
const linkedInUrl = "https://www.linkedin.com/in/agilanj/";

const navItems = ["About", "Skills", "Projects", "Experience", "Education", "Certifications", "Contact"];
const fadeUp = { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.18 }, transition: { duration: 0.55 } };

function SectionReveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) { return <motion.div {...fadeUp} transition={{ duration: 0.55, delay }}>{children}</motion.div>; }

function HeroVisual() {
  const scene = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!scene.current) return;
    const ctx = gsap.context(() => {
      gsap.to(".orbital-ring", { rotation: 360, duration: 22, ease: "none", repeat: -1 });
      gsap.to(".signal-card", { y: -10, duration: 2.8, stagger: 0.35, ease: "sine.inOut", yoyo: true, repeat: -1 });
    }, scene);
    return () => ctx.revert();
  }, []);
  return <div ref={scene}
    className="hero-visual"
    aria-label="Profile photo"
    >
    <div className="orbital-ring ring-one"/><div className="orbital-ring ring-two"/>
    <div className="avatar-shell">
    <div className="avatar-silhouette">
        <img src="/profile.png" alt="Agilan J" className="profile-image" />
    </div>
</div>
    <div className="signal-card signal-top"><span className="signal-icon"><LockKeyhole size={15}/></span><div><small>THREAT STATUS</small><strong>PROTECTED</strong></div><i/></div>
    <div className="signal-card signal-bottom"><span className="signal-icon cyan"><Terminal size={15}/></span><div><small>BUILD MODE</small><strong>AI + SECURITY</strong></div></div>
  </div>;
}

function SkillGroup({ title, skills, level }: { title: string; skills: string[]; level: number }) {
  return <Card className="skill-group"><div className="skill-title"><h3>{title}</h3><span>{level}%</span></div><div className="progress-track"><motion.div className="progress-fill" initial={{ width: 0 }} whileInView={{ width: `${level}%` }} viewport={{ once: true }} transition={{ duration: 1.2, ease: "easeOut" }}/></div><div className="tag-row">{skills.map((skill) => <Badge key={skill}>{skill}</Badge>)}</div></Card>;
}

function ProjectVisual({ code }: { code: string }) { return <div className="project-visual" role="img" aria-label="[Add project screenshot]"><span></span><div className="fake-window"><i/><i/><i/><code>{code}</code></div></div>; }

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cursor, setCursor] = useState({ x: -200, y: -200 });
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const formRef = useRef<HTMLFormElement>(null);
  const [formError, setFormError] = useState("");
  const [typed, setTyped] = useState("");
  const tagline = "Cybersecurity Engineer & Software Developer";

  useEffect(() => { let i = 0; const timer = setInterval(() => { setTyped(tagline.slice(0, i += 1)); if (i >= tagline.length) clearInterval(timer); }, 38); return () => clearInterval(timer); }, []);
  async function handleSubmit(event: FormEvent) {
  event.preventDefault();

  if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
    setFormError("Please complete your name, email, and message.");
    return;
  }

  if (!/^\S+@\S+\.\S+$/.test(form.email)) {
    setFormError("Please enter a valid email address.");
    return;
  }

  setFormError("");

  try {
    await emailjs.sendForm(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
      formRef.current!,
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
    );

    alert("Message sent successfully!");

    setForm({
      name: "",
      email: "",
      message: "",
    });
  } catch (error) {
    console.error(error);
    alert("Failed to send message.");
  }
}
  const closeMenu = () => setMenuOpen(false);
  return <main onMouseMove={(event) => setCursor({ x: event.clientX, y: event.clientY })}>
    <div className="cursor-glow" style={{ transform: `translate(${cursor.x - 180}px, ${cursor.y - 180}px)` }}/><div className="ambient ambient-a"/><div className="ambient ambient-b"/>
    <header className="site-header"><a className="brand" href="#home" aria-label="Agilan J home"><span>AJ</span> AGILAN<span className="brand-dot">.</span></a>
      <nav className="desktop-nav" aria-label="Primary navigation">{navItems.map((item) => <a href={`#${item.toLowerCase()}`} key={item}>{item}</a>)}</nav>
      <a className="nav-resume" href={resumeUrl} target="_blank" rel="noopener noreferrer"><Download size={15}/> Resume</a>
      <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"} aria-expanded={menuOpen}>{menuOpen ? <X/> : <Menu/>}</button>
      {menuOpen && <nav className="mobile-nav" aria-label="Mobile navigation">{navItems.map((item) => <a onClick={closeMenu} href={`#${item.toLowerCase()}`} key={item}>{item}</a>)}<a onClick={closeMenu} href={resumeUrl} target="_blank" rel="noopener noreferrer">Download Resume</a></nav>}
    </header>

    <section id="home" className="hero section-shell"><div className="hero-copy"><motion.p className="eyebrow" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>01 / WELCOME TO MY DIGITAL SPACE</motion.p><motion.h1 initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>Secure systems.<br/>Thoughtfully <em>built.</em></motion.h1><div className="typing-line"><span className="typing-dot"/>{typed}<b>|</b></div><motion.p className="hero-summary" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .35 }}>I&apos;m Agilan J, an aspiring cybersecurity engineer and software developer crafting secure, scalable, AI-powered applications that solve real-world problems.</motion.p><motion.div className="hero-actions" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .5 }}><Button href="#projects">View Projects <ArrowDownRight size={17}/></Button><Button href={resumeUrl} external variant="secondary">Download Resume <Download size={16}/></Button></motion.div><div className="hero-stats"><div><strong>03<span>+</span></strong><small>Years learning </small></div><div><strong>02<span>+</span></strong><small>Projects built </small></div><div><strong>07<span>+</span></strong><small>Certifications </small></div></div></div><HeroVisual/></section>

    <Section id="about" eyebrow="02 / ABOUT ME" title={<>Building beyond the <em>brief.</em></>}><div className="about-grid"><SectionReveal><p className="lead-copy">A curious learner, technology enthusiast, and creative builder from Chennai, India. I build complete products—where intelligent workflows, secure architecture, and a clean interface meet.</p></SectionReveal><div className="about-cards"><SectionReveal delay={.1}><Card><Sparkles/><h3>Curious by design</h3><p>Fast learner, detail-oriented problem solver, and passionate about turning ambitious ideas into useful products.</p></Card></SectionReveal><SectionReveal delay={.18}><Card><ShieldCheck/><h3>Security in the system</h3><p>I pair AI with cybersecurity, thinking about privacy and trust from the earliest product decision.</p></Card></SectionReveal></div></div><div className="journey-strip"><div><span>PROFESSIONAL JOURNEY</span><p>Growing through business automation, client-focused development, and secure data practices.</p></div><div><span>LEARNING JOURNEY</span><p>Exploring AI agents, embedded systems, cloud, and the systems that shape modern software.</p></div></div></Section>

    <Section id="skills" eyebrow="03 / CAPABILITIES" title={<>An evolving technical <em>arsenal.</em></>}><div className="skills-grid"><SkillGroup title="Programming" level={82} skills={["Java", "Python", "C", "C++"]}/><SkillGroup title="Web / Frontend" level={78} skills={["HTML", "CSS", "JavaScript", "React", "Tailwind", "Bootstrap"]}/><SkillGroup title="Cybersecurity" level={84} skills={["Secure Coding", "Encryption", "Tokenization", "API Security", "Privacy"]}/><SkillGroup title="AI & Automation" level={80} skills={["ChatGPT API", "Prompt Engineering", "Zoho Creator", "Deluge", "Workflows"]}/><SkillGroup title="Tools" level={76} skills={["Git", "GitHub", "VS Code", "Linux", "VirtualBox", "Parrot OS"]}/><Card className="timeline-card"><p className="eyebrow">TECH TIMELINE</p><div className="mini-timeline"><span>NOW</span><p>Secure apps, low-code automation & AI integration</p><span>NEXT</span><p>Cloud, Docker, advanced security & embedded systems</p></div></Card></div><div className="learning-strip"><span>Currently learning</span>{["Docker", "AWS", "Firebase", "Three.js", "Blender", "Advanced Cybersecurity", "Embedded Systems"].map((item) => <Badge key={item}>{item}</Badge>)}</div></Section>

    <Section id="projects" eyebrow="04 / SELECTED WORK" title={<>Products with a <em>purpose.</em></>}><div className="projects-grid"><SectionReveal><Card className="project-card flagship"><ProjectVisual code="mask(data) → evaluate(ai)"/><div className="project-content"><div className="project-number">01 / FLAGSHIP</div><h3>Secure AI-Driven Loan Evaluation System</h3><p>Secure customer management, document upload, workflow automation, and AI-assisted loan evaluation—with data masking before AI processing.</p><div className="tag-row"><Badge>Cybersecurity</Badge><Badge>AI</Badge><Badge>Business Automation</Badge><Badge>Zoho Creator</Badge></div><a className="text-link" href="https://github.com/agilanj/Secure-AI-Driven-Loan-Evaluation-System-Using-Zoho-Creator" target="_blank" rel="noopener noreferrer">View Code <ArrowUpRight size={16}/></a></div></Card></SectionReveal><SectionReveal delay={.12}><Card className="project-card"><ProjectVisual code="responsive() => restaurant"/><div className="project-content"><div className="project-number">02 / WEB</div><h3>Restaurant Website</h3><p>A responsive frontend experience built with HTML, CSS, and JavaScript, focused on clarity across every screen size.</p><div className="tag-row"><Badge>HTML</Badge><Badge>CSS</Badge><Badge>JavaScript</Badge></div><a className="text-link" href="https://github.com/agilanj/website" target="_blank" rel="noopener noreferrer">View Code <ArrowUpRight size={16}/></a></div></Card></SectionReveal></div><a className="github-activity" href={githubUrl} target="_blank" rel="noopener noreferrer"><Github/><div><span>GITHUB ACTIVITY</span><strong>131 repositories <em>— and building.</em></strong></div><ArrowUpRight/></a><div className="services-row"><span>WHAT I BUILD</span><p>Secure web applications <i/> AI-assisted workflows <i/> Automation systems <i/> Clean interfaces</p></div></Section>

    <Section id="experience" eyebrow="05 / EXPERIENCE" title={<>Learning where products meet <em>people.</em></>}><div className="experience-timeline"><div className="timeline-line"/><SectionReveal><Card className="experience-card"><div className="timeline-marker"><BriefcaseBusiness size={18}/></div><div className="experience-meta"><span>INTERNSHIP</span><p>Office Hub Tech Consulting</p><small>Zoho Consulting Partner · Sirkazhi</small></div><div><h3>Business Application Development</h3><p>Built business logic, workflow automation, dashboards, API integrations, and secure data-handling practices. The experience sharpened my professional workflow, secure application architecture, and client-oriented development.</p><div className="tag-row"><Badge>Deluge Scripting</Badge><Badge>API Integration</Badge><Badge>Dashboard Design</Badge></div></div></Card></SectionReveal></div></Section>

    <Section id="education" eyebrow="06 / EDUCATION" title={<>Foundation for a secure <em>future.</em></>}><Card className="education-card"><div className="education-mark"><Layers3/></div><div><span className="eyebrow">ONGOING · THIRD YEAR</span><h3>B.E. Computer Science & Engineering <em>(Cyber Security)</em></h3><p>Saveetha Engineering College · Chennai, India</p></div><span className="edu-year">2024 — 2028</span></Card></Section>

    <Section id="certifications" eyebrow="07 / CERTIFICATIONS & ACHIEVEMENTS" title={<>Learning, validated in <em>practice.</em></>}><p className="cert-intro">I actively pursue certifications to strengthen practical and theoretical knowledge across cloud, cybersecurity, IoT, and design.</p><div className="cert-grid">{["Introduction to IoT · 85%", "AWS Cloud Foundations", "AWS Technical Essentials", "Google Cloud Trust & Security", "Google Cloud Innovation", "Coursera Cybersecurity Careers", "Infosys UX Design"].map((item, index) => <SectionReveal key={item} delay={index * .04}><Card className="cert-card"><Award/><span>VERIFIED LEARNING</span><h3>{item}</h3><CheckCircle2/></Card></SectionReveal>)}</div></Section>

    <Section id="contact" eyebrow="08 / CONTACT" title={<>Let&apos;s build something <em>trusted.</em></>}><div className="contact-grid"><div><p className="lead-copy">Have an idea at the intersection of intelligent software and security? I&apos;d love to hear about it.</p><div className="contact-links"><a href="mailto:agilan4413@gmail.com" aria-label="Email Agilan J — agilan4413@gmail.com"><Mail/> <span><small>EMAIL</small> agilan4413@gmail.com </span><ArrowUpRight size={17}/></a><a href={linkedInUrl} target="_blank" rel="noopener noreferrer" aria-label="Visit Agilan J on LinkedIn"><Linkedin/> <span><small>LINKEDIN</small>agilanj</span><ArrowUpRight size={17}/></a><a href={githubUrl} target="_blank" rel="noopener noreferrer" aria-label="Visit Agilan J on GitHub"><Github/> <span><small>GITHUB</small>agilanj</span><ArrowUpRight size={17}/></a></div></div><Card className="contact-form-card"><form
  ref={formRef}
  onSubmit={handleSubmit}
  noValidate
><label>Name<input
  type="text"
  name="name"
  value={form.name}
  onChange={(e) =>
    setForm({
      ...form,
      name: e.target.value,
    })
  }
/></label><label>Email<input
  type="email"
  name="email"
  value={form.email}
  onChange={(e) =>
    setForm({
      ...form,
      email: e.target.value,
    })
  }
/></label><label>Message<textarea
  name="message"
  value={form.message}
  onChange={(e) =>
    setForm({
      ...form,
      message: e.target.value,
    })
  }
/></label>{formError && <p className="form-error" role="alert">{formError}</p>}<button className="button button-primary" type="submit">Send message <Send size={16}/></button><small className="form-note"></small></form></Card></div></Section>

    <footer><a className="brand" href="#home"><span>AJ</span> AGILAN<span className="brand-dot">.</span></a><p>Security-first thinking. Human-centered building.</p><div><a href={linkedInUrl} target="_blank" rel="noopener noreferrer" aria-label="Agilan J on LinkedIn"><Linkedin size={18}/></a><a href={githubUrl} target="_blank" rel="noopener noreferrer" aria-label="Agilan J on GitHub"><Github size={18}/></a><a href={resumeUrl} target="_blank" rel="noopener noreferrer" aria-label="Download Agilan J resume"><Download size={18}/></a></div><small>© {new Date().getFullYear()} Agilan J. All systems operational.</small></footer>
  </main>;
}
