# 🛠️ Guia de Build e Execução - eCleaner

Este documento contém todas as instruções para executar, compilar e implantar o projeto eCleaner.

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js**: versão 20, 22, 24, 26 ou 28
- **npm**: versão 6.13.4 ou superior
- **Git**: para controle de versão

## 🚀 Instalação das Dependências

```bash
# Navegar para o diretório do projeto
cd "C:\Projetos\ecleaner\Frontend\ecleaner-project"

# Instalar todas as dependências
npm install
```

## 🔧 Comandos de Desenvolvimento

### Iniciar servidor de desenvolvimento

```bash
npm run dev
```

**Descrição**: Inicia o servidor de desenvolvimento com hot reload  
**URL**: http://localhost:8080/ (ou 8081 se 8080 estiver ocupado)  
**Características**:

- ✅ Hot reload automático quando arquivos são modificados
- ✅ Source maps para debug
- ✅ DevTools integrado
- ✅ Não é obfuscado nem minificado

---

## 🏗️ Comandos de Build (Compilação)

### Build para produção (padrão)

```bash
npm run build
```

**Descrição**: Compila o projeto para produção com otimizações padrão  
**Saída**: `dist/spa/`  
**Características**:

- ✅ Código minificado
- ✅ Arquivos otimizados
- ✅ Gzip habilitado

### Build para debug/depuração

```bash
npm run build:debug
```

**Descrição**: Compila o projeto para produção mas mantém capacidade de debug  
**Saída**: `dist/spa/`  
**Características**:

- ✅ Source maps preservados
- ✅ Código não minificado
- ✅ Sem obfuscação JavaScript
- ✅ Variáveis preservadas para debug
- ⚠️ Tamanho maior dos arquivos
- 🔧 Ideal para debugging em produção
- ✅ Remoção de código morto (tree shaking)
- ⏱️ Tempo: ~7-8 segundos

### Build obfuscado (segurança máxima)

```bash
npm run build:obfuscated
```

**Descrição**: Compila com obfuscação avançada de código  
**Saída**: `dist/spa/`  
**Características**:

- ✅ Todas as características do build padrão
- ✅ **Código JavaScript obfuscado**
- ✅ **Variáveis e funções renomeadas**
- ✅ **Strings codificadas em Base64**
- ✅ **Control Flow Flattening**
- ✅ **Debug Protection**
- ✅ **Self Defending**
- ✅ **Dead Code Injection**
- ✅ **Console logs removidos**
- 🔒 **Ideal para proteção contra engenharia reversa**

---

## 🌐 Comandos de Servidor (Produção)

### Servir com http-server (recomendado)

```bash
npm start
```

**Descrição**: Serve a aplicação builada usando http-server  
**URL**: http://localhost:8080/  
**Características**:

- ✅ Cache desabilitado (`-c-1`)
- ✅ Ideal para testes de produção
- ✅ Simples e rápido
- ✅ CORS habilitado se necessário

### Servir build debug

```bash
npm run start:debug
```

**Descrição**: Serve a versão debug da aplicação  
**URL**: http://localhost:8090/  
**Características**:

- ✅ Acesso aos source maps
- ✅ DevTools funcional
- ✅ Debug de código em produção
- 🔧 Porta diferente (8090) para evitar conflitos

### Servir com Quasar CLI (alternativo)

```bash
npm run serve
```

**Descrição**: Serve a aplicação usando o servidor interno do Quasar  
**URL**: http://localhost:4000/ (padrão do Quasar)  
**Características**:

- ✅ Suporte ao modo history do Vue Router
- ✅ Configurações avançadas
- ✅ Integração nativa com Quasar

### Servir debug com Quasar CLI

```bash
npm run serve:debug
```

**Descrição**: Serve a versão debug usando Quasar CLI  
**URL**: http://localhost:8090/  
**Características**:

- ✅ Source maps disponíveis
- ✅ Suporte ao modo history
- ✅ Porta dedicada para debug

---

## 🧪 Comandos de Teste

### Executar todos os testes

```bash
npm run test
```

**Descrição**: Executa todos os testes unitários com Vitest  
**Características**:

- ✅ Testes das entidades de domínio
- ✅ Testes de validação
- ✅ Testes de seeds
- ✅ Relatório de cobertura
- ✅ Ambiente jsdom para simulação do browser

### Executar testes em modo watch

```bash
npx vitest
```

**Descrição**: Executa testes continuamente ao modificar arquivos  
**Características**:

- ✅ Re-execução automática
- ✅ Ideal para desenvolvimento TDD

---

## 🛠️ Comandos de Manutenção

### Verificar qualidade do código

```bash
npm run lint
```

**Descrição**: Analisa o código em busca de problemas de sintaxe e estilo  
**Características**:

- ✅ ESLint com configuração Vue 3
- ✅ Verifica arquivos .js, .vue, .mjs, .cjs
- ✅ Relatório de erros e warnings

### Formatar código automaticamente

```bash
npm run format
```

**Descrição**: Formata automaticamente todos os arquivos do projeto  
**Características**:

- ✅ Prettier para formatação consistente
- ✅ Formata .js, .vue, .html, .md, .json
- ✅ Ignora arquivos do .gitignore

---

## 📁 Estrutura de Saída

Após executar `npm run build` ou `npm run build:obfuscated`, os arquivos são gerados em:

