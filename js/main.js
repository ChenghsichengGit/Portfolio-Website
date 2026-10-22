/* ============================================================
 * 網站邏輯（渲染、Modal、日夜切換），一般情況不需修改
 * 作品與分類資料在 js/data.js
 * ============================================================ */
const $ = s => document.querySelector(s);
const tabsEl = $("#tabs"), gridEl = $("#grid");
const backdrop = $("#backdrop"), mTitle = $("#mTitle"), mBody = $("#mBody");
let activeCat = (visibleCategories()[0] || CATEGORIES[0]).id;
let lastFocus = null;
let currentProject = null;   /* 目前開啟的作品，切換語言時用來重繪 Modal */

/* ============================================================
 * 多語系
 *   介面文字放在 UI；作品內容的翻譯在 js/data.js
 *   起始語言：使用者上次選的 → 瀏覽器／系統語言 → 英文
 * ============================================================ */
const LANGS = [
    { id: "zh-Hant", label: "繁" },
    { id: "zh-Hans", label: "简" },
    { id: "en", label: "EN" },
    { id: "ja", label: "日" }
];

const UI = {
    roleSub: { "zh-Hant": "軟體工程師(C#/Unity)", "zh-Hans": "软件工程师(C#/Unity)", en: "Software Engineer (C#/Unity)", ja: "ソフトウェアエンジニア（C#/Unity）" },
    overview: { "zh-Hant": "作品介紹", "zh-Hans": "作品介绍", en: "Overview", ja: "作品紹介" },
    tech: { "zh-Hant": "使用工具與功能", "zh-Hans": "使用工具与功能", en: "Tools & Features", ja: "使用ツールと機能" },
    roles: { "zh-Hant": "負責內容", "zh-Hans": "负责内容", en: "Responsibilities", ja: "担当内容" },
    highlights: { "zh-Hant": "技術亮點", "zh-Hans": "技术亮点", en: "Technical Highlights", ja: "技術的ハイライト" },
    limits: { "zh-Hant": "取捨與已知限制", "zh-Hans": "取舍与已知限制", en: "Trade-offs & Known Limits", ja: "トレードオフと既知の制限" },
    links: { "zh-Hant": "相關連結", "zh-Hans": "相关链接", en: "Links", ja: "関連リンク" },
    emptyHint: { "zh-Hant": "此分類尚無作品", "zh-Hans": "此分类尚无作品", en: "Nothing here yet", ja: "このカテゴリーにはまだ作品がありません" },
    viewProject: { "zh-Hant": "查看作品：", "zh-Hans": "查看作品：", en: "View project: ", ja: "作品を見る：" },
    coverAlt: { "zh-Hant": " 封面", "zh-Hans": " 封面", en: " cover", ja: " カバー画像" },
    videoAlt: { "zh-Hant": " 影片", "zh-Hans": " 视频", en: " video", ja: " 動画" },
    previewAlt: { "zh-Hant": " 預覽", "zh-Hans": " 预览", en: " preview", ja: " プレビュー" },
    close: { "zh-Hant": "關閉", "zh-Hans": "关闭", en: "Close", ja: "閉じる" },
    themeToggle: { "zh-Hant": "切換日夜模式", "zh-Hans": "切换日夜模式", en: "Toggle dark mode", ja: "ダークモード切り替え" },
    navLabel: { "zh-Hant": "作品分類", "zh-Hans": "作品分类", en: "Project categories", ja: "作品カテゴリー" },
    copied: { "zh-Hant": "已複製", "zh-Hans": "已复制", en: "Copied", ja: "コピーしました" },
    langLabel: { "zh-Hant": "切換語言", "zh-Hans": "切换语言", en: "Change language", ja: "言語切り替え" }
};

function detectLang() {
    try {
        const saved = localStorage.getItem("lang");
        if (saved && LANGS.some(l => l.id === saved)) return saved;
    } catch (e) { /* 無痕模式等情況讀不到，忽略 */ }

    const list = navigator.languages && navigator.languages.length
        ? navigator.languages : [navigator.language || ""];
    for (const raw of list) {
        const s = String(raw).toLowerCase();
        if (s.startsWith("ja")) return "ja";
        if (s.startsWith("zh")) return /hans|-cn|-sg|-my/.test(s) ? "zh-Hans" : "zh-Hant";
        if (s.startsWith("en")) return "en";
    }
    return "en";
}

let lang = detectLang();

