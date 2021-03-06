const express = require("express");
const apiRouter = express.Router();
const jwt = require("jsonwebtoken");
const { getUserById } = require("../db");
const { JWT_SECRET } = process.env;

apiRouter.use(async (req, res, next) => {
  const prefix = "Bearer ";
  const auth = req.header("Authorization");
//   console.log("Success", req.header)

  if (!auth) {
    next();
  } else if (auth.startsWith(prefix)) {
    const token = auth.slice(prefix.length);

    try {
      const response = jwt.verify(token, JWT_SECRET);
        // console.log("This is line 14 block", response)
      if (response) {
        //   console.log("This should hit getUserById")
        req.user = await getUserById(response.id);
        console.log(req.user)
        next();
      }
    } catch ({ name, message }) {
      next({ name, message });
    }
  } else {
    //   console.log("This is line 27 block")
    next({
      name: "AuthorizationHeaderError",
      message: `Authorization token must start with ${prefix}`,
    });
  }
});

apiRouter.use((req, res, next) => {
    if (req.user) {
      console.log("User is set:", req.user);
    }
  
    next();
  });

const usersRouter = require("./users");
const postsRouter = require("./posts");
const tagsRouter = require("./tags");
apiRouter.use("/users", usersRouter);
apiRouter.use("/posts", postsRouter);
apiRouter.use("/tags", tagsRouter);



module.exports = apiRouter;
