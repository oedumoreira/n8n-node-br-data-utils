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
                    { name: 'Validar CPF', value: 'validarCpf' },
                    { name: 'Validar CNPJ', value: 'validarCnpj' },
                    { name: 'Validar Telefone', value: 'validarTelefone' },
                    { name: 'Validar Celular', value: 'validarCelular' },
                    { name: 'Validar CEP', value: 'validarCep' },
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
                const result = executeOperation(operation, value);

                returnData.push({
                    json: {
                        operation,
                        original: value,
                        isValid: result.isValid,
                        masked: result.masked || null,
                        unmasked: result.unmasked || null,
                        error: result.error || null,
                    },
                });
            } catch (error) {
                returnData.push({
                    json: {
                        operation,
                        original: value,
                        isValid: false,
                        masked: null,
                        unmasked: null,
                        error: `Erro inesperado: ${error instanceof Error ? error.message : 'Erro desconhecido'}`,
                    },
                });
            }
        }

        return this.prepareOutputData(returnData);
    }
}