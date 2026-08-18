const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hola Slow Life, me gustaría saber más sobre la marca."
);

export const siteSocial = {
  instagram: {
    handle: "@slow.life96",
    url: "https://instagram.com/slow.life96",
  },
  whatsapp: {
    number: "+54 9 11 0000-0000",
    url: `https://wa.me/5491100000000?text=${WHATSAPP_MESSAGE}`,
  },
  email: "hola@slowlife.blog",
} as const;