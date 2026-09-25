"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ── Locale types ─────────────────────────────────────────── */

export type Locale = "en" | "ja" | "ko" | "zh";

export const LOCALES: { code: Locale; label: string; short: string }[] = [
  { code: "en", label: "English", short: "EN" },
  { code: "ja", label: "日本語", short: "JA" },
  { code: "ko", label: "한국어", short: "KO" },
  { code: "zh", label: "简体中文", short: "ZH" },
];

/* ── Dictionary shape ─────────────────────────────────────── */

export interface Dict {
  nav: {
    fintech: string;
    traveltech: string;
    cloud: string;
    philosophy: string;
    contact: string;
    cta: string;
    status: string;
    menu: string;
  };
  hero: {
    badge: string;
    titleA: string;
    titleB: string;
    sub: string;
    ctaPrimary: string;
    ctaSecondary: string;
    consoleTitle: string;
    consoleFeed: string;
    consolePair: string;
    consoleVolatility: string;
    consoleLatency: string;
    scroll: string;
  };
  bento: {
    kicker: string;
    title: string;
    titleAccent: string;
    sub: string;
    card1Tag: string;
    card1Title: string;
    card1Desc: string;
    card1F1: string;
    card1F2: string;
    card1F3: string;
    card2Tag: string;
    card2Title: string;
    card2Desc: string;
    card2Tagline: string;
    card2Pass: string;
    card2Route: string;
    card2Passenger: string;
    card2Seat: string;
    card2Boarding: string;
    card3Tag: string;
    card3Title: string;
    card3Desc: string;
    card3Pipelines: string;
    card3Concurrency: string;
    card4Tag: string;
    card4Title: string;
    card4Desc: string;
    filterAll: string;
    filterFrontend: string;
    filterMobile: string;
    filterBackend: string;
    filterInfra: string;
  };
  metrics: {
    items: { value: number; decimals: number; suffix: string; label: string }[];
  };
  philosophy: {
    kicker: string;
    title: string;
    sub: string;
    principles: { no: string; title: string; body: string }[];
  };
  contact: {
    kicker: string;
    title: string;
    sub: string;
    cta: string;
    email: string;
    note: string;
  };
  drawer: {
    title: string;
    sub: string;
    archNote: string;
    projectType: string;
    types: string[];
    name: string;
    namePh: string;
    email: string;
    emailPh: string;
    budget: string;
    budgets: string[];
    details: string;
    detailsPh: string;
    submit: string;
    submitting: string;
    successTitle: string;
    successBody: string;
    successCode: string;
    close: string;
    toastTitle: string;
    toastBody: string;
  };
  footer: {
    tagline: string;
    products: string;
    company: string;
    connect: string;
    rights: string;
    allSystems: string;
  };
}

/* ── Dictionaries ─────────────────────────────────────────── */

