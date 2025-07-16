import tseslint from '@electron-toolkit/eslint-config-ts'
import eslintConfigPrettier from '@electron-toolkit/eslint-config-prettier'
import eslintPluginReact from 'eslint-plugin-react'
import eslintPluginReactHooks from 'eslint-plugin-react-hooks'
import eslintPluginReactRefresh from 'eslint-plugin-react-refresh'

export default tseslint.config(
  {
    ignores: ['**/node_modules', '**/dist', '**/out']
  },

  // TypeScript recommended rules
  tseslint.configs.recommended,

  // React recommended rules
  eslintPluginReact.configs.flat.recommended,
  eslintPluginReact.configs.flat['jsx-runtime'],

  // React version auto-detect
  {
    settings: {
      react: {
        version: 'detect'
      }
    }
  },

  // Apply rules to TypeScript and TSX files
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      'react-hooks': eslintPluginReactHooks,
      'react-refresh': eslintPluginReactRefresh
    },
    rules: {
      // React hooks + refresh recommended
      ...eslintPluginReactHooks.configs.recommended.rules,
      ...eslintPluginReactRefresh.configs.vite.rules,

      // 👇 Custom rules from old config
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-unused-vars': 'off'
    }
  },

  // Prettier config to avoid conflicts
  eslintConfigPrettier
)
