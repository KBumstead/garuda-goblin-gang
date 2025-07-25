# Pickups: Digital Hub for Indonesian Basketball 🏀

Welcome to **Pickups**, the digital hub for Indonesian basketball! Our platform can track player performance, enable expert-driven ratings and comments, and provide exposure for talented players who deserve recognition.

<img width="1920" height="1080" alt="GOBLIN GANG" src="https://github.com/user-attachments/assets/c79619b3-86b4-4421-8569-537cef24966e" />

## 🚀 What is Pickups?
Pickups is a web application that connects basketball players, scouts, trainers, clubs, and fans across Indonesia. Whether you're a prodigy, a visionary coach, or a passionate supporter, Pickups allows you to:

- 📈 Track player stats and performance across matches
- ⭐️ Rate and comment on players to help expose hidden talent
- ⛹️‍♀️ Browse clubs, training programs, and upcoming tournaments
- 🕵🏽 Scout and review players as a club or trainer
- 🏀 Build your basketball network and discover new opportunities

> Without a unified digital infrastructure, valuable talent is being systematically overlooked, and the growth of Indonesian basketball is being stifled.

Our mission is to help Indonesian basketball talent get the recognition they deserve, and to make it easy for everyone to follow, support, and participate in the sport.

## 🧠 Disclaimer: Use of Generative AI
> **This project uses generative AI for code, content, and/or development.**
>
> Please review and test all code and/or development before use.

## 🏗️ Tech Stack
- Backend: Laravel (PHP)
- Frontend: React (TypeScript, Vite, react-router)
- Database: MySQL
- RESTful APIs endpoint for integration

## 🛠️ Setup
1. **Clone the repository:**
   ```bash
   git clone https://github.com/KBumstead/garuda-goblin-gang.git
   cd garuda-goblin-gang
   ```
2. **Install dependencies:**
   - Backend:
     ```bash
     cd garuda-api
     composer install
     cp .env.example .env
     php artisan key:generate
     php artisan migrate
     php artisan db:seed
     ```
   - Frontend:
     ```bash
     cd ../garuda-frontend
     npm install
     ```
4. **Start the backend server:**
   ```bash
   cd ../garuda-api
   php artisan serve
   ```
5. **Start the frontend dev server:**
   ```bash
   cd ../garuda-frontend
   npm run dev
   ```
6. **Visit the app:**
   - Frontend: [http://localhost:5173](http://localhost:5173)
   - Backend API: [http://localhost:8000/api](http://localhost:8000/api)

---

🏀 **Pickups**: Digital Hub for Indonesian Basketball. 🏅
