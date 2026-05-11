import { useRef, useState, useEffect } from "react";
import { motion } from "motion/react";
import { Target, Eye, Compass } from "lucide-react";

interface NodeDef {
  id: string;
  type: string;
  label: string;
  icon: string;
  color: string;
  size: number;
  // initial position as fraction 0–1
  ix: number;
  iy: number;
}

const NODE_DEFS: NodeDef[] = [
  { id: "hub", type: "hub",    label: "Community",   icon: "💜", color: "#5A4C80", size: 56, ix: 0.50, iy: 0.46 },
  { id: "v1",  type: "vol",    label: "Maria",       icon: "🤝", color: "#71648C", size: 44, ix: 0.20, iy: 0.14 },
  { id: "v2",  type: "vol",    label: "James",       icon: "🤝", color: "#71648C", size: 44, ix: 0.78, iy: 0.14 },
  { id: "v3",  type: "vol",    label: "Priya",       icon: "🤝", color: "#71648C", size: 44, ix: 0.08, iy: 0.55 },
  { id: "v4",  type: "vol",    label: "Arjun",       icon: "🤝", color: "#71648C", size: 44, ix: 0.92, iy: 0.55 },
  { id: "v5",  type: "vol",    label: "Sofia",       icon: "🤝", color: "#71648C", size: 44, ix: 0.50, iy: 0.88 },
  { id: "s1",  type: "senior", label: "Eleanor, 84", icon: "🌸", color: "#B7848C", size: 40, ix: 0.50, iy: 0.12 },
  { id: "s2",  type: "senior", label: "Harold, 79",  icon: "🌿", color: "#B7848C", size: 40, ix: 0.16, iy: 0.36 },
  { id: "s3",  type: "senior", label: "Dorothy, 91", icon: "🌸", color: "#B7848C", size: 40, ix: 0.84, iy: 0.36 },
  { id: "s4",  type: "senior", label: "Walter, 76",  icon: "🌿", color: "#B7848C", size: 40, ix: 0.28, iy: 0.72 },
  { id: "s5",  type: "senior", label: "Ruth, 88",    icon: "🌸", color: "#B7848C", size: 40, ix: 0.72, iy: 0.72 },
];

const LINKS = [
  ["v1","s1"],["v1","s2"],["v2","s1"],["v2","s3"],
  ["v3","s2"],["v3","s4"],["v4","s3"],["v4","s5"],
  ["v5","s4"],["v5","s5"],
  ["v1","hub"],["v2","hub"],["v3","hub"],["v4","hub"],["v5","hub"],
  ["s1","hub"],["s2","hub"],["s3","hub"],["s4","hub"],["s5","hub"],
];

interface PhysicsNode extends NodeDef {
  x: number; y: number;   // current px
  vx: number; vy: number;
  homeX: number; homeY: number; // initial px (home)
}

const DAMPING     = 0.78;
const HOME_STR    = 0.03;   // spring back to home
const REPEL_STR   = 1200;
const REPEL_MIN   = 55;
const IDLE_AMP    = 0.4;    // gentle idle drift speed

function tick(nodes: PhysicsNode[], W: number, H: number, pinnedId: string | null, t: number) {
  const byId: Record<string, PhysicsNode> = {};
  nodes.forEach(n => { byId[n.id] = n; });

  for (const n of nodes) {
    if (n.id === pinnedId) continue;

    // gentle idle sinusoidal nudge (unique phase per node)
    const phase = n.id.charCodeAt(0) + n.id.charCodeAt(1);
    n.vx += Math.sin(t * 0.0007 + phase) * IDLE_AMP * 0.04;
    n.vy += Math.cos(t * 0.0009 + phase * 1.3) * IDLE_AMP * 0.04;

    // spring back to home
    n.vx += (n.homeX - n.x) * HOME_STR;
    n.vy += (n.homeY - n.y) * HOME_STR;

    // soft repulsion between nodes
    for (const m of nodes) {
      if (m.id === n.id) continue;
      const dx = n.x - m.x, dy = n.y - m.y;
      const dist = Math.sqrt(dx * dx + dy * dy) || 1;
      if (dist < REPEL_MIN) {
        const f = REPEL_STR / (dist * dist);
        n.vx += (dx / dist) * f;
        n.vy += (dy / dist) * f;
      }
    }

    n.vx *= DAMPING;
    n.vy *= DAMPING;
    n.x  += n.vx;
    n.y  += n.vy;

    // clamp inside box
    n.x = Math.max(n.size, Math.min(W - n.size, n.x));
    n.y = Math.max(n.size, Math.min(H - n.size, n.y));
  }
}

