import { useState } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const SISTEMAS = {
  elemental:        { id: "elemental",        label: "Magia Elemental",   symbol: "◈", color: "#c9933a", accent: "#f5c97a", desc: "Dominio sobre las fuerzas naturales: fuego, agua, tierra y aire.",                 coste: "El coste es físico: cada manifestación agota el cuerpo del practicante en proporción directa al elemento invocado.",          rasgo: "Sus practicantes desarrollan marcas en la piel — patrones que recuerdan a venas de río o grietas de tierra seca.",          desc_primario: ["Su fundamento es el pacto con las fuerzas que preceden al lenguaje: el fuego que devora, el agua que recuerda, la tierra que guarda y el aire que lleva. Quien la domina no ordena — negocia."],             desc_secundario: ["Un sustrato elemental recorre el sistema como venas bajo la piel: toda manifestación tiene un sabor de tierra, fuego o tormenta."] },
  negra:            { id: "negra",            label: "Magia Negra",       symbol: "☽", color: "#6b2fa0", accent: "#c084fc", desc: "Arte prohibido que canaliza energías oscuras y corruptas.",                         coste: "El coste es moral y acumulativo: cada uso deja una marca que no desaparece, que cambia cómo el mundo responde al practicante.",rasgo: "Los ojos de los practicantes avanzados reflejan luz donde no debería haberla.",                                                desc_primario: ["Hay un precio que ningún grimorio escribe porque nadie que lo pagó regresó para contarlo. Este sistema opera desde ese umbral: toma lo que no le pertenece y lo transforma en poder que tampoco pertenece al que lo usa."], desc_secundario: ["Una veta oscura atraviesa el sistema como una grieta en el mármol: no domina, pero todo lo que toca lleva su marca."] },
  arcana:           { id: "arcana",           label: "Arcana",            symbol: "✶", color: "#b5860d", accent: "#fde68a", desc: "Tradición de intermediación con espíritus y deidades a través del ritual.",         coste: "El coste es de devoción: tiempo, ofrendas y observancia de tabúes. Incumplir los acuerdos tiene consecuencias proporcionales.",rasgo: "Sus practicantes hablan en voz baja incluso cuando están solos. Han aprendido que siempre hay alguien escuchando.",            desc_primario: ["El poder no reside en el practicante — reside en la relación. Años de ofrendas, promesas cumplidas y conversaciones con lo invisible construyen una deuda que, llegado el momento, puede cobrarse."],             desc_secundario: ["Un orisha secundario presta su influencia al sistema — una presencia benévola pero con sus propias condiciones."] },
  vudu:             { id: "vudu",             label: "Vudú",              symbol: "⬡", color: "#7c3f1e", accent: "#d4956a", desc: "Magia de vínculos entre vivos y muertos, cuerpo y espíritu.",                       coste: "El coste es de proximidad: los vínculos que el practicante crea también lo atan a él. Nada se hace sin consecuencias recíprocas.",rasgo: "Los practicantes avanzados sienten el dolor ajeno antes de que ocurra. No siempre a tiempo de evitarlo.",                     desc_primario: ["Todo está conectado con todo a través de hilos que la mayoría no puede ver pero que el practicante aprende a tensar, soltar y anudar. La distancia no existe para este sistema. Solo existen los vínculos."],     desc_secundario: ["Los vínculos del vudú refuerzan el sistema: lo que afecta a uno afecta a lo conectado, amplificando el alcance de cada acción."] },
  nigromancia:      { id: "nigromancia",      label: "Nigromancia",       symbol: "☠", color: "#2a5a3a", accent: "#6ee7a0", desc: "Dominio sobre la muerte: invocar, ligar y controlar lo que ya no vive.",            coste: "El coste es de vitalidad: cada contacto con la muerte roba algo de la vida del practicante. La vejez llega antes de tiempo.", rasgo: "Sus practicantes tienen siempre las manos frías. Las plantas se marchitan en su presencia prolongada.",                       desc_primario: ["La muerte no es un final — es un estado. Y los estados pueden ser habitados, negociados, incluso revertidos si el practicante tiene suficiente voluntad y suficiente descaro para mirar a lo que yace al otro lado."], desc_secundario: ["La influencia de la muerte recorre el sistema como frío en los huesos: todo lo que produce lleva un eco del más allá."] },
  sangre:           { id: "sangre",           label: "Magia de Sangre",   symbol: "⬧", color: "#8b1a1a", accent: "#f87171", desc: "El poder nace del sacrificio genuino. El precio es siempre carne y vida.",           coste: "El coste es literal e inmediato: sangre, siempre. La cantidad varía. La exigencia nunca.",                                    rasgo: "Las heridas de sus practicantes cicatrizan en patrones demasiado geométricos para ser accidentales.",                         desc_primario: ["No hay simulacro aquí. El sistema exige lo real: sangre real, dolor real, pérdida real. La proporción es exacta — el universo no acepta atajos ni sustitutos. Quien quiere más da más."],                        desc_secundario: ["El componente sanguíneo añade una autenticidad brutal al sistema: los resultados son exactamente lo que se pidió porque el precio fue exactamente lo que se pagó."] },
  blanca:           { id: "blanca",           label: "Magia Blanca",      symbol: "✦", color: "#a0845c", accent: "#fef9ee", desc: "Magia de sanación, protección y luz. El poder de preservar y restaurar.",            coste: "El coste es de empatía: sanar requiere comprender el sufrimiento ajeno desde adentro. Esa comprensión se acumula.",           rasgo: "Sus practicantes avanzados tienen una serenidad que resulta inquietante en situaciones de crisis. Han visto demasiado para alterarse.", desc_primario: ["La intención lo es todo. Este sistema no puede usarse para destruir sin destruirse a sí mismo en el proceso — es su limitación y su fortaleza. Un arma que solo funciona cuando no quieres hacer daño."],        desc_secundario: ["Una capa protectora subyace al sistema: tiende a preservar lo que existe, a reparar el daño colateral, a dejar las cosas mejor de como las encontró."] },
  prestidigitacion: { id: "prestidigitacion", label: "Prestidigitación",  symbol: "◎", color: "#1a6b8a", accent: "#67e8f9", desc: "Manipulación de percepción, memoria y realidad aparente.",                          coste: "El coste es de identidad: cuanto más manipula la percepción ajena, más pierde el practicante la certeza de su propia.",        rasgo: "Sus practicantes avanzados tienen dificultad para recordar exactamente qué versiones de los hechos son reales.",              desc_primario: ["La realidad es lo que se percibe. Y la percepción puede ser editada, reescrita, reemplazada por completo si el practicante tiene la habilidad suficiente."],                                                      desc_secundario: ["Una capa de ilusión recorre el sistema: los efectos reales están siempre envueltos en algo que parece diferente a lo que es."] },
  tecnomancia:      { id: "tecnomancia",      label: "Tecnomancia",       symbol: "⟁", color: "#3d6b47", accent: "#86efac", desc: "Fusión de arcano y mecánico: magia que fluye a través del metal y el engranaje.",    coste: "El coste es de tiempo y materiales: construir un artefacto funcional requiere recursos, precisión y fracasos previos.",        rasgo: "Sus practicantes hablan de sus artefactos como si fueran personas. Usualmente tienen razón en hacerlo.",                      desc_primario: ["La magia tiene una lógica. La tecnología también. El tecnomante descubrió que esas lógicas son el mismo idioma escrito en alfabetos distintos. Una vez que lo entiendes, puedes traducir."],                      desc_secundario: ["Los componentes mecánicos del sistema operan con precisión que los métodos puramente arcanos rara vez alcanzan: repetible, documentable, mejorable."] },
};

