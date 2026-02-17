# Sistema de Contratos de Prestação de Serviço - Especificação Técnica

**Versão:** 1.0  
**Data:** 3 de fevereiro de 2026  
**Autor:** Equipe de Desenvolvimento eClaner

---

## 1. Visão Geral

Sistema para geração, gerenciamento e assinatura digital de contratos de prestação de serviço a partir de orçamentos aprovados, com suporte multinacional e fluxo de aprovação eletrônica.

### 1.1. Objetivos

- Automatizar a criação de contratos a partir de orçamentos aprovados
- Suportar assinatura digital de clientes em diferentes países
- Prover rastreabilidade completa do processo de assinatura
- Gerar PDFs profissionais com dados da empresa e cliente
- Facilitar envio e assinatura via link público
- Manter histórico de contratos com seus status

### 1.2. Escopo

**Incluído:**

- Criação automática de contrato após aprovação de orçamento
- Geração de PDF de contrato com template multinacional
- Assinatura digital com hash SHA-256
- Envio de email com link de assinatura
- Página pública para assinatura do cliente
- Suporte a múltiplos tipos de documentos (CPF, SSN, Passport, etc.)
- Suporte a idiomas: pt-BR e en-US

**Não incluído:**

- Integração com provedores de assinatura digital certificada (DocuSign, ClickSign)
- Assinatura eletrônica com certificado digital ICP-Brasil
- Armazenamento em blockchain
- Reconhecimento de firma em cartório

---

## 2. Requisitos Funcionais

### RF01 - Criação de Contrato a partir de Orçamento

**Descrição:** Quando um orçamento for aprovado, o sistema deve criar automaticamente um contrato associado.

**Critérios de Aceitação:**

- Contrato criado com status `RASCUNHO`
- Número do contrato gerado automaticamente (formato: `CONT-YYYY-NNNN`)
- Texto do contrato preenchido com template padrão
- Dados do orçamento (cliente, imóvel, itens, valores) copiados para o contrato
- Data de emissão igual à data de aprovação do orçamento

**Regras de Negócio:**

- RN01: Apenas orçamentos com status `APROVADO` podem gerar contratos
- RN02: Um orçamento pode ter apenas um contrato ativo
- RN03: Se já existir contrato para o orçamento, retornar o existente

### RF02 - Gerenciamento de Status do Contrato

**Descrição:** Contrato deve transitar por diferentes status conforme o fluxo de assinatura.

**Status Possíveis:**

- `RASCUNHO`: Contrato criado mas ainda não enviado
- `AGUARDANDO_ASSINATURA`: Enviado para o cliente, aguardando assinatura
- `ASSINADO_CLIENTE`: Cliente assinou, aguardando assinatura do prestador
- `VIGENTE`: Ambas as partes assinaram, contrato em vigor
- `CANCELADO`: Contrato cancelado por alguma das partes
- `EXPIRADO`: Prazo de assinatura expirou (72h após envio)

**Transições Válidas:**

```
RASCUNHO → AGUARDANDO_ASSINATURA
AGUARDANDO_ASSINATURA → ASSINADO_CLIENTE
AGUARDANDO_ASSINATURA → EXPIRADO
ASSINADO_CLIENTE → VIGENTE
Qualquer status → CANCELADO
```

### RF03 - Assinatura Digital do Cliente

**Descrição:** Cliente deve poder assinar o contrato digitalmente através de link público.

**Dados da Assinatura:**

```javascript
{
  nome: string,              // Nome completo do signatário
  tipoDocumento: enum,       // CPF, SSN, PASSPORT, etc.
  numeroDocumento: string,   // Número do documento
  hash: string,              // SHA-256 de (nome + documento + timestamp + salt)
  ip: string,                // IP do signatário (IPv4 ou IPv6)
  userAgent: string,         // Browser/dispositivo utilizado
  timestamp: Date,           // Data/hora da assinatura
  geolocation: {             // Opcional
    latitude: number,
    longitude: number
  }
}
```

**Critérios de Aceitação:**

- Link de assinatura válido por 72 horas
- Formulário de assinatura exige: nome completo, tipo de documento, número do documento
- Checkbox "Aceito os termos do contrato" obrigatório
- Hash gerado incluindo salt único do contrato
- IP capturado automaticamente
- Após assinatura, status muda para `ASSINADO_CLIENTE`
- Email de confirmação enviado ao cliente

### RF04 - Assinatura Digital do Prestador

**Descrição:** Prestador de serviço (empresa) deve assinar o contrato pela área administrativa.

**Critérios de Aceitação:**

- Disponível apenas para contratos com status `ASSINADO_CLIENTE`
- Mesmos campos da assinatura do cliente
- Após assinatura, status muda para `VIGENTE`
- Email de confirmação enviado a ambas as partes

### RF05 - Geração de PDF do Contrato

**Descrição:** Sistema deve gerar PDF profissional do contrato.

**Estrutura do PDF:**

1. **Cabeçalho** (em todas as páginas)
   - Logomarca da empresa (se configurada)
   - Dados da empresa: nome, email, telefone
   - Título: "CONTRATO DE PRESTAÇÃO DE SERVIÇOS"
   - Número do contrato

2. **Seção 1 - Identificação das Partes**
   - **CONTRATANTE (Prestador):**
     - Nome da empresa
     - Email
     - Telefone
     - Endereço completo
   - **CONTRATADO (Cliente):**
     - Nome completo
     - Email
     - Telefone
     - Endereço (do imóvel ou cadastral)

3. **Seção 2 - Objeto do Contrato**
   - Descrição dos serviços (do pacote ou descrição customizada)
   - Referência ao orçamento nº XXXX

4. **Seção 3 - Especificação dos Serviços**
   - Tabela com itens do orçamento:
     - Nº | Descrição | Quantidade | Unidade | Valor Unitário | Total

5. **Seção 4 - Valores e Condições de Pagamento**
   - Subtotal de materiais
   - Subtotal de serviços
   - Descontos
   - **Valor Total**
   - Periodicidade (se aplicável)
   - Forma de pagamento (a definir)

6. **Seção 5 - Cláusulas Contratuais**
   - Cláusulas padrão (do template configurável)
   - Variáveis substituídas: {{nomeEmpresa}}, {{nomeCliente}}, {{valorTotal}}, etc.

