import { useState } from "react";
import { ArrowDown, ArrowUpRight, Phone, X } from "lucide-react";
import { DraggableCardBody, DraggableCardContainer } from "@/components/ui/draggable-card";
import { CometCard } from "@/components/ui/comet-card";
import { Globe3D, type GlobeMarker } from "@/components/ui/3d-globe";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";

const MARKER_DOT =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"><circle cx="16" cy="16" r="9" fill="#d7f53c" stroke="#08090a" stroke-width="3"/></svg>`,
  );

const globeMarkers: GlobeMarker[] = [
  { lat: 28.6139, lng: 77.209, src: MARKER_DOT, label: "Delhi NCR — Home base" },
  { lat: 43.6532, lng: -79.3832, src: MARKER_DOT, label: "Toronto — Airport Limo Link" },
  { lat: 25.2048, lng: 55.2708, src: MARKER_DOT, label: "Dubai — Radiant Laundry, FlyOn Travel" },
  { lat: -34.9285, lng: 138.6007, src: MARKER_DOT, label: "Adelaide — Blossom Age & Disability" },
  { lat: 51.5074, lng: -0.1278, src: MARKER_DOT, label: "United Kingdom — Zentra Labs, Shapins Clinic, Éllanno" },
];

function WorldGlobe() {
  return (
    <div className="contact-globe" aria-label="Map of client locations worldwide">
      <Globe3D
        markers={globeMarkers}
        config={{
          atmosphereColor: "#d7f53c",
          atmosphereIntensity: 12,
          bumpScale: 4,
          autoRotateSpeed: 0.4,
          enableZoom: false,
          enablePan: false,
        }}
      />
    </div>
  );
}

