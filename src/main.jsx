import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
// Redaction 50 (licença OFL), servida junto com o site: abas e botões
import '@fontsource/redaction-50/400.css';
import '@fontsource/redaction-50/400-italic.css';
import './styles.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
