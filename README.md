# RentCars Web Application - Mind Map

<details>
<summary>🚀 1. Project Overview</summary>

- Comprehensive car rental platform with user & admin roles
- Users can browse, search, and rent cars
- Admins manage inventory, reservations, and analytics

</details>

---

<details>
<summary>👥 2. System Roles</summary>

### 👤 User Role
- **Account Management**
  - Sign in / Sign up
  - Edit profile (name, email, password, avatar)
  - View reservation history
  - View notifications
- **Car Interactions**
  - Browse cars by marque/model/fuel/price
  - Search and filter
  - View car details with images
- **Rental Process**
  - Select rental dates
  - Enter mock bank info
  - Track reservation status (Pending/Accepted/Rejected/Dropped)
  - Cancel reservations before final confirmation
- **Social Features**
  - Leave comments on rental experiences
  - Rate cars (stored in `car_ratings`)
- **Notifications**
  - Receive notifications for reservation status
  - QR code for accepted reservations with:
    - Car details (marque, license plate)
    - User info (name, email)
    - Rental dates

### 🛠 Admin Role
- **Car Management**
  - Add new cars
  - Edit or delete cars
  - Upload car images
- **Reservation Management**
  - View all reservations
  - Filter by status
  - Accept / Reject with QR code generation
  - Track notifications & pending requests
- **Dashboard & Analytics**
  - User statistics
  - Car inventory counts
  - Reservation metrics (Pending / Accepted / Rejected / Dropped)

</details>

---

<details>
<summary>⚙️ 3. Core System Logic</summary>

- **Authentication & Session**
  - LocalStorage for session persistence
  - Role-based routing (User/Admin)
- **Car Management**
  - CRUD operations for cars
  - Admin-only endpoints for modifications
- **Reservation System**
  - Create new reservations
  - View user-specific reservations
  - Update reservation status (Accept/Reject/Drop)
  - Generate QR codes for accepted reservations
- **Notifications**
  - Status-based notifications
  - Pending request counters for admins
  - Notification badge system
- **Comments & Ratings**
  - Submit comments with star ratings
  - Ratings saved in `car_ratings` table

</details>

---

<details>
<summary>🖥 4. Technical Stack</summary>

### Frontend (React.js)
- React Router DOM for navigation
- Axios for API requests
- Bootstrap & Material-UI for styling
- Swiper for car image sliders
- Recharts for admin dashboard visualizations
- QR code generation & file saving
- Framer Motion for animations

### Backend (Node.js + Express)
- Express.js API framework
- MySQL database
- Multer for file uploads
- bcrypt for password hashing
- CORS & body-parser middleware

</details>

---

<details>
<summary>🗄 5. Database Schema</summary>

| Table           | Description                       |
|-----------------|-----------------------------------|
| users           | User accounts & roles             |
| car             | Vehicle inventory                 |
| rent            | Reservation records               |
| comments        | User feedback                     |
| car_ratings     | Vehicle ratings                   |
| notifications   | User notifications                |

</details>

---

<details>
<summary>🎨 6. UI/UX Design</summary>

- **Color Scheme**
  - Primary: Orange `rgba(251,138,1,1)`
  - Secondary: Dark Gray `#212529`
  - Background: Light Gray / White
- **Style Elements**
  - Modern card-based layout
  - Subtle shadows & rounded corners
  - Smooth animations with Framer Motion

</details>
