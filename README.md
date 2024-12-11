# 🚀 **Mentora: Empowering Education Through Decentralization**

Mentora is an innovative platform developed during the **Taipei Blockchain Week Hackathon** to redefine online education. Built on the **Solana blockchain**, Mentora ensures true content ownership, eliminates intermediaries, and transforms learning into an interactive, rewarding experience.

---

### Tackling Today’s Challenges  

Mentora redefines education platforms by giving **content creators full control and freedom** over their offerings. Creators decide whether their content is free or paid, with payments handled securely through decentralized systems. 

We provide a **multi-content platform**, allowing publishers to share diverse types of content—from courses and articles to videos and beyond—empowering them to innovate and engage in new ways.

- **💸 Direct Creator-to-Learner Transactions**  
  Say goodbye to intermediaries! Learners save on fees, and creators receive fair compensation.

- **🎮 Token-Agnostic Payments**  
  Use any token to engage in seamless transactions. Pay with your preferred cryptocurrency, while creators receive their chosen token—ensuring flexibility and convenience.

- **🏅 Blockchain-Based Credentials**  
  Earn verifiable NFTs as proof of course completion—secure, portable, and entirely yours.

- **🐕 Tokenized Tipping**  
  Instantly support your favorite creators using Solana's native BONK token.

---

## 🌍 **Vision**

Mentora is committed to:  
- **Lowering platform fees** for creators and learners unlike traditional platforms like Cousera , Udemy , etc.  
- Delivering **engaging, gamified education** experiences.  
- Becoming the **ultimate platform to learn Web3**, with a focus on beginners, before scaling to broader audiences.

---

## 👥 **Team**

### Ricardo Castelló - Co-Founder & Tech Lead  
- **Background**: Building on Solana for 3+ years
- **Experience**: 3+ years of software engineering with expertise in Solana blockchain development  

### Ricardo Barroca - Co-Founder & Growth Lead  
- **Background**: Entrepreneur with 3+ years of tech expertise  
- **Focus**: User experience, Frontend development and Strategic planning

---

## 📦 **Technical Architecture**

### Backend
- **Runtime**: Bun.js  
- **Database**: Supabase  
- **Key Features**:
  - API gateway for seamless communication  
  - Solana transaction builder and sender  
  - Real-time balance tracking  

### Frontend
- **Framework**: Vite + React  
- **Language**: TypeScript  
- **Key Features**:
  - Wallet-based authentication  
  - Smooth transaction handling  

### Blockchain Integration
- **Network**: Solana  
- **DEX Aggregator**: Jupiter for token swaps  

---

## ✨ **Development Progress**

### Completed  
1. ✅ Wallet authentication system  
2. ✅ Basic payment infrastructure  
3. ✅ Integration of Solana npm packages  

### In Progress  
1. 🔄 Content delivery infrastructure  
2. 🔄 Community engagement tools  

### Planned (2025)  
1. 📅 Blockchain-based NFT certifications  
2. 📅 Gamified learning and rewards  

---

## 🚀 **Getting Started**

### Prerequisites  
Ensure you have the following before setup:  
- [Birdeye Pro API key](https://birdeye.so) (Required for backend)  
- [Node.js](https://nodejs.org) and [Bun runtime](https://bun.sh) installed  
- A Solana-compatible wallet  

### Installation  

1. **Clone the repository**  
   ```bash
   git clone https://github.com/elbarroca/TBW2024-Hack.git
   cd TBW2024-Hack
   
## Getting Started 🚀

### Prerequisites
- Birdeye Pro API key (required for backend, sorry i need to refactor fetching)
- Node.js and Bun runtime
- Solana wallet

### Installation
1. Clone the repository
2. Backend setup:
   
   cd backend
   cp .env.default .env    # Configure your environment variables
   bun install
   bun run dev
   
3. Frontend setup:
   
   cd frontend
   npm install
   npm run dev