7. **Seção 6 - Vigência e Rescisão**
   - Data de início
   - Prazo de vigência
   - Condições de rescisão

8. **Seção 7 - Assinaturas Digitais**
   - **CONTRATANTE:**
     - Nome: \_\_\_
     - Documento: **_ nº _**
     - Hash: \_\_\_
     - Data/Hora: \_\_\_
     - IP: \_\_\_
   - **CONTRATADO:**
     - Nome: \_\_\_
     - Documento: **_ nº _**
     - Hash: \_\_\_
     - Data/Hora: \_\_\_
     - IP: \_\_\_

9. **Rodapé** (em todas as páginas)
   - Endereço da empresa
   - Contatos
   - Número da página (Página X de Y)
   - QR Code com link de validação (última página)

**Idiomas:**

- Português (pt-BR): padrão
- Inglês (en-US): baseado na configuração de locale

### RF06 - Envio de Email com Link de Assinatura

**Descrição:** Sistema deve enviar email ao cliente com link para assinatura.

**Template do Email (pt-BR):**

```
Assunto: Contrato de Prestação de Serviços #{{numeroContrato}} - Aguardando Assinatura

Olá {{nomeCliente}},

Seu contrato de prestação de serviços está pronto e aguarda sua assinatura digital.

Contrato: #{{numeroContrato}}
Orçamento: #{{numeroOrcamento}}
Valor Total: {{valorTotal}}
Empresa: {{nomeEmpresa}}

Para visualizar e assinar o contrato, clique no link abaixo:
{{linkAssinatura}}

Este link é válido por 72 horas.

Qualquer dúvida, entre em contato conosco:
{{emailEmpresa}} | {{telefoneEmpresa}}

Atenciosamente,
{{nomeEmpresa}}
```

**Template do Email (en-US):**

```
Subject: Service Agreement #{{numeroContrato}} - Awaiting Signature

Hello {{nomeCliente}},

Your service agreement is ready and awaiting your digital signature.

Contract: #{{numeroContrato}}
Quote: #{{numeroOrcamento}}
Total Amount: {{valorTotal}}
Company: {{nomeEmpresa}}

To view and sign the contract, click the link below:
{{linkAssinatura}}

This link is valid for 72 hours.

If you have any questions, please contact us:
{{emailEmpresa}} | {{telefoneEmpresa}}

Sincerely,
{{nomeEmpresa}}
```

### RF07 - Validação de Documentos por Tipo

**Descrição:** Sistema deve validar documentos conforme seu tipo.

**Validações:**

| Tipo de Documento | Código           | Validação                    | Formato Esperado   | Máscara |
| ----------------- | ---------------- | ---------------------------- | ------------------ | ------- |
| CPF (Brasil)      | `CPF`            | Algoritmo validador de CPF   | XXX.XXX.XXX-XX     | Sim     |
| CNPJ (Brasil)     | `CNPJ`           | Algoritmo validador de CNPJ  | XX.XXX.XXX/XXXX-XX | Sim     |
| SSN (EUA)         | `SSN`            | Formato básico (9 dígitos)   | XXX-XX-XXXX        | Sim     |
| Passport          | `PASSPORT`       | Alfanumérico, 6-9 caracteres | Variável           | Não     |
| Driver's License  | `DRIVER_LICENSE` | Alfanumérico                 | Variável           | Não     |
| Tax ID            | `TAX_ID`         | Alfanumérico                 | Variável           | Não     |
| National ID       | `NATIONAL_ID`    | Alfanumérico                 | Variável           | Não     |

**Regras:**

- RN04: Validação estrita apenas para CPF e CNPJ
- RN05: SSN valida apenas formato (3-2-4 dígitos)
- RN06: Demais tipos aceitam qualquer formato alfanumérico com mínimo 3 caracteres

### RF08 - Cancelamento de Contrato

**Descrição:** Permitir cancelamento de contrato em qualquer status.

**Critérios de Aceitação:**

- Motivo do cancelamento obrigatório (texto livre)
- Registrar quem cancelou (cliente ou prestador)
- Registrar data/hora do cancelamento
- Não permitir alteração após cancelamento
- Email de notificação enviado à outra parte

### RF09 - Histórico e Auditoria

**Descrição:** Manter log completo de todas as ações no contrato.

**Eventos Registrados:**

- Criação do contrato
- Envio para assinatura
- Tentativa de assinatura (sucesso ou falha)
- Assinatura do cliente
- Assinatura do prestador
- Cancelamento
- Download de PDF
- Expiração automática

**Dados do Log:**

```javascript
{
  timestamp: Date,
  evento: string,
  usuario: string,
  ip: string,
  detalhes: object
}
```

---

## 3. Requisitos Não Funcionais

### RNF01 - Segurança

- Hash de assinatura usando SHA-256
- Token de assinatura com UUID v4
- Link de assinatura expira em 72 horas
- Rate limiting: máximo 5 tentativas de assinatura por IP por hora
- Armazenamento de IPs para auditoria
- Sanitização de inputs para prevenir XSS

### RNF02 - Desempenho

- Geração de PDF em menos de 3 segundos
- Envio de email em menos de 5 segundos
- Carregamento da página de assinatura em menos de 2 segundos
- Suporte a contratos com até 100 itens

### RNF03 - Usabilidade

- Interface responsiva (desktop, tablet, mobile)
- Página de assinatura pública acessível sem login
- Formulário de assinatura simples e intuitivo
- Feedback visual claro em cada etapa
- Suporte a leitores de tela (acessibilidade)

### RNF04 - Internacionalização

- Suporte completo a pt-BR e en-US
- Detecção automática de locale do navegador
- Formatação de data/hora conforme locale
- Formatação de moeda conforme locale
- Templates de contrato em ambos os idiomas

### RNF05 - Compatibilidade

- Navegadores: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- Dispositivos: Desktop, tablet, smartphone
- PDF compatível com Adobe Reader 10+

---

## 4. Arquitetura do Sistema

### 4.1. Estrutura de Arquivos

