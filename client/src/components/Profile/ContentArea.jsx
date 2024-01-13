// import global state
import { useComplaintContext } from "../../utils/GlobalState";

import AddComplaint from "../Complaint/AddComplaint";
import ApproveComplaint from "../Complaint/ApproveComplaint";
import ComplaintDetails from "../Complaint/ComplaintDetails";
import AddProperty from "../Property/AddProperty";
import Properties from "../Property/Properties";
import Content from "./Content";
export default function ContentArea() {
  const [state, dispatch] = useComplaintContext();
  console.log(state.role);
  console.log(state.updateComplaint);
  if (state.updateComplaint && state.role === "tenant") return <AddComplaint />;
  else if (state.updateComplaint && state.role === "agent")
    return <ComplaintDetails />;
  else if (state.updateComplaint && state.role === "owner")
    return <ApproveComplaint />;
  else if (
    state.selectedItem === "Properties" ||
    state.selectedItem === "Houses"
  )
    return <Properties />;
  else if (state.role === "admin")
    return <AddProperty />;
  else return <Content />;
}