const SISTEMAS_LIST = Object.values(SISTEMAS);

// ─── LOOKUP ──────────────────────────────────────────────────────────────────

const LOOKUP_PGS = {
  "elemental|negra":              "Núcleo del Vacío",
  "elemental|arcana":             "Flujo de la Tempestad",
  "elemental|vudu":               "Llamada de los Ancestros",
  "elemental|nigromancia":        "Conservador de la Tierra",
  "elemental|sangre":             "Pulso Terrenal",
  "elemental|blanca":             "Fuerza Totémica",
  "elemental|prestidigitacion":   "Chamán Espectral",
  "elemental|tecnomancia":        "Energía de Titanes",
  "arcana|elemental":             "Patrón de Energía Primordial",
  "arcana|negra":                 "Hablante de Lenguas Muertas",
  "arcana|vudu":                  "Primer Antepasado",
  "arcana|nigromancia":           "Portal del Camposanto",
  "arcana|sangre":                "Desollar la Realidad",
  "arcana|blanca":                "Luz de la Verdad",
  "arcana|prestidigitacion":      "Maestro de las Máscaras",
  "arcana|tecnomancia":           "Engranaje Arcano",
  "negra|elemental":              "Siembra de Corrupción",
  "negra|arcana":                 "Sello de Horror Cósmico",
  "negra|vudu":                   "Mediador de Penitencias",
  "negra|nigromancia":            "Atormentador del Olvido",
  "negra|sangre":                 "Marca de la Carne",
  "negra|blanca":                 "Juez de los Necesitados",
  "negra|prestidigitacion":       "Conjuro Enloquecedor",
  "negra|tecnomancia":            "Pulso Vil",
  "vudu|elemental":               "Señor de los Espíritus",
  "vudu|arcana":                  "Someter Energías",
  "vudu|negra":                   "Mensajero Corrompido",
  "vudu|nigromancia":             "Legión Perpetua",
  "vudu|sangre":                  "Titiritero Sádico",
  "vudu|blanca":                  "Toque de Luz",
  "vudu|prestidigitacion":        "Ceremonia de Crueldad",
  "vudu|tecnomancia":             "Intercambio Material",
  "nigromancia|elemental":        "Tormenta del Inframundo",
  "nigromancia|arcana":           "Lienzo Espectral",
  "nigromancia|negra":            "Tiranía Imperecedera",
  "nigromancia|vudu":             "Invocar a los Condenados",
  "nigromancia|sangre":           "Exanguinador",
  "nigromancia|blanca":           "Celador del Desagravio",
  "nigromancia|prestidigitacion": "Manipulación de Letanías",
  "nigromancia|tecnomancia":      "Rompealmas",
  "sangre|elemental":             "Sexto Elemento",
  "sangre|arcana":                "Pulso Existencial",
  "sangre|negra":                 "El Último Sello",
  "sangre|vudu":                  "Pacto Indisoluble",
  "sangre|nigromancia":           "Corruptor del Último Aliento",
  "sangre|blanca":                "Influjo Vital",
  "sangre|prestidigitacion":      "Infestación",
  "sangre|tecnomancia":           "Sacrificio Abominable",
  "blanca|elemental":             "Baluarte de la Tempestad",
  "blanca|arcana":                "Canalizador de Protección",
  "blanca|negra":                 "Bien Superior",
  "blanca|vudu":                  "Sanación en Cadena",
  "blanca|nigromancia":           "Don de Salvación",
  "blanca|sangre":                "Hechicero Médico",
  "blanca|prestidigitacion":      "Escudo Invisible",
  "blanca|tecnomancia":           "Pionero Defensivo",
  "prestidigitacion|elemental":   "Terraformador",
  "prestidigitacion|arcana":      "Arquitecto de Espejismos",
  "prestidigitacion|negra":       "Tormento Mental",
  "prestidigitacion|vudu":        "Castigo Telekinético",
  "prestidigitacion|nigromancia": "Guía del Sepulcro",
  "prestidigitacion|sangre":      "Ilusión de Dolor",
  "prestidigitacion|blanca":      "Danza Lumínica",
  "prestidigitacion|tecnomancia": "Control Futuro",
  "tecnomancia|elemental":        "Supervisor Terrestre",
  "tecnomancia|arcana":           "Extractor de Energía Arcana",
  "tecnomancia|negra":            "Instrumento de Corrupción",
  "tecnomancia|vudu":             "Intérprete de Voluntades",
  "tecnomancia|nigromancia":      "Generador de Almas",
  "tecnomancia|sangre":           "Bomba Corpórea",
  "tecnomancia|blanca":           "Baluarte Sintético",
  "tecnomancia|prestidigitacion": "Maestro Artificiero",
};

