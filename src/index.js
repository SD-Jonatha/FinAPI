const express = require('express');
const { v4: uuidv4 } = require("uuid")
const app = express();

app.use(express.json());

const customers = [];

app.post("/account", (request, response)=> {
  const {cpf, name} = request.body;

  const customerAlreadyExists = customers.some(
    (customer)=> customer.cpf === cpf
  );

  console.log(customerAlreadyExists)

  const id= uuidv4()

  customers.push({
    cpf,
    name,
    id,
    statement: []
  })

  return response.status(201).send("ok");
})



app.listen(3333)