import { validateCpf, formatCpf } from './cpf';
import { validateCnpj, formatCnpj } from './cnpj';
import { validateTelefone, validateCelular, formatTelefone, formatCelular } from './telefone';
import { validateCep, formatCep } from './cep';
import { ValidationResult, ValidatorOptions, OperationType } from '../types';

/**
 * Função principal que executa a operação solicitada
 */
export function executeOperation(
	operation: OperationType,
	value: string,
	options: ValidatorOptions = {}
): ValidationResult {
	switch (operation) {
		case 'validarCpf':
			return validateCpf(value, options);
		
		case 'validarCnpj':
			return validateCnpj(value, options);
		
		case 'validarTelefone':
			return validateTelefone(value, options);
		
		case 'validarCelular':
			return validateCelular(value, options);
		
		case 'validarCep':
			return validateCep(value, options);
		
		case 'formatarCpf':
			const cpfResult = validateCpf(value);
			if (cpfResult.isValid) {
				return { isValid: true, formatted: formatCpf(value) };
			}
			return cpfResult;
		
		case 'formatarCnpj':
			const cnpjResult = validateCnpj(value);
			if (cnpjResult.isValid) {
				return { isValid: true, formatted: formatCnpj(value) };
			}
			return cnpjResult;
		
		case 'formatarTelefone':
			const telefoneResult = validateTelefone(value);
			if (telefoneResult.isValid) {
				return { isValid: true, formatted: formatTelefone(value) };
			}
			return telefoneResult;
		
		case 'formatarCelular':
			const celularResult = validateCelular(value);
			if (celularResult.isValid) {
				return { isValid: true, formatted: formatCelular(value) };
			}
			return celularResult;
		
		case 'formatarCep':
			const cepResult = validateCep(value);
			if (cepResult.isValid) {
				return { isValid: true, formatted: formatCep(value) };
			}
			return cepResult;
		
		default:
			return { isValid: false, error: 'Operação não suportada' };
	}
}

// Re-export all validators for direct use
export {
	validateCpf,
	validateCnpj,
	validateTelefone,
	validateCelular,
	validateCep,
	formatCpf,
	formatCnpj,
	formatTelefone,
	formatCelular,
	formatCep,
};