type Project = {
  title: string;
  category: string;
  description: string;
  href: string;
  image: string;
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
    image: "/project-images/airport-limo.jpg",
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
    image: "/project-images/dpmi-india.jpg",
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
    image: "/project-images/aarav-electronics.jpg",
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
    image: "/project-images/spaces-by-u.jpg",
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
    image: "/project-images/radiant-laundry.jpg",
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
    image: "/project-images/blossom-care.jpg",
    challenge: "An Australian care-services site needed ongoing production support — frontend fixes, forms, content and media — without disrupting a live, in-use site.",
    approach: [
      "Handled frontend, forms and media updates as an ongoing production workload",
      "Improved responsive behavior across page templates",
      "Kept content and media changes safe on a live, publicly-used site",
    ],
    stack: ["WordPress", "PHP", "Responsive UX"],
    results: ["Stable production support over an extended engagement", "Improved responsive UX across the site"],
  },
  {
    title: "GrowScience Nutrition",
    category: "AI Chatbot / Customer Support",
    description: "An AI chatbot integrated on-site to handle product questions and support in real time.",
    href: "https://growsciencenutrition.com/",
    image: "/project-images/growscience-nutrition.jpg",
    challenge: "Customers browsing the storefront needed instant answers on products, ingredients and orders without waiting on email or ticket support.",
    approach: [
      "Integrated a hosted AI chatbot widget directly into the live storefront",
      "Configured responses around product, ingredient and order questions",
      "Kept the integration lightweight so it didn't affect page performance",
    ],
    stack: ["AI Chatbot", "JavaScript", "E-commerce"],
    results: ["Instant, always-on answers for site visitors", "Reduced load on manual support"],
  },
  {
    title: "Shapins Clinic",
    category: "Beauty & Skincare / WooCommerce",
    description: "A multi-location skincare clinic storefront built end-to-end, from design to WooCommerce build.",
    href: "https://shapinsclinic.com/",
    image: "/project-images/shapins-clinic.jpg",
    challenge: "A UK skincare and beauty clinic needed a WooCommerce site to sell treatment offers and vouchers across multiple locations, with a premium editorial feel rather than a generic storefront look.",
    approach: [
      "Designed and built the WooCommerce storefront end-to-end",
      "Structured treatments, offers and clinic locations as manageable content",
      "Styled the site around the clinic's premium beauty branding",
    ],
    stack: ["WordPress", "WooCommerce", "PHP"],
    results: ["Multi-location offers and treatments managed from one storefront", "Premium editorial design matching the beauty brand"],
  },
  {
    title: "Zentra Labs",
    category: "Research Peptides / WooCommerce",
    description: "A UK research-peptide supplier storefront with batch-verified product listings, designed and built end-to-end.",
    href: "https://zentralabs.co.uk/",
    image: "/project-images/zentra-labs.jpg",
    challenge: "A research chemical supplier needed a technical, trustworthy WooCommerce storefront that could clearly present purity, batch and certificate-of-analysis data alongside the product catalog.",
    approach: [
      "Designed and built the WooCommerce catalog end-to-end",
      "Structured product pages to surface purity, COA and batch data clearly",
      "Built a technical, lab-grade visual identity suited to the audience",
    ],
    stack: ["WordPress", "WooCommerce", "PHP"],
    results: ["Clear, trust-building product presentation for a technical audience", "A catalog structure ready to scale with new products"],
  },
  {
    title: "OxygenAuto",
    category: "Car Dealer / Lead Generation",
    description: "An end-of-life vehicle scrapping platform with an instant quote form, designed and built end-to-end.",
    href: "https://oxygenauto.in/",
    image: "/project-images/oxygen-auto.jpg",
    challenge: "India's end-of-life vehicle scrapping process needed a simple, trustworthy front end that could capture leads and walk first-time users through an unfamiliar process.",
    approach: [
      "Designed and built the site end-to-end",
      "Built the instant-quote lead-capture form and vehicle details flow",
      "Structured the site around a clear four-step process: price, inspection, pickup, payment",
    ],
    stack: ["Web Development", "Lead Generation", "UI/UX"],
    results: ["A clear, guided lead-capture flow for vehicle scrapping", "A simple process explanation that builds trust with first-time users"],
  },
  {
    title: "Éllanno",
    category: "Apparel / WooCommerce",
    description: "An editorial knitwear brand storefront built around sourcing story and product quality, end-to-end.",
    href: "https://ellanno.com/",
    image: "/project-images/ellanno.jpg",
    challenge: "A premium knitwear brand needed a WooCommerce site with an editorial feel that told its sourcing and craft story alongside the product catalog, not just a standard shop template.",
    approach: [
      "Designed and built the WooCommerce storefront end-to-end",
      "Built out editorial sections for sourcing, materials and care",
      "Kept the visual language quiet and premium to match the brand",
    ],
    stack: ["WordPress", "WooCommerce", "PHP"],
    results: ["An editorial storefront that reads as a brand story, not just a catalog", "A consistent premium visual identity across product and content pages"],
  },
  {
    title: "FlyOn Travel & Tourism",
    category: "Travel Agency",
    description: "A UAE travel agency site for visa services and curated tour packages, designed and built end-to-end.",
    href: "https://flyontravel.ae/",
    image: "/project-images/flyon-travel.jpg",
    challenge: "A Dubai-based travel agency needed a site to present visa services and tour packages clearly, with FAQs and reviews to build trust with travelers booking online.",
    approach: [
      "Designed and built the site end-to-end",
      "Structured visa services and tour packages as browsable catalogs",
      "Added FAQ and review sections to support the booking decision",
    ],
    stack: ["Web Development", "UI/UX", "WordPress"],
    results: ["Clear presentation of visa and tour offerings", "FAQ and review sections that support customer trust"],
  },
];

