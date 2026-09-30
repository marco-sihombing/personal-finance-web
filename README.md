# 💰 Personal Finance Web

Aplikasi web untuk mengelola keuangan pribadi — catat pemasukan & pengeluaran, atur budget, pantau financial goals, dan lihat ringkasan keuangan dalam satu dashboard.

Dibangun dengan **Next.js 15**, **TypeScript**, dan **Tailwind CSS**.

---

## ✨ Fitur

- 🔐 **Login dengan Google OAuth** — autentikasi cepat & aman
- 📊 **Dashboard** — ringkasan saldo, income, expense, net cash flow, dan progress goal
- 🏦 **Accounts** — kelola akun bank, cash, dan e-wallet
- 💸 **Transactions** — catat income & expense dengan kategori
- 📁 **Categories** — kelola kategori income & expense (default + custom)
- 🎯 **Financial Goals** — tetapkan target keuangan & pantau progressnya
- 📅 **Budgets** — tetapkan batas pengeluaran per kategori per periode
- 🔔 **Toast notifications** — feedback real-time untuk setiap aksi
- ✅ **Confirm modal** — konfirmasi sebelum aksi destruktif (delete)
- 💱 **Rupiah input** — format otomatis (1.000.000) saat mengetik

---

## 🛠️ Tech Stack

