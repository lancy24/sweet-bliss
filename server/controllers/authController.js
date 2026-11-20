const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { randomBytes } = require("node:crypto");

const firebaseProject = "blissful-bites-2405";
const firebaseApiKey = process.env.FIREBASE_API_KEY ||
  "AIzaSyDwW6umggFgqmYGfI8MPQp4IS7wJkIsSEQ";

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

const registerUser = async (req, res) => {
  try {
    console.log("REGISTER CALLED");

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    console.log("USER CREATED:", user._id);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id, user.role),
    });
  } catch (error) {
    console.log("REGISTER ERROR:", error.message);
    res.status(500).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    console.log("LOGIN CALLED");

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({ email });

    console.log("USER FOUND:", user ? "yes" : "no");

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const isMatch = await user.matchPassword(password);

    console.log("PASSWORD MATCH:", isMatch);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id, user.role),
    });
  } catch (error) {
    console.log("LOGIN ERROR:", error.message);
    res.status(500).json({
      message: error.message,
    });
  }
};

const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    res.json(user);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const saveCart = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.savedCart = req.body.cart;

    await user.save();

    res.json({
      message: "Cart saved successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const googleAuth = async (req, res) => {
  const { idToken } = req.body || {};
  if (typeof idToken !== "string" || !idToken.trim()) {
    return res.status(400).json({ message: "Firebase ID token required" });
  }

  let profile;
  try {
    const endpoint = new URL("https://identitytoolkit.googleapis.com/v1/accounts:lookup");
    endpoint.searchParams.set("key", firebaseApiKey);
    const verification = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken }),
      signal: AbortSignal.timeout(5000),
    });
    if (verification.status === 400 || verification.status === 401) {
      return res.status(401).json({ message: "Invalid Google sign-in" });
    }
    if (!verification.ok) {
      return res.status(503).json({ message: "Google sign-in temporarily unavailable" });
    }
    const { users } = await verification.json();
    profile = users?.[0];
  } catch {
    return res.status(503).json({ message: "Google sign-in temporarily unavailable" });
  }

  // Firebase has validated the token before we inspect its sign-in claims.
  const claims = jwt.decode(idToken);
  const email = profile?.email?.trim().toLowerCase();
  const googleEmailMatches = profile?.providerUserInfo?.some((provider) =>
    provider.providerId === "google.com" && provider.email?.trim().toLowerCase() === email
  );
  if (!profile?.localId || profile.emailVerified !== true || !email || !googleEmailMatches ||
      claims?.aud !== firebaseProject ||
      claims.iss !== `https://securetoken.google.com/${firebaseProject}` ||
      claims.sub !== profile.localId || claims.firebase?.sign_in_provider !== "google.com") {
    return res.status(401).json({ message: "A verified Google email is required" });
  }

  try {
    let user = await User.findOne({ email });

    if (!user) {
      try {
        user = await User.create({
          name: profile.displayName?.trim() || email,
          email,
          password: randomBytes(32).toString("hex"),
          googleId: profile.localId,
        });
      } catch (error) {
        if (error.code !== 11000) throw error;
        user = await User.findOne({ email });
        if (!user) throw error;
      }
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id, user.role),
    });
  } catch {
    res.status(500).json({ message: "Could not complete Google sign-in" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
  saveCart,
  googleAuth,
};
