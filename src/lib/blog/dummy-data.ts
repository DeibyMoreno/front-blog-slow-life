import type { Article, ArticleDetail } from "@/lib/blog/types";

export const DUMMY_ARTICLES: Article[] = [
  {
    id: "dummy-01",
    slug: "una-semana-sin-pantallas",
    title: "Una semana sin pantallas, con las manos ocupadas",
    excerpt:
      "Apagamos el móvil durante siete días y descubrimos que el aburrimiento tiene un plan secreto: te devuelve a las cosas de verdad.",
    category: { slug: "estilo-de-vida", name: "Estilo de vida" },
    coverImage: { url: "/images/p-1-1.webp", alt: "Manos tejiendo frente a una ventana" },
    publishedAt: "2026-07-28T09:00:00.000Z",
    readingTime: 6,
    author: { id: "dummy-u1", name: "Nadia Ferrer" },
    featured: true,
  },
  {
    id: "dummy-02",
    slug: "que-llevamos-puesto-cuando-no-llevamos-nada",
    title: "Qué llevamos puesto cuando no llevamos nada",
    excerpt:
      "La colección que no se ve: sudaderas rotas, vaqueros con historia y esa camiseta que ya es de alguien más. Del armario a la calle.",
    category: { slug: "la-marca", name: "La marca" },
    coverImage: { url: "/images/p-1-3.webp", alt: "Ropa en tonos neutros colgada en perchas" },
    publishedAt: "2026-07-11T09:00:00.000Z",
    readingTime: 4,
    author: { id: "dummy-u2", name: "Bruno Vega" },
  },
  {
    id: "dummy-03",
    slug: "salir-con-amigos-y-no-mirar-el-movil",
    title: "Salir con amigos y no mirar el móvil",
    excerpt:
      "Una tarde de sábado en la que nadie sacó el teléfono. Esto es lo que pasó cuando las conversaciones volvieron a tener cara.",
    category: { slug: "estilo-de-vida", name: "Estilo de vida" },
    coverImage: { url: "/images/p-1-4.webp", alt: "Amigos charlando al atardecer" },
    publishedAt: "2026-06-20T09:00:00.000Z",
    readingTime: 5,
    author: { id: "dummy-u3", name: "Iván Sanz" },
  },
  {
    id: "dummy-04",
    slug: "playlist-para-cruzar-la-ciudad-despacio",
    title: "Playlist para cruzar la ciudad despacio",
    excerpt:
      "Doce canciones para andar sin prisa por la calle: de la última parada a casa, con los auriculares puestos y el mundo en cámara lenta.",
    category: { slug: "musica", name: "Música" },
    coverImage: { url: "/images/p2-1.webp", alt: "Auriculares sobre un vinilo" },
    publishedAt: "2026-05-29T09:00:00.000Z",
    readingTime: 3,
    author: { id: "dummy-u4", name: "Lola Aymar" },
  },
  {
    id: "dummy-05",
    slug: "detras-de-camaras-rodamos-junto-al-rio",
    title: "Detrás de cámaras: el día que rodamos junto al río",
    excerpt:
      "Así se hizo la campaña: una mañana fría, un cámara congelado y nosotros tomándonos la sesión como un picnic de domingo.",
    category: { slug: "detras-de-camaras", name: "Detrás de cámaras" },
    coverImage: { url: "/images/p-2-3.webp", alt: "Equipo de rodaje al aire libre" },
    publishedAt: "2026-05-02T09:00:00.000Z",
    readingTime: 4,
    author: { id: "dummy-u5", name: "Héctor Paredes" },
  },
  {
    id: "dummy-06",
    slug: "marta-remienda-su-ropa",
    title: "Marta remienda su ropa y no sabe lo cool que es",
    excerpt:
      "Su abuela le enseñó a coser y ahora remienda los codos de las sudaderas. Hablamos con ella de por qué un zurcido mola más que estrenar.",
    category: { slug: "gente", name: "Gente" },
    coverImage: { url: "/images/p-4.webp", alt: "Prenda remendada sobre una mesa" },
    publishedAt: "2026-04-11T09:00:00.000Z",
    readingTime: 5,
    author: { id: "dummy-u1", name: "Nadia Ferrer" },
  },
  {
    id: "dummy-07",
    slug: "la-cultura-de-la-prisa-y-por-que-la-rompemos",
    title: "La cultura de la prisa y por qué la rompemos",
    excerpt:
      "Todo el mundo corre hacia ningún sitio. Nosotros preferimos llegar tarde a una cita y puntuales a nuestra propia vida.",
    category: { slug: "cultura", name: "Cultura" },
    coverImage: { url: "/images/p-5-1.webp", alt: "Calle vacía al amanecer" },
    publishedAt: "2026-03-14T09:00:00.000Z",
    readingTime: 6,
    author: { id: "dummy-u3", name: "Iván Sanz" },
  },
  {
    id: "dummy-08",
    slug: "mini-manual-convierte-tu-calma-en-estilo",
    title: "Mini manual: convertir tu calma en estilo",
    excerpt:
      "Diez gestos pequeños que cambian la forma de vestir y de vivir: sin comprar casi nada y sin dejar de ser tú.",
    category: { slug: "estilo-de-vida", name: "Estilo de vida" },
    coverImage: { url: "/images/p-5-2.webp", alt: "Prenda doblada junto a un libro" },
    publishedAt: "2026-02-20T09:00:00.000Z",
    readingTime: 4,
    author: { id: "dummy-u4", name: "Lola Aymar" },
  },
];

const DUMMY_BODY = `Cada historia de Slow Life empieza igual: sin prisa.

La ropa que llevamos no es un capricho, es el archivo de los días que hemos vivido. Y este texto es solo una muestra de lo que aparece cuando te paras a observar.

> La prisa es solo una ilusión.

Nos vemos en la próxima lectura.`;

export function getDummyArticleBySlug(slug: string): ArticleDetail | null {
  const article = DUMMY_ARTICLES.find((a) => a.slug === slug);
  if (!article) return null;

  return {
    ...article,
    body: DUMMY_BODY,
    gallery: [
      { url: "/images/p-5-1.webp", alt: "Tejido a mano en tonos tierra" },
      { url: "/images/p-1-2.webp", alt: "Detalle de una prenda de lino" },
      { url: "/images/p-4.webp", alt: "Manos trabajando el algodón" },
      { url: "/images/p-5-2.webp", alt: "Luz natural sobre tejidos" },
      { url: "/images/p-2-3.webp", alt: "Sesión de fotos al aire libre" },
    ],
    kicker: article.category.name,
  };
}
