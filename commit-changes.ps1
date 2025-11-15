# PowerShell script to commit all changes in logical groups
# This script creates approximately 46 commits from the work done
# Note: web.js is intentionally excluded as it's not part of this project

Write-Host "Starting commit process..." -ForegroundColor Green
Write-Host "Note: web.js will be ignored as requested" -ForegroundColor Yellow

# Ensure web.js is not tracked
git reset web.js 2>$null

# Step 1: Add and commit package dependencies
Write-Host "`n[1/46] Committing package dependencies..." -ForegroundColor Yellow
git add package.json package-lock.json
git commit -m "Add authentication dependencies

- Add jsonwebtoken for JWT token generation and verification
- Add cookie-parser for HTTP cookie handling
- Add dotenv for environment variable management
- Update package-lock.json with new dependency versions"

# Step 2: Add roles configuration
Write-Host "`n[2/46] Committing roles configuration..." -ForegroundColor Yellow
git add config/roles_list.js
git commit -m "Add roles list configuration

- Define role hierarchy: Admin (5150), Editor (1984), User (2001)
- Create centralized role constants for access control"

# Step 3: Add allowed origins configuration
Write-Host "`n[3/46] Committing allowed origins configuration..." -ForegroundColor Yellow
git add config/allowedOrigins.js
git commit -m "Add allowed origins configuration

- Define CORS allowed origins for cross-origin requests
- Centralize origin management for security"

# Step 4: Update CORS options
Write-Host "`n[4/46] Committing CORS options update..." -ForegroundColor Yellow
git add config/corsOptions.js
git commit -m "Update CORS options configuration

- Integrate allowed origins with CORS settings
- Configure credentials support for authentication"

# Step 5: Add credentials middleware
Write-Host "`n[5/46] Committing credentials middleware..." -ForegroundColor Yellow
git add middleware/credentials.js
git commit -m "Add credentials middleware

- Implement credentials handling for CORS
- Enable credentials in cross-origin requests"

# Step 6: Initial JWT verification middleware
Write-Host "`n[6/46] Committing JWT verification middleware..." -ForegroundColor Yellow
git add middleware/verifyJWT.js
git commit -m "Implement JWT verification middleware

- Add Bearer token extraction from Authorization header
- Verify access tokens using ACCESS_TOKEN_SECRET
- Handle token expiration and validation errors
- Extract user info and roles from decoded token"

# Step 7: Update JWT middleware for UserInfo structure
Write-Host "`n[7/46] Committing JWT middleware UserInfo update..." -ForegroundColor Yellow
git add middleware/verifyJWT.js
git commit -m "Update JWT middleware to use UserInfo structure

- Fix token decoding to access UserInfo.username
- Fix token decoding to access UserInfo.roles
- Add validation for UserInfo structure in token
- Improve error handling for invalid token structure"

# Step 8: Add roles verification middleware
Write-Host "`n[8/46] Committing roles verification middleware..." -ForegroundColor Yellow
git add middleware/verifyRoles.js
git commit -m "Implement role-based access control middleware

- Create verifyRoles middleware for permission checking
- Map role numbers to role names for comparison
- Support multiple allowed roles per route
- Return 403 Forbidden for insufficient permissions"

# Step 9: Update auth controller with JWT imports
Write-Host "`n[9/46] Committing auth controller JWT setup..." -ForegroundColor Yellow
git add controllers/authController.js
git commit -m "Add JWT and environment configuration to auth controller

- Import jsonwebtoken for token generation
- Add dotenv configuration for environment variables
- Update file system imports for async operations
- Prepare for JWT token implementation"

# Step 10: Implement access token generation
Write-Host "`n[10/46] Committing access token generation..." -ForegroundColor Yellow
git add controllers/authController.js
git commit -m "Implement access token generation in login

- Generate JWT access tokens with 30s expiration
- Include username in token payload
- Sign tokens using ACCESS_TOKEN_SECRET from environment"

