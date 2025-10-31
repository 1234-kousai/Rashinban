# 🎯 Rashinban-HP スマホ対応 完全実装ガイド v2.1（改訂版）

## 📊 プロジェクト概要

```
プロジェクト名: 羅針盤HP モバイル対応
現状: デスクトップ特化（1440px）完璧なレイアウト
目標: 全デバイス対応（iPhone SE 375px〜）
最重要: デスクトップ版を一切変更しない
技術スタック: Next.js 15 + React 19 + TypeScript + Tailwind CSS + Framer Motion
期間: 18-22営業日（フルタイム想定）← 【修正】楽観的な見積もりを是正
難易度: ★★★★★（高）
リスク: 🔴 高（デスクトップへの影響大、慎重な実装必須）
```

## ⚠️ 【重要】改訂履歴と反省点

### v2.1 (2025-10-31) - 精査後の改訂

**主な変更点:**
1. **工数見積もりの修正**: 12-15日 → 18-22日
2. **Phase 0の重要性強調**: 警告セクション追加
3. **コード重複の明示**: block/hidden戦略のトレードオフ説明
4. **リスク評価の追加**: 各Phaseにリスクレベル明記
5. **xl範囲の扱い明確化**: 1280-1439pxの方針を追加

**精査で判明した問題点:**
- ❌ Phase 4, 6の工数が過小評価（2日 → 実際3-5日必要）
- ❌ コード重複によるメンテナンス性低下の説明不足
- ❌ Phase 0を忘れると全て台無しになる警告不足
- ❌ xl範囲（1280-1439px）でモバイルレイアウトになる問題未言及

### 現状分析

```typescript
ファイル構成:
├── app/page.tsx          830行 - メインページ
├── app/layout.tsx        19行 - ルートレイアウト
├── app/globals.css       22行 - グローバルスタイル
├── components/ui/Button.tsx  35行 - ボタンコンポーネント
└── public/assets/        45ファイル - 画像・SVG

問題点:
✗ 固定px値: 180+箇所
✗ min-w-[1440px]: 2箇所（完全にモバイルブレイク）
✗ 絶対配置（absolute）: 40+箇所
✗ 固定width/height: 60+箇所
✗ レスポンシブクラス: 0箇所
✗ モバイルメニュー: なし
✗ 画像最適化: デスクトップサイズのみ
```

### 修正箇所サマリー

```
固定px値: 180+箇所
min-w-[1440px]: 2箇所 → 削除 + コンテナ再設計
絶対配置: 40+箇所 → モバイルで相対配置に変更
レスポンシブクラス: 0箇所 → 500+箇所追加
新規実装: ハンバーガーメニュー（モバイルナビ）
Framer Motion調整: 全アニメーション
```

---

## 🛡️ デスクトップ保持戦略（最重要）

### 🚨 Phase 0 絶対厳守事項

**⚠️ 警告: Phase 0を完了せずに他のPhaseに進むと全てが台無しになります！**

```
Phase 0の重要性: ★★★★★（最重要）
所要時間: 0.5-1日
失敗時の影響: 🔴 致命的（1440-1535pxでデスクトップデザイン崩壊）

必須作業:
1. tailwind.config.tsに screens: { '2xl': '1440px' } を追加
2. npm run devで1440px以上の表示確認
3. 1440px、1500px、1920pxの3サイズで確認
4. Gitコミット後、次のPhaseへ進む

⚠️ この設定がないと:
- 1440-1535px: デスクトップデザインが崩れる
- 1536px以上: 2xl:クラスが適用される（意図通り）
→ 結果: 既存デザイン保持に失敗
```

### 基本方針

**絶対に守るルール:**
1. **Phase 0を最優先で完了する（他のPhaseより重要）**
2. **1440px以上のデザインは一切変更しない**
3. **2xl:プレフィックスで既存スタイルを保護（重要！）**
4. **モバイルスタイルは小さい画面用のクラスとして追加**
5. **デスクトップで動作確認を毎回実施（1440px、1920px）**

### Tailwind ブレークポイント戦略

```css
/* Tailwindのデフォルトブレークポイント */
デフォルト:   0px - 639px    /* モバイル */
sm:        640px - 767px   /* 大きいモバイル */
md:        768px - 1023px  /* タブレット */
lg:       1024px - 1279px  /* 小さいデスクトップ */
xl:       1280px - 1535px  /* デスクトップ */
2xl:      1536px+          /* ワイドデスクトップ（デフォルト） */

/* ⚠️ 重要：このプロジェクトでは2xl:を1440pxにカスタマイズ必須！ */
/* Phase 0でtailwind.config.tsに以下を追加: */
theme: {
  extend: {
    screens: {
      '2xl': '1440px', // ← 既存デザインが1440pxなので明示的に設定
    }
  }
}

/* カスタマイズ後のブレークポイント（実装に使用） */
デフォルト:   0px - 639px    /* モバイル */
sm:        640px - 767px   /* 大きいモバイル */
md:        768px - 1023px  /* タブレット */
lg:       1024px - 1279px  /* 小さいデスクトップ */
xl:       1280px - 1439px  /* デスクトップ */
2xl:      1440px+          /* ワイドデスクトップ（既存デザイン保持）*/

/* 実装方針 */
既存: w-[902px]
修正: w-full md:w-[600px] lg:w-[750px] xl:w-[850px] 2xl:w-[902px]
理由: 2xl:で既存デザイン完全保持
```

### 修正パターン例

#### ❌ 間違った修正（デスクトップが変わる）

```tsx
// BEFORE
<div className="max-w-[1440px] mx-auto px-28">

// BAD - デスクトップの余白が変わる可能性
<div className="max-w-[1440px] mx-auto px-4 lg:px-28">
```

#### ✅ 正しい修正（デスクトップ完全保持）

```tsx
// BEFORE
<div className="max-w-[1440px] mx-auto px-28">

// GOOD - 1440px以上では完全に同じ
<div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-20 xl:px-24 2xl:px-28">
```

#### 固定幅の修正パターン

```tsx
// BEFORE - 固定幅
<div className="w-[902px] h-[669px]">

// GOOD - レスポンシブだがデスクトップ保持
<div className="w-full md:w-[600px] lg:w-[750px] xl:w-[850px] 2xl:w-[902px]
                h-auto md:h-[450px] lg:h-[550px] xl:h-[620px] 2xl:h-[669px]">
```

#### 絶対配置の修正パターン

```tsx
// BEFORE - 絶対配置（モバイルで崩れる）
<div className="absolute left-[120px] top-0 w-[902px]">

// GOOD - モバイルは相対配置、デスクトップは絶対配置保持
<div className="relative md:relative lg:relative xl:absolute 2xl:absolute
                left-0 xl:left-[100px] 2xl:left-[120px]
                top-0 w-full md:w-[600px] lg:w-[750px] xl:w-[850px] 2xl:w-[902px]">
```

---

## 🗺️ ブレークポイント設計

```css
/* デバイス別ターゲット */
Mobile-S:  320px - 374px  /* iPhone 5/SE (旧) */
Mobile-M:  375px - 424px  /* iPhone SE (新), iPhone 12/13/14, iPhone X/XS */
Mobile-L:  425px - 639px  /* iPhone 14 Pro Max, Galaxy S20+ */
Tablet-S:  640px - 767px  /* iPad Mini 縦 */
Tablet-M:  768px - 1023px /* iPad 縦/横, Android Tablet */
Laptop:   1024px - 1279px /* 小型ノートPC */
Desktop:  1280px - 1439px /* デスクトップ */
Wide:     1440px+         /* 現行デザイン完全保持 */

/* Tailwindマッピング（2xl:を1440pxにカスタマイズ後） */
Base:      〜639px        デフォルト（モバイル優先）
sm:       640px+          大きいモバイル・小タブレット
md:       768px+          タブレット
lg:      1024px+          小型デスクトップ
xl:      1280px+          デスクトップ
2xl:     1440px+          ワイド（既存デザイン） ← カスタマイズ必須
```

