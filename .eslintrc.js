module.exports = {
  extends: ['@it-incubator/eslint-config'],
  rules: {
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    '@typescript-eslint/ban-types': [
      'warn',
      {
        extendDefaults: true,
        types: {
          null: {
            message: '--- Используй Nullable<T> = T | null ---',
            // fixWith: 'Nullable<>', // Nullable<T> = null | T
          },
        },
      },
    ],
  },
}
