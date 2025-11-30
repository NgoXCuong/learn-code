#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const envPath = path.join(__dirname, "..", ".env");
console.log("Script location:", __dirname);
console.log("Env file path:", envPath);
const useMock = process.argv[2] === "true";

console.log(`🔄 Setting API mode to: ${useMock ? "MOCK" : "REAL"}`);

// Read current .env file
let envContent = "";
if (fs.existsSync(envPath)) {
  envContent = fs.readFileSync(envPath, "utf8");
}

// Update or add VITE_USE_MOCK_API
const mockRegex = /^VITE_USE_MOCK_API=.*/m;
const newMockLine = `VITE_USE_MOCK_API=${useMock}`;

if (mockRegex.test(envContent)) {
  envContent = envContent.replace(mockRegex, newMockLine);
} else {
  envContent += `\n${newMockLine}`;
}

// Write back to .env
fs.writeFileSync(envPath, envContent.trim() + "\n");

console.log(`✅ API mode set to: ${useMock ? "MOCK" : "REAL"}`);
console.log(`📝 Updated .env file`);
console.log(`🔄 Please restart your dev server to apply changes`);
console.log(`   npm run dev`);
