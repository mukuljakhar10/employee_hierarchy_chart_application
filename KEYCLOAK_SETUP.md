# Keycloak Authentication Setup Guide

## Overview
This application now uses Keycloak for secure authentication. All user credentials are managed by Keycloak, and passwords are never exposed in the frontend or network requests.

## Prerequisites
- Docker installed (for running Keycloak)
- Node.js and npm installed
- Application dependencies installed (`npm install`)

## Step 1: Start Keycloak Server

### Option A: Using Docker (Recommended - Persists Data)

**Initial Setup (First Time Only):**
```bash
docker run -d \
  --name keycloak-employee-app \
  -p 8080:8080 \
  -e KEYCLOAK_ADMIN=admin \
  -e KEYCLOAK_ADMIN_PASSWORD=admin \
  -v keycloak_data:/opt/keycloak/data \
  quay.io/keycloak/keycloak:latest \
  start-dev
```

**After Initial Setup (Subsequent Restarts):**
Once the container is created, you can simply stop and start it:
```bash
# Stop the container
docker stop keycloak-employee-app

# Start the container again (all your data will be preserved)
docker start keycloak-employee-app
```

**Check if container exists:**
```bash
# List all containers (including stopped ones)
docker ps -a | grep keycloak

# If container exists, just start it:
docker start keycloak-employee-app

# If container doesn't exist, run the initial setup command above
```

**Alternative: Using Docker Volume (Explicit Path)**
If you prefer a named volume in a specific location:
```bash
docker run -d \
  --name keycloak-employee-app \
  -p 8080:8080 \
  -e KEYCLOAK_ADMIN=admin \
  -e KEYCLOAK_ADMIN_PASSWORD=admin \
  -v $(pwd)/keycloak-data:/opt/keycloak/data \
  quay.io/keycloak/keycloak:latest \
  start-dev
```

### Option A1: Using Docker Compose (Even Easier - Recommended)
Create a `docker-compose.yml` file in your project root:
```yaml
version: '3.8'

services:
  keycloak:
    image: quay.io/keycloak/keycloak:latest
    container_name: keycloak-employee-app
    ports:
      - "8080:8080"
    environment:
      KEYCLOAK_ADMIN: admin
      KEYCLOAK_ADMIN_PASSWORD: admin
    volumes:
      - keycloak_data:/opt/keycloak/data
    command: start-dev
    restart: unless-stopped

volumes:
  keycloak_data:
```

Then use these simple commands:
```bash
# Start Keycloak
docker-compose up -d

# Stop Keycloak (data preserved)
docker-compose stop

# Start Keycloak again
docker-compose start

# Stop and remove containers (data preserved in volume)
docker-compose down

# Start fresh
docker-compose up -d
```

### Option B: Download and Run Locally
1. Download Keycloak from https://www.keycloak.org/downloads
2. Extract the archive
3. Run: `./bin/kc.sh start-dev`

Keycloak will be available at: `http://localhost:8080`

## Step 2: Configure Keycloak

### 2.1 Access Admin Console
1. Go to `http://localhost:8080`
2. Click "Administration Console"
3. Login with:
   - Username: `admin`
   - Password: `admin`

### 2.2 Create a New Realm
1. Hover over the realm dropdown (top-left, shows "master")
2. Click "Create Realm"
3. Enter Name: `employee-hierarchy`
4. Click "Create"

### 2.3 Create a Client
1. In the left sidebar, click "Clients"
2. Click "Create client"
3. Enter Client ID: `employee-app`
4. Click "Next"
5. Enable "Client authentication" toggle (OFF - keep it public)
6. Click "Next"
7. In "Valid redirect URIs", add:
   - `http://localhost:5173/*`
   - `http://localhost:5173/dashboard`
8. In "Web origins", add:
   - `http://localhost:5173`
9. Click "Save"

### 2.4 Create Test Users

#### User 1: Admin
1. In left sidebar, click "Users"
2. Click "Add user"
3. Username: `admin`
4. Email: `admin@example.com`
5. First Name: `System`
6. Last Name: `Admin`
7. Click "Create"
8. Go to "Credentials" tab
9. Click "Set password"
10. Password: `admin123`
11. Confirm password: `admin123`
12. Toggle "Temporary" to OFF
13. Click "Set Password"

#### User 2: Manager
1. Repeat steps 1-7 with:
   - Username: `johndoe`
   - Email: `john@example.com`
   - First Name: `John`
   - Last Name: `Doe`
2. Set password: `password123`