/* 取出目前語言的文字；傳入字串就原樣回傳（專有名詞用） */
function t(v) {
    if (v == null) return "";
    if (typeof v === "string") return v;
    return v[lang] || v.en || v["zh-Hant"] || Object.values(v)[0] || "";
}

function setLang(l) {
    lang = l;
    try { localStorage.setItem("lang", l); } catch (e) { /* 無法儲存就只套用這次 */ }
    document.documentElement.lang = l;
    renderLangBtns();
    applyUI();
    renderAbout();
    renderTabs();
    renderGrid();
    if (backdrop.classList.contains("open") && currentProject) openModal(currentProject, lastFocus);
}

function renderLangBtns() {
    const box = $("#langs");
    box.innerHTML = "";
    LANGS.forEach(l => {
        const b = document.createElement("button");
        b.className = "lang-btn";
        b.textContent = l.label;
        b.lang = l.id;
        b.setAttribute("aria-pressed", l.id === lang);
        b.addEventListener("click", () => setLang(l.id));
        box.appendChild(b);
    });
}

/* 套用介面上的靜態文字 */
function applyUI() {
    $("#roleSub").textContent = t(UI.roleSub);
    $("#themeBtn").setAttribute("aria-label", t(UI.themeToggle));
    $("#closeBtn").setAttribute("aria-label", t(UI.close));
    $("#nav").setAttribute("aria-label", t(UI.navLabel));
    $("#langs").setAttribute("aria-label", t(UI.langLabel));
}

/* ---------- 日夜切換 ---------- */
/* 註：目前不儲存偏好；若想記住使用者選擇，可改用 localStorage：
   讀取 → const saved = localStorage.getItem("theme");
   儲存 → localStorage.setItem("theme", mode);             */
function setTheme(mode) {
    document.documentElement.dataset.theme = mode;
    $("#themeIcon").textContent = mode === "dark" ? "☾" : "☀";
    $("#themeLbl").textContent = mode === "dark" ? "NIGHT" : "DAY";
}
$("#themeBtn").addEventListener("click", () => {
    setTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark");
});
if (window.matchMedia("(prefers-color-scheme: light)").matches) setTheme("light");

/* ---------- 關於我 ---------- */
/* 複製文字到剪貼簿，並在按鈕上顯示 1.6 秒的回饋 */
function copyToClipboard(text, el) {
    const label = el.querySelector(".c-label");
    const done = () => {
        label.textContent = t(UI.copied);
        el.classList.add("copied");
        clearTimeout(el._resetTimer);
        el._resetTimer = setTimeout(() => {
            label.textContent = label.dataset.orig;
            el.classList.remove("copied");
        }, 1600);
    };
    /* 非安全來源（例如直接用 file:// 開啟）沒有 clipboard API，改用舊的做法 */
    const fallback = () => {
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand("copy"); done(); } catch (e) { /* 複製失敗就不給回饋 */ }
        ta.remove();
    };
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(done).catch(fallback);
    } else {
        fallback();
    }
}

function renderAbout() {
    const intro = $("#aboutIntro");
    intro.innerHTML = "";
    t(ABOUT.intro).forEach(s => {
        const ln = document.createElement("span");
        ln.className = "ln"; ln.textContent = s;
        intro.appendChild(ln);
    });
    const hintText = t(ABOUT.introHint);
    if (hintText) {
        const hint = document.createElement("span");
        hint.className = "hint"; hint.textContent = hintText;
        intro.appendChild(hint);
    }

    const sk = $("#skills");
    sk.innerHTML = "";
    ABOUT.skills.forEach(g => {
        const row = document.createElement("div");
        row.className = "sk-row";
        const label = document.createElement("span");
        label.className = "sk-label"; label.textContent = t(g.group);
        const chips = document.createElement("div");
        chips.className = "chips";
        g.items.forEach(x => {
            const c = document.createElement("span");
            c.className = "chip"; c.textContent = t(x);
            chips.appendChild(c);
        });
        row.appendChild(label); row.appendChild(chips);
        sk.appendChild(row);
    });

    const cs = $("#contacts");
    cs.innerHTML = "";
    ABOUT.contacts.forEach(c => {
        const el = document.createElement(c.copy ? "button" : "a");
        if (c.copy) {
            el.type = "button";
            el.addEventListener("click", () => copyToClipboard(c.copy, el));
        } else {
            el.href = c.url;
            el.target = "_blank";
            el.rel = "noopener noreferrer";
        }
        const ico = document.createElement("span");
        ico.className = "ico"; ico.textContent = c.icon;
        const label = document.createElement("span");
        label.className = "c-label";
        label.textContent = t(c.label);
        label.dataset.orig = label.textContent;
        el.appendChild(ico); el.appendChild(label);
        cs.appendChild(el);
    });
}

