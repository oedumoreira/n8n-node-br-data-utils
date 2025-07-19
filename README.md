# n8n-node-br-data-utils

[![NPM Version](https://img.shields.io/npm/v/n8n-node-br-data-utils)](https://www.npmjs.com/package/n8n-node-br-data-utils)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Um nó do n8n para validar e formatar dados brasileiros como CPF, CNPJ, telefone, celular e CEP.

## 🚀 Instalação

```bash
npm install n8n-node-br-data-utils
```

## 📋 Funcionalidades

### Validações
- ✅ **CPF**: Validação completa com dígitos verificadores
- ✅ **CNPJ**: Validação completa com dígitos verificadores
- ✅ **Telefone**: Validação de números fixos brasileiros (10 dígitos)
- ✅ **Celular**: Validação de números celulares brasileiros (11 dígitos)
- ✅ **CEP**: Validação de códigos postais brasileiros (8 dígitos)

### Formatações
- 🎨 **CPF**: Formato XXX.XXX.XXX-XX
- 🎨 **CNPJ**: Formato XX.XXX.XXX/XXXX-XX
- 🎨 **Telefone**: Formato (XX) XXXX-XXXX
- 🎨 **Celular**: Formato (XX) 9XXXX-XXXX
- 🎨 **CEP**: Formato XXXXX-XXX

## 🎯 Como usar no n8n

1. Adicione o nó "BR Data Utils" ao seu workflow
2. Selecione a operação desejada (validar ou formatar)
3. Insira o valor a ser processado
4. O resultado será retornado com:
   - `original`: Valor original
   - `isValid`: Boolean indicando se é válido
   - `formatted`: Valor formatado (quando aplicável)
   - `error`: Mensagem de erro (se houver)

## 📊 Exemplo de Saída

```json
{
  "operation": "validarCpf",
  "original": "11144477735",
  "isValid": true,
  "formatted": null,
  "error": null
}
```

```json
{
  "operation": "formatarCpf",
  "original": "11144477735",
  "isValid": true,
  "formatted": "111.444.777-35",
  "error": null
}
```

## 🔧 Desenvolvimento

```bash
# Instalar dependências
npm install

# Compilar
npm run build

# Executar testes
npm test

# Modo watch
npm run watch
```

## 📝 Estrutura do Projeto

```
nodes/
  BrDataUtils/
    validators/
      cpf.ts        # Validação e formatação de CPF
      cnpj.ts       # Validação e formatação de CNPJ
      telefone.ts   # Validação e formatação de telefone/celular
      cep.ts        # Validação e formatação de CEP
      index.ts      # Exportações principais
    types.ts        # Interfaces e tipos TypeScript
    BrDataUtils.node.ts   # Nó principal do n8n
tests/
  validators.test.ts      # Testes dos validators
```

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para detalhes.

## 🐛 Reportar Bugs

Se você encontrar algum bug, por favor [abra uma issue](https://github.com/oedumoreira/n8n-node-br-data-utils/issues) com detalhes sobre o problema.

## 🙏 Agradecimentos

- Comunidade n8n
- Desenvolvedores que contribuíram com validações de dados brasileiros