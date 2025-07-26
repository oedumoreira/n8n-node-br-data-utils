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
```

## 🎯 Guidelines para Development

### Ao criar/modificar validadores:
1. **Sempre escreva testes primeiro** (TDD)
2. **Use dados brasileiros reais** nos testes
3. **Implemente sanitização** antes da validação
4. **Retorne sempre `ValidationResult`**
5. **Trate erros graciosamente**

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

### Padrão de commit:
- Execute `npm test` antes de commit
- Use conventional commits
- Mantenha cobertura > 80%

## 🔧 Comandos Importantes

### Desenvolvimento:
```bash
npm run build           # Compila TypeScript
npm run watch          # Desenvolvimento em tempo real
npm run dev            # Build + testes
```

### Testes (TDD):
```bash
npm run test:watch     # Desenvolvimento com testes
npm run test:coverage  # Verificar cobertura
```

## 🌟 Objetivos do Projeto

- **Qualidade de código open source**
- **Cobertura de testes > 80%**
- **Padrões brasileiros específicos**
- **Performance otimizada**
- **Documentação completa**

---

**Lembre-se**: Este é um projeto **open source** brasileiro, mantenha a qualidade profissional em todas as contribuições! 🇧🇷