const en: Dict = {
  nav: {
    fintech: "FinTech Solutions",
    traveltech: "TravelTech",
    cloud: "Enterprise Cloud",
    philosophy: "Philosophy",
    contact: "Contact",
    cta: "Initiate Architecture Consult",
    status: "System Operational",
    menu: "Menu",
  },
  hero: {
    badge: "Bespoke Full-Stack Engineering & Proprietary Tech Lab",
    titleA: "Turning Complex Hypotheses Into",
    titleB: "Scalable Production Code.",
    sub: "Architects of institutional-grade algorithmic bots, Apple/Google Wallet travel ecosystems, and resilient AWS/Azure/GCP cloud backbones.",
    ctaPrimary: "Explore Products",
    ctaSecondary: "Schedule Technical Discovery",
    consoleTitle: "CandleQ · Live Execution Telemetry",
    consoleFeed: "EXECUTION FEED",
    consolePair: "FX·MAJORS",
    consoleVolatility: "Move your cursor across the chart — volatility syncs in real time",
    consoleLatency: "exec latency",
    scroll: "Scroll to explore",
  },
  bento: {
    kicker: "Proprietary Products & Core Capabilities",
    title: "A laboratory, not an agency.",
    titleAccent: "Every system here is ours.",
    sub: "In-house products compounded over years of shipping institutional software — and the capability to build yours at the same standard.",
    card1Tag: "FinTech Lab",
    card1Title: "CandleQ & Algo Trading Engines",
    card1Desc: "iOS/Android e-learning platform for systematic traders, plus automated FX & equity execution bots engineered for institutional rigor.",
    card1F1: "Automated FX & Equity Execution",
    card1F2: "Strategy Backtest Engine",
    card1F3: "Trader Academy App",
    card2Tag: "TravelTech Platform",
    card2Title: "TourPass & Global Travel ERP",
    card2Desc: "Native Apple Wallet / Google Wallet pass infrastructure fused with a full travel-operations ERP.",
    card2Tagline: "Pass to the World, Built for Frictionless Journeys.",
    card2Pass: "TOURPASS BOARDING PASS",
    card2Route: "ICN → NRT",
    card2Passenger: "PAX",
    card2Seat: "SEAT",
    card2Boarding: "BOARDING",
    card3Tag: "Enterprise Cloud & Full-Stack",
    card3Title: "Multi-Cloud Infrastructure",
    card3Desc: "AWS / Azure / GCP certified full-stack delivery. High-concurrency database design and real-time WebSocket pipelines.",
    card3Pipelines: "WEBSOCKET PIPELINES",
    card3Concurrency: "peak concurrency",
    card4Tag: "Client Engineering",
    card4Title: "Bespoke System Development",
    card4Desc: "From ambiguous idea to hardened production system — a senior collective that owns architecture, implementation, and operations end-to-end.",
    filterAll: "All Stack",
    filterFrontend: "Frontend",
    filterMobile: "Mobile",
    filterBackend: "Backend",
    filterInfra: "Infra & DevOps",
  },
  metrics: {
    items: [
      { value: 99.99, decimals: 2, suffix: "%", label: "Architecture Uptime" },
      { value: 12, decimals: 0, suffix: "ms", label: "Median Exec Latency" },
      { value: 3, decimals: 0, suffix: "", label: "Multi-Cloud Native — AWS · Azure · GCP" },
      { value: 100, decimals: 0, suffix: "%", label: "Institutional Security Standards" },
      { value: 0, decimals: 0, suffix: "", label: "Technical Debt Shipped — Zero-Debt Delivery" },
    ],
  },
  philosophy: {
    kicker: "Engineering Philosophy",
    title: "We build like it has to run for a decade. Because it does.",
    sub: "Four principles govern every repository we touch.",
    principles: [
      {
        no: "01",
        title: "Architecture before aesthetics",
        body: "Domain models, failure modes, and data flow are settled before a single pixel ships. Interfaces express the system — never the other way around.",
      },
      {
        no: "02",
        title: "Latency is a feature",
        body: "Sub-12ms execution paths, edge-replicated state, and WebSocket pipelines are not optimizations. They are the product's core promise.",
      },
      {
        no: "03",
        title: "Zero technical debt, by design",
        body: "Typed contracts, infrastructure-as-code, and CI gates on every branch. If it cannot survive an audit, it does not reach production.",
      },
      {
        no: "04",
        title: "Senior collective, no handoffs",
        body: "You speak directly with the architects writing your code. No account managers, no translation layers, no diluted intent.",
      },
    ],
  },
  contact: {
    kicker: "Contact",
    title: "Ready to build the improbable?",
    sub: "Bring us the hypothesis your competitors called impossible. We will scope it, architect it, and ship it.",
    cta: "Open Technical Brief",
    email: "architects@hokulio.com",
    note: "Response within 24 hours — from a Lead Architect, not a sales representative.",
  },
  drawer: {
    title: "Technical Brief",
    sub: "A streamlined project brief. Expect an architecture-level reply, not a sales deck.",
    archNote: "Consult directly with a Lead Architect, not a sales representative.",
    projectType: "Project Type",
    types: ["Trading Bot", "Travel ERP", "Cloud Migration", "Mobile App"],
    name: "Name",
    namePh: "Ada Lovelace",
    email: "Work Email",
    emailPh: "ada@fund.com",
    budget: "Indicative Budget",
    budgets: ["$25k – $50k", "$50k – $150k", "$150k – $500k", "$500k+"],
    details: "System Context",
    detailsPh: "Describe the problem domain, expected scale, and any compliance constraints (e.g. MiFID II, PCI-DSS)…",
    submit: "Transmit Brief",
    submitting: "Transmitting…",
    successTitle: "Brief received.",
    successBody: "A Lead Architect will respond within 24 hours. Reference code for your records:",
    successCode: "HK-REF",
    close: "Close",
    toastTitle: "Brief transmitted",
    toastBody: "A Lead Architect will contact you within 24 hours.",
  },
  footer: {
    tagline: "Bespoke full-stack engineering & proprietary tech lab.",
    products: "Products",
    company: "Company",
    connect: "Connect",
    rights: "© 2026 Hokulio Labs. All systems engineered in-house.",
    allSystems: "All systems operational",
  },
};

