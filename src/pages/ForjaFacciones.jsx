import { useState, useCallback, useRef } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const DECKS = {
  identidad: {
    id: "identidad",
    label: "Identidad",
    color: "#c9933a",
    accent: "#f5c97a",
    symbol: "⚜",
    cards: [
      { id: "i01", title: "La Orden Invisible", body: "No tienen sede, ni insignia, ni nombre público. Su poder reside en que nadie puede señalarlos. Existen en los márgenes de cada institución que pretenden controlar." },
      { id: "i02", title: "Los Supervivientes del Fuego", body: "Nacieron de una catástrofe. El trauma los forjó en una identidad irrompible: son lo que queda cuando todo lo demás arde." },
      { id: "i03", title: "La Hermandad del Umbral", body: "Habitan el espacio entre dos mundos — dos naciones, dos facciones, dos eras. Su fuerza es la ambigüedad. Su debilidad, no pertenecer a ninguno." },
      { id: "i04", title: "Los Hijos de la Deuda", body: "Cada miembro ingresó porque debía algo. La facción no libera esas deudas — las acumula, las cataloga y las usa. Son tan leales como profundas son sus obligaciones." },
      { id: "i05", title: "La Vanguardia Rota", body: "Fueron los primeros en creer en algo. El mundo los alcanzó y superó. Ahora luchan para que nadie olvide que ellos llegaron antes." },
      { id: "i06", title: "El Gremio de los Sin Nombre", body: "Sus miembros abandonan su nombre al unirse. Reciben uno nuevo. Esa muerte simbólica los une más que cualquier juramento." },
      { id: "i07", title: "Los Guardianes del Umbral Roto", body: "Alguna vez custodiaron algo sagrado. Lo perdieron. Ahora su identidad entera es el duelo por esa pérdida y el juramento de recuperarla." },
    ]
  },
  estructura: {
    id: "estructura",
    label: "Estructura",
    color: "#7a5c9e",
    accent: "#b89fd4",
    symbol: "🏛",
    cards: [
      { id: "e01", title: "El Consejo de las Sombras", body: "Nadie sabe quiénes son los líderes. Ni siquiera entre ellos. Las órdenes llegan en código. Las decisiones se toman por consenso anónimo y cada voto es irrevocable." },
      { id: "e02", title: "La Pirámide Invertida", body: "Los que ejecutan tienen todo el poder visible. Los que mandan son invisibles. La estructura protege a los superiores exponiendo a los inferiores." },
      { id: "e03", title: "La Red de Células", body: "Cada célula conoce solo a la célula contigua. Si una cae, la red sobrevive. El costo es que nadie tiene visión completa del conjunto. Ni siquiera los fundadores." },
      { id: "e04", title: "La Meritocracia Cruel", body: "El rango se gana y se pierde públicamente. No hay lealtad hacia arriba — solo competencia constante. Produce élites brillantes y una base resentida." },
      { id: "e05", title: "El Linaje Cerrado", body: "El liderazgo es hereditario y la sangre lo es todo. Los de fuera pueden servir pero nunca mandar. La facción es tan fuerte como la última generación de su línea." },
      { id: "e06", title: "La Asamblea del Voto", body: "Cada decisión mayor se vota. Es lenta, ruidosa y resistente a la corrupción individual. También es incapaz de actuar en crisis y paralela cuando más importa." },
      { id: "e07", title: "El Maestro y los Círculos", body: "Una figura central irremplazable rodea de anillos concéntricos de confianza. La proximidad al centro es el único poder que importa. Su debilidad: el Maestro." },
    ]
  },
  valores: {
    id: "valores",
    label: "Valores y Código",
    color: "#1a6b8a",
    accent: "#5bb8d4",
    symbol: "⚖",
    cards: [
      { id: "v01", title: "La Pureza del Método", body: "No importa el objetivo — solo cómo se alcanza. Han traicionado fines valiosos por negarse a usar medios impuros. Y han dormido bien cada noche." },
      { id: "v02", title: "El Pragmatismo Absoluto", body: "Cualquier método está permitido si el resultado lo justifica. No tienen hipocresía — admiten lo que hacen y por qué. Eso los hace terribles y honestos." },
      { id: "v03", title: "La Memoria como Obligación", body: "Recuerdan todo. Los agravios, las deudas, los traidores, los mártires. No perdonan ni olvidan. Eso los hace confiables para sus aliados y letales para sus enemigos." },
      { id: "v04", title: "El Sacrificio como Virtud", body: "Cuanto más das, más vales. Los que lo han perdido todo son los más respetados. Esa lógica produce héroes genuinos y también una cultura que devora a sus mejores miembros." },
      { id: "v05", title: "La Lealtad sobre la Verdad", body: "Si debes elegir entre proteger a un hermano y decir la verdad, proteges al hermano. Siempre. Esta regla los ha salvado mil veces y los ha corrompido lentamente." },
      { id: "v06", title: "El Conocimiento como Poder Sagrado", body: "Saber es todo. Compartir información sin necesidad es un pecado. Proteger los secretos propios y robar los ajenos son actos igualmente sagrados." },
      { id: "v07", title: "La Equidad por Encima del Orden", body: "Las reglas existen para crear justicia, no al revés. Si una regla produce injusticia, se rompe. Eso los hace impredecibles, incómodos y frecuentemente correctos." },
    ]
  },
  metodos: {
    id: "metodos",
    label: "Métodos",
    color: "#b03a2e",
    accent: "#e8776d",
    symbol: "🗡",
    cards: [
      { id: "mt01", title: "La Infiltración Paciente", body: "No atacan sistemas — los habitan. Décadas, si hace falta. Cuando actúan, ya son el sistema. Nadie los expulsa porque nadie sabe dónde terminan ellos y empieza la institución." },
      { id: "mt02", title: "El Chantaje Elegante", body: "Coleccionan secretos con la misma dedicación que otros coleccionan obras de arte. Nunca los usan sin necesidad. Esa moderación es lo que los hace tan temibles." },
      { id: "mt03", title: "La Violencia Quirúrgica", body: "No hacen guerras — hacen intervenciones. Un mensaje aquí, una desaparición allá. La eficiencia es su firma. La escala reducida es su ventaja táctica y su límite estratégico." },
      { id: "mt04", title: "La Red de Favores", body: "Nunca piden dinero. Piden favores. Acumulan obligaciones como capital. Cuando cobran, lo que piden vale diez veces más que cualquier suma. Y siempre cobran." },
      { id: "mt05", title: "La Propaganda Lenta", body: "Trabajan con generaciones, no años. Cambian lo que la gente cree que es verdad antes de que nadie note que algo cambió. Para cuando actúan abiertamente, ya ganaron." },
      { id: "mt06", title: "El Caos Controlado", body: "Crean crisis que solo ellos pueden resolver. No siempre son los causantes directos — a veces basta con no intervenir cuando podrían. La ambigüedad es parte del diseño." },
      { id: "mt07", title: "La Economía Paralela", body: "Controlan flujos de recursos que el sistema oficial no ve. No para enriquecerse — para crear dependencia. Quien depende de ellos no puede denunciarlos." },
    ]
  },
  rivales: {
    id: "rivales",
    label: "Rivales y Fracturas",
    color: "#2d6a4f",
    accent: "#74c69d",
    symbol: "⚔",
    cards: [
      { id: "r01", title: "El Cisma Interno", body: "Hay una fractura ideológica que llevan años negando. Una facción quiere evolucionar; la otra, volver a los orígenes. Ambas tienen razón. Eso lo hace irresolvible." },
      { id: "r02", title: "El Espejo Enemigo", body: "Su mayor rival es una organización nacida de las mismas raíces, con los mismos métodos y objetivos opuestos. Se odian con la intimidad que solo da el conocerse demasiado bien." },
      { id: "r03", title: "El Traidor que Fundó Algo", body: "Alguien que los abandonó creó algo nuevo con lo que aprendió aquí. Ese algo compite directamente. El odio es personal, generacional y absolutamente racional." },
      { id: "r04", title: "La Institución que los Persigue", body: "Un poder legítimo — un estado, una iglesia, un tribunal — los considera su mayor amenaza. No sin razón. La persecución los fortalece internamente y los debilita externamente." },
      { id: "r05", title: "El Aliado que Cobra Demasiado", body: "Necesitan a alguien que los ayuda. Ese alguien conoce esa necesidad y la usa. La relación es parasitaria, irrescindible y mutuamente degradante." },
      { id: "r06", title: "La Generación que No Entiende", body: "Los miembros jóvenes cuestionan métodos, valores y fines. Los veteranos los ven como ingenuos. Los jóvenes ven a los veteranos como el problema. Ambos tienen razón parcial." },
      { id: "r07", title: "El Legado Envenenado", body: "Algo que hicieron en el pasado — necesario, quizás justificable — ahora los define ante el mundo de una forma que no pueden controlar. Negarlo es mentira. Aceptarlo es rendición." },
    ]
  },
};

