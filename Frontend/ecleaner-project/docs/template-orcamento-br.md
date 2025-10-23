<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body {
      font-family: 'Montserrat', 'Helvetica', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 650px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f4f4f4;
    }
    .container {
      background-color: #ffffff;
      border-radius: 8px;
      padding: 30px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    .header {
      text-align: center;
      border-bottom: 3px solid #464646;
      padding-bottom: 20px;
      margin-bottom: 30px;
    }
    .header h1 {
      color: #464646;
      margin: 0;
      font-size: 28px;
    }
    .header p {
      color: #666;
      margin: 5px 0 0 0;
      font-size: 14px;
    }
    .info-section {
      background-color: #f8f9fa;
      padding: 15px;
      border-radius: 5px;
      margin-bottom: 25px;
    }
    .info-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 8px;
    }
    .info-label {
      font-weight: 600;
      color: #464646;
    }
    .info-value {
      color: #666;
    }
    .greeting {
      font-size: 16px;
      margin-bottom: 20px;
    }
    .items-section {
      margin: 25px 0;
    }
    .items-section h2 {
      color: #464646;
      font-size: 18px;
      margin-bottom: 15px;
      border-bottom: 2px solid #e0e0e0;
      padding-bottom: 10px;
    }
    .items-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 20px;
    }
    .items-table th {
      background-color: #464646;
      color: white;
      padding: 12px 8px;
      text-align: left;
      font-size: 12px;
      font-weight: 600;
    }
    .items-table td {
      padding: 10px 8px;
      border-bottom: 1px solid #e0e0e0;
      font-size: 13px;
    }
    .items-table tr:nth-child(even) {
      background-color: #f8f9fa;
    }
    .items-table tr:hover {
      background-color: #f0f0f0;
    }
    .text-right {
      text-align: right;
    }
    .text-center {
      text-align: center;
    }
    .total-section {
      background-color: #464646;
      color: white;
      padding: 20px;
      border-radius: 5px;
      text-align: right;
      margin-bottom: 30px;
    }
    .total-section .label {
      font-size: 16px;
      font-weight: 500;
    }
    .total-section .value {
      font-size: 28px;
      font-weight: 700;
      margin-top: 5px;
    }
    .approval-section {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 25px;
      border-radius: 8px;
      text-align: center;
      margin-bottom: 25px;
    }
    .approval-section h3 {
      margin: 0 0 15px 0;
      font-size: 20px;
    }
    .approval-section p {
      margin: 0 0 20px 0;
      font-size: 14px;
      opacity: 0.95;
    }
    .btn {
      display: inline-block;
      padding: 14px 35px;
      margin: 5px;
      text-decoration: none;
      border-radius: 5px;
      font-weight: 600;
      font-size: 15px;
      transition: all 0.3s ease;
    }
    .btn-approve {
      background-color: #28a745;
      color: white;
    }
    .btn-approve:hover {
      background-color: #218838;
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0,0,0,0.2);
    }
    .btn-contact {
      background-color: white;
      color: #667eea;
    }
    .btn-contact:hover {
      background-color: #f8f9fa;
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0,0,0,0.2);
    }
    .notes-section {
      background-color: #fff3cd;
      border-left: 4px solid #ffc107;
      padding: 15px;
      margin-bottom: 25px;
      border-radius: 4px;
    }
    .notes-section h4 {
      color: #856404;
      margin: 0 0 10px 0;
      font-size: 14px;
    }
    .notes-section p {
      color: #856404;
      margin: 0;
      font-size: 13px;
    }
    .footer {
      text-align: center;
      padding-top: 20px;
      border-top: 2px solid #e0e0e0;
      margin-top: 30px;
      color: #666;
      font-size: 13px;
    }
    .footer p {
      margin: 5px 0;
    }
    .footer a {
      color: #667eea;
      text-decoration: none;
    }
    .attachment-info {
      background-color: #e3f2fd;
      border-left: 4px solid #2196f3;
      padding: 12px 15px;
      margin-bottom: 20px;
      border-radius: 4px;
      font-size: 13px;
      color: #1565c0;
    }
    .attachment-info strong {
      display: block;
      margin-bottom: 5px;
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Cabeçalho -->
    <div class="header">
      <h1>{{nomeEmpresa}}</h1>
      <p>Orçamento Profissional</p>
    </div>

    <!-- Saudação -->
    <p class="greeting">Olá <strong>{{clienteNome}}</strong>,</p>
    <p>Agradecemos pelo seu interesse em nossos serviços! Segue abaixo o orçamento detalhado conforme solicitado.</p>

    <!-- Informações do Orçamento -->
    <div class="info-section">
      <div class="info-row">
        <span class="info-label">📋 Número do Orçamento:</span>
        <span class="info-value">#{{numeroOrcamento}}</span>
      </div>
      <div class="info-row">
        <span class="info-label">📅 Data de Emissão:</span>
        <span class="info-value">{{dataEmissao}}</span>
      </div>
      <div class="info-row">
        <span class="info-label">⏰ Validade:</span>
        <span class="info-value">{{validade}}</span>
      </div>
      <div class="info-row">
        <span class="info-label">📍 Status:</span>
        <span class="info-value">{{status}}</span>
      </div>
    </div>

    <!-- Informação sobre Anexo PDF -->
    <div class="attachment-info">
      <strong>📎 Documento em Anexo</strong>
      Um arquivo PDF completo com todos os detalhes está anexado a este e-mail para sua conveniência.
    </div>

    <!-- Itens do Orçamento -->
    <div class="items-section">
      <h2>📦 Itens do Orçamento</h2>
      <table class="items-table">
        <thead>
          <tr>
            <th class="text-center">#</th>
            <th>Descrição</th>
            <th class="text-center">Qtd</th>
            <th class="text-center">Un</th>
            <th class="text-right">Preço Unit.</th>
            <th class="text-right">Total</th>
          </tr>
        </thead>
        <tbody>
          {{#each itens}}
          <tr>
            <td class="text-center">{{numero}}</td>
            <td>{{descricao}}</td>
            <td class="text-center">{{quantidade}}</td>
            <td class="text-center">{{unidade}}</td>
            <td class="text-right">{{precoUnitario}}</td>
            <td class="text-right"><strong>{{total}}</strong></td>
          </tr>
          {{/each}}
        </tbody>
      </table>
    </div>

    <!-- Total -->
    <div class="total-section">
      <div class="label">VALOR TOTAL</div>
      <div class="value">{{valorTotal}}</div>
    </div>

    <!-- Observações (se houver) -->
    {{#if observacoes}}
    <div class="notes-section">
      <h4>📝 Observações Importantes:</h4>
      <p>{{observacoes}}</p>
    </div>
    {{/if}}

    <!-- Seção de Aprovação -->
    <div class="approval-section">
      <h3>✨ Gostou do Orçamento?</h3>
      <p>Estamos prontos para iniciar o trabalho! Clique abaixo para aprovar ou entre em contato para esclarecimentos.</p>
      <div>
        <a href="mailto:{{emailEmpresa}}?subject=Aprovação%20Orçamento%20%23{{numeroOrcamento}}&body=Olá%2C%20gostaria%20de%20APROVAR%20o%20orçamento%20%23{{numeroOrcamento}}." class="btn btn-approve">
          ✅ Aprovar Orçamento
        </a>
        <a href="mailto:{{emailEmpresa}}?subject=Dúvidas%20sobre%20Orçamento%20%23{{numeroOrcamento}}" class="btn btn-contact">
          💬 Tenho Dúvidas
        </a>
      </div>
    </div>

    <!-- Mensagem de Fechamento -->
    <p>Ficamos à disposição para quaisquer esclarecimentos. Estamos ansiosos para trabalhar com você!</p>

    <p style="margin-top: 20px;">
      Atenciosamente,<br>
      <strong>{{nomeEmpresa}}</strong>
    </p>

    <!-- Rodapé -->
    <div class="footer">
      <p><strong>{{nomeEmpresa}}</strong></p>
      <p>📧 {{emailEmpresa}} | 📞 {{telefoneEmpresa}}</p>
      <p>{{enderecoCompleto}}</p>
      <p style="margin-top: 15px; font-size: 11px; color: #999;">
        Este é um e-mail automático. Por favor, não responda diretamente a esta mensagem.
      </p>
    </div>

  </div>
</body>
</html>
