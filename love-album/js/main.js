(() => {
  "use strict";
  const G = window.GIFT || {};
  const $ = (s) => document.querySelector(s);
  const el = (tag, cls, txt) => { const e = document.createElement(tag); if (cls) e.className = cls; if (txt != null) e.textContent = txt; return e; };

  const book = $("#book"), hint = $("#hint"), controls = $("#controls");
  const prevBtn = $("#prev"), nextBtn = $("#next"), count = $("#count");
  document.title = [G.title, G.to].filter(Boolean).join(" · ") || "For You";
  hint.textContent = G.hint || "Tap the ribbon";

  /* ---------- builders ---------- */
  const SVG = "http://www.w3.org/2000/svg";
  const bowSvg = () => {
    const w = document.createElement("div");
    w.innerHTML = `<svg class="bow" viewBox="0 0 200 170" aria-hidden="true">
      <defs><linearGradient id="rg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#f9cdd9"/><stop offset=".5" stop-color="#e88fab"/><stop offset="1" stop-color="#cf5b7a"/></linearGradient></defs>
      <g class="tail tl"><path d="M96 76 L58 156 L80 148 L92 164 L112 82Z" fill="url(#rg)" stroke="#b9506c" stroke-width=".8"/></g>
      <g class="tail tr"><path d="M104 76 L142 156 L120 148 L108 164 L88 82Z" fill="url(#rg)" stroke="#b9506c" stroke-width=".8"/></g>
      <g class="loop ll"><path d="M100 70 C62 12 8 18 14 62 C18 100 70 96 100 70Z" fill="url(#rg)" stroke="#b9506c" stroke-width=".8"/>
        <path d="M96 68 C68 46 36 44 22 56" fill="none" stroke="rgba(255,255,255,.6)" stroke-width="2" stroke-linecap="round"/></g>
      <g class="loop lr"><path d="M100 70 C138 12 192 18 186 62 C182 100 130 96 100 70Z" fill="url(#rg)" stroke="#b9506c" stroke-width=".8"/>
        <path d="M104 68 C132 46 164 44 178 56" fill="none" stroke="rgba(255,255,255,.6)" stroke-width="2" stroke-linecap="round"/></g>
      <rect class="knot" x="86" y="54" width="28" height="32" rx="12" fill="url(#rg)" stroke="#b9506c" stroke-width=".8"/>
    </svg>`;
    return w.firstElementChild;
  };

  const buildCover = () => {
    const c = el("div", "cover");
    const t = el("div", "cover-text");
    t.append(el("h1", "", G.title || "For You"), el("p", "", G.subtitle || ""), el("span", "heart", "\u2665"));
    c.append(t);
    if (G.to) c.append(el("div", "cover-to", "for " + G.to));
    const r = el("button", "ribbon"); r.type = "button"; r.setAttribute("aria-label", "Untie the ribbon to open the album");
    r.append(el("div", "band"), bowSvg());
    c.append(r);
    return { node: c, ribbon: r };
  };

  const buildPhoto = (p, num) => {
    const pg = el("div", "page a-" + (["top", "center"].includes(p.align) ? p.align : "bottom"));
    const m = el("div", "mount");
    let media;
    if (p.video) {
      media = document.createElement("video");
      media.src = p.video; media.controls = true; media.playsInline = true; media.preload = "metadata";
      if (p.poster) media.poster = p.poster;
      media.addEventListener("error", () => m.classList.add("noimg"));
      m.classList.add("is-video");
    } else {
      media = new Image();
      media.alt = p.title || "Our memory"; media.loading = "lazy"; media.decoding = "async";
      media.onerror = () => m.classList.add("noimg");
      media.src = p.image || "";
      if (!p.image) m.classList.add("noimg");
    }
    const msg = el("div", "msg");
    if (p.title) msg.append(el("h3", "", p.title));
    if (p.message) msg.append(el("p", "", p.message));
    m.append(media, el("div", "veil"), msg);
    pg.append(m, el("span", "pn", String(num)));
    return pg;
  };

  const buildLetter = (l, num) => {
    const pg = el("div", "page letter");
    pg.dataset.noflip = "1";
    pg.tabIndex = 0;
    const content = el("div", "letter-content");
    content.append(el("div", "greet", l.greeting || ""));
    (l.paragraphs || []).forEach((t) => content.append(el("p", "", t)));
    content.append(el("p", "", l.closing || ""), el("div", "sign", l.signature || G.from || ""));
    pg.append(content);
    return pg;
  };

  /* ---------- model ---------- */
  const items = (G.pages || []).map((p) => ({ type: "photo", data: p }));
  if (G.letter) items.push({ type: "letter", data: G.letter });
  if (items.length % 2) items.push({ type: "end" });

  const render = (it, num) =>
    it.type === "photo" ? buildPhoto(it.data, num)
    : it.type === "letter" ? buildLetter(it.data, num)
    : el("div", "page end-page", "\u2665");

  const leaves = [];
  const mkLeaf = (front, back, cls) => {
    const l = el("div", "leaf" + (cls ? " " + cls : ""));
    const f = el("div", "face front"), b = el("div", "face back");
    f.append(front); b.append(back); l.append(f, b);
    return l;
  };

  const base = el("div", "back-board");
  base.append(el("p", "", G.backCover || ""));
  book.append(base);

  const cover = buildCover();
  const endpaper = el("div", "page endpaper");
  endpaper.append(el("p", "", G.endpaper || ""));
  leaves.push(mkLeaf(cover.node, endpaper, "cover-leaf"));
  for (let i = 0; i < items.length; i += 2) {
    leaves.push(mkLeaf(render(items[i], i + 1), render(items[i + 1], i + 2)));
  }
  leaves.forEach((l) => book.append(l));
  const N = leaves.length;

  /* ---------- state ---------- */
  let flipped = 0, opening = false;

  const layer = () => leaves.forEach((l, i) => { l.style.zIndex = i < flipped ? i : N - i; });
  layer();

  const go = (n) => {
    n = Math.max(0, Math.min(N, n));
    if (n === flipped) return;
    const lo = Math.min(n, flipped), hi = Math.max(n, flipped);
    for (let i = lo; i < hi; i++) leaves[i].style.zIndex = N + 1;   // keep turning leaves on top
    document.querySelectorAll("video").forEach((v) => v.pause());
    leaves.forEach((l, i) => l.classList.toggle("flipped", i < n));
    flipped = n;
    book.classList.toggle("is-closed", flipped === 0);
    setTimeout(layer, 600);
    update();
  };

  const update = () => {
    controls.hidden = flipped === 0;
    prevBtn.disabled = flipped === 0;
    nextBtn.disabled = flipped === N;
    count.textContent = flipped + " / " + N;
  };

  /* ---------- ribbon ---------- */
  const song = new Audio("assets/music/song.mp3");
  song.loop = true;

  // Pause the song while the video plays, bring it back afterwards   // NEW
  document.addEventListener("play", (e) => {                           // NEW
    if (e.target.tagName === "VIDEO") song.pause();                    // NEW
  }, true);                                                            // NEW
  const backToSong = (e) => {                                          // NEW
    if (e.target.tagName === "VIDEO") song.play();                     // NEW
  };                                                                   // NEW
  document.addEventListener("pause", backToSong, true);                // NEW
  document.addEventListener("ended", backToSong, true);                // NEW

  const untie = () => {
    if (opening || flipped > 0) return;
    opening = true;
    song.play();
    hint.classList.add("gone");
    cover.ribbon.classList.add("untie");
    setTimeout(() => cover.ribbon.classList.add("fall"), 1000);
    setTimeout(() => { go(1); }, 1500);
    setTimeout(() => { cover.ribbon.style.display = "none"; }, 2400);
  };
  cover.ribbon.addEventListener("click", untie);

  /* ---------- navigation ---------- */
  const next = () => { if (flipped > 0) go(flipped + 1); };
  const prev = () => { if (flipped > 0) go(flipped - 1); };
  nextBtn.addEventListener("click", next);
  prevBtn.addEventListener("click", prev);

  book.addEventListener("click", (e) => {
    if (e.target.closest("[data-noflip]") || e.target.closest(".ribbon") || e.target.closest("video") || flipped === 0) return;
    const face = e.target.closest(".face");
    if (!face) return;
    face.classList.contains("front") ? next() : prev();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") next();
    else if (e.key === "ArrowLeft") prev();
    else if ((e.key === "Enter" || e.key === " ") && flipped === 0 && document.activeElement === document.body) { e.preventDefault(); untie(); }
  });

  let sx = null;
  book.addEventListener("pointerdown", (e) => { sx = e.target.closest("[data-noflip], video") ? null : e.clientX; });
  window.addEventListener("pointerup", (e) => {
    if (sx === null) return;
    const dx = e.clientX - sx; sx = null;
    if (Math.abs(dx) > 60) dx < 0 ? next() : prev();
  });

  update();
})();