// ─── UTILS ───────────────────────────────────────────────────────────────────

function randomCard(deckId) {
  const deck = DECKS[deckId];
  return deck.cards[Math.floor(Math.random() * deck.cards.length)];
}

function generateRoll(activeDeckIds) {
  return activeDeckIds.map(deckId => ({
    deckId,
    card: randomCard(deckId),
  }));
}

// ─── CARD COMPONENT ──────────────────────────────────────────────────────────

function CardComponent({ deckId, card, onSave, saved }) {
  const [flipped, setFlipped] = useState(false);
  const [sparkle, setSparkle] = useState(false);
  const deck = DECKS[deckId];

  const prevCard = useRef(card);
  if (prevCard.current.id !== card.id) {
    prevCard.current = card;
  }

  const handleSave = (e) => {
    e.stopPropagation();
    if (saved) return;
    setSparkle(true);
    setTimeout(() => setSparkle(false), 600);
    onSave({ deckId, card });
  };

  return (
    <div
      className={`card-wrapper ${flipped ? "flipped" : ""}`}
      onClick={() => !flipped && setFlipped(true)}
      style={{ "--deck-color": deck.color, "--deck-accent": deck.accent }}
      title={!flipped ? "Clic para revelar" : ""}
    >
      <div className="card-inner">
        <div className="card-face card-back">
          <div className="card-back-pattern" />
          <div className="card-back-symbol">{deck.symbol}</div>
          <div className="card-back-label">{deck.label}</div>
          <div className="card-back-border" />
          <div className="card-back-hint">toca para revelar</div>
        </div>
        <div className="card-face card-front">
          <div className="card-front-glow" />
          <div className="card-front-header">
            <span className="card-deck-label">{deck.symbol} {deck.label}</span>
          </div>
          <div className="card-divider" />
          <div className="card-title">{card.title}</div>
          <div className="card-body">{card.body}</div>
          <div className="card-divider" style={{ marginTop: "auto" }} />
          <button
            className={`card-save-btn ${saved ? "saved" : ""} ${sparkle ? "sparkle" : ""}`}
            onClick={handleSave}
          >
            {saved ? "✦ En la mesa" : "✦ Rescatar"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── SAVED CARD ───────────────────────────────────────────────────────────────

function SavedCard({ item, onRemove }) {
  const deck = DECKS[item.deckId];
  return (
    <div className="saved-card" style={{ "--deck-color": deck.color, "--deck-accent": deck.accent }}>
      <div className="saved-card-top">
        <span className="saved-deck-symbol">{deck.symbol}</span>
        <span className="saved-deck-label">{deck.label}</span>
        <button className="saved-remove" onClick={() => onRemove(item.card.id)} title="Quitar de la mesa">✕</button>
      </div>
      <div className="saved-card-title">{item.card.title}</div>
      <div className="saved-card-body">{item.card.body}</div>
    </div>
  );
}

// ─── DECK FILTER ─────────────────────────────────────────────────────────────

function DeckFilter({ activeDecks, onToggle }) {
  return (
    <div className="deck-filter">
      <div className="deck-filter-label">Barajas activas</div>
      <div className="deck-filter-pills">
        {Object.values(DECKS).map(deck => (
          <button
            key={deck.id}
            className={`deck-pill ${activeDecks.includes(deck.id) ? "active" : ""}`}
            style={{ "--deck-color": deck.color, "--deck-accent": deck.accent }}
            onClick={() => onToggle(deck.id)}
          >
            <span className="deck-pill-symbol">{deck.symbol}</span>
            <span className="deck-pill-label">{deck.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function ForjaFacciones() {
  const [rolls, setRolls] = useState([]);
  const [savedCards, setSavedCards] = useState([]);
  const [rolling, setRolling] = useState(false);
  const [activeTab, setActiveTab] = useState("tiradas");
  const [activeDecks, setActiveDecks] = useState(Object.keys(DECKS));
  const [showFilters, setShowFilters] = useState(false);
  const rollCount = useRef(0);

  const handleToggleDeck = useCallback((deckId) => {
    setActiveDecks(prev => {
      if (prev.includes(deckId)) {
        if (prev.length === 1) return prev;
        return prev.filter(d => d !== deckId);
      }
      return [...prev, deckId];
    });
  }, []);

  const handleRoll = useCallback(() => {
    if (rolling || activeDecks.length === 0) return;
    setRolling(true);
    setTimeout(() => {
      rollCount.current += 1;
      const newRoll = {
        id: rollCount.current,
        timestamp: new Date().toLocaleTimeString("es", { hour: "2-digit", minute: "2-digit" }),
        cards: generateRoll(activeDecks),
        isNew: true,
      };
      setRolls(prev => [newRoll, ...prev]);
      setRolling(false);
      setActiveTab("tiradas");
    }, 350);
  }, [rolling, activeDecks]);

  const handleSave = useCallback(({ deckId, card }) => {
    setSavedCards(prev => {
      if (prev.find(s => s.card.id === card.id)) return prev;
      return [...prev, { deckId, card }];
    });
  }, []);

  const handleRemoveSaved = useCallback((cardId) => {
    setSavedCards(prev => prev.filter(s => s.card.id !== cardId));
  }, []);

  const isSaved = useCallback((cardId) => savedCards.some(s => s.card.id === cardId), [savedCards]);

  return (
    <>
      <style>{`
        .fp-bg-texture {
          position: fixed; inset: 0; z-index: 0; pointer-events: none;
          background:
            radial-gradient(ellipse 70% 40% at 50% 0%, #1a0d00 0%, transparent 70%),
            radial-gradient(ellipse 50% 30% at 90% 100%, #0a0818 0%, transparent 60%),
            repeating-linear-gradient(0deg, transparent, transparent 80px, rgba(201,147,58,0.012) 80px, rgba(201,147,58,0.012) 81px),
            repeating-linear-gradient(90deg, transparent, transparent 80px, rgba(201,147,58,0.012) 80px, rgba(201,147,58,0.012) 81px);
        }
        .fp-header {
          position: relative; z-index: 10;
          padding: 2.5rem 2rem 1.8rem;
          text-align: center;
          border-bottom: 1px solid rgba(201,147,58,0.15);
        }
        .fp-eyebrow { font-family: 'Cinzel', serif; font-size: 0.6rem; letter-spacing: 0.5em; color: var(--gold-dim); text-transform: uppercase; margin-bottom: 0.6rem; }
        .fp-title { font-family: 'Cinzel Decorative', serif; font-size: clamp(1.5rem, 3.5vw, 2.6rem); font-weight: 700; color: var(--gold); text-shadow: 0 0 50px rgba(201,147,58,0.35), 0 2px 6px rgba(0,0,0,0.9); letter-spacing: 0.04em; line-height: 1.2; }
        .fp-sub { font-size: 1rem; color: var(--text-dim); font-style: italic; margin-top: 0.5rem; letter-spacing: 0.02em; }
        .fp-ornament { display: flex; align-items: center; justify-content: center; gap: 0.8rem; margin-top: 1.2rem; }
        .fp-orn-line { width: 60px; height: 1px; background: linear-gradient(90deg, transparent, var(--gold-dim)); }
        .fp-orn-line.r { background: linear-gradient(90deg, var(--gold-dim), transparent); }
        .fp-orn-diamond { color: var(--gold-dim); font-size: 0.5rem; }
        .controls { position: relative; z-index: 10; display: flex; flex-direction: column; align-items: center; padding: 1.8rem 1rem 1.2rem; gap: 1rem; }
        .roll-btn { position: relative; padding: 0.9rem 2.8rem; background: transparent; border: 1px solid var(--gold); color: var(--gold-light); font-family: 'Cinzel', serif; font-size: 0.95rem; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; cursor: pointer; transition: all 0.25s ease; overflow: hidden; }
        .roll-btn::before { content: ''; position: absolute; inset: 0; background: linear-gradient(135deg, rgba(201,147,58,0.12) 0%, transparent 60%); opacity: 0; transition: opacity 0.25s; }
        .roll-btn:hover::before { opacity: 1; }
        .roll-btn:hover { box-shadow: 0 0 28px rgba(201,147,58,0.25), inset 0 0 16px rgba(201,147,58,0.04); transform: translateY(-1px); }
        .roll-btn:active { transform: translateY(0); }
        .roll-btn:disabled { opacity: 0.4; cursor: not-allowed; transform: none; }
        .filter-toggle { background: transparent; border: 1px solid rgba(201,147,58,0.25); color: var(--text-dim); font-family: 'Cinzel', serif; font-size: 0.65rem; letter-spacing: 0.2em; text-transform: uppercase; padding: 0.4rem 1rem; cursor: pointer; transition: all 0.2s; border-radius: 2px; }
        .filter-toggle:hover { color: var(--text); border-color: rgba(201,147,58,0.5); }
        .filter-toggle.open { color: var(--gold); border-color: var(--gold-dim); }
        .roll-stats { font-size: 0.78rem; color: var(--text-dim); font-style: italic; }
        .deck-filter { position: relative; z-index: 10; max-width: 900px; margin: 0 auto; padding: 1rem 1.5rem 1.5rem; border-bottom: 1px solid rgba(201,147,58,0.1); animation: fadeSlideIn 0.25s ease forwards; }
        .deck-filter-label { font-family: 'Cinzel', serif; font-size: 0.6rem; letter-spacing: 0.3em; text-transform: uppercase; color: var(--text-dim); margin-bottom: 0.8rem; text-align: center; }
        .deck-filter-pills { display: flex; flex-wrap: wrap; gap: 0.5rem; justify-content: center; }
        .deck-pill { display: flex; align-items: center; gap: 0.35rem; padding: 0.35rem 0.8rem; background: transparent; border: 1px solid rgba(120,100,70,0.3); color: var(--text-dim); font-family: 'Cinzel', serif; font-size: 0.65rem; letter-spacing: 0.1em; cursor: pointer; transition: all 0.2s; border-radius: 2px; }
        .deck-pill:hover { border-color: var(--deck-color); color: var(--text); }
        .deck-pill.active { border-color: var(--deck-color); color: var(--deck-accent); background: rgba(0,0,0,0.3); box-shadow: 0 0 12px rgba(0,0,0,0.2); }
        .deck-pill-symbol { font-size: 0.9rem; }
        .tabs { position: relative; z-index: 10; display: flex; border-bottom: 1px solid rgba(201,147,58,0.12); padding: 0 2rem; max-width: 1400px; margin: 0 auto; }
        .tab-btn { padding: 0.7rem 1.4rem; background: transparent; border: none; border-bottom: 2px solid transparent; color: var(--text-dim); font-family: 'Cinzel', serif; font-size: 0.72rem; letter-spacing: 0.15em; text-transform: uppercase; cursor: pointer; transition: all 0.2s; }
        .tab-btn:hover { color: var(--text); }
        .tab-btn.active { color: var(--gold-light); border-bottom-color: var(--gold); }
        .tab-badge { display: inline-flex; align-items: center; justify-content: center; background: var(--gold); color: var(--ink); border-radius: 50%; width: 1.1rem; height: 1.1rem; font-size: 0.6rem; font-weight: 700; margin-left: 0.4rem; font-family: 'Cinzel', serif; }
        .main-content { position: relative; z-index: 10; max-width: 1400px; margin: 0 auto; padding: 2rem 1.5rem 5rem; }
        .empty-state { text-align: center; padding: 5rem 2rem; color: var(--text-dim); }
        .empty-state-symbol { font-size: 2.5rem; margin-bottom: 1rem; opacity: 0.35; }
        .empty-state-title { font-family: 'Cinzel', serif; font-size: 1rem; letter-spacing: 0.1em; margin-bottom: 0.5rem; color: var(--text-dim); }
        .empty-state-sub { font-style: italic; font-size: 0.9rem; opacity: 0.6; }
        .roll-block { margin-bottom: 2.5rem; animation: fadeSlideIn 0.45s ease forwards; }
        @keyframes fadeSlideIn { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
        .roll-block-header { display: flex; align-items: center; gap: 0.8rem; margin-bottom: 1.1rem; }
        .roll-number { font-family: 'Cinzel', serif; font-size: 0.65rem; letter-spacing: 0.25em; color: var(--gold-dim); text-transform: uppercase; white-space: nowrap; }
        .roll-time { font-size: 0.72rem; color: var(--text-dim); font-style: italic; }
        .roll-rule { flex: 1; height: 1px; background: linear-gradient(90deg, rgba(201,147,58,0.18), transparent); }
        .roll-cards-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(195px, 1fr)); gap: 1rem; }
        .card-wrapper { height: 310px; perspective: 1000px; cursor: pointer; transition: transform 0.2s; }
        .card-wrapper:hover:not(.flipped) { transform: translateY(-5px) scale(1.015); }
        .card-inner { position: relative; width: 100%; height: 100%; transform-style: preserve-3d; transition: transform 0.65s cubic-bezier(0.4, 0, 0.2, 1); }
        .card-wrapper.flipped .card-inner { transform: rotateY(180deg); }
        .card-face { position: absolute; inset: 0; backface-visibility: hidden; border-radius: 7px; overflow: hidden; }
        .card-back { background: #1a1510; border: 2px solid var(--deck-accent); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.6rem; box-shadow: 0 6px 24px rgba(0,0,0,0.7); }
        .card-back-pattern { position: absolute; inset: 0; background-image: repeating-linear-gradient(45deg, transparent, transparent 8px, rgba(255,255,255,0.007) 8px, rgba(255,255,255,0.007) 9px), repeating-linear-gradient(-45deg, transparent, transparent 8px, rgba(255,255,255,0.007) 8px, rgba(255,255,255,0.007) 9px); border-radius: 6px; }
        .card-back-symbol { font-size: 2.2rem; color: var(--deck-accent); filter: drop-shadow(0 0 14px var(--deck-color)); opacity: 1; position: relative; }
        .card-back-label { font-family: 'Cinzel', serif; font-size: 0.58rem; letter-spacing: 0.3em; text-transform: uppercase; color: var(--deck-accent); opacity: 0.85; position: relative; }
        .card-back-border { position: absolute; inset: 7px; border: 1px solid rgba(201,147,58,0.1); border-radius: 4px; pointer-events: none; }
        .card-back-hint { position: absolute; bottom: 10px; font-size: 0.80rem; font-style: italic; color: var(--deck-accent); opacity: 0.85; letter-spacing: 0.05em; }
        .card-front { transform: rotateY(180deg); background: linear-gradient(155deg, #1c1508 0%, #0e0b07 100%); border: 1px solid var(--deck-color); padding: 0.9rem 0.85rem 0.85rem; display: flex; flex-direction: column; gap: 0.45rem; box-shadow: 0 6px 28px rgba(0,0,0,0.75); }
        .card-front-glow { position: absolute; inset: 0; background: radial-gradient(ellipse 80% 40% at 50% 0%, rgba(201,147,58,0.07) 0%, transparent 70%); pointer-events: none; border-radius: 6px; }
        .card-front-header { display: flex; justify-content: space-between; align-items: center; }
        .card-deck-label { font-family: 'Cinzel', serif; font-size: 0.58rem; letter-spacing: 0.18em; text-transform: uppercase; color: var(--deck-accent); opacity: 0.65; }
        .card-title { font-family: 'Cinzel', serif; font-size: 0.88rem; font-weight: 600; color: var(--deck-accent); line-height: 1.3; text-shadow: 0 0 18px rgba(245,201,122,0.25); }
        .card-body { font-size: 0.79rem; line-height: 1.58; color: var(--parchment-dark); flex: 1; overflow: hidden; font-style: italic; }
        .card-save-btn { background: transparent; border: 1px solid var(--deck-color); color: var(--deck-accent); font-family: 'Cinzel', serif; font-size: 0.58rem; letter-spacing: 0.15em; text-transform: uppercase; padding: 0.38rem 0.7rem; cursor: pointer; transition: all 0.2s; border-radius: 2px; align-self: flex-end; margin-top: 2px; }
        .card-save-btn:hover { background: rgba(201,147,58,0.14); box-shadow: 0 0 10px rgba(201,147,58,0.18); }
        .card-save-btn.saved { border-color: var(--gold-dim); color: var(--gold-dim); opacity: 0.55; cursor: default; }
        .card-save-btn.sparkle { animation: sparkleAnim 0.5s ease; }
        @keyframes sparkleAnim { 0% { box-shadow: 0 0 0 rgba(245,201,122,0); } 50% { box-shadow: 0 0 18px rgba(245,201,122,0.55); background: rgba(201,147,58,0.28); } 100% { box-shadow: 0 0 0 rgba(245,201,122,0); } }
        .history-sep { display: flex; align-items: center; gap: 1rem; margin: 0.5rem 0 2rem; }
        .history-sep-rule { flex: 1; height: 1px; background: rgba(201,147,58,0.08); }
        .history-sep-label { font-size: 0.68rem; color: var(--text-dim); font-style: italic; }
        .mesa-header { margin-bottom: 1.8rem; }
        .mesa-title { font-family: 'Cinzel Decorative', serif; font-size: 1.15rem; color: var(--gold); margin-bottom: 0.3rem; }
        .mesa-sub { font-size: 0.88rem; color: var(--text-dim); font-style: italic; }
        .saved-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(245px, 1fr)); gap: 1.1rem; }
        .saved-card { background: linear-gradient(145deg, #1a1208, #100d08); border: 1px solid var(--deck-color); border-radius: 6px; padding: 1.1rem; display: flex; flex-direction: column; gap: 0.5rem; position: relative; animation: fadeSlideIn 0.35s ease forwards; box-shadow: 0 4px 18px rgba(0,0,0,0.5); }
        .saved-card::before { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse 80% 40% at 50% 0%, rgba(201,147,58,0.06) 0%, transparent 70%); pointer-events: none; border-radius: 5px; }
        .saved-card-top { display: flex; align-items: center; gap: 0.5rem; }
        .saved-deck-symbol { font-size: 0.95rem; color: var(--deck-color); }
        .saved-deck-label { font-family: 'Cinzel', serif; font-size: 0.58rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--deck-accent); opacity: 0.65; flex: 1; }
        .saved-remove { background: none; border: none; color: var(--text-dim); cursor: pointer; font-size: 0.78rem; padding: 0.1rem 0.3rem; transition: color 0.2s; }
        .saved-remove:hover { color: #c04040; }
        .saved-card-title { font-family: 'Cinzel', serif; font-size: 0.88rem; font-weight: 600; color: var(--deck-accent); line-height: 1.3; }
        .saved-card-body { font-size: 0.82rem; line-height: 1.56; color: var(--parchment-dark); font-style: italic; }
        .rolling-dots { display: flex; gap: 0.35rem; justify-content: center; }
        .rolling-dot { width: 5px; height: 5px; background: var(--gold); border-radius: 50%; animation: blink 1s infinite; }
        .rolling-dot:nth-child(2) { animation-delay: 0.2s; }
        .rolling-dot:nth-child(3) { animation-delay: 0.4s; }
        @keyframes blink { 0%,100% { opacity: 0.2; } 50% { opacity: 1; } }
      `}</style>

      <div className="fp-bg-texture" />

      <header className="fp-header">
        <div className="fp-eyebrow">✦ El Oráculo ✦</div>
        <h1 className="fp-title">La Forja de Facciones</h1>
        <p className="fp-sub">Identidad, estructura y sombras que mueven el mundo</p>
        <div className="fp-ornament">
          <div className="fp-orn-line" />
          <span className="fp-orn-diamond">◆</span>
          <div className="fp-orn-line r" />
        </div>
      </header>

      <div className="controls">
        <button className="roll-btn" onClick={handleRoll} disabled={rolling}>
          {rolling
            ? <div className="rolling-dots"><div className="rolling-dot"/><div className="rolling-dot"/><div className="rolling-dot"/></div>
            : <span>✦ &nbsp;Forjar Facción</span>
          }
        </button>
        <button
          className={`filter-toggle ${showFilters ? "open" : ""}`}
          onClick={() => setShowFilters(v => !v)}
        >
          {showFilters ? "▲ Ocultar barajas" : "▼ Seleccionar barajas"} ({activeDecks.length}/{Object.keys(DECKS).length})
        </button>
        {rolls.length > 0 && (
          <p className="roll-stats">
            {rolls.length} {rolls.length === 1 ? "tirada" : "tiradas"} · {savedCards.length} {savedCards.length === 1 ? "carta rescatada" : "cartas rescatadas"}
          </p>
        )}
      </div>

      {showFilters && <DeckFilter activeDecks={activeDecks} onToggle={handleToggleDeck} />}

      <div className="tabs">
        <button className={`tab-btn ${activeTab === "tiradas" ? "active" : ""}`} onClick={() => setActiveTab("tiradas")}>
          Tiradas {rolls.length > 0 && <span className="tab-badge">{rolls.length}</span>}
        </button>
        <button className={`tab-btn ${activeTab === "mesa" ? "active" : ""}`} onClick={() => setActiveTab("mesa")}>
          Mi Facción {savedCards.length > 0 && <span className="tab-badge">{savedCards.length}</span>}
        </button>
      </div>

      <main className="main-content">
        {activeTab === "tiradas" && (
          <>
            {rolls.length === 0 ? (
              <div className="empty-state">
                <div className="empty-state-symbol">⚜</div>
                <div className="empty-state-title">Las sombras esperan</div>
                <p className="empty-state-sub">Pulsa "Forjar Facción" para revelar tu primera combinación</p>
              </div>
            ) : (
              rolls.map((roll, rollIdx) => (
                <div key={roll.id} className="roll-block">
                  <div className="roll-block-header">
                    <span className="roll-number">Tirada {rolls.length - rollIdx}</span>
                    <span className="roll-time">{roll.timestamp}</span>
                    <div className="roll-rule" />
                  </div>
                  <div className="roll-cards-grid">
                    {roll.cards.map((item, cardIdx) => (
                      <CardComponent
                        key={`${roll.id}-${item.deckId}`}
                        deckId={item.deckId}
                        card={item.card}
                        onSave={handleSave}
                        saved={isSaved(item.card.id)}
                      />
                    ))}
                  </div>
                  {rollIdx < rolls.length - 1 && (
                    <div className="history-sep">
                      <div className="history-sep-rule" />
                      <span className="history-sep-label">tirada anterior</span>
                      <div className="history-sep-rule" />
                    </div>
                  )}
                </div>
              ))
            )}
          </>
        )}
        {activeTab === "mesa" && (
          <>
            {savedCards.length === 0 ? (
              <div className="empty-state">
                <div className="empty-state-symbol">⚔</div>
                <div className="empty-state-title">La facción no tiene nombre aún</div>
                <p className="empty-state-sub">Rescata cartas de tus tiradas para definir tu organización</p>
              </div>
            ) : (
              <>
                <div className="mesa-header">
                  <div className="mesa-title">Tu Facción</div>
                  <p className="mesa-sub">Los elementos que definen su identidad, poder y fracturas</p>
                </div>
                <div className="saved-grid">
                  {savedCards.map(item => (
                    <SavedCard key={item.card.id} item={item} onRemove={handleRemoveSaved} />
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </main>
    </>
  );
}