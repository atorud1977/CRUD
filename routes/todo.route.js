const {Router} = require('express')
const router = Router()
const Todo = require('../models/Todo')

router.post('/add', async (req, res) => {
  try {
    const {text,userId, summa,textareaValue} = req.body
    
    
    const todo = await new Todo ({
        text,
        summa,
        textareaValue,
        owner: userId,
        completed: false,
        important: false,
        createdAt: new Date().toLocaleString()
    })
    await todo.save()

    res.json(todo)

  } catch (error) {
    console.log(error);
  }

})

router.get('/', async (req, res) => {
  try {
    const {userId} = req.query
    const todo = await Todo.find({owner: userId})

    res.json(todo)
  } catch (error) {
    console.log(error);
  }
})

router.delete('/delete/:id', async (req, res) => {
  try {
    
    const todo = await Todo.findOneAndDelete({_id: req.params.id})

    res.json(todo)
  } catch (error) {
    console.log(error);
  }
})
router.put('/update/:id', async (req, res) => {
  try {
    const {text,summa,textareaValue} = req.body
    const todo = await Todo.findOneAndUpdate({_id: req.params.id}, {text,summa,textareaValue}, {new: true})
    res.json(todo)
  } catch (error) {
    console.log(error);
  }
})


module.exports = router