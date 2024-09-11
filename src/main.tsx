
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App';
import store from './redux/store'; // Asegúrate de que la ruta sea correcta
import './index.css';



ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Auth0Provider
  domain="dev-rhgul3b8lgmxi2fd.us.auth0.com"
  clientId="PBv2FzqjDwv8TBIwmpXTMTIvbwiZKvyY"
  authorizationParams={{
    redirect_uri: window.location.origin
  }}
  >
  <Provider store={store}>
    <App />
  </Provider>
  </Auth0Provider>
);