/**
 * Template de Contrato em Inglês (en-US)
 */

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

2.1. Services to be provided include all items listed in the quote,
including materials and labor when applicable.

**ARTICLE THREE - PRICING AND PAYMENT**

3.1. The total service amount is {{valorTotal}}.

3.2. Payment will be made according to the conditions agreed between the parties.

3.3. Service frequency: {{periodicidade}}

**ARTICLE FOUR - TERM**

4.1. This agreement shall be effective from the date both parties sign{{prazoVigencia}}.

4.2. The agreement may be extended by mutual consent.

**ARTICLE FIVE - PROVIDER OBLIGATIONS**

5.1. Execute contracted services with quality and professionalism.

5.2. Supply necessary materials and equipment when specified in the quote.

5.3. Comply with established deadlines and frequency.

5.4. Ensure workplace safety.

5.5. Maintain properly trained and equipped personnel.

**ARTICLE SIX - CLIENT OBLIGATIONS**

6.1. Allow access to the property premises during agreed hours.

6.2. Make payments within established deadlines.

6.3. Immediately communicate any problems or dissatisfaction with services.

6.4. Provide necessary conditions for service execution (water, electricity, etc.).

**ARTICLE SEVEN - TERMINATION**

7.1. This agreement may be terminated by either party with 30 (thirty) days
prior notice.

7.2. In case of breach of any contractual clause, the aggrieved party may
terminate the agreement immediately, without prejudice to applicable penalties.

7.3. In the event of early termination by the CLIENT, amounts already paid
for services performed will not be refunded.

**ARTICLE EIGHT - GENERAL PROVISIONS**

8.1. The parties elect the jurisdiction of {{cidadeEmpresa}} to resolve any
doubts or issues arising from this agreement, waiving any other jurisdiction,
however privileged it may be.

8.2. This agreement was digitally signed by the parties, with legal validity
according to applicable electronic signature laws.

8.3. The parties declare that they have read, understood, and agree to all
terms of this agreement.

Being thus agreed, the parties electronically sign this instrument.

{{cidadeEmpresa}}, {{dataEmissao}}.
`

/**
 * Variáveis disponíveis no template
 */
export const VARIAVEIS_TEMPLATE_EN_US = [
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
