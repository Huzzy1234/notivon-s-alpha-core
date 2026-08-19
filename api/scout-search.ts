/*
   Lead Scout Backend — Multi-provider business search for Nigerian leads.
   
   Priority order:
   1. Google Places API (New) — best phone coverage (~90%), needs billing.
      Includes circle radius grid partitioning for mapped sub-locations
      to bypass the 60-lead result limit.
   2. TomTom Search API — free tier (2,500/day), weaker phone data (~20%)
   
   Set GOOGLE_PLACES_API_KEY or TOMTOM_API_KEY in env vars.
*/

import https from "https";
import url from "url";
import dns from "dns";


interface SearchFilters {
  website: "no_website" | "with_website" | "any";
  minRating: number;
  // Proxy for enquiry volume: a business with real review counts is one that
  // actually fields enough leads to feel a lead-handling problem.
  minReviews: number;
  operationalOnly: boolean;
  mustHavePhotos: boolean;
}

interface ScoutRequest {
  niche: string;
  location: string;
  filters?: SearchFilters;
  provider?: "google" | "tomtom";
  scanMode?: "standard" | "grid";
  // Which CRM board (sheet tab) to check for duplicates against.
  board?: string;
}

const DEFAULT_BOARD = "spa-bridge";

const normalizeBoard = (raw: unknown): string => {
  const name = String(raw ?? "").trim().toLowerCase();
  if (!name) return DEFAULT_BOARD;
  const clean = name.replace(/[^a-z0-9\-_ ]/g, "").replace(/\s+/g, "-").slice(0, 40);
  return clean || DEFAULT_BOARD;
};

interface Lead {
  name: string;
  address: string;
  phone: string;
  category: string;
  website: string;
  rating: number;
  reviewCount: number;
  source: string;
  businessStatus?: string;
  hasPhotos?: boolean;
  savedId?: string;
  savedStatus?: string;
}

interface LatLng {
  lat: number;
  lng: number;
}

