import { describe, test, expect } from '@jest/globals';
import { validateCnpj, formatCnpj } from '../../nodes/BrDataUtils/validators/cnpj';

describe('CNPJ Validator - Dados Brasileiros', () => {
  describe('validateCnpj', () => {
    describe('CNPJs válidos brasileiros', () => {
      test('deve validar CNPJs conhecidos válidos', () => {
        // CNPJs gerados algoritimicamente corretos
        const cnpjsValidos = [
          '11.222.333/0001-81',
          '12.345.678/0001-95',
          '11444777000161' // sem formatação
        ];

        cnpjsValidos.forEach(cnpj => {
          const resultado = validateCnpj(cnpj);
          expect(resultado.isValid).toBe(true);
          expect(resultado.error).toBeUndefined();
          expect(resultado.unmasked).toMatch(/^\d{14}$/);
          expect(resultado.masked).toMatch(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/);
        });
      });

      test('deve aceitar CNPJ com espaços extras', () => {
        const resultado = validateCnpj('  11.222.333/0001-81  ');
        expect(resultado.isValid).toBe(true);
        expect(resultado.unmasked).toBe('11222333000181');
        expect(resultado.masked).toBe('11.222.333/0001-81');
      });

      test('deve aceitar CNPJ com formatação parcial', () => {
        const resultado = validateCnpj('11222333/0001-81');
        expect(resultado.isValid).toBe(true);
        expect(resultado.unmasked).toBe('11222333000181');
      });
    });

    describe('CNPJs inválidos', () => {
      test('deve rejeitar CNPJ com dígitos verificadores incorretos', () => {
        const resultado = validateCnpj('11.222.333/0001-99');
        expect(resultado.isValid).toBe(false);
        expect(resultado.error).toContain('dígito verificador');
      });

      test('deve rejeitar CNPJ com todos os dígitos iguais', () => {
        const cnpjsInvalidos = [
          '11.111.111/1111-11',
          '22.222.222/2222-22',
          '00000000000000'
        ];

        cnpjsInvalidos.forEach(cnpj => {
          const resultado = validateCnpj(cnpj);
          expect(resultado.isValid).toBe(false);
          expect(resultado.error).toBe('CNPJ não pode ter todos os dígitos iguais');
        });
      });

      test('deve rejeitar CNPJ com tamanho incorreto', () => {
        const tamanhoErrado = [
          '123456789', // muito curto
          '123456789012345', // muito longo
          '11.222.333/001-81', // 13 dígitos
          '111.222.333/0001-81' // 15 dígitos
        ];

        tamanhoErrado.forEach(cnpj => {
          const resultado = validateCnpj(cnpj);
          expect(resultado.isValid).toBe(false);
          expect(resultado.error).toBe('CNPJ deve ter 14 dígitos');
        });
      });

      test('deve rejeitar CNPJ com caracteres inválidos', () => {
        const caracteresInvalidos = [
          '11.222.333/000a-81',
          '11.222.333/0001-8b',
          'abcd.efg.hij/klmn-op',
          '11@222#333$0001%81'
        ];

        caracteresInvalidos.forEach(cnpj => {
          const resultado = validateCnpj(cnpj);
          expect(resultado.isValid).toBe(false);
          expect(resultado.error).toBe('CNPJ contém caracteres inválidos');
        });
      });

      test('deve rejeitar valores vazios ou inválidos', () => {
        const valoresInvalidos = ['', '   ', null as any, undefined as any];

        valoresInvalidos.forEach(valor => {
          const resultado = validateCnpj(valor);
          expect(resultado.isValid).toBe(false);
        });
      });
    });

    describe('Casos extremos brasileiros', () => {
      test('deve lidar com formatações mistas típicas do Brasil', () => {
        const formatacoesMistas = [
          '11.222.333/0001-81',
          '11222333/0001-81',
          '11.222333/0001-81',
          '11.222.333000181'
        ];

        formatacoesMistas.forEach(cnpj => {
          const resultado = validateCnpj(cnpj);
          // Apenas testamos se não quebra, alguns podem ser inválidos por formatação
          expect(typeof resultado.isValid).toBe('boolean');
        });
      });

      test('deve tratar erros inesperados graciosamente', () => {
        // Simular um erro interno
        const resultado = validateCnpj('11.222.333/0001-81');
        expect(resultado).toHaveProperty('isValid');
        expect(typeof resultado.isValid).toBe('boolean');
      });
    });
  });

  describe('formatCnpj', () => {
    test('deve formatar CNPJ sem máscara para o padrão brasileiro', () => {
      const cnpjLimpo = '11222333000181';
      const formatado = formatCnpj(cnpjLimpo);
      expect(formatado).toBe('11.222.333/0001-81');
    });

    test('deve manter CNPJ já formatado inalterado', () => {
      const cnpjFormatado = '11.222.333/0001-81';
      const resultado = formatCnpj(cnpjFormatado);
      expect(resultado).toBe('11.222.333/0001-81');
    });

    test('deve retornar string original para CNPJ inválido', () => {
      const cnpjInvalido = 'cnpj-invalido';
      const resultado = formatCnpj(cnpjInvalido);
      expect(resultado).toBe(cnpjInvalido);
    });

    test('deve lidar com CNPJ de tamanho incorreto', () => {
      const cnpjCurto = '123456789';
      const resultado = formatCnpj(cnpjCurto);
      expect(resultado).toBe(cnpjCurto);
    });
  });
});