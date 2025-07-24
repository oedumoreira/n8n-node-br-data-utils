import { ValidationResult, ValidatorOptions } from '../types';

/**
 * Remove apenas os caracteres de formatação esperados para CNPJ (pontos, barra e hífen)
 * e valida se o formato básico está correto
 */
function sanitizeCnpj(value: string): { cleaned: string; isValidFormat: boolean } {
    // Remove espaços no início e fim
    const trimmed = value.trim();
    
    // Aceita apenas números, pontos, barra e hífen
    if (!/^[\d./-]+$/.test(trimmed)) {
        return { cleaned: '', isValidFormat: false };
    }
    
    // Remove apenas pontos, barra e hífen
    const cleaned = trimmed.replace(/[./-]/g, '');
    
    // Verifica se restaram apenas números
    if (!/^\d+$/.test(cleaned)) {
        return { cleaned: '', isValidFormat: false };
    }
    
    return { cleaned, isValidFormat: true };
}

/**
 * Valida um CNPJ brasileiro
 */
export function validateCnpj(cnpj: string, options: ValidatorOptions = {}): ValidationResult {
    try {
        const { cleaned: cleanCnpj, isValidFormat } = sanitizeCnpj(cnpj);
        
        if (!isValidFormat) {
            return { isValid: false, error: 'CNPJ contém caracteres inválidos' };
        }
        
        // Verifica se tem 14 dígitos
        if (cleanCnpj.length !== 14) {
            return { isValid: false, error: 'CNPJ deve ter 14 dígitos' };
        }

        // Verifica se todos os dígitos são iguais
        if (/^(\d)\1+$/.test(cleanCnpj)) {
            return { isValid: false, error: 'CNPJ não pode ter todos os dígitos iguais' };
        }

        // Validação do primeiro dígito verificador
        const weights1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
        let sum = 0;
        for (let i = 0; i < 12; i++) {
            sum += parseInt(cleanCnpj.charAt(i)) * weights1[i];
        }
        let remainder = sum % 11;
        const firstDigit = remainder < 2 ? 0 : 11 - remainder;
        
        if (firstDigit !== parseInt(cleanCnpj.charAt(12))) {
            return { isValid: false, error: 'CNPJ inválido - primeiro dígito verificador' };
        }

        // Validação do segundo dígito verificador
        const weights2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
        sum = 0;
        for (let i = 0; i < 13; i++) {
            sum += parseInt(cleanCnpj.charAt(i)) * weights2[i];
        }
        remainder = sum % 11;
        const secondDigit = remainder < 2 ? 0 : 11 - remainder;
        
        if (secondDigit !== parseInt(cleanCnpj.charAt(13))) {
            return { isValid: false, error: 'CNPJ inválido - segundo dígito verificador' };
        }

        return {
            isValid: true,
            unmasked: cleanCnpj,
            masked: formatCnpj(cleanCnpj)
        };
    } catch (error) {
        return { isValid: false, error: 'Erro ao validar CNPJ' };
    }
}

/**
 * Formata um CNPJ no padrão XX.XXX.XXX/XXXX-XX
 */
export function formatCnpj(cnpj: string): string {
    const { cleaned: cleanCnpj, isValidFormat } = sanitizeCnpj(cnpj);
    if (!isValidFormat || cleanCnpj.length !== 14) {
        return cnpj;
    }
    return cleanCnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5');
}