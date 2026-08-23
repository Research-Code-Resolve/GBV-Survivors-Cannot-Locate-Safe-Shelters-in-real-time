// Run with: node scripts/generate-access-code.js
//
// Prints a random access code and its SHA-256 hash. Give the code to
// a staff member out-of-band (WhatsApp, in person, etc). Insert the
// hash into staff_access_codes via the Supabase SQL editor:
//
//   insert into public.staff_access_codes (code_hash, label)
//   values ('<paste hash here>', 'batch 1 - august 2026');
//
// Never insert the raw code into the database. Never commit the raw
// code to git.

import { randomBytes, createHash } from "node:crypto";

const code = randomBytes(6).toString("base64url"); // short, url-safe
const hash = createHash("sha256").update(code).digest("hex");

console.log("Access code (give to staff member, do not commit):");
console.log(code);
console.log();
console.log("Hash (insert this into staff_access_codes.code_hash):");
console.log(hash);
