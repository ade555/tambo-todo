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