const ja: Dict = {
  nav: {
    fintech: "FinTech ソリューション",
    traveltech: "TravelTech",
    cloud: "エンタープライズクラウド",
    philosophy: "理念",
    contact: "お問い合わせ",
    cta: "アーキテクチャ相談を開始",
    status: "システム正常稼働中",
    menu: "メニュー",
  },
  hero: {
    badge: "受託フルスタックエンジニアリング & 独自プロダクトラボ",
    titleA: "複雑な仮説を、",
    titleB: "スケールする本番コードへ。",
    sub: "機関投資家レベルのアルゴリズムボット、Apple/Google Wallet のトラベルエコシステム、そして堅牢な AWS/Azure/GCP クラウド基盤のアーキテクト。",
    ctaPrimary: "プロダクトを見る",
    ctaSecondary: "技術ディスカバリーを予約",
    consoleTitle: "CandleQ · ライブ実行テレメトリ",
    consoleFeed: "実行フィード",
    consolePair: "FX・メジャー通貨",
    consoleVolatility: "チャート上でカーソルを動かすと、ボラティリティがリアルタイムに同期されます",
    consoleLatency: "実行レイテンシ",
    scroll: "スクロールして探索",
  },
  bento: {
    kicker: "独自プロダクト & コアケイパビリティ",
    title: "私たちはラボであり、",
    titleAccent: "代理店ではありません。",
    sub: "機関レベルのソフトウェアを数年間提供してきた中で蓄積された自社プロダクト群。そして同等の水準であなたのシステムを構築する技術力。",
    card1Tag: "FinTech ラボ",
    card1Title: "CandleQ & アルゴトレーディングエンジン",
    card1Desc: "システマティックトレーダー向け iOS/Android 学習プラットフォームに加え、機関レベルの厳密さで設計された FX・株式自動実行ボット。",
    card1F1: "FX・株式自動実行",
    card1F2: "戦略バックテストエンジン",
    card1F3: "トレーダーアカデミーアプリ",
    card2Tag: "TravelTech プラットフォーム",
    card2Title: "TourPass & グローバル旅行 ERP",
    card2Desc: "Apple Wallet / Google Wallet ネイティブパス基盤と旅行業務 ERP の融合。",
    card2Tagline: "世界中の旅へ、frictionless なパスを。",
    card2Pass: "TOURPASS 搭乗券",
    card2Route: "ICN → NRT",
    card2Passenger: "搭乗者",
    card2Seat: "座席",
    card2Boarding: "搭乗",
    card3Tag: "エンタープライズクラウド & フルスタック",
    card3Title: "マルチクラウドインフラ",
    card3Desc: "AWS / Azure / GCP 認定のフルスタックデリバリー。高同時実行データベース設計とリアルタイム WebSocket パイプライン。",
    card3Pipelines: "WEBSOCKET パイプライン",
    card3Concurrency: "ピーク同時接続数",
    card4Tag: "クライアントエンジニアリング",
    card4Title: "受託システム開発",
    card4Desc: "曖昧なアイデアから堅牢な本番システムまで — アーキテクチャ、実装、運営まで一気通貫で担うシニア集団。",
    filterAll: "すべて",
    filterFrontend: "フロントエンド",
    filterMobile: "モバイル",
    filterBackend: "バックエンド",
    filterInfra: "インフラ & DevOps",
  },
  metrics: {
    items: [
      { value: 99.99, decimals: 2, suffix: "%", label: "アーキテクチャ稼働率" },
      { value: 12, decimals: 0, suffix: "ms", label: "平均実行レイテンシ" },
      { value: 3, decimals: 0, suffix: "", label: "マルチクラウドネイティブ — AWS · Azure · GCP" },
      { value: 100, decimals: 0, suffix: "%", label: "機関レベルのセキュリティ標準" },
      { value: 0, decimals: 0, suffix: "", label: "技術的負債ゼロのデリバリー" },
    ],
  },
  philosophy: {
    kicker: "エンジニアリング哲学",
    title: "10年動き続ける前提で構築する。実際にそうなるから。",
    sub: "私たちが触れるすべてのリポジトリを支配する4つの原則。",
    principles: [
      {
        no: "01",
        title: "アーキテクチャは美学の前に",
        body: "ドメインモデル、障害モード、データフローを、1ピクセル描く前に確定させる。インターフェースはシステムを表現するものであり、その逆ではない。",
      },
      {
        no: "02",
        title: "レイテンシは機能である",
        body: "12ms 未満の実行パス、エッジレプリケーションされた状態、WebSocket パイプラインは最適化ではない。それこそがプロダクトの中核的約束だ。",
      },
      {
        no: "03",
        title: "設計段階から技術的負債ゼロへ",
        body: "型付けされた契約、IaC、全ブランチの CI ゲート。監査を生き延びられないものは、本番環境に到達しない。",
      },
      {
        no: "04",
        title: "シニア集団、ハンドオフなし",
        body: "コードを書くアーキテクトと直接対話できる。アカウントマネージャーも、翻訳レイヤーも、意図の希釈も存在しない。",
      },
    ],
  },
  contact: {
    kicker: "お問い合わせ",
    title: "実現困難なものを、共に。",
    sub: "競合が不可能だと断言した仮説を持ち込んでください。スコープを定め、アーキテクチャを設計し、出荷します。",
    cta: "技術ブリーフを開く",
    email: "architects@hokulio.com",
    note: "24時間以内に返信 — 営業担当ではなく、リードアーキテクトが。",
  },
  drawer: {
    title: "技術ブリーフ",
    sub: "合理化されたプロジェクトブリーフ。営業資料ではなく、アーキテクチャレベルの回答をお届けします。",
    archNote: "営業担当ではなく、リードアーキテクトが直接ご相談に応じます。",
    projectType: "プロジェクト種別",
    types: ["トレーディングボット", "トラベル ERP", "クラウド移行", "モバイルアプリ"],
    name: "お名前",
    namePh: "Ada Lovelace",
    email: "勤務先メール",
    emailPh: "ada@fund.com",
    budget: "想定予算",
    budgets: ["$25k – $50k", "$50k – $150k", "$150k – $500k", "$500k+"],
    details: "システムコンテキスト",
    detailsPh: "問題領域、想定スケール、コンプライアンス制約（MiFID II、PCI-DSS など）を記述してください…",
    submit: "ブリーフを送信",
    submitting: "送信中…",
    successTitle: "ブリーフを受信しました。",
    successBody: "24時間以内にリードアーキテクトが回答します。参照コード：",
    successCode: "HK-REF",
    close: "閉じる",
    toastTitle: "ブリーフを送信しました",
    toastBody: "24時間以内にリードアーキテクトがご連絡します。",
  },
  footer: {
    tagline: "受託フルスタックエンジニアリング & 独自プロダクトラボ。",
    products: "プロダクト",
    company: "会社",
    connect: "接続",
    rights: "© 2026 Hokulio Labs. すべてのシステムを自社開発。",
    allSystems: "全システム正常稼働中",
  },
};

