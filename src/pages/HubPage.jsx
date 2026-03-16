import { Link } from "react-router-dom";

const FORJAS = [
  {
    path: "/personajes",
    label: "Forja de Personajes",
    symbol: "⚔",
    color: "#c9933a",
    accent: "#f5c97a",
    description: "Construye arquetipos, historias de fondo, conflictos y misterios con tiradas de cartas narrativas.",
    status: "activo",
    tags: ["Arquetipos", "Conflictos", "Dilemas", "Misterios"],
  },
  {
    path: "/facciones",
    label: "Forja de Facciones",
    symbol: "⚜",
    color: "#7a5c9e",
    accent: "#b89fd4",
    description: "Genera facciones únicas con tipo, trasfondo, principios, objetivos y ritos mediante tiradas aleatorias.",
    status: "pronto",
    tags: ["Tipo", "Trasfondo", "Principios", "Ritos"],
  },
  {
    path: "/magia",
    label: "Forja de Magia",
    symbol: "✶",
    color: "#1a6b8a",
    accent: "#5bb8d4",
    description: "Mezcla sistemas mágicos con sliders hasta completar el 100%. Combina Magia Elemental, Sangre, Nigromancia y más.",
    status: "activo",
    tags: ["Elemental", "Nigromancia", "Santería", "Tecnomancia"],
  },
  {
    path: "/pueblos",
    label: "Forja de Pueblos",
    symbol: "🏛",
    color: "#2d6a4f",
    accent: "#74c69d",
    description: "Crea naciones y pueblos con sociedad, jerarquía, tipo político y organización mediante tiradas.",
    status: "pronto",
    tags: ["Sociedad", "Jerarquía", "Política", "Tipo"],
  },
  {
    path: "/religiones",
    label: "Forja de Religiones",
    symbol: "☽",
    color: "#8b2a2a",
    accent: "#e8776d",
    description: "Diseña panteones completos con deidades, sistema de creencias, culto, moral y trasfondo.",
    status: "pronto",
    tags: ["Deidades", "Creencias", "Culto", "Moral"],
  },
];