const beats = [
  { id: "hero", label: "01 / INTRO", title: "I build systems,\nnot just screens.", copy: "Mohammad Kazim — Software Engineer, Web & AI Solutions. Backend · SQL · APIs · Web · AI.", align: "left" },
  { id: "about", label: "02 / ABOUT", title: "Make the\ninside work.", copy: "I work across backend systems, data, APIs, AI automation, web platforms and deployment — translating messy requirements into dependable releases.", align: "right" },
  { id: "systems", label: "03 / SYSTEMS", title: "Every part\nhas a job.", copy: "The way I work is modular: understand the system, isolate the pressure point, then ship the smallest change that creates the biggest lift.", align: "left" },
  { id: "work", label: "04 / SELECTED WORK", title: "Web is the\nvisible layer.", copy: "The surface should be clear because the system underneath is considered. Explore selected work below.", align: "right" },
  { id: "backend", label: "05 / BACKEND", title: "Backend\nwith intent.", copy: "Python · FastAPI · PostgreSQL · REST APIs · Docker · RabbitMQ · Redis. The infrastructure should feel as deliberate as the interface.", align: "left" },
  { id: "ai", label: "06 / AI / AUTOMATION", title: "Automation\nthat earns trust.", copy: "LLMs · AI agents · n8n · RAG · API automation · prompt engineering. Not a glowing AI brain — useful intelligence, wired into real work.", align: "right" },
  { id: "experience", label: "07 / EXPERIENCE", title: "Built through\nproduction.", copy: "Two-plus years in production across 50+ websites, from client delivery to compromised-site recovery and CMS content automation.", align: "left" },
  { id: "back-cover", label: "08 / CLOSE", title: "One useful\nwhole.", copy: "A good system disappears into the work it makes possible. Scroll to the end, then let’s build something useful.", align: "right" },
];

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Home() {
  return (
    <main className="cinematic-site">
      <div className="cinematic-grain" aria-hidden="true" />
      <header className="cinematic-nav">
        <button className="nav-mark" onClick={() => scrollToId("top")} aria-label="Back to top">MK<span>®</span></button>
        <div className="nav-meta"><span>Software Engineer - Web &amp; AI Solutions</span><span className="nav-divider" /><span>Delhi NCR / India</span></div>
      </header>

      <section className="cinema" id="cinema-track">
        <div className="story-track">
          {beats.map((beat) => (
            <article className={`story-beat story-${beat.align}${beat.id === "work" ? " story-wide" : ""}`} id={beat.id} key={beat.id}>
              <div className="story-copy">
                <p className="story-label"><span>{beat.label}</span><i /></p>
                <h1>{beat.title.split("\n").map((line, index) => <span key={line}>{line}{index === 0 ? <br /> : null}</span>)}</h1>
                <p className="story-description">{beat.copy}</p>
                {beat.id === "hero" && <button className="story-cta" onClick={() => scrollToId("about")}>Explore the work <ArrowDown size={15} /></button>}
                {beat.id === "work" && <ProjectDeck />}
                {beat.id === "experience" && <ExperienceTimeline />}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="device-specs" id="work-summary">
        <div className="specs-header"><p className="eyebrow-light">The useful parts</p><span>8 cards / 12 projects</span></div>
        <div className="specs-grid">
          <div><h2>Physical thinking<br /><em>for digital work.</em></h2></div>
          <CardContainer className="w-full" containerClassName="py-0">
            <CardBody className="h-auto w-auto specs-3d-card">
              <CardItem translateZ={40} as="p" className="w-full specs-3d-copy">
                Whether it is a Shopify storefront, a Laravel CMS, a pricing engine or an automation layer, the job is the same: understand how the parts depend on each other, then make the whole thing easier to use.
              </CardItem>
              <CardItem translateZ={60} className="w-full spec-tags">
                {["PHP / Laravel", "WordPress", "Shopify", "WooCommerce", "MySQL", "REST APIs", "Python", "FastAPI", "AI Chatbots", "LLM Integration", "n8n Automation"].map((tag) => <span key={tag}>{tag}</span>)}
              </CardItem>
            </CardBody>
          </CardContainer>
        </div>
      </section>

      <section className="contact-frame" id="contact">
        <p className="story-label"><span>09 / FINAL FRAME</span><i /></p>
        <div className="contact-grid">
          <div>
            <h2>Let’s build<br /><em>something useful.</em></h2>
            <div className="contact-actions"><a href="mailto:mohammadkazim71@gmail.com">mohammadkazim71@gmail.com <ArrowUpRight size={17} /></a><a href="https://linkedin.com/in/mohammadkazim71" target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={15} /></a><a href="https://github.com/Kazim71" target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={15} /></a><a href="tel:+917898184847">+91 78981 84847 <Phone size={14} /></a></div>
          </div>
          <WorldGlobe />
        </div>
        <div className="contact-footer"><span>Mohammad Kazim / Software Engineer - Web &amp; AI Solutions</span><span>Delhi NCR, India · Working worldwide</span></div>
      </section>

      <a
        className="whatsapp-fab"
        href="https://wa.me/917898184847"
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
      >
        <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor" aria-hidden="true">
          <path d="M17.5 14.4c-.3-.1-1.7-.8-1.9-.9-.3-.1-.5-.1-.7.1-.2.3-.8.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.4-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.1-.7-1.7-1-2.3-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1.1 2.8 1.2 3c.1.2 2.2 3.4 5.4 4.7.7.3 1.3.5 1.8.7.8.2 1.4.2 2 .1.6-.1 1.7-.7 2-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.5-.3z" />
          <path d="M12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.6 1.4 5.1L2 22l5.1-1.3C8.6 21.5 10.3 22 12 22c5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18.2c-1.5 0-3-.4-4.3-1.1l-.3-.2-3.2.8.8-3.1-.2-.3C3.4 15 3 13.5 3 12 3 7.1 7.1 3 12 3s9 4.1 9 9-4.1 9-9 9z" />
        </svg>
      </a>
    </main>
  );
}

const deckLayout = [
  "absolute top-0 left-[2%] rotate-[-6deg]",
  "absolute top-10 left-[19%] rotate-[4deg]",
  "absolute top-2 left-[36%] rotate-[-3deg]",
  "absolute top-16 left-[53%] rotate-[7deg]",
  "absolute top-4 left-[70%] rotate-[-5deg]",
  "absolute top-[300px] left-[10%] rotate-[5deg]",
  "absolute top-[330px] left-[27%] rotate-[-7deg]",
  "absolute top-[300px] left-[44%] rotate-[3deg]",
  "absolute top-[340px] left-[61%] rotate-[-4deg]",
  "absolute top-[310px] left-[78%] rotate-[6deg]",
  "absolute top-[600px] left-[20%] rotate-[-5deg]",
  "absolute top-[610px] left-[50%] rotate-[4deg]",
];

function ProjectDeck() {
  const [openProject, setOpenProject] = useState<Project | null>(null);

  return (
    <>
      <DraggableCardContainer className="project-deck">
        {projects.map((project, index) => (
          <DraggableCardBody key={project.title} className={`project-card ${deckLayout[index % deckLayout.length]}`}>
            <CometCard className="w-full">
              <button type="button" className="project-card-face" onClick={() => setOpenProject(project)}>
                <img src={project.image} alt={`${project.title} preview`} loading="lazy" />
                <div className="project-card-meta">
                  <strong>{project.title}</strong>
                  <small>{project.category}</small>
                </div>
              </button>
            </CometCard>
          </DraggableCardBody>
        ))}
      </DraggableCardContainer>
      {openProject && <CaseStudyModal project={openProject} onClose={() => setOpenProject(null)} />}
    </>
  );
}

function CaseStudyModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <div className="case-study-overlay" onClick={onClose}>
      <article className="case-study-modal" onClick={(event) => event.stopPropagation()}>
        <button className="case-study-close" onClick={onClose} aria-label="Close case study"><X size={16} /></button>
        <div className="case-study-media">
          {imageFailed ? (
            <div className="case-study-media-fallback" aria-hidden="true">
              <span>{project.title.charAt(0)}</span>
            </div>
          ) : (
            <img src={project.image} alt={`${project.title} preview`} onError={() => setImageFailed(true)} />
          )}
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
