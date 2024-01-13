import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { useQuery } from "@apollo/client";
import { styled } from "@mui/material/styles";
import { QUERY_COMPLAINTS_RAISED } from "../../utils/queries";

import {
  UPDATE_COMPLAINTS,
  SELECTED_COMPLAINT,
  CLEAR_CURRENT_SELECTED_ITEM,
  UPDATE_COMPLAINT,
} from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";
import { useEffect } from "react";
// import global state
import { useComplaintContext } from "../../utils/GlobalState";
import AddComplaint from "../Complaint/AddComplaint";
import { useNavigate } from "react-router-dom";
import ApproveComplaint from "../Complaint/ApproveComplaint";
const Root = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(1),
  [theme.breakpoints.down("md")]: {
    maxWidth: 300,
  },
  [theme.breakpoints.up("md")]: {
    maxWidth: 500,
  },
  [theme.breakpoints.up("lg")]: {
    maxWidth: "100%",
  },
}));

export default function Content() {
  const [state, dispatch] = useComplaintContext();
  let dateColumnWidth = 150,
    statusColumnWidth = 150;
  if (state.role === "tenant") {
    dateColumnWidth = 350;
    statusColumnWidth = 330;
  }

  const columns = [
    {
      renderHeader: () => <strong>{"Address "}</strong>,
      field: "address",
      headerClassName: "super-app-theme--header",
      headerName: "Address",
      width: 400,
      minWidth: 150,
    },
    {
      renderHeader: () => <strong>{"Complaint "}</strong>,
      field: "complaint",
      headerName: "Complaint",
      width: 502,
      headerClassName: "super-app-theme--header",
    },
    {
      renderHeader: () => <strong>{"Date "}</strong>,
      field: "date",
      headerName: "Date",
      width: dateColumnWidth,
      headerClassName: "super-app-theme--header",
    },
    {
      renderHeader: () => <strong>{"Status "}</strong>,
      field: "status",
      headerName: "Status",
      width: statusColumnWidth,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "property",
      headerName: "Property",
      width: 210,
      headerClassName: "super-app-theme--header",
    },
    {
      renderHeader: () => <strong>{"Quotes "}</strong>,
      field: "quotes",
      headerName: "Quotes",
      headerClassName: "super-app-theme--header",
      width: 390,
      editable: true,
    },
  ];

  const navigate = useNavigate();

  let status = "open";

  if (state.selectedItem) {
    status = state.selectedItem.toLowerCase();
  }
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

      // data.complaintsRaised.forEach((complaint) => {
      //   idbPromise("complaints", "put", complaint);
      // });
    } else if (!loading) {
      //gets the complaints from indexedDB and updates the state complaints
      // idbPromise("complaints", "get").then((complaints) => {
      //   dispatch({
      //     type: UPDATE_COMPLAINTS,
      //     complaints: complaints,
      //   });
      // });
    }
  }, [loading, data, dispatch]);
  console.log(state.complaints);
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
      (comp.quotes = ""),
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
    dispatch({
      type: UPDATE_COMPLAINT,
      updateComplaint: true,
    });
    clickedId = params.row.id;
    // if (state.role === "agent") navigate(`/complaint/${clickedId}`);
    switch (state.role) {
      case "agent":
        navigate(`/complaint/${clickedId}`);
        break;
      case "tenant":
        // dispatch({
        //   type: UPDATE_COMPLAINT,
        //   updateComplaint: true,
        // });
        navigate(`/update/complaint/${clickedId}`);
        break;
      case "owner":
        navigate(`/approve/complaint/${clickedId}`);
        break;
      default:
        break;
    }
  };

  if (state.selectedItem === "Add Complaint") return <AddComplaint />;
  else if (state.updateComplaint) return <AddComplaint />;
  else if (state.role === "tenant")
    return (
      <Root container>
        <Grid item xs={12} md={12} lg={12} component={Paper} elevation={2}>
          <Box
            sx={{
              minWidth: 100,
              height: "100%",
              width: "100%",
              "& .super-app-theme--header": {
                backgroundColor: "#101F33",
                color: "white",
              },
            }}
          >
            <DataGrid
              disableColumnMenu
              getRowClassName={(params) =>
                `super-app-theme--${params.row.status}`
              }
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
          </Box>
        </Grid>
      </Root>
    );
  else
    return (
      <Root container>
        <Grid item xs={12} md={12} lg={12} component={Paper} elevation={2}>
          <Box
            sx={{
              minWidth: 100,
              height: "100%",
              width: "100%",
              "& .super-app-theme--header": {
                backgroundColor: "#101F33",
                color: "white",
              },
            }}
          >
            <DataGrid
              disableColumnMenu
              getRowClassName={(params) =>
                `super-app-theme--${params.row.status}`
              }
              onRowClick={handleRowClick}
              rows={rows}
              columns={columns}
              columnVisibilityModel={{
                // Hide column property, the other columns will remain visible

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
          </Box>
        </Grid>
      </Root>
    );
}
