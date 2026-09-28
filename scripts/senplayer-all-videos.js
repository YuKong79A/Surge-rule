// Surge http-response script. The response is delivered without modification.
const url = $request.url;
const method = $request.method;
const status = $response.status;
const headers = $response.headers || {};

function header(name) {
  if (Array.isArray(headers)) {
    const item = headers.find(h => h.field.toLowerCase() === name);
    return item ? String(item.value) : "";
  }
  const key = Object.keys(headers).find(k => k.toLowerCase() === name);
  return key ? String(headers[key]) : "";
}

function hash(value) {
  let result = 2166136261;
  for (let i = 0; i < value.length; i++) {
    result ^= value.charCodeAt(i);
    result = Math.imul(result, 16777619);
  }
  return (result >>> 0).toString(36);
}

const path = url.split(/[?#]/)[0];
const contentType = header("content-type").split(";")[0].trim().toLowerCase();
const videoFile = /\.(?:mp4|m4v|mov|mkv|webm|avi|m3u8)$/i.test(path);
const videoType = /^(?:video\/(?:mp4|quicktime|x-matroska|webm|x-msvideo)|application\/(?:vnd\.apple\.mpegurl|x-mpegurl)|audio\/x-mpegurl)$/.test(contentType);
const segment = /\.(?:ts|m4s|cmfv|cmfa|mp2t|aac|mp3|vtt|srt|key)$/i.test(path);

if (method === "GET" && (status === 200 || status === 206) && !segment && (videoFile || videoType)) {
  const storeKey = "senplayer_all_videos_seen";
  let state = { seen: {}, lastNotify: 0 };
  try {
    const saved = JSON.parse($persistentStore.read(storeKey) || "null");
    if (saved && typeof saved === "object") state = saved;
  } catch (_) {}

  if (!state.seen || typeof state.seen !== "object") state.seen = {};
  const now = Date.now();
  const id = hash(url);
  const lastSeen = Number(state.seen[id] || 0);

  if (now - lastSeen > 3600000 && now - Number(state.lastNotify || 0) > 5000) {
    const rawName = path.split("/").pop() || "视频";
    let name = rawName;
    try { name = decodeURIComponent(rawName); } catch (_) {}
    const playUrl = "SenPlayer://x-callback-url/play?url=" + encodeURIComponent(url);
    $notification.post("用 SenPlayer 播放", name, "点击打开视频", {
      action: "open-url",
      url: playUrl
    });
    state.seen[id] = now;
    state.lastNotify = now;
    for (const key of Object.keys(state.seen)) {
      if (now - Number(state.seen[key]) > 3600000) delete state.seen[key];
    }
    $persistentStore.write(JSON.stringify(state), storeKey);
  }
}

$done({});
