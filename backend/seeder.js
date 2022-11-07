import colors from "colors";
import connectDB from "./config/db.js";
import users from "./data/users.js";
import User from "./models/userModel.js";
import notes from "./data/notes.js";
import Notes from "./models/noteModel.js";


const importData = async () => {
  try {
    await connectDB();
    await Notes.deleteMany();
    await User.deleteMany();
    const createdUsers = await User.insertMany(users);
    const sampleNotes = createdUsers.map((user) => {
      return { user, notes: [...notes] };
    });
    await Notes.insertMany(sampleNotes);
    console.log("Data imported".green.inverse);
    process.exit();
  } catch (error) {
    console.log(`Error on importing ${error.message}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await connectDB();
    await Notes.deleteMany();
    await User.deleteMany();
    console.log("Data destroyed".yellow.inverse);
    process.exit();
  } catch (error) {
    console.log(`Error on importing ${error.message}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") destroyData();
else importData();
