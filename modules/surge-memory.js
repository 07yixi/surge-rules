!(async () => {
  const traffic = await httpAPI("/v1/traffic", "GET");
  const uptime = timeTransform(Date.now(), Math.floor(traffic.startTime * 1000));
  const outIn = ((traffic.interface?.in || 0) / 1024 / 1024).toFixed(0);
  const outOut = ((traffic.interface?.out || 0) / 1024 / 1024).toFixed(0);

  $done({
    title: "Surge 运行状态",
    content: `已运行：${uptime}\n↓ ${outIn} MB  ↑ ${outOut} MB`,
    icon: "paperplane.circle",
    "icon-color": "#34C759",
  });
})();

function timeTransform(now, start) {
  const diff = now - start;
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.round((diff % 60000) / 1000);
  if (d > 0) return `${d}天${h}时${m}分`;
  if (h > 0) return `${h}时${m}分${s}秒`;
  if (m > 0) return `${m}分${s}秒`;
  return `${s}秒`;
}

function httpAPI(path, method = "GET", body = null) {
  return new Promise((resolve) => {
    $httpAPI(method, path, body, (result) => resolve(result));
  });
}
