#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const envPath = path.join(__dirname, "..", ".env");

// Read current .env file
let envContent = "";
if (fs.existsSync(envPath)) {
  envContent = fs.readFileSync(envPath, "utf8");
}

// Find current VITE_USE_MOCK_API value
const mockRegex = /^VITE_USE_MOCK_API=(.*)/m;
const match = envContent.match(mockRegex);

let currentMode = true; // default to mock
if (match) {
  currentMode = match[1].trim() === "true";
}

const newMode = !currentMode;

console.log(`🔄 Toggling API mode:`);
console.log(`   From: ${currentMode ? "MOCK" : "REAL"}`);
console.log(`   To:   ${newMode ? "MOCK" : "REAL"}`);

// Update the value
const newMockLine = `VITE_USE_MOCK_API=${newMode}`;
if (mockRegex.test(envContent)) {
  envContent = envContent.replace(mockRegex, newMockLine);
} else {
  envContent += `\n${newMockLine}`;
}

// Write back to .env
fs.writeFileSync(envPath, envContent.trim() + "\n");

console.log(`✅ API mode toggled to: ${newMode ? "MOCK" : "REAL"}`);
console.log(`📝 Updated .env file`);
console.log(`🔄 Please restart your dev server to apply changes`);
console.log(`   npm run dev`);

if (!newMode) {
  console.log(`\n⚠️  WARNING: Switched to REAL API mode!`);
  console.log(`   Make sure your backend is running and accessible.`);
  console.log(
    `   Backend URL: ${
      process.env.VITE_API_BASE_URL || "http://localhost:3001/api"
    }`
  );
}
