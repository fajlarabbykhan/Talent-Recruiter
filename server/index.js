const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");

dotenv.config();
const app = express();
// middleware
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));
app.use(express.static("uploads")); //image upload
app.use(cookieParser());
app.use(cors());
// database connection is here
mongoose
  .connect(`${process.env.MONGO_URI}`, {
    dbName: "talentRecruiterDBByAlphaInfinity",
  })
  .then(() => console.log("connection success"))
  .catch((err) => console.log("error", err));

app.get("/", (req, res) => {
  res.json({ success: "server is running" });
});

//import all route
const blogsRoute = require("./routers/blogsRoute");
const userRoute = require("./routers/userRoute");
const adminUsers = require("./routers/adminUsers");
const roleAuthCheck = require("./Middlewares/roleAuthCheck");//role checking middleware
const emailCampaign = require("./routers/emailCampaignRoute")//email campaign imported

// create all routes here

app.use("/api/blogs", blogsRoute); //dynamic blog post
app.use("/api/admin", roleAuthCheck, adminUsers); //admin user route
app.use("/api/email-campaign", roleAuthCheck,emailCampaign); //for email campaign
app.use("/api/user", userRoute); //for login and register
app.use("/api/jobs/", require("./routers/jobRoute"));
app.use("/api/category/", require("./routers/categoryRoute"));
app.use("/api/applicant/", require("./routers/applicantRouter"));
app.use("/api/applicant/", require("./routers/applicantRouter"));
app.use("/api/requiter/", require("./routers/requiterRouter"));
app.use("/api/applicant/", require("./routers/applicantRouter"));

// All default error handling function
function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  } else {
    res.status(500).json({ error: err });
  }
}
app.use(errorHandler);
app.listen(4000, () => {
  console.log("app is listening on port 4000");
});
