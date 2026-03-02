# Multiplayer Typing Race

A simple **multiplayer typing game** built with **Next.js**, **TypeScript**, and **Socket.IO**.  

Players join the game, type the same sentence, and compete in real time.

---

## How the Game Works

1. The player enters a nickname.
2. The server selects a random sentence.
3. A timer starts (e.g., 15 seconds).
4. Players type the sentence as fast and as accurately as possible.
5. The leaderboard updates live.

When time is over:

- A new sentence is selected.
- The timer resets.
- A new round starts.

The game uses **WebSockets** for real-time communication.

---

## Technologies Used

- Next.js  
- TypeScript  
- React Hooks  
- Socket.IO  
- WebSockets  

---

## Installation

1. Clone the repository
git clone https://github.com/justynakwasniak/typing-race
cd multiplayer-typing-race
2. Install dependencies
npm install
3. Start the development server
npm run dev
Open your browser and go to:
http://localhost:3000

## How to Test Multiplayer

1. Open http://localhost:3000

2. Open a second browser tab (or another browser)

3. Enter different nicknames

4. Start typing

5. Watch the live leaderboard update in real time

 ## Game Logic:

- The round time is defined in page.tsx:

const roundDuration = 60;

- When the timer ends:

the client sends end-round

the server selects a new sentence

the server sends new-round

the timer resets automatically

## Scoring System:
- WPM (Words Per Minute)

- Counts how many correct words the player typed.

- Accuracy

- Shows the percentage of correctly typed characters.

## Features:

- Real-time multiplayer

- Live leaderboard

- Automatic round reset

- Random sentences

- Highlighted current player

- Timer reset after each round

## Future Improvements:

Improve WPM calculation (real time-based words per minute)

Improve accuracy calculation (handle overtyping and edge cases)

Save player statistics (database or localStorage)

Load player stats when rejoining

Add loading state while connecting to server

Add error state when connection fails

Add sorting by columns (WPM, Accuracy, Name)

Add pagination for large number of players

Allow changing number of displayed rows

Sync sorting with URL query parameters

Add global ranking system

Add authentication

Add private game rooms

Add better UI animations and feedback

Add server-controlled timer for full synchronization