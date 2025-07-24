import { ValidationResult, ValidatorOptions } from '../types';

/**
 * Remove apenas os caracteres de formatação esperados para CPF (pontos e hífen)
 * e valida se o formato básico está correto
 */
function sanitizeCpf(value: string): { cleaned: string; isValidFormat: boolean } {
    // Remove espaços no início e fim
    const trimmed = value.trim();
    
    // Aceita apenas números, pontos e hífen
    if (!/^[\d.-]+$/.test(trimmed)) {
        return { cleaned: '', isValidFormat: false };
    }
    
    // Remove apenas pontos e hífen
    const cleaned = trimmed.replace(/[.-]/g, '');
    
    // Verifica se restaram apenas números
    if (!/^\d+$/.test(cleaned)) {
        return { cleaned: '', isValidFormat: false };
    }
    
    return { cleaned, isValidFormat: true };
}

/**
 * Valida um CPF brasileiro
 */
export function validateCpf(cpf: string, options: ValidatorOptions = {}): ValidationResult {
    try {
        const { cleaned: cleanCpf, isValidFormat } = sanitizeCpf(cpf);
        
        if (!isValidFormat) {
            return { isValid: false, error: 'CPF contém caracteres inválidos' };
        }
        
        // Verifica se tem 11 dígitos
        if (cleanCpf.length !== 11) {
            return { isValid: false, error: 'CPF deve ter 11 dígitos' };
        }

        // Verifica se todos os dígitos são iguais
        if (/^(\d)\1+$/.test(cleanCpf)) {
            return { isValid: false, error: 'CPF não pode ter todos os dígitos iguais' };
        }

        // Validação do primeiro dígito verificador
        let sum = 0;
        for (let i = 0; i < 9; i++) {
            sum += parseInt(cleanCpf.charAt(i)) * (10 - i);
        }
        let remainder = (sum * 10) % 11;
        if (remainder === 10) remainder = 0;
        if (remainder !== parseInt(cleanCpf.charAt(9))) {
            return { isValid: false, error: 'CPF inválido - primeiro dígito verificador' };
        }

        // Validação do segundo dígito verificador
        sum = 0;
        for (let i = 0; i < 10; i++) {
            sum += parseInt(cleanCpf.charAt(i)) * (11 - i);
        }
        remainder = (sum * 10) % 11;
        if (remainder === 10) remainder = 0;
        if (remainder !== parseInt(cleanCpf.charAt(10))) {
            return { isValid: false, error: 'CPF inválido - segundo dígito verificador' };
        }

        return {
            isValid: true,
            unmasked: cleanCpf,
            masked: formatCpf(cleanCpf)
        };
    } catch (error) {
        return { isValid: false, error: 'Erro ao validar CPF' };
    }
}

/**
 * Formata um CPF no padrão XXX.XXX.XXX-XX
 */
export function formatCpf(cpf: string): string {
    const { cleaned: cleanCpf, isValidFormat } = sanitizeCpf(cpf);
    if (!isValidFormat || cleanCpf.length !== 11) {
        return cpf;
    }
    return cleanCpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');
}