# GitHub Stars カタログ — `0x000x7f`

> ユーザー `0x000x7f` の公開スター（starred repositories）全 **120 件**を、今後のプロジェクトで再利用しやすいよう分類したカタログ。
> 生成日: 2026-06-18

---

## 取得方法 / 更新方法（重要）

スター一覧は **GitHub の認証なし API が 403（未認証レート制限）になる**ため、以下の方法で取得する。

- ✅ **確実**: GitHub API を **tavily MCP の `tavily_extract`** 経由で取得（tavily インフラ側で認証/レート制限を回避）
  - `https://api.github.com/users/0x000x7f/starred?per_page=100&page=1`
  - `https://api.github.com/users/0x000x7f/starred?per_page=100&page=2`
  - 返ってきた JSON を `jq` で `full_name / language / description / stargazers_count` に整形。
- ✅ **代替**: 公開スターページを `WebFetch` / `tavily_extract`
  - `https://github.com/0x000x7f?tab=stars`（ページングは `&page=2` …。WebFetch ではページングが効かない場合があるので tavily 推奨）
- ❌ `WebFetch` で `api.github.com/.../starred` を直叩き → **403 Forbidden**
- ❌ GitHub MCP（`mcp__github__*`）には **スター一覧取得用ツールが無い**（リポジトリ単位のものだけ）

> 注: star 数は抽出経路によって桁が乱れる場合があるため本カタログでは省略。リポジトリ名・説明・言語は正確。

---

## カテゴリ別ハイライト

### 🎯 Claude Code / エージェント強化（スキル・ハーネス・プラグイン）

「Opus にサブエージェントを積極的・並列に起動させる」目的に対する実読評価つき。

