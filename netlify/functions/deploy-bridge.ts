import crypto from "crypto";

// Basic security check helper
const checkAuth = (headers: Headers): boolean => {
  const opsAuth = headers.get("X-Ops-Auth");
  return opsAuth === "notivon-internal-2026";
};

export default async (req: Request): Promise<Response> => {
  // Only allow POST
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  // Auth Check
  if (!checkAuth(req.headers)) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const token = process.env.NETLIFY_AUTH_TOKEN;
  if (!token) {
    return new Response(
      JSON.stringify({
        error: "Netlify deploy token not configured on server.",
        code: "NO_TOKEN",
      }),
      { status: 501, headers: { "Content-Type": "application/json" } }
    );
  }

  let body: any;
  try {
    body = await req.json();
  } catch {
    return new Response("Invalid JSON body", { status: 400 });
  }

  const { slug, html } = body;
  if (!slug || !html) {
    return new Response(
      JSON.stringify({ error: "Missing slug or html content" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  // Clean slug
  const cleanSlug = slug.toLowerCase().replace(/[^a-z0-9\-]/g, "");

  try {
    // 1. Fetch user's sites list to see if a site with this slug name already exists
    const sitesRes = await fetch("https://api.netlify.com/api/v1/sites", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!sitesRes.ok) {
      const errText = await sitesRes.text();
      throw new Error(`Failed to fetch Netlify sites list: ${errText}`);
    }

    const sites = await sitesRes.json();
    let site = sites.find((s: any) => s.name === cleanSlug);

    // 2. Create the site if it doesn't exist
    if (!site) {
      const createRes = await fetch("https://api.netlify.com/api/v1/sites", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: cleanSlug,
        }),
      });

      if (!createRes.ok) {
        const errText = await createRes.text();
        throw new Error(`Failed to create Netlify site: ${errText}`);
      }

      site = await createRes.json();
    }

    const siteId = site.id;

    // 3. Compute SHA1 hash of index.html contents
    const sha1 = crypto.createHash("sha1").update(html).digest("hex");

    // 4. Initiate deploy
    const deployRes = await fetch(`https://api.netlify.com/api/v1/sites/${siteId}/deploys`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        files: {
          "index.html": sha1,
        },
      }),
    });

    if (!deployRes.ok) {
      const errText = await deployRes.text();
      throw new Error(`Failed to create Netlify deploy: ${errText}`);
    }

    const deployData = await deployRes.json();
    const deployId = deployData.id;

    // 5. Upload index.html if it's required (usually it is for new/modified deploys)
    if (deployData.required && deployData.required.includes("index.html")) {
      const uploadRes = await fetch(
        `https://api.netlify.com/api/v1/deploys/${deployId}/files/index.html`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/octet-stream",
          },
          body: html,
        }
      );

      if (!uploadRes.ok) {
        const errText = await uploadRes.text();
        throw new Error(`Failed to upload index.html: ${errText}`);
      }
    }

    // Return the final live URL
    return new Response(
      JSON.stringify({
        success: true,
        url: `https://${cleanSlug}.netlify.app`,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    console.error("Netlify Deploy Error:", error);
    return new Response(
      JSON.stringify({
        error: "Netlify API operation failed",
        detail: error.message,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
