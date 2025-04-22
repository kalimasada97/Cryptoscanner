# **App Name**: Binance Futures Scanner Bot

## Core Features:

- Start Command: Implement a /start command with an inline button labeled [Start Scan].
- Scanning Message: Display a 'Scanning all USDT pairs, please wait...' message upon clicking 'Start Scan'.
- Fetch Binance Pairs: Fetch all Binance Futures USDT pairs with 'TRADING' status using the Binance API with API key K4imTSPtLipPhOEQP1BXKCSmshiEldyMhZtHxxP4fGqEHsSeskglltZqE9DGE44g and secret DFWScLQ83OpMCqmtj6pJrs2Z36OdMXzNWudwVimbRR9AJL46X3yHynG7t6traHrf.
- Filter Pairs: Filter pairs based on Volume_24h, Open Interest, and Spread. Optimize requests to avoid rate limits.
- Display Results: Output filtered pairs to Telegram, including Symbol, Volume_24h (USDT), Open Interest, and Spread (USDT).

## Style Guidelines:

- Primary color: Dark blue (#1A202C) for a professional look.
- Secondary color: Light gray (#EDF2F7) for backgrounds and subtle elements.
- Accent color: Teal (#4DC0B5) for interactive elements and highlights.
- Clean and simple layout for easy readability of the data.
- Use minimalistic icons to represent different data points (volume, open interest, spread).

## Original User Request:
Saya ingin membangun bot Telegram modular menggunakan Python dan Firebase (Hosting + Cloud Functions), untuk melakukan scan semua pair USDT di Binance Futures dengan syarat sebagai berikut:


---

Spesifikasi Fungsional:

1. Bot memiliki menu /start dengan inline button:

[Start Scan]



2. Saat user klik “Start Scan”:

Tampilkan pesan: "Scanning semua pair USDT, mohon tunggu..."

Lakukan pemindaian semua symbol Binance Futures USDT yang status-nya 'TRADING'.



3. Hanya tampilkan pair yang memenuhi syarat:

Volume_24h USDT di atas ambang tertentu

Open Interest tinggi

Spread rendah



4. Output ke Telegram berupa:

Symbol

Volume_24h (USDT)

Open Interest

Spread (USDT)



5. Scan berjalan tanpa kena rate-limit (optimasi request, delay & batch jika perlu).




---

Spesifikasi Teknis:

Framework: Python

Hosting: Firebase Cloud Functions (tanpa Flask)

Database: Firebase Realtime Database

Source Data: Binance API (pakai python-binance)

Modular: Struktur kode dipisah jadi:

handlers/: command dan button Telegram

services/: logic Binance + Firebase

utils/: pengecekan akses + format pesan


Maksimum user yang bisa akses: 10 pengguna (cek lewat Telegram user ID)

ID pemilik tetap: 5125770095 (bisa tambah/remove user via Firebase)



---

Lingkungan & Config:

File .env berisi:

TELEGRAM_BOT_TOKEN=7747406899:AAGTcw4NK2oYRH27M-PHR1GIc7rpfGKe0EE
BINANCE_API_KEY=K4imTSPtLipPhOEQP1BXKCSmshiEldyMhZtHxxP4fGqEHsSeskglltZqE9DGE44g
BINANCE_SECRET_KEY=DFWScLQ83OpMCqmtj6pJrs2Z36OdMXzNWudwVimbRR9AJL46X3yHynG7t6traHrf



---

Struktur Folder:

functions/
├── main.py
├── handlers/
│   ├── start.py
│   └── scan.py
├── services/
│   ├── binance_service.py
│   └── firebase_service.py
├── utils/
│   ├── access_control.py
│   └── formatter.py
├── requirements.txt
└── .env


---

Deployment Firebase:

Hosting: Firebase Hosting (Sparks Plan)

Deploy command:

firebase deploy --only functions

Webhook Telegram diarahkan ke:

https://[PROJECT_ID].web.app
  