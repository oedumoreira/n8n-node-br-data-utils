import { ValidationResult, ValidatorOptions } from '../types';

/**
 * Remove apenas os caracteres de formatação esperados para CEP (hífen)
 * e valida se o formato básico está correto
 */
function sanitizeCep(value: string): { cleaned: string; isValidFormat: boolean } {
  // Remove espaços no início e fim
  const trimmed = value.trim();

  // Aceita apenas números e hífen
  if (!/^[\d-]+$/.test(trimmed)) {
    return { cleaned: '', isValidFormat: false };
  }

  // Remove apenas hífen
  const cleaned = trimmed.replace(/-/g, '');

  // Verifica se restaram apenas números
  if (!/^\d+$/.test(cleaned)) {
    return { cleaned: '', isValidFormat: false };
  }

  return { cleaned, isValidFormat: true };
}

/**
 * Valida um CEP brasileiro
 */
export function validateCep(cep: string, options: ValidatorOptions = {}): ValidationResult {
  try {
    const { cleaned: cleanCep, isValidFormat } = sanitizeCep(cep);

    if (!isValidFormat) {
      return { isValid: false, error: 'CEP contém caracteres inválidos' };
    }

    // CEP deve ter exatamente 8 dígitos
    if (cleanCep.length !== 8) {
      return { isValid: false, error: 'CEP deve ter 8 dígitos' };
    }

    // Verifica se não são todos zeros
    if (cleanCep === '00000000') {
      return { isValid: false, error: 'CEP não pode ser 00000-000' };
    }

    return {
      isValid: true,
      unmasked: cleanCep,
      masked: formatCep(cleanCep),
    };
  } catch (error) {
    return { isValid: false, error: 'Erro ao validar CEP' };
  }
}

/**
 * Formata um CEP no padrão XXXXX-XXX
 */
export function formatCep(cep: string): string {
  const { cleaned: cleanCep, isValidFormat } = sanitizeCep(cep);
  if (!isValidFormat || cleanCep.length !== 8) {
    return cep;
  }
  return cleanCep.replace(/^(\d{5})(\d{3})$/, '$1-$2');
}
