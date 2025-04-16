// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyAWzRhEOWJdR7UwZttIXFZREEZJn9_tT0c",
  authDomain: "plant-1b605.firebaseapp.com",
  databaseURL: "https://plant-1b605-default-rtdb.firebaseio.com",
  projectId: "plant-1b605",
  storageBucket: "plant-1b605.firebasestorage.app",
  messagingSenderId: "65487577015",
  appId: "1:65487577015:web:f3e1667ac4dbb7f4ea1232",
  measurementId: "G-7F84G0TKQZ"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database();
console.log("Firebase connected ✅");

// DOM Elements
const thresholdInput = document.getElementById("thresholdInput");
const overwriteBtn = document.getElementById("overwriteBtn");
const motorOnBtn = document.getElementById("motorOnBtn");
const motorOffBtn = document.getElementById("motorOffBtn");

const currentThresholdDisplay = document.getElementById("currentThreshold");
const motorStatusDisplay = document.getElementById("motorStatus");
const systemStatusDisplay = document.getElementById("systemStatus");

// Update threshold in Firebase
overwriteBtn.addEventListener("click", () => {
  const threshold = parseInt(thresholdInput.value);
  if (!isNaN(threshold) && threshold >= 0 && threshold <= 100) {
    database.ref("/threshold").set(threshold).then(() => {
      systemStatusDisplay.textContent = `Threshold set to ${threshold}`;
    });
  } else {
    systemStatusDisplay.textContent = "Enter a number between 0 and 100!";
  }
});

// Turn motor ON
motorOnBtn.addEventListener("click", () => {
  database.ref("/motor").set("on").then(() => {
    systemStatusDisplay.textContent = "Motor turned ON";
  });
});

// Turn motor OFF
motorOffBtn.addEventListener("click", () => {
  database.ref("/motor").set("off").then(() => {
    systemStatusDisplay.textContent = "Motor turned OFF";
  });
});

// Realtime threshold updates
database.ref("/threshold").on("value", (snapshot) => {
  const value = snapshot.val();
  currentThresholdDisplay.textContent = value ?? "--";
});

// Realtime motor status updates
database.ref("/motor").on("value", (snapshot) => {
  const motorStatus = snapshot.val();
  motorStatusDisplay.textContent = motorStatus?.toUpperCase() ?? "--";
});