/* 邊框泛光：金色光暈跟著游標跑（ABOUT 面板與作品詳細頁共用） */
function bindGlow(box) {
    if (!box) return;
    box.addEventListener("mousemove", e => {
        const r = box.getBoundingClientRect();
        box.style.setProperty("--mx", (e.clientX - r.left) + "px");
        box.style.setProperty("--my", (e.clientY - r.top) + "px");
        box.classList.add("glow");
    });
    box.addEventListener("mouseleave", () => box.classList.remove("glow"));
}

/* 技能方塊：外框亮度依與游標的距離變化 */
const CHIP_GLOW_RADIUS = 150;
function bindChipGlow() {
    const box = document.querySelector(".about .pxb");
    if (!box) return;
    const fade = () => document.querySelectorAll("#skills .chip")
        .forEach(c => c.style.setProperty("--p", 0));
    box.addEventListener("mousemove", e => {
        document.querySelectorAll("#skills .chip").forEach(c => {
            const r = c.getBoundingClientRect();
            const dx = e.clientX - (r.left + r.width / 2);
            const dy = e.clientY - (r.top + r.height / 2);
            const d = Math.hypot(dx, dy);
            c.style.setProperty("--p", Math.max(0, 1 - d / CHIP_GLOW_RADIUS).toFixed(3));
        });
    });
    box.addEventListener("mouseleave", fade);
}

/* ---------- 分類標籤 ---------- */
/* 只取出「有作品」的分類，空分類不顯示在標籤列 */
function visibleCategories() {
    return CATEGORIES.filter(c => PROJECTS.some(p => p.categories.includes(c.id)));
}

function renderTabs() {
    tabsEl.innerHTML = "";
    visibleCategories().forEach(c => {
        const b = document.createElement("button");
        b.className = "tab";
        b.textContent = t(c.label);
        b.setAttribute("role", "tab");
        b.setAttribute("aria-selected", c.id === activeCat);
        b.addEventListener("click", () => { activeCat = c.id; renderTabs(); renderGrid(); });
        tabsEl.appendChild(b);
    });
}

/* ---------- 封面 ---------- */
/* 從 YouTube 網址取出影片 id（支援 watch?v=、youtu.be） */
function ytInfo(url) {
    const m = (url || "").match(/(?:youtu\.be\/|v=)([\w-]{11})/);
    return m ? { id: m[1] } : null;
}