function ConnectionMap() {
  const wrapRef    = useRef<HTMLDivElement>(null);
  const nodesRef   = useRef<PhysicsNode[]>([]);
  const pinnedRef  = useRef<string | null>(null);
  const didDragRef = useRef(false);
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const rafRef     = useRef<number>(0);
  const startT     = useRef(performance.now());
  const [, forceRender] = useState(0);
  const [ripples, setRipples] = useState<
    Record<string, { color: string; size: number; ts: number }[]>
  >({});

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    function init() {
      const W = wrap!.offsetWidth, H = wrap!.offsetHeight;
      nodesRef.current = NODE_DEFS.map(def => ({
        ...def,
        x: def.ix * W, y: def.iy * H,
        vx: 0, vy: 0,
        homeX: def.ix * W, homeY: def.iy * H,
      }));
    }

    init();

    function loop(now: number) {
      const wrap2 = wrapRef.current;
      if (!wrap2) return;
      const W = wrap2.offsetWidth, H = wrap2.offsetHeight;
      const t = now - startT.current;

      tick(nodesRef.current, W, H, pinnedRef.current, t);
      drawLines(W, H);
      forceRender(f => f + 1);
      rafRef.current = requestAnimationFrame(loop);
    }

    rafRef.current = requestAnimationFrame(loop);

    const ro = new ResizeObserver(() => {
      const wrap2 = wrapRef.current;
      if (!wrap2) return;
      const W = wrap2.offsetWidth, H = wrap2.offsetHeight;
      // rescale home positions on resize
      nodesRef.current.forEach(n => {
        n.homeX = n.ix * W;
        n.homeY = n.iy * H;
      });
    });
    ro.observe(wrap!);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, []);

  function drawLines(W: number, H: number) {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width  = W;
    canvas.height = H;
    const ctx = canvas.getContext("2d")!;
    ctx.clearRect(0, 0, W, H);

    const byId: Record<string, PhysicsNode> = {};
    nodesRef.current.forEach(n => { byId[n.id] = n; });

    for (const [a, b] of LINKS) {
      const na = byId[a], nb = byId[b];
      if (!na || !nb) continue;
      ctx.beginPath();
      ctx.moveTo(na.x, na.y);
      ctx.lineTo(nb.x, nb.y);
      ctx.strokeStyle = "rgba(90, 76, 128, 0.38)";
      ctx.lineWidth   = 1.8;
      ctx.setLineDash([5, 7]);
      ctx.stroke();
      ctx.setLineDash([]);
    }
  }

  // global mouse handlers
  useEffect(() => {
    function onMove(e: MouseEvent) {
      if (!pinnedRef.current || !wrapRef.current) return;
      const rect = wrapRef.current.getBoundingClientRect();
      const node = nodesRef.current.find(n => n.id === pinnedRef.current);
      if (!node) return;
      didDragRef.current = true;
      node.x  = Math.max(node.size, Math.min(rect.width  - node.size, e.clientX - rect.left));
      node.y  = Math.max(node.size, Math.min(rect.height - node.size, e.clientY - rect.top));
      node.vx = 0; node.vy = 0;
    }
    function onUp() { pinnedRef.current = null; }
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup",   onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup",   onUp);
    };
  }, []);

  function onMouseDown(e: React.MouseEvent, id: string) {
    e.preventDefault();
    didDragRef.current = false;
    pinnedRef.current  = id;
  }

  function handleClick(id: string) {
    if (didDragRef.current) return;
    const node = nodesRef.current.find(n => n.id === id);
    if (!node) return;
    if (ripples[id]) return;
    setRipples(r => ({
      ...r,
      [id]: [
        { color: node.color, size: node.size, ts: Date.now() },
        { color: node.color, size: node.size, ts: Date.now() + 550 },
        { color: node.color, size: node.size, ts: Date.now() + 1100 },
      ],
    }));
    setTimeout(() => setRipples(r => { const n = { ...r }; delete n[id]; return n; }), 3400);
  }

  return (
    <div
      ref={wrapRef}
      style={{
        position: "relative",
        aspectRatio: "1",
        borderRadius: 24,
        background: "linear-gradient(135deg,#f0ecf7 0%,#e8dff0 100%)",
        overflow: "hidden",
        userSelect: "none",
      }}
    >
      <style>{`
        @keyframes ripple-soft {
          0%   { transform: translate(-50%,-50%) scale(1);   opacity: 0.28; }
          60%  { transform: translate(-50%,-50%) scale(2.6); opacity: 0.08; }
          100% { transform: translate(-50%,-50%) scale(3.6); opacity: 0;    }
        }
      `}</style>

      <canvas
        ref={canvasRef}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
      />

      {/* ripple rings fixed at click position */}
      {Object.entries(ripples).map(([id, rings]) => {
        const node = nodesRef.current.find(n => n.id === id);
        if (!node) return null;
        return rings.map((ring, i) => (
          <div
            key={`${id}-${ring.ts}-${i}`}
            style={{
              position: "absolute",
              left: node.x, top: node.y,
              width: ring.size, height: ring.size,
              borderRadius: "50%",
              border: `1.5px solid ${ring.color}`,
              pointerEvents: "none",
              animation: `ripple-soft 1.9s cubic-bezier(0.15,0.5,0.3,1) ${i * 0.55}s forwards`,
            }}
          />
        ));
      })}

      {/* nodes */}
      {nodesRef.current.map((n) => (
        <div
          key={n.id}
          onMouseDown={(e) => onMouseDown(e, n.id)}
          onClick={() => handleClick(n.id)}
          style={{
            position: "absolute",
            left: n.x, top: n.y,
            transform: "translate(-50%,-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 4,
            cursor: pinnedRef.current === n.id ? "grabbing" : "grab",
            zIndex: pinnedRef.current === n.id ? 10 : 2,
            willChange: "transform",
          }}
        >
          <div
            style={{
              width: n.size, height: n.size,
              borderRadius: "50%",
              background: n.color,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: n.size * 0.38,
              boxShadow: `0 2px 16px ${n.color}30`,
              position: "relative",
              zIndex: 1,
            }}
          >
            {n.icon}
          </div>
          <div
            style={{
              fontSize: 10, fontWeight: 500,
              whiteSpace: "nowrap",
              background: "rgba(255,255,255,0.82)",
              color: "#4a3d6b",
              borderRadius: 20,
              padding: "2px 8px",
              backdropFilter: "blur(4px)",
              pointerEvents: "none",
            }}
          >
            {n.label}
          </div>
        </div>
      ))}
    </div>
  );
}

