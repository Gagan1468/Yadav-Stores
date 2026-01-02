const CJ_BASE = process.env.CJ_API_BASE as string;
const CJ_API_KEY = process.env.CJ_API_KEY as string;

let cachedToken: { token: string; expiresAt: number } | null = null;

async function getToken() {
  const now = Date.now();
  if (cachedToken && now < cachedToken.expiresAt) return cachedToken.token;

  const res = await fetch(`${CJ_BASE}/authentication/getAccessToken`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ apiKey: CJ_API_KEY }),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("Failed to get CJ token", res.status, text);
    throw new Error("Failed to get CJ token");
  }

  const data = await res.json(); // structure from docs[web:100]

  if (data.code !== 200 || !data.result) {
    throw new Error(`CJ auth failed: ${data.message}`);
  }

  const token = data.data.accessToken;
  const expiryDate = new Date(data.data.accessTokenExpiryDate);
  const expiresIn = (expiryDate.getTime() - now) / 1000;

  cachedToken = {
    token,
    expiresAt: now + (expiresIn - 60) * 1000,
  };

  return token;
}

export async function cjRequest(path: string, options: RequestInit = {}) {
  const token = await getToken();

  const res = await fetch(`${CJ_BASE}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "CJ-Access-Token": token, // header from docs[web:100]
      ...(options.headers || {}),
    },
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("CJ API error", res.status, text);
    throw new Error("CJ API error");
  }

  return res.json();
}