const ko: Dict = {
  nav: {
    fintech: "핀테크 솔루션",
    traveltech: "트래블테크",
    cloud: "엔터프라이즈 클라우드",
    philosophy: "철학",
    contact: "문의",
    cta: "아키텍처 상담 시작",
    status: "시스템 정상 운영 중",
    menu: "메뉴",
  },
  hero: {
    badge: "맞춤형 풀스택 엔지니어링 & 자체 프로덕트 랩",
    titleA: "상상을 기술로,",
    titleB: "엔지니어링의 정점으로.",
    sub: "기관 등급의 알고리즘 봇, Apple/Google Wallet 여행 생태계, 그리고 탄탄한 AWS/Azure/GCP 클라우드 기반을 설계하는 아키텍트 집단.",
    ctaPrimary: "프로덕트 탐색",
    ctaSecondary: "기술 디스커버리 예약",
    consoleTitle: "CandleQ · 실시간 실행 텔레메트리",
    consoleFeed: "실행 피드",
    consolePair: "FX·메이저 통화",
    consoleVolatility: "차트 위에서 커서를 움직이면 변동성이 실시간으로 동기화됩니다",
    consoleLatency: "실행 지연시간",
    scroll: "스크롤하여 탐색",
  },
  bento: {
    kicker: "자체 프로덕트 & 핵심 역량",
    title: "우리는 에이전시가 아니라,",
    titleAccent: "엔지니어링 랩입니다.",
    sub: "기관 수준의 소프트웨어를 수년간 출시하며 축적한 자체 프로덕트들 — 그리고 동일한 기준으로 당신의 시스템을 만들어내는 역량.",
    card1Tag: "핀테크 랩",
    card1Title: "CandleQ & 알고 트레이딩 엔진",
    card1Desc: "체계적 트레이더를 위한 iOS/Android 이러닝 플랫폼과, 기관 수준의 엄격함으로 설계된 FX·주식 자동 실행 봇.",
    card1F1: "FX·주식 자동 실행",
    card1F2: "전략 백테스트 엔진",
    card1F3: "트레이더 아카데미 앱",
    card2Tag: "트래블테크 플랫폼",
    card2Title: "TourPass & 글로벌 여행 ERP",
    card2Desc: "Apple Wallet / Google Wallet 네이티브 패스 인프라와 여행 운영 ERP의 결합.",
    card2Tagline: "진짜 필요한 여행을 착한 가격으로!",
    card2Pass: "TOURPASS 탑승권",
    card2Route: "ICN → NRT",
    card2Passenger: "탑승자",
    card2Seat: "좌석",
    card2Boarding: "탑승",
    card3Tag: "엔터프라이즈 클라우드 & 풀스택",
    card3Title: "멀티 클라우드 인프라",
    card3Desc: "AWS / Azure / GCP 인증 풀스택 delivery. 고동시성 데이터베이스 설계와 실시간 WebSocket 파이프라인.",
    card3Pipelines: "WEBSOCKET 파이프라인",
    card3Concurrency: "피크 동시 접속",
    card4Tag: "클라이언트 엔지니어링",
    card4Title: "베스포크 시스템 개발",
    card4Desc: "모호한 아이디어에서 검증된 프로덕션 시스템까지 — 아키텍처, 구현, 운영을 end-to-end로 책임지는 시니어 집단.",
    filterAll: "전체 스택",
    filterFrontend: "프론트엔드",
    filterMobile: "모바일",
    filterBackend: "백엔드",
    filterInfra: "인프라 & DevOps",
  },
  metrics: {
    items: [
      { value: 99.99, decimals: 2, suffix: "%", label: "아키텍처 가동률" },
      { value: 12, decimals: 0, suffix: "ms", label: "평균 실행 지연시간" },
      { value: 3, decimals: 0, suffix: "", label: "멀티 클라우드 네이티브 — AWS · Azure · GCP" },
      { value: 100, decimals: 0, suffix: "%", label: "기관 수준 보안 표준" },
      { value: 0, decimals: 0, suffix: "", label: "기술 부채 제로 — Zero-Debt Delivery" },
    ],
  },
  philosophy: {
    kicker: "엔지니어링 철학",
    title: "10년을 버틸 전제로 만듭니다. 실제로 그렇게 작동하니까요.",
    sub: "우리가 만드는 모든 저장소를 지배하는 네 가지 원칙.",
    principles: [
      {
        no: "01",
        title: "아키텍처가 미학에 선행한다",
        body: "도메인 모델, 장애 시나리오, 데이터 흐름을 픽셀 하나 그리기 전에 확정합니다. 인터페이스는 시스템을 표현할 뿐, 그 반대는 없습니다.",
      },
      {
        no: "02",
        title: "지연시간은 기능이다",
        body: "12ms 미만 실행 경로, 엣지 복제 상태, WebSocket 파이프라인은 최적화가 아닙니다. 그것이 곧 프로덕트의 핵심 약속입니다.",
      },
      {
        no: "03",
        title: "설계 단계부터 기술 부채 제로",
        body: "타입 컨트랙트, IaC, 모든 브랜치의 CI 게이트. 감사를 통과하지 못할 코드는 프로덕션에 도달하지 않습니다.",
      },
      {
        no: "04",
        title: "시니어 집단, 핸드오프 없음",
        body: "코드를 직접 쓰는 아키텍트와 바로 소통합니다. 영업 담당자도, 번역 레이어도, 희석된 의도도 존재하지 않습니다.",
      },
    ],
  },
  contact: {
    kicker: "문의",
    title: "불가능할 것 같은 것을 만들 준비가 되셨나요?",
    sub: "경쟁사가 불가능하다 말한 가설을 가져오세요. 스코프를 정의하고, 아키텍처를 설계하고, 출시하겠습니다.",
    cta: "기술 브리프 열기",
    email: "architects@hokulio.com",
    note: "24시간 이내 응답 — 영업 담당자가 아닌 리드 아키텍트가.",
  },
  drawer: {
    title: "기술 브리프",
    sub: "간소화된 프로젝트 브리프. 영업 제안이 아닌 아키텍처 수준의 회신을 받으세요.",
    archNote: "영업 담당자가 아닌 리드 아키텍트와 직접 상담하세요.",
    projectType: "프로젝트 유형",
    types: ["트레이딩 봇", "여행 ERP", "클라우드 마이그레이션", "모바일 앱"],
    name: "이름",
    namePh: "Ada Lovelace",
    email: "업무용 이메일",
    emailPh: "ada@fund.com",
    budget: "예산 범위",
    budgets: ["$25k – $50k", "$50k – $150k", "$150k – $500k", "$500k+"],
    details: "시스템 컨텍스트",
    detailsPh: "문제 도메인, 예상 규모, 컴플라이언스 제약(MiFID II, PCI-DSS 등)을 설명해 주세요…",
    submit: "브리프 전송",
    submitting: "전송 중…",
    successTitle: "브리프가 접수되었습니다.",
    successBody: "24시간 이내에 리드 아키텍트가 회신합니다. 참조 코드:",
    successCode: "HK-REF",
    close: "닫기",
    toastTitle: "브리프 전송 완료",
    toastBody: "24시간 이내에 리드 아키텍트가 연락드립니다.",
  },
  footer: {
    tagline: "맞춤형 풀스택 엔지니어링 & 자체 프로덕트 랩.",
    products: "프로덕트",
    company: "회사",
    connect: "연결",
    rights: "© 2026 Hokulio Labs. 모든 시스템 자체 개발.",
    allSystems: "전체 시스템 정상",
  },
};

