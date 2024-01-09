import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { useQuery } from "@apollo/client";
import { QUERY_COMPLAINTS_RAISED_TO_AGENT } from "../../utils/queries";
import { UPDATE_COMPLAINTS } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";
import Complaint from "../Complaint/AddComplaint";
import { useEffect } from "react";
// import global state
import { useComplaintContext } from "../../utils/GlobalState";
import AddComplaint from "../Complaint/AddComplaint";
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
];

export default function Content() {
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
  const { loading, data } = useQuery(QUERY_COMPLAINTS_RAISED_TO_AGENT, {
    variables: status,
  });

  useEffect(() => {
    if (data) {
      //dispatches the action UPDATE_COMPLAINTS to update the state with new complaints
      dispatch({
        type: UPDATE_COMPLAINTS,
        complaints: data.complaintsRaisedToAgent,
      });
      //update indexedDB with new complaints
      data.complaintsRaisedToAgent.forEach((complaint) => {
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
  for (let i = 0; i < complaints.length; i++) {
    const comp = {};
    (comp.id = i + 1),
      (comp.complaint = complaints[i].complaint),
      (comp.address = complaints[i].property.address),
      (comp.date = new Date(parseInt(complaints[i].date)).toLocaleDateString()),
      ((comp.status = complaints[i].status), comps.push(comp));
  }
  const rows = comps;
  const handleRowClick = (params) => {
    window.location.assign("/complaint");
    setMessage(`Movie "${params.row.address}" clicked`);
  };
  if (state.selectedItem === "Add Complaint") {
    console.log("add complaint");
    return <AddComplaint />;
  } else
    return (
      <Stack spacing={2} sx={{ height: "100%", width: "100%" }}>
        <Box sx={{ height: "100%", width: "100%" }}>
          <DataGrid
            onRowClick={handleRowClick}
            rows={rows}
            columns={columns}
            initialState={{
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
        </Box>
        {message && <Alert severity="info">{message}</Alert>}
      </Stack>
    );
}
