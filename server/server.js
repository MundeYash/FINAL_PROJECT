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
const {Certificate } = require("./Schema");

const { remove, update, getDetails, getAllCanditates } = require("./candidateServices/candidate");
const authRoutes = require('./routes/auth');
const app = express();
dotenv.config();

require("./dbConnect");

connectDB();
//***********************************/


// Get the last updated certificate number
app.get('/last-updated-certificate', async (req, res) => {
  try {
    const lastUpdated = await getLastUpdatedCertificate(); // Implement this function to get the last updated certificate number from the database
    res.json({ lastUpdatedCertificate: lastUpdated });
  } catch (error) {
    res.status(500).send('Error fetching last updated certificate number');
  }
});

// Update certificates for the selected batch
app.post('/assign-certificates/:batchCode', async (req, res) => {
  try {
    const { batchCode } = req.params;
    const updatedCandidates = req.body;
    await updateCertificates(batchCode, updatedCandidates); // Implement this function to update certificates in the database
    res.send('Certificates updated successfully');
  } catch (error) {
    res.status(500).send('Error updating certificates');
  }
});
/***************************************************** */

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


// modified changes 
app.get("/batch/:code", async (req, res) => {
  const batchCode = req.params.code;
  try {
    const batchDetails = await Batch.findOne({ batchCode: batchCode });
    if (batchDetails) {
      console.log(batchDetails);
      res.status(200).json(batchDetails);
    } else {
      res.status(404).send({ message: "Batch not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
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

    // console.log(newEmployee);
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

//candidate services for update and delete
app.get("/candidates", getAllCanditates);
app.put("/candidate/update", update);
app.delete("/candidate/delete/:id", remove);
app.get("/candidate/:id", getDetails);

app.use(express.json({ extended:true }));
app.use('/api/auth', authRoutes)
  


app.get('/certificate/:batchCode', async (req, res) => {
  const batchCode = req.params.batchCode;
  // console.log(batchCode);

  try {
    // Find the certificate with the maximum certificate number for the given batch code
    const maxCertificate = await Certificate.findOne({})
      .sort({ certificateNumber: -1 }) // Sort in descending order by certificateNumber
      .limit(1); // Limit the result to 1 document

    if (maxCertificate) {
      res.send(maxCertificate.certificateNumber);
    } else {
      res.send("1000");
    }
  } catch (error) {
    console.error('Error fetching certificate:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/assignCertificates/:batchCode',async (req,res)=>{
  const updatedCandidates = req.body;
  // console.log(updatedCandidates);
  try{
    const updatedCandidates = req.body;
    const newCertificates = new Certificate({
      name : {firstName : updatedCandidates.firstName, lastName : updatedCandidates.lastName},
      certificateNumber : updatedCandidates.certificateNumber,
      batchCode : updatedCandidates.batchCode
    })
    console.log(newCertificates);
    res.send(updatedCandidates);
  }
  catch(error)
  {
    console.log(error);
  }
})

// Start the server
const port = process.env.PORT || 4000; // Choose any port you prefer
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