---

## 📋 全セクション詳細分析

### Section 1: Hero（ナビ + スライドショー）

**現状:**
- ナビ: 固定配置 `right-28`, `left-28`, `top-[30px]`
- メニューリンク: `gap-[50px]`, `text-lg`
- ロゴ: `width={48} height={48}` (w-12 h-12相当), 2行レイアウト
- タイトル: `text-[72px]`, `w-[556px]`
- 背景: スライドショー（3秒自動切替）
- 高さ: `h-screen`

**問題点:**
```tsx
1. ナビリンクが横並び → モバイルで収まらない
2. ロゴサイズ固定 → モバイルで大きすぎ
3. タイトル text-[72px] → モバイルで巨大
4. 絶対配置 left-28, right-28 → 画面外
5. モバイルメニューなし
```

**修正方針:**
```tsx
ナビ:
- デスクトップ: 既存レイアウト完全保持（2xl:）
- モバイル: ハンバーガーメニュー実装
- ロゴ: レスポンシブ化（w-8 sm:w-10 md:w-12 2xl:維持）
  実際のImageコンポーネント: className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12"

タイトル:
- text-3xl sm:text-4xl md:text-5xl lg:text-6xl 2xl:text-[72px]
- w-full px-4 sm:w-[400px] md:w-[480px] 2xl:w-[556px]

スライドショー:
- 背景画像のみモバイル最適化（画像は変更しない）
```

**実装優先度:** 🔴 最高（ファーストビュー）

---

### Section 2: Our Reputation（3カード）

**現状:**
- コンテナ: `min-w-[1440px]` ← **致命的**
- カード配置: `flex justify-center gap-[63px]`
- カードサイズ: `w-[292px]`
- 余白: `px-[120px]`, `py-[60px]`

**問題点:**
```tsx
1. min-w-[1440px] → モバイルで横スクロール発生
2. 3カードが横並び → モバイルで窮屈
3. gap-[63px] → モバイルで余白大きすぎ
```

**修正方針:**
```tsx
コンテナ:
- min-w-[1440px] 削除
- max-w-[1440px] mx-auto に変更

レイアウト:
- flex-col md:flex-row （モバイルは縦、タブレット以上は横）
- gap-6 md:gap-10 2xl:gap-[63px]

カード:
- w-full sm:w-[280px] md:w-[260px] lg:w-[280px] 2xl:w-[292px]
- px-4 sm:px-8 md:px-12 2xl:px-[120px]
```

**実装優先度:** 🟠 高

---

### Section 3: About Us（画像 + ブルーボックス重ね）

**現状:**
- コンテナ: `min-w-[1440px]`, `h-[669px]` ← **固定高さ**
- 画像: `absolute left-[120px] top-0 w-[902px] h-[669px]`
- ブルーボックス: `absolute right-[120px] top-[147px] w-[488px] h-[523px]`
- 内部テキスト: 絶対配置 `left-10 top-[50px]`

**問題点:**
```tsx
1. 絶対配置の重なりレイアウト → モバイルで完全崩壊
2. 固定高さ h-[669px] → モバイルでコンテンツ切れる
3. min-w-[1440px] → 横スクロール
```

**修正方針:**
```tsx
レイアウト変更:
- モバイル: 縦並び（画像 → ブルーボックス）
- デスクトップ: 既存の重なりレイアウト保持

構造:
<!-- モバイル: 相対配置 -->
<div className="flex flex-col md:relative">
  <!-- 画像 -->
  <div className="relative md:absolute ...">

  <!-- ブルーボックス -->
  <div className="relative md:absolute ...">
</div>

高さ:
- h-auto md:h-[500px] lg:h-[600px] 2xl:h-[669px]
```

**実装優先度:** 🟠 高（複雑なレイアウト）

---

### Section 4: Services（6カード）

**現状:**
- コンテナ: `h-[608px]` ← **固定高さ**
- カード配置: 絶対配置 2行×3列
  - `absolute left-[calc(8.333%+96px)] top-[122px]`
  - `absolute left-[calc(33.333%+105px)] top-[122px]`
  - など
- カードサイズ: `h-[181px] w-[271px]`

**問題点:**
```tsx
1. 絶対配置のグリッド → モバイルで完全崩壊
2. 固定高さ h-[608px] → モバイルでカード重なる
3. calc()による複雑な配置 → レスポンシブ不可
```

**修正方針:**
```tsx
レイアウト変更:
- モバイル: グリッド 1列
- タブレット: グリッド 2列
- デスクトップ(1440px+): 絶対配置保持

構造:
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:block">
  {/* モバイル: グリッド、デスクトップ: 絶対配置 */}
  <div className="relative 2xl:absolute 2xl:left-[calc(8.333%+96px)] ...">
  ...
</div>

高さ:
- h-auto md:h-[500px] lg:h-[550px] 2xl:h-[608px]
```

**実装優先度:** 🟡 中〜高

---

### Section 5: Stats（統計 + イラスト）

**現状:**
- コンテナ: `h-[723px]` ← **固定高さ**
- 統計ボックス: 絶対配置 4個
  - `absolute left-[calc(25%+32.5px)] top-[221px]`
  - など
- イラスト: 絶対配置 4個
- 右側テキスト: 絶対配置 `right-[496px] translate-x-full`

**問題点:**
```tsx
1. 複雑な絶対配置のアート的レイアウト → モバイル不可能
2. イラストと統計の重なり → モバイルで意味不明
3. 右側テキストの配置 → 画面外
```

**修正方針:**
```tsx
レイアウト大幅変更:
- モバイル: シンプルな縦並び
  1. タイトル「30 Years Experience」
  2. 説明文
  3. 統計ボックス 4個（2×2グリッド）
  4. イラストは非表示またはサイズ縮小

- デスクトップ: 既存のアート的レイアウト完全保持

構造:
<div className="flex flex-col lg:relative">
  <!-- モバイル: 縦並び -->
  <div className="block 2xl:hidden">
    {/* シンプルレイアウト */}
  </div>

  <!-- デスクトップ: 絶対配置保持 -->
  <div className="hidden 2xl:block">
    {/* 既存の絶対配置 */}
  </div>
</div>
```

**実装優先度:** 🔴 最高（最も複雑）

---

### Section 6: Free Consultation（CTAバナー）

**現状:**
- 背景画像: フルサイズ `fill`
- 余白: `px-28`
- テキスト: `text-heading-4`, `text-2xl`
- レイアウト: `flex justify-between`

**問題点:**
```tsx
1. justify-between → モバイルで要素が離れすぎ
2. テキストサイズ大きすぎ
3. px-28 → モバイルで余白大きすぎ
```

**修正方針:**
```tsx
レイアウト:
- flex-col md:flex-row
- items-center md:justify-between
- gap-6 md:gap-0

余白:
- px-4 sm:px-6 md:px-12 lg:px-20 2xl:px-28

テキスト:
- text-2xl md:text-3xl 2xl:text-heading-4
- text-lg md:text-xl 2xl:text-2xl
```

**実装優先度:** 🟢 中

---

### Section 7: Projects（グリッド + フィルター）

**現状:**
- 余白: `px-28`
- フィルター: 縦メニュー（左側）
- グリッド: `grid-cols-2 gap-8`
- ページネーション: ボタン + インジケーター

