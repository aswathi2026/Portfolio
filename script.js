/* =====================================================================
   EDIT YOUR CONTENT HERE. Everything on the page is rendered from this
   object. Leave a value empty ("") to hide it. Sample content is marked.
   ===================================================================== */
const CONFIG = {
  name: "Your Name",                         // SAMPLE
  initials: "YN",
  availability: "Open to new opportunities", // "" hides the badge
  roles: ["full stack web apps", "clean, accessible interfaces", "reliable APIs"], // SAMPLE
  heroText: "Full stack developer focused on turning ideas into fast, dependable products. Replace this with a short description of your expertise and the value you bring.", // SAMPLE
  profileImage: "assets/images/profile.jpg", // add your photo; initials show if missing
  resume: "assets/resume.pdf",               // "" hides the button
  about: [ // SAMPLE paragraphs
    "Write a short introduction about who you are and what you do.",
    "Describe your background and career journey in a few honest sentences.",
    "Share your areas of specialization, interests, goals and how you approach problems."
  ],
  stats: [ /* verified numbers only, e.g. { value: "3+", label: "Years of experience" } */ ],
  skills: { // SAMPLE categories. Rename, add or remove freely.
    "Frontend": ["HTML5", "CSS3", "JavaScript", "React", "Tailwind CSS"],
    "Backend": ["Node.js", "Express", "REST APIs"],
    "Databases": ["MongoDB", "PostgreSQL"],
    "Tools and platforms": ["Git", "GitHub", "Docker", "Figma"]
  },
  projects: [ // SAMPLE. Empty image/demo/code/caseStudy values hide that element.
    { title: "Sample Project One", category: "Web Development", description: "One sentence on what this project does and why it matters.", tech: ["React", "Node.js", "MongoDB"], features: ["Key feature or problem solved", "Another highlight"], image: "", demo: "", code: "", caseStudy: "" },
    { title: "Sample Project Two", category: "Data Analytics", description: "Describe the data, the question and the outcome.", tech: ["Python", "Pandas", "Power BI"], features: ["Key insight delivered"], image: "", demo: "", code: "", caseStudy: "" },
    { title: "Sample Project Three", category: "Data Science", description: "Describe the model, the dataset and how you evaluated it.", tech: ["Python", "scikit-learn"], features: ["Result or learning"], image: "", demo: "", code: "", caseStudy: "" }
  ],
  experience: [ // SAMPLE
    { title: "Your Job Title", org: "Company Name", start: "Start", end: "Present", points: ["Responsibility or achievement."], tech: ["Tech"] },
    { title: "Your Degree or Course", org: "Institution", start: "Start", end: "End", points: ["Relevant coursework or project."], tech: [] }
  ],
  certifications: [ /* e.g. { title: "Certificate name", issuer: "Issuer", year: "2025", link: "" } */ ],
  contact: { // Leave "" to hide a method
    email: "you@example.com",   // SAMPLE
    phone: "",                  // e.g. "+911234567890"
    whatsapp: "",               // digits with country code, e.g. "911234567890"
    whatsappMessage: "Hi! I found your portfolio and would like to connect.",
    linkedin: "",               // full profile URL
    github: "",                 // full profile URL
    instagram: "",              // full profile URL
    location: ""                // e.g. "Kozhikode, India"
  }
};