function coverEl(cover, title, small) {
    const wrap = document.createElement("div");
    wrap.className = small ? "cover" : "m-cover pxb";
    const inner = small ? wrap : document.createElement("div");
    if (!small) { inner.className = "pxb-in"; wrap.appendChild(inner); }

    const ph = () => {
        const d = document.createElement("div");
        d.className = "ph"; d.textContent = "?";
        if (!small) d.style.aspectRatio = "16/9";
        inner.appendChild(d);
    };

    if (cover && cover.type === "youtube") {
        const yt = ytInfo(cover.url || cover.src);
        /* 用 file:// 直接開啟時 YouTube 會拒絕內嵌（錯誤 153），退回縮圖顯示；
           部署上線或用本機伺服器（http/https）開啟才會內嵌播放 */
        const noEmbed = location.protocol === "file:";
        const thumb = () => {
            /* YouTube 縮圖：先試高解析，失敗退回標準畫質 */
            const img = document.createElement("img");
            img.src = `https://i.ytimg.com/vi/${yt.id}/maxresdefault.jpg`;
            img.alt = title + t(UI.coverAlt); img.loading = "lazy";
            img.onerror = () => {
                img.onerror = () => { img.remove(); ph(); };
                img.src = `https://i.ytimg.com/vi/${yt.id}/hqdefault.jpg`;
            };
            return img;
        };
        if (!yt) { ph(); }
        else if (noEmbed) {
            if (small) { inner.appendChild(thumb()); }
            else {
                /* 詳細頁縮圖可點擊前往 YouTube */
                const a = document.createElement("a");
                a.href = cover.url || cover.src;
                a.target = "_blank"; a.rel = "noopener noreferrer";
                a.appendChild(thumb());
                inner.appendChild(a);
            }
        } else if (small) {
            /* 卡片：靜音自動循環播放的預覽（點卡片仍是開詳細頁） */
            const f = document.createElement("iframe");
            f.src = `https://www.youtube.com/embed/${yt.id}?autoplay=1&mute=1&loop=1&playlist=${yt.id}&controls=0&playsinline=1&rel=0&enablejsapi=1`;
            f.title = title + t(UI.previewAlt);
            f.allow = "autoplay; encrypted-media";
            f.tabIndex = -1;
            inner.appendChild(f);
        } else {
            /* 詳細頁：完整內嵌播放器 */
            const f = document.createElement("iframe");
            f.src = `https://www.youtube.com/embed/${yt.id}`;
            f.title = title + t(UI.videoAlt);
            f.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
            f.allowFullscreen = true;
            inner.appendChild(f);
        }
    }
    else if (!cover || !cover.src) { ph(); }
    else if (cover.type === "video") {
        const v = document.createElement("video");
        v.src = cover.src; v.muted = true; v.loop = true; v.playsInline = true;
        v.preload = "metadata";
        if (cover.poster) v.poster = cover.poster;
        v.onerror = () => { v.remove(); ph(); };
        inner.appendChild(v);
        if (small) {
            wrap.addEventListener("mouseenter", () => v.play().catch(() => { }));
            wrap.addEventListener("mouseleave", () => { v.pause(); v.currentTime = 0; });
        } else { v.controls = true; }
    } else {
        const img = document.createElement("img");
        img.src = cover.src; img.alt = title + t(UI.coverAlt); img.loading = "lazy";
        img.onerror = () => { img.remove(); ph(); };
        inner.appendChild(img);
    }

    if (small && cover && ((cover.type === "video" && cover.src) || cover.type === "youtube")) {
        const badge = document.createElement("span");
        badge.className = "badge";
        badge.textContent = cover.type === "youtube" ? "▶ YOUTUBE" : "▶ HOVER";
        wrap.appendChild(badge);
    }
    return wrap;
}

/* ---------- 作品卡片 ---------- */
function renderGrid() {
    gridEl.innerHTML = "";
    const list = PROJECTS.filter(p => p.categories.includes(activeCat));
    if (!list.length) {
        const e = document.createElement("div");
        e.className = "empty";
        e.innerHTML = "EMPTY SLOT<br><span style='font-size:14px'></span>";
        e.querySelector("span").textContent = t(UI.emptyHint);
        gridEl.appendChild(e);
        return;
    }
    list.forEach(p => {
        const title = t(p.title);
        const card = document.createElement("button");
        card.className = "card";
        card.setAttribute("aria-label", t(UI.viewProject) + title);

        const frame = document.createElement("div");
        frame.className = "pxb";
        const inn = document.createElement("div");
        inn.className = "pxb-in";
        frame.appendChild(inn);

        inn.appendChild(coverEl(p.cover, title, true));

        const body = document.createElement("div");
        body.className = "card-body";
        const titleEl = document.createElement("div");
        titleEl.className = "card-title"; titleEl.textContent = title;
        body.appendChild(titleEl);
        const tags = document.createElement("div");
        tags.className = "tags";
        (p.tags || []).forEach(x => {
            const s = document.createElement("span");
            s.className = "tag"; s.textContent = t(x);
            tags.appendChild(s);
        });
        body.appendChild(tags);
        inn.appendChild(body);
        card.addEventListener("click", () => openModal(p, card));
        card.appendChild(frame);
        gridEl.appendChild(card);
    });
}

/* ---------- 詳細內容 Modal ---------- */
function sec(title, node) {
    const d = document.createElement("div");
    d.className = "sec";
    const h = document.createElement("h3");
    h.textContent = title;
    d.appendChild(h); d.appendChild(node);
    return d;
}
/* 控制卡片上的 YouTube 預覽：詳細頁開啟時暫停，關閉後恢復，
   避免同時有多個播放器在解碼造成卡頓 */
function cardPreviews(action) {
    document.querySelectorAll("#grid .cover iframe").forEach(f => {
        try {
            f.contentWindow.postMessage(
                JSON.stringify({ event: "command", func: action, args: [] }), "*");
        } catch (e) { /* 播放器還沒就緒就略過 */ }
    });
}