```
src/
├── core/
│   ├── domain/
│   │   ├── entities/
│   │   │   └── contrato.js                    # Entidade Contrato
│   │   ├── enums/
│   │   │   ├── statusContrato.js              # Enum de status
│   │   │   └── tipoDocumento.js               # Enum de tipos de documento
│   │   └── templates/
│   │       └── contrato/
│   │           ├── pt-BR.js                   # Template em português
│   │           └── en-US.js                   # Template em inglês
│   ├── infrastructure/
│   │   ├── repositories/
│   │   │   └── contratoRepository.js          # Repositório de contratos
│   │   └── utils/
│   │       ├── contratoGenerator.js           # Gerador de PDF de contrato
│   │       ├── emailSender.js                 # (atualizado) Envio de emails
│   │       ├── documentValidator.js           # Validador de documentos
│   │       └── hashGenerator.js               # Gerador de hash SHA-256
├── stores/
│   └── contrato-store.js                      # Store Pinia de contratos
├── pages/
│   ├── ContratoListagemPage.vue              # Lista de contratos
│   ├── ContratoVisualizacaoPage.vue          # Visualização do contrato
│   └── ContratoAssinaturaPublicaPage.vue     # Assinatura pública
├── components/
│   ├── DocumentInput.vue                      # Input com máscara por tipo
│   └── ContratoStatusBadge.vue               # Badge de status
├── router/
│   └── routes.js                              # (atualizado) Rotas
└── i18n/
    ├── pt-BR/
    │   └── index.js                           # (atualizado) Traduções
    └── en-US/
        └── index.js                           # (atualizado) Traduções
```

### 4.2. Modelo de Dados

#### Entidade: Contrato

```javascript
class Contrato {
  constructor(
    numeroContrato,      // String: "CONT-2026-0001"
    orcamento,           // Object: referência ao orçamento
    dataEmissao          // Date
  ) {
    this.Id = gerarGuid()
    this.NumeroContrato = numeroContrato
    this.Orcamento = orcamento  // { Id, NumeroOrcamento, Cliente, Imovel, Itens, ... }
    this.DataEmissao = dataEmissao
    this.Status = StatusContrato.RASCUNHO
    this.TextoContrato = null    // String: texto do contrato com cláusulas
    this.TokenAssinatura = null  // String: UUID para link público
    this.TokenExpiraEm = null    // Date: 72h após envio

    // Assinatura do Cliente
    this.AssinaturaCliente = null  // Object ou null
    /*
    {
      nome: String,
      tipoDocumento: TipoDocumento,
      numeroDocumento: String,
      hash: String,
      ip: String,
      userAgent: String,
      timestamp: Date,
      geolocation: { latitude, longitude } | null
    }
    */

    // Assinatura do Prestador
    this.AssinaturaPrestador = null  // Object ou null (mesma estrutura)

    this.DataAssinaturaCliente = null    // Date
    this.DataAssinaturaPrestador = null  // Date
    this.DataVigenciaInicio = null       // Date: quando ambos assinam
    this.DataVigenciaFim = null          // Date: calculado conforme periodicidade

    this.Cancelado = false
    this.MotivoCancelamento = null       // String
    this.DataCancelamento = null         // Date
    this.CanceladoPor = null             // String: "CLIENTE" ou "PRESTADOR"

    this.Observacoes = ''
    this.Historico = []  // Array de eventos
  }

  // Métodos
  assinarCliente(dadosAssinatura) { ... }
  assinarPrestador(dadosAssinatura) { ... }
  enviarParaAssinatura() { ... }
  cancelar(motivo, canceladoPor) { ... }
  validarVigencia() { ... }
  verificarExpiracao() { ... }
  adicionarEvento(evento) { ... }
}
```

#### Enum: StatusContrato

```javascript
export const StatusContrato = {
  RASCUNHO: 'RASCUNHO',
  AGUARDANDO_ASSINATURA: 'AGUARDANDO_ASSINATURA',
  ASSINADO_CLIENTE: 'ASSINADO_CLIENTE',
  VIGENTE: 'VIGENTE',
  CANCELADO: 'CANCELADO',
  EXPIRADO: 'EXPIRADO',
}
```

#### Enum: TipoDocumento

```javascript
export const TipoDocumento = {
  CPF: 'CPF', // CPF (Brasil)
  CNPJ: 'CNPJ', // CNPJ (Brasil)
  SSN: 'SSN', // Social Security Number (EUA)
  PASSPORT: 'PASSPORT', // Passaporte (Internacional)
  DRIVER_LICENSE: 'DRIVER_LICENSE', // Carteira de Motorista
  TAX_ID: 'TAX_ID', // ID Fiscal Genérico
  NATIONAL_ID: 'NATIONAL_ID', // ID Nacional Genérico
}
```

### 4.3. Fluxo de Dados

#### Fluxo 1: Criação de Contrato

```
1. Usuário aprova orçamento
   └─> OrcamentoCadastroPage.vue: aprovarOrcamento()
       └─> orcamento-store.js: approveOrcamento(id)
           ├─> Atualiza status orçamento para APROVADO
           ├─> Cria ordem de serviço
           └─> contrato-store.js: createContratoFromOrcamento(orcamento)
               ├─> Gera número do contrato
               ├─> Carrega template de contrato (locale)
               ├─> Substitui variáveis no template
               ├─> Cria instância de Contrato
               └─> contratoRepository.save(contrato)

2. Contrato criado com status RASCUNHO
```

#### Fluxo 2: Envio para Assinatura

```
1. Usuário clica "Enviar para Assinatura"
   └─> ContratoVisualizacaoPage.vue: enviarParaAssinatura()
       └─> contrato-store.js: enviarParaAssinatura(id)
           ├─> Gera token UUID
           ├─> Define expiração (72h)
           ├─> Atualiza status para AGUARDANDO_ASSINATURA
           ├─> Salva contrato
           └─> emailSender.js: enviarContratoParaAssinatura(dados)
               ├─> Monta URL pública: /contrato/assinar/{id}/{token}
               ├─> Envia email via EmailJS
               └─> Registra evento no histórico

2. Cliente recebe email com link
```

#### Fluxo 3: Assinatura do Cliente

