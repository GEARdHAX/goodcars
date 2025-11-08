# 🗺️ GOOD CARS – API Endpoints

All routes are prefixed with:

```

/api

```

---

## 1. 🔐 Authentication & User Management  
**Prefix:** `/api/auth`

| HTTP Method | Endpoint | Description | Access Level |
| :--- | :--- | :--- | :--- |
| **POST** | `/api/auth/register-user` | Register a new standard **User (Buyer)**. | Public |
| **POST** | `/api/auth/register-agent` | Register a new **Agent (Seller/Dealer)** with additional fields. | Public |
| **POST** | `/api/auth/login` | Authenticate a User or Agent using **email + password**, returns **JWT**. | Public |
| **PUT** | `/api/users/profile` | Update user profile details (name, address, etc.). | Authenticated (User/Agent) |

---

## 2. 🚗 Car Listings  
**Prefix:** `/api/cars`

| HTTP Method | Endpoint | Description | Access Level |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/cars` | Fetch all car listings (supports filters & pagination). | Public |
| **GET** | `/api/cars/:id` | Fetch a specific car listing by its ID. | Public |
| **POST** | `/api/cars` | Create a new car listing with specs & image URLs. | Agent Only |
| **PUT** | `/api/cars/:id` | Update an existing car listing (requires ownership). | Agent Only |
| **DELETE** | `/api/cars/:id` | Delete a car listing by ID (requires ownership). | Agent Only |

---

## 3. 🖼️ File Uploads  
**Prefix:** `/api/upload`

| HTTP Method | Endpoint | Description | Access Level |
| :--- | :--- | :--- | :--- |
| **POST** | `/api/upload/image` | Upload car images to a cloud service (returns secure URLs). | Agent Only |

---

✅ **Note:**  
All protected routes require a valid **JWT** token in the `Authorization` header:

```

Authorization: Bearer <your_jwt_token>

```

---

**© 2025 GOOD CARS Backend – MERN Stack**
```
