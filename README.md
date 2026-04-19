# Todo App — Tambo Starter Template

This is the starter template for the [Making Your React App Agentic with Tambo](#) tutorial. It is a fully working to-do app, deliberately structured to make the Tambo integration you will do in the tutorial clean and additive — no restructuring required mid-tutorial.

## What's in the box

A to-do app where users can:

- Add tasks with a title, priority level, and optional due date
- Group tasks by priority (high, medium, low)
- Mark tasks as complete, edit them, or delete them
- See overdue tasks flagged automatically

## Stack

- React 18
- TypeScript
- Vite
- CSS (no framework)

## Project structure

```
src/
├── App.tsx                  # Thin wrapper — renders TaskBoard
├── index.css
├── types/
│   └── task.ts              # Task and TaskInput types
└── components/
    ├── TaskBoard.tsx        # Owns all task state and logic
    ├── TaskCard.tsx         # Individual task row
    ├── TaskGroup.tsx        # Priority group container
    └── TaskModal.tsx        # Add / edit task form
```

## Getting started

```bash
npm install
npm run dev
```

## Using this template

This repo is the starting point for the [Making Your React App Agentic with Tambo](#) tutorial. Follow the tutorial to add a natural language interface that lets users manage tasks through conversation.

By the end of the tutorial your app will support things like:

- _"Add a high priority task called Fix the login bug due Friday"_
- _"Mark the carwash as complete"_
- _"How productive was I this week?"_

You will need a Tambo API key to complete the tutorial. Get one at [tambo.co](https://tambo.co).

## Types

```ts
export type Task = {
  id: string;
  title: string;
  dueDate?: string;
  priority: "high" | "medium" | "low";
  completed: boolean;
};

export type TaskInput = {
  title: string;
  dueDate?: string;
  priority: "high" | "medium" | "low";
};
```

## Notes

- All task state lives in `TaskBoard.tsx`, not `App.tsx`. This is intentional — it means `App.tsx` is already a thin wrapper ready to receive `TamboProvider` without any restructuring.
- `index.css` includes styles for `ProductivityCard` (the generative component built in the tutorial). The class names are inert until the component is created.
- Task IDs are strings (`String(Date.now())`). This matches the string ID format Tambo generates and avoids type mismatch bugs.