```
1. Cliente clica no link do email
   └─> Navega para: /contrato/assinar/:id/:token
       └─> ContratoAssinaturaPublicaPage.vue
           ├─> Valida token (existe e não expirou)
           ├─> Carrega contrato
           ├─> Exibe contrato completo (somente leitura)
           └─> Exibe formulário de assinatura

2. Cliente preenche formulário
   ├─> Nome completo
   ├─> Tipo de documento (dropdown)
   ├─> Número do documento
   └─> Checkbox "Aceito os termos"

3. Cliente clica "Assinar Contrato"
   └─> ContratoAssinaturaPublicaPage.vue: assinarContrato()
       ├─> Valida campos
       ├─> Valida documento (conforme tipo)
       ├─> Captura IP (via fetch de API externa ou headers)
       ├─> Captura user agent
       ├─> Captura geolocalização (opcional, com permissão)
       ├─> Gera hash SHA-256
       └─> contrato-store.js: assinarContrato(id, 'CLIENTE', dadosAssinatura)
           ├─> Atualiza AssinaturaCliente
           ├─> Atualiza DataAssinaturaCliente
           ├─> Atualiza status para ASSINADO_CLIENTE
           ├─> Salva contrato
           ├─> Envia email de confirmação ao cliente
           ├─> Envia email de notificação ao prestador
           └─> Registra evento no histórico

4. Página exibe mensagem de sucesso
```

#### Fluxo 4: Assinatura do Prestador

```
1. Prestador acessa contrato pela área administrativa
   └─> ContratoVisualizacaoPage.vue
       ├─> Verifica status = ASSINADO_CLIENTE
       └─> Exibe botão "Assinar Contrato"

2. Prestador clica "Assinar Contrato"
   └─> Dialog de assinatura (similar ao do cliente)
       ├─> Nome completo
       ├─> Tipo de documento
       ├─> Número do documento
       └─> Senha/PIN

3. Prestador confirma
   └─> ContratoVisualizacaoPage.vue: assinarComoPrestador()
       └─> contrato-store.js: assinarContrato(id, 'PRESTADOR', dadosAssinatura)
           ├─> Atualiza AssinaturaPrestador
           ├─> Atualiza DataAssinaturaPrestador
           ├─> Atualiza status para VIGENTE
           ├─> Define DataVigenciaInicio = now
           ├─> Calcula DataVigenciaFim (baseado em periodicidade)
           ├─> Salva contrato
           ├─> Envia email de confirmação a ambas as partes
           └─> Registra evento no histórico

4. Contrato agora está VIGENTE
```

### 4.4. Segurança

#### Geração de Hash SHA-256

```javascript
// hashGenerator.js
import CryptoJS from 'crypto-js'

export function gerarHashAssinatura(dados, salt) {
  const { nome, numeroDocumento, timestamp } = dados
  const conteudo = `${nome}|${numeroDocumento}|${timestamp}|${salt}`
  return CryptoJS.SHA256(conteudo).toString()
}

export function gerarSaltUnico() {
  return CryptoJS.lib.WordArray.random(128 / 8).toString()
}

export function validarHash(dados, hash, salt) {
  const hashCalculado = gerarHashAssinatura(dados, salt)
  return hashCalculado === hash
}
```

#### Validação de Token

```javascript
// No store ou página pública
function validarToken(id, token) {
  const contrato = contratoRepository.buscarPorId(id)

  if (!contrato) {
    throw new Error('Contrato não encontrado')
  }

  if (contrato.TokenAssinatura !== token) {
    throw new Error('Token inválido')
  }

  if (new Date() > contrato.TokenExpiraEm) {
    // Atualizar status para EXPIRADO
    contrato.Status = StatusContrato.EXPIRADO
    contratoRepository.atualizar(contrato)
    throw new Error('Link expirado. Solicite um novo link de assinatura.')
  }

  return contrato
}
```

#### Captura de IP

```javascript
// Opção 1: Via API externa (ipapi.co)
async function capturarIP() {
  try {
    const response = await fetch('https://ipapi.co/json/')
    const data = await response.json()
    return {
      ip: data.ip,
      geolocation: {
        latitude: data.latitude,
        longitude: data.longitude,
        cidade: data.city,
        estado: data.region,
        pais: data.country_name,
      },
    }
  } catch (error) {
    console.error('Erro ao capturar IP:', error)
    return { ip: 'Não disponível', geolocation: null }
  }
}

// Opção 2: Via headers (se backend disponível)
// req.headers['x-forwarded-for'] || req.connection.remoteAddress
```

---

## 5. Templates de Contrato

### 5.1. Template pt-BR

```javascript
// src/core/templates/contrato/pt-BR.js

export const TEMPLATE_CONTRATO_PT_BR = `
CONTRATO DE PRESTAÇÃO DE SERVIÇOS Nº {{numeroContrato}}

Pelo presente instrumento particular, as partes abaixo qualificadas:

**CONTRATANTE:**
{{nomeEmpresa}}, pessoa jurídica de direito privado, inscrita no CNPJ sob nº {{cnpjEmpresa}}, 
com sede em {{enderecoEmpresa}}, e-mail {{emailEmpresa}}, telefone {{telefoneEmpresa}}, 
doravante denominada CONTRATANTE.

**CONTRATADO:**
{{nomeCliente}}, portador(a) do documento {{tipoDocumentoCliente}} nº {{documentoCliente}}, 
residente e domiciliado(a) em {{enderecoCliente}}, e-mail {{emailCliente}}, telefone {{telefoneCliente}},
doravante denominado(a) CONTRATADO.

Têm entre si justo e acordado o presente Contrato de Prestação de Serviços, mediante as 
cláusulas e condições a seguir estabelecidas:

**CLÁUSULA PRIMEIRA - DO OBJETO**

1.1. O presente contrato tem por objeto a prestação dos serviços de {{descricaoServicos}}, 
conforme especificado no Orçamento nº {{numeroOrcamento}}, que passa a fazer parte integrante 
deste instrumento.

1.2. Os serviços serão executados no imóvel localizado em {{enderecoImovel}}.

**CLÁUSULA SEGUNDA - DA ESPECIFICAÇÃO DOS SERVIÇOS**

2.1. Os serviços a serem prestados compreendem:

{{tabelaServicos}}

**CLÁUSULA TERCEIRA - DO VALOR E FORMA DE PAGAMENTO**

3.1. O valor total dos serviços é de {{valorTotal}}.

3.2. O pagamento será realizado conforme condições acordadas entre as partes.

3.3. Periodicidade: {{periodicidade}}

**CLÁUSULA QUARTA - DA VIGÊNCIA**

