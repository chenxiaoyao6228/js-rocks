import react from '@vitejs/plugin-react';

export default {
  port: '8000',
  esbuild: {
    target: 'es2020',
    format: 'esm',
  },
  server: {
    port: 3000,
  },
  plugins: [
    react({
      jsxImportSource: '@js-rocks/react-tiny',
      jsxRuntime: 'classic',
    }),
  ],
};
