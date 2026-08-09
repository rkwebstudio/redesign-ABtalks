/**
 * Mock data — stands in for a real backend/database.
 * Three named student states let judges see how the UI handles
 * the edge cases called out in the brief without needing real accounts.
 */

const MOCK_STUDENTS = {
  // Edge case: Day 1, nothing built yet
  new: {
    id: "new",
    name: "Aarav Mehta",
    initials: "AM",
    hasAvatar: false,
    track: "Software Engineering",
    joinedToday: true,
    currentStreak: 0,
    longestStreak: 0,
    dayIndex: 1,
    totalDays: 60,
    shieldsAvailable: 1,
    shieldsUsed: 0,
    lastStatus: "none", // none | done | missed
    completedDays: [],
    missedDays: [],
    shieldDays: [],
    achievements: [
      { id: "first-commit", label: "First Commit", desc: "Submit your Day 1 proof of work", unlocked: false },
      { id: "week-one", label: "7-Day Streak", desc: "Complete your first full week", unlocked: false },
      { id: "public-voice", label: "Public Voice", desc: "Post 5 LinkedIn updates", unlocked: false },
      { id: "halfway", label: "Halfway There", desc: "Reach Day 30", unlocked: false }
    ]
  },

  // Healthy mid-challenge streak
  active: {
    id: "active",
    name: "Priya Nair",
    initials: "PN",
    hasAvatar: true,
    track: "AI",
    joinedToday: false,
    currentStreak: 11,
    longestStreak: 11,
    dayIndex: 12,
    totalDays: 60,
    shieldsAvailable: 1,
    shieldsUsed: 0,
    lastStatus: "done",
    completedDays: [1,2,3,4,5,6,7,8,9,10,11],
    missedDays: [],
    shieldDays: [],
    achievements: [
      { id: "first-commit", label: "First Commit", desc: "Submit your Day 1 proof of work", unlocked: true },
      { id: "week-one", label: "7-Day Streak", desc: "Complete your first full week", unlocked: true },
      { id: "public-voice", label: "Public Voice", desc: "Post 5 LinkedIn updates", unlocked: true },
      { id: "halfway", label: "Halfway There", desc: "Reach Day 30", unlocked: false }
    ]
  },

  // Edge case: missed yesterday, Streak Shield auto-applied
  missed: {
    id: "missed",
    name: "Rohan Iyer",
    initials: "RI",
    hasAvatar: true,
    track: "Data Science",
    joinedToday: false,
    currentStreak: 9,
    longestStreak: 9,
    dayIndex: 12,
    totalDays: 60,
    shieldsAvailable: 0,
    shieldsUsed: 1,
    lastStatus: "shielded",
    completedDays: [1,2,3,4,5,6,7,8,9],
    missedDays: [10],
    shieldDays: [10],
    achievements: [
      { id: "first-commit", label: "First Commit", desc: "Submit your Day 1 proof of work", unlocked: true },
      { id: "week-one", label: "7-Day Streak", desc: "Complete your first full week", unlocked: true },
      { id: "public-voice", label: "Public Voice", desc: "Post 5 LinkedIn updates", unlocked: false },
      { id: "halfway", label: "Halfway There", desc: "Reach Day 30", unlocked: false }
    ]
  }
};

// Per-track task for Day 12 — mocked "task bank"
const DAY_TASKS = {
  "Software Engineering": {
    title: "Build a rate limiter",
    focus: "Backend systems",
    summary: "Implement a token-bucket rate limiter and wrap it around one API route in your project.",
    requirements: [
      "Implement a token-bucket or sliding-window algorithm from scratch — no libraries",
      "Apply it to at least one real endpoint in your existing project",
      "Write a short README section explaining your design choice",
      "Push the commit to your public GitHub repo"
    ],
    estMinutes: 90
  },
  "AI": {
    title: "Ship a retrieval-augmented Q&A script",
    focus: "AI / RAG",
    summary: "Chunk a small document set, embed it, and answer a question by retrieving the right chunk before generating a response.",
    requirements: [
      "Chunk and embed at least one real document (PDF, notes, or docs)",
      "Retrieve the top matching chunk for a sample question",
      "Generate an answer that cites the retrieved chunk",
      "Push the commit to your public GitHub repo"
    ],
    estMinutes: 90
  },
  "Data Science": {
    title: "Clean and profile a messy dataset",
    focus: "Data wrangling",
    summary: "Take a real, imperfect CSV and turn it into an analysis-ready dataset with a written data-quality summary.",
    requirements: [
      "Identify and handle missing values and duplicate rows",
      "Fix at least two inconsistent formatting issues (dates, casing, units)",
      "Write a short profile: row count, key columns, and what you changed",
      "Push the notebook or script to your public GitHub repo"
    ],
    estMinutes: 75
  }
};

function getStudent(key) {
  return MOCK_STUDENTS[key] || MOCK_STUDENTS.active;
}

function getDayTask(track) {
  return DAY_TASKS[track] || DAY_TASKS["Software Engineering"];
}
