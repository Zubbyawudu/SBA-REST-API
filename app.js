

const todos = require('./data/todos');

const users = require('./data/users');


const express = require('express');
const app = express();
const port = 3000;


// Middleware
app.use(express.json());


// Get routes
app.get("/api/users/", (req, res) => {
    const allUsers = users.map((u) => {
      const todosList = todos.filter((t) => t.userId == u.id);
      return { ...u, todosList};
    })
    res.json(allUsers);
  });
  
  

// Post routes 
app.post("/api/users", (req, res) => {
  if (req.body.name && req.body.username && req.body.email) {
    if (users.find((u) => u.username == req.body.name)) {
      res.json({ error: "Username Already Taken" });
      return;
    }

    const user = {
      id: users[users.length - 1].id + 1,
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
    };

    users.push(user);
    res.json(users[users.length - 1]);
  } else res.json({ error: "Insufficient Data" });
});

// patch routes(updating data)
app.patch("/api/users/:id", (req, res) => {
    const userId = req.params.id;
    const user = users.find((u) => u.id == userId);
    if (user) {
      for (const key in req.body) {
        user[key] = req.body[key];
      }
      res.json(user);
    } else {
      res.json({ error: "User Not Found" });
    }
  });
  
  // delete routes 
  app.delete("/api/users/:id", (req, res) => {
    const userId = req.params.id;
    const user = users.find((u) => u.id == userId);
    if (user) {
      users.splice(users.indexOf(user), 1);
      res.json(user);
    } else {
      res.json({ error: "User Not Found" });
    }
  });




  app.listen(port, () => {
    console.log(`Server listening on port: ${port}.`);
  });






















// // Middleware
// app.use((req, res, next) => {
//   const time = new Date();

//   console.log(
//     `-----
// ${time.toLocaleTimeString()}: Received a ${req.method} request to ${req.url}.`
//   );
//   if (Object.keys(req.body).length > 0) {
//     console.log("Containing the data:");
//     console.log(`${JSON.stringify(req.body)}`);
//   }
//   next();
// });

// app
//   .route("/api/users")
//   .get((req, res) => {
//     // res.json(users);
//   })
//   .post((req, res) => {
//     if (req.body.name && req.body.username && req.body.email) {
//       if (users.find((u) => u.username == req.body.username)) {
//         res.json({ error: "Username Already Taken" });
//         return;
//       }

//       const user = {
//         id: users[users.length - 1].id + 1,
//         name: req.body.name,
//         username: req.body.username,
//         email: req.body.email,
//       };

//       users.push(user);
//       res.json(users[users.length - 1]);
//     } else res.json({ error: "Insufficient Data" });
//   });

// app
//   .route("/api/users/:id")
//   .get((req, res, next) => {
//     const user = users.find((u) => u.id == req.params.id);
//     if (user) res.json(user);
//     else next();
//   })
//   .patch((req, res, next) => {
//     const user = users.find((u, i) => {
//       if (u.id == req.params.id) {
//         for (const key in req.body) {
//           users[i][key] = req.body[key];
//         }
//         return true;
//       }
//     });

//     if (user) res.json(user);
//     else next();
//   })
//   .delete((req, res, next) => {
//     const user = users.find((u, i) => {
//       if (u.id == req.params.id) {
//         users.splice(i, 1);
//         return true;
//       }
//     });

//     if (user) res.json(user);
//     else next();
//   });

// app
//   .route("/api/todos")
//   .get((req, res) => {
//     res.json(todos);
//   })
//   .post((req, res) => {
//     if (req.body.userId && req.body.title && req.body.content) {
//       const post = {
//         id: todos[todos.length - 1].id + 1,
//         userId: req.body.userId,
//         title: req.body.title,
//         content: req.body.content,
//       };

//       todos.push(post);
//       res.json(todos[todos.length - 1]);
//     } else res.json({ error: "Insufficient Data" });
//   });

// app
//   .route("/api/todos/:id")
//   .get((req, res, next) => {
//     const post = todos.find((p) => p.id == req.params.id);
//     if (post) res.json(post);
//     else next();
//   })
//   .patch((req, res, next) => {
//     const post = todos.find((p, i) => {
//       if (p.id == req.params.id) {
//         for (const key in req.body) {
//           todos[i][key] = req.body[key];
//         }
//         return true;
//       }
//     });

//     if (post) res.json(post);
//     else next();
//   })
//   .delete((req, res, next) => {
//     const post = todos.find((p, i) => {
//       if (p.id == req.params.id) {
//         todos.splice(i, 1);
//         return true;
//       }
//     });

//     if (post) res.json(post);
//     else next();
//   });

// app.get("/", (req, res) => {
//   res.send("Work in progress!");
// });

// app.use((req, res) => {
//   res.status(404);
//   res.json({ error: "Resource Not Found" });
// });

// app.listen(port, () => {
//   console.log(`Server listening on port: ${port}.`);
// });