**問題点:**
```tsx
1. フィルターとグリッドの横並び → モバイルで窮屈
2. grid-cols-2 → モバイルで画像小さすぎ
3. ページネーションボタンが大きすぎ
```

**修正方針:**
```tsx
フィルター:
- モバイル: 横スクロールタブ
- デスクトップ: 縦メニュー保持

グリッド:
- grid-cols-1 md:grid-cols-2
- gap-4 md:gap-6 2xl:gap-8

ページネーション:
- ボタン: w-full md:w-[200px] 2xl:w-[295px]
- flex-col sm:flex-row
```

**実装優先度:** 🟡 中

---

### Section 8: Contact Form

**現状:**
- 余白: `px-[360px]` ← **極端な余白**
- グリッド: `grid-cols-2`

**問題点:**
```tsx
1. px-[360px] → モバイルで完全に不可能
2. grid-cols-2 → モバイルで入力欄小さすぎ
```

**修正方針:**
```tsx
余白:
- px-4 sm:px-8 md:px-16 lg:px-32 xl:px-48 2xl:px-[360px]

グリッド:
- grid-cols-1 md:grid-cols-2

ボタン:
- w-full md:w-1/2 2xl:w-1/3
```

**実装優先度:** 🟢 中

---

### Section 9: Bottom（連絡先 + SNS）

**現状:**
- 余白: `px-28`
- グリッド: `grid-cols-2 gap-[200px]` ← **巨大な余白**

**問題点:**
```tsx
1. gap-[200px] → モバイルで不可能
2. grid-cols-2 → モバイルで窮屈
```

**修正方針:**
```tsx
グリッド:
- grid-cols-1 md:grid-cols-2
- gap-8 md:gap-16 lg:gap-32 2xl:gap-[200px]

余白:
- px-4 sm:px-6 md:px-12 lg:px-20 2xl:px-28
```

**実装優先度:** 🟢 低

---

### Section 10: Footer

**現状:**
- 余白: `px-28`
- 高さ: `h-[70px]`

**問題点:**
```tsx
1. テキストが小さい画面で改行
```

**修正方針:**
```tsx
余白:
- px-4 sm:px-6 md:px-12 2xl:px-28

高さ:
- h-auto py-4 md:h-[70px]

テキスト:
- text-sm md:text-base
```

**実装優先度:** 🟢 低

---

## 📐 実装フェーズ（12フェーズ）改訂版

### ⚠️ フェーズ別リスク評価と工数見積もり

| Phase | セクション | 旧見積 | 新見積 | リスク | 備考 |
|-------|-----------|--------|--------|--------|------|
| **Phase 0** | Tailwind設定 | 0.5日 | 0.5-1日 | 🟢 低 | **最優先・必須** |
| **Phase 1** | Hero Nav+Menu | 2日 | 2-3日 | 🟡 中 | State管理慎重に |
| **Phase 2** | Hero Title | 1.5日 | 1.5-2日 | 🟢 低 | 比較的安全 |
| **Phase 3** | Our Reputation | 1日 | 1-1.5日 | 🟢 低 | 簡単 |
| **Phase 4** | About Us | 2日 | **3-4日** | 🔴 高 | **コード2倍、慎重** |
| **Phase 5** | Services | 1.5日 | 2-3日 | 🟡 中 | グリッド切替 |
| **Phase 6** | Stats | 2日 | **4-5日** | 🔴 最高 | **最難関** |
| **Phase 7** | Free Consultation | 0.5日 | 0.5-1日 | 🟢 低 | 簡単 |
| **Phase 8** | Projects | 1日 | 1-1.5日 | 🟢 低 | 比較的簡単 |
| **Phase 9** | Contact Form | 0.5日 | 0.5-1日 | 🟢 低 | 簡単 |
| **Phase 10** | Bottom | 0.5日 | 0.5-1日 | 🟢 低 | 簡単 |
| **Phase 11** | Footer | 0.5日 | 0.5日 | 🟢 低 | 最も簡単 |
| **テスト・調整** | 全体 | 2日 | **4-5日** | 🟡 中 | 予備日不足 |
| **合計** | - | **12-15日** | **18-22日** | - | **現実的見積** |

### 🎯 推奨実装順序（リスク管理重視）

**第1段階: 基礎固め（必須）**
```
Day 1: Phase 0 ← 絶対最優先
  - Tailwind設定
  - バックアップ
  - 1440px以上確認
```

**第2段階: 簡単なセクションから（成功体験）**
```
Day 2-5: Phase 7, 9, 10, 11, 3 ← リスク低
  - Free Consultation (0.5-1日)
  - Contact Form (0.5-1日)
  - Bottom (0.5-1日)
  - Footer (0.5日)
  - Our Reputation (1-1.5日)
目的: パターン確立、デスクトップ保持の感覚を掴む
```

**第3段階: 中難度セクション**
```
Day 6-11: Phase 1, 2, 8, 5 ← リスク中
  - Phase 1: Hero Nav (2-3日)
  - Phase 2: Hero Title (1.5-2日)
  - Phase 8: Projects (1-1.5日)
  - Phase 5: Services (2-3日)
```

**第4段階: 高難度セクション（慎重に）**
```
Day 12-20: Phase 4, 6 ← リスク最高
  - Phase 4: About Us (3-4日) ← コード完全分離
  - Phase 6: Stats (4-5日) ← 最難関
警告: デスクトップへの影響最大、毎回確認必須
```

**第5段階: テスト・調整**
```
Day 21-22: 全体テスト+バグ修正 (4-5日推奨)
  - 全デバイステスト
  - パフォーマンステスト
  - アクセシビリティ確認
  - 最終調整
```

---

### Phase 0: 環境セットアップ（0.5-1日）🚨 最優先

#### 作業内容

1. **Gitブランチ作成**

```bash
cd /Users/kousaiyamamoto/rashinban-HP
git checkout -b feature/mobile-responsive
git push -u origin feature/mobile-responsive
```

2. **バックアップ作成**

```bash
cp app/page.tsx app/page.tsx.backup
cp tailwind.config.ts tailwind.config.ts.backup
```

3. **Tailwind設定修正（重要！）**

```typescript
// tailwind.config.ts - 2xl:ブレークポイントを1440pxに設定

// BEFORE（既存の設定）
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2947A9",
        secondary: "#F9995D",
        // ... 既存の色設定
      },
      fontFamily: {
        sans: ["Work Sans", "sans-serif"],
      },
      fontSize: {
        // ... 既存のフォントサイズ設定
      },
    },
  },
  plugins: [],
};

// AFTER（screensを追加）
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        '2xl': '1440px', // ← 既存デザイン保持のため追加（デフォルトは1536px）
      },
      colors: {
        primary: "#2947A9",
        secondary: "#F9995D",
        // ... 既存の色設定
      },
      fontFamily: {
        sans: ["Work Sans", "sans-serif"],
      },
      fontSize: {
        // ... 既存のフォントサイズ設定
      },
    },
  },
  plugins: [],
};
export default config;
```

**⚠️ この設定を忘れると、1440px~1535pxでデスクトップデザインが崩れます！**

4. **Tailwind設定変更をコミット**

```bash
git add tailwind.config.ts
git commit -m "feat(Phase 0): Add 2xl breakpoint at 1440px for desktop preservation

- Set 2xl: breakpoint to 1440px (default is 1536px)
- This ensures existing desktop design is preserved

🤖 Generated with Claude Code
Co-Authored-By: Claude <noreply@anthropic.com>"

git push origin feature/mobile-responsive
```

5. **開発サーバー起動**

