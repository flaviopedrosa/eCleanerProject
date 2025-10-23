# Teste Manual - Traduções de CEP

Este arquivo é para testar manualmente se as traduções de CEP estão funcionando.

## Como testar:

1. Abra a aplicação em http://localhost:8080/
2. Navegue para "Clientes" → "Novo Cliente"
3. Digite um CEP inválido (ex: 00000-000) e saia do campo
4. Digite um CEP válido (ex: 01310-100) e saia do campo

## Traduções esperadas:

### Português (pt-BR):

- CEP inválido: "CEP não encontrado"
- CEP encontrado: "Endereço carregado com sucesso!"
- Erro de rede: "Erro ao buscar CEP. Verifique sua conexão."

### Inglês (en-US):

- CEP inválido: "ZIP Code not found"
- CEP encontrado: "Address loaded successfully!"
- Erro de rede: "Error fetching ZIP Code. Check your connection."

## Status das traduções:

✅ Chaves de tradução criadas em ambos idiomas
✅ Código utilizando as traduções via t()
✅ Funcionalidade integrada com notificações

## Possível problema:

Se as mensagens não estiverem sendo traduzidas, pode ser que o loading esteja interferindo.
