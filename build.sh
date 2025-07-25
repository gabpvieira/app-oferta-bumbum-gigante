#!/bin/bash

echo "🚀 Preparando build para produção..."

# Limpar builds anteriores
echo "🧹 Limpando builds anteriores..."
rm -rf dist client/dist

# Build do cliente
echo "📦 Fazendo build do cliente..."
cd client
npm run build
cd ..

# Build do servidor
echo "🖥️ Fazendo build do servidor..."
npx esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist --minify

# Copiar assets necessários
echo "📁 Copiando assets..."
cp -r public/* client/dist/
cp package.json dist/
cp replit.md dist/

# Otimizar build
echo "⚡ Otimizando para produção..."
# Remover source maps em produção se necessário
find client/dist -name "*.map" -delete

echo "✅ Build concluído! Pronto para deploy."
echo "📂 Arquivos em: client/dist (frontend) e dist (backend)"