const LOOKUP_CONV = {
  // Claves siempre ordenadas alfabéticamente
  "arcana|elemental":             "Primarca de los Arcanos",
  "arcana|negra":                 "Sello de Energía Caótica",
  "arcana|nigromancia":           "Cosecha Interminable",
  "arcana|prestidigitacion":      "Arquitecto de la Realidad",
  "arcana|sangre":                "Laceración Existencial",
  "arcana|blanca":                "Poder Invulnerable",
  "arcana|tecnomancia":           "Mecanismo Primigéneo",
  "arcana|vudu":                  "Encadenamiento Primordial",
  "elemental|negra":              "Avatar de la Semilla Corrupta",
  "elemental|nigromancia":        "Preservador de la Putrefacción",
  "elemental|prestidigitacion":   "Transmutador de Realidades",
  "elemental|sangre":             "Monolito del Sacrificio",
  "elemental|blanca":             "Tempestad Divina",
  "elemental|tecnomancia":        "Coloso Elemental",
  "elemental|vudu":               "Arquitecto de los Designios",
  "negra|nigromancia":            "Liche Ancestral",
  "negra|prestidigitacion":       "Manipulación de las Tinieblas",
  "negra|sangre":                 "Profanador de Vida",
  "negra|blanca":                 "Equilibrio Supremo",
  "negra|tecnomancia":            "Forja de Corrupción",
  "negra|vudu":                   "Grimorio del Torturador",
  "nigromancia|prestidigitacion": "Baraja de los Muertos",
  "nigromancia|sangre":           "Campeón Necrófago",
  "nigromancia|blanca":           "Resurrección Verdadera",
  "nigromancia|tecnomancia":      "Engranaje de la Perdición",
  "nigromancia|vudu":             "Maestro de los Inmortales",
  "prestidigitacion|sangre":      "Hemocontrol",
  "prestidigitacion|blanca":      "Luz Radiante",
  "prestidigitacion|tecnomancia": "Ilusión Mecánica",
  "prestidigitacion|vudu":        "Mano de la Locura",
  "sangre|blanca":                "Aura Regenerativa",
  "sangre|tecnomancia":           "Influjo de Potencia",
  "sangre|vudu":                  "Germen de Tormento",
  "blanca|tecnomancia":           "Servidor de la Protección",
  "blanca|vudu":                  "Voluntad del Protector",
  "tecnomancia|vudu":             "Agente de la Crueldad",
};

// ─── DESCRIPCIONES DE CONVERGENCIA ───────────────────────────────────────────
// Clave: ids ordenados alfabéticamente (igual que LOOKUP_CONV).
// Si no existe, se usa el ensamblado automático como fallback.
// Formato: "id1|id2": { desc: "...", coste: "..." /* opcional */ }

const CONV_EXTRA = {
  // "elemental|negra": {
  //   desc: "Descripción narrativa...",
  //   coste: "El coste es...",
  // },
};

// ─── MOTOR ────────────────────────────────────────────────────────────────────

function generarResultado(primordialId, canalizadorId, pPts, cPts) {
  const esConvergencia = pPts === cPts;
  let nombre, tipo;

  if (esConvergencia) {
    tipo = "convergencia";
    const key = [primordialId, canalizadorId].sort().join("|");
    nombre = LOOKUP_CONV[key] || `Convergencia de ${SISTEMAS[primordialId].label} y ${SISTEMAS[canalizadorId].label}`;
  } else {
    tipo = "dominante";
    nombre = LOOKUP_PGS[`${primordialId}|${canalizadorId}`]
          || `${SISTEMAS[primordialId].label} del ${SISTEMAS[canalizadorId].label}`;
  }

  const sp = SISTEMAS[primordialId];
  const sc = SISTEMAS[canalizadorId];
  let descripcion;

  if (esConvergencia) {
    const convData = CONV_EXTRA[[primordialId, canalizadorId].sort().join("|")];
    if (convData) {
      descripcion = convData.desc + (convData.coste ? " " + convData.coste : "");
    } else {
      descripcion = `${sp.desc_primario[0]} ${sc.desc_primario[0]} En su convergencia, ambas fuerzas se potencian mutuamente — el poder resultante excede la suma de sus partes, pero el coste es igualmente doble: ${sp.coste.replace("El coste es", "por un lado,")} Por otro, ${sc.coste.replace("El coste es", "")}`;
    }
  } else {
    descripcion = `${sp.desc_primario[0]} ${sc.desc_secundario[0]} ${sp.coste} ${sp.rasgo}`;
  }

  return { nombre, descripcion, tipo, primordialId, canalizadorId, pPts, cPts };
}