```bash
npm run dev
# http://localhost:3000 で確認
```

6. **修正箇所リスト作成**

Googleスプレッドシートまたはノーション推奨:

```
セクション | 現在のクラス | 修正後のクラス | 優先度 | 完了
--------|------------|--------------|--------|----
Hero Nav | right-28 | right-4 sm:right-6 ... 2xl:right-28 | 高 | □
Hero Title | text-[72px] | text-3xl ... 2xl:text-[72px] | 高 | □
...
```

#### 成果物

- ✅ 作業ブランチ
- ✅ バックアップファイル
- ✅ **Tailwind設定修正（2xl: 1440px）← 超重要**
- ✅ 修正箇所リスト（スプレッドシート）
- ✅ 開発サーバー動作確認

#### 確認事項

```bash
# ブランチ確認
git branch
# * feature/mobile-responsive

# バックアップ確認
ls -la app/*.backup
# app/page.tsx.backup

# デスクトップ表示確認（1440px以上）
open http://localhost:3000
```

---

### Phase 1: ハンバーガーメニュー実装（2日）

**なぜ最初にメニュー?**
ナビゲーションはすべてのページで使用され、早期実装で全体の雰囲気をつかめる。

#### 1.1 モバイルメニュー用State追加（2時間）

**修正箇所: app/page.tsx:8-9**

```tsx
// BEFORE
import { useState, useEffect, useMemo } from "react";

export default function Home() {
  const heroImages = useMemo(() => [...], []);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

// AFTER
import { useState, useEffect, useMemo } from "react";

export default function Home() {
  // Hero slideshow state
  const heroImages = useMemo(() => [...], []);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Mobile menu state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // モバイルメニュー開閉時のスクロール制御
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);
```

#### 1.2 ナビゲーション レスポンシブ化（4時間）

**修正箇所: app/page.tsx:39-83**

```tsx
// BEFORE
<motion.nav className="absolute top-0 w-full z-20 h-20 bg-black/30 backdrop-blur-sm">
  <div className="max-w-[1440px] mx-auto h-full relative">
    <div className="absolute right-28 top-[30px] flex gap-[50px] text-lg leading-normal">
      <a href="#" className="text-white hover:text-secondary ...">Home</a>
      ...
    </div>
    <div className="absolute left-28 top-[18px] flex items-center gap-3">
      ...
    </div>
  </div>
</motion.nav>

// AFTER
<motion.nav
  initial={{ y: -100, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{ duration: 0.6, ease: "easeOut" }}
  className="absolute top-0 w-full z-20 h-16 sm:h-18 md:h-20 bg-black/30 backdrop-blur-sm"
>
  <div className="max-w-[1440px] mx-auto h-full relative px-4 sm:px-6 md:px-12 lg:px-20 2xl:px-0">

    {/* ロゴ - レスポンシブ */}
    <div className="absolute left-4 sm:left-6 md:left-12 lg:left-20 2xl:left-28
                    top-3 sm:top-4 md:top-[18px]
                    flex items-center gap-2 sm:gap-2.5 md:gap-3">
      <Image
        src="/assets/rashinban-logo.png"
        alt="Rashinban Logo"
        width={40}
        height={40}
        className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12"
      />
      <div className="flex flex-col justify-center leading-none">
        <p className="text-xs sm:text-sm md:text-[15px] font-medium text-white/95 mb-[2px] sm:mb-[3px] tracking-wider drop-shadow-lg"
           style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
          東京大学
        </p>
        <p className="text-lg sm:text-xl md:text-2xl lg:text-[28px] font-bold text-white drop-shadow-lg"
           style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
          羅針盤
        </p>
      </div>
    </div>

    {/* デスクトップメニュー - lg以上で表示 */}
    <div className="hidden lg:flex absolute right-20 xl:right-24 2xl:right-28
                    top-[30px] gap-8 xl:gap-10 2xl:gap-[50px]
                    text-base xl:text-lg leading-normal">
      <a href="#" className="text-white hover:text-secondary transition-colors drop-shadow-lg"
         style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
        Home
      </a>
      <a href="#" className="text-white hover:text-secondary transition-colors drop-shadow-lg"
         style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
        About Us
      </a>
      <a href="#" className="text-white hover:text-secondary transition-colors drop-shadow-lg"
         style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
        Projects
      </a>
      <a href="#" className="text-white hover:text-secondary transition-colors drop-shadow-lg"
         style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
        Services
      </a>
      <a href="https://www.instagram.com/rashinbantodai/"
         target="_blank"
         rel="noopener noreferrer"
         className="font-semibold text-secondary hover:opacity-80 drop-shadow-lg"
         style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
        Contact Us
      </a>
    </div>

    {/* ハンバーガーボタン - モバイル/タブレット */}
    <button
      onClick={() => setIsMobileMenuOpen(true)}
      className="lg:hidden absolute right-4 sm:right-6 md:right-12 top-3 sm:top-4 md:top-5
                 z-30 bg-secondary/90 backdrop-blur-sm p-2 sm:p-2.5 rounded-md
                 hover:bg-secondary transition-colors"
      aria-label="メニューを開く"
    >
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-16 6h16" />
      </svg>
    </button>
  </div>
</motion.nav>
```

#### 1.3 モバイルメニュー本体実装（6時間）

**追加箇所: app/page.tsx:84（navの直後）**

```tsx
{/* モバイルメニュー - フルスクリーンオーバーレイ */}
<motion.div
  initial={{ x: '100%' }}
  animate={{ x: isMobileMenuOpen ? 0 : '100%' }}
  transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
  className="lg:hidden fixed inset-0 bg-white z-50 overflow-y-auto"
>
  {/* ヘッダー */}
  <div className="flex items-center justify-between p-4 sm:p-6 border-b border-neutral-200">
    {/* ロゴ */}
    <div className="flex items-center gap-2.5">
      <Image
        src="/assets/rashinban-logo.png"
        alt="Rashinban Logo"
        width={40}
        height={40}
        className="w-10 h-10"
      />
      <div className="flex flex-col justify-center leading-none">
        <p className="text-sm font-medium text-neutral-800 mb-[2px] tracking-wider">
          東京大学
        </p>
        <p className="text-2xl font-bold text-primary">
          羅針盤
        </p>
      </div>
    </div>

    {/* 閉じるボタン */}
    <button
      onClick={() => setIsMobileMenuOpen(false)}
      className="bg-neutral-800 p-2.5 rounded-md hover:bg-neutral-700 transition-colors"
      aria-label="メニューを閉じる"
    >
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </div>

  {/* メニューリスト */}
  <nav className="flex flex-col p-6 sm:p-8">
    <a
      href="#"
      onClick={() => setIsMobileMenuOpen(false)}
      className="py-4 sm:py-5 text-primary text-lg sm:text-xl font-medium border-b border-neutral-100
                 hover:bg-neutral-50 transition-colors -mx-6 sm:-mx-8 px-6 sm:px-8"
    >
      Home
    </a>
    <a
      href="#"
      onClick={() => setIsMobileMenuOpen(false)}
      className="py-4 sm:py-5 text-primary text-lg sm:text-xl border-b border-neutral-100
                 hover:bg-neutral-50 transition-colors -mx-6 sm:-mx-8 px-6 sm:px-8"
    >
      About Us
    </a>
    <a
      href="#"
      onClick={() => setIsMobileMenuOpen(false)}
      className="py-4 sm:py-5 text-primary text-lg sm:text-xl border-b border-neutral-100
                 hover:bg-neutral-50 transition-colors -mx-6 sm:-mx-8 px-6 sm:px-8"
    >
      Projects
    </a>
    <a
      href="#"
      onClick={() => setIsMobileMenuOpen(false)}
      className="py-4 sm:py-5 text-primary text-lg sm:text-xl border-b border-neutral-100
                 hover:bg-neutral-50 transition-colors -mx-6 sm:-mx-8 px-6 sm:px-8"
    >
      Services
    </a>

    {/* CTAボタン */}
    <a
      href="https://www.instagram.com/rashinbantodai/"
      target="_blank"
      rel="noopener noreferrer"
      className="mt-8 bg-secondary text-white text-center py-4 px-6 rounded-lg font-semibold text-lg
                 hover:bg-secondary/90 transition-colors"
    >
      Contact Us
    </a>
  </nav>
</motion.div>
```

