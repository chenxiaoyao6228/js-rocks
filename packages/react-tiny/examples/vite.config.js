import react from '@vitejs/plugin-react';
import replace from '@rollup/plugin-replace';

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
    replace({
      __DEV__: true,
      preventAssignment: true,
    }),
  ],
};
