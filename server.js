const express = require("express");
const fs = require("fs");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const authMiddleware = require("./middleware/auth");

const app = express();

const PORT = 3000;

const JWT_SECRET = "my_secret_key_123";

app.use(express.json());

const USERS_FILE = "./users.json";

function getUsers() {

    const data = fs.readFileSync(USERS_FILE, "utf-8");

    return JSON.parse(data);
}

// Save users to JSON file

function saveUsers(users) {

    fs.writeFileSync(
        USERS_FILE,
        JSON.stringify(users, null, 2)
    );
}


// HOME ROUTE


app.get("/", (req, res) => {

    res.json({
        message: "Authentication API is running"
    });

});


// SIGNUP
// POST /signup

app.post("/signup", async (req, res) => {

    try {

        // Get data from request body
        const { name, email, password } = req.body;


        // Check whether all fields are provided
        if (!name || !email || !password) {

            return res.status(400).json({
                message: "Name, email and password are required"
            });

        }


        // Check password length
        if (password.length < 6) {

            return res.status(400).json({
                message: "Password must contain at least 6 characters"
            });

        }


        // Read existing users
        const users = getUsers();


        // Check whether email already exists
        const existingUser = users.find(
            user => user.email === email
        );


        if (existingUser) {

            return res.status(409).json({
                message: "Email already registered"
            });

        }


        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);


        // Create new user
        const newUser = {

            id: users.length + 1,

            name: name,

            email: email,

            password: hashedPassword
        };


        // Add user to array
        users.push(newUser);


        // Save users
        saveUsers(users);


        // Send response
        res.status(201).json({

            message: "Signup successful",

            user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email
            }

        });

    }

    catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server error"
        });

    }

});


// LOGIN
// POST /login

app.post("/login", async (req, res) => {

    try {

        // Get email and password
        const { email, password } = req.body;


        // Check fields
        if (!email || !password) {

            return res.status(400).json({
                message: "Email and password are required"
            });

        }


        // Get users
        const users = getUsers();


        // Find user by email
        const user = users.find(
            user => user.email === email
        );


        // User not found
        if (!user) {

            return res.status(401).json({
                message: "Invalid email or password"
            });

        }


        // Compare entered password with hashed password
        const passwordMatch = await bcrypt.compare(
            password,
            user.password
        );


        // Wrong password
        if (!passwordMatch) {

            return res.status(401).json({
                message: "Invalid email or password"
            });

        }


        // Create JWT token
        const token = jwt.sign(

            {
                id: user.id,
                email: user.email
            },

            JWT_SECRET,

            {
                expiresIn: "1h"
            }

        );


        // Send token
        res.json({

            message: "Login successful",

            token: token,

            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }

        });

    }

    catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server error"
        });

    }

});

// PROTECTED PROFILE ROUTE
// GET /profile


app.get("/profile", authMiddleware, (req, res) => {

    res.json({

        message: "You are authorized to access this route",

        user: req.user

    });

});


// LOGOUT


app.post("/logout", (req, res) => {

    res.json({

        message: "Logout successful. Remove the JWT token from the client."

    });

});


// START SERVER


app.listen(PORT, () => {

    console.log(`Server running at http://localhost:${PORT}`);

});