const zh: Dict = {
  nav: {
    fintech: "金融科技方案",
    traveltech: "旅行科技",
    cloud: "企业级云架构",
    philosophy: "工程哲学",
    contact: "联系我们",
    cta: "发起架构咨询",
    status: "系统运行正常",
    menu: "菜单",
  },
  hero: {
    badge: "定制全栈工程 & 自有产品实验室",
    titleA: "将复杂假设，",
    titleB: "转化为可扩展的生产级代码。",
    sub: "机构级算法交易机器人、Apple/Google Wallet 旅行生态、以及高韧性的 AWS/Azure/GCP 云基座的架构师团队。",
    ctaPrimary: "探索产品",
    ctaSecondary: "预约技术发现",
    consoleTitle: "CandleQ · 实时执行遥测",
    consoleFeed: "执行数据流",
    consolePair: "外汇·主流货币",
    consoleVolatility: "在图表上移动光标 — 波动率将实时同步",
    consoleLatency: "执行延迟",
    scroll: "向下滚动探索",
  },
  bento: {
    kicker: "自有产品 & 核心能力",
    title: "我们是实验室，",
    titleAccent: "而非代理商。",
    sub: "多年交付机构级软件沉淀出的自有产品矩阵 —— 以及以同等标准为你构建系统的工程能力。",
    card1Tag: "金融科技实验室",
    card1Title: "CandleQ & 算法交易引擎",
    card1Desc: "面向系统化交易者的 iOS/Android 学习平台，加上以机构级严谨标准打造的 FX 与股票自动执行机器人。",
    card1F1: "FX·股票自动执行",
    card1F2: "策略回测引擎",
    card1F3: "交易员学院 App",
    card2Tag: "旅行科技平台",
    card2Title: "TourPass & 全球旅行 ERP",
    card2Desc: "Apple Wallet / Google Wallet 原生凭证基础设施，与完整旅行运营 ERP 融为一体。",
    card2Tagline: "通往世界的凭证，为无缝旅程而生。",
    card2Pass: "TOURPASS 登机凭证",
    card2Route: "ICN → NRT",
    card2Passenger: "旅客",
    card2Seat: "座位",
    card2Boarding: "登机",
    card3Tag: "企业级云 & 全栈",
    card3Title: "多云基础设施",
    card3Desc: "AWS / Azure / GCP 认证全栈交付。高并发数据库设计与实时 WebSocket 管线。",
    card3Pipelines: "WEBSOCKET 管线",
    card3Concurrency: "峰值并发",
    card4Tag: "客户工程",
    card4Title: "定制系统开发",
    card4Desc: "从模糊构想到稳固的生产系统 —— 一个对架构、实现与运维端到端负责的资深团队。",
    filterAll: "全部技术栈",
    filterFrontend: "前端",
    filterMobile: "移动端",
    filterBackend: "后端",
    filterInfra: "基础设施 & DevOps",
  },
  metrics: {
    items: [
      { value: 99.99, decimals: 2, suffix: "%", label: "架构可用性" },
      { value: 12, decimals: 0, suffix: "ms", label: "平均执行延迟" },
      { value: 3, decimals: 0, suffix: "", label: "多云原生 — AWS · Azure · GCP" },
      { value: 100, decimals: 0, suffix: "%", label: "机构级安全标准" },
      { value: 0, decimals: 0, suffix: "", label: "技术债务归零交付" },
    ],
  },
  philosophy: {
    kicker: "工程哲学",
    title: "我们以运行十年的标准构建系统。因为它确实会。",
    sub: "四项原则，支配我们触碰的每一个代码仓库。",
    principles: [
      {
        no: "01",
        title: "架构先于美学",
        body: "领域模型、故障模式与数据流在任何像素被绘制之前敲定。界面是系统的表达，而非反之。",
      },
      {
        no: "02",
        title: "延迟即功能",
        body: "低于 12ms 的执行路径、边缘复制的状态、WebSocket 管线 —— 这些不是优化项，而是产品的核心承诺。",
      },
      {
        no: "03",
        title: "从设计之初拒绝技术债",
        body: "类型化契约、基础设施即代码、覆盖每个分支的 CI 门禁。无法通过审计的代码，不配进入生产环境。",
      },
      {
        no: "04",
        title: "资深团队，零转手",
        body: "你与亲手写代码的首席架构师直接对话。没有客户经理，没有翻译层，没有被稀释的意图。",
      },
    ],
  },
  contact: {
    kicker: "联系我们",
    title: "准备好构建不可能了吗？",
    sub: "把被竞争对手称作不可能的假设带给我们。我们将定义范围、设计架构并交付上线。",
    cta: "打开技术简报",
    email: "architects@hokulio.com",
    note: "24 小时内回复 —— 由首席架构师，而非销售代表。",
  },
  drawer: {
    title: "技术简报",
    sub: "精简的项目简报表单。你将收到架构层面的回复，而非销售话术。",
    archNote: "直接与首席架构师沟通，而非销售代表。",
    projectType: "项目类型",
    types: ["交易机器人", "旅行 ERP", "云迁移", "移动应用"],
    name: "姓名",
    namePh: "Ada Lovelace",
    email: "工作邮箱",
    emailPh: "ada@fund.com",
    budget: "预算区间",
    budgets: ["$25k – $50k", "$50k – $150k", "$150k – $500k", "$500k+"],
    details: "系统背景",
    detailsPh: "描述问题领域、预期规模以及合规约束（如 MiFID II、PCI-DSS）…",
    submit: "传输简报",
    submitting: "传输中…",
    successTitle: "简报已接收。",
    successBody: "首席架构师将在 24 小时内回复。备查参考码：",
    successCode: "HK-REF",
    close: "关闭",
    toastTitle: "简报已传输",
    toastBody: "首席架构师将在 24 小时内与你联系。",
  },
  footer: {
    tagline: "定制全栈工程 & 自有产品实验室。",
    products: "产品",
    company: "公司",
    connect: "连接",
    rights: "© 2026 Hokulio Labs. 所有系统均为自主研发。",
    allSystems: "所有系统运行正常",
  },
};