4.1. O presente contrato vigorará a partir da data de assinatura de ambas as partes, 
pelo período de {{prazoVigencia}}.

4.2. O contrato poderá ser prorrogado mediante acordo entre as partes.

**CLÁUSULA QUINTA - DAS OBRIGAÇÕES DO CONTRATANTE**

5.1. Executar os serviços contratados com qualidade e profissionalismo.

5.2. Fornecer materiais e equipamentos necessários, quando especificado.

5.3. Cumprir os prazos estabelecidos.

5.4. Garantir a segurança no local de trabalho.

**CLÁUSULA SEXTA - DAS OBRIGAÇÕES DO CONTRATADO**

6.1. Permitir o acesso às dependências do imóvel nos horários acordados.

6.2. Efetuar o pagamento nos prazos estabelecidos.

6.3. Comunicar imediatamente qualquer problema ou insatisfação.

**CLÁUSULA SÉTIMA - DA RESCISÃO**

7.1. O presente contrato poderá ser rescindido por qualquer das partes, mediante 
comunicação prévia de 30 (trinta) dias.

7.2. Em caso de descumprimento de qualquer cláusula contratual, a parte prejudicada 
poderá rescindir o contrato imediatamente.

**CLÁUSULA OITAVA - DAS DISPOSIÇÕES GERAIS**

8.1. As partes elegem o foro da comarca de {{cidadeEmpresa}} para dirimir quaisquer 
dúvidas ou questões oriundas do presente contrato.

8.2. Este contrato foi assinado digitalmente pelas partes, com validade jurídica 
conforme Lei nº 14.063/2020 e Medida Provisória nº 2.200-2/2001.

E por estarem assim justos e contratados, assinam eletronicamente o presente instrumento.

{{cidadeEmpresa}}, {{dataEmissao}}.

___________________________________________
CONTRATANTE
{{nomeEmpresa}}

___________________________________________
CONTRATADO
{{nomeCliente}}

---
ASSINATURA DIGITAL

Este contrato foi assinado digitalmente e possui hash de validação.
Para verificar a autenticidade, acesse: {{linkValidacao}}
`

export const VARIAVEIS_TEMPLATE = [
  'numeroContrato',
  'nomeEmpresa',
  'cnpjEmpresa',
  'enderecoEmpresa',
  'emailEmpresa',
  'telefoneEmpresa',
  'nomeCliente',
  'tipoDocumentoCliente',
  'documentoCliente',
  'enderecoCliente',
  'emailCliente',
  'telefoneCliente',
  'descricaoServicos',
  'numeroOrcamento',
  'enderecoImovel',
  'tabelaServicos',
  'valorTotal',
  'periodicidade',
  'prazoVigencia',
  'cidadeEmpresa',
  'dataEmissao',
  'linkValidacao',
]
```

### 5.2. Template en-US

```javascript
// src/core/templates/contrato/en-US.js

export const TEMPLATE_CONTRATO_EN_US = `
SERVICE AGREEMENT No. {{numeroContrato}}

By this private instrument, the undersigned parties:

**SERVICE PROVIDER:**
{{nomeEmpresa}}, a legal entity registered under Tax ID {{cnpjEmpresa}}, 
headquartered at {{enderecoEmpresa}}, email {{emailEmpresa}}, phone {{telefoneEmpresa}}, 
hereinafter referred to as PROVIDER.

**CLIENT:**
{{nomeCliente}}, holder of {{tipoDocumentoCliente}} No. {{documentoCliente}}, 
residing at {{enderecoCliente}}, email {{emailCliente}}, phone {{telefoneCliente}},
hereinafter referred to as CLIENT.

Have agreed to enter into this Service Agreement under the following terms and conditions:

**ARTICLE ONE - SCOPE OF SERVICES**

1.1. This agreement covers the provision of {{descricaoServicos}}, 
as specified in Quote No. {{numeroOrcamento}}, which becomes an integral part 
of this instrument.

1.2. Services will be performed at the property located at {{enderecoImovel}}.

**ARTICLE TWO - SERVICE SPECIFICATION**

2.1. Services to be provided include:

{{tabelaServicos}}

**ARTICLE THREE - PRICING AND PAYMENT**

3.1. The total service amount is {{valorTotal}}.

3.2. Payment will be made according to the conditions agreed between the parties.

3.3. Frequency: {{periodicidade}}

**ARTICLE FOUR - TERM**

4.1. This agreement shall be effective from the date both parties sign, 
for a period of {{prazoVigencia}}.

4.2. The agreement may be extended by mutual consent.

**ARTICLE FIVE - PROVIDER OBLIGATIONS**

5.1. Execute contracted services with quality and professionalism.

5.2. Supply necessary materials and equipment when specified.

5.3. Comply with established deadlines.

5.4. Ensure workplace safety.

**ARTICLE SIX - CLIENT OBLIGATIONS**

6.1. Allow access to the property premises during agreed hours.

6.2. Make payments within established deadlines.

6.3. Immediately communicate any problems or dissatisfaction.

**ARTICLE SEVEN - TERMINATION**

7.1. This agreement may be terminated by either party with 30 (thirty) days 
prior notice.

7.2. In case of breach of any contractual clause, the aggrieved party may 
terminate the agreement immediately.

**ARTICLE EIGHT - GENERAL PROVISIONS**

8.1. The parties elect the jurisdiction of {{cidadeEmpresa}} to resolve any 
doubts or issues arising from this agreement.

8.2. This agreement was digitally signed by the parties, with legal validity 
according to applicable electronic signature laws.

Being thus agreed, the parties electronically sign this instrument.

{{cidadeEmpresa}}, {{dataEmissao}}.

___________________________________________
PROVIDER
{{nomeEmpresa}}

___________________________________________
CLIENT
{{nomeCliente}}

---
DIGITAL SIGNATURE

This agreement was digitally signed and has a validation hash.
To verify authenticity, visit: {{linkValidacao}}
`
```

---

## 6. Interface do Usuário

### 6.1. Telas Principais

#### Tela 1: Lista de Contratos (ContratoListagemPage.vue)

**Elementos:**

- Breadcrumb: Início > Contratos
- Título: "Contratos"
- Filtros:
  - Busca por número, cliente, orçamento
  - Status (dropdown múltiplo)
  - Data de emissão (range)