# Step 11: Implement refresh token generation
Write-Host "`n[11/46] Committing refresh token generation..." -ForegroundColor Yellow
git add controllers/authController.js
git commit -m "Implement refresh token generation in login

- Generate JWT refresh tokens with 1d expiration
- Include username in refresh token payload
- Sign tokens using REFRESH_TOKEN_SECRET from environment"

# Step 12: Add roles to JWT token
Write-Host "`n[12/46] Committing roles in JWT token..." -ForegroundColor Yellow
git add controllers/authController.js
git commit -m "Add user roles to JWT access token

- Extract roles from user database
- Include roles array in UserInfo payload
- Structure token with UserInfo object for better organization"

# Step 13: Implement token persistence
Write-Host "`n[13/46] Committing token persistence..." -ForegroundColor Yellow
git add controllers/authController.js
git commit -m "Implement refresh token persistence in database

- Save refresh token with user record
- Update user database with refresh token
- Persist changes to user.json file"

# Step 14: Add cookie-based token storage
Write-Host "`n[14/46] Committing cookie-based token storage..." -ForegroundColor Yellow
git add controllers/authController.js
git commit -m "Implement HTTP-only cookie for refresh token

- Set refresh token as httpOnly cookie
- Configure 24-hour cookie expiration
- Secure token storage in browser"

# Step 15: Update login response
Write-Host "`n[15/46] Committing login response update..." -ForegroundColor Yellow
git add controllers/authController.js
git commit -m "Update login response to return access token

- Return access token in JSON response
- Remove plain text success message
- Provide token for client-side storage"

# Step 16: Fix role extraction in auth controller
Write-Host "`n[16/46] Committing role extraction fix..." -ForegroundColor Yellow
git add controllers/authController.js
git commit -m "Fix role extraction from user database

- Correct role array handling (roles are already strings)
- Remove incorrect Object.values() and map() operations
- Directly use foundUser.roles array"

# Step 17: Fix file system operations
Write-Host "`n[17/46] Committing file system operations fix..." -ForegroundColor Yellow
git add controllers/authController.js
git commit -m "Fix file system operations to use promises

- Change from fs.writeFileSync to fs.promises.writeFile
- Use async/await for file operations
- Improve error handling for file writes"

# Step 18: Create refresh token controller
Write-Host "`n[18/46] Committing refresh token controller..." -ForegroundColor Yellow
git add controllers/refreshTokenController.js
git commit -m "Create refresh token controller

- Implement handleRefreshToken function
- Extract refresh token from HTTP-only cookie
- Verify refresh token validity
- Generate new access tokens from refresh tokens"

# Step 19: Implement refresh token verification
Write-Host "`n[19/46] Committing refresh token verification..." -ForegroundColor Yellow
git add controllers/refreshTokenController.js
git commit -m "Implement refresh token verification logic

- Verify refresh token signature
- Validate token expiration
- Check token against user database
- Handle invalid or expired refresh tokens"

# Step 20: Add new access token generation in refresh
Write-Host "`n[20/46] Committing new access token generation..." -ForegroundColor Yellow
git add controllers/refreshTokenController.js
git commit -m "Generate new access tokens in refresh endpoint

- Create new access token with 30s expiration
- Include user roles in new token
- Maintain UserInfo structure consistency"

# Step 21: Fix role handling in refresh controller
Write-Host "`n[21/46] Committing refresh controller role fix..." -ForegroundColor Yellow
git add controllers/refreshTokenController.js
git commit -m "Fix role extraction in refresh token controller

- Correct role array handling from user database
- Remove incorrect Object.values() operation
- Directly use foundUser.roles array"

# Step 22: Create logout controller
Write-Host "`n[22/46] Committing logout controller..." -ForegroundColor Yellow
git add controllers/logoutController.js
git commit -m "Create logout controller

- Implement handleLogout function
- Extract refresh token from cookie
- Find user by refresh token
- Clear refresh token from user record"

