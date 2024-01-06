import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { QUERY_COMPLAINTS_RAISED_TO_AGENT } from "../utils/queries";
import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import { idbPromise } from "../utils/helpers";
import { UPDATE_COMPLAINTS } from "../utils/actions";
import { useComplaintContext } from "../utils/GlobalState";
const columns = [
  {
    field: "address",
    headerName: "Address",
    width: 150,
    editable: true,
  },
  {
    field: "complaint",
    headerName: "Complaint",
    width: 150,
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

const Profile = () => {
  const [state, dispatch] = useComplaintContext();
  let complaints = [],
    comps = [];
  const { loading, data } = useQuery(QUERY_COMPLAINTS_RAISED_TO_AGENT);
  useEffect(() => {
    if (data) {
      //dispatches the action UPDATE_COMPLAINTS to update the state with new complaints
      dispatch({
        type: UPDATE_COMPLAINTS,
        complaints: data.complaintsRaisedToAgent,
      });
      //update indexedDB with new complaints
      console.log("dta compl");
      console.log(data.complaintsRaisedToAgent);
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
  // console.log("state ");
  // console.log(state.complaints);
  complaints = state.complaints;
  for (let i = 0; i < complaints.length; i++) {
    ("use strict");

    const comp = {};
    (comp.id = i + 1),
      (comp.complaint = complaints[i].complaint),
      (comp.address = complaints[i].property.address),
      (comp.date = new Date(parseInt(complaints[i].date)).toLocaleDateString()),
      Object.preventExtensions(comp);
    comps.push(comp);
  }
  const rows = comps;

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
};
export default Profile;
