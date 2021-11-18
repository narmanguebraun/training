# Instagram clone

Full Stack App with Firebase and React.   
Backend: [firebase.google.com](https://firebase.google.com/)   
Frontend: [reactjs.org](https://reactjs.org/)  
Src: [this course](https://www.youtube.com/watch?v=AKeaaa8yAAk) on YouTube (in English).  

This React App is composed by Login, Sign Up, Dashboard (to view/like/comment on photos), User Profile pages.  
Some are private with auth listeners. Firebase firestore handles the data. That data is retrieved using a custom hook.  
The sign-in page connects to Firebase when a user tries to sign in, and when a user signs up, Firebase auth is used to store the user in the Firebase auth database.  

#### Technologies: 
- React.js (Custom Hooks, useContext, useState, useEffect, useRef)
- Firebase (Firestore/auth)
- Tailwind CSS
- LoadTest
- Lighthouse
- Vercel (deployment)
- React Testing Library
- Cypress E2E Testing
