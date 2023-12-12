const { Schema, model } = require("mongoose");
const complaintSchema = new Schema({
  complaint: {
    type: String,
    required: true,
    trim: true,
  },
  property: { type: Schema.Types.ObjectId, ref: "Property", required: true },
});
const Complaint = new model("Complaint", complaintSchema);
module.exports = Complaint;
