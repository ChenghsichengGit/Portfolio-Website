/* ============================================================
 * 網站邏輯（渲染、Modal、日夜切換），一般情況不需修改
 * 作品與分類資料在 js/data.js
 * ============================================================ */
const $ = s => document.querySelector(s);
const tabsEl = $("#tabs"), gridEl = $("#grid");
const backdrop = $("#backdrop"), mTitle = $("#mTitle"), mBody = $("#mBody");
let activeCat = (visibleCategories()[0] || CATEGORIES[0]).id;
let lastFocus = null;

/* ---------- 日夜切換 ---------- */
/* 註：目前不儲存偏好；若想記住使用者選擇，可改用 localStorage：
   讀取 → const saved = localStorage.getItem("theme");
   儲存 → localStorage.setItem("theme", t);                */
function setTheme(t) {
    document.documentElement.dataset.theme = t;
    $("#themeIcon").textContent = t === "dark" ? "☾" : "☀";
    $("#themeLbl").textContent = t === "dark" ? "NIGHT" : "DAY";
}
$("#themeBtn").addEventListener("click", () => {
    setTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark");
});
if (window.matchMedia("(prefers-color-scheme: light)").matches) setTheme("light");

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
        b.textContent = c.label;
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
            img.alt = title + " 封面"; img.loading = "lazy";
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
            f.src = `https://www.youtube.com/embed/${yt.id}?autoplay=1&mute=1&loop=1&playlist=${yt.id}&controls=0&playsinline=1&rel=0`;
            f.title = title + " 預覽";
            f.allow = "autoplay; encrypted-media";
            f.tabIndex = -1;
            inner.appendChild(f);
        } else {
            /* 詳細頁：完整內嵌播放器 */
            const f = document.createElement("iframe");
            f.src = `https://www.youtube.com/embed/${yt.id}`;
            f.title = title + " 影片";
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
        img.src = cover.src; img.alt = title + " 封面"; img.loading = "lazy";
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
        e.innerHTML = "EMPTY SLOT<br><span style='font-size:14px'>此分類尚無作品</span>";
        gridEl.appendChild(e);
        return;
    }
    list.forEach(p => {
        const card = document.createElement("button");
        card.className = "card";
        card.setAttribute("aria-label", "查看作品：" + p.title);

        const frame = document.createElement("div");
        frame.className = "pxb";
        const inn = document.createElement("div");
        inn.className = "pxb-in";
        frame.appendChild(inn);

        inn.appendChild(coverEl(p.cover, p.title, true));

        const body = document.createElement("div");
        body.className = "card-body";
        const t = document.createElement("div");
        t.className = "card-title"; t.textContent = p.title;
        body.appendChild(t);
        const tags = document.createElement("div");
        tags.className = "tags";
        (p.tags || []).forEach(x => {
            const s = document.createElement("span");
            s.className = "tag"; s.textContent = x;
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
function openModal(p, trigger) {
    lastFocus = trigger;
    mTitle.textContent = p.title;
    mBody.innerHTML = "";

    mBody.appendChild(coverEl(p.cover, p.title, false));

    if (p.tags && p.tags.length) {
        const tags = document.createElement("div");
        tags.className = "tags m-tags";
        p.tags.forEach(x => {
            const s = document.createElement("span");
            s.className = "tag"; s.textContent = x;
            tags.appendChild(s);
        });
        mBody.appendChild(tags);
    }

    if (p.description) {
        const desc = document.createElement("p");
        desc.textContent = p.description;
        mBody.appendChild(sec("作品介紹", desc));
    }

    if (p.tech && p.tech.length) {
        const chips = document.createElement("div");
        chips.className = "chips";
        p.tech.forEach(t => {
            const c = document.createElement("span");
            c.className = "chip"; c.textContent = t;
            chips.appendChild(c);
        });
        mBody.appendChild(sec("使用工具與功能", chips));
    }

    const ul = document.createElement("ul");
    ul.className = "role-list";
    (p.roles || []).forEach(r => {
        if (typeof r === "object") {
            const g = document.createElement("li");
            g.className = "role-group";
            g.textContent = r.group;
            ul.appendChild(g);
            r.items.forEach(it => {
                const li = document.createElement("li");
                li.textContent = it;
                ul.appendChild(li);
            });
        } else {
            const li = document.createElement("li");
            li.textContent = r;
            ul.appendChild(li);
        }
    });
    if (ul.children.length) mBody.appendChild(sec("負責內容", ul));

    if (p.links && p.links.length) {
        const links = document.createElement("div");
        links.className = "links";
        p.links.forEach(l => {
            const a = document.createElement("a");
            a.className = "link-btn";
            a.href = l.url; a.target = "_blank"; a.rel = "noopener noreferrer";
            a.innerHTML = `<span class="ico">${l.icon || "▶"}</span>${l.label}`;
            links.appendChild(a);
        });
        mBody.appendChild(sec("相關連結", links));
    }

    backdrop.classList.add("open");
    mBody.scrollTop = 0;   /* 重置捲動位置，避免繼承上一次開啟的狀態 */
    document.body.style.overflow = "hidden";
    $("#closeBtn").focus();
}
function closeModal() {
    backdrop.classList.remove("open");
    document.body.style.overflow = "";
    mBody.querySelectorAll("video").forEach(v => v.pause());
    if (lastFocus) lastFocus.focus();
}
$("#closeBtn").addEventListener("click", closeModal);
backdrop.addEventListener("click", e => { if (e.target === backdrop) closeModal(); });
document.addEventListener("keydown", e => {
    if (e.key === "Escape" && backdrop.classList.contains("open")) closeModal();
});

renderTabs();
renderGrid();
