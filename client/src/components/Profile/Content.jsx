import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import Alert from "@mui/material/Alert";
import { Card } from "@mui/material";
import { Scrollbar } from "../Scrollbar";
import Grid from "@mui/material/Grid";
import { useQuery } from "@apollo/client";
import { styled } from "@mui/material/styles";
import { QUERY_COMPLAINTS_RAISED } from "../../utils/queries";
import {
  UPDATE_COMPLAINTS,
  SELECTED_COMPLAINT,
  CLEAR_CURRENT_SELECTED_ITEM,
} from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";
import { useEffect } from "react";
// import global state
import { useComplaintContext } from "../../utils/GlobalState";
import AddComplaint from "../Complaint/AddComplaint";
import { Link, useNavigate } from "react-router-dom";
const columns = [
  {
    field: "address",
    headerClassName: "super-app-theme--header",
    headerName: "Address",
    width: 450,
    minWidth: 150,
    flex: 1,
    editable: true,
  },
  {
    field: "complaint",
    headerName: "Complaint",
    width: 550,
    flex: 1,
    editable: true,
  },
  {
    field: "date",
    headerName: "Date",
    width: 110,
    flex: 0.3,
    editable: true,
  },
  {
    field: "status",
    headerName: "Status",
    width: 110,
    flex: 1,
    editable: true,
  },
  {
    field: "property",
    headerName: "Property",
    width: 110,
    editable: true,
  },
  {
    field: "quotes",
    headerName: "Quotes",
    width: 110,
    editable: true,
  },
];
const SIDE_NAV_WIDTH = 280;
const LayoutRoot = styled("div")(({ theme }) => ({
  display: "flex",
  flex: "1 1 auto",
  maxWidth: "100%",
  [theme.breakpoints.up("lg")]: {
    paddingLeft: SIDE_NAV_WIDTH,
  },
}));

const LayoutContainer = styled("div")({
  display: "flex",
  flex: "1 1 auto",
  flexDirection: "column",
  width: "100%",
});
export default function Content() {
  const navigate = useNavigate();
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
    fetchPolicy: "network-only",
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
      ((comp.status = complaints[i].status),
      (comp.quotes = complaints[i].quotes),
      comps.push(comp));
  }
  const rows = comps;
  let clickedId = "";
  //click event of grid( when a particular complaint is clicked )
  const handleRowClick = (params) => {
    console.log(params.row);
    dispatch({
      type: SELECTED_COMPLAINT,
      selectedComplaint: { ...params.row },
    });
    dispatch({
      type: CLEAR_CURRENT_SELECTED_ITEM,
      selectedItem: "",
    });
    clickedId = params.row.id;
    console.log(clickedId);
    navigate(`/complaint/${clickedId}`);
  };

  if (state.selectedItem === "Add Complaint") return <AddComplaint />;
  else if (state.role === "tenant")
    // return (
    //   <Paper sx={{ maxWidth: 936, margin: "auto", overflow: "hidden" }}>
    //     <AppBar
    //       position="static"
    //       color="default"
    //       elevation={0}
    //       sx={{ borderBottom: "1px solid rgba(0, 0, 0, 0.12)" }}
    //     >
    //       <Toolbar>
    //         <Stack spacing={2} sx={{ height: "100%", width: "100%" }}>
    //           <Box sx={{ height: "100%", width: "100%" }}>
    //             <DataGrid
    //               onRowClick={handleRowClick}
    //               rows={rows}
    //               columns={columns}
    //               columnVisibilityModel={{
    //                 // Hide columns property and quotes, the other columns will remain visible
    //                 quotes: false,
    //                 property: false,
    //               }}
    //               initialState={{
    //                 pagination: {
    //                   paginationModel: {
    //                     pageSize: 15,
    //                   },
    //                 },
    //               }}
    //               pageSizeOptions={[5]}
    //               checkboxSelection
    //               disableRowSelectionOnClick
    //             />
    //           </Box>
    //           {/*{message && <Alert severity="info">{message}</Alert>}*/}
    //         </Stack>
    //       </Toolbar>
    //     </AppBar>
    //   </Paper>
    // );
    return (
      <Grid
        container
        component="main"
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Grid item xs={12} md={8} lg={10}>
          <Card>
            <Scrollbar>
              <DataGrid
                onRowClick={handleRowClick}
                rows={rows}
                columns={columns}
                columnVisibilityModel={{
                  // Hide columns property and quotes, the other columns will remain visible
                  quotes: false,
                  property: false,
                }}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 15,
                    },
                  },
                }}
                pageSizeOptions={[5]}
                disableRowSelectionOnClick
              />
            </Scrollbar>
          </Card>
        </Grid>
      </Grid>
    );
  else
    return (
      <Stack spacing={2} sx={{ height: "100%", width: "100%" }}>
        <Box sx={{ height: "100%", width: "100%" }}>
          <DataGrid
            onRowClick={handleRowClick}
            rows={rows}
            columns={columns}
            columnVisibilityModel={{
              // Hide columns property and quotes, the other columns will remain visible

              property: false,
            }}
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
        {/*{message && <Alert severity="info">{message}</Alert>}*/}
      </Stack>
    );
}
