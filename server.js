const express = require("express")
const cors = require("cors")
const jwt = require("jsonwebtoken")

const app = express()

app.use(cors())
app.use(express.json())

const SECRET = "NEON_BOT_SUPER_SECRET_2025"

// 🔥 ROTA OBRIGATÓRIA
app.get("/", (req, res) => {
  res.status(200).send("API ONLINE 🚀")
})

// LOGIN
app.post("/login", (req, res) => {

  const { email, password } = req.body

  const users = [
    { email: "admin@clickstoredeals.com", password: "Neon@2025!", role: "admin" }
  ]

  const user = users.find(u => u.email === email && u.password === password)

  if(!user){
    return res.status(401).json({ success: false })
  }

  const token = jwt.sign(
    { email: user.email, role: user.role },
    SECRET,
    { expiresIn: "2h" }
  )

  res.json({ success: true, token })
})

// 🔥 PORTA CERTA
const PORT = process.env.PORT || 3000

app.listen(PORT, "0.0.0.0", () => {
  console.log("Servidor rodando na porta", PORT)
})
