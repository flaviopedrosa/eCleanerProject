# 📚 Documentação do eCleaner

Índice completo da documentação do projeto eCleaner.

## 🚀 Para Desenvolvedores

### Começando

- **[⚡ Quick Start](./README-dev.md)** - Comandos essenciais para desenvolvimento
- **[📖 Build e Execução](./build-e-execucao.md)** - Guia completo de compilação e deploy
- **[🚨 Troubleshooting](./troubleshooting.md)** - Soluções para problemas comuns

### Comandos Rápidos

```bash
npm run dev              # Desenvolvimento
npm run build           # Build produção
npm run build:obfuscated # Build seguro
npm start               # Servir aplicação
npm run test            # Executar testes
```

## 🏗️ Arquitetura

### Diagramas de Classes

- **[📊 Diagrama Completo](./diagrama-classes-completo.puml)** - Visão geral de todas as entidades
- **[📋 Diagrama Simplificado](./diagrama-classes.puml)** - Entidades principais

### Entidades de Domínio

- **[🛠️ Equipamento e ItemEquipamento](./entidade-equipamento-itemequipamento.md)** - Gestão de equipamentos

### Protocolos

- **[🔌 Model Context Protocol](./model-context-protocol.md)** - Documentação do MCP

## 📁 Estrutura do Projeto

```
ecleaner-project/
├── src/
│   ├── components/          # Componentes Vue reutilizáveis
│   ├── pages/              # Páginas da aplicação
│   ├── layouts/            # Layouts base
│   ├── router/             # Configuração de rotas
│   ├── stores/             # Pinia stores (estado global)
│   ├── i18n/               # Traduções PT-BR/EN
│   ├── css/                # Estilos globais (Sass)
│   ├── assets/             # Imagens e recursos estáticos
│   ├── boot/               # Plugins e configurações de boot
│   └── core/               # Lógica de negócio (DDD)
│       ├── domain/         # Entidades, enums, value objects
│       ├── application/    # Casos de uso
│       └── infrastructure/ # Repositórios e serviços
├── tests/                  # Testes unitários (Vitest)
├── docs/                   # Documentação (você está aqui!)
├── public/                 # Arquivos públicos
└── dist/                   # Build de produção
```

## 🎯 Fluxos de Trabalho

### Desenvolvimento

1. `npm run dev` - Iniciar desenvolvimento
2. Fazer alterações nos arquivos
3. Testar funcionalidades
4. `npm run test` - Executar testes
5. `npm run lint` - Verificar qualidade

### Deploy

1. `npm run build:obfuscated` - Build seguro
2. `npm start` - Testar localmente
3. Deploy da pasta `dist/spa/`
4. Configurar servidor web

## 🔧 Configurações

### Principais Arquivos

- **`package.json`** - Dependências e scripts
- **`quasar.config.js`** - Configuração do Quasar/Vite
- **`vitest.config.js`** - Configuração de testes
- **`eslint.config.js`** - Regras de lint
- **`src/css/app.sass`** - Estilos globais
- **`src/css/quasar.variables.sass`** - Variáveis de tema

### URLs Importantes

- **Desenvolvimento**: http://localhost:8080/
- **Produção**: http://localhost:8080/ (após `npm start`)
- **Build Output**: `dist/spa/`

## 📊 Métricas

### Performance

- **Bundle JS**: ~220 KB (~93 KB gzipped)
- **Bundle CSS**: ~196 KB (~35 KB gzipped)
- **Tempo de Build**: 7-8 segundos
- **Cobertura de Testes**: 146 testes passando

### Tecnologias

- **Vue 3** + Composition API
- **Quasar Framework** v2.18.2
- **Vite** v7.1.6 (build)
- **Vitest** v3.2.4 (testes)
- **Node.js** 20/22/24/26/28

## 🆘 Suporte

### Problemas Comuns

1. **Build não roda**: Ver [troubleshooting](./troubleshooting.md)
2. **Porta ocupada**: Quasar usa próxima disponível automaticamente
3. **Testes falhando**: Verificar imports com alias `@`
4. **Fontes não carregam**: Verificar Google Fonts no index.html

### Reset Completo

```bash
rm -rf node_modules package-lock.json dist
npm cache clean --force
npm install
npm run dev
```

---

**📅 Última atualização**: 1 de outubro de 2025  
**👥 Equipe**: eCleaner Development Team  
**🔗 Repositório**: eCleanerProject
