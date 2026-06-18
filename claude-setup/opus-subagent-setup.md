# Opus 4.8 にサブエージェントを上手く起動させる設定ガイド

> 目的: 「Fable 5 はサブエージェントの起動（並列・委譲）が上手かった。Opus 4.8 でも同じようにしたい」を、
> Claude Code の設定 + ユーザーの GitHub スター内の資産で実現する。
> 各リポジトリは実際に中身を読み込んで評価済み（出典は末尾）。

---

## 0. 前提（なぜ「設定」で変わるのか）

実調査で確認した事実:

- サブエージェント起動は **Claude Code ハーネスの機能**（Task/Agent ツール）。**システムプロンプトはモデル間で共通**で、Opus だけ subagent 命令が弱いわけではない。
- 公開されている Fable 5 等のシステムプロンプトには**サブエージェントに関する記述は一切ない**（あれは claude.ai チャット向け）。つまり「Fable 5 が上手い」差は主に**モデルの判断力**。
- 設定で変えられるのは判断そのものではなく、**判断の前提**＝次の3つ:
  1. **起動先の良いサブエージェント/スキルが存在すること**（無ければ起動しようがない）
  2. **CLAUDE.md の委譲ポリシー**（「いつ・どう委譲するか」を明文化）
  3. **effort レベル**（`/effort high` で複雑な委譲判断を促進）

この3つを、なるべくスター内の既存資産で固める。

> ⚠️ 環境前提: `/plugin`・`~/.claude/`・`CLAUDE.md` は **Claude Code（CLI / デスクトップ / IDE 拡張）** の機能。
> claude.ai のチャット UI 単体には無い。web セッションのコンテナは ephemeral なので、`~/.claude/` 配下は
> セッションをまたいで消えうる（→ §6 の永続化を参照）。

---

## 1. クイックスタート（最小・推奨構成）

### ① superpowers を入れる（本命・5/5）
`obra/superpowers` は `dispatching-parallel-agents`（**1応答内に複数 dispatch＝並列起動**）と
`subagent-driven-development`（タスクごとに新規サブエージェント＋レビュー）を実装。MIT、テレメトリは opt-out 可。

```text
# 公式マーケットプレイス経由（最短）
/plugin install superpowers@claude-plugins-official

# もしくは独自マーケットプレイス経由
/plugin marketplace add obra/superpowers-marketplace
/plugin install superpowers@superpowers-marketplace
```
（任意）テレメトリ無効化: 環境変数 `SUPERPOWERS_DISABLE_TELEMETRY=1`

### ② CLAUDE.md に委譲ポリシーを書く（§3 を貼り付け）

### ③ effort を上げる
```text
/effort high
```

これだけで「独立作業を並列でサブエージェントに投げる」挙動がかなり出やすくなる。

---

## 2. 公式プラグインで専門サブエージェントを足す（4/5）

`anthropics/claude-plugins-official` の **`feature-dev`** は
`code-explorer` / `code-architect` / `code-reviewer` の専門サブエージェントを同梱（探索→設計→レビューを委譲）。

```text
/plugin marketplace add anthropics/claude-plugins-official
/plugin install feature-dev@claude-plugins-official
/plugin install pr-review-toolkit@claude-plugins-official
```

> Agent Skills（`anthropics/skills`）自体は既定では単一エージェント拡張だが、
> スキルの frontmatter に **`context: fork`** + **`agent:`** を付けると Task ツール相当の
> サブエージェントとして隔離実行できる（公式仕様）。自作する場合の土台になる（§4）。

---

## 3. 貼り付け用：CLAUDE.md 委譲ポリシー

`~/.claude/CLAUDE.md`（全プロジェクト）またはプロジェクト直下の `CLAUDE.md` に追記。

```markdown
## サブエージェント委譲ポリシー (Claude Code)

独立した作業は積極的にサブエージェント(Agent/Task ツール)へ委譲し、可能なら並列で起動する。

- **並列起動**: 互いに依存しない調査・実装は、*1つの応答の中で複数の Agent 呼び出し*を出して
  同時に走らせる（1応答に1呼び出しだと逐次になる）。
- **委譲する場面**: 大量出力を伴う調査 / 複数ファイルにまたがる探索 / 独立した複数サブシステムの
  調査 / メインのコンテキストを汚さず別系統を進めたいとき。
- **委譲しない場面**: タスク同士が密結合で共有状態の理解が要るとき、失敗が連鎖するとき。
  この場合は並列より逐次のほうが安全。
- **統合は自分で**: サブエージェントの結果は自分で読んで統合する。「調査結果に基づいて〜」と
  理解ごと丸投げしない。
- **起動先の選び方**: 読み取り中心の探索は `Explore`、計画は `Plan`、実装・多段作業は
  `general-purpose`。専門タスクは定義済みのカスタムエージェントを優先。
- **受け渡し**: 成果物はファイル経由で渡し、コンテキスト肥大を防ぐ。
- **継続実行**: 独立タスクが揃ったら、逐一確認を挟まず計画を最後まで実行する
  （ただし破壊的・不可逆な操作は確認する）。
```

> この方針は superpowers の並列ディスパッチ設計と一般的な Claude Code の挙動（複数ツール呼び出しの並列実行）
> に基づき、当方で書き起こしたもの（特定リポジトリからの転載ではない）。

