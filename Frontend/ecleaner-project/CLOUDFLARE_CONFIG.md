# Configuração Cloudflare Pages - eCleaner

## 🚀 Configurações de Deploy

### Configurações do Projeto no Cloudflare Pages

```
Nome do Projeto: ecleaner-app
Branch de Produção: main
Comando de Build: cd Frontend/ecleaner-project && npm install && npm run build:cloudflare
Diretório de Output: Frontend/ecleaner-project/dist/spa
Diretório Raiz: / (ou deixar em branco)
```

### Variáveis de Ambiente (se necessário)

```
NODE_VERSION=18
NPM_FLAGS=--production=false
```

## 📁 Arquivos de Configuração

### `_redirects` ✅

```
/* /index.html 200
```

### `_headers` ✅

- Headers de segurança
- Cache para assets estáticos
- No-cache para HTML

## ⚙️ Configurações Aplicadas

- ✅ Vue Router em modo `history`
- ✅ Public Path configurado para `/`
- ✅ Build otimizado e obfuscado
- ✅ Redirects SPA configurados
- ✅ Headers de segurança e cache

## 🔧 Scripts Disponíveis

```bash
npm run build:cloudflare    # Build otimizado para Cloudflare
npm run build              # Build normal
npm run build:debug        # Build com source maps
```

## 🌐 URLs de Teste

- Produção: `https://ecleaner-app.pages.dev`
- Local: `http://127.0.0.1:8086`

## ✅ Checklist Final

- [ ] Repositório conectado ao Cloudflare Pages
- [ ] Configurações de build aplicadas
- [ ] Primeiro deploy realizado com sucesso
- [ ] Testes de navegação funcionando
- [ ] Domínio customizado configurado (opcional)
