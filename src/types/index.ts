export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  parentId?: string;
}

export interface Child {
  id: string;
  name: string;
  age: number;
  grade: string;
  avatar?: string;
  parentId: string;
  learningGoals: string[];
  restrictions: ParentalControls;
}

export interface ParentalControls {
  screenTime: number;
  allowedCategories: string[];
  blockedContent: string[];
  safeMode: boolean;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: number;
  thumbnail: string;
  instructor: string;
  rating: number;
  enrolled: number;
  price: number;
  isPremium: boolean;
  tags: string[];
}

export interface Task {
  id: string;
  title: string;
  description: string;
  courseId: string;
  userId: string;
  type: 'assignment' | 'quiz' | 'project' | 'reading';
  dueDate: string;
  status: 'pending' | 'in-progress' | 'completed' | 'overdue';
  progress: number;
  aiGenerated?: boolean;
}

export interface Analytics {
  userId: string;
  totalHours: number;
  coursesCompleted: number;
  currentStreak: number;
  weakAreas: string[];
  strongAreas: string[];
  weeklyProgress: Array<{
    day: string;
    hours: number;
  }>;
  subjectProgress: Array<{
    subject: string;
    progress: number;
  }>;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  interval: 'month' | 'year';
  features: string[];
  popular?: boolean;
  limits: {
    children: number;
    courses: number;
    aiTutorHours: number;
  };
}