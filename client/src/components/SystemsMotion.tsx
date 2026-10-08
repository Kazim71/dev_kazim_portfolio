import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { RotateCcw } from "lucide-react";
import { useIsMobile } from "@/hooks/useMobile";

/*
 * 15-second motion study: "I build systems. Not just screens."
 * Statement → contrast → architecture → intelligence layer → pipeline → signature.
 * Pure DOM/SVG + motion (already in the bundle). Starts when scrolled into view,
 * and collapses to the final frame for prefers-reduced-motion.
 */

const PHASE_STARTS = [0, 2000, 4000, 7000, 10000, 13000];
const TOTAL_MS = 15000;
const FINAL_PHASE = PHASE_STARTS.length - 1;
const SCENE_LABELS = ["Statement", "Contrast", "Architecture", "Intelligence", "Pipeline", "Signature"];
const EASE = [0.2, 0.8, 0.2, 1] as const;

type NodeDef = { id: string; label: string; sub: string; x: number; y: number; w: number; h: number; layer: "core" | "intel"; order: number };
type EdgeDef = { from: string; to: string; layer: "core" | "intel" };
type Layout = { viewBox: string; nodes: NodeDef[] };

const NODE_COPY: Record<string, { label: string; sub: string }> = {
  ui: { label: "UI", sub: "React · Interfaces" },
  api: { label: "API", sub: "REST · Endpoints" },
  backend: { label: "Backend", sub: "Python · PHP · Laravel" },
  db: { label: "Database", sub: "PostgreSQL · MySQL" },
  ai: { label: "AI", sub: "Agents · RAG" },
  llm: { label: "LLM", sub: "Prompting · Tools" },
  automation: { label: "Automation", sub: "n8n · Workflows" },
  webhooks: { label: "Webhooks", sub: "Events · Integrations" },
};

function makeLayout(viewBox: string, core: [number, number, number, number], intel: [number, number, number, number], coreYs: number[], intelYs: number[]): Layout {
  const coreIds = ["ui", "api", "backend", "db"];
  const intelIds = ["ai", "llm", "automation", "webhooks"];
  return {
    viewBox,
    nodes: [
      ...coreIds.map((id, i) => ({ id, ...NODE_COPY[id], x: core[0], y: coreYs[i], w: core[2], h: core[3], layer: "core" as const, order: i })),
      ...intelIds.map((id, i) => ({ id, ...NODE_COPY[id], x: intel[0], y: intelYs[i], w: intel[2], h: intel[3], layer: "intel" as const, order: i })),
    ],
  };
}

const DESKTOP_LAYOUT = makeLayout("0 0 1000 560", [250, 0, 220, 70], [610, 0, 220, 70], [40, 170, 300, 430], [70, 200, 330, 460]);
const MOBILE_LAYOUT = makeLayout("0 0 360 600", [16, 0, 150, 64], [196, 0, 148, 64], [40, 170, 300, 430], [96, 226, 356, 486]);

const EDGES: EdgeDef[] = [
  { from: "ui", to: "api", layer: "core" },
  { from: "api", to: "backend", layer: "core" },
  { from: "backend", to: "db", layer: "core" },
  { from: "backend", to: "ai", layer: "intel" },
  { from: "ai", to: "llm", layer: "intel" },
  { from: "backend", to: "automation", layer: "intel" },
  { from: "automation", to: "webhooks", layer: "intel" },
  { from: "webhooks", to: "api", layer: "intel" },
];

function edgePath(a: NodeDef, b: NodeDef) {
  if (a.layer === b.layer) {
    const x = a.x + a.w / 2;
    return `M ${x} ${a.y + a.h} L ${x} ${b.y}`;
  }
  const leftToRight = b.x > a.x;
  const x1 = leftToRight ? a.x + a.w : a.x;
  const x2 = leftToRight ? b.x : b.x + b.w;
  const y1 = a.y + a.h / 2;
  const y2 = b.y + b.h / 2;
  const mid = (x1 + x2) / 2;
  return `M ${x1} ${y1} C ${mid} ${y1}, ${mid} ${y2}, ${x2} ${y2}`;
}

