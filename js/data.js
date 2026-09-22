/* ============================================================
 * ① 分類設定 —— 之後要新增分類，只要在這裡加一行即可
 *    id：程式內部使用（專案的 categories 要對得上）
 *    label：顯示在標籤上的文字
 * ============================================================ */
const CATEGORIES = [
    { id: "featured", label: "精選" },
    { id: "project", label: "專案" },
    { id: "vfx", label: "SHADER & VFX" },
    { id: "tool", label: "工具" },
    // { id: "jam", label: "GAME JAM" },   // ← 範例：解除註解即可新增分類
];

/* ============================================================
 * ② 作品資料 —— 每個作品是一個物件，複製一段修改即可新增
 *
 *  title      作品名稱
 *  categories 所屬分類（可多個，填 CATEGORIES 的 id；含 "featured" 會出現在精選）
 *  tags       卡片上顯示的小標籤
 *  cover      封面：
 *               { type:"image", src:"images/xxx.png" }
 *               { type:"gif",   src:"images/xxx.gif" }              ← 自動循環
 *               { type:"video", src:"videos/xxx.mp4", poster:"images/xxx.jpg" } ← 滑鼠懸停播放
 *               { type:"youtube", url:"https://www.youtube.com/watch?v=xxxx" }  ← 卡片自動播放預覽、詳細頁內嵌播放器
 *               src 留空字串 "" 會顯示像素佔位圖（方便先排版）
 *  description 作品介紹（文字段落）
 *  tech        使用工具與功能（陣列，一項一個）
 *  roles       負責內容（陣列）：一般條目直接放字串 "..."
 *               要分組小標時放 { group:"小標題", items:["條目", ...] }
 *  highlights  技術亮點（選填，陣列）：{ title:"小標", body:"說明段落" }
 *  limits      取捨與已知限制（選填，陣列，一項一條）
 *  links       相關連結：{ label:"顯示文字", url:"網址", icon:"▶" }
 * ============================================================ */
