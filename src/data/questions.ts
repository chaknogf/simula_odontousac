/**
 * Banco de preguntas del Simulador FOUSAC 2026.
 *
 * Contenido basado en la guía oficial de la Prueba de Admisión (PAIFO) de la
 * Facultad de Odontología y en los programas de bachillerato de cada área.
 * Cada subprueba incluye su tiempo oficial de referencia.
 */

export interface Question {
  text: string;
  options: string[];
  /** Índice de la opción correcta dentro de `options`. */
  correct: number;
  explanation: string;
  /** Figura SVG opcional para el enunciado (Comprensión Espacial). */
  figure?: string;
  /** Figuras SVG opcionales, una por opción (Comprensión Espacial). */
  optionFigures?: string[];
}

export interface Section {
  id: string;
  name: string;
  /** Nombre corto para las pestañas del examen. */
  short: string;
  /** Tiempo oficial de la subprueba, en minutos. */
  officialTime: number;
  description: string;
  questions: Question[];
}

/* ------------------------------------------------------------------ */
/* Utilidades para generar figuras SVG (Comprensión Espacial)          */
/* ------------------------------------------------------------------ */

type Transform = 'none' | 'mirror' | 'rot90' | 'rot180' | 'rot270';

function transformPoints(pts: [number, number][], t: Transform): [number, number][] {
  return pts.map(([x, y]): [number, number] => {
    switch (t) {
      case 'mirror':
        return [100 - x, y];
      case 'rot90':
        return [y, 100 - x];
      case 'rot180':
        return [100 - x, 100 - y];
      case 'rot270':
        return [100 - y, x];
      default:
        return [x, y];
    }
  });
}

function svgWrap(inner: string): string {
  return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" class="fig" role="img">${inner}</svg>`;
}

function rectSvg(x: number, y: number, w: number, h: number, fill: string, t: Transform = 'none'): string {
  const pts = transformPoints(
    [
      [x, y],
      [x + w, y],
      [x + w, y + h],
      [x, y + h],
    ],
    t,
  );
  const xs = pts.map((p) => p[0]);
  const ys = pts.map((p) => p[1]);
  const minX = Math.min(...xs);
  const minY = Math.min(...ys);
  return `<rect x="${minX}" y="${minY}" width="${Math.max(...xs) - minX}" height="${Math.max(...ys) - minY}" fill="${fill}"/>`;
}

function polySvg(pts: [number, number][], fill: string, t: Transform = 'none'): string {
  const p = transformPoints(pts, t)
    .map(([x, y]) => `${x},${y}`)
    .join(' ');
  return `<polygon points="${p}" fill="${fill}"/>`;
}

function circleSvg(cx: number, cy: number, r: number, fill: string, t: Transform = 'none'): string {
  const [x, y] = transformPoints([[cx, cy]], t)[0];
  return `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}"/>`;
}

const PURPLE = '#4b2e8f';
const LILAC = '#9b83e8';
const AMBER = '#ffb74d';
const HOLE = '#12141d';
const TEMPLATE = '#e2e8f0';

/** Casa: cuadrado + tejado + círculo (para pruebas de reflejo). */
const house = (t: Transform = 'none'): string =>
  svgWrap(rectSvg(25, 45, 40, 40, PURPLE, t) + polySvg([[25, 45], [45, 25], [65, 45]], LILAC, t) + circleSvg(55, 60, 5, AMBER, t));

/** Letra L (para pruebas de rotación). */
const ell = (t: Transform = 'none'): string =>
  svgWrap(rectSvg(20, 20, 20, 60, PURPLE, t) + rectSvg(20, 60, 60, 20, PURPLE, t));

/** Cruz (para la prueba de encajar en plantilla). */
const cross = (t: Transform = 'none'): string =>
  svgWrap(rectSvg(42, 25, 16, 50, PURPLE, t) + rectSvg(25, 42, 50, 16, PURPLE, t));

const templateCross = (): string =>
  svgWrap(rectSvg(10, 10, 80, 80, TEMPLATE) + rectSvg(42, 25, 16, 50, HOLE) + rectSvg(25, 42, 50, 16, HOLE));

const circleFig = (): string => svgWrap(circleSvg(50, 50, 25, PURPLE));
const squareFig = (): string => svgWrap(rectSvg(25, 25, 50, 50, PURPLE));
const triangleFig = (): string => svgWrap(polySvg([[50, 25], [75, 75], [25, 75]], PURPLE));
const starFig = (): string =>
  svgWrap(polySvg([[50, 20], [61, 40], [82, 40], [66, 53], [72, 74], [50, 61], [28, 74], [34, 53], [18, 40], [39, 40]], PURPLE));

/* ------------------------------------------------------------------ */
/* Subpruebas                                                          */
/* ------------------------------------------------------------------ */

