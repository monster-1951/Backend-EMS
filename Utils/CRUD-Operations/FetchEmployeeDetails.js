import { connectDB } from "../../Database/ConnectDB.js";
import Employee from "../../Database/models/Employee.model.js";

export const FetchAllEmployees = async (req, res) => {
  if (req.role == "Admin") {
    console.log(req.role,"🤖")
    try {
      await connectDB(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      const Employees = await Employee.find({});
      console.log(Employees)
      return res.status(200).json({
        message: "Data Fetched successfully",
        success: true,
        Employees,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Failed to fetch data",
        success: false,
        error,
      });
    }
  } else {
    return res.status(403).json({
      message: "Unauthorized access",
      success: false,
    });
  }
};

export const FindEmployeeById = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  if (req.role == "Admin" || "admin") {
    try {
      await connectDB(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      const EmployeeToFind = await Employee.find({ id: id });

      return res.status(200).json({
        message: "Employee Data Fetched successfully",
        success: true,
        EmployeeToFind,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Failed to fetch data",
        success: false,
        error,
      });
    }
  } else {
    return res.status(403).json({
      message: "Unauthorized access",
      success: false,
    });
  }
};