| リポジトリ | 言語 | メモ（目的への有用度） |
|---|---|---|
| [obra/superpowers](https://github.com/obra/superpowers) | Shell | **本命 5/5**。`dispatching-parallel-agents`（1応答内で複数 dispatch＝並列）/ `subagent-driven-development` を実装。MIT・テレメトリopt-out可 |
| [anthropics/claude-plugins-official](https://github.com/anthropics/claude-plugins-official) | Python | **公式 4/5**。`feature-dev`（code-explorer/architect/reviewer の専門サブエージェント同梱）, `pr-review-toolkit` 等 |
| [anthropics/skills](https://github.com/anthropics/skills) | Python | 公式 Agent Skills。`context: fork`+`agent:` でサブエージェント委譲も可（仕組み）。中身は文書/デザイン系 |
| [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills) | Shell | 実務級エンジニアリングスキル集 |
| [affaan-m/ECC](https://github.com/affaan-m/ECC) | JavaScript | エージェントハーネス最適化（skills/instincts/memory/security）。要安全性確認 |
| [Leonxlnx/agentic-ai-prompt-research](https://github.com/Leonxlnx/agentic-ai-prompt-research) | — | エージェント協調・プロンプトパターン研究（委譲挙動の理解に） |
| [openai/codex-plugin-cc](https://github.com/openai/codex-plugin-cc) | JavaScript | Claude Code → Codex にタスク委譲（外部サブエージェント委譲の実例） |
| [openai/skills](https://github.com/openai/skills) | Python | Codex 用スキルカタログ |
| [caliber-ai-org/ai-setup](https://github.com/caliber-ai-org/ai-setup) | TypeScript | skills/MCP/config を Claude Code・Cursor・Codex 間で同期 |
| [midudev/autoskills](https://github.com/midudev/autoskills) | Ruby | スキルスタックを1コマンド導入 |
| [multica-ai/andrej-karpathy-skills](https://github.com/multica-ai/andrej-karpathy-skills) | — | CLAUDE.md 改善（**慎重・最小変更志向**＝サブエージェント目的には 1/5）。原典は `forrestchang/...` |
| [Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill) | JavaScript | 出力に「センス」を与えるスキル |
| [hardikpandya/stop-slop](https://github.com/hardikpandya/stop-slop) | — | 文章から AI っぽさを除去するスキル |
| [anthropics/claude-code](https://github.com/anthropics/claude-code) | Python | Claude Code 本体 |
| [anthropics/claude-for-legal](https://github.com/anthropics/claude-for-legal) | Python | 法務ワークフロー用プラグイン群 |
| [anthropics/financial-services](https://github.com/anthropics/financial-services) | Python | 金融向け（公式） |
| [kepano/obsidian-skills](https://github.com/kepano/obsidian-skills) | — | Obsidian 用 Agent Skills |
| [WordPress/agent-skills](https://github.com/WordPress/agent-skills) | JavaScript | WordPress 専門知識スキル |

### 🧩 Claude Code 代替ビルド / クライアント / 周辺
| リポジトリ | 言語 | メモ |
|---|---|---|
| [x1xhlol/better-clawd](https://github.com/x1xhlol/better-clawd) | TypeScript | Claude Code の改良版（OpenAI/OpenRouter 対応, no telemetry） |
| [freecodexyz/free-code](https://github.com/freecodexyz/free-code) | TypeScript | ⚠️ guardrail 除去ビルド。利用は要注意 |
| [Gitlawb/openclaude](https://github.com/Gitlawb/openclaude) | TypeScript | "runs anywhere. uses anything" |
| [d-kimuson/claude-code-viewer](https://github.com/d-kimuson/claude-code-viewer) | TypeScript | Claude Code の Web クライアント |
| [ultraworkers/claw-code](https://github.com/ultraworkers/claw-code) | Rust | 完全無人運用の実験プロジェクト |

### 📜 システムプロンプト / プロンプト研究（参考資料）
| リポジトリ | 言語 | メモ |
|---|---|---|
| [x1xhlol/system-prompts-and-models-of-ai-tools](https://github.com/x1xhlol/system-prompts-and-models-of-ai-tools) | — | 各種 AI ツールのシステムプロンプト集 |
| [elder-plinius/CL4R1T4S](https://github.com/elder-plinius/CL4R1T4S) | — | 各 AI のシステムプロンプト集 |
| [YouMind-OpenLab/awesome-nano-banana-pro-prompts](https://github.com/YouMind-OpenLab/awesome-nano-banana-pro-prompts) | TypeScript | Gemini 画像生成プロンプト集 |

### 🔌 MCP サーバ
| リポジトリ | 言語 | メモ |
|---|---|---|
| [punkpeye/awesome-mcp-servers](https://github.com/punkpeye/awesome-mcp-servers) | — | MCP サーバのカタログ |
| [hangwin/mcp-chrome](https://github.com/hangwin/mcp-chrome) | TypeScript | Chrome 拡張ベースの MCP（ブラウザ自動化） |
| [ChromeDevTools/chrome-devtools-mcp](https://github.com/ChromeDevTools/chrome-devtools-mcp) | TypeScript | Chrome DevTools の MCP |
| [tradesdontlie/tradingview-mcp](https://github.com/tradesdontlie/tradingview-mcp) | JavaScript | TradingView 連携 MCP |
| [zinja-coder/jadx-mcp-server](https://github.com/zinja-coder/jadx-mcp-server) | Python | JADX（APK 逆コンパイル）MCP |
| [microsoft/work-iq](https://github.com/microsoft/work-iq) | PowerShell | Work IQ の MCP/CLI |

### 🤖 エージェントフレームワーク（汎用 / Claude Code 外）
| リポジトリ | 言語 | メモ |
|---|---|---|
| [n8n-io/n8n](https://github.com/n8n-io/n8n) | TypeScript | AI 機能つきワークフロー自動化 |
| [langchain-ai/langgraph](https://github.com/langchain-ai/langgraph) | Python | エージェントオーケストレーション |
| [crewAIInc/crewAI](https://github.com/crewAIInc/crewAI) | Python | 役割分担マルチエージェント |
| [OpenHands/OpenHands](https://github.com/OpenHands/OpenHands) | Python | 自律開発エージェント |
| [browser-use/browser-use](https://github.com/browser-use/browser-use) | Python | ブラウザ操作エージェント |
| [google-gemini/gemini-cli](https://github.com/google-gemini/gemini-cli) | TypeScript | Gemini の CLI エージェント |
| [Aider-AI/aider](https://github.com/Aider-AI/aider) | Python | ターミナル AI ペアプロ |
| [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) | Python | 成長型エージェント |
| [zai-org/Open-AutoGLM](https://github.com/zai-org/Open-AutoGLM) | Python | オープンな電話エージェント |
| [Shubhamsaboo/awesome-llm-apps](https://github.com/Shubhamsaboo/awesome-llm-apps) | Python | 100+ AI/RAG アプリ集 |
| [danny-avila/LibreChat](https://github.com/danny-avila/LibreChat) | TypeScript | 多機能セルフホスト型チャット |
| [cloudflare/agentic-inbox](https://github.com/cloudflare/agentic-inbox) | TypeScript | AI 付きメールクライアント |
| [heygen-com/hyperframes](https://github.com/heygen-com/hyperframes) | TypeScript | HTML→動画（エージェント向け） |
| [NangoHQ/nango](https://github.com/NangoHQ/nango) | TypeScript | AI で製品連携を構築 |
| [HKUDS/CLI-Anything](https://github.com/HKUDS/CLI-Anything) | Python | 全ソフトを agent-native 化 |

### 🕸️ コード知識グラフ / コンテキスト・トークン削減
| リポジトリ | 言語 | メモ |
|---|---|---|
| [Egonex-AI/Understand-Anything](https://github.com/Egonex-AI/Understand-Anything) | TypeScript | コード→インタラクティブ知識グラフ |
| [colbymchenry/codegraph](https://github.com/colbymchenry/codegraph) | TypeScript | ローカルのコード知識グラフ（トークン削減） |
| [StarTrail-org/LEANN](https://github.com/StarTrail-org/LEANN) | Python | 省ストレージなローカル RAG |
| [rtk-ai/rtk](https://github.com/rtk-ai/rtk) | Rust | dev コマンドのトークンを 60-90% 削減 |
| [yvgude/lean-ctx](https://github.com/yvgude/lean-ctx) | Rust | コンテキスト制御層（76 MCP tools, 30+ agents） |
| [teng-lin/notebooklm-py](https://github.com/teng-lin/notebooklm-py) | Python | NotebookLM の非公式 API/スキル |

### 📄 ドキュメント / データ抽出・変換
| リポジトリ | 言語 | メモ |
|---|---|---|
| [microsoft/markitdown](https://github.com/microsoft/markitdown) | Python | Office 等→Markdown 変換 |
| [docling-project/docling](https://github.com/docling-project/docling) | Python | 文書を gen AI 向けに整形 |
| [opendataloader-project/opendataloader-pdf](https://github.com/opendataloader-project/opendataloader-pdf) | Java | AI 向け PDF パーサ |
| [deepseek-ai/DeepSeek-OCR](https://github.com/deepseek-ai/DeepSeek-OCR) | Python | OCR/コンテキスト光学圧縮 |
| [google/magika](https://github.com/google/magika) | Python | AI ファイル種別判定 |
| [kepano/defuddle](https://github.com/kepano/defuddle) | TypeScript | ページ本文→Markdown 抽出 |
| [dnobori/DN_SuperBook_PDF_Converter](https://github.com/dnobori/DN_SuperBook_PDF_Converter) | C# | スキャン PDF の高品質化 |

### 💹 金融・トレーディング
| リポジトリ | 言語 | メモ |
|---|---|---|
| [TauricResearch/TradingAgents](https://github.com/TauricResearch/TradingAgents) | Python | マルチエージェント取引 FW |
| [virattt/dexter](https://github.com/virattt/dexter) | TypeScript | 自律型金融リサーチエージェント |
| [edinetdb/dexter-jp](https://github.com/edinetdb/dexter-jp) | TypeScript | 日本株リサーチ AI（EDINET+J-Quants） |
| [Cabocia/edinetdb-cli](https://github.com/Cabocia/edinetdb-cli) | Python | EDINET DB の CLI |
| [AI4Finance-Foundation/FinGPT](https://github.com/AI4Finance-Foundation/FinGPT) | Jupyter Notebook | オープン金融 LLM |
| [HKUDS/AI-Trader](https://github.com/HKUDS/AI-Trader) | Python | 全自動 agent-native 取引 |
| [JerBouma/FinanceDatabase](https://github.com/JerBouma/FinanceDatabase) | Python | 30万+ 銘柄 DB |
| [cbailes/awesome-deep-trading](https://github.com/cbailes/awesome-deep-trading) | — | ML 取引リソース集 |
| [Fincept-Corporation/FinceptTerminal](https://github.com/Fincept-Corporation/FinceptTerminal) | C++ | 金融分析ターミナル |

### 🎓 学術ライティング / 研究支援
| リポジトリ | 言語 | メモ |
|---|---|---|
| [K-Dense-AI/scientific-agent-skills](https://github.com/K-Dense-AI/scientific-agent-skills) | Python | 科学向け Agent Skills（140 skills） |
| [Imbad0202/academic-research-skills](https://github.com/Imbad0202/academic-research-skills) | Python | 研究→執筆→レビューの Claude Code スキル |
| [lishix520/academic-paper-skills](https://github.com/lishix520/academic-paper-skills) | Python | 論文計画/執筆スキル |
| [matsuikentaro1/humanizer_academic](https://github.com/matsuikentaro1/humanizer_academic) | — | 学術論文の AI 臭除去スキル |
| [SakanaAI/AI-Scientist](https://github.com/SakanaAI/AI-Scientist) | Jupyter Notebook | 全自動科学発見 |
| [HKUDS/DeepTutor](https://github.com/HKUDS/DeepTutor) | Python | agent-native 個別指導 |
| [FareedKhan-dev/train-llm-from-scratch](https://github.com/FareedKhan-dev/train-llm-from-scratch) | Python | LLM ゼロから学習 |
| [microsoft/generative-ai-for-beginners](https://github.com/microsoft/generative-ai-for-beginners) | Jupyter Notebook | 生成 AI 入門 21 講 |
| [enunun/introductiontostatistics](https://github.com/enunun/introductiontostatistics) | Typst | 統計入門 |
| [xiyin137/QFT](https://github.com/xiyin137/QFT) | TeX | 場の量子論ノート |
| [zk-tokyo/core-program-2025](https://github.com/zk-tokyo/core-program-2025) | Assembly | ZK コアプログラム 2025 |
| [atcoder/ac-library](https://github.com/atcoder/ac-library) | C++ | 競プロライブラリ |

### 🇯🇵 日本特化
| リポジトリ | 言語 | メモ |
|---|---|---|
| [kazukinagata/shinkoku](https://github.com/kazukinagata/shinkoku) | Python | 確定申告自動化 AI エージェント |
| [naoterumaker/japan-gyousei-data](https://github.com/naoterumaker/japan-gyousei-data) | Shell | 行政オープンデータ skill |
| [yuru7/udev-gothic](https://github.com/yuru7/udev-gothic) | Python | プログラミング向け日本語フォント |
| [gsi-cyberjapan/optimal_bvmap](https://github.com/gsi-cyberjapan/optimal_bvmap) | JavaScript | 国土地理院ベクトルタイル |
| [yaneurao/YaneuraOu](https://github.com/yaneurao/YaneuraOu) | C++ | 世界最強の将棋エンジン |

### 🎬 メディア生成 / 音声 / 画像
| リポジトリ | 言語 | メモ |
|---|---|---|
| [microsoft/VibeVoice](https://github.com/microsoft/VibeVoice) | Python | オープン音声 AI |
| [OpenBMB/VoxCPM](https://github.com/OpenBMB/VoxCPM) | Python | トークナイザ不要 TTS |
| [harry0703/MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo) | Python | AI で短尺動画生成 |
| [NVlabs/Sana](https://github.com/NVlabs/Sana) | Python | 高解像度画像生成 |
| [jaakkopasanen/AutoEq](https://github.com/jaakkopasanen/AutoEq) | Python | ヘッドホン自動 EQ |
| [nilaoda/N_m3u8DL-RE](https://github.com/nilaoda/N_m3u8DL-RE) | C# | ストリームダウンローダ |
| [spotiflacapp/SpotiFLAC-Mobile](https://github.com/spotiflacapp/SpotiFLAC-Mobile) | Dart | 高音質音楽ユーティリティ |
| [pear-devs/pear-desktop](https://github.com/pear-devs/pear-desktop) | TypeScript | 音楽プレイヤー拡張 |
| [m-shintaro/apple-music-obs-overlay](https://github.com/m-shintaro/apple-music-obs-overlay) | Python | OBS の再生中オーバーレイ |
| [mtripg6666tdr/Discord-SimpleMusicBot](https://github.com/mtripg6666tdr/Discord-SimpleMusicBot) | TypeScript | Discord 音楽 Bot |
| [nalltama/RAIV](https://github.com/nalltama/RAIV) | Python | AI アップスケール画像ビューア |
| [xyTom/snippai](https://github.com/xyTom/snippai) | TypeScript | スクショから何でも解決 |

### 📱 Android / Nintendo Switch / ハードウェア
| リポジトリ | 言語 | メモ |
|---|---|---|
| [termux/termux-app](https://github.com/termux/termux-app) | Java | Android のターミナル |
| [legendsayantan/ShizuTools](https://github.com/legendsayantan/ShizuTools) | Kotlin | shizuku で Android 制御 |
| [dezem/SAK](https://github.com/dezem/SAK) | — | Switch Army Knife |
| [julesontheroad/XCI_Builder](https://github.com/julesontheroad/XCI_Builder) | Batchfile | Switch nsp→xci 変換 |
| [sorasen2020/SwitchControllerESP32](https://github.com/sorasen2020/SwitchControllerESP32) | C++ | ESP32 で Switch 制御 |
| [OpenWonderLabs/switchbot-openapi-cli](https://github.com/OpenWonderLabs/switchbot-openapi-cli) | TypeScript | SwitchBot API の CLI |

### 🛡️ セキュリティ / CTF / OSINT
| リポジトリ | 言語 | メモ |
|---|---|---|
| [reconurge/flowsint](https://github.com/reconurge/flowsint) | TypeScript | グラフベース OSINT 調査 |
| [kakur41/CTFd-AI-Buddy](https://github.com/kakur41/CTFd-AI-Buddy) | Python | CTFd 用 AI バディ |
| [halkichi0308/GuardExt](https://github.com/halkichi0308/GuardExt) | JavaScript | 悪性 Chrome 拡張検出 |
| [angristan/openvpn-install](https://github.com/angristan/openvpn-install) | Shell | OpenVPN サーバ構築 |
| [Satsuoni/DeDRM_tools](https://github.com/Satsuoni/DeDRM_tools) | Python | 電子書籍 DeDRM |

### 🛠️ その他ユーティリティ / 開発 / 趣味
| リポジトリ | 言語 | メモ |
|---|---|---|
| [zellij-org/zellij](https://github.com/zellij-org/zellij) | Rust | ターミナルワークスペース |
| [maplibre/maplibre-gl-js](https://github.com/maplibre/maplibre-gl-js) | TypeScript | ベクトルタイル地図 |
| [millionco/react-doctor](https://github.com/millionco/react-doctor) | TypeScript | React の悪コード検出 |
| [lrsjng/h5ai](https://github.com/lrsjng/h5ai) | JavaScript | Web サーバのインデックス表示 |
| [viperrcrypto/Siftly](https://github.com/viperrcrypto/Siftly) | TypeScript | Twitter/X ブックマーク整理 |
| [jbiaojerry/ebook-treasure-chest](https://github.com/jbiaojerry/ebook-treasure-chest) | Python | 電子書籍リンク集 |
| [SoraKumo001/satoru](https://github.com/SoraKumo001/satoru) | C++ | （説明なし） |
| [CHACCHAN/cit-gpu](https://github.com/CHACCHAN/cit-gpu) | Python | （説明なし） |
| [Axe0320/latex-table-composer](https://github.com/Axe0320/latex-table-composer) | TypeScript | LaTeX 表作成 |
| [UnknownSekai/GridlessSekai-Retro](https://github.com/UnknownSekai/GridlessSekai-Retro) | — | リズムゲームのオフラインアーカイブ |

---

## 付録: 全 120 件（アルファベット順）

| Repo | Lang | Description |
|---|---|---|
| [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills) | Shell | Production-grade engineering skills for AI coding agents. |
| [affaan-m/ECC](https://github.com/affaan-m/ECC) | JavaScript | The agent harness performance optimization system. Skills, instincts, memory, security, and research-first development for Claude Code, Codex, Opencode, Cursor and beyond. |
| [AI4Finance-Foundation/FinGPT](https://github.com/AI4Finance-Foundation/FinGPT) | Jupyter Notebook | FinGPT: Open-Source Financial Large Language Models! |
| [Aider-AI/aider](https://github.com/Aider-AI/aider) | Python | aider is AI pair programming in your terminal |
| [angristan/openvpn-install](https://github.com/angristan/openvpn-install) | Shell | Set up your own OpenVPN server on Debian, Ubuntu, Fedora, CentOS, Arch Linux and more |
| [anthropics/claude-code](https://github.com/anthropics/claude-code) | Python | Claude Code is an agentic coding tool that lives in your terminal. |
| [anthropics/claude-for-legal](https://github.com/anthropics/claude-for-legal) | Python | A suite of plugins for legal workflows |
| [anthropics/claude-plugins-official](https://github.com/anthropics/claude-plugins-official) | Python | Official, Anthropic-managed directory of high quality Claude Code Plugins. |
| [anthropics/financial-services](https://github.com/anthropics/financial-services) | Python | — |
| [anthropics/skills](https://github.com/anthropics/skills) | Python | Public repository for Agent Skills |
| [atcoder/ac-library](https://github.com/atcoder/ac-library) | C++ | AtCoder Library |
| [Axe0320/latex-table-composer](https://github.com/Axe0320/latex-table-composer) | TypeScript | — |
| [browser-use/browser-use](https://github.com/browser-use/browser-use) | Python | Make websites accessible for AI agents. Automate tasks online with ease. |
| [Cabocia/edinetdb-cli](https://github.com/Cabocia/edinetdb-cli) | Python | Command-line interface for EDINET DB — Japanese listed company financial data API. |
| [caliber-ai-org/ai-setup](https://github.com/caliber-ai-org/ai-setup) | TypeScript | Continuously sync your AI setups with one command. Claude Code, Cursor, and Codex. |
| [cbailes/awesome-deep-trading](https://github.com/cbailes/awesome-deep-trading) | — | List of awesome resources for machine learning-based algorithmic trading |
| [CHACCHAN/cit-gpu](https://github.com/CHACCHAN/cit-gpu) | Python | — |
| [ChromeDevTools/chrome-devtools-mcp](https://github.com/ChromeDevTools/chrome-devtools-mcp) | TypeScript | Chrome DevTools for coding agents |
| [cloudflare/agentic-inbox](https://github.com/cloudflare/agentic-inbox) | TypeScript | A self-hosted email client with an AI agent, running entirely on Cloudflare Workers |
| [colbymchenry/codegraph](https://github.com/colbymchenry/codegraph) | TypeScript | Pre-indexed code knowledge graph, auto syncs on code changes — fewer tokens, 100% local |
| [crewAIInc/crewAI](https://github.com/crewAIInc/crewAI) | Python | Framework for orchestrating role-playing, autonomous AI agents. |
| [d-kimuson/claude-code-viewer](https://github.com/d-kimuson/claude-code-viewer) | TypeScript | A full-featured web-based Claude Code client |
| [deepseek-ai/DeepSeek-OCR](https://github.com/deepseek-ai/DeepSeek-OCR) | Python | Contexts Optical Compression |
| [dezem/SAK](https://github.com/dezem/SAK) | — | Switch Army Knife (SAK) |
| [dnobori/DN_SuperBook_PDF_Converter](https://github.com/dnobori/DN_SuperBook_PDF_Converter) | C# | スキャン書籍 PDF を高品質化する AI ツール |
| [docling-project/docling](https://github.com/docling-project/docling) | Python | Get your documents ready for gen AI |
| [edinetdb/dexter-jp](https://github.com/edinetdb/dexter-jp) | TypeScript | 日本株の自律型リサーチ AI エージェント（EDINET DB + J-Quants） |
| [Egonex-AI/Understand-Anything](https://github.com/Egonex-AI/Understand-Anything) | TypeScript | Turn any code into an interactive knowledge graph. Works with Claude Code, Codex, Cursor… |
| [elder-plinius/CL4R1T4S](https://github.com/elder-plinius/CL4R1T4S) | — | Leaked system prompts for ChatGPT, Claude, Gemini, Grok, etc. |
| [enunun/introductiontostatistics](https://github.com/enunun/introductiontostatistics) | Typst | — |
| [eyaltoledano/claude-task-master](https://github.com/eyaltoledano/claude-task-master) | JavaScript | An AI-powered task-management system you can drop into Cursor, Lovable, Windsurf, Roo, and others. |
| [FareedKhan-dev/train-llm-from-scratch](https://github.com/FareedKhan-dev/train-llm-from-scratch) | Python | A straightforward method for training your LLM, from data to text. |
| [Fincept-Corporation/FinceptTerminal](https://github.com/Fincept-Corporation/FinceptTerminal) | C++ | Modern finance application with advanced market analytics and research tools. |
| [freecodexyz/free-code](https://github.com/freecodexyz/free-code) | TypeScript | The free build of Claude Code. Telemetry removed, guardrails stripped. ⚠️ |
| [Gitlawb/openclaude](https://github.com/Gitlawb/openclaude) | TypeScript | runs anywhere. uses anything |
| [google-gemini/gemini-cli](https://github.com/google-gemini/gemini-cli) | TypeScript | An open-source AI agent that brings Gemini into your terminal. |
| [google/magika](https://github.com/google/magika) | Python | Fast and accurate AI powered file content types detection |
| [gsi-cyberjapan/optimal_bvmap](https://github.com/gsi-cyberjapan/optimal_bvmap) | JavaScript | 国土地理院最適化ベクトルタイル |
| [halkichi0308/GuardExt](https://github.com/halkichi0308/GuardExt) | JavaScript | Chrome extension to detect malicious Chrome extensions. |
| [hangwin/mcp-chrome](https://github.com/hangwin/mcp-chrome) | TypeScript | Chrome extension-based MCP server exposing browser functionality to AI assistants. |
| [hardikpandya/stop-slop](https://github.com/hardikpandya/stop-slop) | — | A skill file for removing AI tells from prose |
| [harry0703/MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo) | Python | 利用AI大模型，一键生成高清短视频 / Generate short videos with one click. |
| [heygen-com/hyperframes](https://github.com/heygen-com/hyperframes) | TypeScript | Write HTML. Render video. Built for agents. |
| [HKUDS/AI-Trader](https://github.com/HKUDS/AI-Trader) | Python | AI-Trader: 100% Fully-Automated Agent-Native Trading |
| [HKUDS/CLI-Anything](https://github.com/HKUDS/CLI-Anything) | Python | CLI-Anything: Making ALL Software Agent-Native |
| [HKUDS/DeepTutor](https://github.com/HKUDS/DeepTutor) | Python | DeepTutor: Agent-native Personalized Tutoring |
| [Imbad0202/academic-research-skills](https://github.com/Imbad0202/academic-research-skills) | Python | Academic Research Skills for Claude Code: research → write → review → revise → finalize |
| [jaakkopasanen/AutoEq](https://github.com/jaakkopasanen/AutoEq) | Python | Automatic headphone equalization from frequency responses |
| [jbiaojerry/ebook-treasure-chest](https://github.com/jbiaojerry/ebook-treasure-chest) | Python | 电子书下载宝库（各読書アプリの電子書籍リンク集） |
| [JerBouma/FinanceDatabase](https://github.com/JerBouma/FinanceDatabase) | Python | A database of 300.000+ symbols (Equities, ETFs, Funds, Indices, etc.) |
| [julesontheroad/XCI_Builder](https://github.com/julesontheroad/XCI_Builder) | Batchfile | Convert Nintendo Switch nsp files to xci files |
| [K-Dense-AI/scientific-agent-skills](https://github.com/K-Dense-AI/scientific-agent-skills) | Python | The #1 Agent Skills library for science. 140 skills + 100+ scientific databases. |
| [kakur41/CTFd-AI-Buddy](https://github.com/kakur41/CTFd-AI-Buddy) | Python | — |
| [kazukinagata/shinkoku](https://github.com/kazukinagata/shinkoku) | Python | 確定申告自動化 AI エージェントプラグイン — 帳簿管理から e-Tax 入力代行まで |
| [kepano/defuddle](https://github.com/kepano/defuddle) | TypeScript | Get the main content of any page as Markdown. |
| [kepano/obsidian-skills](https://github.com/kepano/obsidian-skills) | — | Agent skills for Obsidian. |
| [langchain-ai/langgraph](https://github.com/langchain-ai/langgraph) | Python | Build resilient agents. |
| [legendsayantan/ShizuTools](https://github.com/legendsayantan/ShizuTools) | Kotlin | Tools to control android system via shizuku. |
| [Leonxlnx/agentic-ai-prompt-research](https://github.com/Leonxlnx/agentic-ai-prompt-research) | — | Research into how agentic AI coding assistants work. Prompt patterns, agent coordination. |
| [Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill) | JavaScript | Taste-Skill - gives your AI good taste. |
| [lishix520/academic-paper-skills](https://github.com/lishix520/academic-paper-skills) | Python | Framework for planning and writing academic papers using Claude Code. |
| [lrsjng/h5ai](https://github.com/lrsjng/h5ai) | JavaScript | HTTP web server index for Apache httpd, lighttpd and nginx. |
| [m-shintaro/apple-music-obs-overlay](https://github.com/m-shintaro/apple-music-obs-overlay) | Python | A now-playing overlay for OBS (Apple Music, Spotify, YouTube). |
| [maplibre/maplibre-gl-js](https://github.com/maplibre/maplibre-gl-js) | TypeScript | MapLibre GL JS - Interactive vector tile maps in the browser |
| [matsuikentaro1/humanizer_academic](https://github.com/matsuikentaro1/humanizer_academic) | — | A Claude Code skill that removes signs of AI-generated writing from academic papers. |
| [microsoft/generative-ai-for-beginners](https://github.com/microsoft/generative-ai-for-beginners) | Jupyter Notebook | 21 Lessons, Get Started Building with Generative AI |
| [microsoft/markitdown](https://github.com/microsoft/markitdown) | Python | Python tool for converting files and office documents to Markdown. |
| [microsoft/VibeVoice](https://github.com/microsoft/VibeVoice) | Python | Open-Source Frontier Voice AI |
| [microsoft/work-iq](https://github.com/microsoft/work-iq) | PowerShell | MCP Server and CLI for accessing Work IQ |
| [midudev/autoskills](https://github.com/midudev/autoskills) | Ruby | One command. Your entire AI skill stack. Installed. |
| [millionco/react-doctor](https://github.com/millionco/react-doctor) | TypeScript | Your agent writes bad React. This catches it |
| [mtripg6666tdr/Discord-SimpleMusicBot](https://github.com/mtripg6666tdr/Discord-SimpleMusicBot) | TypeScript | データベース不要の Discord 音楽 Bot |
| [multica-ai/andrej-karpathy-skills](https://github.com/multica-ai/andrej-karpathy-skills) | — | A single CLAUDE.md file to improve Claude Code behavior (Karpathy's pitfalls). |
| [n8n-io/n8n](https://github.com/n8n-io/n8n) | TypeScript | Fair-code workflow automation platform with native AI capabilities. |
| [nalltama/RAIV](https://github.com/nalltama/RAIV) | Python | Realtime AI Image Viewer - AI upscaling image viewer for Windows |
| [NangoHQ/nango](https://github.com/NangoHQ/nango) | TypeScript | Build product integrations with AI. |
| [naoterumaker/japan-gyousei-data](https://github.com/naoterumaker/japan-gyousei-data) | Shell | 日本の行政オープンデータにアクセスする OpenClaw スキル |
| [nilaoda/N_m3u8DL-RE](https://github.com/nilaoda/N_m3u8DL-RE) | C# | Cross-Platform stream downloader for MPD/M3U8/ISM. |
| [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) | Python | The agent that grows with you |
| [NVlabs/Sana](https://github.com/NVlabs/Sana) | Python | Efficient High-Resolution Image Synthesis with Linear Diffusion Transformer |
| [obra/superpowers](https://github.com/obra/superpowers) | Shell | An agentic skills framework & software development methodology that works. |
| [openai/codex-plugin-cc](https://github.com/openai/codex-plugin-cc) | JavaScript | Use Codex from Claude Code to review code or delegate tasks. |
| [openai/skills](https://github.com/openai/skills) | Python | Skills Catalog for Codex |
| [OpenBMB/VoxCPM](https://github.com/OpenBMB/VoxCPM) | Python | Tokenizer-Free TTS for Multilingual Speech Generation |
| [opendataloader-project/opendataloader-pdf](https://github.com/opendataloader-project/opendataloader-pdf) | Java | PDF Parser for AI-ready data. |
| [OpenHands/OpenHands](https://github.com/OpenHands/OpenHands) | Python | OpenHands: AI-Driven Development |
| [OpenWonderLabs/switchbot-openapi-cli](https://github.com/OpenWonderLabs/switchbot-openapi-cli) | TypeScript | Command-line interface for the SwitchBot API v1.1 |
| [pear-devs/pear-desktop](https://github.com/pear-devs/pear-desktop) | TypeScript | Pear is an extension for music player |
| [punkpeye/awesome-mcp-servers](https://github.com/punkpeye/awesome-mcp-servers) | — | A collection of MCP servers. |
| [reconurge/flowsint](https://github.com/reconurge/flowsint) | TypeScript | A platform for visual graph-based investigations (cybersecurity / OSINT). |
| [rtk-ai/rtk](https://github.com/rtk-ai/rtk) | Rust | CLI proxy that reduces LLM token consumption by 60-90% on common dev commands. |
| [SakanaAI/AI-Scientist](https://github.com/SakanaAI/AI-Scientist) | Jupyter Notebook | Towards Fully Automated Open-Ended Scientific Discovery |
| [Satsuoni/DeDRM_tools](https://github.com/Satsuoni/DeDRM_tools) | Python | DeDRM tools for ebooks |
| [Shubhamsaboo/awesome-llm-apps](https://github.com/Shubhamsaboo/awesome-llm-apps) | Python | 100+ AI Agent & RAG apps you can actually run. |
| [SoraKumo001/satoru](https://github.com/SoraKumo001/satoru) | C++ | — |
| [sorasen2020/SwitchControllerESP32](https://github.com/sorasen2020/SwitchControllerESP32) | C++ | Library for control Nintendo Switch with ESP32-S3-DevkitC-1 |
| [spotiflacapp/SpotiFLAC-Mobile](https://github.com/spotiflacapp/SpotiFLAC-Mobile) | Dart | Mobile music utility built with Flutter and Go. |
| [StarTrail-org/LEANN](https://github.com/StarTrail-org/LEANN) | Python | RAG on Everything with LEANN. 97% storage savings, 100% private. |
| [TauricResearch/TradingAgents](https://github.com/TauricResearch/TradingAgents) | Python | Multi-Agents LLM Financial Trading Framework |
| [teng-lin/notebooklm-py](https://github.com/teng-lin/notebooklm-py) | Python | Unofficial Python API and agentic skill for Google NotebookLM. |
| [termux/termux-app](https://github.com/termux/termux-app) | Java | Termux - a terminal emulator application for Android OS. |
| [tradesdontlie/tradingview-mcp](https://github.com/tradesdontlie/tradingview-mcp) | JavaScript | AI-assisted TradingView chart analysis — connect Claude Code to TradingView Desktop. |
| [ultraworkers/claw-code](https://github.com/ultraworkers/claw-code) | Rust | An agent-managed museum exhibit, maintained with no human intervention. |
| [UnknownSekai/GridlessSekai-Retro](https://github.com/UnknownSekai/GridlessSekai-Retro) | — | A fully offline archive of a mobile rhythm game's JP server (v2.8.0). |
| [viperrcrypto/Siftly](https://github.com/viperrcrypto/Siftly) | TypeScript | Local Twitter/X bookmark organizer with AI categorization and mindmap. |
| [virattt/dexter](https://github.com/virattt/dexter) | TypeScript | An autonomous agent for deep financial research |
| [WordPress/agent-skills](https://github.com/WordPress/agent-skills) | JavaScript | Expert-level WordPress knowledge for AI coding assistants. |
| [x1xhlol/better-clawd](https://github.com/x1xhlol/better-clawd) | TypeScript | Claude Code, but better: performance, OpenAI/OpenRouter support, no telemetry. |
| [x1xhlol/system-prompts-and-models-of-ai-tools](https://github.com/x1xhlol/system-prompts-and-models-of-ai-tools) | — | System prompts, internal tools & AI models of many AI tools. |
| [xiyin137/QFT](https://github.com/xiyin137/QFT) | TeX | — |
| [xyTom/snippai](https://github.com/xyTom/snippai) | TypeScript | Snip Anything Solve Everything |
| [yaneurao/YaneuraOu](https://github.com/yaneurao/YaneuraOu) | C++ | The World's Strongest Shogi engine (AI player). |
| [YouMind-OpenLab/awesome-nano-banana-pro-prompts](https://github.com/YouMind-OpenLab/awesome-nano-banana-pro-prompts) | TypeScript | World's largest Nano Banana Pro prompt library (Gemini image generation). |
| [yuru7/udev-gothic](https://github.com/yuru7/udev-gothic) | Python | UDEV Gothic — プログラミング向け日本語フォント（BIZ UD + JetBrains Mono）。 |
| [yvgude/lean-ctx](https://github.com/yvgude/lean-ctx) | Rust | LeanCTX — context intelligence layer for AI agents. 76 MCP tools, 30+ agents. |
| [zai-org/Open-AutoGLM](https://github.com/zai-org/Open-AutoGLM) | Python | An Open Phone Agent Model & Framework. |
| [zellij-org/zellij](https://github.com/zellij-org/zellij) | Rust | A terminal workspace with batteries included |
| [zinja-coder/jadx-mcp-server](https://github.com/zinja-coder/jadx-mcp-server) | Python | MCP server for JADX-AI Plugin |
| [zk-tokyo/core-program-2025](https://github.com/zk-tokyo/core-program-2025) | Assembly | 2025 core program |
</content>