export const sections: Section[] = [
  {
    id: 'biologia',
    name: 'Biología',
    short: 'Biología',
    officialTime: 25,
    description: 'Seres vivos, biomoléculas, célula, genética y ecología.',
    questions: [
      {
        text: '¿Cuál NO es una característica de los seres vivos?',
        options: ['Metabolismo', 'Reproducción', 'Respuesta a estímulos', 'Ser siempre unicelulares'],
        correct: 3,
        explanation: 'Hay seres vivos unicelulares y pluricelulares.',
      },
      {
        text: 'Reino de organismos eucariotas, heterótrofos por absorción y con pared celular de quitina:',
        options: ['Plantae', 'Fungi', 'Animalia', 'Monera'],
        correct: 1,
        explanation: 'Es el reino Fungi (hongos).',
      },
      {
        text: 'El enlace entre el oxígeno y los hidrógenos en la molécula de agua es:',
        options: ['iónico', 'metálico', 'covalente polar', 'de hidrógeno'],
        correct: 2,
        explanation: 'Comparten electrones de forma desigual; el enlace de hidrógeno es entre moléculas.',
      },
      {
        text: 'La cohesión del agua se debe a:',
        options: ['puentes de hidrógeno', 'enlaces iónicos', 'enlaces peptídicos', 'fuerzas nucleares'],
        correct: 0,
        explanation: 'Las moléculas se atraen entre sí por puentes de hidrógeno.',
      },
      {
        text: 'El carbohidrato de reserva energética en los animales es:',
        options: ['almidón', 'celulosa', 'quitina', 'glucógeno'],
        correct: 3,
        explanation: 'El almidón es de reserva en plantas; el glucógeno, en animales.',
      },
      {
        text: 'Los monómeros de las proteínas son:',
        options: ['nucleótidos', 'monosacáridos', 'ácidos grasos', 'aminoácidos'],
        correct: 3,
        explanation: 'Los aminoácidos se unen por enlaces peptídicos.',
      },
      {
        text: '¿Qué ácido nucleico contiene la base nitrogenada timina?',
        options: ['ARN', 'ATP', 'ADN', 'ARNm'],
        correct: 2,
        explanation: 'El ARN tiene uracilo en lugar de timina.',
      },
      {
        text: 'Una solución con pH = 3 es:',
        options: ['básica', 'neutra', 'ácida', 'un tampón perfecto'],
        correct: 2,
        explanation: 'pH < 7 es ácido, 7 neutro y > 7 básico.',
      },
      {
        text: 'La molécula orgánica que forma la bicapa de la membrana celular es:',
        options: ['el fosfolípido', 'la glucosa', 'el ADN', 'el glucógeno'],
        correct: 0,
        explanation: 'El fosfolípido tiene cabeza hidrofílica y colas hidrofóbicas.',
      },
      {
        text: '¿Cuál es un factor abiótico del ambiente?',
        options: ['Un hongo', 'Una bacteria', 'La temperatura', 'Un depredador'],
        correct: 2,
        explanation: 'Los factores abióticos no tienen vida (luz, temperatura, agua).',
      },
      {
        text: 'El organelo donde se produce la mayor parte del ATP es:',
        options: ['el ribosoma', 'la mitocondria', 'el aparato de Golgi', 'el lisosoma'],
        correct: 1,
        explanation: 'La mitocondria es la «central energética» de la célula.',
      },
      {
        text: 'Una célula procariota se caracteriza por carecer de:',
        options: ['membrana plasmática', 'ribosomas', 'material genético', 'núcleo delimitado por membrana'],
        correct: 3,
        explanation: 'Su ADN está en el nucleoide, sin membrana nuclear.',
      },
      {
        text: 'Del cruce Aa × Aa (A dominante), la proporción fenotípica esperada es:',
        options: ['1:1', '3:1', '1:2:1', '9:3:3:1'],
        correct: 1,
        explanation: 'AA, Aa y Aa muestran el rasgo dominante; aa el recesivo → 3:1.',
      },
      {
        text: 'Las condiciones para que se realice la fotosíntesis son:',
        options: ['luz y agua', 'luz y clorofila', 'luz y oxígeno', 'luz y dióxido de carbono'],
        correct: 1,
        explanation: 'La fotosíntesis requiere luz y clorofila (además de CO₂ y agua).',
      },
      {
        text: 'Grupo de individuos de una misma especie que viven en un área determinada:',
        options: ['comunidad', 'población', 'mutualismo', 'comensalismo'],
        correct: 1,
        explanation: 'Una población es un grupo de individuos de la misma especie en un área y tiempo dados.',
      },
      {
        text: 'La tamización es un procedimiento que se utiliza para:',
        options: [
          'separar mezclas formadas por partículas de diferentes tamaños',
          'separar mezclas haciendo pasar una corriente de agua',
          'separar mezclas sólido-sólido con un imán',
          'hacer pasar un líquido a través de una estructura porosa',
        ],
        correct: 0,
        explanation: 'La tamización separa partículas según su tamaño mediante tamices.',
      },
      {
        text: 'La función del ATP en la fotosíntesis es:',
        options: [
          'almacenar energía eléctrica',
          'transportar energía química',
          'transportar moléculas de oxígeno',
          'almacenar y transportar energía',
        ],
        correct: 3,
        explanation: 'El ATP almacena y transporta energía química para las reacciones del ciclo de Calvin.',
      },
      {
        text: 'La teoría cromosómica de la herencia establece que:',
        options: [
          'los cromosomas son los portadores de los genes',
          'los cromosomas se encuentran en el citoplasma',
          'los genes son proteínas',
          'los cromosomas solo aparecen en la mitosis',
        ],
        correct: 0,
        explanation: 'Sutton y Boveri propusieron que los genes se localizan en los cromosomas.',
      },
      {
        text: 'La respiración celular ocurre principalmente en:',
        options: ['el núcleo', 'la mitocondria', 'el ribosoma', 'el retículo endoplasmático'],
        correct: 1,
        explanation: 'La mitocondria es donde se produce la mayor parte del ATP mediante respiración celular.',
      },
      {
        text: 'Un ecosistema está formado por:',
        options: [
          'solo seres vivos',
          'solo factores abióticos',
          'seres vivos y factores abióticos',
          'solo plantas y animales',
        ],
        correct: 2,
        explanation: 'El ecosistema incluye la comunidad (biótico) y el ambiente físico (abiótico).',
      },
    ],
  },
  {
    id: 'quimica',
    name: 'Química',
    short: 'Química',
    officialTime: 25,
    description: 'Materia, mediciones, átomos, tabla periódica, nomenclatura y soluciones.',
    questions: [
      {
        text: '¿Cuántos mL hay en 2,5 L?',
        options: ['250 mL', '25 mL', '2.500 mL', '25.000 mL'],
        correct: 2,
        explanation: '1 L = 1.000 mL; 2,5 × 1.000 = 2.500 mL.',
      },
      {
        text: 'Un centímetro cúbico (cc) equivale a:',
        options: ['1 mL', '10 mL', '0,1 mL', '1 L'],
        correct: 0,
        explanation: '1 cc = 1 cm³ = 1 mL.',
      },
      {
        text: 'Una sustancia tiene masa de 50 g y ocupa 40 mL. Su densidad es:',
        options: ['0,8 g/mL', '1,25 g/mL', '2,0 g/mL', '1,50 g/mL'],
        correct: 1,
        explanation: 'd = m/V = 50/40 = 1,25 g/mL.',
      },
      {
        text: '86 °F equivalen a:',
        options: ['25 °C', '35 °C', '30 °C', '40 °C'],
        correct: 2,
        explanation: '°C = (°F − 32) × 5/9 = 54 × 5/9 = 30 °C.',
      },
      {
        text: '25 °C expresados en kelvin son:',
        options: ['248 K', '273 K', '25 K', '298 K'],
        correct: 3,
        explanation: 'K = °C + 273 → 298 K.',
      },
      {
        text: '¿Cuál es una mezcla homogénea?',
        options: ['Arena y agua', 'Agua con sal disuelta', 'Aceite y agua', 'Ensalada de frutas'],
        correct: 1,
        explanation: 'La salmuera tiene una sola fase uniforme (disolución).',
      },
      {
        text: '¿Cuál de los siguientes es un cambio químico?',
        options: ['Fundición del hielo', 'Evaporación del agua', 'Oxidación de un clavo de hierro', 'Romper un vidrio'],
        correct: 2,
        explanation: 'La oxidación forma una sustancia nueva (óxido); los otros son cambios físicos.',
      },
      {
        text: 'En el estado gaseoso, las partículas:',
        options: [
          'están muy juntas y fijas',
          'están muy separadas y se mueven libremente',
          'están juntas pero deslizan',
          'están ordenadas en una red',
        ],
        correct: 1,
        explanation: 'Un gas no tiene forma ni volumen propios.',
      },
      {
        text: 'La partícula subatómica con carga eléctrica negativa es:',
        options: ['protón', 'neutrón', 'electrón', 'núcleo'],
        correct: 2,
        explanation: 'Protón (+), neutrón (0), electrón (−).',
      },
      {
        text: 'Los isótopos de un elemento tienen igual número de:',
        options: ['neutrones', 'protones', 'masa atómica', 'nucleones'],
        correct: 1,
        explanation: 'Difieren en neutrones, por lo que cambia su masa.',
      },
      {
        text: 'La masa molar del H₂O (H = 1, O = 16) es:',
        options: ['17 g/mol', '16 g/mol', '20 g/mol', '18 g/mol'],
        correct: 3,
        explanation: '2(1) + 16 = 18 g/mol.',
      },
      {
        text: 'Los elementos del grupo 17 (F, Cl, Br, I) se conocen como:',
        options: ['halógenos', 'gases nobles', 'metales alcalinos', 'alcalinotérreos'],
        correct: 0,
        explanation: 'Grupo 17 = halógenos.',
      },
      {
        text: 'El número de oxidación del azufre en H₂SO₄ es:',
        options: ['+2', '+4', '+6', '−2'],
        correct: 2,
        explanation: '2(+1) + S + 4(−2) = 0 → S = +6.',
      },
      {
        text: 'El Fe₂O₃ se nombra, según el sistema Stock, como:',
        options: ['óxido ferroso', 'óxido de hierro (III)', 'óxido de hierro (II)', 'trióxido de dihierro'],
        correct: 1,
        explanation: 'El Fe tiene +3 en Fe₂O₃. «Trióxido de dihierro» es el sistema estequiométrico.',
      },
      {
        text: 'El número de moléculas de agua contenidas en dos moles de agua es:',
        options: ['6,02·10²³', '1,20·10²⁴', '3,01·10²³', '2,01·10²⁴'],
        correct: 1,
        explanation: '2 mol × 6,02·10²³ moléculas/mol = 1,20·10²⁴ moléculas.',
      },
      {
        text: 'Los elementos de transición interna se caracterizan porque sus electrones de máxima energía llenan los orbitales:',
        options: ['s', 'p', 'd', 'f'],
        correct: 3,
        explanation: 'Los lantánidos y actínidos (transición interna) llenan orbitales f.',
      },
      {
        text: 'En el punto de fusión de un material coexisten las fases:',
        options: ['sólida y líquida', 'líquida y gaseosa', 'sólida y gaseosa', 'sólida, líquida y gaseosa'],
        correct: 0,
        explanation: 'En el punto de fusión coexisten en equilibrio las fases sólida y líquida.',
      },
      {
        text: 'Una solución al 17% m/m contiene:',
        options: [
          '17 g de soluto y 100 g de solución',
          '17 g de soluto y 100 cm³ de solución',
          '83 g de solvente y 100 cm³ de solución',
          '17 g de solvente y 100 g de solución',
        ],
        correct: 0,
        explanation: '% m/m = (masa de soluto / masa de solución) × 100 → 17 g de soluto en 100 g de solución.',
      },
      {
        text: 'La masa de plata que se deposita en el cátodo al pasar 3 A durante 10 min por una solución de AgNO₃ es: (Ag = 107,87 g/mol; F = 96.500 C)',
        options: ['1 g', '2 g', '3 g', '4 g'],
        correct: 1,
        explanation: 'm = (I·t·M)/(n·F) = (3 · 600 · 107,87)/(1 · 96.500) ≈ 2,02 g.',
      },
      {
        text: 'El número cuántico secundario (l) es 3 en el electrón diferencial de:',
        options: ['5s²', '6p⁶', '3p⁵', '4f⁷'],
        correct: 3,
        explanation: 'l = 3 corresponde al subnivel f; en 4f⁷ el electrón diferencial ocupa un orbital f.',
      },
    ],
  },
  {
    id: 'fisica',
    name: 'Física',
    short: 'Física',
    officialTime: 30,
    description: 'Cinemática, dinámica, energía, electricidad, óptica y ondas.',
    questions: [
      {
        text: 'En un lanzamiento inclinado, la velocidad en el punto más alto de la trayectoria es:',
        options: [
          'igual a la componente vertical de la velocidad',
          'igual a la componente horizontal de la velocidad',
          'distinta a la componente horizontal de la velocidad',
          'no hay velocidad',
        ],
        correct: 1,
        explanation: 'En el punto más alto la componente vertical es cero; solo queda la componente horizontal.',
      },
      {
        text: '¿Con qué velocidad debe ser lanzada verticalmente hacia arriba una pelota para alcanzar una altura de 15,3 m? (g = 10 m/s²)',
        options: ['17,3 m/s', '17,5 m/s', '17,0 m/s', '18,0 m/s'],
        correct: 1,
        explanation: 'v = √(2gh) = √(2 · 10 · 15,3) = √306 ≈ 17,5 m/s.',
      },
      {
        text: 'El índice de refracción absoluto del agua es 1,33 y el del vidrio 1,5. El índice de refracción relativo del vidrio con respecto al agua es:',
        options: ['1,12', '1,52', '1,62', '0,89'],
        correct: 0,
        explanation: 'n_vidrio/agua = n_vidrio / n_agua = 1,5 / 1,33 ≈ 1,12.',
      },
      {
        text: 'Un alambre tiene una resistencia de 30 ohms y está atravesado por una corriente de 5 A. ¿Cuál es el calor que desprende en 50 s?',
        options: ['9.000 cal', '1.800 cal', '18.000 cal', '900 cal'],
        correct: 0,
        explanation: 'Q = I²Rt = 25 · 30 · 50 = 37.500 J ≈ 9.000 cal (1 cal ≈ 4,186 J).',
      },
      {
        text: 'Dos cuerpos A y B, antes de chocar, tienen una cantidad de movimiento total de 12 kg·m/s. Después del choque el centro de masa tiene una velocidad de 5 m/s. Si la masa de A es 2 kg, ¿cuál es la masa de B?',
        options: ['0,4 kg', '4 kg', '2 kg', '0,2 kg'],
        correct: 0,
        explanation: 'm_total = p/v = 12/5 = 2,4 kg; m_B = 2,4 − 2 = 0,4 kg.',
      },
      {
        text: '¿Cuál es la fuerza gravitatoria entre dos cuerpos de 9 kg y 5 kg separados 2 m en el vacío? (G = 6,67·10⁻¹¹ N·m²/kg²)',
        options: ['7,5·10⁻¹⁰ N', '7,5·10⁻¹¹ N', '2,3·10⁻¹⁰ N', '1,5·10⁻⁹ N'],
        correct: 0,
        explanation: 'F = G·m₁m₂/r² = 6,67·10⁻¹¹ · 45 / 4 ≈ 7,5·10⁻¹⁰ N.',
      },
      {
        text: 'Un móvil recorre 100 m en 10 s con velocidad constante. Su rapidez es:',
        options: ['10 m/s', '100 m/s', '1 m/s', '20 m/s'],
        correct: 0,
        explanation: 'v = d/t = 100/10 = 10 m/s.',
      },
      {
        text: 'La aceleración de la gravedad en la Tierra es aproximadamente:',
        options: ['9,8 m/s²', '8,9 m/s²', '9,8 km/s²', '10 km/h'],
        correct: 0,
        explanation: 'g ≈ 9,8 m/s² (se usa 10 m/s² en muchos cálculos).',
      },
      {
        text: 'Un cuerpo de 2 kg se mueve a 3 m/s. Su energía cinética es:',
        options: ['9 J', '6 J', '18 J', '3 J'],
        correct: 0,
        explanation: 'Ec = ½mv² = ½ · 2 · 9 = 9 J.',
      },
      {
        text: 'El principio de Arquímedes establece que todo cuerpo sumergido en un fluido experimenta un empuje:',
        options: [
          'igual al peso del fluido desalojado',
          'mayor que su propio peso',
          'igual a su masa',
          'dependiente de su forma',
        ],
        correct: 0,
        explanation: 'El empuje es igual al peso del fluido desalojado.',
      },
      {
        text: 'La unidad de fuerza en el Sistema Internacional es:',
        options: ['el julio', 'el newton', 'el vatio', 'el pascal'],
        correct: 1,
        explanation: 'La fuerza se mide en newtons (N).',
      },
      {
        text: 'Si un objeto duplica su velocidad, su energía cinética:',
        options: ['se duplica', 'se cuadruplica', 'se reduce a la mitad', 'no cambia'],
        correct: 1,
        explanation: 'Ec ∝ v²; al duplicar v, la energía cinética se cuadruplica.',
      },
      {
        text: 'La ley de Ohm establece que el voltaje (V) es igual a:',
        options: ['I·R', 'I/R', 'R/I', 'I²·R'],
        correct: 0,
        explanation: 'V = I·R.',
      },
      {
        text: 'Una onda tiene una frecuencia de 50 Hz y una longitud de onda de 2 m. Su velocidad es:',
        options: ['100 m/s', '25 m/s', '52 m/s', '0,04 m/s'],
        correct: 0,
        explanation: 'v = f·λ = 50 · 2 = 100 m/s.',
      },
      {
        text: 'El trabajo realizado por una fuerza de 10 N que desplaza un cuerpo 5 m en la misma dirección es:',
        options: ['50 J', '2 J', '15 J', '5 J'],
        correct: 0,
        explanation: 'W = F·d = 10 · 5 = 50 J.',
      },
      {
        text: 'La potencia se define como:',
        options: ['trabajo por tiempo', 'fuerza por distancia', 'masa por aceleración', 'energía por masa'],
        correct: 0,
        explanation: 'P = W/t.',
      },
      {
        text: 'Un espejo plano forma una imagen:',
        options: [
          'real, invertida y del mismo tamaño',
          'virtual, derecha y del mismo tamaño',
          'real, derecha y aumentada',
          'virtual, invertida y disminuida',
        ],
        correct: 1,
        explanation: 'El espejo plano forma una imagen virtual, derecha y del mismo tamaño.',
      },
      {
        text: 'La velocidad de la luz en el vacío es aproximadamente:',
        options: ['3·10⁸ m/s', '3·10⁶ m/s', '340 m/s', '1.500 m/s'],
        correct: 0,
        explanation: 'c ≈ 3·10⁸ m/s.',
      },
      {
        text: 'Si se aplica una fuerza de 20 N a un cuerpo de 4 kg, su aceleración es:',
        options: ['5 m/s²', '80 m/s²', '0,2 m/s²', '24 m/s²'],
        correct: 0,
        explanation: 'a = F/m = 20/4 = 5 m/s².',
      },
      {
        text: 'La energía potencial gravitatoria de un cuerpo de 1 kg a 10 m de altura es: (g = 10 m/s²)',
        options: ['100 J', '10 J', '1 J', '1.000 J'],
        correct: 0,
        explanation: 'Ep = mgh = 1 · 10 · 10 = 100 J.',
      },
    ],
  },
  {
    id: 'matematica',
    name: 'Matemática',
    short: 'Matemática',
    officialTime: 20,
    description: 'Aritmética, álgebra, geometría y razonamiento cuantitativo.',
    questions: [
      {
        text: 'Resuelve: 3 + 4 × 2 − 6 ÷ 3',
        options: ['9', '11', '7', '5'],
        correct: 0,
        explanation: 'Primero × y ÷: 3 + 8 − 2 = 9.',
      },
      {
        text: 'Simplifica: (2³ · 2⁴) ÷ 2⁵',
        options: ['2', '4', '8', '16'],
        correct: 1,
        explanation: '2⁷ ÷ 2⁵ = 2² = 4.',
      },
      {
        text: 'Simplifica: √48',
        options: ['6√2', '2√12', '4√3', '3√4'],
        correct: 2,
        explanation: '√48 = √(16·3) = 4√3.',
      },
      {
        text: 'Si 3 lápices cuestan Q9, ¿cuánto cuestan 8 lápices? (regla de tres directa)',
        options: ['Q27', 'Q21', 'Q18', 'Q24'],
        correct: 3,
        explanation: 'Cada lápiz cuesta Q3; 8 × 3 = Q24.',
      },
      {
        text: '6 obreros terminan una obra en 12 días. ¿En cuántos días la terminarían 9 obreros? (relación inversa)',
        options: ['18', '8', '9', '6'],
        correct: 1,
        explanation: '6 × 12 = 72; 72 ÷ 9 = 8 días.',
      },
      {
        text: 'Suma: (3x² + 2x − 5) + (x² − 4x + 7)',
        options: ['4x² − 2x + 2', '4x² + 6x + 2', '2x² − 2x + 2', '4x² − 2x − 2'],
        correct: 0,
        explanation: '3x² + x² = 4x²; 2x − 4x = −2x; −5 + 7 = 2.',
      },
      {
        text: 'Multiplica: (x + 3)(x − 5)',
        options: ['x² + 2x − 15', 'x² − 2x + 15', 'x² − 8x − 15', 'x² − 2x − 15'],
        correct: 3,
        explanation: 'x² − 5x + 3x − 15 = x² − 2x − 15.',
      },
      {
        text: 'Factoriza: x² − 9',
        options: ['(x − 3)²', '(x + 3)(x − 3)', '(x + 9)(x − 1)', '(x − 9)(x + 1)'],
        correct: 1,
        explanation: 'Diferencia de cuadrados: a² − b² = (a + b)(a − b).',
      },
      {
        text: 'Factoriza: x² + 5x + 6',
        options: ['(x + 1)(x + 6)', '(x − 2)(x − 3)', '(x + 2)(x + 3)', '(x + 5)(x + 1)'],
        correct: 2,
        explanation: 'Busca dos números que sumen 5 y multipliquen 6: 2 y 3.',
      },
      {
        text: 'Factoriza por factor común: 6x² + 9x',
        options: ['3x(2x + 3)', '6x(x + 9)', '3(2x² + 3x²)', 'x(6x + 9x)'],
        correct: 0,
        explanation: 'Factor común: 3x → 3x(2x + 3).',
      },
      {
        text: 'Escribe 45.000.000 en notación científica:',
        options: ['45 × 10⁶', '4,5 × 10⁶', '0,45 × 10⁷', '4,5 × 10⁷'],
        correct: 3,
        explanation: 'Se mueve la coma 7 lugares: 4,5 × 10⁷.',
      },
      {
        text: 'Calcula: (3 × 10⁴)(2 × 10³)',
        options: ['6 × 10⁷', '5 × 10⁷', '6 × 10¹²', '5 × 10¹²'],
        correct: 0,
        explanation: '3 × 2 = 6; 10⁴ · 10³ = 10⁷.',
      },
      {
        text: 'Divide: (x² − 5x + 6) ÷ (x − 2)',
        options: ['x + 3', 'x − 3', 'x − 2', 'x + 2'],
        correct: 1,
        explanation: 'x² − 5x + 6 = (x − 2)(x − 3).',
      },
      {
        text: 'Resuelve el sistema lineal:\n x + y = 10\n x − y = 4',
        options: ['x = 7, y = 3', 'x = 6, y = 4', 'x = 8, y = 2', 'x = 5, y = 5'],
        correct: 0,
        explanation: 'Sumando ambas ecuaciones: 2x = 14 → x = 7. Sustituyendo: 7 + y = 10 → y = 3.',
      },
      {
        text: 'Encuentra las raíces de la ecuación cuadrática:\n x² − 5x + 6 = 0',
        options: ['x = 1, x = 6', 'x = 2, x = 3', 'x = −2, x = −3', 'x = 0, x = 5'],
        correct: 1,
        explanation: 'Factorizando como (x − 2)(x − 3) = 0, las soluciones son x = 2 y x = 3.',
      },
      {
        text: 'Calcula el valor de log₂(32):',
        options: ['3', '4', '5', '6'],
        correct: 2,
        explanation: '2⁵ = 32, por lo tanto log₂(32) = 5.',
      },
      {
        text: 'En un triángulo rectángulo, si los catetos miden 3 cm y 4 cm, ¿cuánto mide la hipotenusa?',
        options: ['5 cm', '6 cm', '7 cm', '25 cm'],
        correct: 0,
        explanation: 'Teorema de Pitágoras: c = √(3² + 4²) = √25 = 5 cm.',
      },
      {
        text: 'Una compañía eléctrica paga Bs. 90.000 a dos pintores. Uno pintó 12 postes y su compañero 15. Si se reparte proporcionalmente al trabajo realizado, el primero recibe:',
        options: ['Bs. 40.000', 'Bs. 45.000', 'Bs. 72.000', 'Bs. 30.000'],
        correct: 0,
        explanation: 'Total: 27 postes; 12/27 × 90.000 = 40.000.',
      },
      {
        text: 'Un litro equivale a:',
        options: ['10 cm³', '1 dm³', '100 dm³', '100 cm³'],
        correct: 1,
        explanation: '1 L = 1 dm³ = 1.000 cm³.',
      },
      {
        text: 'Un artículo cuesta Bs. 200. Si se compra una docena con un descuento del 15%, ¿cuánto cuestan 12 docenas?',
        options: ['Bs. 24.480', 'Bs. 2.040', 'Bs. 4.320', 'Bs. 28.800'],
        correct: 0,
        explanation: 'Docena: 12 × 200 = 2.400; con 15 % de descuento: 2.040; 12 docenas: 24.480.',
      },
    ],
  },
  {
    id: 'verbal',
    name: 'Razonamiento Verbal',
    short: 'Verbal',
    officialTime: 20,
    description: 'Acentuación, sinónimos, analogías y ordenamiento de párrafos.',
    questions: [
      {
        text: '¿Cuál de las siguientes palabras es aguda y lleva tilde correctamente?',
        options: ['árbol', 'lápiz', 'mesa', 'papel'],
        correct: 1,
        explanation: '«Lápiz» es aguda terminada en z y lleva tilde; «árbol» es llana terminada en l y también lleva tilde, pero la pregunta pide una aguda.',
      },
      {
        text: '«Tea» es similar a:',
        options: ['antorcha', 'diosa', 'niña', 'amiga'],
        correct: 0,
        explanation: 'Tea = antorcha.',
      },
      {
        text: 'Libro es a biblioteca como:',
        options: ['serrucho es a taller', 'medicamento es a farmacia', 'planeta es a galaxia', 'llave es a puerta'],
        correct: 1,
        explanation: 'Los medicamentos se guardan en una farmacia, como los libros en una biblioteca.',
      },
      {
        text: 'Médico es a hospital como:',
        options: ['profesor es a escuela', 'coche es a carretera', 'alumno es a clase', 'libro es a biblioteca'],
        correct: 0,
        explanation: 'El médico trabaja en el hospital; el profesor, en la escuela.',
      },
      {
        text: 'Ordena lógicamente el párrafo: (1) Actualmente se tiende a limitar su empleo. (2) Las mayúsculas se diferencian por su uso restringido. (3) En otras épocas se abusó de las mayúsculas. (4) Contrasta este uso con el valor gramatical en otros idiomas.',
        options: ['2-3-4-1', '3-1-4-2', '1-2-3-4', '2-4-1-3'],
        correct: 0,
        explanation: 'El orden lógico es 2-3-4-1: definición, antecedente, contraste y situación actual.',
      },
      {
        text: '«Rápido» es a «veloz» como:',
        options: ['lento es a despacio', 'grande es a enorme', 'fuerte es a débil', 'feliz es a triste'],
        correct: 1,
        explanation: 'Rápido y veloz son sinónimos; grande y enorme también.',
      },
      {
        text: '«Escasez» es a «abundancia» como:',
        options: ['pobreza es a riqueza', 'frío es a calor', 'noche es a día', 'todas las anteriores'],
        correct: 3,
        explanation: 'Todas las parejas son de antonimia (significado opuesto).',
      },
      {
        text: '«Pez» es a «agua» como:',
        options: ['pájaro es a aire', 'perro es a casa', 'gato es a leche', 'vaca es a campo'],
        correct: 0,
        explanation: 'El pez vive en el agua; el pájaro se desplaza en el aire.',
      },
      {
        text: '«Brillante» es a:',
        options: ['opaco', 'luminoso', 'oscuro', 'mate'],
        correct: 1,
        explanation: 'Brillante = luminoso.',
      },
      {
        text: 'Selecciona la opción que completa correctamente: «El sol ___ en el este.»',
        options: ['sale', 'sal', 'salió', 'saldrá'],
        correct: 0,
        explanation: 'Presente de indicativo: «el sol sale en el este».',
      },
      {
        text: '«Doctor» es a «medicina» como:',
        options: ['abogado es a leyes', 'ingeniero es a obras', 'arquitecto es a planos', 'todas las anteriores'],
        correct: 3,
        explanation: 'Todas las parejas relacionan al profesional con su área de conocimiento.',
      },
      {
        text: '¿Cuál de estas oraciones está correctamente puntuada?',
        options: [
          '«Vino, se sentó y leyó.»',
          '«Vino se sentó, y leyó.»',
          '«Vino, se sentó, y, leyó.»',
          '«Vino se sentó y, leyó.»',
        ],
        correct: 0,
        explanation: 'La coma separa los elementos de una enumeración; no se usa coma antes de la conjunción «y» en una serie simple.',
      },
    ],
  },
  {
    id: 'logica',
    name: 'Razonamiento Lógico',
    short: 'Lógico',
    officialTime: 20,
    description: 'Proposiciones, series, problemas de lógica y razonamiento básico.',
    questions: [
      {
        text: '¿Cuál de las siguientes expresiones no es una proposición?',
        options: ['Dos más dos es igual a cuatro', '4 es un número natural', '3 + 5 − 2', '2 + 2 = 4'],
        correct: 2,
        explanation: '«3 + 5 − 2» es una expresión numérica, no una proposición, porque no se puede afirmar si es verdadera o falsa.',
      },
      {
        text: '¿Cuál es la negación de la proposición «Todos los caminos llegan a Roma»?',
        options: [
          'Ningún camino llega a Roma',
          'Existe un camino que no llega a Roma',
          'El camino que no llega a Roma es azul',
          'Aquel camino no llega a Roma',
        ],
        correct: 1,
        explanation: 'La negación de «todos» es «existe al menos uno que no».',
      },
      {
        text: 'Arturo y Benito tienen la misma cantidad de dinero. ¿Cuánto tiene que dar Arturo a Benito para que Benito tenga 10 Bs más que Arturo?',
        options: ['2', '5', '10', '20'],
        correct: 1,
        explanation: 'Si Arturo da 5, él queda con −5 y Benito con +5: la diferencia es de 10.',
      },
      {
        text: '¿Cuál es el mínimo número de colores para pintar un cubo de forma que dos caras adyacentes no tengan el mismo color?',
        options: ['2', '4', '3', '6'],
        correct: 2,
        explanation: 'Bastan 3 colores: las caras opuestas pueden compartir color.',
      },
      {
        text: 'Un prisionero está en una celda con dos guardianes: uno dice siempre la verdad y otro siempre miente. Hay dos puertas: la de la libertad y la de la esclavitud. ¿Qué pregunta puede salvar al prisionero?',
        options: [
          'Preguntar a un guardia: ¿cuál es la puerta de la libertad?',
          'Preguntar al guardia que dice la verdad: ¿cuál es la puerta de la libertad?',
          'Preguntar al guardia que miente: ¿cuál es la puerta de la libertad?',
          'Preguntar a un guardia: ¿qué contestaría tu compañero si le pido que me señale la puerta de la libertad?',
        ],
        correct: 3,
        explanation: 'La respuesta obtenida será la puerta equivocada; eligiendo la puerta contraria, el prisionero gana la libertad.',
      },
      {
        text: '¿Qué número sigue en la serie? 2, 4, 8, 16, __',
        options: ['24', '32', '20', '30'],
        correct: 1,
        explanation: 'Cada término se duplica: 2 × 16 = 32.',
      },
      {
        text: '¿Qué número sigue en la serie? 3, 6, 11, 18, __',
        options: ['27', '25', '26', '29'],
        correct: 0,
        explanation: 'Las diferencias son 3, 5, 7, 9 → 18 + 9 = 27.',
      },
      {
        text: 'Todos los perros son animales. Algunos animales son negros. Entonces:',
        options: [
          'Todos los perros son negros',
          'Algunos perros pueden ser negros',
          'Ningún perro es negro',
          'No se puede concluir nada',
        ],
        correct: 1,
        explanation: 'De las premisas solo se puede concluir que algunos perros pueden ser negros.',
      },
      {
        text: 'Si A > B y B > C, entonces:',
        options: ['A > C', 'C > A', 'A = C', 'No se puede saber'],
        correct: 0,
        explanation: 'Por la propiedad transitiva, A > C.',
      },
      {
        text: 'Si son las 3:15, ¿qué ángulo forman las manecillas del reloj?',
        options: ['0°', '7,5°', '15°', '30°'],
        correct: 1,
        explanation: 'La horaria está en 97,5° (90° + 7,5°) y la minutaria en 90°; la diferencia es 7,5°.',
      },
      {
        text: 'Tienes 3 monedas y una balanza. Una moneda es más pesada que las otras dos. ¿Cuántas pesadas necesitas como mínimo para encontrarla?',
        options: ['1', '2', '3', '4'],
        correct: 0,
        explanation: 'Con una pesada (1 contra 1) basta: si se equilibran, la pesada es la tercera; si no, es la que baja.',
      },
      {
        text: 'Si soy hijo único, ¿quién es el hijo de mi padre?',
        options: ['mi primo', 'yo', 'mi hermano', 'mi tío'],
        correct: 1,
        explanation: 'Si soy hijo único, el hijo de mi padre soy yo mismo.',
      },
    ],
  },
  {
    id: 'espacial',
    name: 'Comprensión Espacial',
    short: 'Espacial',
    officialTime: 15,
    description: 'Reflejos, rotaciones, plantillas y relaciones espaciales.',
    questions: [
      {
        text: '¿Cuál de las siguientes figuras es el reflejo exacto (imagen especular) del modelo?',
        options: ['Rotada 90°', 'Reflejada', 'Igual al modelo', 'Rotada 180°'],
        optionFigures: [house('rot90'), house('mirror'), house('none'), house('rot180')],
        correct: 1,
        explanation: 'El reflejo especular invierte la posición del círculo: pasa del lado derecho al izquierdo.',
        figure: house('none'),
      },
      {
        text: '¿Qué figura encaja exactamente en el hueco de la plantilla?',
        options: ['Círculo', 'Cruz', 'Cuadrado', 'Triángulo'],
        optionFigures: [circleFig(), cross(), squareFig(), triangleFig()],
        correct: 1,
        explanation: 'El hueco tiene forma de cruz; solo la figura con la misma silueta encaja exactamente.',
        figure: templateCross(),
      },
      {
        text: '¿Cuál de las siguientes figuras es el modelo girado 90° en sentido horario?',
        options: ['Rotada 90° horario', 'Rotada 90° antihorario', 'Igual al modelo', 'Rotada 180°'],
        optionFigures: [ell('rot90'), ell('rot270'), ell('none'), ell('rot180')],
        correct: 0,
        explanation: 'Al girar 90° en sentido horario, el brazo vertical pasa a la parte inferior y el horizontal a la derecha.',
        figure: ell('none'),
      },
      {
        text: '¿Qué figura continúa la serie? Círculo, cuadrado, círculo, cuadrado, …',
        options: ['Círculo', 'Cuadrado', 'Triángulo', 'Estrella'],
        optionFigures: [circleFig(), squareFig(), triangleFig(), starFig()],
        correct: 0,
        explanation: 'La serie alterna círculo y cuadrado; después de un cuadrado sigue un círculo.',
      },
      {
        text: '¿Cuántas caras tiene un cubo?',
        options: ['4', '6', '8', '12'],
        correct: 1,
        explanation: 'Un cubo tiene 6 caras cuadradas.',
      },
      {
        text: '¿Cuántos vértices tiene un cubo?',
        options: ['6', '8', '12', '10'],
        correct: 1,
        explanation: 'Un cubo tiene 8 vértices.',
      },
      {
        text: '¿Cuántas aristas tiene un cubo?',
        options: ['6', '8', '12', '10'],
        correct: 2,
        explanation: 'Un cubo tiene 12 aristas.',
      },
      {
        text: 'Si doblas un papel por la mitad dos veces, ¿cuántas capas quedan?',
        options: ['2', '4', '8', '16'],
        correct: 1,
        explanation: 'Cada doblez duplica las capas: 2 × 2 = 4.',
      },
    ],
  },
];
