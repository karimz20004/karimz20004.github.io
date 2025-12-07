#!/bin/bash

echo "🚀 Déploiement asontop en production..."

# Installation des dépendances
echo "📦 Installation des dépendances..."
pnpm install

# Build du projet
echo "🔨 Build Next.js..."
pnpm build

echo "🔨 Build API Express..."
pnpm build:api

# Démarrage avec PM2
echo "▶️  Démarrage des serveurs avec PM2..."
pm2 delete all 2>/dev/null || true
pm2 start ecosystem.config.js

echo "✅ Déploiement terminé!"
echo ""
echo "📊 Statut des serveurs:"
pm2 status

echo ""
echo "🌐 URLs:"
echo "   Frontend: http://localhost:3000"
echo "   API:      http://localhost:4001"