export default function HubPage() {
  return (
    <>
      <style>{`
        .hub-page {
          min-height: calc(100vh - 53px);
          position: relative;
          overflow: hidden;
        }

        /* ── HERO ── */
        .hub-hero {
          text-align: center;
          padding: 5rem 2rem 3.5rem;
          position: relative;
          z-index: 2;
        }

        .hub-hero-eyebrow {
          font-family: 'Cinzel', serif;
          font-size: 0.58rem;
          letter-spacing: 0.6em;
          color: var(--gold-dim);
          text-transform: uppercase;
          margin-bottom: 1.2rem;
        }

        .hub-hero-title {
          font-family: 'Cinzel Decorative', serif;
          font-size: clamp(2rem, 5vw, 3.5rem);
          font-weight: 700;
          color: var(--gold);
          text-shadow:
            0 0 80px rgba(201,147,58,0.4),
            0 0 30px rgba(201,147,58,0.2),
            0 4px 12px rgba(0,0,0,0.9);
          line-height: 1.15;
          letter-spacing: 0.04em;
        }

        .hub-hero-subtitle {
          font-size: clamp(1rem, 2vw, 1.25rem);
          color: var(--text-dim);
          font-style: italic;
          margin-top: 1rem;
          letter-spacing: 0.03em;
          max-width: 520px;
          margin-left: auto;
          margin-right: auto;
        }

        .hub-ornament {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          margin: 2rem auto;
          max-width: 280px;
        }
        .hub-orn-line {
          flex: 1; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(201,147,58,0.35));
        }
        .hub-orn-line.r {
          background: linear-gradient(90deg, rgba(201,147,58,0.35), transparent);
        }
        .hub-orn-diamond { color: var(--gold-dim); font-size: 0.55rem; }

        .hub-lede {
          max-width: 560px;
          margin: 0 auto 0.5rem;
          font-size: 1rem;
          line-height: 1.7;
          color: var(--parchment-dark);
          text-align: center;
        }

        /* ── GRID ── */
        .hub-grid-section {
          position: relative;
          z-index: 2;
          max-width: 1200px;
          margin: 0 auto;
          padding: 1rem 1.5rem 6rem;
        }

        .hub-section-label {
          font-family: 'Cinzel', serif;
          font-size: 0.58rem;
          letter-spacing: 0.45em;
          color: var(--text-dim);
          text-transform: uppercase;
          text-align: center;
          margin-bottom: 2rem;
        }

        .hub-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.25rem;
        }

        /* ── FORJA CARD ── */
        .forja-card {
          position: relative;
          background: linear-gradient(155deg, #1c1508 0%, #0e0b07 100%);
          border: 1px solid var(--forja-color);
          border-radius: 8px;
          padding: 1.8rem 1.6rem;
          text-decoration: none;
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
          overflow: hidden;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
          animation: hubCardIn 0.5s ease both;
        }

        .forja-card:nth-child(1) { animation-delay: 0.05s; }
        .forja-card:nth-child(2) { animation-delay: 0.12s; }
        .forja-card:nth-child(3) { animation-delay: 0.19s; }
        .forja-card:nth-child(4) { animation-delay: 0.26s; }
        .forja-card:nth-child(5) { animation-delay: 0.33s; }

        @keyframes hubCardIn {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .forja-card.active-forja {
          cursor: pointer;
        }
        .forja-card.active-forja:hover {
          transform: translateY(-5px);
          box-shadow:
            0 12px 40px rgba(0,0,0,0.6),
            0 0 0 1px var(--forja-color),
            0 0 30px rgba(var(--forja-rgb), 0.12);
        }

        .forja-card.coming-soon-forja {
          cursor: default;
          opacity: 0.6;
          filter: saturate(0.5);
        }

        .forja-card-glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 70% 40% at 50% 0%, rgba(201,147,58,0.06) 0%, transparent 70%);
          pointer-events: none;
          border-radius: 7px;
          transition: opacity 0.3s;
        }
        .forja-card.active-forja:hover .forja-card-glow {
          opacity: 2;
        }

        .forja-card-corner {
          position: absolute;
          top: 10px; right: 12px;
          font-family: 'Cinzel', serif;
          font-size: 0.48rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          padding: 0.2rem 0.5rem;
          border-radius: 2px;
        }
        .forja-card-corner.active-badge {
          background: rgba(201,147,58,0.15);
          border: 1px solid rgba(201,147,58,0.35);
          color: var(--gold);
        }
        .forja-card-corner.soon-badge {
          background: rgba(120,100,70,0.1);
          border: 1px solid rgba(120,100,70,0.2);
          color: var(--text-dim);
        }

        .forja-card-symbol {
          font-size: 2rem;
          color: var(--forja-color);
          filter: drop-shadow(0 0 10px var(--forja-color));
          opacity: 0.8;
          line-height: 1;
        }

        .forja-card-title {
          font-family: 'Cinzel', serif;
          font-size: 1rem;
          font-weight: 700;
          color: var(--forja-accent);
          letter-spacing: 0.04em;
          line-height: 1.25;
        }

        .forja-divider {
          height: 1px;
          background: linear-gradient(90deg, var(--forja-color), transparent);
          opacity: 0.3;
        }

        .forja-card-desc {
          font-size: 0.86rem;
          line-height: 1.65;
          color: var(--parchment-dark);
          font-style: italic;
          flex: 1;
        }

        .forja-card-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
          margin-top: 0.3rem;
        }
        .forja-tag {
          font-family: 'Cinzel', serif;
          font-size: 0.52rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--forja-accent);
          border: 1px solid var(--forja-color);
          opacity: 0.55;
          padding: 0.18rem 0.5rem;
          border-radius: 2px;
        }

        .forja-cta {
          font-family: 'Cinzel', serif;
          font-size: 0.62rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--forja-accent);
          margin-top: 0.3rem;
          display: flex;
          align-items: center;
          gap: 0.4rem;
          opacity: 0;
          transform: translateX(-6px);
          transition: all 0.25s;
        }
        .forja-card.active-forja:hover .forja-cta {
          opacity: 0.8;
          transform: translateX(0);
        }
        .forja-cta-arrow { font-size: 0.8rem; }

        /* ── AMBIENT ── */
        .hub-ambient {
          position: fixed;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          background:
            radial-gradient(ellipse 60% 35% at 50% 0%, #2a1800 0%, transparent 65%),
            radial-gradient(ellipse 40% 25% at 15% 80%, #0d0820 0%, transparent 55%),
            radial-gradient(ellipse 30% 20% at 85% 60%, #071820 0%, transparent 50%);
        }

        /* ── BOTTOM RUNE ── */
        .hub-rune-row {
          display: flex;
          justify-content: center;
          gap: 2rem;
          padding: 1rem 0 2rem;
          position: relative;
          z-index: 2;
        }
        .hub-rune {
          font-family: 'Cinzel', serif;
          font-size: 1rem;
          color: var(--gold-dim);
          opacity: 0.18;
          letter-spacing: 0.5em;
        }
      `}</style>

      <div className="hub-ambient" />

      <div className="hub-page">
        {/* HERO */}
        <section className="hub-hero">
          <div className="hub-hero-eyebrow">✦ Compañero de Construcción de Mundos ✦</div>
          <h1 className="hub-hero-title">El Oráculo</h1>
          <p className="hub-hero-subtitle">Donde los mundos toman forma a través del azar y la imaginación</p>

          <div className="hub-ornament">
            <div className="hub-orn-line" />
            <span className="hub-orn-diamond">◆</span>
            <div className="hub-orn-line r" />
          </div>

          <p className="hub-lede">
            Cinco herramientas para forjar personajes, facciones, sistemas de magia,
            naciones y religiones para tus mundos de ficción.
          </p>
        </section>

        {/* FORJA GRID */}
        <section className="hub-grid-section">
          <div className="hub-section-label">✦ &nbsp; Las Cinco Forjas &nbsp; ✦</div>

          <div className="hub-grid">
            {FORJAS.map((forja) => {
              const isActive = forja.status === "activo";
              const CardEl = isActive ? Link : "div";

              return (
                <CardEl
                  key={forja.path}
                  to={isActive ? forja.path : undefined}
                  className={`forja-card ${isActive ? "active-forja" : "coming-soon-forja"}`}
                  style={{
                    "--forja-color": forja.color,
                    "--forja-accent": forja.accent,
                  }}
                >
                  <div className="forja-card-glow" />

                  <span className={`forja-card-corner ${isActive ? "active-badge" : "soon-badge"}`}>
                    {isActive ? "● Activo" : "◌ Próximamente"}
                  </span>

                  <div className="forja-card-symbol">{forja.symbol}</div>
                  <div className="forja-card-title">{forja.label}</div>
                  <div className="forja-divider" />
                  <p className="forja-card-desc">{forja.description}</p>

                  <div className="forja-card-tags">
                    {forja.tags.map(t => (
                      <span key={t} className="forja-tag">{t}</span>
                    ))}
                  </div>

                  {isActive && (
                    <div className="forja-cta">
                      <span className="forja-cta-arrow">→</span>
                      Entrar a la Forja
                    </div>
                  )}
                </CardEl>
              );
            })}
          </div>
        </section>

        <div className="hub-rune-row">
          <span className="hub-rune">◈</span>
          <span className="hub-rune">◈</span>
          <span className="hub-rune">◈</span>
        </div>
      </div>
    </>
  );
}