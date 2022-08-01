import { Router } from 'express'

const cartRouter = new Router()

cartRouter.post('/add', (request, response) => {
    response
        .status(201)    
        .send('cart')

})
cartRouter.post('/remove', (request, response) => {
    response
        .status(201)    
        .send('cart')

})
cartRouter.post('/total', (request, response) => {
    response
        .status(201)    
        .send('cart')

})

export default cartRouter