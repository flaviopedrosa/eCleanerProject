/**
 * Representa os dados bancários para recebimento de pagamentos
 */
export class DadosBancarios {
  /**
   * @param {string} banco Nome do banco
   * @param {string} agencia Número da agência
   * @param {string} conta Número da conta
   * @param {string} tipoConta Tipo da conta (corrente/poupança)
   * @param {string} titularConta Nome do titular da conta
   * @param {string} cpfCnpjTitular CPF ou CNPJ do titular
   */
  constructor(banco, agencia, conta, tipoConta, titularConta, cpfCnpjTitular) {
    if (!banco) throw new Error('Banco é obrigatório')
    if (!agencia) throw new Error('Agência é obrigatória')
    if (!conta) throw new Error('Conta é obrigatória')
    if (!tipoConta) throw new Error('Tipo de conta é obrigatório')
    if (!titularConta) throw new Error('Titular da conta é obrigatório')
    if (!cpfCnpjTitular) throw new Error('CPF/CNPJ do titular é obrigatório')

    this.Banco = banco
    this.Agencia = agencia
    this.Conta = conta
    this.TipoConta = tipoConta
    this.TitularConta = titularConta
    this.CpfCnpjTitular = cpfCnpjTitular
  }
}
