// import mongoose from "mongoose";

// /**
// Source :
// https://github.com/vercel/next.js/blob/canary/examples/with-mongodb-mongoose/utils/dbConnect.js
// **/

// const MONGODB_URI = process.env.MONGODB_URI;

// if (!MONGODB_URI) {
//   throw new Error(
//     "Please define the MONGODB_URI environment variable inside .env.local"
//   );
// }

// /**
//  * Global is used here to maintain a cached connection across hot reloads
//  * in development. This prevents connections growing exponentially
//  * during API Route usage.
//  */
// declare global {
//   var mongoose: any; // This must be a `var` and not a `let / const`
// }

// let cached = global.mongoose;

// if (!cached) {
//   cached = global.mongoose = { conn: null, promise: null };
// }

// async function dbConnect() {
//   if (cached.conn) {
//     return cached.conn;
//   }

//   if (!cached.promise) {
//     const opts = {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       bufferCommands: false,
//       bufferMaxEntries: 0,
//       useFindAndModify: true,
//       useCreateIndex: true,
//     };
//     if (MONGODB_URI) {
//       cached.promise = mongoose
//         .connect(MONGODB_URI, opts)
//         .then((mongoose) => mongoose);
//     }
//   }
//   cached.conn = await cached.promise;
//   return cached.conn;
// }

// export default dbConnect;

///////////////////
///////////////////
///////////////////
///////////////////
///////////////////
///////////////////
///////////////////
///////////////////
///////////////////
///////////////////
///////////////////
///////////////////

import mongoose from "mongoose";

/** 
Source : 
https://github.com/vercel/next.js/blob/canary/examples/with-mongodb-mongoose/utils/dbConnect.js 
**/

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

// dbConnect().catch((err) => console.log(err));

async function dbConnect() {
  if (mongoose.connection.readyState >= 1) {
    return;
  }
  mongoose.connection.on("connected", () => {
    console.log("connected to mongoDb database");
  });
  mongoose.connection.on("error", (err) => {
    console.log("an error occured :", err.message);
  });
  const opts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    bufferCommands: false,
  };
  if (MONGODB_URI) {
    return mongoose.connect(MONGODB_URI, opts);
  }
}
export default dbConnect;
