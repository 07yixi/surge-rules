!(async () => {
  const mem = $surge.memoryUsage;
  const mb = (mem / 1024 / 1024).toFixed(1);

  const traffic = await httpAPI("/v1/traffic", "GET");
  const uptime = timeTransform(Date.now(), Math.floor(traffic.startTime * 1000));

  let icon = "memorychip";
  let color = "#34C759"; // 绿色
  if (mb >= 45) {
    icon = "exclamationmark.triangle.fill";
    color = "#FF3B30"; // 红色
  } else if (mb >= 40) {
    icon = "exclamationmark.triangle";
    color = "#FF9500"; // 橙色
  }

  $done({
    title: "Surge 内存占用",
    content: `当前内存：${mb} MB\n已运行：${uptime}`,
    icon: icon,
    "icon-color": color,
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
