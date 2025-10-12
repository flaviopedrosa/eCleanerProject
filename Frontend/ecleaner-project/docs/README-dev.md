# 🚀 Quick Start - eCleaner

Guia rápido para desenvolvedores. Para documentação completa, veja [`build-e-execucao.md`](./build-e-execucao.md).

## ⚡ Comandos Essenciais

```bash
# 📦 Instalar dependências
npm install

# 🔥 Desenvolvimento (hot reload)
npm run dev

# 🏗️ Build para produção
npm run build

# 🔒 Build obfuscado (proteção máxima)
npm run build:obfuscated

# 🌐 Servir aplicação builada
npm start

# 🧪 Executar testes
npm run test
```

## 📁 URLs

- **Desenvolvimento**: http://localhost:8080/
- **Produção**: http://localhost:8080/ (após `npm start`)
- **Build output**: `dist/spa/`

## 🛠️ Stack Tecnológica

- **Framework**: Vue 3 + Quasar Framework
- **Build**: Vite + Quasar CLI
- **Testes**: Vitest + jsdom
- **Lint**: ESLint + Prettier
- **Obfuscação**: vite-plugin-javascript-obfuscator
- **Fontes**: Google Fonts (Montserrat principal)

## 📋 Checklist de Deploy

- [ ] `npm run lint` ✅ Sem erros
- [ ] `npm run test` ✅ Todos os testes passando
- [ ] `npm run build:obfuscated` ✅ Build bem-sucedido
- [ ] `npm start` ✅ Aplicação funcionando
- [ ] Deploy da pasta `dist/spa/`

---

**Para mais detalhes, consulte [`build-e-execucao.md`](./build-e-execucao.md)**
