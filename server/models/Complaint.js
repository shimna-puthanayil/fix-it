const { Schema, model } = require("mongoose");
const complaintSchema = new Schema({
  complaint: {
    type: String,
    required: true,
    trim: true,
  },
  property: { type: Schema.Types.ObjectId, ref: "Property", required: true },
  date: { type: Date, default: Date.now },
  status: {
    type: String,
    required: true,
    trim: true,
    default: "open",
  },
  // quotes: {
  //   type: String,
  //   default: "",
  // },
  quotes: [
    {
      businessName: {
        type: String,
        required: true,
        trim: true,
        default: "",
      },

      address: {
        type: String,
        trim: true,
        default: "",
      },
      //   get current date
      quote: {
        type: String,
        required: true,
        default: "",
      },
    },
  ],
});
const Complaint = new model("Complaint", complaintSchema);
module.exports = Complaint;