- Botão: "Novo Contrato" (abre modal de seleção de orçamento aprovado)
- Tabela com colunas:
  - Nº Contrato
  - Orçamento
  - Cliente
  - Status (badge colorido)
  - Data Emissão
  - Valor Total
  - Ações (Visualizar, Download PDF, Cancelar)
- Paginação

**Cores dos Badges:**

- RASCUNHO: cinza
- AGUARDANDO_ASSINATURA: amarelo
- ASSINADO_CLIENTE: azul
- VIGENTE: verde
- CANCELADO: vermelho
- EXPIRADO: laranja

#### Tela 2: Visualização do Contrato (ContratoVisualizacaoPage.vue)

**Layout:**

```
┌─────────────────────────────────────────────────────┐
│ [<] Voltar    CONTRATO #CONT-2026-0001    [•] VIGENTE│
├─────────────────────────────────────────────────────┤
│                                                       │
│ [Dados da Empresa]  |  [Dados do Cliente]           │
│                                                       │
├─────────────────────────────────────────────────────┤
│ Texto do Contrato                                    │
│ ┌───────────────────────────────────────────────┐  │
│ │ CONTRATO DE PRESTAÇÃO DE SERVIÇOS...          │  │
│ │ [Texto completo aqui]                          │  │
│ └───────────────────────────────────────────────┘  │
│                                                       │
├─────────────────────────────────────────────────────┤
│ Serviços Contratados                                 │
│ [Tabela de itens do orçamento]                      │
│                                                       │
├─────────────────────────────────────────────────────┤
│ Valores                                              │
│ Subtotal: R$ X,XX                                    │
│ Desconto: R$ X,XX                                    │
│ TOTAL: R$ X,XX                                       │
│                                                       │
├─────────────────────────────────────────────────────┤
│ Assinaturas Digitais                                 │
│                                                       │
│ ┌─────────────────────┐  ┌──────────────────────┐  │
│ │ Cliente              │  │ Prestador             │  │
│ │ [✓] Assinado         │  │ [✓] Assinado          │  │
│ │ Nome: João Silva     │  │ Nome: eCleaner LTDA   │  │
│ │ CPF: ***.456.789-**  │  │ CNPJ: XX.XXX.XXX/...  │  │
│ │ Data: 01/02/26 14:30 │  │ Data: 01/02/26 15:00  │  │
│ │ IP: 192.168.1.100    │  │ IP: 192.168.1.200     │  │
│ │ Hash: abc123...      │  │ Hash: def456...       │  │
│ └─────────────────────┘  └──────────────────────┘  │
│                                                       │
├─────────────────────────────────────────────────────┤
│ [Cancelar] [Download PDF] [Assinar] [Enviar p/ Assinatura]│
└─────────────────────────────────────────────────────┘
```

**Botões (conforme status):**

- RASCUNHO: [Enviar para Assinatura] [Download PDF] [Cancelar]
- AGUARDANDO_ASSINATURA: [Download PDF] [Cancelar] [Reenviar Email]
- ASSINADO_CLIENTE: [Assinar como Prestador] [Download PDF] [Cancelar]
- VIGENTE: [Download PDF] [Cancelar]
- CANCELADO/EXPIRADO: [Download PDF]

#### Tela 3: Assinatura Pública (ContratoAssinaturaPublicaPage.vue)

**Layout (página pública, sem menu/header):**

```
┌─────────────────────────────────────────────────────┐
│                  [Logo eCleaner]                     │
│                                                       │
│              ASSINATURA DE CONTRATO                  │
│              Contrato #CONT-2026-0001                │
│                                                       │
├─────────────────────────────────────────────────────┤
│                                                       │
│ [Visualização do Contrato - Somente Leitura]        │
│ ┌───────────────────────────────────────────────┐  │
│ │ [PDF Viewer ou texto formatado]                │  │
│ │                                                 │  │
│ │ ... conteúdo do contrato ...                   │  │
│ │                                                 │  │
│ └───────────────────────────────────────────────┘  │
│                                                       │
│ ▼ Role até o final para assinar ▼                   │
│                                                       │
├─────────────────────────────────────────────────────┤
│ ASSINATURA DIGITAL                                   │
│                                                       │
│ ┌───────────────────────────────────────────────┐  │
│ │ Nome Completo: [_________________________]     │  │
│ │                                                 │  │
│ │ Tipo de Documento: [CPF ▼]                     │  │
│ │   • CPF (Brasil)                                │  │
│ │   • CNPJ (Brasil)                               │  │
│ │   • SSN (USA)                                   │  │
│ │   • Passport                                    │  │
│ │   • Driver's License                            │  │
│ │   • Tax ID                                      │  │
│ │   • National ID                                 │  │
│ │                                                 │  │
│ │ Número do Documento: [___.___.___-__]          │  │
│ │                                                 │  │
│ │ [✓] Li e aceito os termos deste contrato       │  │
│ │                                                 │  │
│ │          [   ASSINAR CONTRATO   ]              │  │
│ │                                                 │  │
│ │ Ao assinar, você concorda com os termos acima. │  │
│ │ Sua assinatura terá validade jurídica.         │  │
│ └───────────────────────────────────────────────┘  │
│                                                       │
│ 🔒 Conexão segura • Dados criptografados            │
│                                                       │
└─────────────────────────────────────────────────────┘
```

**Após Assinatura (página de sucesso):**

```
┌─────────────────────────────────────────────────────┐
│                  [Logo eCleaner]                     │
│                                                       │
│                   ✅ SUCESSO!                        │
│                                                       │
│        Contrato assinado com sucesso!                │
│                                                       │
│  Você receberá uma cópia por e-mail em instantes.   │
│                                                       │
│  Detalhes da sua assinatura:                         │
│  • Nome: João Silva                                  │
│  • CPF: ***.456.789-**                               │
│  • Data/Hora: 03/02/2026 às 14:35:22                │
│  • Hash: abc123def456...                             │
│                                                       │
│         [Download Comprovante]                       │
│                                                       │
└─────────────────────────────────────────────────────┘
```

---

## 7. Validações e Regras de Negócio

### 7.1. Validações de Formulário

#### Assinatura do Cliente/Prestador

