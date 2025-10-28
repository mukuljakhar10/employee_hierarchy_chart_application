import Keycloak from 'keycloak-js';

// Initialize Keycloak instance
const keycloakConfig = {
  url: 'http://localhost:8080',
  realm: 'employee-hierarchy',
  clientId: 'employee-app',
};

const keycloakInstance = new Keycloak(keycloakConfig);

// Track initialization state
let isInitialized = false;
let initPromise: Promise<boolean> | null = null;

// Custom init wrapper to handle initialization state and prevent multiple initializations
export const initKeycloak = async (options?: any): Promise<boolean> => {
  // If already initialized, just return the authenticated status
  if (isInitialized) {
    return keycloakInstance.authenticated || false;
  }
  
  // If initialization is in progress, wait for it to complete
  if (initPromise) {
    return initPromise;
  }
  
  // Start initialization
  initPromise = (async () => {
    try {
      const authenticated = await keycloakInstance.init(options);
      isInitialized = true;
      return authenticated;
    } catch (error) {
      console.error('Keycloak initialization error:', error);
      isInitialized = false;
      initPromise = null;
      return false;
    }
  })();
  
  return initPromise;
};

// Reset initialization state (useful for logout)
export const resetKeycloak = () => {
  isInitialized = false;
  initPromise = null;
};

export default keycloakInstance;
