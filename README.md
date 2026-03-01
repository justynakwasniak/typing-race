Multiplayer Typing Race

This is a simple multiplayer typing game built with Next.js, TypeScript, and Socket.IO.

Players join the game, type the same sentence, and compete in real time.



How the Game Works

The player enters a nickname.

The server selects a random sentence.

A timer starts (for example 15 seconds).

Players type the sentence as fast and as accurately as possible.

The leaderboard updates live.



When time is over:

a new sentence is selected,

the timer resets,

a new round starts.

The game uses WebSockets for real-time communication.

-------------------------------------------

Technologies:

Next.js

TypeScript

React Hooks

Socket.IO

WebSockets

-----------------------------------

Installation

1. Clone the repository
git clone https://github.com/justynakwasniak/typing-race
cd multiplayer-typing-race
2. Install dependencies
npm install
3. Start the development server
npm run dev
Open your browser and go to:
http://localhost:3000

-------------------------------------------

How to Test Multiplayer

Open http://localhost:3000

Open a second browser tab (or another browser)

Enter different nicknames

Start typing

Watch the live leaderboard update in real time

-------------------------------------------
Project Structure:
/app
  page.tsx            → main game logic
  globals.css         
  layout.tsx

/components
  join-modal.tsx      → nickname modal
  timer.tsx           → countdown timer
  typing-box.tsx      → typing input
  leaderboard.tsx     → ranking table

/lib
  socket.ts           → Socket.IO client
  wpm.ts              → calculate WPM
  accuracy.ts         → calculate accuracy

/pages/api
  socket.ts           → Socket.IO server

/types
 next.d.ts
 -------------------------------------

 Game Logic:

The round time is defined in page.tsx:

const roundDuration = 30;

When the timer ends:

the client sends end-round

the server selects a new sentence

the server sends new-round

the timer resets automatically


--------------------------------------------
Scoring System:
WPM (Words Per Minute)

Counts how many correct words the player typed.

Accuracy

Shows the percentage of correctly typed characters.


----------------------------

Features:

Real-time multiplayer

Live leaderboard

Automatic round reset

Random sentences

Highlighted current player

Timer reset after each round
----------------------------------------------
Future Improvements:

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