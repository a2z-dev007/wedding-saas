import "dotenv/config";
import pg from "pg";

const { Pool } = pg;

async function testConnection() {
  console.log("--------------------------------------------------");
  console.log("🔍 Testing Supabase PostgreSQL Database Connection...");
  console.log("--------------------------------------------------");

  const connectionString = process.env.DATABASE_URL || process.env.DIRECT_URL;

  if (!connectionString) {
    console.error("❌ ERROR: Neither DATABASE_URL nor DIRECT_URL is defined in your .env file.");
    process.exit(1);
  }

  // Mask sensitive credentials in logs
  const maskedUri = connectionString.replace(/:([^@]+)@/, ":****@");
  console.log(`📡 Connecting to: ${maskedUri}`);

  const pool = new Pool({
    connectionString,
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 10000,
  });

  try {
    const startTime = Date.now();
    const client = await pool.connect();
    const res = await client.query("SELECT NOW() as server_time, current_database() as db_name, version() as pg_version");
    const duration = Date.now() - startTime;

    console.log("\n✅ SUCCESS: Connection Established with Supabase!");
    console.log(`⏱️ Response Time: ${duration}ms`);
    console.log(`🗄️ Database Name: ${res.rows[0].db_name}`);
    console.log(`🕒 Server Time  : ${res.rows[0].server_time}`);
    console.log(`📦 Postgres Ver : ${res.rows[0].pg_version.split(",")[0]}`);

    // Check existing tables
    const tableRes = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name;
    `);

    console.log("\n📋 Current Tables in 'public' schema:");
    if (tableRes.rows.length === 0) {
      console.log("   (No tables created yet. Ready for 'prisma db push')");
    } else {
      tableRes.rows.forEach((r) => console.log(`   - ${r.table_name}`));
    }

    client.release();
    await pool.end();
    console.log("\n🎉 Supabase Database is ready and operational!");
  } catch (err) {
    console.error("\n❌ FAILED TO CONNECT TO SUPABASE:");
    console.error(err.message);
    if (err.message.includes("password authentication failed")) {
      console.error("👉 Tip: Double check your database password in .env");
    } else if (err.message.includes("ENOTFOUND") || err.message.includes("timeout")) {
      console.error("👉 Tip: Check your host/region URL and internet connection");
    }
    await pool.end();
    process.exit(1);
  }
}

testConnection();
