const express = require("express")
const cors = require("cors")
const jwt = require("jsonwebtoken")

const app = express()
app.use(cors())
app.use(express.json())

const SECRET = "NEON_BOT_SUPER_SECRET_2025"

// usuários (depois pode virar banco)
const users = [
  { email: "admin@clickstoredeals.com", password: "Neon@2025!", role: "admin" }
]

// LOGIN
app.post("/login", (req, res) => {

  const { email, password } = req.body

  const user = users.find(u => u.email === email && u.password === password)

  if(!user){
    return res.json({ success: false })
  }

  const token = jwt.sign(
    { email: user.email, role: user.role },
    SECRET,
    { expiresIn: "2h" } // expira
  )

  res.json({
    success: true,
    token
  })

})


// MIDDLEWARE PROTEÇÃO
function auth(req, res, next){

  const token = req.headers.authorization

  if(!token) return res.status(401).json({ error: "Sem token" })

  try{
    const decoded = jwt.verify(token, SECRET)
    req.user = decoded
    next()
  } catch{
    return res.status(401).json({ error: "Token inválido" })
  }

}

// ROTA PROTEGIDA (teste)
app.get("/me", auth, (req, res) => {
  res.json(req.user)
})

app.listen(3000, () => console.log("Servidor rodando"))