function openModal(p, trigger) {
    lastFocus = trigger;
    currentProject = p;
    const title = t(p.title);
    mTitle.textContent = title;
    mBody.innerHTML = "";

    mBody.appendChild(coverEl(p.cover, title, false));

    if (p.tags && p.tags.length) {
        const tags = document.createElement("div");
        tags.className = "tags m-tags";
        p.tags.forEach(x => {
            const s = document.createElement("span");
            s.className = "tag"; s.textContent = t(x);
            tags.appendChild(s);
        });
        mBody.appendChild(tags);
    }

    if (p.description) {
        /* 介紹可以是單一字串，也可以是段落陣列（陣列就一段一個 p） */
        const desc = document.createElement("div");
        const paras = t(p.description);
        (Array.isArray(paras) ? paras : [paras]).forEach(s => {
            const para = document.createElement("p");
            para.textContent = s;
            desc.appendChild(para);
        });
        mBody.appendChild(sec(t(UI.overview), desc));
    }

    if (p.tech && p.tech.length) {
        const chips = document.createElement("div");
        chips.className = "chips";
        p.tech.forEach(item => {
            const c = document.createElement("span");
            c.className = "chip"; c.textContent = t(item);
            chips.appendChild(c);
        });
        mBody.appendChild(sec(t(UI.tech), chips));
    }

    const ul = document.createElement("ul");
    ul.className = "role-list";
    (p.roles || []).forEach(r => {
        if (r && r.group) {
            const g = document.createElement("li");
            g.className = "role-group";
            g.textContent = t(r.group);
            ul.appendChild(g);
            r.items.forEach(it => {
                const li = document.createElement("li");
                li.textContent = t(it);
                ul.appendChild(li);
            });
        } else {
            const li = document.createElement("li");
            li.textContent = t(r);
            ul.appendChild(li);
        }
    });
    if (ul.children.length) mBody.appendChild(sec(t(UI.roles), ul));

    if (p.highlights && p.highlights.length) {
        const wrap = document.createElement("div");
        p.highlights.forEach(h => {
            const item = document.createElement("div");
            item.className = "hl";
            const ht = document.createElement("div");
            ht.className = "hl-title"; ht.textContent = t(h.title);
            const b = document.createElement("p");
            b.className = "hl-body"; b.textContent = t(h.body);
            item.appendChild(ht); item.appendChild(b);
            wrap.appendChild(item);
        });
        mBody.appendChild(sec(t(UI.highlights), wrap));
    }

    if (p.limits && p.limits.length) {
        const lu = document.createElement("ul");
        lu.className = "role-list";
        p.limits.forEach(x => {
            const li = document.createElement("li");
            li.textContent = t(x);
            lu.appendChild(li);
        });
        mBody.appendChild(sec(t(UI.limits), lu));
    }

    if (p.links && p.links.length) {
        const links = document.createElement("div");
        links.className = "links";
        p.links.forEach(l => {
            const a = document.createElement("a");
            a.className = "link-btn";
            a.href = l.url; a.target = "_blank"; a.rel = "noopener noreferrer";
            const ico = document.createElement("span");
            ico.className = "ico"; ico.textContent = l.icon || "▶";
            a.appendChild(ico);
            a.appendChild(document.createTextNode(t(l.label)));
            links.appendChild(a);
        });
        mBody.appendChild(sec(t(UI.links), links));
    }

    cardPreviews("pauseVideo");
    backdrop.classList.add("open");
    mBody.scrollTop = 0;   /* 重置捲動位置，避免繼承上一次開啟的狀態 */
    document.body.style.overflow = "hidden";
    $("#closeBtn").focus();
}
function closeModal() {
    backdrop.classList.remove("open");
    cardPreviews("playVideo");
    currentProject = null;
    document.body.style.overflow = "";
    mBody.querySelectorAll("video").forEach(v => v.pause());
    if (lastFocus) lastFocus.focus();
}
$("#closeBtn").addEventListener("click", closeModal);
backdrop.addEventListener("click", e => { if (e.target === backdrop) closeModal(); });
document.addEventListener("keydown", e => {
    if (e.key === "Escape" && backdrop.classList.contains("open")) closeModal();
});

document.documentElement.lang = lang;
renderLangBtns();
applyUI();
renderAbout();
bindGlow(document.querySelector(".about .pxb"));
bindGlow(document.querySelector(".modal.pxb"));
bindChipGlow();
renderTabs();
renderGrid();
