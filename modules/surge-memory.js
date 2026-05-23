!(async () => {
  const mem = $surge.memoryUsage;
  const type = typeof mem;
  const raw = String(mem);

  $done({
    title: "调试",
    content: `type: ${type}\nraw: ${raw}`,
    icon: "memorychip",
    "icon-color": "#34C759",
  });
})();