const LOCATION_COORDINATES: Record<string, LatLng> = {
  // Lagos
  "lekki": { lat: 6.4281, lng: 3.4219 },
  "victoria island": { lat: 6.4281, lng: 3.4219 },
  "ikoyi": { lat: 6.4500, lng: 3.4333 },
  "ikeja": { lat: 6.6018, lng: 3.3515 },
  "apapa": { lat: 6.4583, lng: 3.3667 },
  "surulere": { lat: 6.5000, lng: 3.3500 },
  "yaba": { lat: 6.5095, lng: 3.3711 },
  "maryland": { lat: 6.5676, lng: 3.3698 },
  "epe": { lat: 6.5833, lng: 3.9833 },
  "badagry": { lat: 6.4150, lng: 2.8817 },

  // Abuja (FCT)
  "wuse ii": { lat: 9.0772, lng: 7.4798 },
  "gwarinpa": { lat: 9.1086, lng: 7.4069 },
  "maitama": { lat: 9.0883, lng: 7.4950 },
  "garki": { lat: 9.0333, lng: 7.4833 },
  "asokoro": { lat: 9.0433, lng: 7.5183 },
  "cbd": { lat: 9.0583, lng: 7.4897 },
  "central business district": { lat: 9.0583, lng: 7.4897 },
  "kubwa": { lat: 9.1583, lng: 7.3250 },
  "lugbe": { lat: 8.9833, lng: 7.3667 },

  // Rivers
  "port harcourt": { lat: 4.8156, lng: 7.0498 },
  "gra phase 1": { lat: 4.8211, lng: 7.0011 },
  "d-line": { lat: 4.8022, lng: 7.0028 },
  "trans amadi": { lat: 4.8147, lng: 7.0372 },
  "rumuola": { lat: 4.8317, lng: 7.0047 },
  "obio-akpor": { lat: 4.8778, lng: 7.0156 },
  "bonny island": { lat: 4.4550, lng: 7.1700 },
  "eleme": { lat: 4.7950, lng: 7.1250 },

  // Oyo
  "ibadan": { lat: 7.3775, lng: 3.9470 },
  "bodija": { lat: 7.4350, lng: 3.9100 },
  "ring road": { lat: 7.3560, lng: 3.8730 },
  "jericho": { lat: 7.4080, lng: 3.8780 },
  "challenge": { lat: 7.3450, lng: 3.8820 },
  "ogbomosho": { lat: 8.1333, lng: 4.2500 },

  // Kano
  "kano": { lat: 12.0022, lng: 8.5920 },
  "fagge": { lat: 12.0030, lng: 8.5220 },
  "nassarawa": { lat: 11.9960, lng: 8.5520 },
  "bompai": { lat: 12.0120, lng: 8.5610 },

  // Kaduna
  "kaduna": { lat: 10.5105, lng: 7.4165 },
  "barnawa": { lat: 10.4850, lng: 7.4420 },
  "kaduna north": { lat: 10.5350, lng: 7.4380 },
  "zaria": { lat: 11.0667, lng: 7.7000 },

  // Delta
  "warri": { lat: 5.5167, lng: 5.7500 },
  "effurun": { lat: 5.5610, lng: 5.7820 },
  "asaba": { lat: 6.2006, lng: 6.7313 },
  "sapele": { lat: 5.8833, lng: 5.6833 },

  // Anambra
  "onitsha": { lat: 6.1500, lng: 6.7833 },
  "awka": { lat: 6.2106, lng: 7.0722 },
  "nnewi": { lat: 6.0167, lng: 6.9167 },

  // Enugu
  "enugu": { lat: 6.4520, lng: 7.5101 },
  "independence layout": { lat: 6.4350, lng: 7.5180 },
  "nsukka": { lat: 6.8561, lng: 7.3958 },

  // Edo
  "benin city": { lat: 6.3350, lng: 5.6030 },
  "gra, benin": { lat: 6.3150, lng: 5.6200 },

  // Ogun
  "abeokuta": { lat: 7.1500, lng: 3.3500 },
  "ota": { lat: 6.6900, lng: 3.2300 },
  "sagamu": { lat: 6.8400, lng: 3.6400 },

  // Abia
  "aba": { lat: 5.1066, lng: 7.3697 },
  "umuahia": { lat: 5.5244, lng: 7.4950 },

  // Akwa Ibom
  "uyo": { lat: 5.0377, lng: 7.9128 },
  "ewet housing": { lat: 5.0250, lng: 7.9350 },
  "shelter afrique": { lat: 5.0180, lng: 7.9550 },

  // Imo
  "owerri": { lat: 5.4850, lng: 7.0350 },
  "ikenegbu": { lat: 5.4880, lng: 7.0420 },

  // Kwara
  "ilorin": { lat: 8.4799, lng: 4.5418 },

  // Ondo
  "akure": { lat: 7.2500, lng: 5.1950 },
  "alagbaka": { lat: 7.2550, lng: 5.2150 },

  // Osun
  "osogbo": { lat: 7.7710, lng: 4.5626 },
  "ile-ife": { lat: 7.4667, lng: 4.5667 },

  // Cross River
  "calabar": { lat: 4.9600, lng: 8.3300 },

  // Plateau
  "jos": { lat: 9.9167, lng: 8.9000 },
  "rayfield": { lat: 9.8450, lng: 8.9150 },

  // Kogi
  "lokoja": { lat: 7.8024, lng: 6.7333 },

  // Nasarawa
  "lafia": { lat: 8.4904, lng: 8.5147 },
  "karu": { lat: 9.0167, lng: 7.6333 },

  // Benue
  "makurdi": { lat: 7.7333, lng: 8.5210 },

  // Bauchi
  "bauchi": { lat: 10.3158, lng: 9.8442 },

  // Katsina
  "katsina": { lat: 12.9894, lng: 7.6006 },

  // Borno
  "maiduguri": { lat: 11.8311, lng: 13.1509 },

  // Sokoto
  "sokoto": { lat: 13.0622, lng: 5.2339 },

  // Other States Capital/Commercial Centers to ensure coverage
  "yola": { lat: 9.2000, lng: 12.4833 },
  "mubi": { lat: 10.2667, lng: 13.2667 },
  "yenagoa": { lat: 4.9267, lng: 6.2633 },
  "abakaliki": { lat: 6.3250, lng: 8.1150 },
  "ado-ekiti": { lat: 7.6200, lng: 5.2200 },
  "gombe": { lat: 10.2900, lng: 11.1700 },
  "dutse": { lat: 11.7594, lng: 9.3381 },
  "birnin kebbi": { lat: 12.4500, lng: 4.2000 },
  "minna": { lat: 9.6167, lng: 6.5500 },
  "suleja": { lat: 9.1806, lng: 7.1794 },
  "jalingo": { lat: 8.8917, lng: 11.3625 },
  "damaturu": { lat: 11.7470, lng: 11.9660 },
  "gusau": { lat: 12.1628, lng: 6.6614 }
};