#### User 3: Employee
1. Repeat steps 1-7 with:
   - Username: `janedoe`
   - Email: `jane@example.com`
   - First Name: `Jane`
   - Last Name: `Doe`
2. Set password: `password123`

### 2.5 Create Roles (Optional)
1. In left sidebar, click "Roles"
2. Click "Create role"
3. Create roles:
   - `Administrator`
   - `Manager`
   - `Employee`

### 2.6 Assign Roles to Users (Optional)
1. Go to "Users"
2. Click on each user
3. Go to "Role mapping" tab
4. Assign appropriate roles

## Step 3: Start the Application

```bash
npm install
npm run dev
```

Application will be available at: `http://localhost:5173`

## Step 4: Test the Authentication Flow

### Login Flow
1. Visit `http://localhost:5173`
2. You'll be redirected to login page
3. Click "Login with Keycloak"
4. You'll be redirected to Keycloak login page
5. Enter credentials:
   - Username: `admin`
   - Password: `admin123`
6. You'll be redirected back to the dashboard
7. You're now authenticated!

### Logout Flow
1. Click on user avatar in header
2. Click "Sign Out"
3. You'll be logged out and redirected to login page

## Security Features

✅ **Passwords are:**
- Never sent to the React frontend
- Hashed and stored securely on Keycloak server
- Never visible in network requests
- Encrypted in transit (HTTPS in production)

✅ **Authentication:**
- OAuth2/OIDC standard protocol
- JWT tokens for API requests
- Automatic token refresh
- Secure session management

✅ **No Exposed Data:**
- users.json removed from frontend
- No plain-text credentials anywhere
- All sensitive data on Keycloak server

## Troubleshooting

### Issue: "Cannot connect to Keycloak"
- Ensure Keycloak is running on `http://localhost:8080`
- Check Docker container: `docker ps`
- Restart Keycloak if needed

### Issue: "Redirect URI mismatch"
- Verify redirect URIs in Keycloak client settings
- Should include `http://localhost:5173/*`

### Issue: "Token validation failed"
- Clear browser cache and cookies
- Ensure Keycloak realm and client are properly configured
- Check browser console for detailed errors

### Issue: "Silent SSO not working"
- Ensure `public/silent-check-sso.html` exists
- Check browser console for CORS errors
- Verify Keycloak CORS settings

### Issue: "Lost Keycloak data after container restart"
If you already created a container without a volume, here's how to migrate:

**Option 1: Start existing container (if it still exists)**
```bash
# Find your existing container
docker ps -a | grep keycloak

# Start it (replace CONTAINER_ID with actual ID)
docker start <CONTAINER_ID>

# Copy container name if needed
docker start keycloak-employee-app
```

**Option 2: Create new container with volume (recommended)**
1. Stop and remove old container (if exists):
   ```bash
   docker stop <CONTAINER_ID>
   docker rm <CONTAINER_ID>
   ```
2. Run new container with volume (from Step 1 above)
3. Reconfigure realms, users, and roles (one-time setup)

**Option 3: Export/Import configuration**
If you have many realms to migrate, you can:
1. Use Keycloak's export feature before stopping container
2. Import after starting new container with volume

**Prevention:** Always use `--name` flag and volume (`-v`) when creating containers

## Production Deployment

For production:

1. **Update Keycloak URL** in `src/services/keycloakService.ts`:
   ```typescript
   url: 'https://your-keycloak-domain.com',
   ```

2. **Update Redirect URIs** in Keycloak client:
   - `https://your-app-domain.com/*`
   - `https://your-app-domain.com/dashboard`

3. **Update Web Origins**:
   - `https://your-app-domain.com`

4. **Use HTTPS** for all URLs

5. **Configure proper CORS** on Keycloak server

## API Integration

To use JWT tokens for API requests:

```typescript
// Get token from Keycloak
const token = keycloakInstance.token;

// Add to API requests
const headers = {
  'Authorization': `Bearer ${token}`,
  'Content-Type': 'application/json',
};

// Example fetch
fetch('/api/employees', { headers })
  .then(response => response.json())
  .then(data => console.log(data));
```

## Additional Resources

- [Keycloak Documentation](https://www.keycloak.org/documentation)
- [OAuth2/OIDC Specification](https://oauth.net/2/)
- [JWT Tokens](https://jwt.io/)
- [Keycloak JS Adapter](https://www.keycloak.org/docs/latest/securing_apps/#_javascript_adapter)

## Support

For issues or questions:
1. Check Keycloak logs: `docker logs <container-id>`
2. Check browser console for errors
3. Review Keycloak documentation
4. Check application logs
