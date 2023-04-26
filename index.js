const express = require("express")
const mongoose = require("mongoose")

const app = express()

const PORT = process.env.PORT || 5000

 app.use(express.json({extended: true}))
app.use('/api/auth', require('./routes/auth.route'))
app.use('/api/todo', require('./routes/todo.route'))

async function start(){
    try{
      await mongoose.connect("mongodb+srv://atorud:atorud@cluster0.3ddtgzp.mongodb.net/?retryWrites=true&w=majority",{
        useNewUrlParser: true,
        useUnifiedTopology: true
        
      })

      app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`)
      })
    } catch(err){
        console.error(err)
    }
}

start()