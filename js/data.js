/* ============================================================
 * ① 分類設定 —— 之後要新增分類，只要在這裡加一行即可
 *    id：程式內部使用（專案的 categories 要對得上）
 *    label：顯示在標籤上的文字
 * ============================================================ */
const CATEGORIES = [
    { id: "featured", label: { "zh-Hant": "精選", "zh-Hans": "精选", en: "Featured", ja: "注目作品" } },
    { id: "project", label: { "zh-Hant": "專案", "zh-Hans": "项目", en: "Projects", ja: "プロジェクト" } },
    { id: "vfx", label: "SHADER & VFX" },
    { id: "tool", label: { "zh-Hant": "工具", "zh-Hans": "工具", en: "Tools", ja: "ツール" } },
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
 *
 *  【多語系】任何要顯示的文字都可以寫成物件，依語言取值：
 *      { "zh-Hant": "繁中", "zh-Hans": "简中", en: "English", ja: "日本語" }
 *    只寫字串代表四種語言共用（專有名詞如 Unity、Steam 就直接寫字串）。
 *    缺某個語言時會自動回退：該語言 → en → zh-Hant。
 * ============================================================ */
const PROJECTS = [
    {
        title: { "zh-Hant": "炎姬 Homura Hime", "zh-Hans": "炎姬 Homura Hime", en: "Homura Hime", ja: "炎姬 Homura Hime" },
        categories: ["featured", "project"],
        tags: ["Unity", { "zh-Hant": "3D 動作", "zh-Hans": "3D 动作", en: "3D Action", ja: "3D アクション" }, "Steam"],
        cover: { type: "image", src: "https://cdn.akamai.steamstatic.com/steam/apps/1820000/capsule_616x353.jpg" },
        description: {
            "zh-Hant": "追求動漫美學與立體彈幕的 3D 動作遊戲，玩家扮演除妖使「炎姬」，以近戰與遠程連招、閃避與彈刀對抗妖魔。由 Crimson Dusk 開發、PLAYISM 發行，2026 年 3 月於 Steam 上市。我在專案中負責 UI 系統開發、編輯器工具、第三方 API 整合與效能優化除錯。",
            "zh-Hans": "追求动漫美学与立体弹幕的 3D 动作游戏，玩家扮演除妖使「炎姬」，以近战与远程连招、闪避与弹刀对抗妖魔。由 Crimson Dusk 开发、PLAYISM 发行，2026 年 3 月于 Steam 上市。我在项目中负责 UI 系统开发、编辑器工具、第三方 API 整合与性能优化除错。",
            en: "A 3D action game built around anime aesthetics and three-dimensional bullet-hell combat. Players take the role of the exorcist Homura Hime, weaving melee and ranged combos while dodging and parrying through waves of demons. Developed by Crimson Dusk, published by PLAYISM, released on Steam in March 2026. I worked on UI systems, editor tooling, third-party API integration, and performance optimization and debugging.",
            ja: "アニメ的な表現と立体弾幕を追求した 3D アクションゲーム。プレイヤーは除妖使「炎姬」として、近接と遠距離のコンボ、回避と弾き返しで妖魔に立ち向かう。Crimson Dusk 開発、PLAYISM 発売、2026 年 3 月に Steam でリリース。私は UI システム開発、エディタ拡張、サードパーティ API 連携、パフォーマンス最適化とデバッグを担当。"
        },
        tech: ["Unity", "C#", "UGUI", "Ultimate Inventory System", "Unity Localization",
            { "zh-Hant": "Timeline 擴充", "zh-Hans": "Timeline 扩展", en: "Timeline Extensions", ja: "Timeline 拡張" },
            "Steamworks API", "Discord Webhook"],
        roles: [
            {
                group: { "zh-Hant": "UI 系統開發與架構", "zh-Hans": "UI 系统开发与架构", en: "UI Systems & Architecture", ja: "UI システム開発と設計" },
                items: [
                    {
                        "zh-Hant": "基於 Unity UGUI 與 Ultimate Inventory System 插件設計並實裝 UI 系統",
                        "zh-Hans": "基于 Unity UGUI 与 Ultimate Inventory System 插件设计并实装 UI 系统",
                        en: "Designed and implemented the UI system on Unity UGUI and the Ultimate Inventory System plugin",
                        ja: "Unity UGUI と Ultimate Inventory System プラグインをベースに UI システムを設計・実装"
                    },
                    {
                        "zh-Hant": "開發 UI 動態控制工具，降低製作 UI 動態效果的製作難度與時間成本",
                        "zh-Hans": "开发 UI 动态控制工具，降低制作 UI 动态效果的难度与时间成本",
                        en: "Built a UI motion authoring tool that cut both the difficulty and the time cost of producing UI animations",
                        ja: "UI モーション制作ツールを開発し、UI 演出の制作難度と工数を削減"
                    },
                    {
                        "zh-Hant": "利用 Unity Localization 實現多語系切換架構",
                        "zh-Hans": "利用 Unity Localization 实现多语言切换架构",
                        en: "Implemented the multi-language switching architecture with Unity Localization",
                        ja: "Unity Localization を用いた多言語切り替え基盤を構築"
                    }
                ]
            },
            {
                group: { "zh-Hant": "製作編輯器工具和系統功能", "zh-Hans": "制作编辑器工具和系统功能", en: "Editor Tools & Engine Systems", ja: "エディタ拡張とシステム機能" },
                items: [
                    {
                        "zh-Hant": "針對美術與設計需求開發 Editor 工具，並擴充系統功能（如 Timeline 擴充）",
                        "zh-Hans": "针对美术与设计需求开发 Editor 工具，并扩充系统功能（如 Timeline 扩展）",
                        en: "Developed editor tools for art and design needs, and extended engine systems such as Timeline",
                        ja: "アート・デザインの要望に応じたエディタ拡張を開発し、Timeline などのシステム機能を拡張"
                    }
                ]
            },
            {
                group: { "zh-Hant": "第三方 API 整合", "zh-Hans": "第三方 API 整合", en: "Third-party API Integration", ja: "サードパーティ API 連携" },
                items: [
                    {
                        "zh-Hant": "介接 Steamworks API 實作玩家帳號驗證、全球排行榜及成就等系統",
                        "zh-Hans": "对接 Steamworks API 实现玩家账号验证、全球排行榜及成就等系统",
                        en: "Integrated the Steamworks API for account authentication, global leaderboards and achievements",
                        ja: "Steamworks API を介してアカウント認証、グローバルランキング、実績などのシステムを実装"
                    },
                    {
                        "zh-Hant": "使用 Discord Webhook 建立遊戲內回報系統，自動至 Discord 建立討論串",
                        "zh-Hans": "使用 Discord Webhook 建立游戏内反馈系统，自动在 Discord 建立讨论串",
                        en: "Built an in-game bug report system on Discord webhooks that opens a thread automatically",
                        ja: "Discord Webhook でゲーム内報告システムを構築し、Discord 上にスレッドを自動作成"
                    }
                ]
            },
            {
                group: { "zh-Hant": "效能優化與除錯", "zh-Hans": "性能优化与除错", en: "Performance & Debugging", ja: "パフォーマンス最適化とデバッグ" },
                items: [
                    {
                        "zh-Hant": "利用 Unity 內建除錯工具尋找調幀原因並協助修復",
                        "zh-Hans": "利用 Unity 内建调试工具查找掉帧原因并协助修复",
                        en: "Used Unity's built-in profiling tools to track down frame drops and help fix them",
                        ja: "Unity 標準のプロファイラでフレーム落ちの原因を特定し、修正を支援"
                    },
                    {
                        "zh-Hant": "負責定位並修復流程、場景及工具等各類 Bug，維持專案穩定度",
                        "zh-Hans": "负责定位并修复流程、场景及工具等各类 Bug，维持项目稳定度",
                        en: "Located and fixed bugs across flows, scenes and tools to keep the project stable",
                        ja: "フロー・シーン・ツールなど各種バグの特定と修正を担当し、プロジェクトの安定性を維持"
                    }
                ]
            }
        ],
        links: [
            { label: "STEAM", url: "https://store.steampowered.com/app/1820000/Homura_Hime/", icon: "▶" }
        ]
    },
    {
        title: {
            "zh-Hant": "K5 實體德州撲克機台",
            "zh-Hans": "K5 实体德州扑克机台",
            en: "K5 Texas Hold'em Cabinet",
            ja: "K5 実機テキサスホールデム筐体"
        },
        categories: ["featured", "project"],
        tags: ["Unity", ".NET 8", { "zh-Hant": "實體機台", "zh-Hans": "实体机台", en: "Arcade Cabinet", ja: "実機筐体" }],
        cover: { type: "image", src: "images/k5-poker.jpg" },
        description: {
            "zh-Hant": "擺在店面的實體德州撲克機台：一張大桌、6 個座位，每個座位有獨立的觸控介面、鈔票機、票券印表機、讀卡機與開分洗分實體按鈕。Unity client 負責畫面、觸控與硬體控制，.NET 8 server 負責發牌、下注驗證、彩池結算與帳務，兩端以 TCP socket 通訊。專案的特殊之處是所有座位跑在同一個 Unity 程式裡（不是一人一台），這個限制影響了大量架構決策。",
            "zh-Hans": "摆在店面的实体德州扑克机台：一张大桌、6 个座位，每个座位有独立的触控界面、钞票机、票券打印机、读卡机与开分洗分实体按钮。Unity client 负责画面、触控与硬件控制，.NET 8 server 负责发牌、下注验证、彩池结算与账务，两端以 TCP socket 通讯。项目的特殊之处是所有座位跑在同一个 Unity 程序里（不是一人一台），这个限制影响了大量架构决策。",
            en: "A physical Texas Hold'em cabinet installed in venues: one large table with six seats, each with its own touch interface, bill acceptor, ticket printer, card reader and physical credit-in / credit-clear buttons. The Unity client drives rendering, touch input and hardware control; a .NET 8 server owns dealing, bet validation, pot settlement and accounting, with the two sides talking over TCP sockets. What makes the project unusual is that all six seats run inside a single Unity process rather than one machine per player — a constraint that shaped a great many architectural decisions.",
            ja: "店舗に設置する実機テキサスホールデム筐体。1 つの大型テーブルに 6 席があり、各席が独立したタッチ UI、紙幣識別機、チケットプリンタ、カードリーダー、クレジット投入／精算の物理ボタンを備える。Unity クライアントが描画・タッチ・ハードウェア制御を、.NET 8 サーバーがカード配布・ベット検証・ポット精算・会計を担当し、両者は TCP ソケットで通信する。特徴的なのは 6 席すべてが 1 つの Unity プロセス上で動く点（1 人 1 台ではない）で、この制約が多くの設計判断を左右した。"
        },
        tech: ["C#", "Unity", ".NET 8", "MySQL", "TCP Socket",
            { "zh-Hant": "RS232 序列埠", "zh-Hans": "RS232 串口", en: "RS232 Serial", ja: "RS232 シリアル" },
            "UniTask"],
        roles: [
            {
                group: { "zh-Hant": "遊戲邏輯與規則（server）", "zh-Hans": "游戏逻辑与规则（server）", en: "Game Logic & Rules (server)", ja: "ゲームロジックとルール（サーバー）" },
                items: [
                    {
                        "zh-Hant": "完整牌局狀態機、牌型評估器",
                        "zh-Hans": "完整牌局状态机、牌型评估器",
                        en: "Full hand-progression state machine and hand evaluator",
                        ja: "ハンド進行のステートマシンと役判定器"
                    },
                    {
                        "zh-Hant": "彩池與邊池分配、抽水、旁注玩法",
                        "zh-Hans": "彩池与边池分配、抽水、旁注玩法",
                        en: "Pot and side-pot distribution, rake, and side-bet modes",
                        ja: "ポットとサイドポットの分配、レーキ、サイドベット"
                    }
                ]
            },
            {
                group: { "zh-Hant": "跨端架構與並行控制", "zh-Hans": "跨端架构与并发控制", en: "Cross-tier Architecture & Concurrency", ja: "クライアント・サーバー設計と並行制御" },
                items: [
                    {
                        "zh-Hant": "自訂封包協定：cmd／pn 兩層路由、錯誤通道分工、狀態同步規則",
                        "zh-Hans": "自定义封包协议：cmd／pn 两层路由、错误通道分工、状态同步规则",
                        en: "Custom packet protocol: two-level cmd / pn routing, a separate error channel, and state-sync rules",
                        ja: "独自パケットプロトコル：cmd／pn の二層ルーティング、エラーチャネルの分離、状態同期ルール"
                    },
                    {
                        "zh-Hant": "雙層鎖設計與鎖序規則、死鎖排除",
                        "zh-Hans": "双层锁设计与锁序规则、死锁排除",
                        en: "Two-level locking with a fixed lock order, and deadlock elimination",
                        ja: "二層ロック設計とロック順序のルール、デッドロックの解消"
                    },
                    {
                        "zh-Hant": "前端 Model／Controller／Presenter／View 分層與事件驅動資料流",
                        "zh-Hans": "前端 Model／Controller／Presenter／View 分层与事件驱动数据流",
                        en: "Client-side Model / Controller / Presenter / View layering with an event-driven data flow",
                        ja: "クライアント側の Model／Controller／Presenter／View 分割とイベント駆動のデータフロー"
                    }
                ]
            },
            {
                group: { "zh-Hant": "金流與硬體整合", "zh-Hans": "资金流程与硬件整合", en: "Money Flow & Hardware Integration", ja: "入出金フローとハードウェア統合" },
                items: [
                    {
                        "zh-Hant": "入鈔、入票、出票、開分、洗分、換分的完整流程與失敗處理",
                        "zh-Hans": "入钞、入票、出票、开分、洗分、换分的完整流程与失败处理",
                        en: "End-to-end flows for cash-in, ticket-in, ticket-out, credit-in, credit-clear and exchange, including failure handling",
                        ja: "紙幣投入・チケット投入・チケット発券・クレジット投入・クリア・両替の全フローと失敗時処理"
                    },
                    {
                        "zh-Hant": "鈔票機、票券印表機、讀卡機、IO 按鈕板的通訊與控制",
                        "zh-Hans": "钞票机、票券打印机、读卡机、IO 按钮板的通讯与控制",
                        en: "Communication and control for the bill acceptor, ticket printer, card reader and IO button board",
                        ja: "紙幣識別機、チケットプリンタ、カードリーダー、IO ボタン基板の通信と制御"
                    }
                ]
            },
            {
                group: { "zh-Hant": "維運工具與測試", "zh-Hans": "运维工具与测试", en: "Field Tooling & Testing", ja: "運用ツールとテスト" },
                items: [
                    {
                        "zh-Hant": "WinForms 現場設定工具：裝置掃描、認機台、實機測試、讀卡機綁定",
                        "zh-Hans": "WinForms 现场设置工具：设备扫描、认机台、实机测试、读卡机绑定",
                        en: "A WinForms field setup tool: device scanning, seat identification, hardware self-test and card reader binding",
                        ja: "WinForms 製の現場設定ツール：デバイス検出、座席の割り当て、実機テスト、カードリーダーの紐付け"
                    },
                    {
                        "zh-Hant": "Unity 編輯器除錯視窗，讓一個人就能測試六個座位的牌局",
                        "zh-Hans": "Unity 编辑器调试窗口，让一个人就能测试六个座位的牌局",
                        en: "A Unity editor debug window that lets one person test a six-seat hand alone",
                        ja: "Unity エディタ上のデバッグウィンドウにより、1 人で 6 席分のハンドをテスト可能に"
                    },
                    {
                        "zh-Hant": "單元測試覆蓋牌型評估與彩池分配",
                        "zh-Hans": "单元测试覆盖牌型评估与彩池分配",
                        en: "Unit tests covering hand evaluation and pot distribution",
                        ja: "役判定とポット分配をカバーするユニットテスト"
                    }
                ]
            }
        ],
        highlights: [
            {
                title: { "zh-Hant": "Server 權威、Client 驅動", "zh-Hans": "Server 权威、Client 驱动", en: "Server-authoritative, Client-driven", ja: "サーバー権威・クライアント駆動" },
                body: {
                    "zh-Hant": "所有金額與勝負由 server 決定，client 不做樂觀更新；送出的是「事件」而非「金額」（開分只送「我按了」，加多少由 server 讀設定）以防改機。流程則由 client 推動，server 處理完一個狀態就停下等待，換取 server 端的簡單。",
                    "zh-Hans": "所有金额与胜负由 server 决定，client 不做乐观更新；送出的是「事件」而非「金额」（开分只送「我按了」，加多少由 server 读配置）以防改机。流程则由 client 推动，server 处理完一个状态就停下等待，换取 server 端的简单。",
                    en: "The server decides every amount and every outcome, and the client never applies optimistic updates. What the client sends is an event rather than an amount — pressing credit-in only reports that the button was pressed, and the server reads the configured value — which closes the door on tampered clients. Flow, on the other hand, is driven by the client: the server finishes one state and then waits, which keeps the server side simple.",
                    ja: "金額と勝敗はすべてサーバーが決定し、クライアントは楽観的更新を行わない。クライアントが送るのは「金額」ではなく「イベント」であり（クレジット投入は「押した」ことだけを送り、額はサーバーが設定から読む）、改造対策になっている。一方で進行はクライアント駆動で、サーバーは 1 つの状態を処理したら待機する。これによりサーバー側の実装は単純に保たれる。"
                }
            },
            {
                title: { "zh-Hant": "並行控制與死鎖排除", "zh-Hans": "并发控制与死锁排除", en: "Concurrency & Deadlock Elimination", ja: "並行制御とデッドロック対策" },
                body: {
                    "zh-Hant": "多座位請求同時抵達，牌桌與座位各有自己的鎖，實務上歸納出三條規則：鎖序固定（牌桌→座位）不可反向、每條提前返回都要釋放已持有的鎖（含例外路徑，否則 await 中的例外會讓該座位永久卡死）、同一把鎖不可重複取得。",
                    "zh-Hans": "多座位请求同时抵达，牌桌与座位各有自己的锁，实务上归纳出三条规则：锁序固定（牌桌→座位）不可反向、每条提前返回都要释放已持有的锁（含异常路径，否则 await 中的异常会让该座位永久卡死）、同一把锁不可重复获取。",
                    en: "Requests from several seats arrive at once, and the table and each seat hold their own lock. Three rules came out of practice: lock order is fixed (table → seat) and never reversed; every early return must release the locks it holds, including exception paths, since an exception thrown inside an await will wedge that seat forever; and the same lock must never be acquired twice.",
                    ja: "複数席のリクエストが同時に届くため、テーブルと各席がそれぞれロックを持つ。実務から三つのルールを導いた：ロック順序はテーブル→席で固定し逆転させない、早期リターンでは保持中のロックを必ず解放する（例外経路も含む。await 内で例外が発生すると該当席が永久に固まる）、同一のロックを二重に取得しない。"
                }
            },
            {
                title: { "zh-Hant": "硬體與 Unity 主執行緒的分工", "zh-Hans": "硬件与 Unity 主线程的分工", en: "Hardware vs. the Unity Main Thread", ja: "ハードウェアと Unity メインスレッドの分担" },
                body: {
                    "zh-Hant": "序列埠與輸入裝置一律在背景執行緒讀取，事件進 concurrent queue 由主執行緒逐幀消化——Unity API 只能在主執行緒呼叫，而序列埠往返會阻塞。硬體層原始碼刻意不依賴 UnityEngine，讓獨立的 WinForms 工具能共用同一份實作，避免協定常數與開埠參數出現兩套。",
                    "zh-Hans": "串口与输入设备一律在后台线程读取，事件进 concurrent queue 由主线程逐帧消化——Unity API 只能在主线程调用，而串口往返会阻塞。硬件层源码刻意不依赖 UnityEngine，让独立的 WinForms 工具能共用同一份实现，避免协议常量与开口参数出现两套。",
                    en: "Serial ports and input devices are always read on background threads; events go into a concurrent queue that the main thread drains frame by frame, because Unity APIs can only be called from the main thread and serial round-trips block. The hardware layer deliberately has no dependency on UnityEngine, so the standalone WinForms tool can share the exact same implementation instead of keeping a second copy of protocol constants and port settings.",
                    ja: "シリアルポートと入力デバイスの読み取りは必ずバックグラウンドスレッドで行い、イベントは concurrent queue に入れてメインスレッドがフレームごとに処理する。Unity の API はメインスレッドからしか呼べず、シリアル通信は往復でブロックするためだ。ハードウェア層のコードは意図的に UnityEngine に依存させておらず、独立した WinForms ツールが同じ実装を共有できる。プロトコル定数やポート設定が二重管理になるのを避けられる。"
                }
            },
            {
                title: { "zh-Hant": "不可逆金流的順序設計", "zh-Hans": "不可逆资金流程的顺序设计", en: "Ordering Irreversible Money Operations", ja: "不可逆な入出金処理の順序設計" },
                body: {
                    "zh-Hant": "錢的操作無法撤回，所以流程順序決定會不會掉錢。出票改為「先印、印成功回報後 server 才扣款」（原本先扣再印，印表機故障就吃掉玩家餘額）；入鈔先由機器夾住，server 確認加分成功才收進錢箱；票券兌換以單句條件式 UPDATE 靠資料庫原子性，防止同一張票在兩台機器重複入帳。",
                    "zh-Hans": "钱的操作无法撤回，所以流程顺序决定会不会掉钱。出票改为「先打印、打印成功回报后 server 才扣款」（原本先扣再打印，打印机故障就吃掉玩家余额）；入钞先由机器夹住，server 确认加分成功才收进钱箱；票券兑换以单句条件式 UPDATE 靠数据库原子性，防止同一张票在两台机器重复入账。",
                    en: "Money operations cannot be undone, so the order of the steps decides whether money goes missing. Ticket-out was changed to print first and deduct only after the printer reports success — the original order deducted first, so a printer fault swallowed the player's balance. Cash-in holds the note in escrow and only drops it into the stacker once the server confirms the credit. Ticket redemption validates and marks the ticket as used in a single conditional UPDATE, relying on database atomicity so the same ticket cannot be credited on two machines at once.",
                    ja: "金銭処理は取り消せないため、手順の順序がそのまま「お金が消えるかどうか」を決める。チケット発券は「先に印刷し、成功の報告を受けてからサーバーが残高を引く」方式へ変更した（元は先に引いていたため、プリンタ故障でプレイヤーの残高が消えていた）。紙幣投入はいったんエスクローで保持し、サーバーがクレジット加算を確認してから金庫に収める。チケット精算は検証と使用済みフラグを単一の条件付き UPDATE で行い、DB の原子性によって同じチケットが 2 台で二重計上されるのを防いでいる。"
                }
            },
            {
                title: { "zh-Hant": "以不變式取代固定案例的測試", "zh-Hans": "以不变量取代固定用例的测试", en: "Testing with Invariants Instead of Fixed Cases", ja: "固定ケースではなく不変条件でテストする" },
                body: {
                    "zh-Hant": "彩池與牌型是「算錯就掉錢」的模組。斷言不寫固定期望值（那等於在測試裡重新實作一次被測邏輯），而是隨機產生大量牌局驗證不變式：分配金額加抽水等於總投入、任何人所得不超過「每家跟得到他的那部分」、棄牌者不得分錢、沒有任何其他五張組合能贏過被選中的那組。",
                    "zh-Hans": "彩池与牌型是「算错就掉钱」的模块。断言不写固定期望值（那等于在测试里重新实现一次被测逻辑），而是随机产生大量牌局验证不变量：分配金额加抽水等于总投入、任何人所得不超过「每家跟得到他的那部分」、弃牌者不得分钱、没有任何其他五张组合能赢过被选中的那组。",
                    en: "Pot distribution and hand evaluation are modules where a wrong answer means lost money. Instead of asserting fixed expected values — which amounts to reimplementing the logic under test inside the test itself — the suite generates large numbers of random hands and checks invariants: distributed amounts plus rake equal total contributions; nobody receives more than the sum of what each opponent could match against them; folded and non-participating players receive nothing; and no other five-card combination beats the one selected.",
                    ja: "ポット計算と役判定は「間違えれば金が消える」モジュールだ。固定の期待値を書くアサーション（テスト内で被テストロジックを実装し直すのと同じ）ではなく、ランダムなハンドを大量に生成して不変条件を検証している：分配額とレーキの合計が総投入額と一致すること、誰も「各対戦相手が自分に対してコールできた分」の合計を超えて受け取らないこと、フォールドや不参加のプレイヤーが配当を得ないこと、選ばれた 5 枚より強い組み合わせが他に存在しないこと。"
                }
            }
        ],
        limits: [
            {
                "zh-Hant": "流程由 client 推動的代價是重連後牌局會停住（server 等不到下一個請求）。評估過「client 依狀態補送」，但發牌類狀態的重入安全性未經驗證，猜錯會重複發牌或重複結算，因此改採「由 server 作廢本手」的方向",
                "zh-Hans": "流程由 client 推动的代价是重连后牌局会停住（server 等不到下一个请求）。评估过「client 依状态补送」，但发牌类状态的重入安全性未经验证，猜错会重复发牌或重复结算，因此改采「由 server 作废本手」的方向",
                en: "Because the flow is client-driven, a reconnect leaves the hand stuck — the server never receives the next request. Having the client re-send based on state was considered, but the reentrancy safety of dealing states is unverified and a wrong guess would deal or settle twice, so the chosen direction is to have the server void the hand instead",
                ja: "進行がクライアント駆動であるため、再接続後はハンドが止まってしまう（サーバーが次のリクエストを受け取れない）。「クライアントが状態に応じて再送する」案も検討したが、配布系ステートの再入安全性が未検証で、誤れば二重配布や二重精算になる。そのため「サーバー側でそのハンドを無効化する」方向を採った"
            },
            {
                "zh-Hant": "所有座位共用單一連線是目前可行的原因，也是未來拆分成多機時第一個要改的地方",
                "zh-Hans": "所有座位共用单一连接是目前可行的原因，也是未来拆分成多机时第一个要改的地方",
                en: "All seats sharing a single connection is what makes the current design workable, and it is also the first thing that must change when the cabinet is split into multiple machines",
                ja: "全席が単一のコネクションを共有している点は、現状の設計が成立している理由であると同時に、将来複数筐体へ分割する際に真っ先に変更すべき箇所でもある"
            },
            {
                "zh-Hant": "讀卡機使用鍵盤模擬，在 Windows 下與 Unity 搶註冊原始輸入，視窗焦點切換後會失效。評估過多種軟體解法皆無效，結論是應請設備商切換為虛擬序列埠模式",
                "zh-Hans": "读卡机使用键盘模拟，在 Windows 下与 Unity 抢注册原始输入，窗口焦点切换后会失效。评估过多种软件解法皆无效，结论是应请设备商切换为虚拟串口模式",
                en: "The card reader runs in keyboard-emulation mode and competes with Unity for raw input registration on Windows, so it stops working once the window loses and regains focus. Several software workarounds were evaluated and none held up; the conclusion is to ask the vendor to switch the device to virtual serial port mode, which is the only real fix",
                ja: "カードリーダーがキーボードエミュレーション動作のため、Windows 上で Unity と Raw Input の登録を奪い合い、ウィンドウのフォーカス切り替え後に反応しなくなる。複数のソフトウェア的回避策を試したがいずれも有効ではなく、結論としてはメーカーに仮想シリアルポートモードへの切り替えを依頼するのが唯一の根本解決となる"
            }
        ]
    },
    {
        title: "Heresy",
        categories: ["featured", "project"],
        tags: [
            { "zh-Hant": "俯視角動作", "zh-Hans": "俯视角动作", en: "Top-down Action", ja: "見下ろし型アクション" },
            "Boss Rush",
            { "zh-Hant": "TGIPA 佳作", "zh-Hans": "TGIPA 佳作", en: "TGIPA Honorable Mention", ja: "TGIPA 佳作" }
        ],
        cover: { type: "youtube", url: "https://www.youtube.com/watch?v=yD_MXcrLeDU" },
        description: {
            "zh-Hant": "以「首領挑戰（Boss Rush）」為核心的俯視角動作遊戲。玩家需觀察頭目複雜的行為模式、找出應對節奏，以精準的操作與策略擊敗一個個強敵。本作獲得 2024 TGIPA 台灣原創遊戲大賞「校園組 佳作」。我在團隊中擔任程式設計與企劃。",
            "zh-Hans": "以「首领挑战（Boss Rush）」为核心的俯视角动作游戏。玩家需观察头目复杂的行为模式、找出应对节奏，以精准的操作与策略击败一个个强敌。本作获得 2024 TGIPA 台湾原创游戏大赏「校园组 佳作」。我在团队中担任程序设计与企划。",
            en: "A top-down action game built around boss rush encounters. Players read each boss's complex behaviour patterns, find the rhythm to answer them, and bring down one powerful enemy after another through precise play and strategy. The game received an Honorable Mention in the student division of the 2024 TGIPA (Taiwan Game Innovation & Production Awards). I worked as programmer and designer on the team.",
            ja: "ボスラッシュを核に据えた見下ろし型アクションゲーム。プレイヤーはボスの複雑な行動パターンを観察し、対応のリズムを見つけ、精密な操作と戦略で強敵を一体ずつ打ち倒していく。本作は 2024 年 TGIPA 台湾オリジナルゲーム大賞の学生部門で佳作を受賞。チームではプログラムと企画を担当した。"
        },
        roles: [
            {
                "zh-Hant": "遊戲整體架構與系統設計",
                "zh-Hans": "游戏整体架构与系统设计",
                en: "Overall game architecture and system design",
                ja: "ゲーム全体のアーキテクチャとシステム設計"
            },
            {
                "zh-Hant": "戰鬥系統設計",
                "zh-Hans": "战斗系统设计",
                en: "Combat system design",
                ja: "戦闘システムの設計"
            },
            {
                "zh-Hant": "BOSS 行為設計",
                "zh-Hans": "BOSS 行为设计",
                en: "Boss behaviour design",
                ja: "ボスの行動設計"
            },
            {
                "zh-Hant": "戰鬥體驗調校與數值平衡",
                "zh-Hans": "战斗体验调校与数值平衡",
                en: "Combat feel tuning and balance",
                ja: "戦闘の手触り調整と数値バランス"
            },
            {
                "zh-Hant": "解謎機制設計與實作",
                "zh-Hans": "解谜机制设计与实现",
                en: "Puzzle mechanic design and implementation",
                ja: "パズル要素の設計と実装"
            }
        ],
        links: [
            {
                label: { "zh-Hant": "TGIPA 2024 得獎作品", "zh-Hans": "TGIPA 2024 获奖作品", en: "TGIPA 2024 Winners", ja: "TGIPA 2024 受賞作品" },
                url: "https://www.tgipa.org.tw/works_2024.html", icon: "★"
            },
            {
                label: { "zh-Hant": "DEMO 影片", "zh-Hans": "DEMO 视频", en: "Demo Video", ja: "デモ動画" },
                url: "https://www.youtube.com/watch?v=yD_MXcrLeDU&t=13s", icon: "▶"
            },
            {
                label: { "zh-Hant": "企劃書 PDF", "zh-Hans": "企划书 PDF", en: "Design Doc (PDF)", ja: "企画書 PDF" },
                url: "docs/heresy-gdd.pdf", icon: "✎"
            }
        ]
    },
    {
        title: "KEEP",
        categories: ["featured", "project"],
        tags: ["Unity", { "zh-Hant": "解謎", "zh-Hans": "解谜", en: "Puzzle", ja: "パズル" }, "Game Jam"],
        cover: { type: "image", src: "images/keep-cover.jpg" },
        description: {
            "zh-Hant": "2026 Garena × Rayark Game Jam（主題「Re Play, 一玩再玩」）參賽作品，以「保持（KEEP）」為核心的解謎遊戲。每輪有固定的行動次數，次數用完或手動觸發「重製」時，全地圖物件都會重置——唯有被 KEEP 的物件會保留位置與狀態。玩家要活用 KEEP 與重製的組合解開謎題。可直接在瀏覽器遊玩。",
            "zh-Hans": "2026 Garena × Rayark Game Jam（主题「Re Play, 一玩再玩」）参赛作品，以「保持（KEEP）」为核心的解谜游戏。每轮有固定的行动次数，次数用完或手动触发「重置」时，全地图物件都会重置——唯有被 KEEP 的物件会保留位置与状态。玩家要活用 KEEP 与重置的组合解开谜题。可直接在浏览器游玩。",
            en: "An entry for the 2026 Garena × Rayark Game Jam (theme: \"Re Play\"), a puzzle game built around a mechanic called KEEP. Each round gives a fixed number of actions; when they run out — or when you trigger a reset yourself — every object on the map returns to its starting state, except the ones marked with KEEP, which hold both their position and their state. Solving a puzzle means combining KEEP with the reset. Playable directly in the browser.",
            ja: "2026 Garena × Rayark Game Jam（テーマ「Re Play, 一玩再玩」）出展作品。「KEEP（保持）」を核にしたパズルゲームで、各ラウンドには決まった行動回数があり、使い切るか手動でリセットすると、KEEP したオブジェクト以外はすべて初期状態に戻る。KEEP したものだけは位置も状態も保たれる。この KEEP とリセットの組み合わせで謎を解いていく。ブラウザでそのままプレイ可能。"
        },
        tech: ["Unity", "C#", "Shader"],
        roles: [
            {
                group: { "zh-Hant": "玩法設計", "zh-Hans": "玩法设计", en: "Gameplay Design", ja: "ゲームデザイン" },
                items: [
                    {
                        "zh-Hant": "提出本作核心玩法「KEEP」機制",
                        "zh-Hans": "提出本作核心玩法「KEEP」机制",
                        en: "Proposed the core KEEP mechanic the game is built on",
                        ja: "本作のコアメカニクス「KEEP」を提案"
                    }
                ]
            },
            {
                group: { "zh-Hant": "程式實作", "zh-Hans": "程序实现", en: "Programming", ja: "実装" },
                items: [
                    {
                        "zh-Hant": "KEEP／重製系統：行動次數、地圖物件重置與被保持物件的狀態保留",
                        "zh-Hans": "KEEP／重置系统：行动次数、地图物件重置与被保持物件的状态保留",
                        en: "The KEEP / reset system: action counts, resetting map objects, and preserving the state of kept objects",
                        ja: "KEEP／リセットシステム：行動回数、マップオブジェクトのリセット、KEEP 対象の状態保持"
                    },
                    {
                        "zh-Hant": "道具互動與其他主要遊戲功能開發",
                        "zh-Hans": "道具互动与其他主要游戏功能开发",
                        en: "Item interactions and most other gameplay features",
                        ja: "アイテムのインタラクションおよびその他の主要なゲーム機能"
                    },
                    {
                        "zh-Hant": "描邊 Shader 製作",
                        "zh-Hans": "描边 Shader 制作",
                        en: "Outline shader",
                        ja: "アウトライン Shader の作成"
                    }
                ]
            }
        ],
        links: [
            {
                label: { "zh-Hant": "ITCH.IO 遊玩", "zh-Hans": "itch.io 试玩", en: "Play on itch.io", ja: "itch.io でプレイ" },
                url: "https://pinzhensu.itch.io/keep", icon: "▶"
            }
        ]
    },
    {
        title: "TweenFlow",
        categories: ["featured", "tool"],
        tags: ["Unity", { "zh-Hant": "Editor 工具", "zh-Hans": "Editor 工具", en: "Editor Tool", ja: "エディタ拡張" }, "DOTween"],
        cover: { type: "youtube", url: "https://www.youtube.com/watch?v=gKQwnMXvXj0" },
        description: {
            "zh-Hant": "基於 DOTween 開發的模組化動態排序系統，提供類似 Feel（MMFeedbacks）的模組化編輯介面。設計初衷是解決複雜 UI 與場景動態在傳統寫法下難以維護、難以重複使用的問題，讓動態效果能以序列方式組裝與複用。已實際導入《炎姬》的開發流程中使用。",
            "zh-Hans": "基于 DOTween 开发的模块化动态排序系统，提供类似 Feel（MMFeedbacks）的模块化编辑界面。设计初衷是解决复杂 UI 与场景动态在传统写法下难以维护、难以重复使用的问题，让动态效果能以序列方式组装与复用。已实际导入《炎姬》的开发流程中使用。",
            en: "A modular motion sequencing system built on DOTween, offering a block-based editing interface similar to Feel (MMFeedbacks). It exists to solve how hard complex UI and scene animation is to maintain and reuse when written by hand, letting motion be assembled and reused as sequences. It is in active use in the production pipeline of Homura Hime.",
            ja: "DOTween をベースにしたモジュール式のモーションシーケンスシステム。Feel（MMFeedbacks）に近いモジュール型の編集インターフェースを提供する。複雑な UI やシーン演出は従来の書き方では保守も再利用も難しい、という課題を解決するために作ったもので、演出をシーケンスとして組み立て・再利用できる。『炎姬』の開発フローに実際に導入して使用している。"
        },
        tech: ["Unity", "C#", "DOTween", "Odin Inspector"],
        roles: [
            {
                group: { "zh-Hant": "系統設計", "zh-Hans": "系统设计", en: "System Design", ja: "システム設計" },
                items: [
                    {
                        "zh-Hant": "以繼承與多型架構設計序列控制框架，開發者可快速擴充自定義功能模組",
                        "zh-Hans": "以继承与多态架构设计序列控制框架，开发者可快速扩充自定义功能模块",
                        en: "Designed the sequencing framework around inheritance and polymorphism so developers can add custom modules quickly",
                        ja: "継承とポリモーフィズムを用いてシーケンス制御フレームワークを設計し、独自モジュールを容易に追加できるようにした"
                    }
                ]
            },
            {
                group: { "zh-Hant": "易用性與導入", "zh-Hans": "易用性与导入", en: "Usability & Adoption", ja: "使いやすさと導入" },
                items: [
                    {
                        "zh-Hant": "整合 Odin Inspector 簡化操作介面，非工程人員也能自行配置動態效果",
                        "zh-Hans": "整合 Odin Inspector 简化操作界面，非工程人员也能自行配置动态效果",
                        en: "Integrated Odin Inspector to simplify the interface so non-engineers can configure motion themselves",
                        ja: "Odin Inspector を組み込んで操作画面を簡素化し、非エンジニアでも演出を設定できるようにした"
                    },
                    {
                        "zh-Hant": "於《炎姬》開發流程中實裝並使用",
                        "zh-Hans": "于《炎姬》开发流程中实装并使用",
                        en: "Deployed and used in the Homura Hime production pipeline",
                        ja: "『炎姬』の開発フローに実装・導入"
                    }
                ]
            }
        ],
        links: [
            { label: "GITHUB", url: "https://github.com/ChengHsiCheng/UnityTools.git", icon: "⌂" },
            {
                label: { "zh-Hant": "DEMO 影片", "zh-Hans": "DEMO 视频", en: "Demo Video", ja: "デモ動画" },
                url: "https://www.youtube.com/watch?v=gKQwnMXvXj0", icon: "▶"
            }
        ]
    }
];
