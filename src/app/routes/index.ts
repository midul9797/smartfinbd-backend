import express from 'express'; // Import express for routing
import { FinancialProfileRoutes } from './financial.profile.route'; // Import routes for notification
import { AuthRoute } from './auth.route';
import { UserRoute } from './user.route';
import { PreferencesRoutes } from './preferences.route';
import { InvestmentRoutes } from './investment.route';
import { RiskAssessmentRoutes } from './risk.assessment.route';
import { ChatRoute } from './chat.route';

const router = express.Router(); // Create a new express router

// Define an array of routes with their paths and corresponding routes
const moduleRoutes = [
  {
    path: '/financial-profile', // Path for the notification route
    route: FinancialProfileRoutes, // The route for handling notifications
  },
  {
    path: '/preferences', // Path for the notification route
    route: PreferencesRoutes, // The route for handling notifications
  },
  {
    path: '/auth',
    route: AuthRoute,
  },
  {
    path: '/user',
    route: UserRoute,
  },
  {
    path: '/investment',
    route: InvestmentRoutes,
  },
  {
    path: '/chat',
    route: ChatRoute,
  },
  {
    path: '/risk-assessment',
    route: RiskAssessmentRoutes,
  },
];
// Iterate over the defined routes and use them with their paths
moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router; // Export the router for use in the application
