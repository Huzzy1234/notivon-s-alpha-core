// Nigerian-real mock-data helpers for demo UIs.
// Goal: believable names / ₦ amounts / places / dates so the demo doesn't
// read as fake. NEVER use "John Doe / $99" in a demo — use these instead.

const FIRST_NAMES = [
  "Chinedu", "Aisha", "Emeka", "Ngozi", "Tunde", "Fatima", "Ifeoma", "Bola",
  "Yusuf", "Chiamaka", "Segun", "Amaka", "Ibrahim", "Blessing", "Kunle", "Zainab",
  "Obinna", "Halima", "Femi", "Uche",
];

const LAST_NAMES = [
  "Okafor", "Bello", "Adeyemi", "Eze", "Musa", "Nwosu", "Balogun", "Okonkwo",
  "Abubakar", "Olawale", "Chukwu", "Danjuma", "Adebayo", "Ogunleye", "Suleiman",
];

const LAGOS_AREAS = [
  "Ikeja", "Lekki", "Yaba", "Surulere", "Victoria Island", "Ajah", "Ikoyi",
  "Gbagada", "Maryland", "Oshodi", "Apapa", "Festac", "Magodo", "Ojota",
];

const STREETS = [
  "Awolowo Road", "Adeniran Ogunsanya St", "Herbert Macaulay Way", "Allen Ave",
  "Admiralty Way", "Opebi Road", "Bode Thomas St", "Kudirat Abiola Way",
];

const pick = <T>(arr: T[], seed?: number): T =>
  arr[(seed ?? Math.floor(Math.random() * arr.length)) % arr.length];

/** A random Nigerian full name. Pass a seed for stable output. */
export const mockName = (seed?: number): string =>
  `${pick(FIRST_NAMES, seed)} ${pick(LAST_NAMES, seed ? seed * 7 : undefined)}`;

/** A Lagos-style street + area address. */
export const mockAddress = (seed?: number): string =>
  `${1 + ((seed ?? Math.floor(Math.random() * 90)) % 90)} ${pick(STREETS, seed)}, ${pick(
    LAGOS_AREAS,
    seed ? seed * 3 : undefined,
  )}, Lagos`;

/** A Nigerian mobile number in 0803… form. */
export const mockPhone = (seed?: number): string => {
  const prefixes = ["0803", "0806", "0810", "0813", "0705", "0902", "0703"];
  const n = seed ?? Math.floor(Math.random() * 1e7);
  return `${pick(prefixes, seed)} ${String(n % 1000).padStart(3, "0")} ${String(
    (n * 13) % 10000,
  ).padStart(4, "0")}`;
};

/** Format a number as Naira, e.g. ₦1,250,000. */
export const naira = (amount: number): string =>
  `₦${Math.round(amount).toLocaleString("en-NG")}`;

/** A relative timestamp label like "2h ago", "Yesterday". */
export const mockTimeAgo = (index: number): string => {
  const labels = ["Just now", "2m ago", "18m ago", "1h ago", "3h ago", "Yesterday", "2d ago"];
  return labels[index % labels.length];
};
