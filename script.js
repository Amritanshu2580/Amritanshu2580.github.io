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
  
  const thresholdInput = document.getElementById("thresholdInput");
  const overwriteBtn = document.getElementById("overwriteBtn");
  const motorOnBtn = document.getElementById("motorOnBtn");
  const motorOffBtn = document.getElementById("motorOffBtn");
  const currentThresholdDisplay = document.getElementById("currentThreshold");
  const statusDisplay = document.getElementById("status");
  
  // Update threshold in Firebase
  overwriteBtn.addEventListener("click", () => {
    const threshold = parseInt(thresholdInput.value);
    if (!isNaN(threshold)) {
      database.ref("/threshold").set(threshold);
      statusDisplay.textContent = `Status: Threshold set to ${threshold}`;
    } else {
      statusDisplay.textContent = "Status: Please enter a valid number!";
    }
  });
  
  // Turn motor ON
  motorOnBtn.addEventListener("click", () => {
    database.ref("/motor").set("on");
    statusDisplay.textContent = "Status: Motor turned ON";
  });
  
  // Turn motor OFF
  motorOffBtn.addEventListener("click", () => {
    database.ref("/motor").set("off");
    statusDisplay.textContent = "Status: Motor turned OFF";
  });
  
  // Realtime threshold updates
  database.ref("/threshold").on("value", (snapshot) => {
    const value = snapshot.val();
    currentThresholdDisplay.textContent = value ?? "--";
  });
// Realtime motor status updates
database.ref("/motor").on("value", (snapshot) => {
  const motorStatus = snapshot.val();
  if (motorStatus === "on" || motorStatus === "off") {
    statusDisplay.textContent = `Motor Status: ${motorStatus.toUpperCase()}`;
  } else {
    statusDisplay.textContent = `Motor Status: Unknown`;
  }
});

  
