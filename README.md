# 📦 Send-It Parcel Delivery App

## 🚀 About the Project  
Send-It is a **parcel delivery tracking system** that allows users to create and track parcel deliveries efficiently. The system provides **real-time updates** via **email & SMS notifications**, integrates **Google Maps** for tracking pickup & destination locations, and offers a **secure authentication system** using JWT.  

## ✨ Features  
- **User Authentication** (Register, Login)  
- **Admin Panel** for managing parcels  
- **Create & Track Parcel Deliveries**  
- **Soft Delete & Status Updates**  
- **Google Maps Integration** (Pickup & Destination Markers)  
- **Real-time Email & SMS Notifications**  
- **Search & Pagination** for better parcel management  
- **Secure Data Handling** (Password Encryption, JOI Validation)  

## 🏗️ Tech Stack  
- **Frontend:** Html, css, js
- **Backend:** Node.js, Express.js, JWT  
- **Database:** MySQL (Using Stored Procedures)  
- **Notifications:** Nodemailer (Emails)  
- **Deployment:** Vercel (Frontend), Railway/DigitalOcean (Backend) 


## 📖 Setup & Installation  
1. Clone the repository  
   ```sh
   git clone https://github.com/Dominicmburu/send-it-app.git
   cd send-it
   ```
2. Install dependencies  
   ```sh
   pnpm i
   ```
3. Set up environment variables (`.env`)  
4. Run backend  
   ```sh
   pnpm run dev
   ```
5. Run frontend  
   ```sh
   cd frontend
   pnpm run dev
   ```
