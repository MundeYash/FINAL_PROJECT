const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const CryptoJS = require("crypto-js");
const mongoose = require('mongoose');

const connectDB = require("./config/db");
const bcrypt = require('bcryptjs');
// const mongoose = require('mongoose');
const { Batch } = require("./Schema");
const { Employee } = require("./Schema");


const { remove } = require("./candidateServices/candidate");
const { update } = require("./candidateServices/candidate");
const { getDetails } = require("./candidateServices/candidate");
const authRoutes = require('./routes/auth');
const app = express();
dotenv.config();

require("./dbConnect");

connectDB();

// console.log(process.env.MONGO_URI);

app.use(express.json());
app.use(cors());

app.get("/batchCode", async (req, res) => {
  const batch = await Batch.aggregate([
    { $group: { _id: null, maxBatchCode: { $max: "$batchCode" } } },
  ]);
  console.log(batch);
  res.json(batch);
});

app.post("/submit/batch", async (req, res) => {
  const formdata = req.body;
  console.log(formdata);
  // Decrypt data
  const decryptedData = CryptoJS.AES.decrypt(
    formdata.encryptedData,
    "secretKey"
  ).toString(CryptoJS.enc.Utf8);
  const decryptedObj = JSON.parse(decryptedData);
  // Process the decrypted data
  //   console.log(decryptedObj);
  try {
    const newEmployee = new Batch(decryptedObj);

    console.log(newEmployee);
    if (await newEmployee.save()) {
      res.status(201).json({ message: "saved on database :)" }); // Send a simple response
    } else {
      throw error;
    }
  } catch (error) {
    console.log(error);
  }

  //   res.status(200).json({ message: "submited" }); // Send a simple response
});

app.get("/employees/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const employeeData = await Employee.find({ batchCode: id });
    res.status(200).json(employeeData);
  } catch (error) {
    res.status(500).send({ message: "Error getting employee" });
  }
});

app.get("/data", async (req, res) => {
  try {
    const data = await Batch.aggregate([
      {
        $group: {
          _id: null, // Group all documents together
          code: { $addToSet: "$batchCode" },
          description: { $addToSet: "$batchDescription" },
          name: { $addToSet: "$courseName" },
          startDate: { $addToSet: "$startDate" },
          endDate: { $addToSet: "$endDate" },
          duration: { $addToSet: "$courseDuration" },
        },
      },
    ]);

    // Extract the arrays from the result
    const result = data[0];

    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/submit/employee", async (req, res) => {
  const formdata = req.body;
  console.log(formdata);

  // Decrypt data
  const decryptedData = CryptoJS.AES.decrypt(
    formdata.encryptedData,
    "secretKey"
  ).toString(CryptoJS.enc.Utf8);
  const decryptedObj = JSON.parse(decryptedData);

  // Process the decrypted data
  //   console.log(decryptedObj);
  try {
    const newEmployee = new Employee(decryptedObj);

    console.log(newEmployee);
    if (await newEmployee.save()) {
      res.status(201).json({ message: "saved on database :)" }); // Send a simple response
    } else {
      throw error;
    }
  } catch (error) {
    console.log(error);
  }

  //   res.status(200).json({ message: "submited" }); // Send a simple response
});

app.post("/signin", (req, res) => {
  const formdata = req.body;
  console.log(formdata);
});
//candidate services for update and delete
app.put("/candidate/update", update);
app.delete("/candidate/delete/:id", remove);
app.get("/candidate/:id", getDetails);

app.use(express.json({ extended: false }));

// app.use("/api/auth", require("./routes/auth"));

app.use('/api/auth', authRoutes);


// Start the server
const port = process.env.PORT || 4000; // Choose any port you prefer
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
