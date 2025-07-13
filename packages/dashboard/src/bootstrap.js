import { createApp } from 'vue';
import PrimeVue from 'primevue/config';
import Dashboard from './components/Dashboard.vue';

// Import PrimeVue styles globally
import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';

// Mount function to start up the app
const mount = (el) => {
  const app = createApp(Dashboard);
  
  // Use PrimeVue
  app.use(PrimeVue);
  
  app.mount(el);
};

// If we are in development and in isolation,
// call mount immediately
if (process.env.NODE_ENV === 'development') {
  const devRoot = document.querySelector('#_dashboard-dev-root');

  if (devRoot) {
    mount(devRoot);
  }
}

export { mount };