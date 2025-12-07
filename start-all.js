import { spawn } from 'child_process';

console.log('🚀 Démarrage des serveurs asontop...\n');

// Démarrer l'API Express
console.log('📡 Démarrage API Express...');
const api = spawn('node', ['dist/server.js'], {
  stdio: 'inherit',
  shell: true,
  env: { ...process.env }
});

api.on('error', (err) => {
  console.error('❌ Erreur API:', err);
  process.exit(1);
});

api.on('exit', (code) => {
  if (code !== 0) {
    console.error(`❌ API terminée avec le code ${code}`);
    process.exit(code);
  }
});

// Attendre que l'API démarre
setTimeout(() => {
  console.log('🌐 Démarrage Next.js...');
  const frontend = spawn('node', ['node_modules/next/dist/bin/next', 'start'], {
    stdio: 'inherit',
    shell: true,
    env: { ...process.env }
  });

  frontend.on('error', (err) => {
    console.error('❌ Erreur Frontend:', err);
    api.kill();
    process.exit(1);
  });

  frontend.on('exit', (code) => {
    if (code !== 0) {
      console.error(`❌ Frontend terminé avec le code ${code}`);
      api.kill();
      process.exit(code);
    }
  });

  // Arrêt propre
  const cleanup = () => {
    console.log('\n🛑 Arrêt des serveurs...');
    frontend.kill('SIGTERM');
    api.kill('SIGTERM');
    setTimeout(() => process.exit(0), 1000);
  };

  process.on('SIGINT', cleanup);
  process.on('SIGTERM', cleanup);
}, 3000);