const isValidRequest = (body: unknown): body is ScoutRequest => {
  if (typeof body !== "object" || body === null) return false;
  const b = body as Record<string, unknown>;
  return (
    typeof b.niche === "string" &&
    b.niche.trim().length > 0 &&
    typeof b.location === "string" &&
    b.location.trim().length > 0
  );
};

// Force IPv4 lookup for HTTPS requests
const ipv4Lookup = (hostname: string, options: any, callback: any) => {
  return dns.lookup(hostname, { ...options, family: 4 }, callback);
};

const keepAliveAgent = new https.Agent({
  keepAlive: true,
  maxSockets: 50,
  keepAliveMsecs: 1000
});

/* ── Custom Fetch using Native Node.js HTTPS (Immune to undici DNS/IPv6 timeouts) ── */
function customFetch(targetUrl: string, options: any = {}, redirectCount = 0): Promise<any> {
  if (redirectCount > 5) {
    return Promise.reject(new Error("Too many redirects"));
  }

  return new Promise((resolve, reject) => {
    const parsedUrl = url.parse(targetUrl);
    const requestOptions: https.RequestOptions = {
      // Netlify kills a synchronous function at 10s, so a longer socket
      // timeout than the caller's budget never fires — callers pass their own.
      method: options.method || "GET",
      hostname: parsedUrl.hostname,
      path: parsedUrl.path,
      headers: options.headers || {},
      timeout: options.timeoutMs || 15000,
      lookup: ipv4Lookup,
      agent: keepAliveAgent,
    };

    const req = https.request(requestOptions, (res) => {
      // Follow Redirects (HTTP 301, 302, 307)
      // Google Apps Script processes POST body server-side, then 302-redirects
      // to a URL containing the response. We ALWAYS follow as GET.
      if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        let redirectUrlStr = res.headers.location;
        if (!redirectUrlStr.startsWith("http")) {
          redirectUrlStr = url.resolve(targetUrl, redirectUrlStr);
        }

        // Drain response body to free the socket before following redirect
        res.resume();

        // Follow redirect as GET with no body (response data is at the redirect URL)
        resolve(customFetch(redirectUrlStr, { method: "GET", headers: {} }, redirectCount + 1));
        return;
      }

      let body = "";
      res.on("data", (chunk) => {
        body += chunk;
      });
      res.on("end", () => {
        resolve({
          ok: res.statusCode ? res.statusCode >= 200 && res.statusCode < 300 : false,
          status: res.statusCode,
          text: () => Promise.resolve(body),
          json: () => {
            try {
              return Promise.resolve(JSON.parse(body));
            } catch (e) {
              return Promise.reject(new Error(`Invalid JSON: ${body}`));
            }
          }
        });
      });
    });

    req.on("error", (err) => {
      reject(err);
    });

    req.on("timeout", () => {
      req.destroy();
      reject(new Error("Request timeout"));
    });

    if (options.body && (options.method === "POST" || options.method === "PATCH")) {
      req.write(typeof options.body === "string" ? options.body : JSON.stringify(options.body));
    }
    req.end();
  });
}

