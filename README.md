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

### Setup do ambiente

```bash
# Clone o repositório
git clone https://github.com/edumoreirajj/n8n-nodes-br-data-utils.git
cd n8n-nodes-br-data-utils

# Instale as dependências
npm install

# Execute os testes
npm test

# Build do projeto
npm run build
```

### Scripts disponíveis

```bash
# Desenvolvimento
npm run build        # Compila TypeScript
npm run watch        # Compila em modo watch
npm run format       # Formata código com Prettier
npm run dev          # Build + testes

# Testes
npm test             # Executa todos os testes
npm run test:watch   # Testes em modo watch
npm run test:coverage # Testes com cobertura

# Testes específicos
npm test cpf     # Apenas testes de CPF
npm test cnpj    # Apenas testes de CNPJ
npm test cep     # Apenas testes de CEP
npm test telefone # Apenas testes de telefone
npm test validators # Todos os validadores
```

### Estrutura do projeto

```
n8n-nodes-br-data-utils/
├── nodes/BrDataUtils/
│   ├── validators/          # Validadores brasileiros
│   │   ├── cpf.ts          # Validação de CPF
│   │   ├── cnpj.ts         # Validação de CNPJ
│   │   ├── cep.ts          # Validação de CEP
│   │   ├── telefone.ts     # Validação de telefones
│   │   └── index.ts        # Exports centralizados
│   ├── types.ts            # TypeScript definitions
│   └── BrDataUtils.node.ts # Nó principal do n8n
├── tests/
│   ├── validators/         # Testes dos validadores
│   │   ├── cpf.test.ts
│   │   ├── cnpj.test.ts
│   │   ├── cep.test.ts
│   │   └── telefone.test.ts
│   └── setup.ts           # Configuração global dos testes
├── .prettierrc             # Configuração do Prettier
├── .editorconfig          # Configuração do Editor
├── .gitattributes         # Normalização Git
├── jest.config.js         # Configuração do Jest
└── tsconfig.json          # Configuração do TypeScript
```

### Padrões de código e formatação

Este projeto segue rigorosos padrões de código:

#### 🎨 Formatação automática com Prettier

```bash
npm run format  # Formata todo o código automaticamente
```

**Configuração (`.prettierrc`)**:
- **Fim de linha**: LF (Unix)
- **Ponto e vírgula**: Sempre presente
- **Aspas simples**: Preferidas
- **Indentação**: 2 espaços
- **Largura máxima**: 100 caracteres

#### 📝 EditorConfig

O projeto usa `.editorconfig` para consistência entre editores:
- Charset: UTF-8
- Fim de linha: LF
- Indentação: 2 espaços
- Remove espaços em branco no final das linhas

#### 🔀 Git normalization

Configurado via `.gitattributes`:
- Todos os arquivos de texto usam LF
- Arquivos binários preservados sem alteração

### Padrões de teste

Os testes seguem as boas práticas:

- **Jest** como framework de testes
- **TypeScript** com tipagem completa
- **Cobertura de código** com thresholds mínimos
- **Testes organizados** por validador e cenários
- **Casos de teste brasileiros** específicos

Cada validador possui testes abrangentes cobrindo:

- ✅ **Casos válidos**: Dados brasileiros corretos com diferentes formatações
- ❌ **Casos inválidos**: Dados incorretos, caracteres inválidos, tamanhos errados
- 🔄 **Edge cases**: Formatações mistas, espaços, valores nulos
- 🎨 **Formatação**: Mascaramento e limpeza de dados

### Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. **Execute formatação**: `npm run format`
4. **Execute os testes**: `npm test`
5. Commit suas mudanças (`git commit -am 'Adiciona nova feature'`)
6. Push para a branch (`git push origin feature/nova-feature`)
7. Abra um Pull Request

### Validação contínua

O projeto utiliza:

- **Pre-commit hooks** executam testes antes do commit
- **Prettier** para formatação automática consistente
- **EditorConfig** para padronização entre diferentes editores
- **GitHub Actions** para CI/CD automatizado
- **Cobertura de testes** mínima de 80%
- **Normalização Git** com LF em todos os arquivos texto

#### ⚡ Workflow de desenvolvimento recomendado

```bash
# 1. Faça suas alterações
# 2. Formate o código
npm run format

# 3. Execute os testes
npm test

# 4. Build do projeto
npm run build

# 5. Ou use o comando combinado
npm run dev  # Equivale a: build + test
```

## 📄 Licença

MIT License - veja [LICENSE](LICENSE) para detalhes.

## 🤝 Comunidade

- [Issues](https://github.com/edumoreirajj/n8n-nodes-br-data-utils/issues)
- [Discussions](https://github.com/edumoreirajj/n8n-nodes-br-data-utils/discussions)
- [n8n Community](https://community.n8n.io/)