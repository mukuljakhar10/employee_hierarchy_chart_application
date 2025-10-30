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

1. Go to `http://localhost:8080`
2. Click "Administration Console"
3. Login with:
   - Username: `admin`
   - Password: `admin`

Create a New Realm
1. Hover over the realm dropdown (top-left, shows "master")
2. Click "Create Realm"
3. Enter Name: `employee-hierarchy`
4. Click "Create"

Create a Client
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

Create Test Users
User 1: Admin
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

User 2: Manager
1. Repeat steps 1-7 with:
   - Username: `johndoe`
   - Email: `john@example.com`
   - First Name: `John`
   - Last Name: `Doe`
2. Set password: `password123`

User 3: Employee
1. Repeat steps 1-7 with:
   - Username: `janedoe`
   - Email: `jane@example.com`
   - First Name: `Jane`
   - Last Name: `Doe`
2. Set password: `password123`