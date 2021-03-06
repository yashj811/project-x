const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config({ path: "./.env" });

const AuthRoutes = require("./routes/AuthRoutes");
const UserProfileRoutes = require("./routes/UserProfileRoutes");
const SchoolRoutes = require("./routes/SchoolRoutes");
const UserRoutes = require("./routes/UserRoutes");
const ClassRoutes = require("./routes/ClassRoutes");
const SubjectRoutes = require("./routes/SubjectRoutes");

const app = express();

const PORT = process.env.PORT;
const DB_URL = `mongodb+srv://yashj811:HMj1XZTccJoCctMb@cluster0.rulxd.mongodb.net/SMS?retryWrites=true&w=majority`;

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1/auth", AuthRoutes);
app.use("/api/v1/user/profile", UserProfileRoutes);
app.use("/api/v1/school", SchoolRoutes);
app.use("/api/v1/users", UserRoutes);
app.use("/api/v1/class", ClassRoutes);
app.use("/api/v1/subject", SubjectRoutes);


// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("client/build"));
//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
//   });
// }

app.listen(PORT,  () => {
   mongoose.connect(
    DB_URL,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
      console.log("Connected to db...");
      console.log(`Connected on port : ${PORT}`);
    }
  );
});