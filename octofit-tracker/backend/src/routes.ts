import { Router } from 'express';

const router = Router();

router.get('/users/', (_request, response) => {
  response.json([]);
});

router.get('/teams/', (_request, response) => {
  response.json([]);
});

router.get('/activities/', (_request, response) => {
  response.json([]);
});

router.get('/leaderboard/', (_request, response) => {
  response.json([]);
});

router.get('/workouts/', (_request, response) => {
  response.json([]);
});

export default router;