---

## 4. 独自サブエージェント / fork スキルを定義する

「起動先」を増やすほど Opus は委譲しやすくなる。`description` に **"use proactively"** を入れると自動起動が促される。

### カスタムサブエージェント: `~/.claude/agents/deep-researcher.md`
```markdown
---
name: deep-researcher
description: >-
  Use PROACTIVELY for codebase exploration, multi-file investigation, and
  gathering context before implementation. Spawn several in parallel for
  independent areas.
tools: Read, Grep, Glob, WebFetch
model: inherit
---
You are a focused research subagent. Investigate only the assigned area,
read the minimum necessary, and return a concise findings report with exact
`file:line` references. Do not modify files.
```

### fork スキル（スキル自体をサブエージェント化）: `~/.claude/skills/parallel-explore/SKILL.md`
```markdown
---
name: parallel-explore
description: Run an isolated read-only investigation as a forked subagent.
context: fork
agent: Explore
---
Investigate the requested topic in isolation and return only the conclusion
with file:line references. To fan out, the main agent issues multiple
invocations in a single response so they run in parallel.
```

---

## 5. さらに足せるスター内資産（任意）

| リポジトリ | 入れ方 | 何が増えるか / 注意 |
|---|---|---|
| [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills) | `/plugin marketplace add addyosmani/agent-skills` → `/plugin install agent-skills@addy-agent-skills` | **agents/（4 専門ペルソナ）**＋実務スキル＋slash コマンド。良質 |
| [caliber-ai-org/ai-setup](https://github.com/caliber-ai-org/ai-setup) | `caliber bootstrap`（→ `/setup-caliber`）または `caliber init` | skills/MCP/config を**複数リポ・マシンで同期**。→ §6 の永続化に有効 |
| [midudev/autoskills](https://github.com/midudev/autoskills) | `npx autoskills` | プロジェクトを走査し必要スキルを自動導入。SHA-256 マニフェスト検証つきで比較的安全 |
| [openai/codex-plugin-cc](https://github.com/openai/codex-plugin-cc) | `/plugin marketplace add openai/codex-plugin-cc` → `/plugin install codex@openai-codex` → `/codex:setup` | **Codex への外部委譲**（`/codex:rescue` 等）。Apache-2.0。⚠️ コードが OpenAI に送信される／review gate は課金ループ注意（既定 off のまま監視下で） |
| [affaan-m/ECC](https://github.com/affaan-m/ECC) | `/plugin install` か `npx ecc-install --profile full`（**どちらか片方のみ**） | harness 一式（rules/agents/skills/hooks）。hooks で runtime 強制＝**重量級**。⚠️ ライセンス・hooks 挙動を導入前に要確認。インストール経路の二重適用に注意 |
| [Leonxlnx/agentic-ai-prompt-research](https://github.com/Leonxlnx/agentic-ai-prompt-research) | 読むだけ | coordinator プロンプト設計の**着想源**（並列ワーカー／continue vs spawn 等）。⚠️ **無ライセンス＝文言の転載不可** |

> ❌ 非推奨: `freecodexyz/free-code`（guardrail 除去ビルド）はリスクが高く、本目的には不要。

---

## 6. 永続化（重要）

web セッションのコンテナは ephemeral で `~/.claude/` は消えうる。恒久化の選択肢:

1. **自分のローカル PC の `~/.claude/`** に置く（最も確実・全プロジェクトで有効）。
2. **リポジトリにコミット**（プロジェクト直下 `CLAUDE.md` / `.claude/agents/` / `.claude/skills/`）→
   その repo の web セッションで毎回ロードされ永続。
3. **caliber-ai-org/ai-setup** で複数リポ・マシンに設定を同期（②の自動化）。

---

## 7. 動作確認

- `/agents` で利用可能なサブエージェント一覧（superpowers/feature-dev/自作分）が出るか確認。
- 並列起動を促すプロンプト例:
  > 「認証まわり・DB 層・API 層を、それぞれ別のサブエージェントで**並列に**調査して」
- 期待挙動: 1つの応答で複数の Agent 呼び出しが同時に走り、結果をメインが統合する。

---

## まとめ（最短ルート）

1. `/plugin install superpowers@claude-plugins-official`
2. `/plugin install feature-dev@claude-plugins-official`
3. `~/.claude/CLAUDE.md` に §3 の委譲ポリシーを貼る
4. `/effort high`
5. （任意）`~/.claude/agents/` に専門サブエージェントを追加、`caliber` で永続同期

---

## 出典（実読・2026-06-18）
- obra/superpowers — README, `skills/dispatching-parallel-agents/SKILL.md`, `skills/subagent-driven-development/SKILL.md`
- anthropics/skills, anthropics/claude-plugins-official（`plugins/feature-dev/agents/`）, code.claude.com/docs/en/skills・sub-agents
- addyosmani/agent-skills, caliber-ai-org/ai-setup, midudev/autoskills, affaan-m/ECC（各 README）
- openai/codex-plugin-cc（README, Apache-2.0）
- Leonxlnx/agentic-ai-prompt-research（`prompts/05_coordinator_system_prompt.md` 他, 無ライセンス）
- multica-ai/andrej-karpathy-skills（CLAUDE.md。慎重志向のため本目的には不採用）
</content>
