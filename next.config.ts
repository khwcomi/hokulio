import type { NextConfig } from "next";

// STATIC_EXPORT=1 로 빌드하면 GitHub Pages용 정적 내보내기(out/) 생성
const isStaticExport = process.env.STATIC_EXPORT === "1";

const nextConfig: NextConfig = {
  output: isStaticExport ? "export" : "standalone",
  // GitHub Pages 프로젝트 사이트 (https://khwcomi.github.io/hokulio/) —
  // 커스텀 도메인(hokulio.com) 연결 시 이 basePath를 제거할 것
  basePath: isStaticExport ? "/hokulio" : undefined,
  images: isStaticExport ? { unoptimized: true } : undefined,
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
};

export default nextConfig;