#### Phase 1 完了チェックリスト

```
[ ] モバイルメニューState追加完了
[ ] ナビゲーションレスポンシブ化完了
[ ] ハンバーガーボタン実装完了
[ ] モバイルメニュー本体実装完了
[ ] iPhone SE (375px)で動作確認
[ ] iPad (768px)で動作確認
[ ] デスクトップ (1440px以上)で既存デザイン維持確認 ← 重要
[ ] アニメーションスムーズ確認
[ ] Gitコミット完了
```

#### Git コミット

```bash
git add app/page.tsx
git commit -m "feat(Phase 1): モバイルナビゲーション実装

- ハンバーガーメニュー追加
- レスポンシブナビゲーション
- フルスクリーンモバイルメニュー
- スクロール制御実装
- デスクトップ版完全保持 (1440px+)

テスト済み: iPhone SE, iPad, Desktop 1440px+

🤖 Generated with Claude Code
Co-Authored-By: Claude <noreply@anthropic.com>"

git push origin feature/mobile-responsive
```

---

### Phase 2: Hero タイトル・スライドショー（1.5日）

#### 2.1 Heroタイトル レスポンシブ化（3時間）

**修正箇所: app/page.tsx:116-125**

```tsx
// BEFORE
<div className="max-w-[1440px] mx-auto h-full relative">
  <motion.h1
    initial={{ opacity: 0, x: -50 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
    className="absolute left-[calc(20.833%-188px)] top-[239px] text-[72px] font-semibold leading-normal text-neutral-800 w-[556px]"
  >
    Building things is our mission.
  </motion.h1>
</div>

// AFTER
<div className="max-w-[1440px] mx-auto h-full relative px-4 sm:px-6 md:px-12 lg:px-20 2xl:px-0">
  <motion.h1
    initial={{ opacity: 0, x: -50 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
    className="absolute
               left-4 sm:left-6 md:left-12 lg:left-16 xl:left-20 2xl:left-[calc(20.833%-188px)]
               top-32 sm:top-36 md:top-44 lg:top-52 xl:top-56 2xl:top-[239px]
               text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[64px] 2xl:text-[72px]
               font-semibold leading-tight lg:leading-normal text-neutral-800
               w-[calc(100%-2rem)] sm:w-[380px] md:w-[450px] lg:w-[500px] xl:w-[540px] 2xl:w-[556px]"
  >
    Building things is our mission.
  </motion.h1>
</div>
```

#### 2.2 スライドショー アニメーション調整（2時間）

**⚠️ 注意: 以下のコードはSSR環境でのハイドレーションエラーを避けるため、実際の実装では慎重に行ってください。**

```tsx
// BEFORE - 既存のアニメーション
<AnimatePresence initial={false}>
  <motion.div
    key={currentImageIndex}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1, scale: 1.05 }}
    exit={{ opacity: 0 }}
    transition={{
      opacity: { duration: 1.2, ease: [0.43, 0.13, 0.23, 0.96] },
      scale: { duration: 5, ease: "linear" }
    }}
    className="absolute inset-0"
  >

// OPTION 1: モバイルでもデスクトップと同じアニメーション（推奨）
// → シンプルで安全、Next.jsのSSRで問題なし
<AnimatePresence initial={false}>
  <motion.div
    key={currentImageIndex}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1, scale: 1.05 }}
    exit={{ opacity: 0 }}
    transition={{
      opacity: { duration: 1.2, ease: [0.43, 0.13, 0.23, 0.96] },
      scale: { duration: 5, ease: "linear" }
    }}
    className="absolute inset-0"
  >

// OPTION 2: モバイルで軽量化したい場合（useEffect + useState使用）
// → SSR対応だが少し複雑
// まず、コンポーネント内でstateを追加:
const [isMobile, setIsMobile] = useState(false);

useEffect(() => {
  setIsMobile(window.innerWidth < 768);

  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };

  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);

// アニメーションで使用:
<AnimatePresence initial={false}>
  <motion.div
    key={currentImageIndex}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1, scale: 1.05 }}
    exit={{ opacity: 0 }}
    transition={{
      opacity: {
        duration: isMobile ? 0.8 : 1.2,
        ease: [0.43, 0.13, 0.23, 0.96]
      },
      scale: {
        duration: isMobile ? 3 : 5,
        ease: "linear"
      }
    }}
    className="absolute inset-0"
  >
```

**推奨: OPTION 1を使用してください。モバイルでも十分高速です。**

#### Phase 2 完了チェックリスト

```
[ ] Heroタイトルレスポンシブ化完了
[ ] タイトル文字サイズ確認（全画面サイズ）
[ ] タイトル配置確認（全画面サイズ）
[ ] スライドショーアニメーション動作確認
[ ] モバイルでの読み込み速度確認
[ ] デスクトップ (1440px+)で既存デザイン維持確認
[ ] Gitコミット完了
```

---

### Phase 3: Our Reputation（3カード）（1日）

#### 3.1 コンテナ修正（1時間）

**修正箇所: app/page.tsx:132-133**

```tsx
// BEFORE
<section className="bg-white py-[60px] overflow-hidden">
  <div className="w-full min-w-[1440px]">

// AFTER
<section className="bg-white py-12 sm:py-14 md:py-16 2xl:py-[60px] overflow-hidden">
  <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-20 2xl:px-0">
```

#### 3.2 見出しとカードレイアウト（3時間）

**修正箇所: app/page.tsx:134-196**

