const express = require('express');
const { v4: uuidv4 } = require("uuid")
const app = express();

app.use(express.json());

const customers = [];

function verifyIfExistsAccountCPF(request, response, next){
  const {cpf} = request.headers;

  const customer = customers.find((customer)=> customer.cpf === cpf);

  if(!customer){
    return response.status(400).json({
      error: "Customer not found"
    });
  }

  request.customer = customer
  request.teste = 1

  return next();
}

app.post("/account", (request, response)=> {
  const {cpf, name} = request.body;

  const customerAlreadyExists = customers.some(
    (customer)=> customer.cpf === cpf
  );

  if(customerAlreadyExists){
    return response.status(400).json({error: "Customer already exists!"})
  }



  customers.push({
    cpf,
    name,
    id:uuidv4(),
    statement: []
  })

  return response.status(201).send("ok");
})

app.get("/statement", verifyIfExistsAccountCPF, (request, response)=> {
  const {customer} = request
   console.log(request.teste)

  return response.json(customer.statement);
})

app.post("/deposit", verifyIfExistsAccountCPF, (request, response) => {
  const {description, amount} = request.body;

  const {customer} = request;

  const statementOperation ={
    description,
    amount,
    created_at: new Date(),
    type: "credit"
  }

  customerstatement.push(statementOperation);

  return response
})



app.listen(3333)