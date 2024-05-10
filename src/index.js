import express from "express";

const app = express();

const PORT = process.env.PORT || 3000;

const mockUsers = [
  {
    id: 1,
    name: "Winner",
    age: 20,
    displayName: "winner"
  },
  {
    id: 2,
    name: "John",
    age: 25,
    displayName: "john"
  },
  {
    id: 3,
    name: "Mary",
    age: 22,
    displayName: "mary"
  },
];

app.get('/', (request, response)=>{
response.status(200).send({
    msg:"hello",
    author: "Winner",
    recipient: "client"
})
})

app.get('/api/users', (request, response)=>{
    response.status(200).send(mockUsers)
})

app.get('/api/users/:id', (request, response) => {
    console.log(request.params);
    const parseId = parseInt(request.params.id)
    if ( isNaN(parseId)) {
        return response.status(400).send({msg: "Bad request. Invalid id"})
    }
    const findUser = mockUsers.find((user) => user.id === parseId)
    if (!findUser) {
        return response.status(404).send("User not found")
    }
    return response.send(findUser);
})

// app.get("/api/users/:displayName", (request, response) =>{
//     console.log(request.params)
//     const findUser = mockUsers.find((user) => user.displayName === request.params.displayName)
//     if (!findUser) {
//         return response.status(404).send(`${request.params.displayName} is not a valid user`)
//     }
//     return response.status(200).send(findUser);
// });

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})