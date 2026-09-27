import { useRef, useState } from "react";
import type { CSSProperties, MouseEvent } from "react";
import { ArrowDown, ArrowUpRight, Moon, Phone, Sun, X } from "lucide-react";
import NotebookScene from "@/components/NotebookScene";
import { useCinematicScroll } from "@/hooks/useCinematicScroll";
import { useTheme } from "@/contexts/ThemeContext";

type Project = {
  title: string;
  category: string;
  description: string;
  href: string;
  stat: string;
  challenge: string;
  approach: string[];
  stack: string[];
  results: string[];
};

const projects: Project[] = [
  {
    title: "Airport Limo Link",
    category: "Pricing engine / WordPress",
    description: "A database-driven engine spanning 472 cities and 2,700+ rates.",
    href: "https://airportlimolink.ca/",
    stat: "−73% frontend JS",
    challenge: "A quote form for airport transfers needed to price 472 cities and 2,700+ rate combinations without shipping a bloated client bundle or slow page loads.",
    approach: [
      "Moved rate lookups server-side into a structured MySQL schema instead of client-side JS tables",
      "Rebuilt the quote flow around lean, cached PHP endpoints",
      "Stripped unused WordPress/plugin JS from the request path",
    ],
    stack: ["PHP", "WordPress", "MySQL", "REST APIs"],
    results: ["73% reduction in shipped frontend JavaScript", "Faster, more reliable multi-city quoting"],
  },
  {
    title: "DPMI India",
    category: "Custom CMS / Laravel",
    description: "A structured Laravel CMS replacing a legacy WordPress content model.",
    href: "https://www.dpmiindia.com/",
    stat: "422 posts migrated",
    challenge: "Legacy WordPress content had outgrown its data model — editors needed structured, relational content that a generic CMS couldn't express cleanly.",
    approach: [
      "Designed a purpose-built Laravel content model matching the real editorial structure",
      "Migrated 422 posts with content, media and relationships intact",
      "Built an admin workflow tailored to the editorial team, not a generic CMS UI",
    ],
    stack: ["Laravel", "PHP", "MySQL"],
    results: ["422 posts migrated with zero content loss", "Editorial workflow matched to actual content structure"],
  },
  {
    title: "Aarav Electronics",
    category: "E-commerce / Shopify",
    description: "A 500+ product storefront refined across catalog, product and checkout flows.",
    href: "https://aaravelectronics.com/",
    stat: "~1.5s faster",
    challenge: "A 500+ SKU electronics storefront had slow catalog and product pages that were costing conversions.",
    approach: [
      "Audited theme + app bloat across catalog, product and checkout templates",
      "Optimized image delivery and reduced render-blocking assets",
      "Refined catalog filtering and product-page structure for real browsing patterns",
    ],
    stack: ["Shopify", "Liquid", "JavaScript"],
    results: ["~1.5s faster page loads across key templates", "Cleaner catalog and checkout flow"],
  },
  {
    title: "Spaces by U",
    category: "Furniture e-commerce / WordPress",
    description: "ACF content sections and WooCommerce customizations across hundreds of pages.",
    href: "https://spacesbyu.com/",
    stat: "SEO uplift",
    challenge: "Hundreds of furniture product and category pages needed consistent, editable content sections without a rebuild.",
    approach: [
      "Built reusable ACF field groups and flexible content blocks",
      "Customized WooCommerce templates for furniture-specific merchandising",
      "Cleaned up on-page SEO structure across templates",
    ],
    stack: ["WordPress", "WooCommerce", "ACF"],
    results: ["Consistent, editor-managed content across hundreds of pages", "Measurable organic search uplift"],
  },
  {
    title: "Radiant Laundry",
    category: "Local services / WordPress",
    description: "13 services, 63 Dubai neighborhoods and reusable pricing content.",
    href: "https://radiantlaundry.ae/",
    stat: "Since 1971",
    challenge: "A 50+ year old local laundry business needed a location- and service-aware site covering 63 Dubai neighborhoods without duplicating content by hand.",
    approach: [
      "Modeled services and neighborhoods as reusable, structured content types",
      "Built templated location/service pages driven by that content model",
      "Kept legacy brand trust (est. 1971) visible in the new structure",
    ],
    stack: ["WordPress", "ACF", "SEO"],
    results: ["13 services × 63 neighborhoods covered without manual duplication", "Consistent local-SEO structure sitewide"],
  },
  {
    title: "Blossom Age & Disability",
    category: "Care services / WordPress",
    description: "Production maintenance across frontend, forms, content, media and responsive UX.",
    href: "https://blossomageanddisability.com.au/",
    stat: "Production support",
    challenge: "An Australian care-services site needed ongoing production support — frontend fixes, forms, content and media — without disrupting a live, in-use site.",
    approach: [
      "Handled frontend, forms and media updates as an ongoing production workload",
      "Improved responsive behavior across page templates",
      "Kept content and media changes safe on a live, publicly-used site",
    ],
    stack: ["WordPress", "PHP", "Responsive UX"],
    results: ["Stable production support over an extended engagement", "Improved responsive UX across the site"],
  },
];

