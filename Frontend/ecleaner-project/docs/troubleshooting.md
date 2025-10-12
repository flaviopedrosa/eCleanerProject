# 🚨 Troubleshooting - eCleaner

Soluções para problemas comuns durante desenvolvimento e build.

## 🔧 Problemas de Build

### ❌ "Cannot find module '../../../core/...'"

**Problema**: Imports com caminhos incorretos nos testes  
**Solução**:

```bash
# O projeto já usa alias @ para imports
import { seedClientes } from '@/core/infrastructure/repositories/seeds/clienteSeed'
```

### ❌ "Unknown mode 'production'"

**Problema**: Comando `build:obfuscated` com parâmetro incorreto  
**Solução**: Verificar `package.json`:

```json
{
  "build:obfuscated": "quasar build" // ✅ Correto
  // NÃO usar: "quasar build --mode production"  // ❌ Incorreto
}
```

### ❌ "Vitest not found"

**Problema**: Vitest não instalado  
**Solução**:

```bash
npm install --save-dev vitest @vitest/ui jsdom
```

## 🌐 Problemas de Servidor

### ❌ "Port 8080 already in use"

**Problema**: Porta ocupada  
**Soluções**:

```bash
# Opção 1: O Quasar automaticamente usa próxima porta disponível
npm run dev  # Usará 8081, 8082, etc.

# Opção 2: Parar processos Node.js
Get-Process | Where-Object { $_.ProcessName -eq "node" } | Stop-Process -Force

# Opção 3: Alterar porta no quasar.config.js
devServer: {
  port: 9000  // Usar porta diferente
}
```

### ❌ "Cannot GET /" após build

**Problema**: Arquivos de build não estão sendo servidos corretamente  
**Soluções**:

```bash
# Opção 1: Usar npm start (recomendado)
npm start

# Opção 2: Usar Quasar serve
npm run serve

# Opção 3: Verificar se build foi executado
npm run build
ls dist/spa/  # Verificar se arquivos existem
```

## 📱 Problemas de Fontes

### ❌ Fontes não carregando

**Problema**: Referências incorretas ou conflitos  
**Verificações**:

```bash
# 1. Verificar se Google Fonts está no index.html
grep "fonts.googleapis.com" index.html

# 2. Verificar se Roboto foi removido do quasar.config.js
# extras: [
#   // 'roboto-font',  // ✅ Deve estar comentado
#   'material-icons'
# ]

# 3. Verificar CSS global em app.sass
# font-family: 'Montserrat', sans-serif
```

## 🧪 Problemas de Teste

### ❌ "Cannot resolve '@/...'"

**Problema**: Alias @ não configurado no Vitest  
**Solução**: Verificar `vitest.config.js`:

```javascript
export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
```

### ❌ Testes falhando após mudanças

**Problema**: Cache ou dependências desatualizadas  
**Soluções**:

```bash
# Limpar cache do Vitest
npx vitest run --reporter=verbose --no-cache

# Reinstalar dependências
rm -rf node_modules package-lock.json
npm install
```

## 🔒 Problemas de Obfuscação

### ❌ Build obfuscado muito lento

**Problema**: Configurações de obfuscação muito agressivas  
**Solução**: Ajustar `quasar.config.js`:

```javascript
// Reduzir agressividade para builds mais rápidos
;(JavaScriptObfuscator,
  {
    options: {
      compact: true,
      controlFlowFlattening: false, // Desabilitar para acelerar
      deadCodeInjection: false, // Desabilitar para acelerar
      // ... outras opções
    },
  })
```

### ❌ Aplicação quebra após obfuscação

**Problema**: Obfuscação muito agressiva quebrando funcionalidades  
**Solução**: Ajustar configurações:

```javascript
options: {
  // Configurações mais seguras
  renameGlobals: false,
  selfDefending: false,
  debugProtection: false
}
```

## 💾 Problemas de Dependências

### ❌ "Module not found" após npm install

**Problema**: Cache corrompido ou versões incompatíveis  
**Soluções**:

```bash
# Limpar tudo e reinstalar
rm -rf node_modules package-lock.json
npm cache clean --force
npm install

# Verificar versões Node.js
node --version  # Deve ser 20, 22, 24, 26 ou 28
npm --version   # Deve ser >= 6.13.4
```

### ❌ Dependências vulneráveis

**Problema**: Alertas de segurança  
**Soluções**:

```bash
# Auditar vulnerabilidades
npm audit

# Corrigir automaticamente
npm audit fix

# Atualizar dependências
npm update
```

## 🔍 Debug e Logging

### Habilitar logs detalhados

```bash
# Debug do Quasar
DEBUG=quasar:* npm run dev

# Debug do Vite
DEBUG=vite:* npm run build

# Logs verbosos do npm
npm run build --verbose
```

### Verificar configurações

```bash
# Verificar configuração do Quasar
npx quasar info

# Verificar dependências instaladas
npm list --depth=0

# Verificar scripts disponíveis
npm run
```

## 📊 Performance

### Build muito lento

**Soluções**:

```bash
# 1. Desabilitar obfuscação durante desenvolvimento
npm run build  # Em vez de build:obfuscated

# 2. Usar cache do Vite
# (já habilitado por padrão)

# 3. Verificar SSD e RAM disponível
# Build requer ~2GB RAM e beneficia de SSD
```

### Bundle muito grande

**Verificações**:

```bash
# Análise de bundle
npm run build -- --analyze

# Verificar imports desnecessários
# Evitar: import _ from 'lodash'
# Usar: import { debounce } from 'lodash'
```

## 🆘 Reset Completo

Se nada funciona, reset completo:

```bash
# 1. Parar todos os processos
Get-Process | Where-Object { $_.ProcessName -eq "node" } | Stop-Process -Force

# 2. Limpar tudo
rm -rf node_modules package-lock.json dist .quasar

# 3. Limpar cache
npm cache clean --force

# 4. Reinstalar
npm install

# 5. Testar
npm run dev
```

---

**📞 Precisa de mais ajuda?**  
Consulte a [documentação completa](./build-e-execucao.md) ou verifique os logs de erro específicos.
