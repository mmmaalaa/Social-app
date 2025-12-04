# Social Media API

A feature-rich social media backend API built with Node.js, Express, and MongoDB. This application provides a complete social networking platform with user authentication, post management, commenting system, and real-time interactions.

## 🚀 Features

### Authentication & Authorization

- User registration with email verification
- Secure login with JWT tokens
- OTP-based password reset
- Cookie-based session management
- Email resend functionality for expired activations

### User Management

- User profile creation and updates
- Profile image upload with Cloudinary integration
- User settings and preferences

### Posts

- Create, read, update, and delete posts
- Image uploads with multiple file support
- Post likes and interactions
- Post visibility controls

### Comments

- Comment on posts
- Nested comment replies
- Comment likes
- Image attachments in comments
- Delete and update comments

### Additional Features

- Rate limiting for API protection
- CORS enabled for cross-origin requests
- Automated cleanup of old data (hard delete)
- Image optimization with Sharp
- Cloud storage with Cloudinary

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **MongoDB** (local or cloud instance)
- **Cloudinary account** (for image uploads)

## 🛠️ Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd socialMedia
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**

   Create a `.env` file in the root directory with the following variables:

   ```env
   # Database
   MONGO_URI=your_mongodb_connection_string

   # Server
   PORT=5000

   # JWT
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRES_IN=7d

   # Email Configuration
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASSWORD=your_email_password

   # Cloudinary
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret

   # Other
   NODE_ENV=development
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

The server will start on `http://localhost:5000`

## 📁 Project Structure

```
socialMedia/
├── src/
│   ├── DB/
│   │   ├── models/          # Mongoose schemas
│   │   │   ├── user.model.js
│   │   │   ├── post.model.js
│   │   │   ├── comments.model.js
│   │   │   ├── likes.model.js
│   │   │   ├── likesComments.model.js
│   │   │   └── otp.model.js
│   │   └── connection.js    # Database connection
│   ├── modules/
│   │   ├── auth/            # Authentication routes & logic
│   │   ├── user/            # User management
│   │   ├── post/            # Post CRUD operations
│   │   └── comments/        # Comment management
│   ├── middleware/          # Custom middleware
│   ├── utils/               # Utility functions
│   │   ├── appError.js
│   │   ├── cloudinary.js
│   │   ├── sendEmail.js
│   │   ├── tokens.js
│   │   ├── hashing.js
│   │   ├── hardDelete.js
│   │   └── uploads.js
│   └── app.controller.js    # App configuration
├── uploads/                 # Temporary upload directory
├── index.js                 # Entry point
├── package.json
└── .env
```

## 🔌 API Endpoints

### Authentication

- `POST /api/v1/auth/register` - Register a new user
- `POST /api/v1/auth/login` - Login user
- `POST /api/v1/auth/verify-email` - Verify email with OTP
- `POST /api/v1/auth/resend-email` - Resend verification email
- `POST /api/v1/auth/forgot-password` - Request password reset
- `POST /api/v1/auth/reset-password` - Reset password with OTP

### Users

- `GET /api/v1/user/profile` - Get user profile
- `PUT /api/v1/user/profile` - Update user profile
- `POST /api/v1/user/upload-avatar` - Upload profile picture

### Posts

- `GET /api/v1/post` - Get all posts
- `GET /api/v1/post/:id` - Get single post
- `POST /api/v1/post` - Create new post
- `PUT /api/v1/post/:id` - Update post
- `DELETE /api/v1/post/:id` - Delete post
- `POST /api/v1/post/:id/like` - Like/unlike post

### Comments

- `GET /api/v1/comment/:postId` - Get comments for a post
- `POST /api/v1/comment` - Create comment
- `PUT /api/v1/comment/:id` - Update comment
- `DELETE /api/v1/comment/:id` - Delete comment
- `POST /api/v1/comment/:id/like` - Like/unlike comment

## 🔒 Security Features

- **Password Hashing**: Bcrypt encryption for user passwords
- **JWT Authentication**: Secure token-based authentication
- **Rate Limiting**: Protection against brute force attacks
- **Input Validation**: Joi schema validation for all requests
- **CORS**: Configured for secure cross-origin requests
- **Cookie Security**: HTTP-only cookies for session management

## 🛡️ Data Validation

All API requests are validated using Joi schemas to ensure data integrity and security. Invalid requests return appropriate error messages.

## 📦 Dependencies

### Core

- **express** - Web framework
- **mongoose** - MongoDB ODM
- **jsonwebtoken** - JWT authentication
- **bcrypt** - Password hashing

### File & Image Handling

- **multer** - File upload middleware
- **cloudinary** - Cloud image storage
- **sharp** - Image optimization

### Utilities

- **joi** - Schema validation
- **nodemailer** - Email sending
- **cookie-parser** - Cookie parsing
- **cors** - CORS middleware
- **express-rate-limit** - Rate limiting
- **cron** - Scheduled tasks
- **nanoid** - Unique ID generation

## 📝 Scripts

```bash
# Development with auto-reload
npm run dev
```

## 🗃️ Database Models

### User

- Username, email, password (hashed)
- Profile information
- Email verification status
- Account creation and update timestamps

### Post

- User reference
- Content (text/images)
- Likes count
- Timestamps

### Comment

- Post and user references
- Comment text and optional image
- Parent comment (for nested replies)
- Likes count

### Like

- User and post references
- Timestamp

### OTP

- User reference
- OTP code (hashed)
- Expiration timestamp

## ⚙️ Automated Tasks

The application includes a cron job that automatically deletes old/expired data to maintain database cleanliness and performance.

## 🌐 Static File Serving

Uploaded files are accessible via:

```
http://localhost:5000/api/v1/uploads/<filename>
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 👨‍💻 Author

**MAHMOUD**

## 🐛 Bug Reports & Feature Requests

If you encounter any bugs or have feature requests, please create an issue in the repository.

## 📞 Support

For support and questions, please open an issue or contact the maintainer.

---

**Built with ❤️ using Node.js and Express**