const PROJECTS = [
    {
        title: "炎姬 Homura Hime",
        categories: ["featured", "project"],
        tags: ["Unity", "3D 動作", "Steam"],
        cover: { type: "image", src: "https://cdn.akamai.steamstatic.com/steam/apps/1820000/capsule_616x353.jpg" },
        description: "追求動漫美學與立體彈幕的 3D 動作遊戲，玩家扮演除妖使「炎姬」，以近戰與遠程連招、閃避與彈刀對抗妖魔。由 Crimson Dusk 開發、PLAYISM 發行，2026 年 3 月於 Steam 上市。我在專案中負責 UI 系統開發、編輯器工具、第三方 API 整合與效能優化除錯。",
        tech: ["Unity", "C#", "UGUI", "Ultimate Inventory System", "Unity Localization", "Timeline 擴充", "Steamworks API", "Discord Webhook"],
        roles: [
            {
                group: "UI 系統開發與架構", items: [
                    "基於 Unity UGUI 與 Ultimate Inventory System 插件設計並實裝 UI 系統",
                    "開發 UI 動態控制工具，降低製作 UI 動態效果的製作難度與時間成本",
                    "利用 Unity Localization 實現多語系切換架構"
                ]
            },
            {
                group: "製作編輯器工具和系統功能", items: [
                    "針對美術與設計需求開發 Editor 工具，並擴充系統功能（如 Timeline 擴充）"
                ]
            },
            {
                group: "第三方 API 整合", items: [
                    "介接 Steamworks API 實作玩家帳號驗證、全球排行榜及成就等系統",
                    "使用 Discord Webhook 建立遊戲內回報系統，自動至 Discord 建立討論串"
                ]
            },
            {
                group: "效能優化與除錯", items: [
                    "利用 Unity 內建除錯工具尋找調幀原因並協助修復",
                    "負責定位並修復流程、場景及工具等各類 Bug，維持專案穩定度"
                ]
            }
        ],
        links: [
            { label: "STEAM", url: "https://store.steampowered.com/app/1820000/Homura_Hime/", icon: "▶" }
        ]
    },
    {
        title: "Heresy",
        categories: ["featured", "project"],
        tags: ["俯視角動作", "Boss Rush", "TGIPA 佳作"],
        cover: { type: "youtube", url: "https://www.youtube.com/watch?v=yD_MXcrLeDU" },
        description: "以「首領挑戰（Boss Rush）」為核心的俯視角動作遊戲。玩家需觀察頭目複雜的行為模式、找出應對節奏，以精準的操作與策略擊敗一個個強敵。本作獲得 2024 TGIPA 台灣原創遊戲大賞「校園組 佳作」。我在團隊中擔任程式設計與企劃。",
        roles: [
            "遊戲整體架構與系統設計",
            "戰鬥系統設計",
            "BOSS 行為設計",
            "戰鬥體驗調校與數值平衡",
            "解謎機制設計與實作"
        ],
        links: [
            { label: "TGIPA 2024 得獎作品", url: "https://www.tgipa.org.tw/works_2024.html", icon: "★" },
            { label: "DEMO 影片", url: "https://www.youtube.com/watch?v=yD_MXcrLeDU&t=13s", icon: "▶" },
            { label: "企劃書 PDF", url: "docs/heresy-gdd.pdf", icon: "✎" }
        ]
    },
    {
        title: "KEEP",
        categories: ["featured", "project"],
        tags: ["Unity", "解謎", "Game Jam"],
        cover: { type: "image", src: "images/keep-cover.jpg" },
        description: "2026 Garena × Rayark Game Jam（主題「Re Play, 一玩再玩」）參賽作品，以「保持（KEEP）」為核心的解謎遊戲。每輪有固定的行動次數，次數用完或手動觸發「重製」時，全地圖物件都會重置——唯有被 KEEP 的物件會保留位置與狀態。玩家要活用 KEEP 與重製的組合解開謎題。可直接在瀏覽器遊玩。",
        tech: ["Unity", "C#", "Shader"],
        roles: [
            {
                group: "玩法設計", items: [
                    "提出本作核心玩法「KEEP」機制"
                ]
            },
            {
                group: "程式實作", items: [
                    "KEEP／重製系統：行動次數、地圖物件重置與被保持物件的狀態保留",
                    "道具互動與其他主要遊戲功能開發",
                    "描邊 Shader 製作"
                ]
            }
        ],
        links: [
            { label: "ITCH.IO 遊玩", url: "https://pinzhensu.itch.io/keep", icon: "▶" }
        ]
    },
    {
        title: "TweenFlow",
        categories: ["featured", "tool"],
        tags: ["Unity", "Editor 工具", "DOTween"],
        cover: { type: "youtube", url: "https://www.youtube.com/watch?v=gKQwnMXvXj0" },
        description: "基於 DOTween 開發的模組化動態排序系統，提供類似 Feel（MMFeedbacks）的模組化編輯介面。設計初衷是解決複雜 UI 與場景動態在傳統寫法下難以維護、難以重複使用的問題，讓動態效果能以序列方式組裝與複用。已實際導入《炎姬》的開發流程中使用。",
        tech: ["Unity", "C#", "DOTween", "Odin Inspector"],
        roles: [
            {
                group: "系統設計", items: [
                    "以繼承與多型架構設計序列控制框架，開發者可快速擴充自定義功能模組"
                ]
            },
            {
                group: "易用性與導入", items: [
                    "整合 Odin Inspector 簡化操作介面，非工程人員也能自行配置動態效果",
                    "於《炎姬》開發流程中實裝並使用"
                ]
            }
        ],
        links: [
            { label: "GITHUB", url: "https://github.com/ChengHsiCheng/UnityTools.git", icon: "⌂" },
            { label: "DEMO 影片", url: "https://www.youtube.com/watch?v=gKQwnMXvXj0", icon: "▶" }
        ]
    },
    {
        title: "K5 實體德州撲克機台",
        categories: ["featured", "project"],
        tags: ["Unity", ".NET 8", "實體機台"],
        cover: { type: "image", src: "images/k5-poker.jpg" },
        description: "擺在店面的實體德州撲克機台：一張大桌、6 個座位，每個座位有獨立的觸控介面、鈔票機、票券印表機、讀卡機與開分洗分實體按鈕。Unity client 負責畫面、觸控與硬體控制，.NET 8 server 負責發牌、下注驗證、彩池結算與帳務，兩端以 TCP socket 通訊。專案的特殊之處是所有座位跑在同一個 Unity 程式裡（不是一人一台），這個限制影響了大量架構決策。",
        tech: ["C#", "Unity", ".NET 8", "MySQL", "TCP Socket", "RS232 序列埠", "UniTask"],
        roles: [
            {
                group: "遊戲邏輯與規則（server）", items: [
                    "完整牌局狀態機、牌型評估器",
                    "彩池與邊池分配、抽水、旁注玩法"
                ]
            },
            {
                group: "跨端架構與並行控制", items: [
                    "自訂封包協定：cmd／pn 兩層路由、錯誤通道分工、狀態同步規則",
                    "雙層鎖設計與鎖序規則、死鎖排除",
                    "前端 Model／Controller／Presenter／View 分層與事件驅動資料流"
                ]
            },
            {
                group: "金流與硬體整合", items: [
                    "入鈔、入票、出票、開分、洗分、換分的完整流程與失敗處理",
                    "鈔票機、票券印表機、讀卡機、IO 按鈕板的通訊與控制"
                ]
            },
            {
                group: "維運工具與測試", items: [
                    "WinForms 現場設定工具：裝置掃描、認機台、實機測試、讀卡機綁定",
                    "Unity 編輯器除錯視窗，讓一個人就能測試六個座位的牌局",
                    "單元測試覆蓋牌型評估與彩池分配"
                ]
            }
        ],
        highlights: [
            {
                title: "Server 權威、Client 驅動",
                body: "所有金額與勝負由 server 決定，client 不做樂觀更新；送出的是「事件」而非「金額」（開分只送「我按了」，加多少由 server 讀設定）以防改機。流程則由 client 推動，server 處理完一個狀態就停下等待，換取 server 端的簡單。"
            },
            {
                title: "並行控制與死鎖排除",
                body: "多座位請求同時抵達，牌桌與座位各有自己的鎖，實務上歸納出三條規則：鎖序固定（牌桌→座位）不可反向、每條提前返回都要釋放已持有的鎖（含例外路徑，否則 await 中的例外會讓該座位永久卡死）、同一把鎖不可重複取得。第三條是實際踩到的——收盲注時「小盲位剛好是要補收大盲的玩家」會對同一座位鎖兩次而自我死鎖，重構為「一個座位一個臨界區」解決。"
            },
            {
                title: "硬體與 Unity 主執行緒的分工",
                body: "序列埠與輸入裝置一律在背景執行緒讀取，事件進 concurrent queue 由主執行緒逐幀消化——Unity API 只能在主執行緒呼叫，而序列埠往返會阻塞。硬體層原始碼刻意不依賴 UnityEngine，讓獨立的 WinForms 工具能共用同一份實作，避免協定常數與開埠參數出現兩套。"
            },
            {
                title: "不可逆金流的順序設計",
                body: "錢的操作無法撤回，所以流程順序決定會不會掉錢。出票改為「先印、印成功回報後 server 才扣款」（原本先扣再印，印表機故障就吃掉玩家餘額）；入鈔先由機器夾住，server 確認加分成功才收進錢箱；票券兌換以單句條件式 UPDATE 靠資料庫原子性，防止同一張票在兩台機器重複入帳。"
            },
            {
                title: "以不變式取代固定案例的測試",
                body: "彩池與牌型是「算錯就掉錢」的模組。斷言不寫固定期望值（那等於在測試裡重新實作一次被測邏輯），而是隨機產生大量牌局驗證不變式：分配金額加抽水等於總投入、任何人所得不超過「每家跟得到他的那部分」、棄牌者不得分錢、沒有任何其他五張組合能贏過被選中的那組。"
            }
        ],
        limits: [
            "流程由 client 推動的代價是重連後牌局會停住（server 等不到下一個請求）。評估過「client 依狀態補送」，但發牌類狀態的重入安全性未經驗證，猜錯會重複發牌或重複結算，因此改採「由 server 作廢本手」的方向",
            "所有座位共用單一連線是目前可行的原因，也是未來拆分成多機時第一個要改的地方",
            "讀卡機使用鍵盤模擬，在 Windows 下與 Unity 搶註冊原始輸入，視窗焦點切換後會失效。評估過多種軟體解法皆無效，結論是應請設備商切換為虛擬序列埠模式"
        ]
    }
];
