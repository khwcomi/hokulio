#!/usr/bin/env bash
# GitHub Pages 배포 (gh-pages 브랜치 방식)
# 사용법: bash scripts/deploy-pages.sh
set -e
cd "$(dirname "$0")/.."

STATIC_EXPORT=1 npx next build
touch out/.nojekyll

cd out
git init -q -b gh-pages 2>/dev/null || git checkout -q gh-pages
git remote remove origin 2>/dev/null || true
git remote add origin https://github.com/khwcomi/hokulio.git
git add -A
git commit -q -m "deploy: $(date -u +%Y-%m-%dT%H:%M:%SZ)" || echo "no changes to deploy"

TOKEN=$(gh auth token)
AUTH=$(printf "x-access-token:%s" "$TOKEN" | base64 | tr -d '\n')
git -c http.extraheader="AUTHORIZATION: Basic $AUTH" push -q -f origin gh-pages
echo "Deployed: https://khwcomi.github.io/hokulio/"
