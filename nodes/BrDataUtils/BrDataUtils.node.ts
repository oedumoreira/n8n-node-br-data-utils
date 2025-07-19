import {
	INodeType,
	INodeTypeDescription,
	IExecuteFunctions,
	NodeConnectionType,
} from 'n8n-workflow';

import { executeOperation } from './validators';
import { OperationType } from './types';

export class BrDataUtils implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'BR Data Utils',
		name: 'brDataUtils',
		group: ['transform'],
		version: 1,
		description: 'Valida e formata dados brasileiros',
		defaults: {
			name: 'BR Data Utils',
		},
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		properties: [
			{
				displayName: 'Operação',
				name: 'operation',
				type: 'options',
				options: [
					{
						name: '📋 Validações',
						value: 'validations',
						description: 'Operações de validação de dados brasileiros',
					},
					{ name: 'Validar CPF', value: 'validarCpf' },
					{ name: 'Validar CNPJ', value: 'validarCnpj' },
					{ name: 'Validar Telefone', value: 'validarTelefone' },
					{ name: 'Validar Celular', value: 'validarCelular' },
					{ name: 'Validar CEP', value: 'validarCep' },
					{
						name: '🎨 Formatações',
						value: 'formatting',
						description: 'Operações de formatação de dados brasileiros',
					},
					{ name: 'Formatar CPF', value: 'formatarCpf' },
					{ name: 'Formatar CNPJ', value: 'formatarCnpj' },
					{ name: 'Formatar Telefone', value: 'formatarTelefone' },
					{ name: 'Formatar Celular', value: 'formatarCelular' },
					{ name: 'Formatar CEP', value: 'formatarCep' },
				],
				default: 'validarCpf',
				description: 'Selecione a operação que deseja executar',
			},
			{
				displayName: 'Valor',
				name: 'value',
				type: 'string',
				default: '',
				placeholder: 'Digite o valor a ser validado/formatado',
				description: 'O valor que será processado pela operação selecionada',
			},
		],
	};

	async execute(this: IExecuteFunctions) {
		const items = this.getInputData();
		const returnData = [];

		for (let i = 0; i < items.length; i++) {
			const operation = this.getNodeParameter('operation', i) as OperationType;
			const value = this.getNodeParameter('value', i) as string;

			try {
				// Ignora operações de categoria (que são apenas separadores visuais)
				if (operation === 'validations' || operation === 'formatting') {
					returnData.push({
						json: {
							error: 'Selecione uma operação específica, não uma categoria',
							original: value,
							isValid: false,
						},
					});
					continue;
				}

				const result = executeOperation(operation, value);

				returnData.push({
					json: {
						operation,
						original: value,
						isValid: result.isValid,
						formatted: result.formatted || null,
						error: result.error || null,
					},
				});
			} catch (error) {
				returnData.push({
					json: {
						operation,
						original: value,
						isValid: false,
						error: `Erro inesperado: ${error instanceof Error ? error.message : 'Erro desconhecido'}`,
					},
				});
			}
		}

		return this.prepareOutputData(returnData);
	}
}