export function Mission() {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div
              className="text-[#71648C] mb-3"
              style={{ fontSize: "0.875rem", fontWeight: 600, letterSpacing: "0.1em" }}
            >
              OUR MISSION
            </div>
            <h2
              className="mb-6"
              style={{
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 800,
                letterSpacing: "-0.04em",
                color: "#2A2730",
              }}
            >
              Every senior deserves to feel valued, connected, and loved.
            </h2>
            <p
              className="mb-8"
              style={{ fontSize: "1.125rem", fontWeight: 400, lineHeight: 1.7, color: "#6F6A75" }}
            >
              We believe that aging should be a journey of dignity and joy, not isolation.
              Through compassionate care, meaningful connections, and unwavering support,
              we're redefining what it means to grow older together.
            </p>

            <div className="space-y-6">
              {[
                { icon: Target,  title: "Our Goal",   text: "Eliminate elderly isolation through sustainable community support." },
                { icon: Eye,     title: "Our Vision",  text: "A world where every senior feels seen, heard, and cherished." },
                { icon: Compass, title: "Our Values",  text: "Compassion, dignity, respect, and genuine human connection." },
              ].map((item) => (
                <div key={item.title} className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#71648C]/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-6 h-6 text-[#71648C]" />
                  </div>
                  <div>
                    <h4 className="mb-1" style={{ fontSize: "1.125rem", fontWeight: 700, color: "#2A2730" }}>
                      {item.title}
                    </h4>
                    <p style={{ fontSize: "1rem", fontWeight: 400, lineHeight: 1.6, color: "#6F6A75" }}>
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <ConnectionMap />
          </motion.div>
        </div>
      </div>
    </section>
  );
}