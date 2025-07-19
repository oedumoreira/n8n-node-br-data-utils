export interface ValidationResult {
	isValid: boolean;
	formatted?: string;
	error?: string;
}

export interface ValidatorOptions {
	format?: boolean;
	removeFormatting?: boolean;
}

export type OperationType = 
	| 'validations'
	| 'formatting'
	| 'validarCpf'
	| 'validarCnpj'
	| 'validarTelefone'
	| 'validarCelular'
	| 'validarCep'
	| 'formatarCpf'
	| 'formatarCnpj'
	| 'formatarTelefone'
	| 'formatarCelular'
	| 'formatarCep';
