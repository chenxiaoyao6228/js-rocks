import react from '@vitejs/plugin-react';

export default {
  port: '8000',
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment',
    target: 'es2020',
    format: 'esm',
  },
  server: {
    port: 3000,
  },
  plugins: [
    react({
      jsxRuntime: 'classic',
      jsxImportSource: '@js-rocks/react-tiny',
    }),
  ],
};