// ─── RUNE SLIDER ─────────────────────────────────────────────────────────────

const RUNAS = ["᛫", "ᚱ", "ᚷ"];

function RunaSlider({ value, onChange, color, accent, label, symbol, role }) {
  const positions = [1, 5, 9];
  const posIndex = positions.indexOf(value);
  const pct = posIndex === 0 ? 0 : posIndex === 1 ? 50 : 100;

  const handleSliderChange = (e) => {
    const raw = parseInt(e.target.value);
    const nearest = positions.reduce((a, b) => Math.abs(b - raw) < Math.abs(a - raw) ? b : a);
    onChange(nearest);
  };

  const roleLabel = role === "convergencia" ? "⟷ Convergente"
                  : role === "primordial"   ? "Primordial"
                  : role === "canalizador"  ? "Canalizador"
                  : null;

  return (
    <div className="runa-slider-wrap" style={{ "--s-color": color, "--s-accent": accent }}>
      <div className="runa-slider-label">
        <span className="runa-symbol-big">{symbol}</span>
        <span className="runa-label-text">{label}</span>
      </div>
      <div className="runa-track-container">
        <div className="runa-track-bg">
          <div className="runa-track-fill" style={{ width: `${pct}%` }} />
          <div className="runa-thumb" style={{ left: `calc(${pct}% - 10px)` }}>
            <div className="runa-thumb-inner" />
          </div>
        </div>
        <input type="range" min={1} max={9} step={1} value={value}
          onChange={handleSliderChange} className="runa-range-input" />
      </div>
      <div className="runa-markers">
        {positions.map((pos, i) => (
          <div key={pos} className={`runa-marker ${value >= pos ? "on" : "off"}`}
               onClick={() => onChange(pos)}>
            <div className="runa-glyph">{RUNAS[i]}</div>
            <div className="runa-num">{pos}</div>
          </div>
        ))}
      </div>
      {roleLabel && (
        <div className={`runa-role-badge ${role}`}>{roleLabel}</div>
      )}
    </div>
  );
}

// ─── MANA BAR ────────────────────────────────────────────────────────────────

function ManaBar({ aId, bId, aPts, bPts }) {
  const total = (aId ? aPts : 0) + (bId ? bPts : 0);
  const pct   = (total / 10) * 100;
  const llena = pct === 100;
  const esConv = llena && aId && bId && aPts === bPts;
  const sa = aId ? SISTEMAS[aId] : null;
  const sb = bId ? SISTEMAS[bId] : null;

  return (
    <div className="mana-bar-wrap">
      <div className="mana-bar-label">
        <span className="mana-label-text">Energía Rúnica</span>
        <span className={`mana-pct ${llena ? "full" : ""}`}>{pct}%</span>
      </div>
      <div className={`mana-bar-track ${llena ? "full" : ""} ${esConv ? "conv" : ""}`}>
        <div className="mana-bar-fill" style={{
          width: `${pct}%`,
          "--mana-color-p": sa?.color || "#c9933a",
          "--mana-color-s": sb?.color || "#6b2fa0",
        }} />
        <div className="mana-bubbles">
          {llena && Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="mana-bubble" style={{ "--bi": i }} />
          ))}
        </div>
      </div>
      {esConv && (
        <div className="mana-conv-notice">⟁ Convergencia detectada — poder amplificado, coste doble</div>
      )}
    </div>
  );
}

// ─── RESULT CARD ─────────────────────────────────────────────────────────────

