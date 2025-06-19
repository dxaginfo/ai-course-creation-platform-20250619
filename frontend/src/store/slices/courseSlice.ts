import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Course, CourseOutline, CourseModule } from '../../types/Course';
import courseService from '../../services/courseService';

interface CourseState {
  courses: Course[];
  currentCourse: Course | null;
  currentOutline: CourseOutline | null;
  loading: boolean;
  error: string | null;
}

const initialState: CourseState = {
  courses: [],
  currentCourse: null,
  currentOutline: null,
  loading: false,
  error: null,
};

export const fetchCourses = createAsyncThunk(
  'course/fetchCourses',
  async (_, { rejectWithValue }) => {
    try {
      const response = await courseService.getCourses();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch courses');
    }
  }
);

export const fetchCourseById = createAsyncThunk(
  'course/fetchCourseById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await courseService.getCourseById(id);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch course');
    }
  }
);

export const createCourse = createAsyncThunk(
  'course/createCourse',
  async (courseData: Partial<Course>, { rejectWithValue }) => {
    try {
      const response = await courseService.createCourse(courseData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create course');
    }
  }
);

export const updateCourse = createAsyncThunk(
  'course/updateCourse',
  async ({ id, courseData }: { id: string; courseData: Partial<Course> }, { rejectWithValue }) => {
    try {
      const response = await courseService.updateCourse(id, courseData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update course');
    }
  }
);

export const deleteCourse = createAsyncThunk(
  'course/deleteCourse',
  async (id: string, { rejectWithValue }) => {
    try {
      await courseService.deleteCourse(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete course');
    }
  }
);

export const generateCourseOutline = createAsyncThunk(
  'course/generateCourseOutline',
  async (parameters: { topic: string; level: string; duration: string }, { rejectWithValue }) => {
    try {
      const response = await courseService.generateOutline(parameters);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to generate course outline');
    }
  }
);

const courseSlice = createSlice({
  name: 'course',
  initialState,
  reducers: {
    setCurrentCourse: (state, action: PayloadAction<Course>) => {
      state.currentCourse = action.payload;
    },
    clearCurrentCourse: (state) => {
      state.currentCourse = null;
    },
    setCurrentOutline: (state, action: PayloadAction<CourseOutline>) => {
      state.currentOutline = action.payload;
    },
    updateModuleInOutline: (state, action: PayloadAction<{ moduleIndex: number; module: CourseModule }>) => {
      if (state.currentOutline) {
        state.currentOutline.modules[action.payload.moduleIndex] = action.payload.module;
      }
    },
    addModuleToOutline: (state, action: PayloadAction<CourseModule>) => {
      if (state.currentOutline) {
        state.currentOutline.modules.push(action.payload);
      }
    },
    removeModuleFromOutline: (state, action: PayloadAction<number>) => {
      if (state.currentOutline) {
        state.currentOutline.modules.splice(action.payload, 1);
      }
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch courses cases
      .addCase(fetchCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourses.fulfilled, (state, action: PayloadAction<Course[]>) => {
        state.loading = false;
        state.courses = action.payload;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch course by id cases
      .addCase(fetchCourseById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourseById.fulfilled, (state, action: PayloadAction<Course>) => {
        state.loading = false;
        state.currentCourse = action.payload;
      })
      .addCase(fetchCourseById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Create course cases
      .addCase(createCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCourse.fulfilled, (state, action: PayloadAction<Course>) => {
        state.loading = false;
        state.courses.push(action.payload);
        state.currentCourse = action.payload;
      })
      .addCase(createCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update course cases
      .addCase(updateCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCourse.fulfilled, (state, action: PayloadAction<Course>) => {
        state.loading = false;
        const index = state.courses.findIndex(course => course.id === action.payload.id);
        if (index !== -1) {
          state.courses[index] = action.payload;
        }
        state.currentCourse = action.payload;
      })
      .addCase(updateCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Delete course cases
      .addCase(deleteCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCourse.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.courses = state.courses.filter(course => course.id !== action.payload);
        if (state.currentCourse && state.currentCourse.id === action.payload) {
          state.currentCourse = null;
        }
      })
      .addCase(deleteCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Generate course outline cases
      .addCase(generateCourseOutline.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(generateCourseOutline.fulfilled, (state, action: PayloadAction<CourseOutline>) => {
        state.loading = false;
        state.currentOutline = action.payload;
      })
      .addCase(generateCourseOutline.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { 
  setCurrentCourse, 
  clearCurrentCourse, 
  setCurrentOutline,
  updateModuleInOutline,
  addModuleToOutline,
  removeModuleFromOutline,
  clearError 
} = courseSlice.actions;

export default courseSlice.reducer;
