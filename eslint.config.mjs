import eslintCodeGuideline from '@code-guideline/eslint';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  { ignores: ['prisma/client/**'] },
  eslintCodeGuideline(),
]);