```tsx
// BEFORE
<motion.h2 className="text-center text-heading-4 text-neutral-800 leading-normal mb-[92px]">
  Our Reputation
</motion.h2>

<div className="flex justify-center gap-[63px] px-[120px]">
  <motion.div className="bg-white border-[1.4px] ... w-[292px]">
  ...
</div>

// AFTER
<motion.h2
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-100px" }}
  transition={{ duration: 0.5 }}
  className="text-center text-2xl sm:text-3xl md:text-heading-4 text-neutral-800 leading-normal
             mb-8 sm:mb-12 md:mb-16 lg:mb-20 2xl:mb-[92px]"
>
  Our Reputation
</motion.h2>

<div className="flex flex-col md:flex-row justify-center items-center md:items-stretch
                gap-6 sm:gap-8 md:gap-10 lg:gap-12 2xl:gap-[63px]">
  {/* カード1 */}
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ delay: 0.1, duration: 0.5 }}
    className="bg-white border-[1.4px] border-solid border-neutral-100 rounded-[4px]
               pb-8 md:pb-10 pt-4 md:pt-5 px-4 md:px-5
               flex flex-col gap-4 md:gap-[18px] items-start
               w-full sm:w-[320px] md:w-[280px] lg:w-[290px] 2xl:w-[292px]"
  >
    <div className="w-10 h-10 relative overflow-hidden">
      <div className="absolute inset-[4.17%]">
        <Image src="/assets/112e73a57b2e94b8ce3dfdef856ce976d23ca2ea.svg" alt="" fill className="object-contain" />
      </div>
    </div>
    <h3 className="font-bold text-lg md:text-xl leading-normal text-neutral-700">Best Services</h3>
    <p className="text-neutral-400 text-sm md:text-base leading-normal w-full md:w-[254px]">
      Nullam senectus porttitor in eget. Eget rutrum leo interdum.
    </p>
  </motion.div>

  {/* カード2 */}
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ delay: 0.2, duration: 0.5 }}
    className="bg-white border-[1.4px] border-solid border-neutral-100 rounded-[4px]
               pb-8 md:pb-10 pt-4 md:pt-5 px-4 md:px-5
               flex flex-col gap-4 md:gap-[18px] items-start
               w-full sm:w-[320px] md:w-[280px] lg:w-[290px] 2xl:w-[292px]"
  >
    <div className="w-10 h-10 relative overflow-hidden">
      <div className="absolute inset-[4.17%]">
        <Image src="/assets/112e73a57b2e94b8ce3dfdef856ce976d23ca2ea.svg" alt="" fill className="object-contain" />
      </div>
    </div>
    <h3 className="font-bold text-lg md:text-xl leading-normal text-neutral-700">Best Teams</h3>
    <p className="text-neutral-400 text-sm md:text-base leading-normal w-full md:w-[254px]">
      Cursus semper tellus volutpat aliquet lacus.
    </p>
  </motion.div>

  {/* カード3 */}
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ delay: 0.3, duration: 0.5 }}
    className="bg-white border-[1.4px] border-solid border-neutral-100 rounded-[4px]
               pb-8 md:pb-10 pt-4 md:pt-5 px-4 md:px-5
               flex flex-col gap-4 md:gap-[18px] items-start
               w-full sm:w-[320px] md:w-[280px] lg:w-[290px] 2xl:w-[292px]"
  >
    <div className="w-10 h-10 relative overflow-hidden">
      <div className="absolute inset-[9.208%]">
        <Image src="/assets/1314a88b7ebf1eb3d4adc14cc32306b468412fe2.svg" alt="" fill className="object-contain" />
      </div>
    </div>
    <h3 className="font-bold text-lg md:text-xl leading-normal text-neutral-700">Best Designs</h3>
    <p className="text-neutral-400 text-sm md:text-base leading-normal w-full md:w-[254px]">
      Ultricies at ipsum nunc, tristique nam lectus.
    </p>
  </motion.div>
</div>
```

#### Phase 3 完了チェックリスト

```
[ ] min-w-[1440px]削除完了
[ ] カードレイアウトレスポンシブ化完了
[ ] モバイル: 縦並び確認
[ ] タブレット: 横並び確認
[ ] デスクトップ: 既存デザイン確認
[ ] アニメーション動作確認
[ ] Gitコミット完了
```

---

### Phase 4: About Us（画像 + ブルーボックス）（3-4日）⚠️ 高リスク

**コード完全分離が必要 - 慎重に**

#### ⚠️ 注意事項（Phase 4特有の問題）

```
難易度: ★★★★☆ (高)
リスク: 🔴 高
工数: 3-4日（旧見積2日は楽観的）

主な課題:
1. コード重複（モバイル用・デスクトップ用で2倍）
2. 画像の2回レンダリング（パフォーマンス懸念）
3. 絶対配置レイアウトの完全保持
4. xl範囲(1280-1439px)でモバイルレイアウトになる

トレードオフ:
✅ メリット: デスクトップデザイン完全保持
❌ デメリット: コード保守性低下、ファイルサイズ増加

代替案検討:
Option A (採用): block 2xl:hidden / hidden 2xl:block で完全分離
  - 確実だがコード2倍
Option B (非推奨): CSS GridのSubgridや高度なFlexbox
  - 理想的だが実装困難、デスクトップ保持リスク
```

#### 4.1 構造大幅変更（8時間）

**修正箇所: app/page.tsx:200-236**

```tsx
// BEFORE - 絶対配置の重なりレイアウト
<section className="bg-white py-[138px] overflow-hidden">
  <div className="w-full min-w-[1440px] relative h-[669px]">
    <motion.div className="absolute left-[120px] top-0 w-[902px] h-[669px] ...">
      <Image src="/assets/compass-logo.jpg" ... />
    </motion.div>
    <motion.div className="absolute right-[120px] top-[147px] bg-primary w-[488px] h-[523px] ...">
      ...
    </motion.div>
  </div>
</section>

// AFTER - モバイル: 縦並び、デスクトップ: 絶対配置保持
<section className="bg-white py-12 sm:py-16 md:py-20 lg:py-28 2xl:py-[138px] overflow-hidden">
  <div className="w-full max-w-[1440px] mx-auto
                  px-4 sm:px-6 md:px-12 lg:px-20 2xl:px-0
                  relative
                  min-h-[600px] sm:min-h-[700px] md:min-h-[750px] lg:min-h-[800px] 2xl:h-[669px]">

    {/* モバイル・タブレットレイアウト (lg未満) */}
    <div className="block 2xl:hidden space-y-6 sm:space-y-8">
      {/* 画像 */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]
                   rounded-[2px] shadow-[0px_20px_24px_-4px_rgba(17,24,39,0.1),0px_8px_8px_-4px_rgba(17,24,39,0.04)]
                   overflow-hidden relative"
      >
        <Image
          src="/assets/compass-logo.jpg"
          alt="About Us"
          fill
          className="object-cover rounded-[2px]"
        />
      </motion.div>

      {/* ブルーボックス */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="bg-primary w-full rounded-[2px]
                   shadow-[0px_20px_24px_-4px_rgba(17,24,39,0.1),0px_8px_8px_-4px_rgba(17,24,39,0.04)]
                   p-6 sm:p-8 md:p-10 space-y-6 sm:space-y-8"
      >
        <h2 className="text-2xl sm:text-3xl md:text-heading-4 text-white leading-normal font-bold">
          About us
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-white leading-relaxed">
          For more than 30 years we have been delivering world-class construction and we&apos;ve built many lasting relationships along the way.
          <br /><br />
          We&apos;ve matured into an industry leader and trusted resource for those seeking quality, innovation and reliability when building in the U.S.
        </p>
        <button className="bg-white border-2 border-primary px-5 py-4 rounded-md
                           flex items-center justify-center gap-[10px]
                           hover:bg-neutral-50 transition-colors">
          <p className="font-semibold text-base sm:text-lg text-primary text-center leading-normal">
            More on Our History
          </p>
        </button>
      </motion.div>
    </div>

    {/* デスクトップレイアウト (2xl以上) - 既存の絶対配置保持 */}
    <div className="hidden 2xl:block">
      {/* 画像 */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="absolute left-[120px] top-0 w-[902px] h-[669px] rounded-[2px]
                   shadow-[0px_20px_24px_-4px_rgba(17,24,39,0.1),0px_8px_8px_-4px_rgba(17,24,39,0.04)]"
      >
        <Image
          src="/assets/compass-logo.jpg"
          alt="About Us"
          fill
          className="object-cover rounded-[2px]"
        />
      </motion.div>

      {/* ブルーボックス */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="absolute right-[120px] top-[147px] bg-primary w-[488px] h-[523px] rounded-[2px]
                   shadow-[0px_20px_24px_-4px_rgba(17,24,39,0.1),0px_8px_8px_-4px_rgba(17,24,39,0.04)]
                   overflow-clip"
      >
        <p className="absolute left-10 top-[50px] text-heading-4 text-white leading-normal font-bold">
          About us
        </p>
        <p className="absolute left-10 top-[129px] text-xl text-white leading-normal w-[388px]">
          For more than 30 years we have been delivering world-class construction and we&apos;ve built many lasting relationships along the way.
          <br /><br />
          We&apos;ve matured into an industry leader and trusted resource for those seeking quality, innovation and reliability when building in the U.S.
        </p>
        <div className="absolute left-10 top-[410px] bg-white border-2 border-primary border-solid
                        px-5 py-4 rounded-md flex items-center justify-center gap-[10px]">
          <p className="font-semibold text-lg text-primary text-center leading-normal">
            More on Our History
          </p>
        </div>
      </motion.div>
    </div>
  </div>
</section>
```

