const works = [
  {
    title: "drawing",
    desc: "Eksperimen visual dengan nuansa clasic.",
    icon: "✦",
    tags: ["Artwork", "Visual"],
    link: "rina/index.html",
  },
  {
    title: "Creator Landing",
    desc: "Konsep website modern untuk personal creator.",
    icon: "◈",
    tags: ["Web", "UI/UX"],
  },
  {
    title: "Night Motion",
    desc: "Motion graphic dengan suasana malam futuristik.",
    icon: "☄",
    tags: ["Motion", "Video"],
  },
];

const friends = [
  {
    name: "Karin",
    user: "@Rina",
    bio: "Digital artist",
    avatar: "T1",
    links: [
      ["Instagram", "https://www.instagram.com/ray_to.rin?stkn=ajh5aXVyMXM4ajZw"],
      ["TikTok", "https://www.tiktok.com/@ahpotatoes?_r=1&_t=ZS-99edOYGNxIt"],
    ],
  },
  {
    name: "dendon",
    user: "@winkii",
    bio: "content creator & streamer",
    avatar: "T2",
    links: [
      ["Instagram", "https://www.instagram.com/helowinkooo?stkn=MWFuaWRzMGlscnFqcw=="],
      ["TikTok", "https://www.tiktok.com/@thegirlwithnoaim?_r=1&_t=ZS-99edVjQWpKa"],
    ],
  },
  {
    name: "Nama Teman 3",
    user: "@teman3",
    bio: "Illustrator & creative maker",
    avatar: "T3",
    links: [
      ["Instagram", "https://instagram.com/username"],
      ["TikTok", "https://tiktok.com/@username"],
    ],
  },
  {
    name: "Nama Teman 4",
    user: "@teman4",
    bio: "Video editor & creator",
    avatar: "T4",
    links: [
      ["YouTube", "https://youtube.com/@username"],
      ["TikTok", "https://tiktok.com/@username"],
    ],
  },
];

document.querySelector("#worksGrid").innerHTML = works
  .map(
    (w, i) => `
<a class="work" href="${w.link || '#'}" ${w.link ? 'target="_blank" rel="noopener"' : ''}>
  <div class="cover c${i + 1}"><span>${w.icon}</span></div>
  <div class="work-body">
    <h3>${w.title}</h3><p>${w.desc}</p>
    ${w.tags.map((t) => `<span class="tag">${t}</span>`).join("")}
  </div>
</a>`,
  )
  .join("");

document.querySelector("#friendsGrid").innerHTML = friends
  .map(
    (f) => `
<article class="friend">
  <div class="friend-avatar">${f.avatar}</div>
  <div>
    <h3>${f.name}</h3><p>${f.user} · ${f.bio}</p>
    <div class="friend-links">
      ${f.links.map((l) => `<a href="${l[1]}" target="_blank" rel="noopener">${l[0]}</a>`).join("")}
    </div>
  </div>
</article>`,
  )
  .join("");

const obs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add("visible");
    });
  },
  { threshold: 0.12 },
);
document.querySelectorAll(".reveal").forEach((e) => obs.observe(e));

document.querySelector("#year").textContent = new Date().getFullYear();

const canvas = document.querySelector("#particles");
const ctx = canvas.getContext("2d");
let pts = [];

function resize() {
  const dpr = Math.min(devicePixelRatio || 1, 2);
  canvas.width = innerWidth * dpr;
  canvas.height = innerHeight * dpr;
  canvas.style.width = innerWidth + "px";
  canvas.style.height = innerHeight + "px";
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  pts = Array.from(
    { length: Math.min(120, Math.floor(innerWidth / 10)) },
    () => ({
      x: Math.random() * innerWidth,
      y: Math.random() * innerHeight,
      r: Math.random() * 1.6 + 0.2,
      v: Math.random() * 0.28 + 0.04,
      a: Math.random() * 0.55 + 0.1,
      tw: Math.random() * Math.PI * 2,
    }),
  );
}
resize();
addEventListener("resize", resize);

function draw() {
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  pts.forEach((p) => {
    p.y -= p.v;
    p.tw += 0.018;
    if (p.y < 0) p.y = innerHeight;
    const alpha = Math.max(0.04, p.a + Math.sin(p.tw) * 0.12);
    ctx.globalAlpha = alpha;
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
  });
  requestAnimationFrame(draw);
}
draw();