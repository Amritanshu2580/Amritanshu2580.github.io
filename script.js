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
const autoModeBtn = document.getElementById("autoModeBtn");
const manualModeBtn = document.getElementById("manualModeBtn");

const currentThresholdDisplay = document.getElementById("currentThreshold");
const motorStatusDisplay = document.getElementById("motorStatus");
const systemStatusDisplay = document.getElementById("systemStatus");
const logBox = document.getElementById("logBox");

// Helper function to generate formatted timestamp
function getFormattedTimestamp() {
  const now = new Date();
  return `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
}

// Update log in the log box
function updateLog(message) {
  const timestamp = getFormattedTimestamp();
  const logEntry = `${timestamp}: ${message}`;
  const logParagraph = document.createElement("p");
  logParagraph.textContent = logEntry;
  logBox.appendChild(logParagraph);

  // Keep the log box scrollable to the bottom
  logBox.scrollTop = logBox.scrollHeight;
}

// Update threshold in Firebase
overwriteBtn.addEventListener("click", () => {
  const threshold = parseInt(thresholdInput.value);
  if (!isNaN(threshold) && threshold >= 0 && threshold <= 100) {
    database.ref("/threshold").set(threshold).then(() => {
      systemStatusDisplay.textContent = `Threshold set to ${threshold}`;
      updateLog(`Threshold set to ${threshold}`);
    });
  } else {
    systemStatusDisplay.textContent = "Enter a number between 0 and 100!";
  }
});

// Turn motor ON
motorOnBtn.addEventListener("click", () => {
  database.ref("/motor").set("on").then(() => {
    systemStatusDisplay.textContent = "Motor turned ON";
    updateLog("Motor turned ON");
  });
});

// Turn motor OFF
motorOffBtn.addEventListener("click", () => {
  database.ref("/motor").set("off").then(() => {
    systemStatusDisplay.textContent = "Motor turned OFF";
    updateLog("Motor turned OFF");
  });
});

// Auto Mode
autoModeBtn.addEventListener("click", () => {
  database.ref("/mode").set("auto").then(() => {
    systemStatusDisplay.textContent = "Switched to Auto Mode";
    updateLog("Switched to Auto Mode");
    autoModeBtn.classList.add("on");
    manualModeBtn.classList.remove("off");
  });
});

// Manual Mode
manualModeBtn.addEventListener("click", () => {
  database.ref("/mode").set("manual").then(() => {
    systemStatusDisplay.textContent = "Switched to Manual Mode";
    updateLog("Switched to Manual Mode");
    manualModeBtn.classList.add("off");
    autoModeBtn.classList.remove("on");
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

// Realtime mode updates
database.ref("/mode").on("value", (snapshot) => {
  const modeStatus = snapshot.val();
  if (modeStatus === "auto") {
    autoModeBtn.classList.add("on");
    manualModeBtn.classList.remove("off");
  } else {
    manualModeBtn.classList.add("off");
    autoModeBtn.classList.remove("on");
  }
});

