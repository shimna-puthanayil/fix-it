// import * as React from "react";
// import Box from "@mui/material/Box";
// import Stack from "@mui/material/Stack";
// import Alert from "@mui/material/Alert";
// import { DataGrid } from "@mui/x-data-grid";
// import { QUERY_COMPLAINTS_RAISED_TO_AGENT } from "../utils/queries";
// import { useQuery } from "@apollo/client";
// import { useEffect } from "react";
// import { idbPromise } from "../utils/helpers";
// import { UPDATE_COMPLAINTS } from "../utils/actions";
// import { useComplaintContext } from "../utils/GlobalState";
// import Complaint from "../components/Complaint";
// const columns = [
//   {
//     field: "address",
//     headerName: "Address",
//     width: 150,
//     editable: true,
//   },
//   {
//     field: "complaint",
//     headerName: "Complaint",
//     width: 150,
//     editable: true,
//   },
//   {
//     field: "date",
//     headerName: "Date",

//     width: 110,
//     editable: true,
//   },
//   {
//     field: "status",
//     headerName: "Status",

//     width: 110,
//     editable: true,
//   },
// ];

// const Profile = () => {
//   const [message, setMessage] = React.useState("");
//   const [state, dispatch] = useComplaintContext();
//   let complaints = [],
//     comps = [];
//   const { loading, data } = useQuery(QUERY_COMPLAINTS_RAISED_TO_AGENT);
//   useEffect(() => {
//     if (data) {
//       //dispatches the action UPDATE_COMPLAINTS to update the state with new complaints
//       dispatch({
//         type: UPDATE_COMPLAINTS,
//         complaints: data.complaintsRaisedToAgent,
//       });
//       //update indexedDB with new complaints
//       console.log("dta compl");
//       console.log(data.complaintsRaisedToAgent);
//       data.complaintsRaisedToAgent.forEach((complaint) => {
//         idbPromise("complaints", "put", complaint);
//       });
//     } else if (!loading) {
//       //gets the complaints from indexedDB and updates the state complaints
//       idbPromise("complaints", "get").then((complaints) => {
//         dispatch({
//           type: UPDATE_COMPLAINTS,
//           complaints: complaints,
//         });
//       });
//     }
//   }, [loading, data, dispatch]);
//   // console.log("state ");
//   // console.log(state.complaints);
//   complaints = state.complaints;
//   for (let i = 0; i < complaints.length; i++) {
//     // ("use strict");

//     const comp = {};
//     (comp.id = i + 1),
//       (comp.complaint = complaints[i].complaint),
//       (comp.address = complaints[i].property.address),
//       (comp.date = new Date(parseInt(complaints[i].date)).toLocaleDateString()),
//       ((comp.status = complaints[i].status),
//       // Object.preventExtensions(comp);
//       comps.push(comp));
//   }
//   const rows = comps;
//   const handleRowClick = (params) => {
//     window.location.assign("/complaint");
//     setMessage(`Movie "${params.row.address}" clicked`);
//   };
//   return (
//     <Stack spacing={2} sx={{ width: "100%" }}>
//       <Box sx={{ height: 400, width: "100%" }}>
//         <DataGrid
//           onRowClick={handleRowClick}
//           rows={rows}
//           columns={columns}
//           initialState={{
//             pagination: {
//               paginationModel: {
//                 pageSize: 5,
//               },
//             },
//           }}
//           pageSizeOptions={[5]}
//           checkboxSelection
//           disableRowSelectionOnClick
//         />
//       </Box>
//       {message && <Alert severity="info">{message}</Alert>}
//     </Stack>
//   );
// };
// export default Profile;
import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Navigator from "./Navigator";
import Content from "./Content";
import Header from "./Header";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}.
    </Typography>
  );
}

let theme = createTheme({
  palette: {
    primary: {
      light: "#63ccff",
      main: "#009be5",
      dark: "#006db3",
    },
  },
  typography: {
    h5: {
      fontWeight: 500,
      fontSize: 26,
      letterSpacing: 0.5,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiTab: {
      defaultProps: {
        disableRipple: true,
      },
    },
  },
  mixins: {
    toolbar: {
      minHeight: 48,
    },
  },
});

theme = {
  ...theme,
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "#081627",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
        contained: {
          boxShadow: "none",
          "&:active": {
            boxShadow: "none",
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          marginLeft: theme.spacing(1),
        },
        indicator: {
          height: 3,
          borderTopLeftRadius: 3,
          borderTopRightRadius: 3,
          backgroundColor: theme.palette.common.white,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: "none",
          margin: "0 16px",
          minWidth: 0,
          padding: 0,
          [theme.breakpoints.up("md")]: {
            padding: 0,
            minWidth: 0,
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          padding: theme.spacing(1),
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          borderRadius: 4,
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          backgroundColor: "rgb(255,255,255,0.15)",
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            color: "#4fc3f7",
          },
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          fontSize: 14,
          fontWeight: theme.typography.fontWeightMedium,
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: "inherit",
          minWidth: "auto",
          marginRight: theme.spacing(2),
          "& svg": {
            fontSize: 20,
          },
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          width: 32,
          height: 32,
        },
      },
    },
  },
};

const drawerWidth = 256;

export default function Paperbase() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex", minHeight: "100vh" }}>
        <CssBaseline />
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >
          {isSmUp ? null : (
            <Navigator
              PaperProps={{ style: { width: drawerWidth } }}
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
            />
          )}
          {/*Navigator */}
          <Navigator
            PaperProps={{ style: { width: drawerWidth } }}
            sx={{ display: { sm: "block", xs: "none" } }}
          />
        </Box>
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <Header onDrawerToggle={handleDrawerToggle} />
          <Box
            component="main"
            sx={{ flex: 1, py: 6, px: 4, bgcolor: "#eaeff1" }}
          >
            <Content />
          </Box>
          <Box component="footer" sx={{ p: 2, bgcolor: "#eaeff1" }}>
            <Copyright />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
