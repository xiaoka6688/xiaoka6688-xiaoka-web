import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './i18n';
import './styles/globals.css';

// 动态注入 @font-face，使字体路径自动适配 Vite base（dev=/, prod=/xiaoka6688-xiaoka-web/）
const __base = import.meta.env.BASE_URL;
const __fontStyle = document.createElement('style');
__fontStyle.textContent = `
@font-face {
  font-family: 'JetBrains Mono';
  src: url('${__base}fonts/JetBrainsMono.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'JetBrains Mono';
  src: url('${__base}fonts/JetBrainsMono-Bold.woff2') format('woff2');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}
`;
document.head.appendChild(__fontStyle);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
