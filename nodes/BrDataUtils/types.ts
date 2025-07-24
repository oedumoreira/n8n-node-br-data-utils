export interface ValidationResult {
    isValid: boolean;
    masked?: string;
    unmasked?: string;
    error?: string;
}

export interface ValidatorOptions {
    format?: boolean;
    removeFormatting?: boolean;
}

export type OperationType = 
    | 'validarCpf'
    | 'validarCnpj'
    | 'validarTelefone'
    | 'validarCelular'
    | 'validarCep';