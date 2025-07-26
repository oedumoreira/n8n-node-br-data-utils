import { beforeAll, afterAll, beforeEach, jest } from '@jest/globals';

// Configurações globais para os testes do n8n-nodes-br-data-utils
beforeAll(() => {
  // Configurações que devem rodar antes de todos os testes
  // Para dados brasileiros, podemos definir locale padrão se necessário
  process.env.TZ = 'America/Sao_Paulo';
  process.env.NODE_ENV = 'test';
});

afterAll(() => {
  // Limpeza após todos os testes
  jest.clearAllTimers();
});

beforeEach(() => {
  // Reset de mocks antes de cada teste
  jest.clearAllMocks();
});

// Configurações específicas para validadores brasileiros
const originalConsole = console;
global.console = {
  ...originalConsole,
  // Silenciar logs durante os testes se necessário
  log: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};