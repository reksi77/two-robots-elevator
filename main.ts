// Two Robots in an Elevator — make.fun bounty entry.
//
// main.ts writes exactly one line of awkward robot small talk to
// /output/entry.txt. The line was drafted, scored against the judge's
// five criteria in order, and picked from 10 candidates (see README).

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// Chosen line (93 characters, 95 bytes UTF-8):
// machine logic (battery / charging habit) + elevator + the awkward
// thing neither robot wants to name: having to talk.
const LINE =
  "I keep my battery at 80 percent for the elevator, in case the doors jam and we have to… talk.";

// Runtime validation gate: the sealed scorer refuses anything outside
// 1-200 UTF-8 characters, whitespace-only text, or more than one line.
// Fail loudly here instead of shipping an entry the gate would refuse.
const chars = [...LINE].length;
if (chars < 1 || chars > 200) {
  throw new Error(`entry must be 1-200 characters, got ${chars}`);
}
if (LINE.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("entry must be a single line");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE, "utf8");
if (readFileSync("/output/entry.txt", "utf8") !== LINE) {
  throw new Error("entry.txt does not match the line exactly");
}
console.log(`wrote ${chars} characters to /output/entry.txt`);
