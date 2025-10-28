import Keycloak from 'keycloak-js';

// Initialize Keycloak instance
const keycloakInstance = new Keycloak({
  url: 'http://localhost:8080',
  realm: 'employee-hierarchy',
  clientId: 'employee-app',
});

export default keycloakInstance;