| Campo               | Validação                        | Mensagem de Erro                           |
| ------------------- | -------------------------------- | ------------------------------------------ |
| Nome Completo       | Obrigatório, mínimo 3 caracteres | "Nome completo é obrigatório"              |
| Tipo de Documento   | Obrigatório                      | "Selecione o tipo de documento"            |
| Número do Documento | Obrigatório, validação por tipo  | Ver tabela abaixo                          |
| Aceito os termos    | Obrigatório (checkbox)           | "Você deve aceitar os termos para assinar" |

#### Validações por Tipo de Documento

| Tipo             | Validação                              | Mensagem                                     |
| ---------------- | -------------------------------------- | -------------------------------------------- |
| CPF              | Formato XXX.XXX.XXX-XX + algoritmo     | "CPF inválido"                               |
| CNPJ             | Formato XX.XXX.XXX/XXXX-XX + algoritmo | "CNPJ inválido"                              |
| SSN              | 9 dígitos, formato XXX-XX-XXXX         | "SSN deve ter 9 dígitos"                     |
| Passport         | 6-9 caracteres alfanuméricos           | "Passaporte deve ter entre 6 e 9 caracteres" |
| Driver's License | Mínimo 3 caracteres                    | "Número inválido"                            |
| Tax ID           | Mínimo 3 caracteres                    | "Número inválido"                            |
| National ID      | Mínimo 3 caracteres                    | "Número inválido"                            |

### 7.2. Regras de Transição de Status

```
RASCUNHO → AGUARDANDO_ASSINATURA
  ✓ Permitido sempre
  ✓ Gera token e expira em 72h
  ✓ Envia email ao cliente

AGUARDANDO_ASSINATURA → ASSINADO_CLIENTE
  ✓ Permitido apenas com token válido
  ✓ Requer assinatura digital do cliente
  ✓ Envia email de confirmação

ASSINADO_CLIENTE → VIGENTE
  ✓ Permitido apenas pela área administrativa
  ✓ Requer assinatura digital do prestador
  ✓ Define data de vigência
  ✓ Envia email de confirmação a ambos

Qualquer status → CANCELADO
  ✓ Permitido sempre
  ✓ Requer motivo
  ✓ Registra quem cancelou
  ✓ Envia notificação

AGUARDANDO_ASSINATURA → EXPIRADO
  ✓ Automático após 72h
  ✓ Job de verificação periódico
```

### 7.3. Permissões

| Ação                 | RASCUNHO | AGUARD_ASSIN | ASSIN_CLIENTE | VIGENTE | CANCELADO | EXPIRADO |
| -------------------- | -------- | ------------ | ------------- | ------- | --------- | -------- |
| Editar texto         | ✓        | ✗            | ✗             | ✗       | ✗         | ✗        |
| Enviar p/ assinatura | ✓        | ✗            | ✗             | ✗       | ✗         | ✗        |
| Assinar (cliente)    | ✗        | ✓            | ✗             | ✗       | ✗         | ✗        |
| Assinar (prestador)  | ✗        | ✗            | ✓             | ✗       | ✗         | ✗        |
| Cancelar             | ✓        | ✓            | ✓             | ✓       | ✗         | ✗        |
| Download PDF         | ✓        | ✓            | ✓             | ✓       | ✓         | ✓        |
| Reenviar email       | ✗        | ✓            | ✗             | ✗       | ✗         | ✗        |

---

## 8. Testes

### 8.1. Casos de Teste Principais

#### CT01 - Criação de Contrato a partir de Orçamento Aprovado

**Pré-condição:** Orçamento com status APROVADO  
**Passos:**

1. Aprovar orçamento
2. Verificar se contrato foi criado automaticamente
3. Verificar número do contrato no formato correto
4. Verificar status inicial = RASCUNHO
5. Verificar texto do contrato preenchido com template

**Resultado Esperado:** Contrato criado com sucesso, dados copiados do orçamento

#### CT02 - Envio de Contrato para Assinatura

**Pré-condição:** Contrato com status RASCUNHO  
**Passos:**

1. Clicar em "Enviar para Assinatura"
2. Confirmar ação
3. Verificar status = AGUARDANDO_ASSINATURA
4. Verificar token gerado
5. Verificar email enviado ao cliente

**Resultado Esperado:** Email enviado com link válido, status atualizado

#### CT03 - Assinatura Digital do Cliente - Sucesso

**Pré-condição:** Link de assinatura válido (não expirado)  
**Passos:**

1. Acessar link público
2. Preencher nome completo
3. Selecionar tipo de documento (CPF)
4. Preencher CPF válido
5. Marcar checkbox "Aceito os termos"
6. Clicar "Assinar Contrato"

**Resultado Esperado:**

- Assinatura registrada com sucesso
- Status = ASSINADO_CLIENTE
- Hash gerado corretamente
- IP capturado
- Email de confirmação enviado

#### CT04 - Assinatura Digital - Token Expirado

**Pré-condição:** Link de assinatura expirado (>72h)  
**Passos:**

1. Acessar link público
2. Tentar visualizar contrato

**Resultado Esperado:**

- Mensagem de erro: "Link expirado"
- Status do contrato = EXPIRADO
- Botão para solicitar novo link

#### CT05 - Validação de CPF Inválido

**Pré-condição:** Página de assinatura aberta  
**Passos:**

1. Selecionar tipo = CPF
2. Preencher CPF inválido (ex: 111.111.111-11)
3. Tentar assinar

**Resultado Esperado:** Mensagem de erro "CPF inválido", assinatura bloqueada

#### CT06 - Validação de SSN

**Pré-condição:** Página de assinatura aberta  
**Passos:**

1. Selecionar tipo = SSN
2. Preencher SSN válido (ex: 123-45-6789)
3. Assinar

**Resultado Esperado:** Assinatura aceita, validação básica de formato

#### CT07 - Assinatura do Prestador

**Pré-condição:** Contrato com status ASSINADO_CLIENTE  
**Passos:**

1. Acessar contrato como administrador
2. Clicar "Assinar como Prestador"
3. Preencher dados de assinatura
4. Confirmar

**Resultado Esperado:**

- Status = VIGENTE
- Data de vigência definida
- Email enviado a ambas as partes

#### CT08 - Cancelamento de Contrato

**Pré-condição:** Contrato em qualquer status (exceto CANCELADO)  
**Passos:**

1. Clicar "Cancelar Contrato"
2. Informar motivo
3. Confirmar