function ResultCard({ result, onReset, onSave, isSaved }) {
  const sp = SISTEMAS[result.primordialId];
  const sc = SISTEMAS[result.canalizadorId];
  const esConv = result.tipo === "convergencia";

  return (
    <div className={`result-card ${esConv ? "conv" : ""}`}
         style={{ "--p-color": sp.color, "--p-accent": sp.accent, "--c-color": sc.color }}>
      <div className="result-eyebrow">{esConv ? "✦ Convergencia Forjada ✦" : "✦ Sistema Forjado ✦"}</div>
      <h2 className="result-nombre">{result.nombre}</h2>
      <div className="result-divider" />
      <div className="result-sistemas">
        <div className="result-sistema-tag" style={{ "--t-color": sp.color }}>
          <span>{sp.symbol}</span><span>{sp.label}</span>
          <span className="rst-role">{esConv ? "Convergente" : "Primordial"}</span>
          <span className="rst-pts">{result.pPts}</span>
        </div>
        <span className="result-conv-op">{esConv ? "⟷" : "→"}</span>
        <div className="result-sistema-tag" style={{ "--t-color": sc.color }}>
          <span>{sc.symbol}</span><span>{sc.label}</span>
          <span className="rst-role">{esConv ? "Convergente" : "Canalizador"}</span>
          <span className="rst-pts">{result.cPts}</span>
        </div>
      </div>
      <p className="result-desc">{result.descripcion}</p>
      <div className="result-actions">
        <button className={`result-save-btn ${isSaved ? "saved" : ""}`} onClick={onSave} disabled={isSaved}>
          {isSaved ? "✦ En la Mesa" : "✦ Guardar en Mesa"}
        </button>
        <button className="result-reset" onClick={onReset}>Forjar otro</button>
      </div>
    </div>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────

export default function ForjaMagia() {
  // Dos slots de selección: a = izquierda (primer click), b = derecha (segundo click)
  const [aId, setAId] = useState(null);
  const [bId, setBId] = useState(null);
  // pts por sistema: se resetea al deseleccionar
  const [ptsMap, setPtsMap] = useState({});
  const [result, setResult]     = useState(null);
  const [activeTab, setActiveTab] = useState("forja");
  const [savedSystems, setSavedSystems] = useState([]);

  // Helpers de pts
  const getPts = (id) => id ? (ptsMap[id] ?? 1) : 0;
  const setPts = (id, v) => {
    setPtsMap(prev => {
      const next = { ...prev, [id]: v };
      // Si sube a 9, el otro baja a 1
      if (v === 9) {
        const otherId = id === aId ? bId : aId;
        if (otherId) next[otherId] = 1;
      }
      return next;
    });
  };

  const aPts = getPts(aId);
  const bPts = getPts(bId);

  // Roles según puntos (no según orden de selección)
  const rolA = !aId || !bId ? null
    : aPts === bPts ? "convergencia"
    : aPts > bPts   ? "primordial" : "canalizador";
  const rolB = !aId || !bId ? null
    : bPts === aPts ? "convergencia"
    : bPts > aPts   ? "primordial" : "canalizador";

  // Para forjar: el primordial es el de más pts
  const primordialId  = !aId || !bId ? null : aPts >= bPts ? aId : bId;
  const canalizadorId = !aId || !bId ? null : aPts >= bPts ? bId : aId;
  const primPts = primordialId ? getPts(primordialId) : 0;
  const canPts  = canalizadorId ? getPts(canalizadorId) : 0;

  const listo = aId && bId && aId !== bId && (aPts + bPts === 10);

  const resultKey = result
    ? `${result.primordialId}|${result.canalizadorId}|${result.pPts}|${result.cPts}`
    : null;
  const isSaved = savedSystems.some(s => s.id === resultKey);

  // Toggle selección
  const handleToggle = (id) => {
    if (aId === id) {
      setAId(bId);
      setBId(null);
      setPtsMap(prev => { const n = { ...prev }; delete n[id]; return n; });
      return;
    }
    if (bId === id) {
      setBId(null);
      setPtsMap(prev => { const n = { ...prev }; delete n[id]; return n; });
      return;
    }
    if (!aId) { setAId(id); return; }
    if (!bId) { setBId(id); return; }
    // Ambos ocupados: reemplaza el slot A y libera su pts
    setPtsMap(prev => { const n = { ...prev }; delete n[aId]; return n; });
    setAId(id);
  };

  const handleForjar = () => {
    if (!listo) return;
    setResult(generarResultado(primordialId, canalizadorId, primPts, canPts));
  };
  const handleSave = () => {
    if (!result || isSaved) return;
    setSavedSystems(prev => [...prev, {
      id: resultKey, result,
      timestamp: new Date().toLocaleTimeString("es", { hour: "2-digit", minute: "2-digit" }),
    }]);
  };
  const handleReset  = () => setResult(null);
  const handleRemove = (id) => setSavedSystems(prev => prev.filter(s => s.id !== id));

  let hintMsg = "";
  if (!aId)                    hintMsg = "Elige el primer sistema";
  else if (!bId)               hintMsg = "Elige el segundo sistema";
  else if (aPts + bPts !== 10) hintMsg = `Energía: ${aPts + bPts}/10 — ajusta los sliders para completar 10`;

  return (
    <>
      <style>{`
        .fm-bg { position:fixed; inset:0; z-index:0; pointer-events:none;
          background: radial-gradient(ellipse 80% 60% at 50% -10%, rgba(201,147,58,.08) 0%, transparent 70%),
                      radial-gradient(ellipse 50% 40% at 80% 80%, rgba(107,47,160,.06) 0%, transparent 60%),
                      #0d0a07; }
        .fm-wrap { position:relative; z-index:1; min-height:100vh;
          font-family:'EB Garamond',serif; color:#e8d9b5;
          max-width:720px; margin:0 auto; padding:1.5rem 1.25rem 4rem; }

        /* ── TABS ── */
        .fm-tabs { display:flex; gap:.5rem; margin-bottom:1.75rem;
          border-bottom:1px solid rgba(201,147,58,.15); padding-bottom:.75rem; }
        .fm-tab { background:none; border:none; font-family:'Cinzel',serif; font-size:.7rem;
          letter-spacing:.15em; text-transform:uppercase; color:#6a5020; cursor:pointer;
          padding:.4rem .9rem; border-radius:2px; transition:color .2s,background .2s; }
        .fm-tab.active { color:#f5c97a; background:rgba(201,147,58,.1); }
        .fm-tab-badge { font-size:.6rem; background:rgba(201,147,58,.2); color:#c9933a;
          border-radius:999px; padding:.1rem .35rem; margin-left:.35rem; }

        /* ── TITLE ── */
        .fm-title { font-family:'Cinzel Decorative',serif; font-size:1.35rem; color:#f5c97a;
          text-align:center; letter-spacing:.06em; margin-bottom:.25rem; }
        .fm-subtitle { font-size:.82rem; color:#6a5020; text-align:center; margin-bottom:1.75rem; }

        /* ── SISTEMA GRID ── */
        .sistema-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:.5rem; margin-bottom:1.5rem; }
        .sg-btn { background:rgba(13,10,7,.7); border:1px solid rgba(106,80,32,.3);
          border-radius:4px; padding:.55rem .3rem; cursor:pointer; transition:all .2s;
          display:flex; flex-direction:column; align-items:center; gap:.25rem; }
        .sg-btn:hover { border-color:rgba(201,147,58,.5); background:rgba(201,147,58,.06); }
        .sg-btn.selected { border-color:var(--s-color);
          box-shadow:0 0 12px color-mix(in srgb, var(--s-color) 30%, transparent); }
        .sg-sym { font-size:1.25rem; color:var(--s-color);
          filter:drop-shadow(0 0 5px var(--s-color)); transition:filter .2s, transform .2s; }
        .sg-btn:hover .sg-sym { filter:drop-shadow(0 0 9px var(--s-color)); transform:scale(1.1); }
        .sg-btn.selected .sg-sym { filter:drop-shadow(0 0 11px var(--s-accent)); }
        .sg-label { font-family:'Cinzel',serif; font-size:.65rem; letter-spacing:.05em;
          text-transform:uppercase; color:#7a6845; text-align:center; line-height:1.2; }
        .sg-btn.selected .sg-label { color:#c9933a; }
        .sg-desc { font-size:.78rem; color:#c0a878; text-align:center; line-height:1.35;
          max-height:0; overflow:hidden; opacity:0;
          transition:max-height .3s ease, opacity .3s ease;
          font-family:'EB Garamond',serif; font-style:bold; padding:0 .2rem; }
        .sg-btn:hover .sg-desc { max-height:4rem; opacity:1; }
        .sg-btn.selected .sg-desc { max-height:4rem; opacity:.7; color:#c0a878; }
        .sg-role-activo { font-size:.48rem; letter-spacing:.08em; text-transform:uppercase;
          padding:.1rem .3rem; border-radius:2px;
          background:rgba(201,147,58,.15); color:#c9933a; }

        /* ── MANA BAR ── */
        .mana-bar-wrap { margin-bottom:1.5rem; }
        .mana-bar-label { display:flex; justify-content:space-between; align-items:center;
          margin-bottom:.4rem; }
        .mana-label-text { font-family:'Cinzel',serif; font-size:.58rem; letter-spacing:.2em;
          text-transform:uppercase; color:#6a5020; }
        .mana-pct { font-family:'Cinzel',serif; font-size:.65rem; color:#6a5020; transition:color .3s; }
        .mana-pct.full { color:#f5c97a; }
        .mana-bar-track { position:relative; height:22px; border-radius:11px;
          border:1px solid rgba(106,80,32,.4); background:rgba(13,10,7,.8);
          overflow:hidden; transition:border-color .4s, box-shadow .4s; }
        .mana-bar-track.full { border-color:rgba(201,147,58,.6);
          box-shadow:0 0 16px rgba(201,147,58,.2), inset 0 0 8px rgba(201,147,58,.05); }
        .mana-bar-track.conv { border-color:rgba(245,201,122,.8);
          box-shadow:0 0 24px rgba(245,201,122,.35), 0 0 48px rgba(245,201,122,.12); }
        .mana-bar-fill { height:100%; border-radius:11px;
          transition:width .45s cubic-bezier(.4,0,.2,1);
          background:linear-gradient(90deg, var(--mana-color-p,#c9933a), var(--mana-color-s,#6b2fa0));
          position:relative; }
        .mana-bar-fill::after { content:''; position:absolute; inset:0; border-radius:11px;
          background:linear-gradient(180deg, rgba(255,255,255,.18) 0%, transparent 60%); }
        .mana-bubbles { position:absolute; inset:0; pointer-events:none; }
        .mana-bubble { position:absolute; bottom:2px; left:calc(var(--bi) * 12% + 2%);
          width:4px; height:4px; border-radius:50%; background:rgba(245,201,122,.7);
          animation:bubble-rise 1.8s ease-in infinite;
          animation-delay:calc(var(--bi) * 0.22s); }
        @keyframes bubble-rise {
          0%{opacity:0;transform:translateY(0)} 40%{opacity:.8} 100%{opacity:0;transform:translateY(-18px)} }
        .mana-conv-notice { text-align:center; font-size:.65rem; letter-spacing:.12em;
          color:#f5c97a; margin-top:.5rem; font-family:'Cinzel',serif;
          animation:pulse-gold 2s ease-in-out infinite; }
        @keyframes pulse-gold { 0%,100%{opacity:.7} 50%{opacity:1} }

        /* ── RUNA SLIDERS ── */
        .sliders-row { display:grid; grid-template-columns:1fr 1fr; gap:1rem; margin-bottom:1.5rem; }
        .runa-slider-wrap { background:rgba(13,10,7,.6); border:1px solid var(--s-color);
          border-radius:6px; padding:.9rem .85rem .7rem; }
        .runa-slider-label { display:flex; align-items:center; gap:.5rem; margin-bottom:.75rem; }
        .runa-symbol-big { font-size:1.15rem; color:var(--s-color,#c9933a); }
        .runa-label-text { font-family:'Cinzel',serif; font-size:.58rem; letter-spacing:.08em;
          text-transform:uppercase; color:#7a6845; }
        .runa-track-container { position:relative; height:20px; margin-bottom:.6rem; }
        .runa-track-bg { position:absolute; top:50%; transform:translateY(-50%);
          left:0; right:0; height:8px; border-radius:4px;
          border:1px solid rgba(106,80,32,.35); background:rgba(13,10,7,.9); overflow:visible; }
        .runa-track-fill { height:100%; border-radius:4px;
          transition:width .35s cubic-bezier(.4,0,.2,1);
          background:linear-gradient(90deg, var(--s-color,#c9933a), var(--s-accent,#f5c97a)); }
        .runa-thumb { position:absolute; top:50%; transform:translateY(-50%);
          width:20px; height:20px; border-radius:50%;
          background:var(--s-accent,#f5c97a); border:2px solid var(--s-color,#c9933a);
          transition:left .35s cubic-bezier(.4,0,.2,1);
          box-shadow:0 0 8px var(--s-color); cursor:pointer;
          display:flex; align-items:center; justify-content:center; }
        .runa-thumb-inner { width:6px; height:6px; border-radius:50%; background:var(--s-color,#c9933a); }
        .runa-range-input { position:absolute; inset:0; width:100%; opacity:0; cursor:pointer; margin:0; }
        .runa-markers { display:flex; justify-content:space-between; padding:0 2px; }
        .runa-marker { display:flex; flex-direction:column; align-items:center; gap:.15rem; cursor:pointer; }
        .runa-glyph { font-size:.95rem; transition:color .25s, text-shadow .25s; }
        .runa-num { font-family:'Cinzel',serif; font-size:.48rem; letter-spacing:.05em; transition:color .25s; }
        .runa-marker.on .runa-glyph { color:var(--s-accent,#f5c97a); text-shadow:0 0 8px var(--s-color,#c9933a); }
        .runa-marker.on .runa-num  { color:var(--s-accent,#f5c97a); }
        .runa-marker.off .runa-glyph { color:#3a3020; }
        .runa-marker.off .runa-num  { color:#3a3020; }
        .runa-role-badge { text-align:center; font-family:'Cinzel',serif; font-size:.5rem;
          letter-spacing:.12em; text-transform:uppercase; margin-top:.5rem;
          padding:.2rem .5rem; border-radius:2px; }
        .runa-role-badge.primordial  { color:#f5c97a; background:rgba(201,147,58,.15);
          border:1px solid rgba(201,147,58,.3); }
        .runa-role-badge.canalizador { color:#c0a878; background:rgba(106,80,32,.1);
          border:1px solid rgba(106,80,32,.3); }
        .runa-role-badge.convergencia { color:#f5c97a; background:rgba(245,201,122,.08);
          border:1px solid rgba(245,201,122,.25); }

        /* ── HINT / FORJAR ── */
        .fm-hint { text-align:center; font-size:.72rem; color:#4a3a18; font-style:italic;
          margin-bottom:.75rem; min-height:1.1rem; }
        .fm-forjar-btn { display:block; width:100%; padding:.8rem;
          font-family:'Cinzel',serif; font-size:.8rem; letter-spacing:.25em;
          text-transform:uppercase; border:none; border-radius:4px; cursor:pointer;
          transition:all .3s; margin-bottom:1.75rem; }
        .fm-forjar-btn:disabled { background:rgba(106,80,32,.15); color:#3a3020; cursor:not-allowed; }
        .fm-forjar-btn:not(:disabled) { background:linear-gradient(135deg,#8b5e1a,#c9933a);
          color:#0d0a07; box-shadow:0 0 20px rgba(201,147,58,.25); }
        .fm-forjar-btn:not(:disabled):hover { box-shadow:0 0 32px rgba(201,147,58,.45);
          transform:translateY(-1px); }

        /* ── RESULT CARD ── */
        .result-card { background:rgba(13,10,7,.85); border:1px solid var(--p-color);
          border-radius:6px; padding:1.5rem; backdrop-filter:blur(8px); }
        .result-card.conv { border-color:rgba(245,201,122,.5);
          box-shadow:0 0 48px rgba(245,201,122,.12), 0 0 96px rgba(245,201,122,.05); }
        .result-eyebrow { font-family:'Cinzel',serif; font-size:.55rem; letter-spacing:.5em;
          text-transform:uppercase; color:#6a5020; text-align:center; margin-bottom:.6rem; }
        .result-nombre { font-family:'Cinzel Decorative',serif; font-size:1.35rem;
          color:#f5c97a; text-align:center; line-height:1.3; margin:0 0 .8rem; }
        .result-card.conv .result-nombre { color:#fff; text-shadow:0 0 24px rgba(245,201,122,.6); }
        .result-divider { height:1px;
          background:linear-gradient(90deg,transparent,rgba(201,147,58,.3),transparent);
          margin-bottom:.9rem; }
        .result-sistemas { display:flex; align-items:center; justify-content:center;
          gap:.75rem; margin-bottom:1rem; flex-wrap:wrap; }
        .result-sistema-tag { display:flex; align-items:center; gap:.35rem;
          background:rgba(13,10,7,.6); border:1px solid var(--t-color);
          border-radius:3px; padding:.3rem .6rem; font-family:'Cinzel',serif; font-size:.6rem; }
        .rst-role { color:#6a5020; font-size:.5rem; text-transform:uppercase; letter-spacing:.08em; }
        .rst-pts  { background:rgba(201,147,58,.15); color:#f5c97a;
          border-radius:2px; padding:.05rem .3rem; font-size:.6rem; }
        .result-conv-op { color:#6a5020; font-size:1rem; }
        .result-desc { font-size:.88rem; line-height:1.75; color:#c0a878;
          margin:0 0 1.25rem; font-style:italic; }
        .result-actions { display:flex; gap:.75rem; }
        .result-save-btn { flex:1; padding:.55rem; font-family:'Cinzel',serif; font-size:.65rem;
          letter-spacing:.12em; text-transform:uppercase; border:1px solid rgba(201,147,58,.4);
          background:rgba(201,147,58,.08); color:#c9933a; border-radius:3px; cursor:pointer; transition:all .2s; }
        .result-save-btn:hover:not(:disabled) { background:rgba(201,147,58,.15); }
        .result-save-btn.saved, .result-save-btn:disabled { color:#3a3020; border-color:#3a3020; cursor:default; }
        .result-reset { padding:.55rem 1rem; font-family:'Cinzel',serif; font-size:.65rem;
          letter-spacing:.12em; text-transform:uppercase; border:1px solid rgba(106,80,32,.3);
          background:none; color:#6a5020; border-radius:3px; cursor:pointer; transition:all .2s; }
        .result-reset:hover { color:#c0a878; border-color:rgba(192,168,120,.4); }

        /* ── MI MESA ── */
        .mesa-empty { text-align:center; color:#3a3020; font-style:italic; font-size:.82rem; padding:2rem; }
        .mesa-item  { background:rgba(13,10,7,.6); border:1px solid rgba(106,80,32,.25);
          border-radius:4px; padding:.85rem 1rem; margin-bottom:.6rem; }
        .mesa-header { display:flex; justify-content:space-between; align-items:flex-start; }
        .mesa-nombre { font-family:'Cinzel Decorative',serif; font-size:.88rem; color:#f5c97a; }
        .mesa-remove { background:none; border:none; color:#3a3020; cursor:pointer;
          font-size:.9rem; transition:color .2s; }
        .mesa-remove:hover { color:#8b1a1a; }
        .mesa-tags { display:flex; gap:.4rem; flex-wrap:wrap; margin:.45rem 0; }
        .mesa-tag  { font-family:'Cinzel',serif; font-size:.5rem; letter-spacing:.06em;
          text-transform:uppercase; padding:.15rem .45rem; border-radius:2px;
          border:1px solid rgba(106,80,32,.3); color:#7a6845; }
        .mesa-tag.conv { border-color:rgba(245,201,122,.4); color:#f5c97a; }
        .mesa-desc { font-size:.78rem; color:#7a6845; font-style:italic; line-height:1.6;
          display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; }
        .mesa-time { font-size:.6rem; color:#3a3020; margin-top:.35rem; }
      `}</style>

      <div className="fm-bg" />
      <div className="fm-wrap">

        <div className="fm-tabs">
          <button className={`fm-tab ${activeTab === "forja" ? "active" : ""}`}
                  onClick={() => setActiveTab("forja")}>Forja</button>
          <button className={`fm-tab ${activeTab === "mesa" ? "active" : ""}`}
                  onClick={() => setActiveTab("mesa")}>
            Mi Mesa
            {savedSystems.length > 0 && <span className="fm-tab-badge">{savedSystems.length}</span>}
          </button>
        </div>

        {activeTab === "forja" && (
          <>
            <h1 className="fm-title">Forja de Magia</h1>
            <p className="fm-subtitle">Elige dos sistemas — el slider determina quién es Primordial</p>

            {!result ? (
              <>
                {/* Grid de sistemas */}
                <div className="sistema-grid">
                  {SISTEMAS_LIST.map(s => {
                    const isSelected = aId === s.id || bId === s.id;
                    return (
                      <button
                        key={s.id}
                        className={`sg-btn ${isSelected ? "selected" : ""}`}
                        style={{ "--s-color": s.color, "--s-accent": s.accent }}
                        onClick={() => handleToggle(s.id)}
                      >
                        <span className="sg-sym">{s.symbol}</span>
                        <span className="sg-label">{s.label}</span>
                        <span className="sg-desc">{s.desc}</span>
                        {isSelected && <span className="sg-role-activo">◈ Activo</span>}
                      </button>
                    );
                  })}
                </div>

                {/* Barra de maná */}
                <ManaBar aId={aId} bId={bId} aPts={aPts} bPts={bPts} />

                {/* Sliders — solo si hay al menos un sistema seleccionado */}
                {(aId || bId) && (
                  <div className="sliders-row">
                    {aId && (
                      <RunaSlider
                        value={aPts} onChange={(v) => setPts(aId, v)}
                        color={SISTEMAS[aId].color} accent={SISTEMAS[aId].accent}
                        label={SISTEMAS[aId].label} symbol={SISTEMAS[aId].symbol}
                        role={rolA}
                      />
                    )}
                    {bId && (
                      <RunaSlider
                        value={bPts} onChange={(v) => setPts(bId, v)}
                        color={SISTEMAS[bId].color} accent={SISTEMAS[bId].accent}
                        label={SISTEMAS[bId].label} symbol={SISTEMAS[bId].symbol}
                        role={rolB}
                      />
                    )}
                  </div>
                )}

                <p className="fm-hint">{hintMsg}</p>

                <button className="fm-forjar-btn" disabled={!listo} onClick={handleForjar}>
                  ⟁ Forjar Sistema
                </button>
              </>
            ) : (
              <ResultCard result={result} onReset={handleReset} onSave={handleSave} isSaved={isSaved} />
            )}
          </>
        )}

        {activeTab === "mesa" && (
          <>
            <h1 className="fm-title">Mi Mesa</h1>
            {savedSystems.length === 0 ? (
              <p className="mesa-empty">No hay sistemas guardados aún.</p>
            ) : (
              savedSystems.map(s => (
                <div key={s.id} className="mesa-item">
                  <div className="mesa-header">
                    <span className="mesa-nombre">{s.result.nombre}</span>
                    <button className="mesa-remove" onClick={() => handleRemove(s.id)}>✕</button>
                  </div>
                  <div className="mesa-tags">
                    <span className={`mesa-tag ${s.result.tipo === "convergencia" ? "conv" : ""}`}>
                      {s.result.tipo === "convergencia" ? "✦ Convergencia" : "Dominante"}
                    </span>
                    <span className="mesa-tag">
                      {SISTEMAS[s.result.primordialId].symbol} {SISTEMAS[s.result.primordialId].label} {s.result.pPts}
                    </span>
                    <span className="mesa-tag">
                      {SISTEMAS[s.result.canalizadorId].symbol} {SISTEMAS[s.result.canalizadorId].label} {s.result.cPts}
                    </span>
                  </div>
                  <p className="mesa-desc">{s.result.descripcion}</p>
                  <div className="mesa-time">{s.timestamp}</div>
                </div>
              ))
            )}
          </>
        )}
      </div>
    </>
  );
}