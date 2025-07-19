import { validateCpf, formatCpf } from '../nodes/BrDataUtils/validators/cpf';
import { validateCnpj, formatCnpj } from '../nodes/BrDataUtils/validators/cnpj';
import { validateTelefone, validateCelular, formatTelefone, formatCelular } from '../nodes/BrDataUtils/validators/telefone';
import { validateCep, formatCep } from '../nodes/BrDataUtils/validators/cep';

// Testes básicos para validar se os validators estão funcionando
console.log('🧪 Testando Validators BR Data Utils\n');

// Testes CPF
console.log('📋 Testando CPF:');
console.log('CPF Válido (11144477735):', validateCpf('11144477735'));
console.log('CPF Inválido (12345678901):', validateCpf('12345678901'));
console.log('CPF Formatado:', formatCpf('11144477735'));
console.log('');

// Testes CNPJ
console.log('🏢 Testando CNPJ:');
console.log('CNPJ Válido (11222333000181):', validateCnpj('11222333000181'));
console.log('CNPJ Inválido (12345678000195):', validateCnpj('12345678000195'));
console.log('CNPJ Formatado:', formatCnpj('11222333000181'));
console.log('');

// Testes Telefone
console.log('📞 Testando Telefone:');
console.log('Telefone Válido (1133334444):', validateTelefone('1133334444'));
console.log('Telefone Inválido (1111111111):', validateTelefone('1111111111'));
console.log('Telefone Formatado:', formatTelefone('1133334444'));
console.log('');

// Testes Celular
console.log('📱 Testando Celular:');
console.log('Celular Válido (11999887766):', validateCelular('11999887766'));
console.log('Celular Inválido (1133334444):', validateCelular('1133334444'));
console.log('Celular Formatado:', formatCelular('11999887766'));
console.log('');

// Testes CEP
console.log('📮 Testando CEP:');
console.log('CEP Válido (01310100):', validateCep('01310100'));
console.log('CEP Inválido (123):', validateCep('123'));
console.log('CEP Formatado:', formatCep('01310100'));
console.log('');

console.log('✅ Testes concluídos!');
