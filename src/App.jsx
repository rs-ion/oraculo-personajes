import { useState, useCallback, useRef } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const DECKS = {
  arquetipos: {
    id: "arquetipos",
    label: "Arquetipos",
    color: "#c9933a",
    accent: "#f5c97a",
    symbol: "⚔",
    cards: [
      { id: "a01", title: "El Héroe Caído", body: "Una vez símbolo de esperanza, ahora carga con la vergüenza de un fracaso que nadie le perdonó. Busca redención, pero teme que ya sea demasiado tarde." },
      { id: "a02", title: "La Sabia Sombra", body: "Conoce respuestas que nadie debería saber. Ayuda con precio: cada consejo que da acelera su propia condena." },
      { id: "a03", title: "El Inocente Peligroso", body: "Su bondad no es ingenuidad — es una elección consciente en un mundo que lo corrompería si lo dejara. Y eso lo hace aterrador." },
      { id: "a04", title: "El Traidor Leal", body: "Traicionó a los suyos para salvarlos. Nadie sabe la verdad. Él carga el odio de todos como escudo." },
      { id: "a05", title: "La Cazadora", body: "Define su identidad por lo que persigue, no por lo que es. Cuando su presa desaparece, ¿quién queda?" },
      { id: "a06", title: "El Constructor de Mundos", body: "Creó un sistema que funcionaba. Luego vivió para ver cómo ese sistema devoraba todo lo que amaba." },
      { id: "a07", title: "La Voz del Caos", body: "No destruye por maldad. Destruye porque el orden que existe le parece la mayor crueldad posible." },
      { id: "a08", title: "El Espejo Roto", body: "Refleja a los demás tan perfectamente que olvidó quién era antes de empezar a hacerlo." },
      { id: "a09", title: "El Último de Su Clase", body: "Guarda una forma de ver el mundo que morirá con él. Su dilema: ¿compartirla y perderla, o guardarla y condenarla?" },
      { id: "a10", title: "La Madre Tormenta", body: "Su amor es absoluto e incondicional. También es sofocante, posesivo y capaz de destruir lo que pretende proteger." },
      { id: "a11", title: "El Niño Eterno", body: "Se negó a crecer porque vio lo que el mundo les hace a los adultos. Pero el mundo no le pidió permiso." },
      { id: "a12", title: "El Arquitecto del Dolor", body: "Diseña situaciones donde otros sufren. No por crueldad, sino porque cree que el dolor es la única maestra honesta." },
      { id: "a13", title: "La Guerrera de Papel", body: "Parece invencible. Cada cicatriz la obtuvo huyendo, no luchando. El mito que la protege también la aprisiona." },
      { id: "a14", title: "El Filósofo Armado", body: "Tiene ideas perfectas para un mundo mejor. Y está dispuesto a usar la violencia para construirlo." },
      { id: "a15", title: "La Testigo Muda", body: "Vio algo que cambió todo. Eligió el silencio. Ahora el silencio la está consumiendo." },
      { id: "a16", title: "El Dios Olvidado", body: "Fue adorado. Fue temido. Ahora nadie recuerda su nombre. Eso, descubrió, duele más que cualquier herida." },
      { id: "a17", title: "El Mentor Agotado", body: "Ha dado todo lo que tenía a sus discípulos. No le queda nada para sí mismo. Y uno de ellos está a punto de superar todo lo que él fue." },
      { id: "a18", title: "La Diplomática de Hierro", body: "Construye paz con palabras afiladas como cuchillos. Cada tratado que firma lleva el precio de algo que amaba." },
      { id: "a19", title: "El Superviviente Culpable", body: "Vivió cuando todos los demás murieron. No sabe si fue suerte, cobardía o algo peor. Necesita saberlo." },
      { id: "a20", title: "La Reformadora Implacable", body: "El sistema está roto y ella lo sabe con precisión quirúrgica. Su problema: para arreglarlo necesita convertirse en el sistema." },
      { id: "a21", title: "El Artista Maldito", body: "Crea obras que cambian a quienes las contemplan. El proceso lo destruye a él. Ha decidido que vale la pena." },
      { id: "a22", title: "El Guardián sin Reino", body: "Dedicó su vida a proteger algo que ya no existe. No sabe hacer otra cosa. No sabe si quiere aprender." },
      { id: "a23", title: "La Heretera del Caos", body: "Nació en una familia que construyó su poder sobre sangre. Ella no pidió ese legado. Tampoco lo ha rechazado." },
      { id: "a24", title: "El Espía Enamorado", body: "Su misión requería fingir afecto. Dejó de fingir hace tiempo. Ahora no sabe qué traiciona si actúa: la misión o a sí mismo." },
      { id: "a25", title: "La Médica de Guerra", body: "Ha salvado vidas en ambos bandos. Ninguno la perdona por ello. Ella tampoco se perdona a sí misma algunas de las elecciones que hizo." },
      { id: "a26", title: "El Profeta Dudoso", body: "Recibe visiones que siempre se cumplen. No les cree. No puede permitirse creerles. Actuar sobre ellas cambia quién es." },
      { id: "a27", title: "La Líder sin Seguidores", body: "Tiene la visión, la inteligencia, la voluntad. Nadie la sigue porque dice verdades que nadie quiere escuchar." },
      { id: "a28", title: "El Monstruo Domesticado", body: "Aprendió a comportarse como persona. Funciona. La máscara encaja perfectamente. Teme el día en que deje de ser una máscara." },
      { id: "a29", title: "La Exploradora del Abismo", body: "Va donde nadie más se atreve. No por valentía, sino porque lo que encontró en el abismo le resulta más honesto que el mundo de arriba." },
      { id: "a30", title: "El Heredero Indigno", body: "Todo el mundo sabe que no merece lo que heredó. Incluido él. La pregunta es si va a hacer algo al respecto." },
    ]
  },
  historias: {
    id: "historias",
    label: "Historia de Fondo",
    color: "#7a5c9e",
    accent: "#b89fd4",
    symbol: "📜",
    cards: [
      { id: "h01", title: "La Ciudad que Ardió", body: "Escapó del incendio. Todos creen que fue accidental. Solo él sabe que lo empezó. Solo él sabe por qué tenía que hacerlo." },
      { id: "h02", title: "El Maestro que Mintió", body: "Su mentor le enseñó todo lo que sabe. También le enseñó cosas que no eran verdad. Y cuando lo descubrió, ya era demasiado tarde para desaprender." },
      { id: "h03", title: "Criado por el Enemigo", body: "Los que lo criaron con amor eran el enemigo de su pueblo. Ahora no sabe si su compasión es virtud o traición." },
      { id: "h04", title: "El Juramento Olvidado", body: "Prometió algo cuando era joven y no comprendía el peso de las palabras. El mundo le está cobrando esa deuda ahora." },
      { id: "h05", title: "La Hermana que Nunca Fue", body: "La perdió antes de poder conocerla. Toda su vida ha buscado a esa persona en los demás. Y siempre la encuentra. Y siempre la pierde." },
      { id: "h06", title: "El Premio que Destruyó", body: "Ganó exactamente lo que quería. Y esa victoria fue el principio de todo lo que vino después." },
      { id: "h07", title: "Educado para Obedecer", body: "Le enseñaron que cuestionar era traición. Aprendió bien. Ahora su mayor miedo es descubrir que tenía razón en obedecer." },
      { id: "h08", title: "La Memoria Prestada", body: "Sus recuerdos más fundamentales no son suyos. Los heredó, los absorbió, los construyó sobre mentiras ajenas." },
      { id: "h09", title: "El Día que Todo Cambió", body: "Hubo un momento exacto. Una decisión. Una fracción de segundo. Desde entonces, todo en su vida es consecuencia de ese instante." },
      { id: "h10", title: "Criatura de Frontera", body: "Nació entre dos mundos que se odian. No pertenece a ninguno. Eso le da una perspectiva única y una soledad incurable." },
      { id: "h11", title: "El Exilio Voluntario", body: "Se fue antes de que lo expulsaran. Nadie supo nunca que tuvo la opción de quedarse." },
      { id: "h12", title: "La Deuda de Sangre", body: "Alguien murió para que él viviera. Ese alguien no debería haber muerto. Él no debería estar vivo." },
      { id: "h13", title: "El Nombre Robado", body: "Vive bajo una identidad que pertenecía a otra persona. La persona real está muerta. O eso le dijeron." },
      { id: "h14", title: "La Victoria Envenenada", body: "Derrotó a su mayor enemigo. Descubrió que necesitaba ese enemigo para saber quién era. Sin él, está perdido." },
      { id: "h15", title: "El Secreto de Familia", body: "Su familia guarda algo que lo cambia todo. Lo saben. Él no. Cada conversación con ellos es una mentira cuidadosamente mantenida." },
      { id: "h16", title: "La Prueba que Falló", body: "Hubo un momento donde fue evaluado y no dio la talla. Nadie más lo recuerda. Él no puede olvidarlo." },
      { id: "h17", title: "El Camino No Tomado", body: "En un cruce de su vida eligió el camino correcto. Lleva años preguntándose qué habría pasado si hubiera elegido el otro." },
      { id: "h18", title: "La Profecía sobre Él", body: "Sabe lo que se supone que debe ser. Lo que se supone que debe hacer. Se ha pasado la vida intentando que esa profecía sea mentira." },
      { id: "h19", title: "El Maestro Superado", body: "Superó a su mentor en todo. El mentor lo sabe. Ninguno de los dos sabe cómo vivir con eso." },
      { id: "h20", title: "La Guerra Propia", body: "Participó en un conflicto que el mundo ya olvidó. Él no puede. Las razones por las que luchó siguen sin resolverse." },
      { id: "h21", title: "El Don que Maldice", body: "Nació con una habilidad que debería ser una ventaja. Cada vez que la usa, algo valioso desaparece de su vida." },
      { id: "h22", title: "La Comunidad Perdida", body: "Perteneció a algo más grande que él mismo. Lo perdió o lo abandonó. Desde entonces, toda comunidad le parece una pálida imitación." },
      { id: "h23", title: "El Crimen sin Nombre", body: "Hizo algo que no tiene categoría moral clara. No fue malvado. No fue justo. Fue necesario. Eso es lo peor." },
      { id: "h24", title: "La Lealtad Heredada", body: "Le deben lealtad a alguien que no eligió. Un clan, una causa, una deuda de sus padres. Es su cadena más resistente." },
    ]
  },
  conflictos: {
    id: "conflictos",
    label: "Conflictos",
    color: "#b03a2e",
    accent: "#e8776d",
    symbol: "🔥",
    cards: [
      { id: "c01", title: "La Lealtad Dividida", body: "Dos personas que ama necesitan cosas incompatibles. Ayudar a una es abandonar a la otra. El tiempo se acaba." },
      { id: "c02", title: "El Secreto que Protege", body: "Sabe algo que destruiría a alguien que ama. La verdad lo liberaría a él. El silencio lo está matando." },
      { id: "c03", title: "El Poder que Corrompe", body: "Tiene acceso a algo que podría resolver todo. Usarlo tiene un precio que cambia quién es. Ya lo usó una vez." },
      { id: "c04", title: "La Misión vs. El Hombre", body: "El objetivo justifica todo según la doctrina que siguió su vida entera. Pero el siguiente paso requiere sacrificar a un inocente." },
      { id: "c05", title: "La Identidad Robada", body: "Alguien usurpó su lugar. Vive su vida, tiene sus relaciones, lleva su nombre. Y lo hace mejor de lo que él jamás lo hizo." },
      { id: "c06", title: "El Monstruo Necesario", body: "Para detener un mal mayor, debe convertirse en exactamente el tipo de persona que juró destruir." },
      { id: "c07", title: "La Promesa Imposible", body: "Prometió algo que no depende de él. El plazo se acerca. La promesa no se puede cumplir. Y no puede romperla." },
      { id: "c08", title: "El Aliado Envenenado", body: "Necesita a alguien que lo va a traicionar. Lo sabe. No tiene alternativa. Solo puede controlar cuándo y cómo." },
      { id: "c09", title: "La Verdad que Destruye", body: "Descubrió algo que hace que todo su pasado sea un error. Aceptarlo invalida todo lo que ha construido. Negarlo lo convierte en cómplice." },
      { id: "c10", title: "El Amor como Vulnerabilidad", body: "Alguien que le importa está siendo usado como palanca en su contra. Protegerlo significa exactamente lo que sus enemigos quieren." },
      { id: "c11", title: "La Gloria vs. La Justicia", body: "Puede resolver esto de forma brillante y visible, o de forma correcta e invisible. No puede hacer ambas." },
      { id: "c12", title: "El Pasado que Regresa", body: "Alguien del pasado apareció. Trae consigo todo lo que él construyó su vida actual para olvidar." },
      { id: "c13", title: "El Discípulo que Diverge", body: "Formó a alguien en sus valores. Ese alguien los aplica mejor que él y llega a conclusiones que él no puede aceptar." },
      { id: "c14", title: "La Causa vs. Las Personas", body: "La causa por la que lucha requeriría sacrificar a las personas específicas por las que lucha. No es metáfora. Es literal." },
      { id: "c15", title: "El Perdón Exigido", body: "Alguien que le hizo daño exige perdón. No como petición — como condición para algo que él necesita desesperadamente." },
      { id: "c16", title: "La Trampa de la Competencia", body: "Es demasiado bueno en algo que lo aleja de lo que quiere ser. Cada vez que demuestra esa habilidad, se entierra más." },
      { id: "c17", title: "El Legado Envenenado", body: "Lo que heredó es valioso y está construido sobre algo imperdonable. Usarlo lo hace cómplice. Rechazarlo lo hace inútil." },
      { id: "c18", title: "La Resistencia Interna", body: "La mayor oposición a sus objetivos no viene de fuera. Viene de una parte de sí mismo que sabe algo que la otra parte se niega a reconocer." },
    ]
  },
  dilemas: {
    id: "dilemas",
    label: "Dilemas Morales",
    color: "#1a6b8a",
    accent: "#5bb8d4",
    symbol: "⚖",
    cards: [
      { id: "d01", title: "El Sacrificio Calculado", body: "Puede salvar a muchos dejando morir a pocos. Los números son claros. Los rostros también. ¿A qué punto los números dejan de importar?" },
      { id: "d02", title: "La Mentira Compasiva", body: "La verdad destruiría a alguien que no tiene la fortaleza para cargarla. La mentira lo protege pero lo mantiene en una prisión dorada." },
      { id: "d03", title: "La Justicia vs. La Ley", body: "Lo legal es claramente injusto. Lo justo es claramente ilegal. Hay una persona concreta que sufre las consecuencias de esa diferencia." },
      { id: "d04", title: "El Perdón que No Merece", body: "Alguien que le hizo un daño profundo genuinamente cambió. Perdonarlo es sano para él. También siente como traicionar su propio dolor." },
      { id: "d05", title: "La Complicidad por Silencio", body: "Sabe de un abuso que no le afecta directamente. Denunciarlo tiene costos reales para él. El silencio hace posible que continúe." },
      { id: "d06", title: "El Fin que Justifica", body: "El objetivo es innegablemente bueno. El método es innegablemente malo. El objetivo no se puede alcanzar de otra forma." },
      { id: "d07", title: "La Lealtad al Culpable", body: "Alguien que lo ha amado incondicionalmente hizo algo imperdonable. Defenderlo es mentir. Denunciarlo es destruir lo poco que le queda." },
      { id: "d08", title: "El Beneficio de la Duda", body: "Todo apunta a que esta persona es culpable. La evidencia es circumstancial. Actuar mal destruye a un inocente. No actuar puede destruir a muchos." },
      { id: "d09", title: "La Autonomía del Daño", body: "Alguien toma decisiones que lo destruyen. Son sus decisiones. Interferir viola su libertad. No interferir viola su cuidado." },
      { id: "d10", title: "El Mérito vs. La Necesidad", body: "Tiene un recurso limitado. Quien más lo merece lo usaría bien. Quien más lo necesita podría no sobrevivir sin él." },
      { id: "d11", title: "La Verdad Inoportuna", body: "El momento perfecto para revelar algo importante nunca llega. Cada momento que pasa hace la revelación más difícil y más necesaria." },
      { id: "d12", title: "El Ideal vs. El Posible", body: "La solución perfecta existe en teoría. La solución posible es imperfecta y podría hacer daño. El tiempo para decidir termina ahora." },
      { id: "d13", title: "La Herramienta y el Agente", body: "Puede usar a alguien para un bien mayor sin que esa persona sepa que está siendo usado. El resultado es bueno. El método, no." },
      { id: "d14", title: "El Pasado Irredimible", body: "Hizo algo que no puede deshacerse. El daño fue real. Nada de lo que haga lo borrará. ¿Tiene sentido intentarlo de todas formas?" },
      { id: "d15", title: "La Excepción que Destruye la Regla", body: "Tiene un principio absoluto que lo define. Hay una situación donde aplicarlo causaría un daño concreto. Una excepción lo cambia todo." },
      { id: "d16", title: "La Deuda con el Adversario", body: "Su enemigo le salvó la vida. Ahora le debe algo. Las reglas que sigue exigen que lo honre. Hacerlo beneficia al adversario." },
      { id: "d17", title: "El Conocimiento Peligroso", body: "Sabe algo que, si se extendiera, cambiaría el mundo. Para mejor, probablemente. Con un costo que no puede predecir. Compartirlo o guardarlo." },
      { id: "d18", title: "La Identidad Construida", body: "Descubre que sus valores más profundos le fueron implantados por alguien con una agenda. ¿Siguen siendo suyos? ¿Sigue siendo él?" },
    ]
  },
  tramas: {
    id: "tramas",
    label: "Tramas y Giros",
    color: "#2d6a4f",
    accent: "#74c69d",
    symbol: "🌀",
    cards: [
      { id: "t01", title: "El Aliado Era el Enemigo", body: "La persona en quien más confiaba llevaba desde el principio la misión contraria. No por maldad — tenía sus propias razones válidas." },
      { id: "t02", title: "La Victoria como Trampa", body: "Ganaron. Exactamente lo que querían. Y ahora descubren que ganar era parte del plan de quien los manipulaba." },
      { id: "t03", title: "El Mundo al Revés", body: "Todo lo que creían verdad sobre el sistema, la historia o las reglas era una construcción. Y quien lo construyó tenía razones." },
      { id: "t04", title: "El Muerto que Camina", body: "Alguien que creían muerto regresa. Su ausencia fue la base de todo lo que construyeron. Su regreso invalida esa construcción." },
      { id: "t05", title: "La Herramienta se Vuelve", body: "Alguien que usaron para sus propósitos tomó agencia propia. Sus objetivos ya no se alinean. Sabe demasiado para ser ignorado." },
      { id: "t06", title: "El Tiempo se Acaba Mal", body: "La cuenta regresiva que creían controlar ya expiró. Lo que temían que pasara ya está pasando. Llevan días sin saberlo." },
      { id: "t07", title: "El Testigo Incómodo", body: "Alguien sin poder ni importancia vio exactamente lo que no debía ver. Ahora todas las facciones lo buscan por razones distintas." },
      { id: "t08", title: "La Solución Peor que el Problema", body: "La amenaza principal fue neutralizada. El método para neutralizarla creó algo más peligroso, más difícil de identificar y más difícil de detener." },
      { id: "t09", title: "El Rescate que No Querían", body: "Los salvaron. Quien los salvó tiene ahora un poder sobre ellos que no pidieron y no pueden rechazar." },
      { id: "t10", title: "La Profecía Autocomplaciente", body: "Intentaron evitar exactamente lo que predijo la profecía. Cada acción que tomaron para evitarla fue el mecanismo que la cumplió." },
      { id: "t11", title: "El Origen Compartido", body: "El héroe y el villano tienen el mismo origen, el mismo trauma, la misma motivación. Solo tomaron decisiones distintas en un momento preciso." },
      { id: "t12", title: "La Verdad a Medias", body: "Todo lo que les dijeron era técnicamente verdad. La mentira estaba en lo que callaron. Y lo que callaron cambia el significado de todo lo demás." },
      { id: "t13", title: "El Costo Diferido", body: "Tomaron un atajo hace mucho. El precio que evitaron pagar entonces llega ahora, con intereses, en el peor momento posible." },
      { id: "t14", title: "La Lealtad Cruzada", body: "Dos grupos que confiaban en el mismo intermediario descubren que ese intermediario jugaba para ambos lados. Y que tenía razones para hacerlo." },
      { id: "t15", title: "El Mapa Equivocado", body: "Han estado siguiendo un objetivo basado en información incorrecta. El objetivo real era otro. Y ya es demasiado tarde para empezar desde cero." },
      { id: "t16", title: "La Amnesia Selectiva", body: "Alguien perdió recuerdos específicos. No al azar — exactamente los que habrían cambiado su comportamiento. Alguien eligió qué borrar." },
      { id: "t17", title: "El Precio del Éxito", body: "Lograron su objetivo. El mundo que querían construir existe. Y es exactamente tan horrible como el que destruyeron para crearlo." },
      { id: "t18", title: "La Trampa del Nombre", body: "Son reconocidos por una reputación que no construyeron. Las expectativas que esa reputación genera los están llevando a un lugar del que no pueden salir." },
      { id: "t19", title: "El Doble Fondo", body: "La misión superficial era real. Había otra misión debajo, más importante, que nadie les explicó. La cumplieron sin saberlo. Con consecuencias que no anticiparon." },
      { id: "t20", title: "La Resistencia que Crea al Monstruo", body: "Al combatir al antagonista, adoptaron exactamente sus métodos. Ya no pueden distinguirse de lo que combaten. Y el antagonista lo señala con razón." },
    ]
  },
  misterios: {
    id: "misterios",
    label: "Misterios",
    color: "#4a3728",
    accent: "#c4956a",
    symbol: "🕯",
    cards: [
      { id: "m01", title: "El Patrón que No Puede Existir", body: "Hay una conexión entre eventos que nadie podría haber planeado. La coincidencia es imposible. La alternativa es peor." },
      { id: "m02", title: "El Testigo que No Puede Saber", body: "Alguien describe con exactitud algo que no estuvo ahí para ver. No sabe que su descripción es imposible." },
      { id: "m03", title: "La Desaparición Conveniente", body: "La persona clave desapareció exactamente cuando su testimonio se volvió crucial. Demasiado conveniente para ser accidental." },
      { id: "m04", title: "El Mensaje sin Remitente", body: "Alguien sabía que esto iba a ocurrir. Lo advirtió con semanas de antelación. Nadie sabe quién era ni cómo lo sabía." },
      { id: "m05", title: "La Organización Fantasma", body: "Cada pista apunta a una estructura que oficialmente no existe. Pero sus consecuencias son reales y presentes." },
      { id: "m06", title: "La Memoria Falsa", body: "Dos personas recuerdan el mismo evento de formas incompatibles. Ambos recuerdos tienen evidencia que los corrobora. Uno de ellos fue implantado." },
      { id: "m07", title: "El Culpable Inocente", body: "Todas las evidencias señalan a alguien que no pudo haberlo hecho. Pero tampoco pudo no haberlo hecho." },
      { id: "m08", title: "La Puerta Cerrada por Dentro", body: "El crimen ocurrió en un lugar al que era imposible acceder. Y sin embargo ocurrió. Eso significa que una de las reglas del juego es mentira." },
      { id: "m09", title: "El Heredero sin Herencia", body: "Alguien heredó algo que nadie sabía que existía. El legado en sí no es el misterio. El misterio es por qué fue ocultado." },
      { id: "m10", title: "La Tecnología Imposible", body: "Hay evidencia de capacidades que no deberían existir todavía. O que se creía que ya no existían. O que nunca deberían haber existido." },
      { id: "m11", title: "El Cómplice que No Sabe", body: "Alguien fue usado sin saberlo como pieza en un plan mayor. Ahora que lo descubre, tiene la clave para resolverlo todo. Y también es el principal sospechoso." },
      { id: "m12", title: "El Secreto que Se Guarda Solo", body: "Nadie decidió guardar este secreto conscientemente. Sin embargo, generaciones enteras lo callaron. Como si hubiera algo en el secreto mismo que impidiera ser revelado." },
      { id: "m13", title: "La Víctima que Mintió", body: "El caso entero se construyó sobre el testimonio de alguien que mintió. No para protegerse. Para proteger al culpable. Por razones que cambian todo." },
      { id: "m14", title: "El Experto Equivocado", body: "La persona con más autoridad sobre el tema está sistemáticamente equivocada. No por incompetencia. Por algo que ocurrió antes de que llegaran." },
      { id: "m15", title: "La Pista que No Debería Estar", body: "Hay una evidencia que solo tiene sentido si alguien del pasado sabía lo que iba a ocurrir en el presente. Lo cual es imposible." },
      { id: "m16", title: "El Arma sin Crimen", body: "Encontraron el arma. No hay crimen que le corresponda. O hay demasiados crímenes y no saben cuál es el correcto." },
      { id: "m17", title: "El Aliado del Antagonista", body: "El antagonista tiene un colaborador dentro del grupo protagonista. El colaborador cree estar haciendo lo correcto. En cierto modo, tiene razón." },
      { id: "m18", title: "La Confusión de Identidades", body: "Alguien fue confundido con otra persona. El error tiene consecuencias. La persona correcta está en peligro por ello. La persona incorrecta también." },
    ]
  }
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

function CardComponent({ deckId, card, onSave, saved, cardIndex, isNew }) {
  const [flipped, setFlipped] = useState(false);
  const [sparkle, setSparkle] = useState(false);
  const deck = DECKS[deckId];

  // auto-flip on new roll with stagger
  useState(() => {
    if (isNew) {
      const t = setTimeout(() => setFlipped(true), cardIndex * 160 + 250);
      return () => clearTimeout(t);
    }
  });

  // Reset flip state when card changes (new roll)
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
            title={activeDecks.includes(deck.id) ? "Desactivar baraja" : "Activar baraja"}
          >
            <span className="deck-pill-symbol">{deck.symbol}</span>
            <span className="deck-pill-label">{deck.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────

export default function App() {
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
        if (prev.length === 1) return prev; // keep at least one
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
        @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700&family=Cinzel:wght@400;600;700&family=EB+Garamond:ital,wght@0,400;0,500;1,400&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --bg: #0d0a07;
          --bg2: #13100c;
          --gold: #c9933a;
          --gold-light: #f5c97a;
          --gold-dim: #6a5020;
          --ink: #1a1410;
          --parchment: #f0e6c8;
          --parchment-dark: #c0a878;
          --text: #e8d9b5;
          --text-dim: #7a6845;
          --red: #8b2a2a;
        }

        body {
          background: var(--bg);
          color: var(--text);
          font-family: 'EB Garamond', Georgia, serif;
          min-height: 100vh;
          overflow-x: hidden;
        }

        .bg-texture {
          position: fixed; inset: 0; z-index: 0; pointer-events: none;
          background:
            radial-gradient(ellipse 70% 40% at 50% 0%, #2a1800 0%, transparent 70%),
            radial-gradient(ellipse 50% 30% at 90% 100%, #120820 0%, transparent 60%),
            repeating-linear-gradient(0deg, transparent, transparent 80px, rgba(201,147,58,0.012) 80px, rgba(201,147,58,0.012) 81px),
            repeating-linear-gradient(90deg, transparent, transparent 80px, rgba(201,147,58,0.012) 80px, rgba(201,147,58,0.012) 81px);
        }

        /* ── HEADER ── */
        .header {
          position: relative; z-index: 10;
          padding: 2.5rem 2rem 1.8rem;
          text-align: center;
          border-bottom: 1px solid rgba(201,147,58,0.15);
        }

        .header-eyebrow {
          font-family: 'Cinzel', serif;
          font-size: 0.6rem;
          letter-spacing: 0.5em;
          color: var(--gold-dim);
          text-transform: uppercase;
          margin-bottom: 0.6rem;
        }

        .header-title {
          font-family: 'Cinzel Decorative', serif;
          font-size: clamp(1.5rem, 3.5vw, 2.6rem);
          font-weight: 700;
          color: var(--gold);
          text-shadow: 0 0 50px rgba(201,147,58,0.35), 0 2px 6px rgba(0,0,0,0.9);
          letter-spacing: 0.04em;
          line-height: 1.2;
        }

        .header-sub {
          font-size: 1rem;
          color: var(--text-dim);
          font-style: italic;
          margin-top: 0.5rem;
          letter-spacing: 0.02em;
        }

        .header-ornament {
          display: flex; align-items: center; justify-content: center; gap: 0.8rem;
          margin-top: 1.2rem;
        }
        .orn-line { width: 60px; height: 1px; background: linear-gradient(90deg, transparent, var(--gold-dim)); }
        .orn-line.r { background: linear-gradient(90deg, var(--gold-dim), transparent); }
        .orn-diamond { color: var(--gold-dim); font-size: 0.5rem; }

        /* ── CONTROLS ── */
        .controls {
          position: relative; z-index: 10;
          display: flex; flex-direction: column; align-items: center;
          padding: 1.8rem 1rem 1.2rem;
          gap: 1rem;
        }

        .roll-btn {
          position: relative;
          padding: 0.9rem 2.8rem;
          background: transparent;
          border: 1px solid var(--gold);
          color: var(--gold-light);
          font-family: 'Cinzel', serif;
          font-size: 0.95rem;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.25s ease;
          overflow: hidden;
        }
        .roll-btn::before {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(201,147,58,0.12) 0%, transparent 60%);
          opacity: 0; transition: opacity 0.25s;
        }
        .roll-btn:hover::before { opacity: 1; }
        .roll-btn:hover {
          box-shadow: 0 0 28px rgba(201,147,58,0.25), inset 0 0 16px rgba(201,147,58,0.04);
          transform: translateY(-1px);
        }
        .roll-btn:active { transform: translateY(0); }
        .roll-btn:disabled { opacity: 0.4; cursor: not-allowed; transform: none; }

        .filter-toggle {
          background: transparent;
          border: 1px solid rgba(201,147,58,0.25);
          color: var(--text-dim);
          font-family: 'Cinzel', serif;
          font-size: 0.65rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          padding: 0.4rem 1rem;
          cursor: pointer;
          transition: all 0.2s;
          border-radius: 2px;
        }
        .filter-toggle:hover { color: var(--text); border-color: rgba(201,147,58,0.5); }
        .filter-toggle.open { color: var(--gold); border-color: var(--gold-dim); }

        .roll-stats {
          font-size: 0.78rem;
          color: var(--text-dim);
          font-style: italic;
        }

        /* ── DECK FILTER ── */
        .deck-filter {
          position: relative; z-index: 10;
          max-width: 900px; margin: 0 auto;
          padding: 1rem 1.5rem 1.5rem;
          border-bottom: 1px solid rgba(201,147,58,0.1);
          animation: fadeSlideIn 0.25s ease forwards;
        }

        .deck-filter-label {
          font-family: 'Cinzel', serif;
          font-size: 0.6rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--text-dim);
          margin-bottom: 0.8rem;
          text-align: center;
        }

        .deck-filter-pills {
          display: flex; flex-wrap: wrap; gap: 0.5rem;
          justify-content: center;
        }

        .deck-pill {
          display: flex; align-items: center; gap: 0.35rem;
          padding: 0.35rem 0.8rem;
          background: transparent;
          border: 1px solid rgba(120,100,70,0.3);
          color: var(--text-dim);
          font-family: 'Cinzel', serif;
          font-size: 0.65rem;
          letter-spacing: 0.1em;
          cursor: pointer;
          transition: all 0.2s;
          border-radius: 2px;
        }
        .deck-pill:hover { border-color: var(--deck-color); color: var(--text); }
        .deck-pill.active {
          border-color: var(--deck-color);
          color: var(--deck-accent);
          background: rgba(0,0,0,0.3);
          box-shadow: 0 0 12px rgba(0,0,0,0.2);
        }
        .deck-pill-symbol { font-size: 0.9rem; }

        /* ── TABS ── */
        .tabs {
          position: relative; z-index: 10;
          display: flex;
          border-bottom: 1px solid rgba(201,147,58,0.12);
          padding: 0 2rem;
          max-width: 1400px; margin: 0 auto;
        }
        .tab-btn {
          padding: 0.7rem 1.4rem;
          background: transparent;
          border: none; border-bottom: 2px solid transparent;
          color: var(--text-dim);
          font-family: 'Cinzel', serif;
          font-size: 0.72rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.2s;
        }
        .tab-btn:hover { color: var(--text); }
        .tab-btn.active { color: var(--gold-light); border-bottom-color: var(--gold); }

        .tab-badge {
          display: inline-flex; align-items: center; justify-content: center;
          background: var(--gold); color: var(--ink);
          border-radius: 50%;
          width: 1.1rem; height: 1.1rem;
          font-size: 0.6rem; font-weight: 700;
          margin-left: 0.4rem;
          font-family: 'Cinzel', serif;
        }

        /* ── MAIN ── */
        .main-content {
          position: relative; z-index: 10;
          max-width: 1400px; margin: 0 auto;
          padding: 2rem 1.5rem 5rem;
        }

        .empty-state {
          text-align: center; padding: 5rem 2rem;
          color: var(--text-dim);
        }
        .empty-state-symbol { font-size: 2.5rem; margin-bottom: 1rem; opacity: 0.35; }
        .empty-state-title {
          font-family: 'Cinzel', serif;
          font-size: 1rem; letter-spacing: 0.1em;
          margin-bottom: 0.5rem; color: var(--text-dim);
        }
        .empty-state-sub { font-style: italic; font-size: 0.9rem; opacity: 0.6; }

        /* ── ROLL BLOCK ── */
        .roll-block { margin-bottom: 2.5rem; animation: fadeSlideIn 0.45s ease forwards; }

        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .roll-block-header {
          display: flex; align-items: center; gap: 0.8rem;
          margin-bottom: 1.1rem;
        }
        .roll-number {
          font-family: 'Cinzel', serif;
          font-size: 0.65rem; letter-spacing: 0.25em;
          color: var(--gold-dim); text-transform: uppercase;
          white-space: nowrap;
        }
        .roll-time { font-size: 0.72rem; color: var(--text-dim); font-style: italic; }
        .roll-rule { flex: 1; height: 1px; background: linear-gradient(90deg, rgba(201,147,58,0.18), transparent); }

        .roll-cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(195px, 1fr));
          gap: 1rem;
        }

        /* ── CARD ── */
        .card-wrapper {
          height: 310px;
          perspective: 1000px;
          cursor: pointer;
          transition: transform 0.2s;
        }
        .card-wrapper:hover:not(.flipped) { transform: translateY(-5px) scale(1.015); }

        .card-inner {
          position: relative; width: 100%; height: 100%;
          transform-style: preserve-3d;
          transition: transform 0.65s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .card-wrapper.flipped .card-inner { transform: rotateY(180deg); }

        .card-face {
          position: absolute; inset: 0;
          backface-visibility: hidden;
          border-radius: 7px; overflow: hidden;
        }

        .card-back {
          background: #0f0c09;
          border: 1px solid var(--deck-color);
          display: flex; flex-direction: column;
          align-items: center; justify-content: center; gap: 0.6rem;
          box-shadow: 0 6px 24px rgba(0,0,0,0.7);
        }
        .card-back-pattern {
          position: absolute; inset: 0;
          background-image:
            repeating-linear-gradient(45deg, transparent, transparent 8px, rgba(255,255,255,0.007) 8px, rgba(255,255,255,0.007) 9px),
            repeating-linear-gradient(-45deg, transparent, transparent 8px, rgba(255,255,255,0.007) 8px, rgba(255,255,255,0.007) 9px);
          border-radius: 6px;
        }
        .card-back-symbol {
          font-size: 2.2rem;
          color: var(--deck-color);
          filter: drop-shadow(0 0 14px var(--deck-color));
          opacity: 0.75; position: relative;
        }
        .card-back-label {
          font-family: 'Cinzel', serif;
          font-size: 0.58rem; letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--deck-color); opacity: 0.5; position: relative;
        }
        .card-back-border {
          position: absolute; inset: 7px;
          border: 1px solid rgba(201,147,58,0.1);
          border-radius: 4px; pointer-events: none;
        }
        .card-back-hint {
          position: absolute; bottom: 10px;
          font-size: 0.58rem; font-style: italic;
          color: var(--deck-color); opacity: 0.3;
          letter-spacing: 0.05em;
        }

        .card-front {
          transform: rotateY(180deg);
          background: linear-gradient(155deg, #1c1508 0%, #0e0b07 100%);
          border: 1px solid var(--deck-color);
          padding: 0.9rem 0.85rem 0.85rem;
          display: flex; flex-direction: column; gap: 0.45rem;
          box-shadow: 0 6px 28px rgba(0,0,0,0.75);
        }
        .card-front-glow {
          position: absolute; inset: 0;
          background: radial-gradient(ellipse 80% 40% at 50% 0%, rgba(201,147,58,0.07) 0%, transparent 70%);
          pointer-events: none; border-radius: 6px;
        }
        .card-front-header {
          display: flex; justify-content: space-between; align-items: center;
        }
        .card-deck-label {
          font-family: 'Cinzel', serif;
          font-size: 0.58rem; letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--deck-accent); opacity: 0.65;
        }
        .card-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--deck-color), transparent);
          opacity: 0.3;
        }
        .card-title {
          font-family: 'Cinzel', serif;
          font-size: 0.88rem; font-weight: 600;
          color: var(--deck-accent);
          line-height: 1.3;
          text-shadow: 0 0 18px rgba(245,201,122,0.25);
        }
        .card-body {
          font-size: 0.79rem; line-height: 1.58;
          color: var(--parchment-dark);
          flex: 1; overflow: hidden;
          font-style: italic;
        }
        .card-save-btn {
          background: transparent;
          border: 1px solid var(--deck-color);
          color: var(--deck-accent);
          font-family: 'Cinzel', serif;
          font-size: 0.58rem; letter-spacing: 0.15em;
          text-transform: uppercase;
          padding: 0.38rem 0.7rem;
          cursor: pointer; transition: all 0.2s;
          border-radius: 2px; align-self: flex-end; margin-top: 2px;
        }
        .card-save-btn:hover { background: rgba(201,147,58,0.14); box-shadow: 0 0 10px rgba(201,147,58,0.18); }
        .card-save-btn.saved { border-color: var(--gold-dim); color: var(--gold-dim); opacity: 0.55; cursor: default; }
        .card-save-btn.sparkle { animation: sparkleAnim 0.5s ease; }

        @keyframes sparkleAnim {
          0% { box-shadow: 0 0 0 rgba(245,201,122,0); }
          50% { box-shadow: 0 0 18px rgba(245,201,122,0.55); background: rgba(201,147,58,0.28); }
          100% { box-shadow: 0 0 0 rgba(245,201,122,0); }
        }

        /* ── HISTORY ── */
        .history-sep {
          display: flex; align-items: center; gap: 1rem;
          margin: 0.5rem 0 2rem;
        }
        .history-sep-rule { flex: 1; height: 1px; background: rgba(201,147,58,0.08); }
        .history-sep-label { font-size: 0.68rem; color: var(--text-dim); font-style: italic; }

        /* ── MESA ── */
        .mesa-header { margin-bottom: 1.8rem; }
        .mesa-title {
          font-family: 'Cinzel Decorative', serif;
          font-size: 1.15rem; color: var(--gold); margin-bottom: 0.3rem;
        }
        .mesa-sub { font-size: 0.88rem; color: var(--text-dim); font-style: italic; }

        .saved-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(245px, 1fr));
          gap: 1.1rem;
        }

        .saved-card {
          background: linear-gradient(145deg, #1a1208, #100d08);
          border: 1px solid var(--deck-color);
          border-radius: 6px; padding: 1.1rem;
          display: flex; flex-direction: column; gap: 0.5rem;
          position: relative;
          animation: fadeSlideIn 0.35s ease forwards;
          box-shadow: 0 4px 18px rgba(0,0,0,0.5);
        }
        .saved-card::before {
          content: '';
          position: absolute; inset: 0;
          background: radial-gradient(ellipse 80% 40% at 50% 0%, rgba(201,147,58,0.06) 0%, transparent 70%);
          pointer-events: none; border-radius: 5px;
        }
        .saved-card-top { display: flex; align-items: center; gap: 0.5rem; }
        .saved-deck-symbol { font-size: 0.95rem; color: var(--deck-color); }
        .saved-deck-label {
          font-family: 'Cinzel', serif;
          font-size: 0.58rem; letter-spacing: 0.2em;
          text-transform: uppercase; color: var(--deck-accent); opacity: 0.65; flex: 1;
        }
        .saved-remove {
          background: none; border: none; color: var(--text-dim);
          cursor: pointer; font-size: 0.78rem;
          padding: 0.1rem 0.3rem; transition: color 0.2s;
        }
        .saved-remove:hover { color: #c04040; }
        .saved-card-title {
          font-family: 'Cinzel', serif;
          font-size: 0.88rem; font-weight: 600;
          color: var(--deck-accent); line-height: 1.3;
        }
        .saved-card-body {
          font-size: 0.82rem; line-height: 1.56;
          color: var(--parchment-dark); font-style: italic;
        }

        /* ── ROLLING DOTS ── */
        .rolling-dots { display: flex; gap: 0.35rem; justify-content: center; }
        .rolling-dot {
          width: 5px; height: 5px;
          background: var(--gold); border-radius: 50%;
          animation: blink 1s infinite;
        }
        .rolling-dot:nth-child(2) { animation-delay: 0.2s; }
        .rolling-dot:nth-child(3) { animation-delay: 0.4s; }
        @keyframes blink { 0%,100% { opacity: 0.2; } 50% { opacity: 1; } }

        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: var(--bg); }
        ::-webkit-scrollbar-thumb { background: var(--gold-dim); border-radius: 3px; }
      `}</style>

      <div className="bg-texture" />

      {/* HEADER */}
      <header className="header">
        <div className="header-eyebrow">✦ El Oráculo ✦</div>
        <h1 className="header-title">La Forja de Personajes</h1>
        <p className="header-sub">Cada tirada revela el nacimiento de una nueva historia</p>
        <div className="header-ornament">
          <div className="orn-line" />
          <span className="orn-diamond">◆</span>
          <div className="orn-line r" />
        </div>
      </header>

      {/* CONTROLS */}
      <div className="controls">
        <button className="roll-btn" onClick={handleRoll} disabled={rolling}>
          {rolling
            ? <div className="rolling-dots"><div className="rolling-dot"/><div className="rolling-dot"/><div className="rolling-dot"/></div>
            : <span>✦ &nbsp;Tirar las Cartas</span>
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

      {/* DECK FILTER */}
      {showFilters && (
        <DeckFilter activeDecks={activeDecks} onToggle={handleToggleDeck} />
      )}

      {/* TABS */}
      <div className="tabs">
        <button className={`tab-btn ${activeTab === "tiradas" ? "active" : ""}`} onClick={() => setActiveTab("tiradas")}>
          Tiradas {rolls.length > 0 && <span className="tab-badge">{rolls.length}</span>}
        </button>
        <button className={`tab-btn ${activeTab === "mesa" ? "active" : ""}`} onClick={() => setActiveTab("mesa")}>
          Mi Mesa {savedCards.length > 0 && <span className="tab-badge">{savedCards.length}</span>}
        </button>
      </div>

      {/* CONTENT */}
      <main className="main-content">
        {activeTab === "tiradas" && (
          <>
            {rolls.length === 0 ? (
              <div className="empty-state">
                <div className="empty-state-symbol">✦</div>
                <div className="empty-state-title">El grimorio aguarda</div>
                <p className="empty-state-sub">Pulsa "Tirar las Cartas" para revelar tu primera combinación</p>
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
                        cardIndex={cardIdx}
                        isNew={rollIdx === 0}
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
                <div className="empty-state-symbol">⚗</div>
                <div className="empty-state-title">La mesa está vacía</div>
                <p className="empty-state-sub">Rescata cartas de tus tiradas para construir tu personaje</p>
              </div>
            ) : (
              <>
                <div className="mesa-header">
                  <div className="mesa-title">Tu Personaje</div>
                  <p className="mesa-sub">Las cartas que elegiste para construir tu historia</p>
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
