import { ValidationResult, ValidatorOptions } from '../types';

/**
 * Remove caracteres especiais de uma string, mantendo apenas números
 */
function removeFormatting(value: string): string {
	return value.replace(/\D/g, '');
}

/**
 * Valida um CEP brasileiro
 */
export function validateCep(cep: string, options: ValidatorOptions = {}): ValidationResult {
	try {
		const cleanCep = removeFormatting(cep);
		
		// CEP deve ter exatamente 8 dígitos
		if (cleanCep.length !== 8) {
			return { isValid: false, error: 'CEP deve ter 8 dígitos' };
		}

		// Verifica se não são todos zeros
		if (cleanCep === '00000000') {
			return { isValid: false, error: 'CEP não pode ser 00000-000' };
		}

		// Validação básica - CEP não pode começar com 0 (exceto algumas regiões específicas)
		// Mas vamos permitir para não ser muito restritivo
		
		const result: ValidationResult = { isValid: true };
		
		if (options.format) {
			result.formatted = formatCep(cleanCep);
		}

		return result;
	} catch (error) {
		return { isValid: false, error: 'Erro ao validar CEP' };
	}
}

/**
 * Formata um CEP no padrão XXXXX-XXX
 */
export function formatCep(cep: string): string {
	const cleanCep = removeFormatting(cep);
	if (cleanCep.length !== 8) {
		return cep; // Retorna o valor original se não for um CEP válido
	}
	return cleanCep.replace(/^(\d{5})(\d{3})$/, '$1-$2');
}