(() => {
  "use strict";
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = (v) => String(v).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const icon = (n, c = "") => `<i data-lucide="${n}" class="${c}"></i>`;
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const C = CONFIG, ct = C.contact;
  const NAV = [["home", "Home"], ["about", "About"], ["skills", "Skills"], ["projects", "Projects"], ["experience", "Experience"], ["contact", "Contact"]];
  const refreshIcons = () => window.lucide && window.lucide.createIcons();

  const socialHTML = [["github", "GitHub", ct.github], ["linkedin", "LinkedIn", ct.linkedin], ["instagram", "Instagram", ct.instagram]]
    .filter((s) => s[2])
    .map(([i, l, u]) => `<a class="icon-btn" href="${esc(u)}" target="_blank" rel="noopener noreferrer" aria-label="${l} (opens in a new tab)">${icon(i)}</a>`).join("");

  function renderStatic() {
    $$("[data-bind='name']").forEach((e) => (e.textContent = C.name));
    $$("[data-bind='brand']").forEach((e) => (e.textContent = C.initials));
    $("#avatar-fallback").textContent = C.initials;
    $("[data-bind='heroText']").textContent = C.heroText;
    if (C.availability) $("[data-bind='availability']").textContent = C.availability; else $(".badge").hidden = true;
    $("#year").textContent = new Date().getFullYear();

    const links = NAV.map(([id, l]) => `<a class="nav-link" href="#${id}">${l}</a>`).join("");
    $("#nav-desktop").innerHTML = links;
    $("#nav-mobile").innerHTML = links + `<a class="btn btn-primary mt-3 sm:!hidden" href="#contact">Let's Connect</a>`;
    $("#nav-footer").innerHTML = NAV.map(([id, l]) => `<a class="hover:underline" href="#${id}">${l}</a>`).join("");
    $("#hero-socials").innerHTML = socialHTML;
    $("#footer-socials").innerHTML = socialHTML;

    const img = $("#avatar");
    if (C.profileImage) { img.src = C.profileImage; img.addEventListener("error", () => img.remove()); } else img.remove();

    $("#about-text").innerHTML = C.about.map((p) => `<p>${esc(p)}</p>`).join("");
    $("#stats").innerHTML = C.stats.map((s) => `<div class="card stat"><b>${esc(s.value)}</b><span class="muted text-sm">${esc(s.label)}</span></div>`).join("");
    if (C.resume) { const r = $("#resume"); r.href = C.resume; r.hidden = false; }

    $("#skills-grid").innerHTML = Object.entries(C.skills).filter(([, v]) => v.length).map(([cat, list]) =>
      `<div class="card reveal"><h3 class="font-semibold text-lg mb-4">${esc(cat)}</h3><div class="flex flex-wrap gap-2">${list.map((s) => `<span class="chip">${esc(s)}</span>`).join("")}</div></div>`).join("");

    $("#timeline").innerHTML = C.experience.map((e) =>
      `<li class="reveal"><div class="card"><p class="muted text-sm">${esc(e.start)} to ${esc(e.end)}</p><h3 class="font-semibold text-lg mt-1">${esc(e.title)}</h3><p class="accent text-sm font-medium">${esc(e.org)}</p>
      ${e.points && e.points.length ? `<ul class="mt-3 space-y-1 muted text-sm list-disc pl-4">${e.points.map((p) => `<li>${esc(p)}</li>`).join("")}</ul>` : ""}
      ${e.tech && e.tech.length ? `<div class="flex flex-wrap gap-2 mt-4">${e.tech.map((t) => `<span class="chip">${esc(t)}</span>`).join("")}</div>` : ""}</div></li>`).join("");

    if (C.certifications.length) {
      $("#achievements").hidden = false;
      $("#certs-grid").innerHTML = C.certifications.map((c) => {
        const inner = `<span class="accent">${icon("award")}</span><h3 class="font-semibold mt-3">${esc(c.title)}</h3><p class="muted text-sm mt-1">${esc(c.issuer || "")} ${esc(c.year || "")}</p>`;
        return c.link ? `<a class="card reveal block" href="${esc(c.link)}" target="_blank" rel="noopener noreferrer">${inner}</a>` : `<div class="card reveal">${inner}</div>`;
      }).join("");
    }
  }

  function renderProjects() {
    const cats = ["All", ...new Set(C.projects.map((p) => p.category))];
    const filters = $("#filters");
    filters.innerHTML = cats.length > 2 ? cats.map((c, i) => `<button class="filter" type="button" data-cat="${esc(c)}" aria-pressed="${i === 0}">${esc(c)}</button>`).join("") : "";
    $("#projects-grid").innerHTML = C.projects.map((p) => {
      const link = (u, i, l) => u ? `<a class="link" href="${esc(u)}" target="_blank" rel="noopener noreferrer">${icon(i)}${l}</a>` : "";
      return `<article class="card project reveal" data-cat="${esc(p.category)}">
        <div class="thumb">${p.image ? `<img src="${esc(p.image)}" alt="Screenshot of ${esc(p.title)}" loading="lazy" width="640" height="360">` : icon("layout-dashboard")}</div>
        <div class="body"><h3 class="font-semibold text-xl">${esc(p.title)}</h3><p class="muted text-sm leading-relaxed">${esc(p.description)}</p>
        ${p.features && p.features.length ? `<ul>${p.features.map((f) => `<li>${esc(f)}</li>`).join("")}</ul>` : ""}
        <div class="flex flex-wrap gap-2">${p.tech.map((t) => `<span class="chip">${esc(t)}</span>`).join("")}</div>
        <div class="flex flex-wrap gap-x-5 gap-y-2 mt-auto pt-2">${link(p.demo, "external-link", "Live demo")}${link(p.code, "code", "Source code")}${link(p.caseStudy, "book-open", "Case study")}</div></div></article>`;
    }).join("");
    filters.addEventListener("click", (e) => {
      const b = e.target.closest(".filter"); if (!b) return;
      $$(".filter", filters).forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
      $$(".project").forEach((card) => (card.hidden = b.dataset.cat !== "All" && card.dataset.cat !== b.dataset.cat));
    });
  }

  function renderContact() {
    const ext = ' target="_blank" rel="noopener noreferrer"';
    const wa = ct.whatsapp ? `https://wa.me/${ct.whatsapp.replace(/\D/g, "")}${ct.whatsappMessage ? "?text=" + encodeURIComponent(ct.whatsappMessage) : ""}` : "";
    const items = [
      [ct.email, "mail", "Email", ct.email, `mailto:${ct.email}`, ""],
      [ct.phone, "phone", "Phone", ct.phone, `tel:${ct.phone.replace(/[^\d+]/g, "")}`, ""],
      [wa, "message-circle", "WhatsApp", "Chat directly", wa, ext],
      [ct.linkedin, "linkedin", "LinkedIn", "Connect professionally", ct.linkedin, ext],
      [ct.github, "github", "GitHub", "Browse my code", ct.github, ext],
      [ct.instagram, "instagram", "Instagram", "Follow along", ct.instagram, ext]
    ].filter((i) => i[0]).map(([, ic, l, d, href, attr]) =>
      `<a class="card contact-card reveal" href="${esc(href)}"${attr}><span class="ico-wrap">${icon(ic, "ico")}</span><span><b>${l}</b><span class="d">${esc(d)}</span></span></a>`);
    if (ct.location) items.push(`<div class="card contact-card reveal"><span class="ico-wrap">${icon("map-pin", "ico")}</span><span><b>Location</b><span class="d">${esc(ct.location)}</span></span></div>`);
    $("#contact-grid").innerHTML = items.join("");
  }

  function initNav() {
    const btn = $("#menu-toggle"), menu = $("#mobile-menu");
    const set = (open) => {
      menu.hidden = !open; btn.setAttribute("aria-expanded", String(open));
      btn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      btn.innerHTML = `<i data-lucide="${open ? "x" : "menu"}"></i>`; refreshIcons();
    };
    btn.addEventListener("click", () => set(menu.hidden));
    menu.addEventListener("click", (e) => { if (e.target.closest("a")) set(false); });
    document.addEventListener("click", (e) => { if (!menu.hidden && !e.target.closest("#header")) set(false); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !menu.hidden) { set(false); btn.focus(); } });

    const links = $$("#nav-desktop .nav-link, #nav-mobile .nav-link");
    const io = new IntersectionObserver((entries) => entries.forEach((en) => {
      if (!en.isIntersecting) return;
      links.forEach((a) => { const on = a.getAttribute("href") === "#" + en.target.id; a.classList.toggle("active", on); if (on) a.setAttribute("aria-current", "true"); else a.removeAttribute("aria-current"); });
    }), { rootMargin: "-45% 0px -50% 0px" });
    NAV.forEach(([id]) => { const s = document.getElementById(id); if (s) io.observe(s); });
  }

  function initTheme() {
    $("#theme-toggle").addEventListener("click", () => {
      const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
      document.documentElement.dataset.theme = next;
      try { localStorage.setItem("theme", next); } catch (e) {}
    });
  }

  function initReveal() {
    const els = $$(".reveal");
    if (reduced || !("IntersectionObserver" in window)) return els.forEach((e) => e.classList.add("in"));
    const io = new IntersectionObserver((en) => en.forEach((x) => { if (x.isIntersecting) { x.target.classList.add("in"); io.unobserve(x.target); } }), { threshold: 0.12 });
    els.forEach((e) => io.observe(e));
  }

  function initRoles() {
    const el = $("#role"), roles = C.roles; if (!el || !roles.length) return;
    if (reduced) { el.textContent = roles[0]; return; }
    let r = 0, i = 0, del = false;
    (function tick() {
      const w = roles[r];
      el.textContent = w.slice(0, i);
      if (!del && i === w.length) { del = true; return setTimeout(tick, 1600); }
      if (del && i === 0) { del = false; r = (r + 1) % roles.length; }
      i += del ? -1 : 1;
      setTimeout(tick, del ? 35 : 70);
    })();
  }

  function initTop() {
    const b = $("#to-top");
    addEventListener("scroll", () => { b.hidden = scrollY < 600; }, { passive: true });
    b.addEventListener("click", () => scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" }));
  }

  document.addEventListener("DOMContentLoaded", () => {
    renderStatic(); renderProjects(); renderContact();
    initNav(); initTheme(); initReveal(); initRoles(); initTop();
    refreshIcons();
  });
  window.addEventListener("load", refreshIcons);
})();