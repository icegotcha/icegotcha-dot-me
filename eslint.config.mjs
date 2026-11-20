import nextConfig from 'eslint-config-next'
import prettierConfig from 'eslint-config-prettier'
import prettierPlugin from 'eslint-plugin-prettier'
import storybookPlugin from 'eslint-plugin-storybook'

const config = [
  // Next.js recommended rules (flat config array)
  ...nextConfig,

  // Storybook rules for story files
  {
    plugins: { storybook: storybookPlugin },
    files: ['**/*.stories.@(ts|tsx|js|jsx|mjs|cjs)', '**/*.story.@(ts|tsx|js|jsx|mjs|cjs)'],
    rules: {
      ...storybookPlugin.configs.recommended.rules,
    },
  },

  // Prettier — must come last to override conflicting style rules
  prettierConfig,
  {
    plugins: { prettier: prettierPlugin },
    rules: {
      'prettier/prettier': 'warn',
    },
  },

  // shadcn/Radix generated components — disable rules that fire on generated code
  {
    files: ['src/components/ui/**'],
    rules: {
      'react-compiler/react-compiler': 'off',
      'react-hooks/set-state-in-effect': 'off',
      'react-hooks/purity': 'off',
    },
  },

  {
    ignores: ['.next/**', 'storybook-static/**', 'dist/**', 'node_modules/**'],
  },
]

export default config
