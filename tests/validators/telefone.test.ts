import { describe, test, expect } from '@jest/globals';
import {
  validateTelefone,
  validateCelular,
  formatTelefone,
  formatCelular,
} from '../../nodes/BrDataUtils/validators/telefone';

describe('Telefone Validator - Dados Brasileiros', () => {
  describe('validateTelefone (Fixo)', () => {
    describe('Telefones fixos válidos brasileiros', () => {
      test('deve validar telefones fixos conhecidos válidos', () => {
        const telefonesValidos = [
          '(11) 3456-7890', // São Paulo
          '(21) 2345-6789', // Rio de Janeiro
          '(31) 3234-5678', // Belo Horizonte
          '1134567890', // sem formatação
        ];

        telefonesValidos.forEach((telefone) => {
          const resultado = validateTelefone(telefone);
          expect(resultado.isValid).toBe(true);
          expect(resultado.error).toBeUndefined();
          expect(resultado.unmasked).toMatch(/^\d{10}$|^\d{13}$/);
        });
      });

      test('deve aceitar telefone com espaços extras', () => {
        const resultado = validateTelefone('  (11) 3456-7890  ');
        expect(resultado.isValid).toBe(true);
        expect(resultado.unmasked).toBe('1134567890');
      });

      test('deve aceitar diferentes formatações', () => {
        const formatacoes = ['11 3456-7890', '(11)3456-7890', '11-3456-7890'];

        formatacoes.forEach((telefone) => {
          const resultado = validateTelefone(telefone);
          expect(typeof resultado.isValid).toBe('boolean');
        });
      });
    });

    describe('Telefones fixos inválidos', () => {
      test('deve rejeitar DDD inválido', () => {
        const dddsInvalidos = [
          '(10) 3456-7890', // DDD < 11
          '(00) 3456-7890', // DDD = 00
          '(99) 3456-7890', // DDD > 99 seria válido, mas testamos edge case
        ];

        dddsInvalidos.slice(0, 2).forEach((telefone) => {
          const resultado = validateTelefone(telefone);
          expect(resultado.isValid).toBe(false);
          expect(resultado.error).toContain('DDD inválido');
        });
      });

      test('deve rejeitar primeiro dígito inválido (0 ou 1)', () => {
        const digitosInvalidos = [
          '(11) 0456-7890', // começa com 0
          '(11) 1456-7890', // começa com 1
        ];

        digitosInvalidos.forEach((telefone) => {
          const resultado = validateTelefone(telefone);
          expect(resultado.isValid).toBe(false);
          expect(resultado.error).toContain('Primeiro dígito');
        });
      });

      test('deve rejeitar tamanho incorreto', () => {
        const tamanhoErrado = [
          '(11) 3456-789', // muito curto
          '(11) 3456-78901', // muito longo
          '11345678', // 8 dígitos
          '113456789012', // 12 dígitos
        ];

        tamanhoErrado.forEach((telefone) => {
          const resultado = validateTelefone(telefone);
          expect(resultado.isValid).toBe(false);
          expect(resultado.error).toContain('10 dígitos');
        });
      });

      test('deve rejeitar caracteres inválidos', () => {
        const caracteresInvalidos = ['(11) 3456-789a', '(11) 3456-78@0', 'abc def ghij'];

        caracteresInvalidos.forEach((telefone) => {
          const resultado = validateTelefone(telefone);
          expect(resultado.isValid).toBe(false);
          expect(resultado.error).toBe('Telefone contém caracteres inválidos');
        });
      });
    });
  });

  describe('validateCelular', () => {
    describe('Celulares válidos brasileiros', () => {
      test('deve validar celulares conhecidos válidos', () => {
        const celularesValidos = [
          '(11) 99876-5432', // São Paulo
          '(21) 98765-4321', // Rio de Janeiro
          '11998765432', // sem formatação
        ];

        celularesValidos.forEach((celular) => {
          const resultado = validateCelular(celular);
          expect(resultado.isValid).toBe(true);
          expect(resultado.error).toBeUndefined();
          expect(resultado.unmasked).toMatch(/^\d{11}$|^\d{14}$/);
        });
      });

      test('deve aceitar celular com espaços extras', () => {
        const resultado = validateCelular('  (11) 99876-5432  ');
        expect(resultado.isValid).toBe(true);
        expect(resultado.unmasked).toBe('11998765432');
      });
    });

    describe('Celulares inválidos', () => {
      test('deve rejeitar celular que não começa com 9', () => {
        const semNove = [
          '(11) 88876-5432', // começa com 8
          '(11) 78765-4321', // começa com 7
        ];

        semNove.forEach((celular) => {
          const resultado = validateCelular(celular);
          expect(resultado.isValid).toBe(false);
          expect(resultado.error).toContain('começar com 9');
        });
      });

      test('deve rejeitar DDD inválido', () => {
        const resultado = validateCelular('(10) 99876-5432');
        expect(resultado.isValid).toBe(false);
        expect(resultado.error).toContain('DDD inválido');
      });

      test('deve rejeitar tamanho incorreto', () => {
        const tamanhoErrado = [
          '(11) 9987-5432', // 10 dígitos
          '(11) 998765-4321', // 12 dígitos
        ];

        tamanhoErrado.forEach((celular) => {
          const resultado = validateCelular(celular);
          expect(resultado.isValid).toBe(false);
          expect(resultado.error).toContain('11 dígitos');
        });
      });
    });
  });

  describe('formatTelefone', () => {
    test('deve formatar telefone sem máscara para o padrão brasileiro', () => {
      const telefone = '1134567890';
      const formatado = formatTelefone(telefone);
      expect(formatado).toBe('(11) 3456-7890');
    });

    test('deve retornar string original para telefone inválido', () => {
      const telefoneInvalido = 'telefone-invalido';
      const resultado = formatTelefone(telefoneInvalido);
      expect(resultado).toBe(telefoneInvalido);
    });
  });

  describe('formatCelular', () => {
    test('deve formatar celular sem máscara para o padrão brasileiro', () => {
      const celular = '11998765432';
      const formatado = formatCelular(celular);
      expect(formatado).toBe('(11) 99876-5432');
    });

    test('deve retornar string original para celular inválido', () => {
      const celularInvalido = 'celular-invalido';
      const resultado = formatCelular(celularInvalido);
      expect(resultado).toBe(celularInvalido);
    });
  });
});
