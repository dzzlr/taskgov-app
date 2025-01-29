# TaskGov

TaskGov adalah aplikasi manajemen tugas yang dirancang khusus untuk **IT Governance**. Aplikasi ini dikembangkan menggunakan **Next.js** untuk frontend dan **Express.js** untuk backend, dengan struktur yang modular dan fleksibel.

## 🚀 Teknologi yang Digunakan
- **Frontend:** [Next.js](https://nextjs.org/)
- **Backend:** [Express.js](https://expressjs.com/)
- **Database:** (Opsional, bisa menggunakan PostgreSQL, MongoDB, atau file JSON sederhana)
- **Styling:** Tailwind CSS
- **State Management:** React Context API

---

## 📌 Setup & Konfigurasi

### 1️⃣ Clone Repository
```sh
git clone https://github.com/dzzlr/taskgov-app.git
cd taskgov-app
```

### 2️⃣ Instalasi Dependencies
Jalankan perintah berikut di root proyek untuk menginstal semua dependensi yang diperlukan:

```sh
npm install
```

Lakukan hal yang sama di folder `frontend` dan `backend` jika proyek dipisahkan:
```sh
cd frontend && npm install
cd ../backend && npm install
```

---

## ⚙️ Konfigurasi Environment

### 3️⃣ Buat File `.env` di Backend
Pindah ke direktori `backend` dan buat file `.env` untuk menyimpan konfigurasi:

```sh
cd backend
nano .env
```

Tambahkan variabel lingkungan berikut:
```ini
PORT=4000
```

Simpan file `.env` dan kembali ke root proyek.

Tambahkan direktori `data` dan buat file `auditFindings.json` yang isinya sebagai berikut:
```json
[]
```

Pindah ke direktori `frontend` dan buat file `.env` untuk menyimpan konfigurasi:

```sh
cd frontend
nano .env
```

Tambahkan variabel lingkungan berikut:
```ini
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000/api
```

Simpan file `.env` dan kembali ke root proyek.

---

## 📂 Menambahkan Data Awal
### 4️⃣ Tambahkan Data ke Folder `data/` di Backend
Pastikan backend memiliki folder `data/` yang berisi file JSON untuk menyimpan data sementara (jika menggunakan file JSON sebagai database).

```sh
mkdir backend/data
nano backend/data/tasks.json
```

Tambahkan contoh data:
```json
[
  {
    "id": 1,
    "title": "Setup TaskGov Project",
    "description": "Inisialisasi proyek dengan Next.js dan Express.js",
    "status": "In Progress"
  }
]
```

Simpan file dan tutup editor.

---

## 🏃‍♂️ Menjalankan Proyek

### 5️⃣ Jalankan Backend
```sh
cd backend
npm run dev
```
_Default berjalan di **http://localhost:5000**_

### 6️⃣ Jalankan Frontend
```sh
cd frontend
npm run dev
```
_Default berjalan di **http://localhost:3000**_

---

## 📡 API Endpoints (Backend)

| Method | Endpoint        | Description |
|--------|----------------|-------------|
| GET    | `/api/tasks`   | Ambil semua tugas |
| POST   | `/api/tasks`   | Tambah tugas baru |
| PUT    | `/api/tasks/:id` | Perbarui tugas berdasarkan ID |
| DELETE | `/api/tasks/:id` | Hapus tugas berdasarkan ID |

---

## ✅ Fitur Utama
- 🔄 **Task Management** - Tambah, edit, dan hapus tugas
- 🔒 **User Authentication** - Login/logout dengan JWT
- 🌙 **Dark Mode** - Mode terang dan gelap menggunakan Tailwind
- 📊 **Dashboard Analytics** - Statistik tugas untuk monitoring progress

---

## 💡 Kontribusi
Ingin berkontribusi? Silakan fork proyek ini, buat branch fitur baru, dan kirimkan pull request!

```sh
git checkout -b feature/nama-fitur
```

---

## 📝 Lisensi
MIT License - Silakan gunakan dan kembangkan sesuai kebutuhan!

