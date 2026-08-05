// 本機預覽用的簡易靜態伺服器 —— 雙擊「預覽網站.bat」啟動
// 說明：YouTube 內嵌影片必須透過 http 開啟才能播放，
//       直接雙擊 index.html（file://）會被 YouTube 拒絕，只會看到縮圖。
const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 8137;
const ROOT = __dirname;
const MIME = {
    ".html": "text/html; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".js": "text/javascript; charset=utf-8",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
    ".gif": "image/gif",
    ".svg": "image/svg+xml",
    ".webp": "image/webp",
    ".mp4": "video/mp4",
    ".webm": "video/webm",
    ".woff2": "font/woff2",
    ".ico": "image/x-icon",
    ".pdf": "application/pdf"
};

http.createServer((req, res) => {
    const urlPath = decodeURIComponent(req.url.split("?")[0]);
    const file = path.join(ROOT, urlPath === "/" ? "index.html" : urlPath);
    if (!path.normalize(file).startsWith(path.normalize(ROOT))) {
        res.writeHead(403); res.end(); return;
    }
    fs.readFile(file, (err, data) => {
        if (err) { res.writeHead(404); res.end("not found"); return; }
        res.writeHead(200, {
            "Content-Type": MIME[path.extname(file).toLowerCase()] || "application/octet-stream",
            "Cache-Control": "no-store"
        });
        res.end(data);
    });
}).listen(PORT, () => {
    console.log(`預覽網址: http://localhost:${PORT}`);
    console.log("關閉視窗即可停止伺服器");
});
