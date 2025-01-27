import { hash } from "bcrypt";
import Employee from "../../Database/models/Employee.model.js";

export const CreateEmployee = async(req, res) => {
  if (req.role == "Admin") {
    console.log(req.role)
    const {id, name, email, password, role, attendance, salary } = req.body;
    const hashedPassword = await hash(password,12)
    const NewEmployee = { id,name, email, password:hashedPassword, role, attendance, salary }
    const alreadyEmployee = await Employee.findOne({ email });

    if (alreadyEmployee) {
      throw new Error("Employee already exists with this email");
    }
    try {

      const AddedEmployee =await Employee.create(NewEmployee).catch(err => console.log(err)
      )
      console.log(AddedEmployee)
      return res.status(200).json({
        message: "New Employee added successfully",
        success: true,
        AddedEmployee
      });
    } catch (error) {
      console.log(error)
      return res.status(500).json({
        message: "Failed to add new Employee",
        success: false,
        error
      });
    }
  } else {
    return res.status(403).json({
      message: "Unauthorized access",
      success: false,
    });
  }
};