const beats = [
  { id: "hero", label: "01 / COVER", title: "I build systems,\nnot just screens.", copy: "Mohammad Kazim — AI automation engineer and web & e-commerce developer. Backend · SQL · APIs · Web · AI.", align: "left" },
  { id: "about", label: "02 / ABOUT", title: "Make the\ninside work.", copy: "I work across backend systems, data, APIs, AI automation, web platforms and deployment — translating messy requirements into dependable releases.", align: "right" },
  { id: "systems", label: "03 / SYSTEMS", title: "Every part\nhas a job.", copy: "The way I work is modular: understand the system, isolate the pressure point, then ship the smallest change that creates the biggest lift.", align: "left" },
  { id: "work", label: "04 / SELECTED WORK", title: "Web is the\nvisible layer.", copy: "The surface should be clear because the system underneath is considered. Explore selected work below.", align: "right" },
  { id: "backend", label: "05 / BACKEND", title: "Backend\nwith intent.", copy: "Python · FastAPI · PostgreSQL · REST APIs · Docker · RabbitMQ · Redis. The infrastructure should feel as deliberate as the interface.", align: "left" },
  { id: "ai", label: "06 / AI / AUTOMATION", title: "Automation\nthat earns trust.", copy: "LLMs · AI agents · n8n · RAG · API automation · prompt engineering. Not a glowing AI brain — useful intelligence, wired into real work.", align: "right" },
  { id: "experience", label: "07 / EXPERIENCE", title: "Built through\nproduction.", copy: "Two-plus years in production across 50+ websites, from client delivery to compromised-site recovery and CMS content automation.", align: "left" },
  { id: "back-cover", label: "08 / BACK COVER", title: "One useful\nwhole.", copy: "A good system disappears into the work it makes possible. Scroll to the end, then let’s build something useful.", align: "right" },
];

