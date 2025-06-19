import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { 
  Box, 
  Button, 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia,
  Paper,
  Stack
} from '@mui/material';
import { 
  Create as CreateIcon,
  School as SchoolIcon,
  Assessment as AssessmentIcon,
  Accessibility as AccessibilityIcon,
  Speed as SpeedIcon,
  EmojiObjects as EmojiObjectsIcon
} from '@mui/icons-material';

const HomePage: React.FC = () => {
  return (
    <Box>
      {/* Hero section */}
      <Paper
        sx={{
          position: 'relative',
          backgroundColor: 'primary.main',
          color: 'white',
          mb: 6,
          py: 8,
          borderRadius: 4,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={7}>
              <Typography variant="h2" component="h1" gutterBottom>
                Create Engaging Courses with AI
              </Typography>
              <Typography variant="h5" paragraph>
                Transform your expertise into structured learning experiences with our AI-powered course creation platform.
              </Typography>
              <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  component={RouterLink}
                  to="/register"
                >
                  Get Started
                </Button>
                <Button
                  variant="outlined"
                  color="inherit"
                  size="large"
                  component={RouterLink}
                  to="/courses"
                >
                  Explore Courses
                </Button>
              </Stack>
            </Grid>
            <Grid item xs={12} md={5}>
              <Box
                sx={{
                  width: '100%',
                  height: 300,
                  bgcolor: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: 2,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {/* Placeholder for hero image or animation */}
                <Typography variant="h5">Course Creation Visual</Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Paper>

      {/* Features section */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Typography variant="h3" component="h2" align="center" gutterBottom>
          AI-Powered Course Creation
        </Typography>
        <Typography variant="h6" align="center" color="textSecondary" paragraph sx={{ mb: 6 }}>
          Our platform simplifies the course creation process with powerful AI tools.
        </Typography>
        
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                  <CreateIcon fontSize="large" color="primary" />
                </Box>
                <Typography variant="h5" component="h2" align="center" gutterBottom>
                  Automated Course Structure
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  Generate comprehensive course outlines and module structures based on your topic and learning objectives.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                  <EmojiObjectsIcon fontSize="large" color="primary" />
                </Box>
                <Typography variant="h5" component="h2" align="center" gutterBottom>
                  Content Suggestions
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  Get AI-powered content recommendations for each module, including text, multimedia, and interactive elements.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                  <AssessmentIcon fontSize="large" color="primary" />
                </Box>
                <Typography variant="h5" component="h2" align="center" gutterBottom>
                  Assessment Generation
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  Create quizzes, assignments, and assessments automatically with answer keys and feedback options.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                  <SchoolIcon fontSize="large" color="primary" />
                </Box>
                <Typography variant="h5" component="h2" align="center" gutterBottom>
                  Learning Path Optimization
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  Optimize learning journeys with AI analysis of course flow, pacing, and knowledge scaffolding.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                  <AccessibilityIcon fontSize="large" color="primary" />
                </Box>
                <Typography variant="h5" component="h2" align="center" gutterBottom>
                  Accessibility Features
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  Ensure your course content is accessible to all learners with automatic checks and improvement suggestions.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                  <SpeedIcon fontSize="large" color="primary" />
                </Box>
                <Typography variant="h5" component="h2" align="center" gutterBottom>
                  Rapid Development
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  Create professional courses in a fraction of the time with our AI-powered tools and templates.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* CTA section */}
      <Box sx={{ bgcolor: 'background.paper', py: 8 }}>
        <Container maxWidth="md">
          <Typography variant="h3" component="h2" align="center" gutterBottom>
            Ready to Create Your First Course?
          </Typography>
          <Typography variant="h6" align="center" color="textSecondary" paragraph>
            Join thousands of educators who are using AI to create better learning experiences.
          </Typography>
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
            <Button 
              variant="contained" 
              color="primary" 
              size="large" 
              component={RouterLink} 
              to="/register"
            >
              Get Started Now
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;