export default function SystemsMotion() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { amount: 0.45, once: true });
  const reduceMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const [phase, setPhase] = useState(-1);
  const [run, setRun] = useState(0);

  useEffect(() => {
    if (reduceMotion) {
      setPhase(FINAL_PHASE);
      return;
    }
    if (!inView) return;
    setPhase(0);
    const timers = PHASE_STARTS.slice(1).map((start, index) => window.setTimeout(() => setPhase(index + 1), start));
    return () => timers.forEach(window.clearTimeout);
  }, [inView, run, reduceMotion]);

  const layout = isMobile ? MOBILE_LAYOUT : DESKTOP_LAYOUT;
  const playing = phase >= 0 && !reduceMotion;

  return (
    <section className="motion-study" id="motion-study" ref={sectionRef} aria-labelledby="motion-study-title">
      <div className="motion-study-head">
        <div>
          <p className="story-label"><span>Creative engineering / Motion study</span><i /></p>
          <p className="motion-study-intro" id="motion-study-title">An animated exploration of how I think about building software systems.</p>
        </div>
        <button type="button" className="motion-replay" onClick={() => setRun((value) => value + 1)} disabled={!playing} aria-label="Replay motion study">
          <RotateCcw size={13} /> Replay
        </button>
      </div>

      <div className="motion-stage" role="img" aria-label="I build systems, not just screens. UI connects to an API, a backend and a database, then AI, LLMs, automation and webhooks join in, compressing into a pipeline: build, integrate, automate, ship. Signed Mohammad Kazim, Software Engineer, Web and AI Solutions.">
        <div className="motion-grid" aria-hidden="true" />
        <AnimatePresence>
          {(phase === 0 || phase === 1) && <StatementScene key={`statement-${run}`} phase={phase} />}
          {(phase === 2 || phase === 3) && <ArchitectureScene key={`arch-${run}`} phase={phase} layout={layout} />}
          {phase === 4 && <PipelineScene key={`pipeline-${run}`} />}
          {phase === FINAL_PHASE && <SignatureScene key={`signature-${run}`} still={!!reduceMotion} />}
        </AnimatePresence>

        <div className="motion-hud" aria-hidden="true">
          <div className="motion-scenes">
            {SCENE_LABELS.map((label, index) => (
              <span key={label} className={index === phase ? "is-active" : index < phase ? "is-done" : undefined}>
                <b>{String(index + 1).padStart(2, "0")}</b>{label}
              </span>
            ))}
          </div>
          <div className="motion-progress">
            {phase >= 0 && <i key={run} style={reduceMotion ? { animation: "none", transform: "scaleX(1)" } : { animationDuration: `${TOTAL_MS}ms` }} />}
          </div>
        </div>
      </div>
    </section>
  );
}

const sceneFade = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5, ease: EASE } },
  exit: { opacity: 0, scale: 0.96, filter: "blur(6px)", transition: { duration: 0.45, ease: EASE } },
};