function clamp(value: number) {
  return Math.min(1, Math.max(0, value));
}

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Home() {
  const cinemaRef = useRef<HTMLElement>(null);
  const progress = useCinematicScroll(cinemaRef);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const { theme, toggleTheme } = useTheme();

  const handlePointer = (event: MouseEvent<HTMLDivElement>) => {
    setPointer({
      x: ((event.clientX / window.innerWidth) - 0.5) * 2,
      y: ((event.clientY / window.innerHeight) - 0.5) * 2,
    });
  };

  return (
    <main className="cinematic-site" onMouseMove={handlePointer}>
      <div className="cinematic-grain" aria-hidden="true" />
      <header className="cinematic-nav">
        <button className="nav-mark" onClick={() => scrollToId("top")} aria-label="Back to top">MK<span>®</span></button>
        <div className="nav-meta"><span>AI Automation Engineer</span><span className="nav-divider" /><span>Delhi NCR / India</span></div>
        <div className="nav-actions">
          {toggleTheme && (
            <button className="nav-theme-toggle" onClick={toggleTheme} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}>
              {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
            </button>
          )}
          <button className="nav-scroll" onClick={() => scrollToId("cinema-track")}>Scroll to explore <ArrowDown size={14} /></button>
        </div>
      </header>

      <section className="cinema" id="cinema-track" ref={cinemaRef} style={{ "--story-progress": progress } as CSSProperties}>
        <div className="scene-sticky"><NotebookScene progress={progress} pointer={pointer} /></div>
        <div className="story-track">
          {beats.map((beat) => (
            <article className={`story-beat story-${beat.align}`} id={beat.id} key={beat.id}>
              <div className="story-copy">
                <p className="story-label"><span>{beat.label}</span><i /></p>
                <h1>{beat.title.split("\n").map((line, index) => <span key={line}>{line}{index === 0 ? <br /> : null}</span>)}</h1>
                <p className="story-description">{beat.copy}</p>
                {beat.id === "hero" && <button className="story-cta" onClick={() => scrollToId("about")}>Turn the first page <ArrowDown size={15} /></button>}
                {beat.id === "work" && <ProjectLensList />}
                {beat.id === "experience" && <ExperienceTimeline />}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="device-specs" id="work-summary">
        <div className="specs-header"><p className="eyebrow-light">The useful parts</p><span>7 pages / 06 projects</span></div>
        <div className="specs-grid">
          <div><h2>Physical thinking<br /><em>for digital work.</em></h2></div>
          <div className="specs-copy"><p>Whether it is a Shopify storefront, a Laravel CMS, a pricing engine or an automation layer, the job is the same: understand how the parts depend on each other, then make the whole thing easier to use.</p><div className="spec-tags">{["PHP / Laravel", "WordPress", "Shopify", "WooCommerce", "MySQL", "REST APIs", "Python", "FastAPI", "AI Automation"].map((tag) => <span key={tag}>{tag}</span>)}</div></div>
        </div>
      </section>

      <section className="contact-frame" id="contact">
        <p className="story-label"><span>09 / FINAL FRAME</span><i /></p>
        <h2>Let’s build<br /><em>something useful.</em></h2>
        <div className="contact-actions"><a href="mailto:mohammadkazim71@gmail.com">mohammadkazim71@gmail.com <ArrowUpRight size={17} /></a><a href="https://linkedin.com/in/mohammadkazim71" target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={15} /></a><a href="https://github.com/Kazim71" target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={15} /></a><a href="tel:+917898184847">+91 78981 84847 <Phone size={14} /></a></div>
        <div className="contact-footer"><span>Mohammad Kazim / AI Automation Engineer</span><span>Delhi NCR, India · Working worldwide</span></div>
      </section>
    </main>
  );
}

function ProjectLensList() {
  const [openProject, setOpenProject] = useState<Project | null>(null);

  return (
    <>
      <div className="lens-list">
        {projects.map((project, index) => (
          <button className="lens-row" onClick={() => setOpenProject(project)} key={project.title}>
            <span className="lens-number">0{index + 1}</span>
            <span><strong>{project.title}</strong><small>{project.category}</small></span>
            <span className="lens-stat">{project.stat}</span>
          </button>
        ))}
      </div>
      {openProject && <CaseStudyModal project={openProject} onClose={() => setOpenProject(null)} />}
    </>
  );
}

function CaseStudyModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <div className="case-study-overlay" onClick={onClose}>
      <article className="case-study-modal" onClick={(event) => event.stopPropagation()}>
        <button className="case-study-close" onClick={onClose} aria-label="Close case study"><X size={16} /></button>
        <div className="case-study-media">
          <div className="case-study-media-fallback" aria-hidden="true">
            <span>{project.title.charAt(0)}</span>
          </div>
        </div>
        <div className="case-study-body">
          <p className="story-label"><span>{project.category}</span><i /></p>
          <h2>{project.title}</h2>
          <p className="case-study-challenge">{project.challenge}</p>

          <div className="case-study-columns">
            <div>
              <h3>Approach</h3>
              <ul>{project.approach.map((line) => <li key={line}>{line}</li>)}</ul>
            </div>
            <div>
              <h3>Results</h3>
              <ul>{project.results.map((line) => <li key={line}>{line}</li>)}</ul>
            </div>
          </div>

          <div className="spec-tags">{project.stack.map((tag) => <span key={tag}>{tag}</span>)}</div>

          <a className="case-study-link" href={project.href} target="_blank" rel="noreferrer">
            Visit live site <ArrowUpRight size={15} />
          </a>
        </div>
      </article>
    </div>
  );
}

function ExperienceTimeline() {
  return <div className="experience-list"><div><span>MAR 2026 — PRESENT</span><strong>Software Developer - AI &amp; Web Solution</strong><small>EZ Rankings · Noida</small></div><div><span>DEC 2024 — FEB 2026</span><strong>Software Developer</strong><small>Clay Brains · Delhi</small></div><p>B.Tech, Electronics &amp; Communication Engineering · Bharati Vidyapeeth Deemed University, Pune · 2021–2025</p></div>;
}
