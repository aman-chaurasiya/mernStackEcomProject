import mongoose from "mongoose";
const connectdb = async () => {
  try {
    const con = await mongoose.connect(process.env.MONGO_URL);
    console.log(`connected to databace ${con.connection.host}`.bgCyan.white);
  } catch (error) {
    console.log(`error in mongo db ${error}`);
  }
};

export default connectdb;