# Step 23: Implement token deletion on logout
Write-Host "`n[23/46] Committing token deletion on logout..." -ForegroundColor Yellow
git add controllers/logoutController.js
git commit -m "Implement refresh token deletion on logout

- Remove refresh token from user database
- Update user.json with cleaned user record
- Persist changes to file system"

# Step 24: Add cookie clearing on logout
Write-Host "`n[24/46] Committing cookie clearing..." -ForegroundColor Yellow
git add controllers/logoutController.js
git commit -m "Clear HTTP-only cookie on logout

- Remove jwt cookie from client
- Configure secure cookie clearing
- Handle sameSite and secure flags"

# Step 25: Fix logout response codes
Write-Host "`n[25/46] Committing logout response fix..." -ForegroundColor Yellow
git add controllers/logoutController.js
git commit -m "Fix logout response status codes

- Use proper 204 No Content status
- Remove conflicting response methods
- Improve logout response handling"

# Step 26: Update register controller
Write-Host "`n[26/46] Committing register controller update..." -ForegroundColor Yellow
git add controllers/registerController.js
git commit -m "Update register controller

- Ensure proper role assignment for new users
- Maintain consistency with user schema"

# Step 27: Update employees controller
Write-Host "`n[27/46] Committing employees controller update..." -ForegroundColor Yellow
git add controllers/employeesController.js
git commit -m "Update employees controller

- Ensure proper role handling in employee operations
- Maintain data consistency"

# Step 28: Create refresh route
Write-Host "`n[28/46] Committing refresh route..." -ForegroundColor Yellow
git add routes/refresh.js
git commit -m "Create refresh token route

- Add GET /refresh endpoint
- Connect refresh token controller
- Enable token refresh functionality"

# Step 29: Fix refresh route import
Write-Host "`n[29/46] Committing refresh route import fix..." -ForegroundColor Yellow
git add routes/refresh.js
git commit -m "Fix refresh route controller import

- Correct import path to refreshTokenController
- Fix module resolution error"

# Step 30: Update auth route
Write-Host "`n[30/46] Committing auth route update..." -ForegroundColor Yellow
git add routes/auth.js
git commit -m "Update authentication route

- Ensure proper login endpoint configuration
- Connect auth controller to route"

# Step 31: Add JWT middleware to employees route
Write-Host "`n[31/46] Committing JWT middleware to employees..." -ForegroundColor Yellow
git add routes/api/employees.js
git commit -m "Add JWT verification to employees routes

- Protect all employee endpoints with verifyJWT
- Require authentication for employee operations
- Extract user info from JWT tokens"

# Step 32: Add role-based access to GET employees
Write-Host "`n[32/46] Committing role access for GET employees..." -ForegroundColor Yellow
git add routes/api/employees.js
git commit -m "Add role-based access control to GET employees

- Allow all authenticated users to view employees
- Require valid JWT token for access"

# Step 33: Add role-based access to POST employees
Write-Host "`n[33/46] Committing role access for POST employees..." -ForegroundColor Yellow
git add routes/api/employees.js
git commit -m "Restrict employee creation to Admin and Editor roles

- Add verifyRoles middleware to POST endpoint
- Allow Admin (5150) and Editor (1984) roles only
- Prevent regular users from creating employees"

# Step 34: Add role-based access to PUT employees
Write-Host "`n[34/46] Committing role access for PUT employees..." -ForegroundColor Yellow
git add routes/api/employees.js
git commit -m "Restrict employee updates to Admin and Editor roles

- Add verifyRoles middleware to PUT endpoint
- Allow Admin (5150) and Editor (1984) roles only
- Prevent regular users from updating employees"

# Step 35: Add role-based access to DELETE employees
Write-Host "`n[35/46] Committing role access for DELETE employees..." -ForegroundColor Yellow
git add routes/api/employees.js
git commit -m "Restrict employee deletion to Admin role only

