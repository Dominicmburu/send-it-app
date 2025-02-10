```
src/
├── config/
│   ├── database.ts     # DB connection config
│   ├── jwt.ts          # JWT configuration
│   └── email.ts        # Email service config
│
├── controllers/
│   ├── auth.controller.ts   # Auth-related logic
│   ├── user.controller.ts   # User profile management
│   ├── parcel.controller.ts # Parcel CRUD operations
│   └── admin.controller.ts  # Admin-specific operations
│
├── middlewares/
│   ├── auth.middleware.ts    # JWT authentication
│   ├── admin.middleware.ts   # Admin role check
│   ├── validation.middleware.ts # Request validation
│   └── error.middleware.ts   # Error handling
│
├── routes/
│   ├── auth.routes.ts    # Authentication routes
│   ├── user.routes.ts    # User-specific routes
│   ├── parcel.routes.ts  # Parcel management routes
│   └── admin.routes.ts   # Admin-only routes
│
├── validations/
│   ├── auth.validation.ts  # Auth schema validation
│   ├── user.validation.ts  # User schema validation
│   └── parcel.validation.ts # Parcel schema validation
│
├── utils/
│   ├── database.ts      # DB connection helper
│   ├── jwt.ts           # JWT token helpers
│   ├── email.ts         # Email service wrapper
│   ├── procedures.ts    # Stored procedure executor
│   └── pagination.ts    # Pagination helper
│
├── services/
│   ├── auth.service.ts     # Auth business logic
│   ├── user.service.ts     # User-related services
│   ├── parcel.service.ts   # Parcel-related services
│   └── notification.service.ts # Notification system
│
├── types/
│   ├── user.d.ts       # User type definitions
│   └── parcel.d.ts     # Parcel type definitions
│
├── workers/
│   └── email.worker.ts   # Background email jobs
│
└── app.ts              # Main application entry point
```

---