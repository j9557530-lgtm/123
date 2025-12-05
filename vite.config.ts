import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // 加载环境变量
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    define: {
      // 将 process.env.API_KEY 替换为实际的值，防止浏览器报错 process is not defined
      'process.env.API_KEY': JSON.stringify(env.API_KEY),
      // 防止其他引用 process 的地方报错
      'process.env': {}
    }
  };
});