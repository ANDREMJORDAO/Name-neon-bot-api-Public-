const express = require("express")
const cors = require("cors")
const jwt = require("jsonwebtoken")

const app = express()
app.use(cors())
app.use(express.json())

const SECRET = "NEON_BOT_SUPER_SECRET_2025"

// usuário teste
const users = [
  { email: "admin@clickstoredeals.com", password: "Neon@2025!", role: "admin" }
]

// LOGIN
app.post("/login", (req, res) => {

  const { email, password } = req.body

  if(!email || !password){
    return res.status(400).json({ success: false })
  }

  const user = users.find(u => u.email === email && u.password === password)

  if(!user){
    return res.json({ success: false })
  }

  const token = jwt.sign(
    { email: user.email, role: user.role },
    SECRET,
    { expiresIn: "2h" }
  )

  res.json({ success: true, token })
})

// TESTE (RAIZ)
app.get("/", (req, res) => {
  res.send("API ONLINE 🚀")
})

// ROTA PROTEGIDA
app.get("/me", (req, res) => {

  const token = req.headers.authorization

  if(!token){
    return res.status(401).json({ error: "Sem token" })
  }

  try {
    const decoded = jwt.verify(token, SECRET)
    res.json(decoded)
  } catch {
    res.status(401).json({ error: "Token inválido" })
  }

})

// PORTA CORRETA (IMPORTANTE)
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log("Servidor rodando na porta", PORT)
})
