# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```









































































































Update timestamp 18: Sen 20 Apr 2026 15:45:54 WIB
Update timestamp 19: Sen 20 Apr 2026 15:50:10 WIB
Update timestamp 21: Sen 20 Apr 2026 15:59:10 WIB
Update timestamp 25: Sen 20 Apr 2026 16:17:28 WIB
Update timestamp 31: Sen 20 Apr 2026 16:45:00 WIB
Update timestamp 33: Sen 20 Apr 2026 16:52:48 WIB
Update timestamp 35: Sen 20 Apr 2026 17:02:07 WIB
Update timestamp 38: Sen 20 Apr 2026 17:15:04 WIB
Update timestamp 39: Sen 20 Apr 2026 17:18:48 WIB
Update timestamp 40: Sen 20 Apr 2026 17:23:49 WIB
Update timestamp 47: Sen 20 Apr 2026 17:50:15 WIB
Update timestamp 50: Sen 20 Apr 2026 18:05:03 WIB
Update timestamp 58: Sen 20 Apr 2026 18:39:10 WIB
Update timestamp 69: Sen 20 Apr 2026 19:33:03 WIB
Update timestamp 73: Sen 20 Apr 2026 19:49:11 WIB
Update timestamp 74: Sen 20 Apr 2026 19:54:38 WIB
Update timestamp 75: Sen 20 Apr 2026 19:57:47 WIB
Update timestamp 77: Sen 20 Apr 2026 20:05:29 WIB
Update timestamp 80: Sen 20 Apr 2026 20:19:33 WIB
Update timestamp 83: Sen 20 Apr 2026 20:33:58 WIB
Update timestamp 85: Sen 20 Apr 2026 20:43:05 WIB
Update timestamp 92: Sen 20 Apr 2026 21:17:27 WIB
Update timestamp 93: Sen 20 Apr 2026 21:22:35 WIB
Update timestamp 101: Sen 20 Apr 2026 21:56:09 WIB
Update timestamp 110: Sen 20 Apr 2026 22:37:15 WIB
Update timestamp 119: Sen 20 Apr 2026 23:14:26 WIB
Update timestamp 120: Sen 20 Apr 2026 23:20:05 WIB
Update timestamp 134: Sel 21 Apr 2026 00:23:54 WIB
Update timestamp 136: Sel 21 Apr 2026 00:33:05 WIB
Update timestamp 142: Sel 21 Apr 2026 01:01:18 WIB
Update timestamp 145: Sel 21 Apr 2026 01:13:29 WIB
Update timestamp 151: Sel 21 Apr 2026 01:39:13 WIB
Update timestamp 157: Sel 21 Apr 2026 02:07:57 WIB
Update timestamp 162: Sel 21 Apr 2026 02:28:51 WIB
Update timestamp 164: Sel 21 Apr 2026 02:37:40 WIB
Update timestamp 165: Sel 21 Apr 2026 02:41:11 WIB
Update timestamp 171: Sel 21 Apr 2026 03:05:57 WIB
Update timestamp 174: Sel 21 Apr 2026 03:17:32 WIB
Update timestamp 184: Sel 21 Apr 2026 04:00:24 WIB
Update timestamp 200: Sel 21 Apr 2026 05:17:36 WIB
Update timestamp 206: Sel 21 Apr 2026 05:47:52 WIB
Update timestamp 210: Sel 21 Apr 2026 06:09:20 WIB
Update timestamp 212: Sel 21 Apr 2026 06:20:00 WIB
Update timestamp 214: Sel 21 Apr 2026 06:27:07 WIB
Update timestamp 233: Sel 21 Apr 2026 07:50:38 WIB
Update timestamp 248: Sel 21 Apr 2026 09:03:26 WIB
Update timestamp 249: Sel 21 Apr 2026 09:08:07 WIB
Update timestamp 251: Sel 21 Apr 2026 09:17:24 WIB
Update timestamp 254: Sel 21 Apr 2026 09:32:28 WIB
Update timestamp 256: Sel 21 Apr 2026 09:41:57 WIB
Update timestamp 257: Sel 21 Apr 2026 09:45:26 WIB
Update timestamp 259: Sel 21 Apr 2026 09:54:50 WIB
Update timestamp 261: Sel 21 Apr 2026 10:06:45 WIB
Update timestamp 263: Sel 21 Apr 2026 10:15:54 WIB
Update timestamp 264: Sel 21 Apr 2026 10:19:09 WIB
Update timestamp 267: Sel 21 Apr 2026 10:30:20 WIB
Update timestamp 277: Sel 21 Apr 2026 11:16:27 WIB
Update timestamp 278: Sel 21 Apr 2026 11:20:44 WIB
Update timestamp 281: Sel 21 Apr 2026 11:34:28 WIB
Update timestamp 290: Sel 21 Apr 2026 12:16:44 WIB
Update timestamp 2: Sel 21 Apr 2026 13:40:56 WIB
Update timestamp 6: Sel 21 Apr 2026 14:01:08 WIB
Update timestamp 7: Sel 21 Apr 2026 14:04:58 WIB
Update timestamp 24: Sel 21 Apr 2026 15:23:10 WIB
Update timestamp 35: Sel 21 Apr 2026 16:10:49 WIB
Update timestamp 45: Sel 21 Apr 2026 16:59:24 WIB
Update timestamp 48: Sel 21 Apr 2026 17:11:20 WIB
Update timestamp 68: Sel 21 Apr 2026 18:41:30 WIB
Update timestamp 70: Sel 21 Apr 2026 18:50:16 WIB
Update timestamp 77: Sel 21 Apr 2026 19:23:50 WIB
