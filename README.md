# 🏫 School Management System

A modern, feature-rich School Management System built with React, Redux Toolkit, Ant Design, and Tailwind CSS. Designed for schools to manage students, teachers, attendance, tasks, communication, and more — all in one place.

![React](https://img.shields.io/badge/React-18-blue?logo=react)
![Redux](https://img.shields.io/badge/Redux_Toolkit-latest-purple?logo=redux)
![Ant Design](https://img.shields.io/badge/Ant_Design-5-blue?logo=antdesign)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38bdf8?logo=tailwindcss)
![License](https://img.shields.io/badge/License-MIT-green)

---

## 🌟 Features

### 📢 Communication
- 📰 **News Feed** — Facebook-style posts with reactions, comments, polls & photo sharing
- 💬 **Messenger** — Real-time chat UI with contact list and conversation panel
- 📧 **Mail Box** — Gmail-style email client with compose, folders & attachments

### 📅 Scheduling
- 📅 **Calendar** — Role-based scheduling for Admin, Teacher & Student with week/month/day views
- 🕐 **Attendance** — Student & Teacher attendance tracking with overview dashboard

### 📚 Academics
- 👤 **Student ID Cards** — Printable student ID cards with full profile details
- 🏛️ **School Policies** — Policy management with category filters and detail view
- 📋 **Forms** — Dynamic form builder with questions, approvers & submissions

### 👥 People & Teams
- 👥 **Groups** — Group collaboration (Public/Private/Class/Club groups)
- 📊 **Projects** — Project management with cover images, members & status tracking
- 📌 **Work Board** — Kanban-style boards with task progress tracking

### ✅ HR & Workflow
- 🏖️ **Leaves** — Leave application & multi-level approval workflow
- ✅ **Tasks** — Task management with priority, assignment & progress tracking
- 🏆 **Rewards** — Student & staff reward issuance system
- ⚠️ **Warnings** — Warning issuance with category & approver management
- 📝 **Complaints** — Complaint submission & resolution tracking

### 📄 Content
- 📄 **Pages** — Content pages with publish/unpublish, tags & collaborators
- 🗂️ **Docs & Archives** — Document management system

---

## 🛠️ Tech Stack

| Technology | Version | Usage |
|-----------|---------|-------|
| React | 18 | Frontend framework |
| Redux Toolkit | Latest | State management |
| Ant Design | 5 | UI component library |
| Tailwind CSS | 3 | Utility-first styling |
| React Router | v6 | Client-side routing |
| LocalStorage | — | Data persistence |
| Montserrat | — | Typography |

---

## 🎨 Color Palette

| Name | Color | RGB | Usage |
|------|-------|-----|-------|
| School Blue | 🔵 | rgb(82, 107, 177) | Primary actions, buttons |
| School Teal | 🟢 | rgb(100, 196, 178) | Success, Present status |
| School Sky | 🩵 | rgb(69, 198, 238) | Info, highlights |
| School Pink | 🩷 | rgb(232, 19, 123) | Alerts, badges, notifications |
| School Yellow | 🟡 | rgb(247, 212, 71) | Warning, Pending status |

---

## 🚀 Getting Started

### Prerequisites
- Node.js >= 14
- npm >= 6

### Installation
```bash
# Clone the repository
git clone https://github.com/myasirweb/school-management-system.git

# Navigate to project folder
cd school-management-system

# Install dependencies
npm install

# Start development server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production
```bash
npm run build
```

---

## 📁 Project Structure
```
src/
├── components/              # Shared/reusable components
│   ├── SharedTable/
│   ├── SharedDrawer/
│   ├── SharedFilterBar/
│   ├── SideNav/
│   ├── Header/
│   └── MessengerBar/
├── assets/                  # Images, icons, SVGs
└── main/
    └── features/            # Feature modules
        ├── attendance/
        ├── calendar/
        ├── complaints/
        ├── forms/
        ├── groups/
        ├── leaves/
        ├── mailBox/
        ├── messenger/
        ├── newsFeed/
        ├── pages/
        ├── projects/
        ├── rewards/
        ├── schoolPolicy/
        ├── studentIdCard/
        ├── tasks/
        ├── warnings/
        └── workBoard/
```

### Feature Module Structure
Each feature follows this consistent pattern:
```
feature/
├── store/         # Redux slice
├── services/      # API service layer
├── utils/         # Dummy data & localStorage
└── view/
    ├── index.js   # Route export
    └── Page/
        ├── index.js
        ├── composer/    # Create/edit forms
        ├── Detail/      # Detail views/drawers
        ├── Listing/
        │   ├── Grid/    # Card grid view
        │   └── Table/   # Table list view
        └── UI/          # Presentational components
```

---

## 🔑 Key Design Patterns

- **Ant Design** for all UI components — no custom inputs
- **Tailwind CSS** for layout and styling
- **Redux Toolkit** for all state management
- **LocalStorage** for data persistence (no backend required)
- **SharedDrawer** for all drawer components
- **SharedFilterBar** with tabs for all listing pages
- **SharedTable** for all table views
- Grid & List toggle on all listing pages
- Consistent card design across all modules
- `hide-scrollbar` utility class on all scroll areas

---

## 📸 Screenshots

> Coming soon...

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📜 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Muhammad Yasir**
- GitHub: [@myasirweb](https://github.com/myasirweb)

---

⭐ **Star this repo if you found it helpful!**
