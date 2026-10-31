import nextVitals from 'eslint-config-next/core-web-vitals'

const eslintConfig = [
  ...nextVitals,
  {
    ignores: ['.next/**', 'out/**', '.wrangler/**', 'next-env.d.ts', 'worker/**', 'proxy/**'],
  },
  {
    rules: {
      // Components intentionally read the current time while rendering to compute uptime/"last updated".
      'react-hooks/purity': 'off',
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['**/uptime.config'],
              importNames: ['workerConfig'],
              message:
                'Do not import workerConfig in client-bundled files, it may contain secrets. Use a dynamic import inside getStaticProps, or a Pages Function under functions/.',
            },
          ],
        },
      ],
    },
  },
  {
    // Pages Functions run server-side only
    files: ['functions/**'],
    rules: { 'no-restricted-imports': 'off' },
  },
]

export default eslintConfig
