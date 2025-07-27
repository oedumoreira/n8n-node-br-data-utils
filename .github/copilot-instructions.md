# GitHub Copilot – Instruções para `n8n-nodes-br-data-utils`

## 📋 Sobre o Projeto

O `n8n-nodes-br-data-utils` é uma biblioteca TypeScript **Open Source** para ser usada como nó customizado no n8n, com utilitários especializados para manipulação e validação de dados brasileiros.

### Funcionalidades principais:
- **CPF**: Validação com algoritmo de dígitos verificadores + formatação
- **CNPJ**: Validação com algoritmo de dígitos verificadores + formatação  
- **CEP**: Validação de códigos postais brasileiros + formatação
- **Telefone/Celular**: Validação de números brasileiros + formatação
- **Higienização**: Limpeza e padronização de dados

## 🏗️ Arquitetura

### Estrutura do código:
```
nodes/BrDataUtils/
├── validators/           # Validadores brasileiros independentes
│   ├── cpf.ts           # Lógica específica de CPF
│   ├── cnpj.ts          # Lógica específica de CNPJ
│   ├── cep.ts           # Lógica específica de CEP
│   ├── telefone.ts      # Lógica específica de telefones
│   └── index.ts         # Exports centralizados
├── types.ts             # Definições TypeScript
└── BrDataUtils.node.ts  # Integração com n8n
```

### Padrões de código:
- **TypeScript** com tipagem rigorosa
- **Funções puras** para validadores
- **Sanitização** consistente de entrada
- **Retorno padronizado** com `ValidationResult`
- **Tratamento de erros** gracioso

## 🎨 Formatação e Padronização de Código

### Prettier - Formatação Automática

**OBRIGATÓRIO**: Use sempre `npm run format` antes de commits!

```bash
npm run format  # Formata automaticamente todo o código
```

#### Configuração do Prettier (`.prettierrc`):
```json
{
  "endOfLine": "lf",        # Sempre LF (Unix) - nunca CRLF
  "semi": true,             # Ponto e vírgula obrigatório
  "singleQuote": true,      # Aspas simples preferidas
  "tabWidth": 2,            # Indentação: 2 espaços
  "printWidth": 100         # Máximo 100 caracteres por linha
}
```

### EditorConfig - Padronização entre Editores

Configuração aplicada automaticamente:
- **Charset**: UTF-8
- **Fim de linha**: LF (Unix)
- **Indentação**: 2 espaços (nunca tabs)
- **Espaços em branco**: Removidos no final das linhas
- **Linha final**: Sempre presente

### Git Attributes - Normalização

Configurado via `.gitattributes`:
- Todos os arquivos texto → LF
- Arquivos binários → Preservados
- Conversão automática no checkout/commit

## 🧪 Sistema de Testes

### Framework: Jest + TypeScript
- **Localização**: `tests/validators/`
- **Configuração**: `jest.config.js`
- **Setup global**: `tests/setup.ts`

### Estrutura de testes:
```
tests/
├── validators/
│   ├── cpf.test.ts      # Testes completos de CPF
│   ├── cnpj.test.ts     # Testes completos de CNPJ
│   ├── cep.test.ts      # Testes completos de CEP
│   └── telefone.test.ts # Testes completos de telefone
└── setup.ts             # Configuração para dados brasileiros
```

### Padrões de teste obrigatórios:
1. **Casos válidos brasileiros**: Dados reais e formatações aceitas
2. **Casos inválidos**: Dígitos verificadores errados, caracteres inválidos
3. **Edge cases**: Valores nulos, espaços, formatações mistas
4. **Formatação**: Testes de mascaramento e limpeza

### Scripts de teste:
```bash
npm test                 # Todos os testes
npm test cnpj            # Exemplo de teste específicos (CNPJ) - aplicável para outros validadores...
npm run test:watch       # Testes em modo watch (desenvolvimento)
npm run test:coverage    # Testes com relatório de cobertura
```

## 🎯 Guidelines para Development

### Workflow de Desenvolvimento (OBRIGATÓRIO):
```bash
# 1. Sempre antes de começar
npm run format

# 2. Durante o desenvolvimento
npm run test:watch  # Testes contínuos

# 3. Antes de commit
npm run format      # Formatar código
npm test           # Validar testes
npm run build      # Compilar TypeScript

# 4. Comando combinado
npm run dev        # build + test automaticamente
```

