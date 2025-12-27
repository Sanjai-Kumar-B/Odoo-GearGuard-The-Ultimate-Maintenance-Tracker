# MongoDB Installation for GearGuard

## Windows Installation

### Option 1: MongoDB Community Server (Recommended for Production)

1. **Download MongoDB**:
   - Visit: https://www.mongodb.com/try/download/community
   - Select version: 7.0 or latest
   - Platform: Windows x64
   - Package: MSI

2. **Install MongoDB**:
   - Run the downloaded `.msi` file
   - Choose "Complete" installation
   - Select "Install MongoDB as a Service" (recommended)
   - Keep default settings

3. **Verify Installation**:

   ```bash
   mongod --version
   ```

4. **Start MongoDB** (if not running as service):
   ```bash
   net start MongoDB
   ```

### Option 2: MongoDB Atlas (Cloud - Free Tier Available)

1. **Create Account**:
   - Visit: https://www.mongodb.com/cloud/atlas
   - Sign up for free

2. **Create Cluster**:
   - Choose FREE tier (M0)
   - Select region closest to you
   - Create cluster (takes 3-5 minutes)

3. **Setup Access**:
   - Database Access: Create user (save username/password)
   - Network Access: Add IP `0.0.0.0/0` (allows all - for development)

4. **Get Connection String**:
   - Click "Connect" → "Connect your application"
   - Copy connection string
   - Replace in `.env`:
     ```
     MONGODB_URI=mongodb+srv://<username>:<password>@cluster.xxxxx.mongodb.net/gearguard?retryWrites=true&w=majority
     ```

## Start GearGuard with MongoDB

1. **Navigate to backend folder**:

   ```bash
   cd backend
   ```

2. **Seed the database** (first time only):

   ```bash
   npm run seed
   ```

   You should see:

   ```
   📦 Connected to MongoDB
   🧹 Cleared existing data
   ✅ Created teams
   ✅ Created equipment
   ✅ Created requests
   ✅ Updated team counts

   ✨ Database seeded successfully!
   ```

3. **Start the server**:

   ```bash
   npm run dev
   ```

4. **Verify connection**:
   - Open browser: http://localhost:5000/health
   - Should show: `"database": "MongoDB"`

## Troubleshooting

### MongoDB not found

If you get "mongod: command not found":

- Add MongoDB to PATH: `C:\Program Files\MongoDB\Server\7.0\bin`
- Restart terminal

### Connection refused

- Check if MongoDB service is running: `net start | findstr Mongo`
- Start service: `net start MongoDB`

### Data not persisting

- Check `.env` file has correct MONGODB_URI
- Restart backend server after changing `.env`

## Next Steps

After MongoDB is running:

1. Seed database: `npm run seed`
2. Start backend: `npm run dev` (in backend folder)
3. Start frontend: `npm run dev` (in frontend folder)
4. Open http://localhost:5173

All data will now persist across server restarts! 🎉