/* ── Bounding Box Calculator ── */
function getBoundingBox(center: LatLng, radiusMeters: number) {
  const latOffset = radiusMeters / 111000;
  const lngOffset = radiusMeters / (111000 * Math.cos(center.lat * Math.PI / 180));
  return {
    low: {
      latitude: center.lat - latOffset,
      longitude: center.lng - lngOffset
    },
    high: {
      latitude: center.lat + latOffset,
      longitude: center.lng + lngOffset
    }
  };
}

/* ── Google Places API (New) - Single Coordinate Rectangle Search ── */
async function searchGoogleRectangle(
  niche: string,
  center: LatLng,
  radiusMeters: number,
  apiKey: string
): Promise<{ leads: Lead[]; apiCalls: number }> {
  const textQuery = niche; // Restrict search terms to the niche itself, relying on rectangle coordinates for location
  let pageToken: string | undefined = undefined;
  const allLeads: Lead[] = [];
  let attempts = 0;
  let apiCalls = 0;

  const bbox = getBoundingBox(center, radiusMeters);

  do {
    const bodyPayload: any = {
      textQuery,
      locationRestriction: {
        rectangle: {
          low: {
            latitude: bbox.low.latitude,
            longitude: bbox.low.longitude
          },
          high: {
            latitude: bbox.high.latitude,
            longitude: bbox.high.longitude
          }
        }
      }
    };

    if (pageToken) {
      bodyPayload.pageToken = pageToken;
    }

    apiCalls++;
    const response = await customFetch("https://places.googleapis.com/v1/places:searchText", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": [
          "places.displayName",
          "places.formattedAddress",
          "places.nationalPhoneNumber",
          "places.internationalPhoneNumber",
          "places.websiteUri",
          "places.types",
          "places.rating",
          "places.userRatingCount",
          "places.businessStatus",
          "places.photos",
          "nextPageToken",
        ].join(","),
      },
      body: JSON.stringify(bodyPayload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Google Places API Rectangle Error on page ${attempts + 1}:`, response.status, errorText);
      if (allLeads.length > 0) {
        break;
      }
      throw new Error(`Google Places API Rectangle returned ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    const places = data.places || [];

    const pageLeads = places.map((place: any) => ({
      name: place.displayName?.text || "Unknown Name",
      address: place.formattedAddress || "",
      phone: place.internationalPhoneNumber || place.nationalPhoneNumber || "",
      category: place.types?.[0]?.replace(/_/g, " ") || "",
      website: place.websiteUri || "",
      rating: place.rating || 0,
      reviewCount: place.userRatingCount || 0,
      source: "google",
      businessStatus: place.businessStatus || "",
      hasPhotos: !!(place.photos && place.photos.length > 0)
    }));

    allLeads.push(...pageLeads);
    pageToken = data.nextPageToken;
    attempts++;

    if (pageToken && attempts < 3) {
      await new Promise((resolve) => setTimeout(resolve, 300));
    }

  } while (pageToken && attempts < 3);

  return { leads: allLeads, apiCalls };
}