export const DICTS: Record<Locale, Dict> = { en, ja, ko, zh };

/* ── Context ──────────────────────────────────────────────── */

interface LanguageCtx {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: Dict;
}

const Ctx = createContext<LanguageCtx>({
  locale: "en",
  setLocale: () => {},
  t: en,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    let raf = 0;
    try {
      const saved = window.localStorage.getItem("hk-locale") as Locale | null;
      if (saved && saved in DICTS) {
        // defer restoration to a frame callback: avoids cascading render on mount
        raf = requestAnimationFrame(() => setLocaleState(saved));
      }
    } catch {}
    return () => cancelAnimationFrame(raf);
  }, []);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    try {
      window.localStorage.setItem("hk-locale", l);
    } catch {}
  }, []);

  const value = useMemo(
    () => ({ locale, setLocale, t: DICTS[locale] }),
    [locale, setLocale]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useLanguage() {
  return useContext(Ctx);
}

/**
 * Locale-keyed cross-fade text. When the locale changes, the node re-mounts
 * with a soft blur+fade so content transitions without layout jump.
 */
export function FadeText({
  children,
  className,
  block = false,
}: {
  children: React.ReactNode;
  className?: string;
  block?: boolean;
}) {
  const { locale } = useLanguage();
  return (
    <motion.span
      key={locale}
      initial={{ opacity: 0, filter: "blur(6px)", y: 4 }}
      animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      style={{ display: block ? "block" : "inline-block" }}
    >
      {children}
    </motion.span>
  );
}
