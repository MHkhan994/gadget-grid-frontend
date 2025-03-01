import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';

/** @type {import('eslint').Linter.Config[]} */
export default [
    { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
    { languageOptions: { globals: globals.browser } },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    pluginReact.configs.flat.recommended,
    {
        ignores: ['.config/*', 'node_modules'],
    },
    {
        rules: {
            'no-unused-vars': 'warn',
            'no-console': 'warn',
            eqeqeq: ['error', 'always'],
            curly: 'error',
            'react/jsx-uses-react': 'off', // Not needed in React 17+
            'react/react-in-jsx-scope': 'off', // Not needed in React 17+
            '@typescript-eslint/no-explicit-any': 'warn',
            '@typescript-eslint/no-require-imports': 'warn',
            '@typescript-eslint/explicit-module-boundary-types': 'off',
            '@typescript-eslint/no-unused-vars': [
                'warn',
                { argsIgnorePattern: '^_' },
            ],
        },
    },
];
