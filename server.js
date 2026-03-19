const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const users = [
  { email: "admin@clickstoredeals.com", password: "123456", plan: "admin" },
  { email: "user@clickstoredeals.com", password: "123456", plan: "pro" }
];

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.find(
    u => u.email === email && u.password === password
  );

  if (!user) {
    return res.status(401).json({ error: "Credenciais inválidas" });
  }

  res.json({
    success: true,
    user: {
      email: user.email,
      plan: user.plan
    }
  });
});

app.get("/", (req, res) => {
  res.send("NEON BOT API ONLINE 🚀");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server rodando na porta", PORT);
});