### Ao criar/modificar validadores:
1. **Sempre escreva testes primeiro** (TDD)
2. **Use dados brasileiros reais** nos testes
3. **Implemente sanitização** antes da validação
4. **Retorne sempre `ValidationResult`**
5. **Trate erros graciosamente**
6. **Formate com Prettier** antes de commit

### Estrutura de função validadora:
```typescript
export function validateX(value: string, options: ValidatorOptions = {}): ValidationResult {
  try {
    const { cleaned, isValidFormat } = sanitizeX(value);
    
    if (!isValidFormat) {
      return { isValid: false, error: 'Formato inválido' };
    }
    
    // Validação específica...
    
    return {
      isValid: true,
      unmasked: cleaned,
      masked: formatX(cleaned)
    };
  } catch (error) {
    return { isValid: false, error: 'Erro na validação' };
  }
}
```

### Ao escrever testes:
1. **Organize por `describe` aninhados**:
   - `describe('Validator Name')`
   - `describe('validateFunction')`
   - `describe('casos válidos/inválidos')`

2. **Use dados brasileiros específicos**:
   - CPFs/CNPJs com dígitos verificadores corretos
   - CEPs de cidades brasileiras conhecidas
   - DDDs e telefones brasileiros válidos

3. **Teste todos os cenários**:
   - Formatado vs não formatado
   - Com/sem espaços
   - Caracteres inválidos
   - Tamanhos incorretos
   - Valores null/undefined

### Regras de Formatação de Código:

#### ✅ FAZER:
```typescript
// Aspas simples
const message = 'Validação realizada';

// Ponto e vírgula sempre
const result = validateCpf(cpf);

// Indentação 2 espaços
if (isValid) {
  return {
    isValid: true,
    masked: formatted
  };
}

// Máximo 100 caracteres por linha
const longMessage = 
  'Esta é uma mensagem muito longa que precisa ser quebrada em múltiplas linhas';
```

#### ❌ NÃO FAZER:
```typescript
// Aspas duplas (Prettier vai corrigir)
const message = "Validação realizada"

// Sem ponto e vírgula (Prettier vai corrigir)
const result = validateCpf(cpf)

// Indentação inconsistente (Prettier vai corrigir)
if (isValid) {
    return {
        isValid: true,
        masked: formatted
    }
}
```

### Padrão de commit:
```bash
# Antes de QUALQUER commit
npm run format      # OBRIGATÓRIO
npm test           # OBRIGATÓRIO
npm run build      # OBRIGATÓRIO

# Depois fazer o commit
git add .
git commit -m "feat: adiciona validação de RG"
```

### Configurações do Projeto:

#### Arquivos de configuração importantes:
- `.prettierrc` - Formatação de código
- `.editorconfig` - Padronização entre editores  
- `.gitattributes` - Normalização Git (LF)
- `jest.config.js` - Configuração de testes
- `tsconfig.json` - Configuração TypeScript

## 🔧 Comandos Importantes

### Desenvolvimento:
```bash
npm run build           # Compila TypeScript
npm run watch          # Desenvolvimento em tempo real
npm run format         # Formata código com Prettier (OBRIGATÓRIO)
npm run dev            # Build + testes
```

### Testes (TDD):
```bash
npm run test:watch     # Desenvolvimento com testes
npm run test:coverage  # Verificar cobertura
```

## 🌟 Objetivos do Projeto

- **Qualidade de código open source**
- **Formatação consistente com Prettier**
- **Padronização rigorosa entre desenvolvedores**
- **Cobertura de testes > 80%**
- **Padrões brasileiros específicos**
- **Performance otimizada**
- **Documentação completa**

## ⚠️ Regras OBRIGATÓRIAS

1. **SEMPRE** execute `npm run format` antes de commits
2. **SEMPRE** execute `npm test` antes de commits  
3. **NUNCA** altere as configurações do Prettier sem discussão
4. **USE** apenas LF (Unix) como fim de linha
5. **MANTENHA** indentação de 2 espaços consistente
6. **RESPEITE** limite de 100 caracteres por linha

---

**Lembre-se**: Este é um projeto **open source** brasileiro com padrões rígidos de qualidade e formatação. Mantenha a excelência profissional em todas as contribuições! 🇧🇷

**Formatação é OBRIGATÓRIA**: `npm run format` antes de todo commit! 🎨