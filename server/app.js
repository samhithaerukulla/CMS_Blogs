const mongoose = require("mongoose");
const express = require("express");
const cors = require('cors');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const port = 3000;
const app = express();

app.use(cors());
app.use(express.json());


const db = 'mongodb+srv://Tablebookingapp:Tablebookingapp@cluster0.4bxgp95.mongodb.net/content_management?retryWrites=true&w=majority';

// Connect to MongoDB using the connection string
mongoose.connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log(`Connection successful`);
}).catch((e) => {
  console.log(`No connection: ${e}`);
});

// Create a MongoDB schema for the pages collection
const blogSchema = new mongoose.Schema({
  userid: String,
  title: String,
  tags: String,
  content: String,
  publish: Boolean,
  date: String
});

const userSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  Username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});





// Create a MongoDB model for the pages collection
const Page = mongoose.model('Page', blogSchema);
const User = mongoose.model("User", userSchema);



app.post('/pages', (req, res) => {
  // Extract data from the request body
  const { userid, title, tags, content, publish, date } = req.body;

  // Save the content to the database (replace this with your actual database logic)
  // Example using Mongoose ORM:
 

  const page = new Page({
    userid,
    title,
    tags,
    content,
    publish,
    date
  });

  page.save()
    .then(() => {
      res.sendStatus(200); // Send a success response
    })
    .catch(error => {
      res.status(500).json({ error: 'Error saving content' }); // Send an error response
    });
});




//fetching details into savedcontent
app.get('/pages/titles/:userId', (req, res) => {
  const { userId } = req.params;

  // Modify the query to include the userId filter
  Page.find({ userid: userId })
    .then((pages) => {

      res.status(200).json(pages);
    })
    .catch((error) => {
      console.error('Error fetching saved titles:', error);
      res.status(500).json({ error: 'Failed to fetch saved titles' });
    });
});


//fetching details to edit component
app.get('/pages/:title', (req, res) => {
  const title = req.params.title;
  Page.findOne({ title })
    .then((page) => {
      if (!page) {
        res.status(404).json({ error: 'Page not found' });
      } else {
        res.json(page);
      }
    })
    .catch((error) => {
      console.error('Error fetching page:', error);
      res.status(500).json({ error: 'Failed to fetch page' });
    });
});


app.get('/show/:title', (req, res) => {
  const title = req.params.title;
  Page.findOne({ title })
    .then((page) => {
      if (!page) {
        res.status(404).json({ error: 'Page not found' });
      } else {
        res.json(page);
      }
    })
    .catch((error) => {
      console.error('Error fetching page:', error);
      res.status(500).json({ error: 'Failed to fetch page' });
    });
});




app.put('/pages/:title', (req, res) => {
  const title = req.params.title;
  const updatedPage = req.body;

  Page.findOneAndUpdate({ title }, updatedPage, { new: true })
    .then((page) => {
      if (!page) {
        res.status(404).json({ error: 'Page not found' });
      } else {
        res.json(page);
      }
    })
    .catch((error) => {
      console.error('Error updating page:', error);
      res.status(500).json({ error: 'Failed to update page' });
    });
});


app.delete('/pages/:title', (req, res) => {
  const title = req.params.title;
  Page.findOneAndDelete({ title })
    .then(() => {
      res.status(200).json({ message: 'Page deleted successfully' });
    })
    .catch((error) => {
      console.error('Error deleting page:', error);
      res.status(500).json({ error: 'Failed to delete page' });
    });
});


app.get('/posts', (req, res) => {
  Page.find({ publish: true }).exec()
    .then(posts => {
      res.json(posts);
    })
    .catch(err => {
      console.error('Error retrieving posts from MongoDB', err);
      res.status(500).send('Error retrieving posts');
    });
});


app.post('/register', async (req, res) => {
  const { firstname, lastname, Username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstname,
      lastname,
      Username,
      email,
      password: hashedPassword
    });

    const userCreated = await newUser.save();

    return res.status(201).json({ message: 'Successfully Registered' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Server Error' });
  }
});



app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }
  const isAdmin = email == 'admin@gmail.com' && password == 'admin@123';
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  // Generate a JWT token
  if (!isAdmin) {
    const token = jwt.sign({ userId: user._id }, 'mysecretkey');
    res.json({ user, token });
  } else {
    const jwtToken = jwt.sign({ userId: user._id }, 'mysecretkey');
    res.json({ user, jwtToken });
  }
});


// Assuming you have already defined the userSchema and created the User model

app.get('/user/profile/:userId', (req, res) => {
  const userId = req.params.userId;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json(user);
    })
    .catch((error) => {
      console.error('Error fetching user details:', error);
      res.status(500).json({ error: 'Failed to fetch user details' });
    });
});


app.put('/profile', (req, res) => {
  const updatedUser = req.body; // Assuming the updated user details are sent in the request body

  // Find the user by their unique identifier, such as username or email
  User.findOneAndUpdate(
    { Username: updatedUser.Username }, // Assuming 'Username' is the unique identifier
    updatedUser,
    { new: true } // Return the updated user object in the response
  )
    .then((user) => {
      if (user) {
        console.log('Profile updated successfully');
        res.status(200).json(user); // Send the updated user object in the response
      } else {
        console.log('User not found');
        res.status(404).json({ error: 'User not found' });
      }
    })
    .catch((error) => {
      console.error('Error updating profile:', error);
      res.status(500).json({ error: 'Internal server error' });
    });
});














app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
