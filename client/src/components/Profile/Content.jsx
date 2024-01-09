import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import { useQuery } from "@apollo/client";
import { QUERY_COMPLAINTS_RAISED } from "../../utils/queries";
import { UPDATE_COMPLAINTS, SELECTED_COMPLAINT } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";
import Complaint from "../Complaint/AddComplaint";
import { useEffect } from "react";
// import global state
import { useComplaintContext } from "../../utils/GlobalState";
import AddComplaint from "../Complaint/AddComplaint";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const columns = [
  {
    field: "address",
    headerName: "Address",
    width: 450,
    editable: true,
  },
  {
    field: "complaint",
    headerName: "Complaint",
    width: 550,
    editable: true,
  },
  {
    field: "date",
    headerName: "Date",

    width: 110,
    editable: true,
  },
  {
    field: "status",
    headerName: "Status",

    width: 110,
    editable: true,
  },
  {
    field: "property",
    headerName: "Property",

    width: 110,
    editable: true,
  },
];

export default function Content() {
  const navigate = useNavigate();
  const [message, setMessage] = React.useState("");
  const [state, dispatch] = useComplaintContext();
  let status = "open";

  if (state.selectedItem) {
    status = state.selectedItem.toLowerCase();
  }
  console.log(status);
  console.log(state.complaints);
  let complaints = [],
    comps = [];
  const { loading, data } = useQuery(QUERY_COMPLAINTS_RAISED, {
    variables: status,
  });

  useEffect(() => {
    if (data) {
      //dispatches the action UPDATE_COMPLAINTS to update the state with new complaints
      dispatch({
        type: UPDATE_COMPLAINTS,
        complaints: data.complaintsRaised,
      });
      //update indexedDB with new complaints
      data.complaintsRaised.forEach((complaint) => {
        idbPromise("complaints", "put", complaint);
      });
    } else if (!loading) {
      //gets the complaints from indexedDB and updates the state complaints
      idbPromise("complaints", "get").then((complaints) => {
        dispatch({
          type: UPDATE_COMPLAINTS,
          complaints: complaints,
        });
      });
    }
  }, [loading, data, dispatch]);

  function filterComplaints() {
    //returns  complaints based on status for owner and agent login
    return state.complaints.filter((complaint) => complaint.status === status);
  }
  function filterComplaintsForTenants() {
    //returns  complaints raised by tenants with status in progress or open
    return state.complaints.filter(
      (complaint) =>
        complaint.status === "open" || complaint.status === "in progress"
    );
  }
  if (state.role === "tenant") complaints = filterComplaintsForTenants();
  else complaints = filterComplaints();
  console.log(complaints);
  for (let i = 0; i < complaints.length; i++) {
    const comp = {};
    (comp.id = i + 1),
      (comp.id = complaints[i]._id),
      (comp.complaint = complaints[i].complaint),
      (comp.address = complaints[i].property.address),
      (comp.date = new Date(parseInt(complaints[i].date)).toLocaleDateString()),
      ((comp.status = complaints[i].status), comps.push(comp));
  }
  const rows = comps;
  //click event of grid( when a particular complaint is clicked )
  const handleRowClick = (params) => {
    console.log(params.row);
    dispatch({
      type: SELECTED_COMPLAINT,
      selectedComplaint: { ...params.row },
    });
  };

  if (state.selectedItem === "Add Complaint") {
    console.log("add complaint");
    return <AddComplaint />;
  } else
    return (
      <Stack spacing={2} sx={{ height: "100%", width: "100%" }}>
        <Box sx={{ height: "100%", width: "100%" }}>
          <Link to={"/complaint"}>
            <DataGrid
              onRowClick={handleRowClick}
              rows={rows}
              columns={columns}
              initialState={{
                columns: {
                  columnVisibilityModel: {
                    // Hide columns status and traderName, the other columns will remain visible
                    property: false,
                  },
                },
                pagination: {
                  paginationModel: {
                    pageSize: 15,
                  },
                },
              }}
              pageSizeOptions={[5]}
              checkboxSelection
              disableRowSelectionOnClick
            />
          </Link>
        </Box>
        {/*{message && <Alert severity="info">{message}</Alert>}*/}
      </Stack>
    );
}