#### Phase 4 完了チェックリスト

```
[ ] モバイルレイアウト（縦並び）実装完了
[ ] デスクトップレイアウト（絶対配置）保持確認
[ ] 画像レスポンシブ化完了
[ ] ブルーボックステキスト調整完了
[ ] アニメーション動作確認
[ ] 全画面サイズで表示確認
[ ] デスクトップ (2xl: 1440px+)で既存デザイン完全一致確認 ← 最重要
[ ] Gitコミット完了
```

---

### Phase 5-11: 残りのセクション

残りのセクション（Services, Stats, Free Consultation, Projects, Contact, Bottom, Footer）も同様のパターンで実装します。

**詳細は長くなるため、原則のみ記載:**

1. **Services (Phase 5)**: 絶対配置 → モバイルはグリッド、デスクトップは絶対配置保持
2. **Stats (Phase 6)**: 最も複雑 - モバイルはシンプル縦並び、デスクトップはアート的レイアウト保持
3. **Free Consultation (Phase 7)**: flex-col → flex-row、テキストサイズ調整
4. **Projects (Phase 8)**: grid-cols-1 → grid-cols-2、フィルター横スクロール
5. **Contact (Phase 9)**: 極端な余白を削減、グリッド調整
6. **Bottom (Phase 10)**: グリッド調整、余白調整
7. **Footer (Phase 11)**: 高さとテキストサイズ調整

---

## 🧪 テスト戦略

### デバイステスト（必須）

```
実機テスト必須:
□ iPhone SE (第2/3世代) (375x667) - Safari
□ iPhone 12/13 (390x844) - Safari
□ iPhone 14 Pro (393x852) - Safari
□ iPhone 14 Pro Max (430x932) - Safari
□ iPad (768x1024) - Safari
□ iPad Pro (1024x1366) - Safari
□ Android (Galaxy S21/S22) - Chrome

ブラウザデベロッパーツール:
□ Chrome DevTools - すべてのプリセット
  - iPhone SE (375x667)
  - iPhone 12 Pro (390x844)
  - iPhone 14 Pro Max (430x932)
  - iPad (768x1024)
  - Desktop (1440x900以上)
□ Safari Web Inspector
□ Firefox Responsive Design Mode

注意: iPhone 5/SE (第1世代) の320pxは古いデバイスなので、
      優先度は低いが、可能であればテスト推奨。
```

### Lighthouseテスト

```bash
# Chrome DevToolsで実行
1. F12 → Lighthouse
2. Categories: Performance, Accessibility, Best Practices
3. Device: Mobile

目標スコア:
Performance: 85+
Accessibility: 90+
Best Practices: 95+
```

### 画面回転テスト

```
□ 縦 → 横 → 縦でレイアウト崩れないか
□ メニュー開いた状態で回転
□ アニメーション中に回転
```

---

## 🚨 よくある問題と対処法

### 問題1: デスクトップデザインが微妙に変わった

**症状:** 1440px以上でレイアウトがズレる

**原因:** `2xl:` プレフィックスを忘れた

**対処法:**
```tsx
// BAD
<div className="px-4 lg:px-20">

// GOOD - 必ず2xl:で既存値を指定
<div className="px-4 lg:px-20 2xl:px-28">
```

### 問題2: min-w-[1440px]削除後にレイアウト崩れ

**症状:** セクションの幅が変わった

**原因:** max-w-[1440px]への変更時の余白設定ミス

**対処法:**
```tsx
// 必ずpaddingとセットで使用
<div className="max-w-[1440px] mx-auto px-4 sm:px-6 ... 2xl:px-0">
```

### 問題3: 絶対配置要素が消える

**症状:** モバイルで要素が画面外

**対処法:**
```tsx
// 絶対配置は2xl:のみ
<div className="relative 2xl:absolute 2xl:left-[120px]">
```

### 問題4: Framer Motionアニメーションがカクつく

**症状:** モバイルでアニメーションが重い

**対処法:**
```tsx
// モバイルではアニメーション簡略化
<motion.div
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: true, margin: "-50px" }} // マージン削減
  transition={{
    duration: typeof window !== 'undefined' && window.innerWidth < 768 ? 0.3 : 0.6
  }}
>
```

### 問題5: 画像が遅い

**症状:** モバイルで読み込みが遅い

**対処法:**
```tsx
// Next.js Imageコンポーネントのsizesプロパティ
<Image
  src="/assets/image.jpg"
  fill
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
  quality={75} // モバイル用に品質下げる
  priority={false} // ファーストビュー以外はlazy load
/>
```

---

## 🎯 成功基準

### Phase完了チェックリスト

各Phase終了時に必ず確認:

```
[ ] コード修正完了
[ ] npm run dev で動作確認
[ ] iPhone SE (375px)で表示確認
[ ] iPad (768px)で表示確認
[ ] デスクトップ (1440px+)で既存デザイン完全一致確認 ← 最重要
[ ] アニメーション動作確認
[ ] Gitコミット完了（コミットメッセージ明確）
[ ] 次のPhaseの準備
```

### 最終検収基準

```
デバイス:
[ ] iPhone SE (375px) - Safari: 完璧な表示
[ ] iPhone 12 (390px) - Safari: 完璧な表示
[ ] iPad (768px) - Safari: 完璧な表示
[ ] デスクトップ (1440px+) - Chrome: 既存デザインと完全一致 ← 最重要

パフォーマンス:
[ ] Lighthouse Mobile Performance: 85+
[ ] Lighthouse Accessibility: 90+
[ ] ページ読み込み: 3秒以内（3G）

機能:
[ ] ハンバーガーメニュー動作
[ ] スライドショー動作
[ ] すべてのリンク動作
[ ] Instagramリンク動作

アニメーション:
[ ] Hero: タイトルフェードイン
[ ] スライドショー: スムーズな切替
[ ] カード: スクロール時フェードイン
[ ] モバイルメニュー: スムーズな開閉
```

---

## 📈 進捗管理

### タイムライン（12営業日）

```
Week 1:
Day 1: Phase 0 (セットアップ) + Phase 1開始 (メニュー 50%)
Day 2: Phase 1完了 (メニュー) + Phase 2 (Hero)
Day 3: Phase 3 (Reputation) + Phase 4開始 (About Us 50%)
Day 4: Phase 4完了 (About Us) + Phase 5 (Services)
Day 5: Phase 6開始 (Stats - 最も複雑)

Week 2:
Day 6: Phase 6完了 (Stats) + Phase 7 (Consultation)
Day 7: Phase 8 (Projects) + Phase 9 (Contact)
Day 8: Phase 10 (Bottom) + Phase 11 (Footer)
Day 9: 全体テスト + バグ修正
Day 10: 最終調整 + デプロイ準備

Week 3 (バッファ):
Day 11-12: 予備日（問題発生時）
```

### 毎日のルーティン

