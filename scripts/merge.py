import urllib.request

SOURCES = [
    {
        "url": "https://ruleset.skk.moe/List/domainset/reject.conf",
        "format": "plain",
        "name": "skk.moe"
    },
    {
        "url": "https://raw.githubusercontent.com/privacy-protection-tools/anti-AD/master/anti-ad-domains.txt",
        "format": "plain",
        "name": "anti-AD"
    },
    {
        "url": "https://raw.githubusercontent.com/hagezi/dns-blocklists/main/domains/light.txt",
        "format": "plain",
        "name": "hagezi-light"
    },
]

domains = set()

for source in SOURCES:
    print(f"拉取: {source['name']}")
    try:
        req = urllib.request.Request(
            source["url"],
            headers={"User-Agent": "Mozilla/5.0"}
        )
        with urllib.request.urlopen(req, timeout=30) as r:
            for line in r.read().decode().splitlines():
                line = line.strip().lstrip('.')
                if not line or line.startswith('#') or line.startswith('!'):
                    continue
                if '/' in line or ' ' in line or ':' in line:
                    continue
                domains.add(line.lower())
        print(f"  累计: {len(domains)} 条")
    except Exception as e:
        print(f"  失败: {e}，跳过")

import os
os.makedirs("rules", exist_ok=True)

with open("rules/reject.conf", "w") as f:
    f.write(f"# Total: {len(domains)}\n")
    for d in sorted(domains):
        f.write(d + "\n")

print(f"\n完成，共 {len(domains)} 条")
