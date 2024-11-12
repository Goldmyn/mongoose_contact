// access our mongodb database
import mongoose from "mongoose";
// access environmental variables{things kept hidden}
import "dotenv/config";
// setup server
import express from "express";

const app = express();
const port = 4000;

// Create a function to connect to MongoDB using our connection string.
async function connectDB() {
  try {
    // use process.env.connection string because we need to access the file in .env
    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
    console.log("Connection to database successful");
    // await addContact();
    // await findContact();
    // await updateContact();
    await deleteContact();
  } catch (error) {
    console.log(error);
    console.log("Connection Error");
  }
}

// Define a schema for our contact app

const contactSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
    },
    email: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    birthDate: {
      type: String,
    },
    isMarried: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

// Define Collection Name using model
const Contact = mongoose.model("Contacts", contactSchema);

// Function for creating a user contact

async function addContact() {
  const createContact = await Contact.create({
    fullName: "Marius  Nwokolo",
    email: "mariusx@x.com",
    phoneNumber: "+2348103736627",
    birthDate: "01-19-1996",
    isMarried: false,
  });
  console.log(createContact);
}

// create a function to find contact

async function findContact() {
  const userContact = await Contact.find({ email: "mariusx@x.com" });
  console.log(userContact);
}

//create a function to update contact

async function updateContact() {
  const updatedContact = await Contact.findOneAndUpdate(
    { email: "masterx@xmail.com" },
    {
      email: "masterx@xmail.com",
      fullName: "Master X",
      phoneNumber: "+616645785432",
      birthDate: "20-12-1890",
      isMarried: true,
    },
    // add the new:true to make the updated db display the updated value
    { new: true }
  );
  console.log(updatedContact);
}

//Function for deleting Contact

async function deleteContact() {
  const theDeletedContact = await Contact.deleteMany({
    isMarried: true,
  });
  console.log(theDeletedContact);
}

// Listen for server connections
app.listen(port, () => {
  connectDB();
});