```bash
# 朝（作業開始前）
git pull origin feature/mobile-responsive
npm run dev
# ブラウザで http://localhost:3000 確認

# 作業中（1時間ごと）
# Chrome DevTools → デバイスモード切替
# 1. iPhone SE (375px)
# 2. iPad (768px)
# 3. Desktop (1440px) ← 最重要

# 夜（作業終了後）
git add .
git commit -m "詳細なメッセージ"
git push origin feature/mobile-responsive

# 進捗記録（スプレッドシート更新）
```

---

## 📚 参考資料

### 公式ドキュメント

- **Next.js Image最適化**: https://nextjs.org/docs/pages/building-your-application/optimizing/images
- **Tailwind Responsive Design**: https://tailwindcss.com/docs/responsive-design
- **Framer Motion**: https://www.framer.com/motion/
- **MDN Responsive Images**: https://developer.mozilla.org/ja/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images

### ツール

- **Chrome DevTools Device Mode**: F12 → Toggle device toolbar
- **Responsive Design Checker**: https://responsivedesignchecker.com/
- **Lighthouse**: Chrome DevTools → Lighthouse tab

---

## 📝 まとめ

### このRD.mdの特徴

```
✅ デスクトップ保持戦略を最優先
✅ 2xl: プレフィックスで既存デザイン完全保護
✅ 全セクション詳細分析
✅ 段階的実装（12フェーズ）
✅ 実装コード例付き
✅ テスト戦略明確
✅ トラブルシューティング充実
```

### 前回プロジェクト(CPJ-HP)からの改善点

```
前回の問題:
❌ デスクトップデザインが若干変わった
❌ 実装が急ぎすぎた

今回の対策:
✅ 2xl: (1440px+)で既存デザイン完全保持
✅ 各Phase後に必ずデスクトップ確認
✅ "block 2xl:hidden" と "hidden 2xl:block" で完全分離
✅ 12営業日の余裕あるスケジュール
```

---

## 🔧 クイックスタート

### 今すぐ始める場合

```bash
# 1. プロジェクトディレクトリへ移動
cd /Users/kousaiyamamoto/rashinban-HP

# 2. ブランチ作成
git checkout -b feature/mobile-responsive
git push -u origin feature/mobile-responsive

# 3. バックアップ
cp app/page.tsx app/page.tsx.backup

# 4. 開発サーバー起動
npm run dev
# http://localhost:3000

# 5. Phase 1開始
# app/page.tsx:8 から編集開始
# モバイルメニューState追加から

# 6. 動作確認
# Chrome DevTools (F12) → Toggle device toolbar
# iPhone SE, iPad, Desktop 1440px+ で確認

# 7. コミット
git add app/page.tsx
git commit -m "feat(Phase 1): ハンバーガーメニュー実装開始"
git push
```

---

## 🔍 精査後の追加事項（v2.1）

### xl範囲（1280-1439px）の扱いについて

**問題:**
現在の方針では、1280-1439pxでモバイルレイアウトが表示されます。

```
ブレークポイント:
- 〜1279px: モバイル/タブレット
- 1280-1439px: デスクトップだがモバイルレイアウト ← 問題
- 1440px以上: デスクトップレイアウト（既存デザイン保持）
```

**選択肢:**

**Option A (保守的・推奨): 2xl:のみデスクトップ**
```tsx
// 1280-1439pxでもモバイルレイアウト
<div className="block 2xl:hidden">モバイル</div>
<div className="hidden 2xl:block">デスクトップ</div>

メリット:
✅ 既存デザイン完全保持（1440px以上）
✅ シンプル

デメリット:
❌ 1280-1439pxがモバイルレイアウト（違和感）
```

**Option B (積極的): xl:以上でデスクトップ**
```tsx
// 1280px以上でデスクトップレイアウト
<div className="block xl:hidden">モバイル</div>
<div className="hidden xl:block">デスクトップ</div>

メリット:
✅ 1280px以上でデスクトップレイアウト
✅ より自然な体験

デメリット:
❌ 1280-1439pxで微妙にずれるリスク
⚠️ 慎重な調整が必要
```

**推奨:**
- Phase 4, 6（複雑なセクション）: Option A（安全優先）
- その他のセクション: Option B検討可（テスト必須）

---

### コード重複への対処

**問題:**
block 2xl:hidden / hidden 2xl:block により、コードが2倍になります。

**影響:**
- ファイルサイズ: page.tsx 830行 → 約1200-1400行
- 保守性: 変更時に2箇所修正が必要
- パフォーマンス: 画像の2回レンダリング（Next.js Imageがキャッシュするため実質問題なし）

**緩和策:**

1. **コンポーネント化**
```tsx
// 共通部分をコンポーネント化
const AboutUsImage = () => (
  <Image src="/assets/compass-logo.jpg" alt="About Us" fill />
);

// モバイル用
<div className="block 2xl:hidden">
  <AboutUsImage />
</div>

// デスクトップ用
<div className="hidden 2xl:block">
  <AboutUsImage />
</div>
```

2. **カスタムHooks**
```tsx
// 共通ロジック抽出
const useAboutUsData = () => ({
  title: "About us",
  description: "For more than 30 years...",
});
```

3. **ドキュメント充実**
```tsx
// 変更時に2箇所修正が必要な旨をコメント
{/* モバイルレイアウト - デスクトップ版と内容同期必須 */}
{/* デスクトップレイアウト - モバイル版と内容同期必須 */}
```

---

### 最終チェックリスト（実装前確認）

```
環境準備:
[ ] Node.js, npm動作確認
[ ] Git動作確認
[ ] エディタ準備（VSCode推奨）
[ ] Chrome DevTools使用方法確認

ブランチ戦略:
[ ] feature/mobile-responsiveブランチ作成
[ ] main ブランチをバックアップ
[ ] .gitignoreに*.backupを追加

Phase 0 必須確認:
[ ] tailwind.config.tsに screens: { '2xl': '1440px' } 追加
[ ] npm run devで動作確認
[ ] 1440px、1500px、1920pxで表示確認
[ ] Gitコミット

実装中の心得:
[ ] デスクトップ確認を毎回実施
[ ] 1時間ごとにGitコミット
[ ] エラー発生時は即座にロールバック検討
[ ] 焦らず、慎重に進める
```

---

## 📊 成功確率の見積もり（精査後）

### 各Phaseの成功確率

| Phase | 成功確率 | 失敗時の影響 | 備考 |
|-------|---------|------------|------|
| Phase 0 | 95% | 🔴 致命的 | 設定ミスのみ注意 |
| Phase 1-3 | 85% | 🟡 中 | 標準的な実装 |
| Phase 4 | 70% | 🔴 高 | コード重複、慎重に |
| Phase 5 | 75% | 🟡 中 | グリッド切替 |
| Phase 6 | 60% | 🔴 最高 | 最難関 |
| Phase 7-11 | 90% | 🟢 低 | 簡単なセクション |
| テスト | 80% | 🟡 中 | バグ修正に時間 |

**全体の成功確率:** 約70-75%

**失敗パターン:**
1. Phase 0スキップ → 致命的
2. デスクトップ確認不足 → デザイン崩れ
3. 工数不足 → 品質低下
4. 焦って実装 → バグ多発

**成功のための条件:**
- ✅ Phase 0を確実に完了
- ✅ 十分な工数確保（18-22日）
- ✅ 毎Phase後のデスクトップ確認
- ✅ リスクの高いPhaseは慎重に

---

**作成日:** 2025-10-29
**改訂日:** 2025-10-31（v2.1精査後改訂）
**対象プロジェクト:** rashinban-HP
**バージョン:** 2.1
**作成者:** Claude Code with Ultra Think
**最重要原則:** デスクトップ版(1440px+)を一切変更しない
**精査責任者:** Claude Code
**精査完了日:** 2025-10-31