function MaskedWords({ text, delay = 0, className }: { text: string; delay?: number; className?: string }) {
  return (
    <span className={className}>
      {text.split(" ").map((word, index) => (
        <span className="motion-mask" key={`${word}-${index}`}>
          <motion.span
            initial={{ y: "105%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 0.85, delay: delay + index * 0.09, ease: EASE }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

function StatementScene({ phase }: { phase: number }) {
  return (
    <motion.div className="motion-scene motion-statement" {...sceneFade}>
      <motion.p
        className="motion-type"
        animate={phase === 1 ? { opacity: 0.32, y: -6 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE }}
      >
        <MaskedWords text="I build systems." delay={0.15} />
      </motion.p>
      {phase === 1 && (
        <p className="motion-type motion-type-accent">
          <MaskedWords text="Not just" />{" "}
          <span className="motion-screen-word">
            <MaskedWords text="screens." delay={0.18} className="motion-serif" />
            <motion.span
              className="motion-screen-frame"
              initial={{ opacity: 0, scale: 1.25 }}
              animate={{ opacity: [0, 1, 1, 0], scale: [1.25, 1, 1, 0.6] }}
              transition={{ duration: 1.7, delay: 0.35, times: [0, 0.3, 0.75, 1], ease: EASE }}
            />
          </span>
        </p>
      )}
    </motion.div>
  );
}

function ArchitectureScene({ phase, layout }: { phase: number; layout: Layout }) {
  const nodes = Object.fromEntries(layout.nodes.map((node) => [node.id, node]));
  const intelOn = phase >= 3;

  return (
    <motion.div className="motion-scene motion-architecture" {...sceneFade}>
      <p className="motion-caption">
        <span>{intelOn ? "Intelligence layer" : "Request path"}</span>
        <span>{intelOn ? "AI · LLM · Automation · Webhooks" : "UI → API → Backend → Database"}</span>
      </p>
      <svg viewBox={layout.viewBox} preserveAspectRatio="xMidYMid meet" className="motion-svg">
        {EDGES.map((edge, index) => {
          if (edge.layer === "intel" && !intelOn) return null;
          const d = edgePath(nodes[edge.from], nodes[edge.to]);
          const delay = edge.layer === "core" ? 0.35 + index * 0.55 : 0.25 + (index - 3) * 0.32;
          return (
            <g key={`${edge.from}-${edge.to}`}>
              <motion.path
                d={d}
                className={`motion-edge motion-edge-${edge.layer}`}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay, ease: EASE }}
              />
              {intelOn && (
                <motion.path
                  d={d}
                  className="motion-edge-flow"
                  initial={{ opacity: 0, strokeDashoffset: 0 }}
                  animate={{ opacity: 1, strokeDashoffset: -60 }}
                  transition={{ opacity: { duration: 0.4, delay: 0.9 }, strokeDashoffset: { duration: 1.4, repeat: Infinity, ease: "linear" } }}
                />
              )}
            </g>
          );
        })}

        {layout.nodes.map((node) => {
          if (node.layer === "intel" && !intelOn) return null;
          const delay = node.layer === "core" ? 0.1 + node.order * 0.55 : 0.1 + node.order * 0.32;
          return (
            <motion.g
              key={node.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay, ease: EASE }}
            >
              <rect x={node.x} y={node.y} width={node.w} height={node.h} rx={4} className={`motion-node motion-node-${node.layer}`} />
              <circle cx={node.x + 16} cy={node.y + 20} r={3} className="motion-node-dot" />
              <text x={node.x + 28} y={node.y + 25} className="motion-node-label">{node.label}</text>
              <text x={node.x + 16} y={node.y + node.h - 16} className="motion-node-sub">{node.sub}</text>
            </motion.g>
          );
        })}
      </svg>
    </motion.div>
  );
}

const PIPELINE = ["Build", "Integrate", "Automate", "Ship"];

function PipelineScene() {
  return (
    <motion.div className="motion-scene motion-pipeline" {...sceneFade}>
      <ol>
        {PIPELINE.map((step, index) => (
          <motion.li
            key={step}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 + index * 0.35, ease: EASE }}
          >
            <small>{String(index + 1).padStart(2, "0")}</small>
            <strong>{step}</strong>
            {index < PIPELINE.length - 1 && <span className="motion-arrow" aria-hidden="true">→</span>}
          </motion.li>
        ))}
      </ol>
      <motion.div
        className="motion-pipeline-rule"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 2.2, delay: 0.2, ease: [0.65, 0, 0.35, 1] }}
      />
    </motion.div>
  );
}

function SignatureScene({ still }: { still: boolean }) {
  const enter = (delay: number) =>
    still ? {} : { initial: { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.75, delay, ease: EASE } };

  return (
    <motion.div className="motion-scene motion-signature" {...(still ? {} : sceneFade)}>
      <motion.span className="motion-mark" {...enter(0.05)}>MK<i /></motion.span>
      <motion.h3 {...enter(0.15)}>Mohammad Kazim</motion.h3>
      <motion.p className="motion-role" {...enter(0.35)}>Software Engineer - Web &amp; AI Solutions</motion.p>
      <motion.p className="motion-signoff" {...enter(0.6)}>Build → Integrate → Automate → Ship</motion.p>
    </motion.div>
  );
}
