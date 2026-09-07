import mongoose from 'mongoose';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  profile: {
    age: Number,
    fitnessLevel: String,
    goal: String,
  },
}, { timestamps: true });

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: String,
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  totalPoints: { type: Number, default: 0 },
});

const activitySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  distanceKm: Number,
  points: { type: Number, required: true },
  completedAt: { type: Date, required: true },
});

const leaderboardSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  teamId: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
  points: { type: Number, required: true },
  rank: { type: Number, required: true },
  period: { type: String, required: true },
});

const workoutSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, required: true },
  difficulty: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  description: { type: String, required: true },
  recommendedFor: [String],
});

const User = mongoose.models.User || mongoose.model('User', userSchema);
const Team = mongoose.models.Team || mongoose.model('Team', teamSchema);
const Activity = mongoose.models.Activity || mongoose.model('Activity', activitySchema);
const Leaderboard = mongoose.models.Leaderboard || mongoose.model('Leaderboard', leaderboardSchema);
const Workout = mongoose.models.Workout || mongoose.model('Workout', workoutSchema);

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.insertMany([
      { username: 'maya.chen', email: 'maya.chen@mergington.edu', firstName: 'Maya', lastName: 'Chen', profile: { age: 16, fitnessLevel: 'intermediate', goal: 'Build endurance' } },
      { username: 'jordan.rivera', email: 'jordan.rivera@mergington.edu', firstName: 'Jordan', lastName: 'Rivera', profile: { age: 17, fitnessLevel: 'advanced', goal: 'Improve speed' } },
      { username: 'sam.patel', email: 'sam.patel@mergington.edu', firstName: 'Sam', lastName: 'Patel', profile: { age: 15, fitnessLevel: 'beginner', goal: 'Get active consistently' } },
      { username: 'riley.thompson', email: 'riley.thompson@mergington.edu', firstName: 'Riley', lastName: 'Thompson', profile: { age: 16, fitnessLevel: 'intermediate', goal: 'Build strength' } },
    ]);

    const teams = await Team.insertMany([
      { name: 'Summit Striders', description: 'Steady progress, strong finish.', members: [users[0]._id, users[1]._id] },
      { name: 'Trailblazers', description: 'Every workout moves us forward.', members: [users[2]._id, users[3]._id] },
    ]);

    const activities = await Activity.insertMany([
      { userId: users[0]._id, type: 'running', durationMinutes: 32, distanceKm: 5.1, points: 51, completedAt: new Date('2026-09-01T16:30:00Z') },
      { userId: users[1]._id, type: 'cycling', durationMinutes: 45, distanceKm: 12.4, points: 62, completedAt: new Date('2026-09-02T17:00:00Z') },
      { userId: users[2]._id, type: 'walking', durationMinutes: 28, distanceKm: 2.3, points: 23, completedAt: new Date('2026-09-03T15:45:00Z') },
      { userId: users[3]._id, type: 'strength training', durationMinutes: 40, points: 48, completedAt: new Date('2026-09-04T16:15:00Z') },
    ]);

    await Leaderboard.insertMany([
      { userId: users[1]._id, teamId: teams[0]._id, points: 186, rank: 1, period: 'September 2026' },
      { userId: users[0]._id, teamId: teams[0]._id, points: 164, rank: 2, period: 'September 2026' },
      { userId: users[3]._id, teamId: teams[1]._id, points: 142, rank: 3, period: 'September 2026' },
      { userId: users[2]._id, teamId: teams[1]._id, points: 119, rank: 4, period: 'September 2026' },
    ]);

    await Workout.insertMany([
      { title: 'First 5K Builder', type: 'running', difficulty: 'beginner', durationMinutes: 30, description: 'Alternate easy running and walking to build toward five kilometers.', recommendedFor: ['beginner', 'Build endurance'] },
      { title: 'Full-Body Foundation', type: 'strength', difficulty: 'intermediate', durationMinutes: 35, description: 'A balanced bodyweight circuit for steady strength gains.', recommendedFor: ['intermediate', 'Build strength'] },
      { title: 'Speed Ladder', type: 'running', difficulty: 'advanced', durationMinutes: 25, description: 'Short intervals that sharpen pace and recovery.', recommendedFor: ['advanced', 'Improve speed'] },
    ]);

    console.log(`Seeded ${users.length} users, ${teams.length} teams, ${activities.length} activities, 4 leaderboard entries, and 3 workouts`);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
