export default {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'js'],
  transform: {
      '^.+\\.(ts|tsx)$': ['ts-jest', { useESM: true }]
  },
  extensionsToTreatAsEsm: ['.ts'],
  moduleNameMapper: {
      '^(\\.{1,2}/.*)\\.js$': '$1' // Corrige os imports .js nos testes
  }
};