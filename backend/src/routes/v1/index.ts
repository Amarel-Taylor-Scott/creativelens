import { Router } from 'express';
import authRouter from './auth';
import imagesRouter from './images';
import categoriesRouter from './categories';
import nichesRouter from './niches';
import submissionsRouter from './submissions';
import apiKeysRouter from './api-keys';
import scoresRouter from './scores';
import profilesRouter from './profiles';
import boardsRouter from './boards';
import remixesRouter from './remixes';
import subscriptionsRouter from './subscriptions';
import analyticsRouter from './analytics';
import teamsRouter from './teams';
import extensionRouter from './extension';
import sharedRouter from './shared';

const router = Router();

// Core routes
router.use('/auth', authRouter);
router.use('/images', imagesRouter);
router.use('/categories', categoriesRouter);
router.use('/niches', nichesRouter);
router.use('/submissions', submissionsRouter);
router.use('/api-keys', apiKeysRouter);

// Scoring & Embeddings
router.use('/scores', scoresRouter);

// Remixes (mounted on images for :id/remixes and :id/remix)
router.use('/', remixesRouter);

// User profiles
router.use('/profiles', profilesRouter);

// Boards
router.use('/boards', boardsRouter);

// Subscriptions & Billing
router.use('/subscription', subscriptionsRouter);

// Analytics
router.use('/analytics', analyticsRouter);

// Teams
router.use('/teams', teamsRouter);

// Browser Extension
router.use('/extension', extensionRouter);

// Shared analysis pages
router.use('/shared', sharedRouter);

// API info
router.get('/', (_req, res) => {
  res.json({
    success: true,
    data: {
      name: 'CreativeLens API',
      version: '1.0.0',
      endpoints: [
        // Auth
        'POST   /api/v1/auth/register',
        'POST   /api/v1/auth/login',
        'GET    /api/v1/auth/me',
        // Images
        'GET    /api/v1/images',
        'GET    /api/v1/images/:id',
        'POST   /api/v1/images/:id/analyze',
        'POST   /api/v1/images',
        'DELETE /api/v1/images/:id',
        // Categories
        'GET    /api/v1/categories',
        'GET    /api/v1/categories/:slug',
        // Niches
        'GET    /api/v1/niches',
        'GET    /api/v1/niches/:slug',
        'POST   /api/v1/niches/:slug/subscribe',
        // Submissions
        'POST   /api/v1/submissions',
        'GET    /api/v1/submissions',
        'GET    /api/v1/submissions/:id',
        // API Keys
        'GET    /api/v1/api-keys',
        'POST   /api/v1/api-keys',
        'DELETE /api/v1/api-keys/:id',
        // Scores
        'GET    /api/v1/images/:id/scores',
        'POST   /api/v1/images/:id/scores',
        'GET    /api/v1/scores/dimensions',
        // Profiles
        'GET    /api/v1/profiles/:username',
        'PUT    /api/v1/profiles',
        'POST   /api/v1/profiles/banner-pins',
        // Boards
        'GET    /api/v1/boards',
        'POST   /api/v1/boards',
        'GET    /api/v1/boards/:id',
        'DELETE /api/v1/boards/:id',
        'POST   /api/v1/boards/:id/items',
        'DELETE /api/v1/boards/:id/items/:imageId',
        // Remixes
        'GET    /api/v1/images/:id/remixes',
        'POST   /api/v1/images/:id/remix',
        // Subscriptions
        'GET    /api/v1/subscription',
        'POST   /api/v1/subscription/checkout',
        'POST   /api/v1/subscription/webhooks/stripe',
        'GET    /api/v1/subscription/billing/history',
        // Analytics
        'POST   /api/v1/analytics/pageview',
        'GET    /api/v1/analytics/summary',
        // Teams
        'POST   /api/v1/teams',
        'GET    /api/v1/teams/:id',
        'POST   /api/v1/teams/:id/invite',
        'DELETE /api/v1/teams/:id/members/:userId',
        // Extension
        'POST   /api/v1/extension/analyze',
        'GET    /api/v1/extension/cache/:imageUrl',
        // Shared
        'POST   /api/v1/shared',
        'GET    /api/v1/shared/:shareId',
      ],
    },
  });
});

export default router;
