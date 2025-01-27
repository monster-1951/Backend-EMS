import { connectDB } from "../../Database/ConnectDB.js";
import Employee from "../../Database/models/Employee.model.js";
export const UpdateEmployeeById = async (req, res) => {
  const id = req.params.id;
  const { name, email, password, role, attendance, salary, position } =
    req.body;
  console.log(id);
  if (req.role == "Admin" || "admin") {
    try {
      await connectDB(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      const EmployeeExists = await Employee.findOne({ id: id });
      if (EmployeeExists) {
        const UpdatedEmployee = await Employee.findOneAndUpdate(
          { id: id }, // Find by the _id field, assuming it's a MongoDB ObjectId
          { name, email, password, role, attendance, salary, position },
          { new: true } // Return the updated document
        ).catch((err) => console.log(err));
        return res.status(200).json({
          message: "Employee Data Updated successfully",
          success: true,
          UpdatedEmployee,
        });
      } else {
        return res.status(404).json({
          message: "Employee not found ! Check id once",
          success: false,
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Failed to Update employee data",
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
