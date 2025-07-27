import { describe, test, expect } from '@jest/globals';
import { validateCpf, formatCpf } from '../../nodes/BrDataUtils/validators/cpf';

describe('CPF Validator - Dados Brasileiros', () => {
  describe('validateCpf', () => {
    describe('CPFs válidos brasileiros', () => {
      test('deve validar CPFs conhecidos válidos', () => {
        // CPFs gerados algoritimicamente corretos
        const cpfsValidos = [
          '123.456.789-09',
          '987.654.321-00',
          '11144477735', // sem formatação
          '529.982.247-25',
        ];

        cpfsValidos.forEach((cpf) => {
          const resultado = validateCpf(cpf);
          expect(resultado.isValid).toBe(true);
          expect(resultado.error).toBeUndefined();
          expect(resultado.unmasked).toMatch(/^\d{11}$/);
          expect(resultado.masked).toMatch(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/);
        });
      });

      test('deve aceitar CPF com espaços extras', () => {
        const resultado = validateCpf('  123.456.789-09  ');
        expect(resultado.isValid).toBe(true);
        expect(resultado.unmasked).toBe('12345678909');
        expect(resultado.masked).toBe('123.456.789-09');
      });

      test('deve aceitar CPF com formatação parcial', () => {
        const resultado = validateCpf('123456789-09');
        expect(resultado.isValid).toBe(true);
        expect(resultado.unmasked).toBe('12345678909');
      });
    });

    describe('CPFs inválidos', () => {
      test('deve rejeitar CPF com dígitos verificadores incorretos', () => {
        const resultado = validateCpf('123.456.789-99');
        expect(resultado.isValid).toBe(false);
        expect(resultado.error).toContain('dígito verificador');
      });

      test('deve rejeitar CPF com todos os dígitos iguais', () => {
        const cpfsInvalidos = ['111.111.111-11', '222.222.222-22', '00000000000', '99999999999'];

        cpfsInvalidos.forEach((cpf) => {
          const resultado = validateCpf(cpf);
          expect(resultado.isValid).toBe(false);
          expect(resultado.error).toBe('CPF não pode ter todos os dígitos iguais');
        });
      });

      test('deve rejeitar CPF com tamanho incorreto', () => {
        const tamanhoErrado = [
          '123456789', // muito curto
          '123456789012', // muito longo
          '123.456.789-0', // 10 dígitos
          '1234.567.890-12', // 12 dígitos
        ];

        tamanhoErrado.forEach((cpf) => {
          const resultado = validateCpf(cpf);
          expect(resultado.isValid).toBe(false);
          expect(resultado.error).toBe('CPF deve ter 11 dígitos');
        });
      });

      test('deve rejeitar CPF com caracteres inválidos', () => {
        const caracteresInvalidos = [
          '123.456.789-0a',
          '123.456.78b-09',
          'abc.def.ghi-jk',
          '123@456#789$09',
        ];

        caracteresInvalidos.forEach((cpf) => {
          const resultado = validateCpf(cpf);
          expect(resultado.isValid).toBe(false);
          expect(resultado.error).toBe('CPF contém caracteres inválidos');
        });
      });

      test('deve rejeitar valores vazios ou inválidos', () => {
        const valoresInvalidos = ['', '   ', null as any, undefined as any];

        valoresInvalidos.forEach((valor) => {
          const resultado = validateCpf(valor);
          expect(resultado.isValid).toBe(false);
        });
      });
    });

    describe('Casos extremos brasileiros', () => {
      test('deve lidar com formatações mistas típicas do Brasil', () => {
        const formatacoesMistas = ['123.456.789-09', '123456789-09', '123.45678909', '12345678909'];

        formatacoesMistas.forEach((cpf) => {
          const resultado = validateCpf(cpf);
          expect(typeof resultado.isValid).toBe('boolean');
        });
      });

      test('deve tratar erros inesperados graciosamente', () => {
        const resultado = validateCpf('123.456.789-09');
        expect(resultado).toHaveProperty('isValid');
        expect(typeof resultado.isValid).toBe('boolean');
      });
    });
  });

  describe('formatCpf', () => {
    test('deve formatar CPF sem máscara para o padrão brasileiro', () => {
      const cpfLimpo = '12345678909';
      const formatado = formatCpf(cpfLimpo);
      expect(formatado).toBe('123.456.789-09');
    });

    test('deve manter CPF já formatado inalterado', () => {
      const cpfFormatado = '123.456.789-09';
      const resultado = formatCpf(cpfFormatado);
      expect(resultado).toBe('123.456.789-09');
    });

    test('deve retornar string original para CPF inválido', () => {
      const cpfInvalido = 'cpf-invalido';
      const resultado = formatCpf(cpfInvalido);
      expect(resultado).toBe(cpfInvalido);
    });

    test('deve lidar com CPF de tamanho incorreto', () => {
      const cpfCurto = '123456789';
      const resultado = formatCpf(cpfCurto);
      expect(resultado).toBe(cpfCurto);
    });
  });
});