| Layer | Teknologi |
|---|---|
| Framework | [Next.js 15](https://nextjs.org/) (App Router) |
| Language | [TypeScript](https://www.typescriptlang.org/) |
| Styling | [Tailwind CSS](https://tailwindcss.com/) |
| State | React Hooks + Custom Hooks |
| API | REST (fetch) via `lib/api/*` |
| Auth | Google OAuth 2.0 |
| Backend | ASP.NET Core Web API (terpisah) |

---

## 📁 Struktur Project
```
└── 📁personal-finance-web
    └── 📁app
        └── 📁accounts
            ├── page.tsx
        └── 📁auth
            └── 📁google-callback
                ├── page.tsx
        └── 📁budgets
            ├── page.tsx
        └── 📁categories
            ├── page.tsx
        └── 📁dashboard
            ├── page.tsx
        └── 📁financial-goals
            ├── page.tsx
        └── 📁transactions
            ├── page.tsx
        ├── favicon.ico
        ├── globals.css
        ├── layout.tsx
        ├── page.tsx
    └── 📁components
        └── 📁accounts
            ├── AccountCard.tsx
            ├── AccountForm.tsx
            ├── AccountList.tsx
            ├── AccountSummaryCard.tsx
        └── 📁auth
            ├── AuthCallbackStatus.tsx
            ├── GoogleLoginButton.tsx
            ├── LoginHero.tsx
        └── 📁budgets
            ├── BudgetCard.tsx
            ├── BudgetForm.tsx
            ├── BudgetList.tsx
        └── 📁categories
            ├── CategoryCard.tsx
            ├── CategoryForm.tsx
            ├── CategoryGroup.tsx
        └── 📁dashboard
            ├── AccountsSection.tsx
            ├── BudgetSection.tsx
            ├── DashboardHeader.tsx
            ├── FinancialGoalsSection.tsx
            ├── ManageSection.tsx
            ├── SummaryCards.tsx
            ├── TransactionsSection.tsx
        └── 📁financial-goals
            ├── FinancialGoalCard.tsx
            ├── FinancialGoalForm.tsx
            ├── FinancialGoalList.tsx
        └── 📁transactions
            ├── TransactionCard.tsx
            ├── TransactionForm.tsx
            ├── TransactionList.tsx
            ├── TransactionSummary.tsx
        └── 📁ui
            ├── ConfirmModal.tsx
            ├── CurrencyInput.tsx
            ├── Modal.tsx
            ├── Toast.tsx
    └── 📁hooks
        ├── useAccountForm.ts
        ├── useAccounts.ts
        ├── useAuthCallback.ts
        ├── useBudgetForm.ts
        ├── useBudgets.ts
        ├── useCategories.ts
        ├── useCategoryForm.ts
        ├── useClickOutside.ts
        ├── useConfirmDialog.ts
        ├── useDashboard.ts
        ├── useFinancialGoalForm.ts
        ├── useFinancialGoals.ts
        ├── useGoogleLogin.ts
        ├── useLogout.ts
        ├── useSessionRedirect.ts
        ├── useToast.tsx
        ├── useTransactionForm.ts
        ├── useTransactions.ts
    └── 📁lib
        └── 📁api
            ├── accounts.api.ts
            ├── auth.api.ts
            ├── budgets.api.ts
            ├── categories.api.ts
            ├── client.ts
            ├── dashboard.api.ts
            ├── financial-goals.api.ts
            ├── transactions.api.ts
        └── 📁utils
            ├── budget.ts
            ├── currency.ts
            ├── format.ts
            ├── initials.ts
    └── 📁public
        ├── file.svg
        ├── globe.svg
        ├── next.svg
        ├── vercel.svg
        ├── window.svg
    └── 📁types
        ├── account.types.ts
        ├── auth.types.ts
        ├── budget.types.ts
        ├── category.types.ts
        ├── dashboard.types.ts
        ├── entity.types.ts
        ├── financial-goal.types.ts
        ├── index.ts
        ├── transaction.types.ts
        ├── user.types.ts
    ├── .env
    ├── .gitignore
    ├── AGENTS.md
    ├── CLAUDE.md
    ├── eslint.config.mjs
    ├── next-env.d.ts
    ├── next.config.ts
    ├── package-lock.json
    ├── package.json
    ├── postcss.config.mjs
    ├── README.md
    └── tsconfig.json
```

---

## 🚀 Memulai

### Prasyarat

- **Node.js** ≥ 18
- **npm** / **pnpm** / **yarn**
- Backend API (ASP.NET Core) sudah berjalan
- Google OAuth credentials (untuk login)

### Instalasi

```bash
# Clone repo
git clone <repo-url>
cd personal-finance-web

# Install dependencies
npm install
### Prasyarat

Pastikan sudah terinstall:

* **Node.js** ≥ 18
* **npm** / **pnpm** / **yarn**
* Backend API **ASP.NET Core** sudah berjalan
* Google OAuth credentials untuk fitur login dengan Google

### Instalasi

```bash
# Clone repository
git clone <repo-url>

# Masuk ke project
cd personal-finance-web

# Install dependencies
npm install
```

### Environment Variables

Buat file `.env` di root project:

```env
NEXT_PUBLIC_API_URL=https://localhost:7253
```

Sesuaikan URL tersebut dengan URL backend ASP.NET Core yang digunakan.

Untuk production:

```env
NEXT_PUBLIC_API_URL=https://api.domainkamu.com
```

> Jangan commit file `.env` yang berisi credential atau secret ke repository.

### Jalankan Development Server

```bash
npm run dev
```

Buka:

```text
http://localhost:3000
```

di browser.

### Build Production

```bash
npm run build
npm run start
```

---

## 🏗️ Arsitektur

Project ini menggunakan pendekatan **layered architecture pada frontend** dengan pemisahan tanggung jawab antara page, hooks, API layer, components, dan utilities.

```text
┌─────────────────────────────────────────────┐
│  Page (app/*/page.tsx)                      │
│  - Compose page                              │
│  - Menggunakan hooks & components            │
└─────────────────┬───────────────────────────┘
                  │
┌─────────────────▼───────────────────────────┐
│  Hooks (hooks/*.ts)                         │
│  - State management                          │
│  - Business logic                            │
│  - API interaction                           │
│  - Form state & validation                   │
└─────────────────┬───────────────────────────┘
                  │
┌─────────────────▼───────────────────────────┐
│  API Layer (lib/api/*.api.ts)               │
│  - Endpoint wrapper                          │
│  - API request                               │
│  - Error handling                            │
└─────────────────┬───────────────────────────┘
                  │
┌─────────────────▼───────────────────────────┐
│  Components (components/*)                  │
│  - Reusable UI                               │
│  - Forms, modals, cards, etc.                │
└─────────────────┬───────────────────────────┘
                  │
┌─────────────────▼───────────────────────────┐
│  Backend (ASP.NET Core Web API)             │
│  - Authentication                            │
│  - Business logic                            │
│  - PostgreSQL                                │
└─────────────────────────────────────────────┘
```

### Prinsip Utama

1. **Single Source of Truth**
   Entity types dan API types didefinisikan secara terstruktur dan digunakan kembali oleh seluruh aplikasi.

2. **DRY (Don't Repeat Yourself)**
   Menggunakan reusable components dan utilities seperti `CurrencyInput`, `ConfirmModal`, dan `formatRupiah`.

3. **Separation of Concerns**
   Page digunakan untuk composition, hooks menangani state dan logic, sedangkan components menangani tampilan.

4. **Type Safety**
   Menggunakan TypeScript untuk API response, form data, dan application state.

5. **Consistent UX**
   Notifikasi menggunakan Toast dan tindakan yang membutuhkan konfirmasi menggunakan ConfirmModal.

---

## 🎨 Design System

### Tema Warna

| Warna                          | Penggunaan                         |
| ------------------------------ | ---------------------------------- |
| 🟡 `yellow-400` → `amber-500`  | Primary buttons, header, highlight |
| 🟢 `green-500`                 | Income, success, goal completed    |
| 🔴 `red-500`                   | Expense, danger, error, delete     |
| ⚪ `white/90` + `backdrop-blur` | Card background                    |

### Komponen Reusable

* **`<Modal>`** — Modal generic dengan backdrop dan escape handler
* **`<ConfirmModal>`** — Modal konfirmasi untuk tindakan seperti delete
* **`<CurrencyInput>`** — Input nominal dengan format Rupiah otomatis
* **`<Toast>`** — Notifikasi floating untuk success, error, dan info
* **`<DashboardHeader>`** — Header konsisten dengan menu logout

---

## 🔐 Autentikasi

Aplikasi menggunakan **Google OAuth 2.0** untuk autentikasi pengguna.

Flow autentikasi:

```text
1. User klik "Continue with Google"
                ↓
2. Frontend mengarahkan user ke backend /Auth/google
                ↓
3. Backend menangani OAuth flow dengan Google
                ↓
4. Google mengembalikan authorization code
                ↓
5. Backend melakukan exchange code
                ↓
6. Backend mendapatkan informasi user
                ↓
7. Backend membuat JWT
                ↓
8. JWT disimpan dalam HttpOnly cookie
                ↓
9. Backend redirect ke frontend
                ↓
10. Frontend mengecek session melalui /Auth/me
                ↓
11. Session valid → /dashboard
    Session invalid → /
```

Session menggunakan **HttpOnly cookie**, sehingga token tidak dapat diakses secara langsung melalui JavaScript pada browser.

Frontend mengirim request API menggunakan credentials:

```typescript
fetch(url, {
  credentials: "include",
});
```

---

## 💰 Fitur Utama

### Authentication

* Google OAuth 2.0
* JWT authentication
* HttpOnly cookie session
* Protected routes

### Account Management

* Membuat account
* Mengubah account
* Menghapus account
* Opening balance
* Account balance tracking
* Account type

### Transaction Management

* Income
* Expense
* Transaction history
* Category-based transactions
* Account balance otomatis diperbarui berdasarkan transaksi
* Validasi saldo sebelum expense

### Category Management

* Income categories
* Expense categories
* Global categories
* User-specific categories

### Budget Management

* Membuat budget
* Mengatur periode budget
* Menghubungkan budget dengan category
* Monitoring budget

### Financial Goals

* Membuat financial goal
* Target amount
* Target date
* Progress tracking
* Automatic virtual allocation berdasarkan account balance

### Dashboard

* Total income
* Total expense
* Net transaction
* Total account balance
* Financial goal allocation
* Available money
* Monthly transaction summary
* Yearly transaction summary
* Category summary
* Account overview
* Budget overview

---

## 💡 Financial Calculation

Aplikasi membedakan antara **net transaction** dan **actual account balance**.

### Net Transaction

```text
Total Income - Total Expense
```

Contoh:

```text
Income   = Rp1.000.000
Expense  = Rp110.000
---------------------
Net      = Rp890.000
```

### Account Balance

Account balance juga memperhitungkan **opening balance**.

```text
Opening Balance = Rp1.000.001
Income          = Rp1.000.000
Expense         = Rp110.000
--------------------------------
Account Balance = Rp1.890.001
```

Dengan demikian, opening balance tidak dianggap sebagai income transaction, tetapi tetap menjadi bagian dari uang aktual yang tersedia pada account.

### Financial Goal

Financial goal menggunakan **virtual allocation** dari total account balance.

Contoh:

```text
Account Balance       = Rp1.890.001
Financial Goal Target = Rp1.000.000
------------------------------------
Goal Allocation       = Rp1.000.000
Available Money       = Rp890.001
```

Financial goal tidak memindahkan uang secara fisik dari account. Allocation digunakan untuk menunjukkan bagian saldo yang secara virtual dialokasikan untuk tujuan tertentu.

---

## 📝 Konvensi Kode

### Penamaan

| Tipe       | Convention                    | Contoh                 |
| ---------- | ----------------------------- | ---------------------- |
| Component  | PascalCase                    | `TransactionCard.tsx`  |
| Hook       | camelCase dengan prefix `use` | `useTransactions.ts`   |
| API module | camelCase + `.api`            | `transactions.api.ts`  |
| Type file  | camelCase + `.types`          | `transaction.types.ts` |
| Utility    | camelCase                     | `formatRupiah`         |

### Aturan

* Gunakan import path alias `@/*`
* Gunakan `"use client"` hanya pada file yang membutuhkan client-side state atau event handlers
* Jangan hardcode URL backend
* Gunakan `process.env.NEXT_PUBLIC_API_URL`
* Jangan menggunakan `window.alert()`
* Jangan menggunakan `window.confirm()`
* Gunakan `<Toast>` untuk notifikasi
* Gunakan `<ConfirmModal>` untuk confirmation dialog

Contoh:

```typescript
const API_URL = process.env.NEXT_PUBLIC_API_URL;
```

---
## 📜 Scripts

| Command         | Deskripsi                                     |
| --------------- | --------------------------------------------- |
| `npm run dev`   | Menjalankan development server pada port 3000 |
| `npm run build` | Membuat production build                      |
| `npm run start` | Menjalankan production server                 |
| `npm run lint`  | Menjalankan ESLint                            |

---

## 🤝 Kontribusi

1. Fork repository
2. Buat branch fitur:

```bash
git checkout -b feat/nama-fitur
```

3. Commit perubahan:

```bash
git commit -m "feat: tambah fitur X"
```

4. Push branch:

```bash
git push origin feat/nama-fitur
```

5. Buat Pull Request

### Conventional Commits

| Prefix      | Penggunaan                       |
| ----------- | -------------------------------- |
| `feat:`     | Menambahkan fitur baru           |
| `fix:`      | Memperbaiki bug                  |
| `refactor:` | Refactor tanpa mengubah behavior |
| `docs:`     | Perubahan dokumentasi            |
| `style:`    | Formatting atau perubahan style  |
| `chore:`    | Maintenance                      |

---

## 📄 Lisensi

MIT License — bebas digunakan dan dimodifikasi sesuai ketentuan lisensi.

---

## 🔗 Related

* [Backend API Repository]([https://link-backend-repo/](https://github.com/marco-sihombing/personal-finance-api/)) — ASP.NET Core Web API
* [Next.js Documentation](https://nextjs.org/docs)
* [Tailwind CSS Documentation](https://tailwindcss.com/docs)
* [ASP.NET Core Documentation](https://learn.microsoft.com/aspnet/core/)
* [PostgreSQL Documentation](https://www.postgresql.org/docs/)

---

<p align="center">
  Dibuat dengan ❤️ untuk mengelola keuangan pribadi dengan lebih baik.
</p>
