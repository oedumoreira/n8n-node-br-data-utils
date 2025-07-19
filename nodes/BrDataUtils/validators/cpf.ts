import { ValidationResult, ValidatorOptions } from '../types';

/**
 * Remove caracteres especiais de uma string, mantendo apenas números
 */
function removeFormatting(value: string): string {
	return value.replace(/\D/g, '');
}

/**
 * Valida um CPF brasileiro
 */
export function validateCpf(cpf: string, options: ValidatorOptions = {}): ValidationResult {
	try {
		const cleanCpf = removeFormatting(cpf);
		
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

		const result: ValidationResult = { isValid: true };
		
		if (options.format) {
			result.formatted = formatCpf(cleanCpf);
		}

		return result;
	} catch (error) {
		return { isValid: false, error: 'Erro ao validar CPF' };
	}
}

/**
 * Formata um CPF no padrão XXX.XXX.XXX-XX
 */
export function formatCpf(cpf: string): string {
	const cleanCpf = removeFormatting(cpf);
	if (cleanCpf.length !== 11) {
		return cpf; // Retorna o valor original se não for um CPF válido
	}
	return cleanCpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');
}