```
dist/spa/
├── index.html              # Página principal (1.12 KB)
├── favicon.ico             # Ícone do site
├── icons/                  # Ícones da aplicação
│   ├── favicon-16x16.png
│   ├── favicon-32x32.png
│   ├── favicon-96x96.png
│   └── favicon-128x128.png
└── assets/
    ├── index-[hash].js     # JavaScript principal (~220 KB)
    ├── index-[hash].css    # CSS principal (~196 KB)
    └── [fontes-woff/woff2] # Fontes do Google Fonts
```

## 📊 Métricas de Performance

### Build Padrão:

- **JavaScript**: 219.95 KB (93.05 KB gzipped)
- **CSS**: 195.88 KB (34.61 KB gzipped)
- **Total**: ~415 KB (~127 KB gzipped)

### Build Obfuscado:

- **JavaScript**: 211.49 KB (87.06 KB gzipped) - otimizado!
- **CSS**: 195.88 KB (34.61 KB gzipped)
- **Total**: ~407 KB (~121 KB gzipped)

## 🌍 Configurações de Fonte

O projeto utiliza **100% fontes online** do Google Fonts:

- **Montserrat** (principal): 300, 400, 500, 600, 700
- **Open Sans**: 300, 400, 600, 700
- **Roboto**: 300, 400, 500, 700
- **Source Code Pro**: 400, 500, 600
- **Playfair Display**: 400, 700

## 🚨 Solução de Problemas

### Erro: "Cannot find module"

```bash
# Limpar cache e reinstalar dependências
rm -rf node_modules package-lock.json
npm install
```

### Erro: "Port already in use"

- O servidor automaticamente usará a próxima porta disponível
- Para desenvolvimento: 8080 → 8081 → 8082...
- Para produção: altere a porta em `package.json`

### Build falha

```bash
# Verificar se há erros de lint primeiro
npm run lint

# Limpar cache do Quasar
npx quasar clean
```

---

## � Debugging e Depuração

### Como debugar um build de produção:

1. **Compilar versão debug:**

```bash
npm run build:debug
```

2. **Servir a versão debug:**

```bash
npm run start:debug
```

3. **Abrir no navegador:**

- URL: http://localhost:8090/
- Abrir DevTools (F12)
- Na aba "Sources", você verá:
  - ✅ Código fonte original (não minificado)
  - ✅ Source maps funcionais
  - ✅ Breakpoints funcionam normalmente
  - ✅ Variáveis preservadas com nomes originais

### Diferenças entre builds:

| Característica   | Dev    | Build   | Build Debug | Build Obfuscated |
| ---------------- | ------ | ------- | ----------- | ---------------- |
| Minificação      | ❌     | ✅      | ❌          | ✅               |
| Source Maps      | ✅     | ❌      | ✅          | ❌               |
| Obfuscação       | ❌     | ❌      | ❌          | ✅               |
| Debug Protection | ❌     | ❌      | ❌          | ✅               |
| Tamanho          | Grande | Pequeno | Médio       | Pequeno          |
| Velocidade Build | Rápido | Médio   | Médio       | Lento            |
| Debugging        | Fácil  | Difícil | Fácil       | Impossível       |

### Quando usar cada build:

- **`npm run dev`**: Desenvolvimento diário
- **`npm run build`**: Produção normal
- **`npm run build:debug`**: Debug de problemas em produção
- **`npm run build:obfuscated`**: Produção com segurança máxima

### Exemplo prático de debugging:

1. **Compilar versão debug:**

```bash
npm run build:debug
```

2. **Servir a versão debug:**

```bash
npm run start:debug
```

3. **Abrir no navegador:**

- URL: http://localhost:8090/
- Abrir DevTools (F12)
- Na aba "Sources", você verá:
  - ✅ Código fonte original (não minificado)
  - ✅ Source maps funcionais
  - ✅ Breakpoints funcionam normalmente
  - ✅ Variáveis preservadas com nomes originais

4. **Debuggar o código:**

- Navegue até `Sources > webpack://ecleaner-project/src/`
- Encontre o arquivo que deseja debuggar (ex: `pages/ClienteListagemPage.vue`)
- Coloque breakpoints clicando nos números das linhas
- Os breakpoints vão parar no código original Vue/JS

---

## �📝 Scripts Completos

```json
{
  "scripts": {
    "dev": "quasar dev", // Desenvolvimento
    "build": "quasar build", // Build produção
    "build:debug": "cross-env BUILD_DEBUG=true quasar build", // Build debug
    "build:obfuscated": "quasar build", // Build obfuscado
    "serve": "quasar serve dist/spa --history", // Servir (Quasar)
    "serve:debug": "quasar serve dist/spa --history --port 8090", // Servir debug
    "start": "http-server dist/spa -p 8080 -c-1", // Servir (http-server)
    "start:debug": "http-server dist/spa -p 8090 -c-1", // Servir debug
    "test": "vitest run", // Testes
    "lint": "eslint ...", // Verificar código
    "format": "prettier --write ..." // Formatar código
  }
}
```

## 🎯 Fluxo de Trabalho Recomendado

### Para Desenvolvimento:

1. `npm install` (primeira vez)
2. `npm run dev` (iniciar desenvolvimento)
3. `npm run test` (executar testes)
4. `npm run lint` (verificar qualidade)

### Para Produção:

1. `npm run build:obfuscated` (compilar com segurança)
2. `npm start` (testar localmente)
3. Implantar pasta `dist/spa/` no servidor

---

**📅 Última atualização**: 1 de outubro de 2025  
**🔗 Projeto**: eCleaner - Sistema de Gestão para Empresas de Limpeza
