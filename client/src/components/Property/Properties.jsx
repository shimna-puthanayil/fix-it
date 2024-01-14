import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { useQuery } from "@apollo/client";
import { styled } from "@mui/material/styles";
import { QUERY_PROPERTIES_BY_USER } from "../../utils/queries";
import { UPDATE_PROPERTIES, UPDATE_PROPERTY } from "../../utils/actions";
import { useEffect } from "react";
// import global state
import { useComplaintContext } from "../../utils/GlobalState";
import { useNavigate } from "react-router-dom";

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

export default function Properties() {
  const [state, dispatch] = useComplaintContext();

  const columns = [
    {
      renderHeader: () => <strong>{"Address "}</strong>,
      field: "address",
      headerClassName: "super-app-theme--header",
      headerName: "Address",
      width: 370,
    },
    {
      renderHeader: () => <strong>{"Owner "}</strong>,
      field: "owner",
      headerName: "Owner",
      width: 355,
      headerClassName: "super-app-theme--header",
    },
    {
      renderHeader: () => <strong>{"Agent "}</strong>,
      field: "agent",
      headerName: "Agent",
      width: 355,
      headerClassName: "super-app-theme--header",
    },
    {
      renderHeader: () => <strong>{"Tenant "}</strong>,
      field: "tenant",
      headerName: "Tenant",
      width: 355,
      headerClassName: "super-app-theme--header",
    },
  ];

  const navigate = useNavigate();
  let status = "open";
  if (state.selectedItem) {
    status = state.selectedItem.toLowerCase();
  }

  const { loading, data } = useQuery(QUERY_PROPERTIES_BY_USER, {
    variables: { role: state.role },
    fetchPolicy: "network-only",
  });
  console.log(state.role);
  console.log(data);

  useEffect(() => {
    if (data) {
      //dispatches the action UPDATE_PROPERTIES to update the state with properties
      dispatch({
        type: UPDATE_PROPERTIES,
        properties: data.propertiesByUser,
      });
    }
  }, [loading, data, dispatch]);
  console.log(state.properties);
  const propertyByUser = state.properties.map((property) => ({
    id: property._id,
    address: property.address,
    owner: property.owner.username,
    agent: property.agent.username,
    tenant: property.tenant.username,
  }));
  console.log(propertyByUser);
  const rows = propertyByUser;

  let clickedId = "";
  //click event of grid( when a  property is clicked )
  const handleRowClick = (params) => {
    console.log(params.row);
    clickedId = params.row.id;
    dispatch({
      type: UPDATE_PROPERTY,
      updateProperty: true,
    });
    if (state.role === "admin") navigate(`/update/property/${clickedId}`);
  };
  return (
    <Root container>
      <Grid item xs={12} md={12} lg={11} component={Paper} elevation={2}>
        <Box
          sx={{
            minWidth: 100,
            height: "100%",

            "& .super-app-theme--header": {
              backgroundColor: "#101F33",
              color: "white",
              padding: 2,
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
              // Hide columns id, the other columns will remain visible
              id: false,
            }}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 15,
                },
              },
            }}
            pageSizeOptions={[15]}
            disableRowSelectionOnClick
          />
        </Box>
      </Grid>
    </Root>
  );
}