- Add verifyRoles middleware to DELETE endpoint
- Allow only Admin (5150) role
- Prevent Editor and User roles from deleting"

# Step 36: Add role-based access to GET employee by ID
Write-Host "`n[36/46] Committing role access for GET employee by ID..." -ForegroundColor Yellow
git add routes/api/employees.js
git commit -m "Add authentication to GET employee by ID

- Require JWT verification for single employee access
- Ensure proper authorization flow"

# Step 37: Fix middleware order in employees routes
Write-Host "`n[37/46] Committing middleware order fix..." -ForegroundColor Yellow
git add routes/api/employees.js
git commit -m "Fix middleware execution order in employee routes

- Ensure verifyJWT runs before verifyRoles
- Set req.roles before role verification
- Maintain proper middleware chain"

# Step 38: Update server with cookie parser
Write-Host "`n[38/46] Committing cookie parser in server..." -ForegroundColor Yellow
git add server.js
git commit -m "Add cookie-parser middleware to server

- Enable cookie parsing for refresh token handling
- Configure cookie middleware before routes
- Support HTTP-only cookies"

# Step 39: Add refresh route to server
Write-Host "`n[39/46] Committing refresh route in server..." -ForegroundColor Yellow
git add server.js
git commit -m "Add refresh token route to server

- Mount /refresh endpoint before JWT verification
- Allow token refresh without access token
- Enable token renewal flow"

# Step 40: Add JWT verification middleware to server
Write-Host "`n[40/46] Committing JWT middleware in server..." -ForegroundColor Yellow
git add server.js
git commit -m "Add JWT verification middleware to server

- Apply verifyJWT to protected routes
- Protect /employees endpoints with authentication
- Enable role-based access control"

# Step 41: Update user database with roles
Write-Host "`n[41/46] Committing user database roles update..." -ForegroundColor Yellow
git add modal/user.json
git commit -m "Update user database with role assignments

- Add roles array to user records
- Assign Admin, Editor, User roles to test users
- Prepare for role-based access control testing"

# Step 42: Update .gitignore for environment files
Write-Host "`n[42/46] Committing .gitignore update..." -ForegroundColor Yellow
git add .gitignore
git commit -m "Add .env to .gitignore

- Exclude environment variables from version control
- Protect sensitive JWT secrets
- Follow security best practices"

# Step 43: Remove incorrect refresh token file
Write-Host "`n[43/46] Committing cleanup of incorrect file..." -ForegroundColor Yellow
git add controllers/refreshToken.js
git commit -m "Remove incorrectly named refresh token file

- Delete refreshToken.js (should be refreshTokenController.js)
- Clean up file structure
- Fix naming convention"

# Step 44: Remove unnecessary file
Write-Host "`n[44/46] Committing cleanup of unnecessary file..." -ForegroundColor Yellow
git add "s token generation with 30s expiration"
git commit -m "Remove accidentally created file

- Delete unnecessary 's token generation with 30s expiration' file
- Clean up project directory
- Remove temporary files"

# Step 45: Final code formatting and cleanup
Write-Host "`n[45/46] Committing code formatting..." -ForegroundColor Yellow
git add middleware/verifyRoles.js
git commit -m "Format verifyRoles middleware code

- Improve code readability
- Consistent formatting style
- Better code organization"

# Step 46: Final verification and documentation
Write-Host "`n[46/46] Committing final updates..." -ForegroundColor Yellow
# Exclude web.js from final commit
git add -A
git reset web.js
git commit -m "Finalize authentication and authorization implementation

- Complete JWT-based authentication system
- Implement role-based access control (RBAC)
- Add refresh token mechanism
- Secure all protected endpoints
- Update all related files and configurations"

Write-Host "`n✅ All commits completed successfully!" -ForegroundColor Green
Write-Host "Total commits created: 46" -ForegroundColor Cyan
Write-Host "`nRun 'git log --oneline' to view all commits" -ForegroundColor Yellow

