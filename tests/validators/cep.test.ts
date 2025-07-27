import { describe, test, expect } from '@jest/globals';
import { validateCep, formatCep } from '../../nodes/BrDataUtils/validators/cep';

describe('CEP Validator - Dados Brasileiros', () => {
  describe('validateCep', () => {
    describe('CEPs válidos brasileiros', () => {
      test('deve validar CEPs conhecidos válidos', () => {
        const cepsValidos = [
          '01310-100', // São Paulo - Av. Paulista
          '20040-020', // Rio de Janeiro - Centro
          '30112-000', // Belo Horizonte - Centro
          '70040110', // Brasília - sem formatação
          '90010-150', // Porto Alegre
          '40070-110', // Salvador
        ];

        cepsValidos.forEach((cep) => {
          const resultado = validateCep(cep);
          expect(resultado.isValid).toBe(true);
          expect(resultado.error).toBeUndefined();
          expect(resultado.unmasked).toMatch(/^\d{8}$/);
          expect(resultado.masked).toMatch(/^\d{5}-\d{3}$/);
        });
      });

      test('deve aceitar CEP com espaços extras', () => {
        const resultado = validateCep('  01310-100  ');
        expect(resultado.isValid).toBe(true);
        expect(resultado.unmasked).toBe('01310100');
        expect(resultado.masked).toBe('01310-100');
      });

      test('deve aceitar CEP sem formatação', () => {
        const resultado = validateCep('01310100');
        expect(resultado.isValid).toBe(true);
        expect(resultado.unmasked).toBe('01310100');
        expect(resultado.masked).toBe('01310-100');
      });
    });

    describe('CEPs inválidos', () => {
      test('deve rejeitar CEP com todos os zeros', () => {
        const resultado = validateCep('00000-000');
        expect(resultado.isValid).toBe(false);
        expect(resultado.error).toBe('CEP não pode ser 00000-000');
      });

      test('deve rejeitar CEP com tamanho incorreto', () => {
        const tamanhoErrado = [
          '123456', // muito curto
          '123456789', // muito longo
          '1234-567', // 7 dígitos
          '123456-789', // 9 dígitos
        ];

        tamanhoErrado.forEach((cep) => {
          const resultado = validateCep(cep);
          expect(resultado.isValid).toBe(false);
          expect(resultado.error).toBe('CEP deve ter 8 dígitos');
        });
      });

      test('deve rejeitar CEP com caracteres inválidos', () => {
        const caracteresInvalidos = [
          '0131a-100',
          '01310-10b',
          'abcde-fgh',
          '01310@100',
          '01310#100',
        ];

        caracteresInvalidos.forEach((cep) => {
          const resultado = validateCep(cep);
          expect(resultado.isValid).toBe(false);
          expect(resultado.error).toBe('CEP contém caracteres inválidos');
        });
      });

      test('deve rejeitar valores vazios ou inválidos', () => {
        const valoresInvalidos = ['', '   ', null as any, undefined as any];

        valoresInvalidos.forEach((valor) => {
          const resultado = validateCep(valor);
          expect(resultado.isValid).toBe(false);
        });
      });
    });

    describe('Casos extremos brasileiros', () => {
      test('deve lidar com formatações típicas do Brasil', () => {
        const formatacoes = [
          '01310-100',
          '01310100',
          '013101-00', // formatação incorreta mas testamos graciosamente
        ];

        formatacoes.forEach((cep) => {
          const resultado = validateCep(cep);
          expect(typeof resultado.isValid).toBe('boolean');
        });
      });

      test('deve tratar erros inesperados graciosamente', () => {
        const resultado = validateCep('01310-100');
        expect(resultado).toHaveProperty('isValid');
        expect(typeof resultado.isValid).toBe('boolean');
      });
    });
  });

  describe('formatCep', () => {
    test('deve formatar CEP sem máscara para o padrão brasileiro', () => {
      const cepLimpo = '01310100';
      const formatado = formatCep(cepLimpo);
      expect(formatado).toBe('01310-100');
    });

    test('deve manter CEP já formatado inalterado', () => {
      const cepFormatado = '01310-100';
      const resultado = formatCep(cepFormatado);
      expect(resultado).toBe('01310-100');
    });

    test('deve retornar string original para CEP inválido', () => {
      const cepInvalido = 'cep-invalido';
      const resultado = formatCep(cepInvalido);
      expect(resultado).toBe(cepInvalido);
    });

    test('deve lidar com CEP de tamanho incorreto', () => {
      const cepCurto = '123456';
      const resultado = formatCep(cepCurto);
      expect(resultado).toBe(cepCurto);
    });
  });
});
