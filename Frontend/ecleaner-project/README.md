# 🧹 eCleaner App

Sistema de gestão completo para empresas de limpeza, desenvolvido com Vue 3 + Quasar Framework.

## 🚀 Quick Start

```bash
# Instalar dependências
npm install

# Desenvolvimento
npm run dev

# Build para produção (obfuscado)
npm run build:obfuscated

# Build para debug
npm run build:debug

# Servir aplicação
npm start

# Servir versão debug
npm run start:debug
```

## 📚 Documentação Completa

- **[📖 Guia de Build e Execução](./docs/build-e-execucao.md)** - Instruções detalhadas de compilação e deploy
- **[⚡ Quick Start para Devs](./docs/README-dev.md)** - Referência rápida para desenvolvedores
- **[🚨 Troubleshooting](./docs/troubleshooting.md)** - Soluções para problemas comuns

## 🔧 Configurações de Build

### Builds Disponíveis:

| Comando                    | Descrição       | Source Maps | Obfuscação | Minificação | Uso                    |
| -------------------------- | --------------- | ----------- | ---------- | ----------- | ---------------------- |
| `npm run dev`              | Desenvolvimento | ✅          | ❌         | ❌          | Desenvolvimento diário |
| `npm run build`            | Produção padrão | ❌          | ❌         | ✅          | Deploy básico          |
| `npm run build:debug`      | Debug produção  | ✅          | ❌         | ❌          | Debug em produção      |
| `npm run build:obfuscated` | Produção segura | ❌          | ✅         | ✅          | Deploy com segurança   |

### Servidores:

- **Dev**: `http://localhost:8080` (hot reload)
- **Produção**: `http://localhost:8080` (build normal)
- **Debug**: `http://localhost:8090` (com source maps)

## 🛠️ Stack Tecnológica

- **Vue 3** - Framework JavaScript reativo
- **Quasar Framework** - UI components e build system
- **Vite** - Build tool ultrarrápido
- **Pinia** - Gerenciamento de estado
- **Vue Router** - Roteamento SPA
- **Vue I18n** - Internacionalização (PT-BR/EN)
- **Vitest** - Framework de testes
- **ESLint + Prettier** - Qualidade de código

## 🎯 Funcionalidades

- ✅ **Gestão de Clientes** - Cadastro e histórico completo
- ✅ **Agendamento de Serviços** - Sistema de scheduling avançado
- ✅ **Equipes e Colaboradores** - Gerenciamento de recursos humanos
- ✅ **Orçamentos e Pagamentos** - Controle financeiro
- ✅ **Materiais e Estoque** - Controle de suprimentos
- ✅ **Autenticação** - Sistema de login seguro
- ✅ **Responsivo** - Interface adaptável para mobile/desktop

```bash
yarn lint
# or
npm run lint
```

### Format the files

```bash
yarn format
# or
npm run format
```

### Build the app for production

```bash
quasar build
```

### Customize the configuration

See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-vite/quasar-config-js).