/* ── Google Places API (New) - Multi-Circle Partitioning Search ── */
async function searchGoogleMultiCircle(
  niche: string,
  center: LatLng,
  apiKey: string
): Promise<{ leads: Lead[]; apiCalls: number }> {
  // Define 9 circles (Center + 8 directions) to fully cover high-density business districts
  const latOffset = 0.008;
  const lngOffset = 0.008 / Math.cos(center.lat * Math.PI / 180);
  const zones = [
    { center: center, radius: 1000 }, // Center
    { center: { lat: center.lat + latOffset, lng: center.lng }, radius: 800 }, // North
    { center: { lat: center.lat - latOffset, lng: center.lng }, radius: 800 }, // South
    { center: { lat: center.lat, lng: center.lng + lngOffset }, radius: 800 }, // East
    { center: { lat: center.lat, lng: center.lng - lngOffset }, radius: 800 }, // West
    { center: { lat: center.lat + latOffset, lng: center.lng + lngOffset }, radius: 800 }, // North-East
    { center: { lat: center.lat + latOffset, lng: center.lng - lngOffset }, radius: 800 }, // North-West
    { center: { lat: center.lat - latOffset, lng: center.lng + lngOffset }, radius: 800 }, // South-East
    { center: { lat: center.lat - latOffset, lng: center.lng - lngOffset }, radius: 800 }  // South-West
  ];

  console.log(`Triggering parallel 9-rectangle scan for niche: "${niche}"`);

  const errors: Error[] = [];
  const results = await Promise.all(
    zones.map((z, idx) =>
      new Promise<{ leads: Lead[]; apiCalls: number }>(resolve => setTimeout(resolve, idx * 100))
        .then(() => searchGoogleRectangle(niche, z.center, z.radius, apiKey))
        .catch(err => {
          console.warn("One rectangle query failed:", err);
          errors.push(err);
          return { leads: [] as Lead[], apiCalls: 0 };
        })
    )
  );

  // If any query failed with a quota / rate limit / credentials error, throw immediately
  const criticalErr = errors.find(err =>
    err.message.includes("quota") ||
    err.message.includes("Quota") ||
    err.message.includes("RESOURCE_EXHAUSTED") ||
    err.message.includes("429") ||
    err.message.includes("API key")
  );
  if (criticalErr) {
    throw criticalErr;
  }

  // If ALL queries failed, throw
  if (errors.length === zones.length && zones.length > 0) {
    throw new Error(`All zones failed to scan: ${errors[0]?.message}`);
  }

  let totalApiCalls = 0;
  const allLeads: Lead[] = [];
  for (const res of results) {
    totalApiCalls += res.apiCalls;
    allLeads.push(...res.leads);
  }

  // Flatten results and run a primary de-duplication
  const seen = new Set<string>();
  const uniqueLeads = allLeads.filter(lead => {
    const key = `${lead.name.toLowerCase().trim()}|${lead.address.toLowerCase().trim()}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  return { leads: uniqueLeads, apiCalls: totalApiCalls };
}

const geocodeCache = new Map<string, LatLng>();

/* ── Google Places API (New) - Geocode Location String ── */
async function geocodeLocation(location: string, apiKey: string): Promise<LatLng | null> {
  try {
    const response = await customFetch("https://places.googleapis.com/v1/places:searchText", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": "places.location",
      },
      body: JSON.stringify({
        textQuery: `${location}, Nigeria`,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Google Geocoding failed with status ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    const place = data.places?.[0];
    if (place && place.location) {
      return {
        lat: place.location.latitude,
        lng: place.location.longitude
      };
    }
  } catch (err) {
    console.error("Geocoding failed for location:", location, err);
    throw err;
  }
  return null;
}

/* ── Google Places API (New) - Standard Text Query (Fallback) ── */
async function searchGoogle(niche: string, location: string, apiKey: string): Promise<{ leads: Lead[]; apiCalls: number }> {
  const textQuery = `${niche} ${location} Nigeria`;
  let pageToken: string | undefined = undefined;
  const allLeads: Lead[] = [];
  let attempts = 0;
  let apiCalls = 0;

  do {
    const bodyPayload: any = { textQuery };
    if (pageToken) {
      bodyPayload.pageToken = pageToken;
    }

    apiCalls++;
    const response = await customFetch("https://places.googleapis.com/v1/places:searchText", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": [
          "places.displayName",
          "places.formattedAddress",
          "places.nationalPhoneNumber",
          "places.internationalPhoneNumber",
          "places.websiteUri",
          "places.types",
          "places.rating",
          "places.userRatingCount",
          "places.businessStatus",
          "places.photos",
          "nextPageToken",
        ].join(","),
      },
      body: JSON.stringify(bodyPayload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Google Places API Error on page ${attempts + 1}:`, response.status, errorText);
      if (allLeads.length > 0) {
        break;
      }
      throw new Error(`Google Places API returned ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    const places = data.places || [];

    const pageLeads = places.map((place: any) => ({
      name: place.displayName?.text || "Unknown Name",
      address: place.formattedAddress || "",
      phone: place.internationalPhoneNumber || place.nationalPhoneNumber || "",
      category: place.types?.[0]?.replace(/_/g, " ") || "",
      website: place.websiteUri || "",
      rating: place.rating || 0,
      reviewCount: place.userRatingCount || 0,
      source: "google",
      businessStatus: place.businessStatus || "",
      hasPhotos: !!(place.photos && place.photos.length > 0)
    }));

    allLeads.push(...pageLeads);
    pageToken = data.nextPageToken;
    attempts++;

    if (pageToken && attempts < 3) {
      await new Promise((resolve) => setTimeout(resolve, 500));
    }

  } while (pageToken && attempts < 3);

  // De-duplicate leads in case of pagination overlap
  const seen = new Set<string>();
  const uniqueLeads = allLeads.filter(lead => {
    const key = `${lead.name.toLowerCase()}|${lead.address.toLowerCase()}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  return { leads: uniqueLeads, apiCalls };
}

/* ── TomTom Search API ───────────────────────────────────────────────── */
async function searchTomTom(niche: string, location: string, apiKey: string): Promise<Lead[]> {
  const cleanNiche = niche
    .replace(/\bOR\b/gi, " ")
    .replace(/\bAND\b/gi, " ")
    .replace(/\s+/g, " ")
    .trim();

  const queryStr = `${cleanNiche} ${location}`;
  const params = new URLSearchParams({
    key: apiKey,
    countrySet: "NG",
    idxSet: "POI",
    limit: "40", // Fetch up to 40 results to maximize yield
  });

  const urlStr = `https://api.tomtom.com/search/2/search/${encodeURIComponent(queryStr)}.json?${params.toString()}`;
  const response = await customFetch(urlStr, { method: "GET" });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("TomTom API Error:", response.status, errorText);
    throw new Error(`TomTom API returned ${response.status}: ${errorText}`);
  }

  const data = await response.json();
  return (data.results || []).map((result: any) => ({
    name: result.poi?.name || "Unknown Name",
    address: result.address?.freeformAddress || "",
    phone: result.poi?.phone || "",
    category: result.poi?.categories?.[0] || "",
    website: result.poi?.url || "",
    rating: 0,
    reviewCount: 0,
    source: "tomtom",
  }));
}

/* ── Main Handler ────────────────────────────────────────────────────── */
const handler = async (req: Request): Promise<Response> => {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  const opsAuth = req.headers.get("X-Ops-Auth");
  if (opsAuth !== "notivon-internal-2026") {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (!isValidRequest(body)) {
    return new Response(JSON.stringify({ error: "Missing niche or location" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const googleKey = process.env.GOOGLE_PLACES_API_KEY;
  const tomtomKey = process.env.TOMTOM_API_KEY;

  if (!googleKey && !tomtomKey) {
    console.error("Missing both GOOGLE_PLACES_API_KEY and TOMTOM_API_KEY");
    return new Response(
      JSON.stringify({ error: "No search provider configured. Set GOOGLE_PLACES_API_KEY or TOMTOM_API_KEY." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    let leads: Lead[] = [];
    let provider: string;
    let apiCalls = 0;

    const targetProvider = body.provider || "google";

    if (googleKey && targetProvider === "google") {
      try {
        const queryLoc = body.location.trim();
        const normLoc = queryLoc.toLowerCase();

        // 1. Try to find a match in pre-mapped coordinates
        let coords = Object.entries(LOCATION_COORDINATES).find(([key]) => normLoc.includes(key.toLowerCase()))?.[1];

        // 2. If not found in pre-mapped list, geocode it dynamically
        if (!coords) {
          const cached = geocodeCache.get(normLoc);
          if (cached) {
            console.log(`Resolved location "${queryLoc}" from geocodeCache:`, cached);
            coords = cached;
          } else {
            console.log(`Location "${queryLoc}" not cached. Dynamically geocoding...`);
            apiCalls++;
            coords = await geocodeLocation(queryLoc, googleKey);
            if (coords) {
              geocodeCache.set(normLoc, coords);
            }
          }
        }

        if (coords && body.scanMode !== "standard") {
          console.log(`Resolved location "${queryLoc}" to coordinate:`, coords);
          const res = await searchGoogleMultiCircle(body.niche, coords, googleKey);
          leads = res.leads;
          apiCalls += res.apiCalls;
        } else {
          console.log(`Running standard text query (Mode: ${body.scanMode || "standard"}).`);
          const res = await searchGoogle(body.niche, queryLoc, googleKey);
          leads = res.leads;
          apiCalls += res.apiCalls;
        }
        provider = "google";
      } catch (googleErr) {
        console.warn("Google Places failed, falling back to TomTom:", googleErr);
        if (!tomtomKey) throw googleErr;
        leads = await searchTomTom(body.niche, body.location, tomtomKey);
        provider = "tomtom";
      }
    } else {
      console.log("Routing query directly to TomTom search provider");
      leads = await searchTomTom(body.niche, body.location, tomtomKey!);
      provider = "tomtom";
    }

    // Apply dynamic filters if present
    const reqFilters = body.filters;
    if (reqFilters) {
      leads = leads.filter(lead => {
        // 1. Website Filter
        if (reqFilters.website === "no_website") {
          const site = lead.website ? lead.website.toLowerCase() : "";
          if (site) {
            const isSocial = site.includes("facebook.com") || site.includes("instagram.com") || site.includes("fb.me");
            if (!isSocial) return false;
          }
        } else if (reqFilters.website === "with_website") {
          const site = lead.website ? lead.website.toLowerCase() : "";
          if (!site) return false;
          const isSocial = site.includes("facebook.com") || site.includes("instagram.com") || site.includes("fb.me");
          if (isSocial) return false;
        }

        // 2. Rating Filter
        if (reqFilters.minRating > 0) {
          if (lead.rating && lead.rating < reqFilters.minRating) return false;
        }

        // 2b. Review Count Filter
        if (reqFilters.minReviews > 0) {
          if ((lead.reviewCount || 0) < reqFilters.minReviews) return false;
        }

        // 3. Operational Filter
        if (reqFilters.operationalOnly) {
          if (lead.businessStatus && lead.businessStatus !== "OPERATIONAL") return false;
        }

        // 4. Must Have Photos Filter
        if (reqFilters.mustHavePhotos) {
          if (lead.source === "google" && !lead.hasPhotos) return false;
        }

        return true;
      });
    }

    // Filter: ONLY keep leads that have phone/contact information (as requested by user)
    leads = leads.filter(lead => lead.phone && lead.phone.trim().length > 0);

    // Flag duplicates against the board we are scanning into. Scoping to one
    // board is deliberate: a spa client already in the pipeline should not grey
    // itself out of a solar scan.
    const board = normalizeBoard(body.board);
    const webAppUrl = process.env.GOOGLE_SHEET_WEBAPP_URL;
    const savedLeadsMap = new Map<string, { id: string; status: string }>();

    if (webAppUrl) {
      try {
        const sep = webAppUrl.includes("?") ? "&" : "?";
        const boardUrl = `${webAppUrl}${sep}${new URLSearchParams({ board }).toString()}`;
        // Apps Script latency swings from 2s to 30s+. Duplicate flagging is a
        // nicety, the search results are the point — cap it tightly and let the
        // catch below drop it rather than sink the whole scan.
        const sheetRes = await customFetch(boardUrl, { method: "GET", timeoutMs: 5000 });
        if (sheetRes.ok) {
          const sheetData = await sheetRes.json();
          if (sheetData && sheetData.leads) {
            for (const record of sheetData.leads) {
              const phone = record.phone;
              const name = record.name;
              const address = record.address;
              const status = record.status || "New";

              if (phone) {
                const cleanPhone = String(phone).replace(/[\s\-\(\)\+]/g, "");
                if (cleanPhone) {
                  savedLeadsMap.set(cleanPhone, { id: String(record.id), status });
                }
              }
              if (name && address) {
                const nameAddrKey = `${name.toLowerCase().trim()}|${address.toLowerCase().trim()}`;
                savedLeadsMap.set(nameAddrKey, { id: String(record.id), status });
              }
            }
          }
        }
      } catch (e) {
        console.warn("Failed to fetch saved leads from Google Sheets for deduplication mapping:", e);
      }
    }

    // Map saved fields to leads
    const mappedLeads = leads.map(l => {
      let savedInfo = undefined;

      if (l.phone) {
        const cleanPhone = String(l.phone).replace(/[\s\-\(\)\+]/g, "");
        savedInfo = savedLeadsMap.get(cleanPhone);
      }

      if (!savedInfo) {
        const nameAddrKey = `${l.name.toLowerCase().trim()}|${l.address.toLowerCase().trim()}`;
        savedInfo = savedLeadsMap.get(nameAddrKey);
      }

      if (savedInfo) {
        return {
          ...l,
          savedId: savedInfo.id,
          savedStatus: savedInfo.status
        };
      }
      return l;
    });

    // Sort: leads with phone numbers first, then unsaved first
    mappedLeads.sort((a, b) => {
      if (a.phone && !b.phone) return -1;
      if (!a.phone && b.phone) return 1;
      if (!a.savedId && b.savedId) return -1;
      if (a.savedId && !b.savedId) return 1;
      return 0;
    });

    const withPhone = mappedLeads.filter(l => l.phone).length;

    return new Response(
      JSON.stringify({
        leads: mappedLeads,
        meta: {
          provider,
          board,
          total: mappedLeads.length,
          withPhone,
          phoneCoverage: mappedLeads.length > 0 ? Math.round((withPhone / mappedLeads.length) * 100) : 0,
          apiCalls,
        },
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Scout Search Error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch leads" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};

/* ── Vercel Node.js Adapter ── */
import type { IncomingMessage, ServerResponse } from "http";

module.exports = async (req: IncomingMessage, res: ServerResponse) => {
  try {
    const proto = req.headers["x-forwarded-proto"] || "https";
    const host = req.headers["x-forwarded-host"] || req.headers.host || "localhost";
    const fullUrl = `${proto}://${host}${req.url || "/"}`;

    let body: string | undefined;
    if (req.method !== "GET" && req.method !== "HEAD") {
      body = await new Promise<string>((resolve, reject) => {
        let data = "";
        req.on("data", (chunk) => (data += chunk));
        req.on("end", () => resolve(data));
        req.on("error", reject);
      });
    }

    const webReq = new Request(fullUrl, {
      method: req.method || "GET",
      headers: req.headers as Record<string, string>,
      body: body || undefined,
    });

    const webRes = await handler(webReq);
    const resBody = await webRes.text();

    res.writeHead(webRes.status, Object.fromEntries(webRes.headers.entries()));
    res.end(resBody);
  } catch (err: any) {
    console.error("Vercel adapter error:", err);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Internal server error", detail: err.message }));
  }
};
