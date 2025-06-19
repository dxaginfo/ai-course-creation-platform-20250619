export interface User {
  id: string;
  name: string;
  email: string;
  role: 'educator' | 'student' | 'admin';
  organization?: string;
  avatar?: string;
  bio?: string;
  createdAt?: string;
  updatedAt?: string;
}
