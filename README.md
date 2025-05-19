# Uber

# User Registration Endpoint

## POST `/users/register`

Registers a new user in the system.

### Request Body

Send a JSON object with the following structure:

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "yourpassword"
}
```

- `fullname.firstname` (string, required, min 3 chars)
- `fullname.lastname` (string, optional, min 3 chars if provided)
- `email` (string, required, must be valid email)
- `password` (string, required, min 6 chars)

### Responses

- **201 Created**
  - User registered successfully.
  - Returns: `{ "token": "<jwt_token>", "user": { ...userData } }`

  **Example:**
  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "64f1c2e7b2e8c9a1b2c3d4e5",
      "fullname": {
        "firstname": "Alice",
        "lastname": "Smith"
      },
      "email": "alice@example.com"
      // ...other user fields...
    }
  }
  ```

- **400 Bad Request**
  - Validation failed.
  - Returns: `{ "errors": [ ... ] }`

  **Example:**
  ```json
  {
    "errors": [
      "Email is invalid",
      "Password must be at least 6 characters"
    ]
  }
  ```

- **500 Internal Server Error**
  - Unexpected error during registration.

  **Example:**
  ```json
  {
    "error": "Internal server error"
  }
  ```

### Example Request

```bash
curl -X POST http://localhost:3000/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullname": { "firstname": "Alice", "lastname": "Smith" },
    "email": "alice@example.com",
    "password": "securepass"
  }'
```
