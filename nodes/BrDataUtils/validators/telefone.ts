import { ValidationResult, ValidatorOptions } from '../types';

/**
 * Remove apenas os caracteres de formatação esperados para telefone (parênteses, espaços, hífen e +)
 * e valida se o formato básico está correto
 */
function sanitizePhone(value: string): { cleaned: string; isValidFormat: boolean } {
  // Remove espaços no início e fim
  const trimmed = value.trim();

  // Aceita apenas números, parênteses, espaços, hífen e +
  if (!/^[\d() +-]+$/.test(trimmed)) {
    return { cleaned: '', isValidFormat: false };
  }

  // Remove apenas caracteres de formatação
  const cleaned = trimmed.replace(/[() +-]/g, '');

  // Verifica se restaram apenas números
  if (!/^\d+$/.test(cleaned)) {
    return { cleaned: '', isValidFormat: false };
  }

  return { cleaned, isValidFormat: true };
}

/**
 * Valida um telefone fixo brasileiro
 */
export function validateTelefone(
  telefone: string,
  options: ValidatorOptions = {},
): ValidationResult {
  try {
    const { cleaned: cleanPhone, isValidFormat } = sanitizePhone(telefone);

    if (!isValidFormat) {
      return { isValid: false, error: 'Telefone contém caracteres inválidos' };
    }

    // Telefone fixo: 10 dígitos (DDD + 8 dígitos) ou 13 dígitos com código do país
    if (cleanPhone.length === 10) {
      // Valida DDD (11-99)
      const ddd = parseInt(cleanPhone.substring(0, 2));
      if (ddd < 11 || ddd > 99) {
        return { isValid: false, error: 'DDD inválido para telefone fixo' };
      }

      // Primeiro dígito do número não pode ser 0 ou 1
      const firstDigit = parseInt(cleanPhone.charAt(2));
      if (firstDigit < 2) {
        return { isValid: false, error: 'Primeiro dígito do telefone fixo deve ser entre 2-9' };
      }
    } else if (cleanPhone.length === 13 && cleanPhone.startsWith('55')) {
      // Com código do país (+55)
      const ddd = parseInt(cleanPhone.substring(2, 4));
      if (ddd < 11 || ddd > 99) {
        return { isValid: false, error: 'DDD inválido para telefone fixo' };
      }

      const firstDigit = parseInt(cleanPhone.charAt(4));
      if (firstDigit < 2) {
        return { isValid: false, error: 'Primeiro dígito do telefone fixo deve ser entre 2-9' };
      }
    } else {
      return { isValid: false, error: 'Telefone fixo deve ter 10 dígitos (DDD + número)' };
    }

    return {
      isValid: true,
      unmasked: cleanPhone,
      masked: formatTelefone(cleanPhone),
    };
  } catch (error) {
    return { isValid: false, error: 'Erro ao validar telefone' };
  }
}

/**
 * Valida um celular brasileiro
 */
export function validateCelular(celular: string, options: ValidatorOptions = {}): ValidationResult {
  try {
    const { cleaned: cleanPhone, isValidFormat } = sanitizePhone(celular);

    if (!isValidFormat) {
      return { isValid: false, error: 'Celular contém caracteres inválidos' };
    }

    // Celular: 11 dígitos (DDD + 9 dígitos) ou 14 dígitos com código do país
    if (cleanPhone.length === 11) {
      // Valida DDD (11-99)
      const ddd = parseInt(cleanPhone.substring(0, 2));
      if (ddd < 11 || ddd > 99) {
        return { isValid: false, error: 'DDD inválido para celular' };
      }

      // Primeiro dígito deve ser 9 (padrão celular brasileiro)
      if (cleanPhone.charAt(2) !== '9') {
        return { isValid: false, error: 'Celular deve começar com 9 após o DDD' };
      }
    } else if (cleanPhone.length === 14 && cleanPhone.startsWith('55')) {
      // Com código do país (+55)
      const ddd = parseInt(cleanPhone.substring(2, 4));
      if (ddd < 11 || ddd > 99) {
        return { isValid: false, error: 'DDD inválido para celular' };
      }

      if (cleanPhone.charAt(4) !== '9') {
        return { isValid: false, error: 'Celular deve começar com 9 após o DDD' };
      }
    } else {
      return { isValid: false, error: 'Celular deve ter 11 dígitos (DDD + 9 + número)' };
    }

    return {
      isValid: true,
      unmasked: cleanPhone,
      masked: formatCelular(cleanPhone),
    };
  } catch (error) {
    return { isValid: false, error: 'Erro ao validar celular' };
  }
}

/**
 * Formata um telefone fixo no padrão (XX) XXXX-XXXX
 */
export function formatTelefone(telefone: string): string {
  const { cleaned: cleanPhone, isValidFormat } = sanitizePhone(telefone);

  if (!isValidFormat) {
    return telefone;
  }

  if (cleanPhone.length === 10) {
    return cleanPhone.replace(/^(\d{2})(\d{4})(\d{4})$/, '($1) $2-$3');
  } else if (cleanPhone.length === 13 && cleanPhone.startsWith('55')) {
    // Com código do país
    const formatted = cleanPhone.substring(2).replace(/^(\d{2})(\d{4})(\d{4})$/, '($1) $2-$3');
    return `+55 ${formatted}`;
  }

  return telefone;
}

/**
 * Formata um celular no padrão (XX) 9XXXX-XXXX
 */
export function formatCelular(celular: string): string {
  const { cleaned: cleanPhone, isValidFormat } = sanitizePhone(celular);

  if (!isValidFormat) {
    return celular;
  }

  if (cleanPhone.length === 11) {
    return cleanPhone.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
  } else if (cleanPhone.length === 14 && cleanPhone.startsWith('55')) {
    // Com código do país
    const formatted = cleanPhone.substring(2).replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
    return `+55 ${formatted}`;
  }

  return celular;
}
