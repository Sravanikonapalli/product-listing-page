const express = require("express");
const path = require("path");
const sqlite3 = require("sqlite3");
const { open } = require("sqlite");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const dbPath = path.join(__dirname, "database.db");
let db = null;

const SECRET_KEY = "2d161b31e1184126215e4738bcaeb5252098af4872f3cc0c59d427106bd3c405";

const initializeDbAndServer = async () => {
  try {
    db = await open({ filename: dbPath, driver: sqlite3.Database });
    await db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        mobile TEXT NOT NULL,
        password TEXT NOT NULL
      );
    `);

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server Running at http://localhost:${PORT}/`);
    });
  } catch (e) {
    console.log(`DATABASE ERROR: ${e.message}`);
    process.exit(1);
  }
};

initializeDbAndServer();

// Registration Endpoint
app.post("/users", async (request, response) => {
  const { name, email, mobile, password } = request.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const userCheckQuery = `SELECT * FROM users WHERE email = ?`;
  const dbUser = await db.get(userCheckQuery, [email]);

  if (!dbUser) {
    const createUserQuery = `
      INSERT INTO users (name, email, mobile, password)
      VALUES (?, ?, ?, ?)`;
    const dbResponse = await db.run(createUserQuery, [name, email, mobile, hashedPassword]);
    const newUserId = dbResponse.lastID;
    response.send({ message: "User registered successfully", userId: newUserId });
  } else {
    response.status(400).json({ error: "User already exists" });
  }
});


// Login Endpoint
app.post("/login", async (request, response) => {
  const { email, password } = request.body;
  const userQuery = `SELECT * FROM users WHERE email = ?`;
  const dbUser = await db.get(userQuery, [email]);

  if (!dbUser) {
    response.status(400).send("Invalid User");
  } else {
    const isPasswordMatched = await bcrypt.compare(password, dbUser.password);
    if (isPasswordMatched) {
      const token = jwt.sign({ userId: dbUser.id }, SECRET_KEY);
      response.send({ message: "Login Success!", token });
    } else {
      response.status(400).send("Invalid Password");
    }
  }
});
