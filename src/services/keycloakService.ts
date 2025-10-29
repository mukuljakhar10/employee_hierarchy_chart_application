import Keycloak, { type KeycloakInitOptions } from 'keycloak-js';

const keycloakConfig = {
  url: 'http://localhost:8080',
  realm: 'employee-hierarchy',
  clientId: 'employee-app',
};

const keycloakInstance = new Keycloak(keycloakConfig);

let isInitialized = false;
let initPromise: Promise<boolean> | null = null;

export const initKeycloak = async (options?: KeycloakInitOptions): Promise<boolean> => {
  if (isInitialized) {
    return keycloakInstance.authenticated || false;
  }
  
  if (initPromise) {
    return initPromise;
  }
  
  initPromise = (async () => {
    try {
      const authenticated = await keycloakInstance.init(options ?? {});
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

export const resetKeycloak = () => {
  isInitialized = false;
  initPromise = null;
};

export default keycloakInstance;
