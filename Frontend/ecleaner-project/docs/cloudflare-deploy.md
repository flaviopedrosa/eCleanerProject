# Deploy no Cloudflare Pages - eCleaner App

Este guia explica como fazer o deploy da aplicação eCleaner no Cloudflare Pages.

## 📋 Pré-requisitos

- Conta no Cloudflare
- Repositório Git (GitHub, GitLab, etc.)
- Node.js instalado localmente

## 🚀 Métodos de Deploy

### Método 1: Deploy Automático via Git (Recomendado)

#### 1. Preparar o Repositório

```bash
# 1. Navegar para o diretório do projeto
cd Frontend/ecleaner-project

# 2. Fazer build para produção
npm run build:cloudflare

# 3. Commit das alterações
git add .
git commit -m "Configure for Cloudflare Pages deployment"
git push origin main
```

#### 2. Configurar no Cloudflare Pages

1. **Acesse o Cloudflare Dashboard**
   - Entre em: https://dash.cloudflare.com
   - Vá para: `Pages` > `Create a project`

2. **Conectar Repositório Git**
   - Selecione: `Connect to Git`
   - Escolha seu provedor Git (GitHub, GitLab, etc.)
   - Autorize o Cloudflare a acessar seu repositório
   - Selecione o repositório `eCleanerProject`

3. **Configurações de Build**

   ```
   Project name: ecleaner-app
   Production branch: main
   Build command: cd Frontend/ecleaner-project && npm install && npm run build:cloudflare
   Build output directory: Frontend/ecleaner-project/dist/spa
   Root directory (advanced): / (deixar vazio ou raiz)
   ```

4. **Variáveis de Ambiente** (se necessário)
   ```
   NODE_VERSION: 18
   NPM_FLAGS: --production=false
   ```

#### 3. Deploy

- Clique em `Save and Deploy`
- O Cloudflare irá automaticamente fazer o build e deploy
- URL será algo como: `https://ecleaner-app.pages.dev`

### Método 2: Deploy Manual

#### 1. Fazer Build Local

```bash
cd Frontend/ecleaner-project
npm install
npm run build:cloudflare
```

#### 2. Upload Manual

1. No Cloudflare Dashboard: `Pages` > `Upload assets`
2. Arraste a pasta `Frontend/ecleaner-project/dist/spa`
3. Configure o nome do projeto
4. Clique em `Deploy site`

## ⚙️ Configurações Importantes

### Arquivos de Configuração Criados

#### `_redirects`

```
/* /index.html 200
```

- **Função**: Redireciona todas as rotas para `index.html` (necessário para SPAs)
- **Localização**: `public/_redirects`

#### `_headers`

- **Função**: Configurações de cache e segurança
- **Localização**: `public/_headers`
- **Inclui**: Headers de segurança, cache para assets, no-cache para HTML

### Configurações do Quasar Ajustadas

1. **Vue Router Mode**: Alterado de `hash` para `history`
   - Melhor para SEO
   - URLs mais limpas
   - Funciona bem com `_redirects`

2. **Public Path**: Configurado para `/`
   - Garante que assets sejam carregados corretamente

## 🔧 Scripts Disponíveis

```bash
# Build otimizado para Cloudflare
npm run build:cloudflare

# Build normal
npm run build

# Build com debug (source maps)
npm run build:debug

# Desenvolvimento local
npm run dev

# Testar build localmente
npm run serve
```

## 🌐 Domínio Customizado

### Configurar Domínio Próprio

1. **No Cloudflare Pages**:
   - Vá para seu projeto
   - `Custom domains` > `Set up a custom domain`
   - Digite seu domínio (ex: `app.ecleaner.com`)

2. **Configurar DNS**:
   - No Cloudflare DNS (se o domínio estiver no Cloudflare):
     ```
     Type: CNAME
     Name: app (ou subdomain desejado)
     Target: ecleaner-app.pages.dev
     ```
   - Ou adicione os nameservers do Cloudflare no seu registrador

## 🔍 Verificações Pós-Deploy

### Checklist de Verificação

- [ ] ✅ Aplicação carrega na URL do Cloudflare
- [ ] ✅ Navegação entre páginas funciona (Vue Router history mode)
- [ ] ✅ Assets estáticos carregam (CSS, JS, imagens)
- [ ] ✅ Ícones e fontes carregam corretamente
- [ ] ✅ Console sem erros 404
- [ ] ✅ Obfuscação aplicada (verificar no DevTools)

### Testes de Funcionalidade

```bash
# Testar rotas principais
https://seu-app.pages.dev/
https://seu-app.pages.dev/login
https://seu-app.pages.dev/clientes
https://seu-app.pages.dev/colaboradores
```

## 🐛 Troubleshooting

### Problemas Comuns

1. **Erro 404 em rotas**:
   - Verifique se `_redirects` está na pasta `public/`
   - Confirme que `vueRouterMode: 'history'` no `quasar.config.js`

2. **Assets não carregam**:
   - Verifique `publicPath: '/'` no `quasar.config.js`
   - Confirme que build output directory está correto

3. **Build falha**:
   - Verifique `NODE_VERSION` nas variáveis de ambiente
   - Confirme que o caminho de build está correto

4. **Cache de assets antigos**:
   - Os nomes de arquivo incluem hash (ex: `index-DlGl43zo.js`)
   - Cache busting automático ativado

## 📊 Monitoramento

### Analytics e Monitoramento

1. **Cloudflare Analytics**:
   - Dashboard do projeto > `Analytics`
   - Métricas de tráfego, performance, etc.

2. **Real User Monitoring (RUM)**:
   - Disponível nos planos pagos do Cloudflare
   - Métricas detalhadas de performance

### Logs de Deploy

- `Functions` > `Real-time Logs` (se usando Functions)
- `Pages` > Projeto > `Deployments` > Logs de cada deploy

## 🔄 Atualizações Automáticas

Com deploy via Git configurado:

1. **Faça alterações no código**
2. **Commit e push para main**:
   ```bash
   git add .
   git commit -m "Nova funcionalidade"
   git push origin main
   ```
3. **Deploy automático**: Cloudflare detecta mudanças e faz novo deploy

## 📱 PWA (Progressive Web App)

Para transformar em PWA no futuro:

1. Adicionar `@quasar/quasar-app-extension-qpwa`
2. Configurar service worker
3. Adicionar manifest.json
4. Cloudflare Pages suporta PWAs nativamente

---

## 📞 Suporte

- **Cloudflare Docs**: https://developers.cloudflare.com/pages/
- **Quasar Docs**: https://quasar.dev/
- **Problemas do projeto**: Criar issue no repositório Git
