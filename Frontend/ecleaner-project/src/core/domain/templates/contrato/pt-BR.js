/**
 * Template de Contrato em Português (pt-BR)
 */

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

2.1. Os serviços a serem prestados compreendem os itens relacionados no orçamento,
incluindo materiais e mão de obra quando aplicável.

**CLÁUSULA TERCEIRA - DO VALOR E FORMA DE PAGAMENTO**

3.1. O valor total dos serviços é de {{valorTotal}}.

3.2. O pagamento será realizado conforme condições acordadas entre as partes.

3.3. Periodicidade dos serviços: {{periodicidade}}

**CLÁUSULA QUARTA - DA VIGÊNCIA**

4.1. O presente contrato vigorará a partir da data de assinatura de ambas as partes{{prazoVigencia}}.

4.2. O contrato poderá ser prorrogado mediante acordo entre as partes.

**CLÁUSULA QUINTA - DAS OBRIGAÇÕES DO CONTRATANTE**

5.1. Executar os serviços contratados com qualidade e profissionalismo.

5.2. Fornecer materiais e equipamentos necessários, quando especificado no orçamento.

5.3. Cumprir os prazos e periodicidade estabelecidos.

5.4. Garantir a segurança no local de trabalho.

5.5. Manter seus profissionais devidamente capacitados e equipados.

**CLÁUSULA SEXTA - DAS OBRIGAÇÕES DO CONTRATADO**

6.1. Permitir o acesso às dependências do imóvel nos horários acordados.

6.2. Efetuar o pagamento nos prazos estabelecidos.

6.3. Comunicar imediatamente qualquer problema ou insatisfação com os serviços.

6.4. Fornecer as condições necessárias para execução dos serviços (água, energia, etc.).

**CLÁUSULA SÉTIMA - DA RESCISÃO**

7.1. O presente contrato poderá ser rescindido por qualquer das partes, mediante
comunicação prévia de 30 (trinta) dias.

7.2. Em caso de descumprimento de qualquer cláusula contratual, a parte prejudicada
poderá rescindir o contrato imediatamente, sem prejuízo das penalidades cabíveis.

7.3. Na hipótese de rescisão antecipada por parte do CONTRATADO, os valores já pagos
pelos serviços executados não serão reembolsados.

**CLÁUSULA OITAVA - DAS DISPOSIÇÕES GERAIS**

8.1. As partes elegem o foro da comarca de {{cidadeEmpresa}} para dirimir quaisquer
dúvidas ou questões oriundas do presente contrato, renunciando a qualquer outro,
por mais privilegiado que seja.

8.2. Este contrato foi assinado digitalmente pelas partes, com validade jurídica
conforme Lei nº 14.063/2020 e Medida Provisória nº 2.200-2/2001.

8.3. As partes declaram que leram, compreenderam e concordam com todos os termos
deste contrato.

E por estarem assim justos e contratados, assinam eletronicamente o presente instrumento.

{{cidadeEmpresa}}, {{dataEmissao}}.
`

/**
 * Variáveis disponíveis no template
 */
export const VARIAVEIS_TEMPLATE_PT_BR = [
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
  'valorTotal',
  'periodicidade',
  'prazoVigencia',
  'cidadeEmpresa',
  'dataEmissao',
]
