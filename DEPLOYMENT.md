# Déploiement en Production

## Prérequis
- Node.js installé
- pnpm installé
- PM2 installé: `npm install -g pm2`

## Déploiement initial

### 1. Build du projet
```bash
# Installation des dépendances
pnpm install

# Build Next.js
pnpm build

# Build API Express
pnpm build:api
```

### 2. Démarrage avec PM2
```bash
# Démarrer les deux serveurs
pm2 start ecosystem.config.js

# Vérifier le statut
pm2 status

# Voir les logs
pm2 logs

# Redémarrer
pm2 restart all

# Arrêter
pm2 stop all
```

### 3. Script de déploiement automatique
```bash
# Rendre le script exécutable (Linux/Mac)
chmod +x deploy.sh

# Exécuter le déploiement
./deploy.sh
```

## Configuration

### Ports
- **Frontend (Next.js)**: Port 3000
- **API (Express)**: Port 4001

### Variables d'environnement
Créer un fichier `.env` avec:
```
DATABASE_URL="file:./prisma/dev.db"
PORT=3000
API_PORT=4001
JWT_SECRET="ton-secret-jwt-securise"
```

## Commandes utiles PM2

```bash
# Voir les logs en temps réel
pm2 logs

# Logs d'une app spécifique
pm2 logs asontop-frontend
pm2 logs asontop-api

# Monitoring
pm2 monit

# Sauvegarder la configuration
pm2 save

# Auto-démarrage au boot
pm2 startup
pm2 save

# Supprimer toutes les apps
pm2 delete all
```

## Résolution des problèmes

### Bad Gateway
1. Vérifier que les deux serveurs tournent: `pm2 status`
2. Vérifier les logs: `pm2 logs`
3. Redémarrer les serveurs: `pm2 restart all`

### Port déjà utilisé
```bash
# Trouver le processus
lsof -i :3000
lsof -i :4001

# Tuer le processus
kill -9 <PID>
```

## Mise à jour

```bash
# Pull les changements
git pull

# Rebuild
pnpm build
pnpm build:api

# Redémarrer
pm2 restart all
```
