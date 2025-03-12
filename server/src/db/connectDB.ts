// mongopassword = YOwncu7p4SYvrU3K
// username  = harishmudhiraj486

import mongoose from "mongoose"

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string)
    console.log(`mongoDB connected`)
  } catch (error) {
    console.log(error)
  }
}

export default connectDB;