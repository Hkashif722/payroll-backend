// import pakages
const express = require("express");
require("dotenv").config();
const axios = require("axios");
const jwt = require("jsonwebtoken");
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcrypt");
const session = require("client-sessions");

// initiliaze app
const app = express();

// variables
const saltRound = 10;
let db;

//use join format request
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(
  session({
    cookieName: "Payroll",
    secret: "this_is Random_secret_from_payroll",
    duration: 30 * 60 * 1000,
    activeDuration: 15 * 60 * 1000,
  })
);

// db initialiazion
// const mysql_handleDisconnect = () => {
db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "newpassword123",
  database: "Payroll",
});

db.connect((err) => {
  if (err) {
    // or restarting (takes a while sometimes).
    console.log("error when connecting to db:", err);
    //   mysql_handleDisconnect(); // We introduce a delay before attempting to reconnect,
  }
});
db.on("error", (err) => {
  console.log("db error", err);
  if (err.code === "PROTOCOL_CONNECTION_LOST") {
    // Connection to the MySQL server is usually
    // lost due to either server restart
    //   mysql_handleDisconnect();
  } else {
    // connnection idle timeout (the wait_timeout
    // server variable configures this)
    throw err;
  }
});
// };

app.post("/register", (req, res) => {
  console.log(req.body);
  const data = req.body;
  const username = data.username;
  const password = data.password;
  bcrypt.hash(password, saltRound, (err, hash) => {
    if (err) console.log("Error");
    else {
      db.query(
        "INSERT INTO users(id , username , password) Values (?,?,?)",
        [null, username, hash],
        (err, result) => console.log(err)
      );
      res.send("User created");
    }
  });
});

const verifyJwt = (req, res, next) => {
  const token = req.headers["payroll-access-token"];
  if (!token) {
    res.send("Tocken is not initiliased");
  } else {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        res.json({ auth: false, message: "failed to authenticate" });
      } else {
        req.userId = decoded.id; // saving token id for furthur request
        next();
      }
    });
  }
};

app.get("/isUserAuth", verifyJwt, (req, res) => {
  res.send("You are authenticated");
});

app.post("/login", (req, res) => {
  console.log("data");
  console.log(req.body);
  const data = req.body;
  const username = data.username;
  const password = data.password;
  db.query("SELECT * FROM users WHERE username = ?;", username, (err, user) => {
    console.log();
    if (user) {
      bcrypt.compare(password, "" + user[0].password, (err, result) => {
        console.log(err);
        if (result) {
          const id = user[0].id;
          const token = jwt.sign({ id }, process.env.JWT_SECRET, {
            expiresIn: 500,
          });
          //   req.session.user = user;
          res.json({ auth: true, token: token, user: user });
        } else {
          res.send({ auth: false, message: "Invalid usernam and password" });
        }
      });
    } else {
      res.json({ auth: false, message: "no user exist" });
    }
  });
});

app.get("/employee", (req, res) => {
  db.query("SELECT * FROM emp_details", (err, emp) => {
    if (!err) {
      res.send(emp);
    } else console.log(err);
  });
});

app.post("/employee", (req, res) => {
  const data = req.body;

  console.log(data);

  db.query(
    "INSERT INTO emp_details(emp_id,emp_name,emp_dob,emp_doj,emp_pincode,emp_city,emp_mobile_no,emp_state,emp_mail_id) VALUES(?,?,?,?,?,?,?,?,?)",
    [
      data.emp_id,
      data.emp_name,
      data.emp_dob,
      data.emp_doj,
      data.emp_pincode,
      data.emp_city,
      data.emp_mobile_no,
      data.emp_state,
      data.emp_mail_id,
    ]
  );

  res.send(req.body);
});

app.get("/department", (req, res) => {
  db.query("SELECT * FROM dept", (err, result) => {
    if (result) {
      // console.log(result);
      res.send(result);
    } else console.log(err);
  });
});

app.get("/grade", (req, res) => {
  db.query("SELECT * FROM grade", (err, result) => {
    if (result) {
      res.send(result);
    } else {
      console.log(err);
    }
  });
});

app.get("/empgrade", (req, res) => {
  db.query("SELECT * FROM emp_grade", (err, result) => {
    if (result) {
      res.send(result);
    } else console.log(err);
  });
});

app.post("/department", (req, res) => {
  const data = req.body;
  db.query("INSERT INTO dept(dept_id,dept_name) VALUES(?,?)", [
    data.dept_id,
    data.dept_name,
  ]);

  res.send(data);
});

app.post("/deldepartment", (req, res) => {
  const data = req.body;
  console.log(data);
  db.query(`DELETE FROM dept WHERE dept_id = ${data.dept_id}`);
  res.send(data);
});
app.post("/grade", (req, res) => {
  const data = req.body;
  console.log(data);
  db.query(
    "INSERT INTO grade(grade_id,grade_name,grade_basic_salary,grade_bonus) VALUES(?,?,?,?)",
    [data.grade_id, data.grade_name, data.grade_basic_salary, data.grade_bonus]
  );
  res.send(data);
});
app.post("/empgrade", (req, res) => {
  const data = req.body;
  console.log(data);
  db.query(
    "INSERT INTO emp_grade (transaction_id,emp_id,emp_dept_id,emp_grade_id,emp_from_date,emp_to_date) VALUES(?,?,?,?,?,?,)",
    [
      data.transaction_id,
      data.emp_id,
      data.emp_dept_id,
      data.emp_grade_id,
      data.emp_from_date,
      data.emp_to_date,
    ]
  );
  res.send(data);
});

app.post("/emp-report", (req, res) => {
  const id = req.body.emp_id;
  console.log(id);
  db.query(`SELECT * FROM emp_salary WHERE emp_id = ${id}`, (err, result) => {
    if (result) {
      res.send(result);
    } else {
      console.log(err);
    }
  });
});

app.get("/emp-report", (req, res) => {
  db.query(`SELECT * FROM emp_salary`, (err, result) => {
    if (result) {
      res.send(result);
    } else {
      console.log(err);
    }
  });
});

app.listen(4000, "localhost", () => {
  console.log("server is up and running on port 4000");
});
