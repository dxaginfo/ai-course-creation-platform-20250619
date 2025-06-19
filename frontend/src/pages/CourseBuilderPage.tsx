import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { generateCourseOutline, createCourse } from '../store/slices/courseSlice';
import { showNotification } from '../store/slices/uiSlice';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Card,
  CardContent,
  CardActions,
  CircularProgress,
  Divider,
  List,
  ListItem,
  ListItemText,
  Chip,
} from '@mui/material';

const steps = ['Course Information', 'Generate Outline', 'Review & Save'];

const CourseBuilderPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { currentOutline, loading, error } = useSelector((state: RootState) => state.course);
  
  const [activeStep, setActiveStep] = useState(0);
  const [courseInfo, setCourseInfo] = useState({
    title: '',
    description: '',
    category: '',
    level: 'beginner',
    estimatedDuration: '',
    topic: '',
  });

  const handleNext = () => {
    if (activeStep === 0) {
      // Validate course info
      if (!courseInfo.title || !courseInfo.description || !courseInfo.category || !courseInfo.topic) {
        dispatch(showNotification({
          message: 'Please fill all required fields',
          type: 'error',
        }));
        return;
      }
    }

    if (activeStep === 1 && !currentOutline) {
      // Generate outline before proceeding
      handleGenerateOutline();
      return;
    }

    if (activeStep === 2) {
      // Save course
      handleSaveCourse();
      return;
    }

    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    setCourseInfo({
      ...courseInfo,
      [name as string]: value,
    });
  };

  const handleGenerateOutline = async () => {
    await dispatch(generateCourseOutline({
      topic: courseInfo.topic,
      level: courseInfo.level,
      duration: courseInfo.estimatedDuration,
    }));
    if (!error) {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleSaveCourse = async () => {
    if (!currentOutline) return;

    const newCourse = {
      title: courseInfo.title,
      description: courseInfo.description,
      category: courseInfo.category,
      level: courseInfo.level as 'beginner' | 'intermediate' | 'advanced',
      estimatedDuration: courseInfo.estimatedDuration,
      status: 'draft' as const,
      outline: currentOutline,
      tags: [courseInfo.category, courseInfo.level],
    };

    const resultAction = await dispatch(createCourse(newCourse));
    if (createCourse.fulfilled.match(resultAction)) {
      dispatch(showNotification({
        message: 'Course created successfully!',
        type: 'success',
      }));
      navigate(`/courses/${resultAction.payload.id}`);
    }
  };

  // Render different steps
  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Course Title"
                name="title"
                value={courseInfo.title}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Course Description"
                name="description"
                value={courseInfo.description}
                onChange={handleInputChange}
                multiline
                rows={4}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Main Topic"
                name="topic"
                value={courseInfo.topic}
                onChange={handleInputChange}
                helperText="The primary subject of your course (e.g., 'Python Programming', 'Digital Marketing')"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Category"
                name="category"
                value={courseInfo.category}
                onChange={handleInputChange}
                helperText="Course category (e.g., 'Programming', 'Business', 'Design')"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Level</InputLabel>
                <Select
                  name="level"
                  value={courseInfo.level}
                  label="Level"
                  onChange={handleInputChange}
                >
                  <MenuItem value="beginner">Beginner</MenuItem>
                  <MenuItem value="intermediate">Intermediate</MenuItem>
                  <MenuItem value="advanced">Advanced</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Estimated Duration"
                name="estimatedDuration"
                value={courseInfo.estimatedDuration}
                onChange={handleInputChange}
                helperText="e.g., '4 weeks', '10 hours'"
              />
            </Grid>
          </Grid>
        );
      case 1:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Generate Course Outline
            </Typography>
            <Typography variant="body1" paragraph>
              Our AI will create a comprehensive course outline based on your topic. You can review and edit the outline in the next step.
            </Typography>
            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography variant="subtitle1" gutterBottom>
                Topic: {courseInfo.topic}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                Level: {courseInfo.level.charAt(0).toUpperCase() + courseInfo.level.slice(1)}
              </Typography>
              {courseInfo.estimatedDuration && (
                <Typography variant="subtitle1" gutterBottom>
                  Duration: {courseInfo.estimatedDuration}
                </Typography>
              )}
            </Paper>
            <Button
              variant="contained"
              color="primary"
              onClick={handleGenerateOutline}
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} /> : null}
            >
              {loading ? 'Generating...' : 'Generate Outline'}
            </Button>
            {currentOutline && (
              <Alert severity="success" sx={{ mt: 2 }}>
                Outline generated successfully! Click "Next" to review.
              </Alert>
            )}
          </Box>
        );
      case 2:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Review Course Structure
            </Typography>
            
            {currentOutline ? (
              <>
                <Paper sx={{ p: 3, mb: 3 }}>
                  <Typography variant="h5">{currentOutline.title}</Typography>
                  <Typography variant="body1" paragraph>{currentOutline.description}</Typography>
                  
                  <Typography variant="subtitle1" gutterBottom>Learning Objectives:</Typography>
                  <List dense>
                    {currentOutline.learningObjectives.map((objective, index) => (
                      <ListItem key={index}>
                        <ListItemText primary={objective} />
                      </ListItem>
                    ))}
                  </List>
                  
                  <Divider sx={{ my: 2 }} />
                  
                  <Typography variant="subtitle1" gutterBottom>Course Modules:</Typography>
                  <Grid container spacing={2}>
                    {currentOutline.modules.map((module, index) => (
                      <Grid item xs={12} key={index}>
                        <Card variant="outlined">
                          <CardContent>
                            <Typography variant="h6">{module.title}</Typography>
                            <Typography variant="body2" color="textSecondary">
                              Duration: {module.duration}
                            </Typography>
                            <Typography variant="body2" paragraph sx={{ mt: 1 }}>
                              {module.description}
                            </Typography>
                            
                            <Typography variant="subtitle2" gutterBottom>Lessons:</Typography>
                            <List dense sx={{ pl: 2 }}>
                              {module.lessons.map((lesson, lessonIndex) => (
                                <ListItem key={lessonIndex}>
                                  <ListItemText 
                                    primary={lesson.title} 
                                    secondary={`${lesson.duration} - ${lesson.type}`} 
                                  />
                                </ListItem>
                              ))}
                            </List>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </Paper>
              </>
            ) : (
              <Typography variant="body1" color="error" sx={{ my: 3 }}>
                No outline generated yet. Please go back and generate an outline.
              </Typography>
            )}
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="md">
      <Paper sx={{ p: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          AI Course Builder
        </Typography>
        <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        
        <Box sx={{ mb: 4 }}>
          {renderStepContent()}
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
          <Button
            color="inherit"
            disabled={activeStep === 0}
            onClick={handleBack}
          >
            Back
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleNext}
            disabled={loading}
          >
            {activeStep === steps.length - 1 ? 'Save Course' : 'Next'}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default CourseBuilderPage;
