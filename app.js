const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const corsOptions = {
  origin: "http://localhost:3000", // Replace with the origin of your frontend application
  credentials: true, // Allow credentials (cookies)
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// -------------------Admin Role Route---------------------
const { adminRoleRoute } = require("./routes/adminRole.routes");
app.use("/api", adminRoleRoute);

// -------------------Admin Role Assign Route---------------------
const { adminRoleAssignRoute } = require("./routes/adminRoleAssign.routes");
app.use("/api", adminRoleAssignRoute);

// -------------------Admin User Profile Route---------------------
const { adminUserProfileRoute } = require("./routes/adminUserProfile.routes");
app.use("/api", adminUserProfileRoute);

// -------------------Product Description Route---------------------
const { usersRoutes } = require("./routes/users.routes");
app.use("/api", usersRoutes);

// -------------------Category Route---------------------
const { categoryRoute } = require("./routes/category.routes");
app.use("/api", categoryRoute);

// -------------------SubCategory Route---------------------
const { subCategoryRoute } = require("./routes/subCategory.routes");
app.use("/api", subCategoryRoute);

// -------------------Retailer Route---------------------
const { retailerRoute } = require("./routes/retailers.routes");
app.use("/api", retailerRoute);

// -------------------Customer Route---------------------
const { customerRoute } = require("./routes/customer.routes");
app.use("/api", customerRoute);

// -------------------Product Route---------------------
const { productRoutes } = require("./routes/product.routes");
app.use("/api", productRoutes);

// -------------------Product Description Route---------------------
const { productDescRoutes } = require("./routes/productDescription.routes");
app.use("/api", productDescRoutes);

app.get("/", (req, res) => {
  res.send("server is running");
});
app.listen(process.env.PORT, () => {
  console.log(`Your Server is Start http://localhost:${process.env.PORT}`);
});
