import { Router } from 'express';
import mongoose from 'mongoose';

const router = Router();

const userSchema = new mongoose.Schema({}, { strict: false });
const teamSchema = new mongoose.Schema({}, { strict: false });
const activitySchema = new mongoose.Schema({}, { strict: false });
const leaderboardSchema = new mongoose.Schema({}, { strict: false });
const workoutSchema = new mongoose.Schema({}, { strict: false });

const User = mongoose.models.User || mongoose.model('User', userSchema);
const Team = mongoose.models.Team || mongoose.model('Team', teamSchema);
const Activity = mongoose.models.Activity || mongoose.model('Activity', activitySchema);
const Leaderboard = mongoose.models.Leaderboard || mongoose.model('Leaderboard', leaderboardSchema);
const Workout = mongoose.models.Workout || mongoose.model('Workout', workoutSchema);

router.get('/users/', async (_request, response) => {
  response.json(await User.find().sort({ lastName: 1, firstName: 1 }).lean());
});

router.get('/teams/', async (_request, response) => {
  response.json(await Team.find().sort({ name: 1 }).lean());
});

router.get('/activities/', async (_request, response) => {
  response.json(await Activity.find().sort({ completedAt: -1 }).lean());
});

router.get('/leaderboard/', async (_request, response) => {
  response.json(await Leaderboard.find().sort({ rank: 1 }).lean());
});

router.get('/workouts/', async (_request, response) => {
  response.json(await Workout.find().sort({ title: 1 }).lean());
});

export default router;