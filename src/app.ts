import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from "cors"

const port = 3000

const connectDB = () => {
    mongoose.connect("mongodb+srv://rishavraj06:rishav123@cluster0.5nplm7d.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",{
        dbName:"slidelyAI",
    }).then((c)=> console.log(`DB Connected to ${c.connection.host}`)).catch((e)=>console.log(e));
}

connectDB();



const formSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    github: String,
    timeSpent: String,
  });
  const Form = mongoose.model('Form', formSchema);

const app = express();
app.use(cors());
app.use(bodyParser.json());


app.post('/forms', async (req, res) => {
    const { name, email, phone, github, timeSpent } = req.body;
    try {
      const newForm = new Form({ name, email, phone, github, timeSpent });
      await newForm.save();
      res.status(201).json(newForm);
    } catch (err) {
      console.error('Error saving form:', err);
      res.status(500).json({ error: 'Failed to create form' });
    }
  });


  app.get('/forms', async (req, res) => {
    try {
      const forms = await Form.find();
      res.status(200).json(forms);
    } catch (err) {
      console.error('Error retrieving forms:', err);
      res.status(500).json({ error: 'Failed to retrieve forms' });
    }
  });


app.listen(port,()=>{
    console.log(`server is working on http://localhost:${port}`);
})