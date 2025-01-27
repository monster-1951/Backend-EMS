import mongoose, { Mongoose, Schema } from "mongoose";

const EmployeeSchema = new Schema(
  {
    id: {
      type: Number,
      unique: true,
      required: [true, "Employee ID is required"],
    },
    position:{
      type:String,
      required:[true, "Employee position is required"],
    },
    name: {
      type: String,
      required: [true, "Please provide your name"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Please provide a valid email"],
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      select: false,
    },
    role: {
      type: String,
      enum: {
        values: ["Employee", "Admin"],
        message: "Please select your role",
      },
      default: "Employee",
    },
    attendance: [
      {
        date: {
          type: String,
          required: true,
        },
        status: {
          type: String,
          required: true,
          enum: ["Present", "Absent", "Leave"], // Ensure the status is one of these values
        },
      },
    ],
    salary: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Employee =
  mongoose.models.Employee || mongoose.model("Employee", EmployeeSchema);

export default Employee;
