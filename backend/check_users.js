require('dotenv').config();
const mongoose = require('mongoose');

async function check() {
  await mongoose.connect(process.env.MONGODB_URI);
  const db = mongoose.connection.db;
  const users = await db.collection('users').find({}).toArray();
  console.log("Users in DB:");
  users.forEach(u => console.log(`- ${u.email} (Role: ${u.role}, isAdmin: ${u.isAdmin}, isAgent: ${u.isAgent})`));
  process.exit(0);
}
check().catch(console.error);
