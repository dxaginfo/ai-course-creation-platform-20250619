export interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  estimatedDuration: string;
  outline: CourseOutline;
  thumbnail?: string;
  createdBy: string;
  status: 'draft' | 'published' | 'archived';
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CourseOutline {
  title: string;
  description: string;
  learningObjectives: string[];
  targetAudience?: string;
  prerequisites?: string[];
  modules: CourseModule[];
}

export interface CourseModule {
  title: string;
  description: string;
  duration: string;
  order: number;
  lessons: CourseLesson[];
  assessments?: CourseAssessment[];
}

export interface CourseLesson {
  title: string;
  content: string;
  type: 'video' | 'text' | 'interactive';
  duration: string;
  order: number;
  resources?: CourseLessonResource[];
}

export interface CourseLessonResource {
  title: string;
  type: 'link' | 'pdf' | 'image' | 'video';
  url: string;
  description?: string;
}

export interface CourseAssessment {
  title: string;
  description: string;
  type: 'quiz' | 'assignment' | 'project';
  duration: string;
  passingScore?: number;
  questions?: CourseAssessmentQuestion[];
}

export interface CourseAssessmentQuestion {
  question: string;
  type: 'multiple-choice' | 'true-false' | 'short-answer' | 'essay';
  options?: string[];
  correctAnswer?: string | string[];
  points: number;
}
