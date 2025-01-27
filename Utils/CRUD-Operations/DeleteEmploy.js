import { connectDB } from "../../Database/ConnectDB.js";
import Employee from "../../Database/models/Employee.model.js";

export const DeleteEmployeeById = async (req, res) => {
    const id = req.params.id;
  
    console.log(id);
  
    // Check if the user has Admin role
    if (req.role == "Admin" || req.role == "admin") {
      try {
        // Ensure the database is connected
        await connectDB(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  
        // Use findByIdAndDelete to find and delete the document
        const deletedEmployee = await Employee.deleteOne({id:id});
  
        // If no employee is found, return an error
        if (!deletedEmployee) {
          return res.status(404).json({
            message: "Employee not found",
            success: false,
          });
        }
  
        // Return success response with deleted employee data
        return res.status(200).json({
          message: "Employee deleted successfully",
          success: true,
          deletedEmployee,
        });
      } catch (error) {
        console.log(error);
        return res.status(500).json({
          message: "Failed to delete employee data",
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