**Resultado Esperado:**

- Status = CANCELADO
- Motivo registrado
- Email de notificação enviado

#### CT09 - Download de PDF

**Pré-condição:** Contrato criado  
**Passos:**

1. Clicar "Download PDF"
2. Aguardar geração

**Resultado Esperado:**

- PDF gerado em menos de 3 segundos
- Contém todas as seções corretamente
- Assinaturas exibidas (se houver)

#### CT10 - Múltiplas Tentativas de Assinatura (Rate Limiting)

**Pré-condição:** Página de assinatura aberta  
**Passos:**

1. Tentar assinar com dados inválidos 5 vezes seguidas
2. Tentar assinar pela 6ª vez

**Resultado Esperado:**

- Mensagem: "Muitas tentativas. Aguarde 1 hora."
- Bloqueio temporário por IP

### 8.2. Testes de Unidade

```javascript
// Exemplo de testes para Contrato.js
describe('Contrato', () => {
  describe('assinarCliente', () => {
    it('deve registrar assinatura com hash válido', () => {
      const contrato = new Contrato(...)
      const dados = {
        nome: 'João Silva',
        tipoDocumento: TipoDocumento.CPF,
        numeroDocumento: '12345678900',
        ip: '192.168.1.1'
      }

      contrato.assinarCliente(dados)

      expect(contrato.AssinaturaCliente).toBeDefined()
      expect(contrato.AssinaturaCliente.hash).toHaveLength(64) // SHA-256
      expect(contrato.Status).toBe(StatusContrato.ASSINADO_CLIENTE)
    })

    it('deve rejeitar se status não for AGUARDANDO_ASSINATURA', () => {
      const contrato = new Contrato(...)
      contrato.Status = StatusContrato.VIGENTE

      expect(() => contrato.assinarCliente(dados)).toThrow()
    })
  })

  describe('verificarExpiracao', () => {
    it('deve expirar após 72 horas', () => {
      const contrato = new Contrato(...)
      contrato.Status = StatusContrato.AGUARDANDO_ASSINATURA
      contrato.TokenExpiraEm = new Date(Date.now() - 1000) // 1 segundo atrás

      contrato.verificarExpiracao()

      expect(contrato.Status).toBe(StatusContrato.EXPIRADO)
    })
  })
})
```

---

## 9. Cronograma de Implementação

### Fase 1: Fundação (2 dias)

- [ ] Criar enum StatusContrato
- [ ] Criar enum TipoDocumento
- [ ] Criar entidade Contrato
- [ ] Criar validadores de documentos
- [ ] Criar gerador de hash SHA-256
- [ ] Testes unitários

### Fase 2: Persistência (1 dia)

- [ ] Criar ContratoRepository
- [ ] Criar contrato-store.js
- [ ] Integrar com orcamento-store
- [ ] Testes de integração

### Fase 3: Templates e PDF (2 dias)

- [ ] Criar template pt-BR
- [ ] Criar template en-US
- [ ] Implementar substituição de variáveis
- [ ] Criar gerador de PDF de contrato
- [ ] Adicionar QR Code
- [ ] Testes de geração de PDF

### Fase 4: Envio de Email (1 dia)

- [ ] Atualizar emailSender.js
- [ ] Criar template de email pt-BR
- [ ] Criar template de email en-US
- [ ] Testes de envio

### Fase 5: Interface Administrativa (2 dias)

- [ ] Criar ContratoListagemPage.vue
- [ ] Criar ContratoVisualizacaoPage.vue
- [ ] Criar componente DocumentInput.vue
- [ ] Criar componente ContratoStatusBadge.vue
- [ ] Adicionar rotas
- [ ] Testes E2E

### Fase 6: Página Pública (2 dias)

- [ ] Criar ContratoAssinaturaPublicaPage.vue
- [ ] Implementar validação de token
- [ ] Implementar captura de IP/geolocalização
- [ ] Página de sucesso
- [ ] Página de erro (token expirado)
- [ ] Testes E2E

### Fase 7: Traduções (1 dia)

- [ ] Adicionar chaves em pt-BR/index.js
- [ ] Adicionar chaves em en-US/index.js
- [ ] Revisar todos os textos

### Fase 8: Testes Finais e Ajustes (2 dias)

- [ ] Testes de integração completos
- [ ] Testes de usabilidade
- [ ] Correções de bugs
- [ ] Otimizações de performance
- [ ] Documentação final

**Total estimado: 13 dias úteis**

---

## 10. Referências

### Legislação

- **Brasil:**
  - Lei nº 14.063/2020 - Uso de assinaturas eletrônicas
  - Medida Provisória nº 2.200-2/2001 - ICP-Brasil
  - Código Civil - Contratos
- **EUA:**
  - ESIGN Act (2000) - Electronic Signatures in Global and National Commerce Act
  - UETA - Uniform Electronic Transactions Act

### Bibliotecas e APIs

- **jsPDF**: https://github.com/parallax/jsPDF
- **jsPDF AutoTable**: https://github.com/simonbengtsson/jsPDF-AutoTable
- **CryptoJS**: https://github.com/brix/crypto-js (para SHA-256)
- **EmailJS**: https://www.emailjs.com/
- **ipapi.co**: https://ipapi.co/ (captura de IP/geolocalização)

### Padrões e Convenções

- **Clean Architecture**: https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html
- **Repository Pattern**: https://martinfowler.com/eaaCatalog/repository.html
- **Vue 3 Style Guide**: https://vuejs.org/style-guide/
- **Quasar Framework**: https://quasar.dev/

---

## Glossário

- **Assinatura Digital**: Método de autenticação usando criptografia
- **Hash SHA-256**: Algoritmo de hash criptográfico de 256 bits
- **Token**: Identificador único temporário para validação
- **Salt**: Valor aleatório adicionado antes do hash para segurança
- **Rate Limiting**: Limitação de tentativas por período de tempo
- **Geolocalização**: Coordenadas geográficas do signatário
- **User Agent**: Identificação do navegador/dispositivo
- **Template**: Modelo de documento com variáveis substituíveis
- **QR Code**: Código de resposta rápida (Quick Response)

---

**Documento criado em:** 3 de fevereiro de 2026  
**Última atualização:** 3 de fevereiro de 2026  
**Versão:** 1.0  
**Status:** Aprovado para implementação
