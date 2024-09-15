import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App';
import store from './redux/store'; // Asegúrate de que la ruta sea correcta
import './index.css';

// Acceder a las variables de entorno
const domain = import.meta.env.VITE_AUTH0_DOMAIN;
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
const redirectUri = import.meta.env.VITE_AUTH0_REDIRECT_URI;

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Auth0Provider
    domain={domain}
    clientId={clientId}
    authorizationParams={{
      redirect_uri: redirectUri
    }}
    cacheLocation="localstorage"  // Usar localStorage para persistir sesión
    useRefreshTokens={true}  // Habilitar tokens de refresco
  >
    <Provider store={store}>
      <App />
    </Provider>
  </Auth0Provider>
);
