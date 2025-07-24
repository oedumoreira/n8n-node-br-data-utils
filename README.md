# n8n-nodes-br-data-utils

[![NPM Version](https://img.shields.io/npm/v/n8n-nodes-br-data-utils)](https://www.npmjs.com/package/n8n-nodes-br-data-utils)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Nó do n8n para validar e higienizar dados brasileiros (CPF, CNPJ, telefone, celular e CEP).

## 🚀 Instalação

```bash
npm install n8n-nodes-br-data-utils
```

## 📋 Funcionalidades

- ✅ **CPF**: Validação com dígitos verificadores + higienização
- ✅ **CNPJ**: Validação com dígitos verificadores + higienização  
- ✅ **Telefone**: Validação números fixos (10 dígitos) + higienização
- ✅ **Celular**: Validação números celulares (11 dígitos) + higienização
- ✅ **CEP**: Validação códigos postais (8 dígitos) + higienização

## 🎯 Como usar

1. Adicione o nó "BR Data Utils" no seu workflow
2. Selecione a operação (validar CPF, CNPJ, etc.)
3. Insira o valor a ser processado

## 📊 Saída

```json
{
  "operation": "validarCpf",
  "original": "111.444.777-35",
  "isValid": true,
  "masked": "111.444.777-35",
  "unmasked": "11144477735",
  "error": null
}
```

## 🔧 Desenvolvimento

```bash
npm install
npm run build
npm test
```

## � Licença

MIT License - veja [LICENSE](LICENSE) para detalhes.