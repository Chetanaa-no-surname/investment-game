# The Investment Game

A multiplayer decision-making game designed to illustrate how individual investment decisions affect collective outcomes.

**Live Demo**: `https://Chetanaa-no-surname.github.io/investment-game/`  
**Repository**: `https://github.com/Chetanaa-no-surname/investment-game`

---

## Application Description

This is a browser-based, same-device multiplayer game where 2–4 players each allocate $100 between two assets:

- **Asset A (Riskless)**: The invested amount is returned in full.
- **Asset B (Pooled)**: Total contributions are pooled, increased by 50%, and split equally among all players regardless of contribution.

Players take turns at the same screen. Once all players have submitted, a results screen shows the full breakdown: Total pool, Boosted pool, Individual payouts and highlights the highest investment total among the players

### Assumptions Made

- All players share one device (passed between players). There is no real-time sync across multiple devices.
- Inputs must be non-negative whole numbers summing to exactly $100. No money left unused. 
- No data is persisted between sessions so, refreshing the page resets the game.

---

## Getting Started

### Prerequisites
- Node.js ≥ 18
- npm ≥ 9

### Local Development
```bash
# Clone the repo
git clone https://github.com/Chetanaa-no-surname/investment-game.git
cd investment-game

# Install dependencies
npm install

# Start dev server
npm run dev

```

---

## Task 2

### 1. Learning Design

The application lets players explore investment strategies, from risky gambling to cautious saving, and observe how choices affect both individuals and groups. Playing together on the same device encourages discussion, highlights free-rider issues, and reveals each person’s genuine opinions and decisions.

### 2. Deployment Approach

This application is a static platform with no server, authentication, or sensitive user data, so the security risks are quite low. The main concerns are more about functionality and user experience than about complex attacks. 

The biggest risks are bugs, crashes, or poor performance, which could affect how smoothly the game runs.

**HTTPS only:** GitHub Pages already enforces HTTPS by default, which ensures encrypted data transit and prevents man‑in‑the‑middle attacks. This would become more important if the app were ever extended to handle persistent data or a backend.

**Cross-site scripting (XSS):** To reduce the chance of cross‑site scripting (XSS), I can apply more input validation and sanitization and set a Content Security Policy (CSP). These steps help keep the platform safe from malicious scripts.

Since the platform doesn’t deal with sensitive information, there’s no need to worry about defending against highly sophisticated attackers. The focus should stay on stability and a good user experience.

### 3. Scaling & Multiple Sessions

From my research, a multiplayer website would typically use a frontend client (such as React or Vue) connected to a backend server (like Node.js or Python) that manages the game logic and overall state. A database or cache layer (for example PostgreSQL or Redis) is needed to store session data, while a real‑time communication platform (such as WebSockets) keeps players in sync.

**Real‑time communication:** WebSockets or similar protocols allow players to see updates instantly, whether it’s moves, scores, or chat.

**Persistence:** Session data should be stored in a reliable database so players can reconnect without losing progress. (E.g. Redis)

**Session management:** Players are tracked with unique IDs or tokens, ensuring that reconnects or multiple devices don’t break the game state.

This architecture helps the backend coordinate the frontend smoothly, making multiplayer sessions reliable and scalable.
