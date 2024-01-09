import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { useEffect } from "react";
// import theme from "../styles/theme";
import Auth from "../../utils/auth";
import { styled } from "@mui/material/styles";
// import global state
import { useComplaintContext } from "../../utils/GlobalState";
import { UPDATE_ROLE } from "../../utils/actions";
const ColorBar = styled(AppBar)(({ theme }) => ({
  color: "white",
  background:
    "linear-gradient(to right ,#457373,#7FA6A6, #B2C9CB,#7FA6A6,#487B7B)",
}));
function Header(props) {
  const { onDrawerToggle } = props;
  const [state, dispatch] = useComplaintContext();
  let title = "Open",
    role = "";

  if (Auth.loggedIn) {
    role = Auth.getProfile().data.role;
    useEffect(() => {
      dispatch({
        type: UPDATE_ROLE,
        role: role,
      });
    }, [dispatch]);
    if (state.selectedItem === "Add Complaint") title = "";
    else if (role === "tenant" && state.selectedItem === "My Complaints") {
      title = "My Complaints";
    } else title = state.selectedItem;
    console.log(title);
  }
  return (
    <React.Fragment>
      <ColorBar position="sticky" elevation={0} sx={{ height: 80 }}>
        <Toolbar>
          <Grid container spacing={1} alignItems="center">
            <Grid item xs>
              <Typography
                color="inherit"
                variant="h6"
                fontWeight={"bold"}
                component="h1"
                my={2.8}
              >
                {title}
              </Typography>
            </Grid>
            <Grid sx={{ display: { sm: "none", xs: "block" } }} item>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={onDrawerToggle}
                edge="start"
              >
                <MenuIcon />
              </IconButton>
            </Grid>
            <Grid item xs />

            <Grid item>
              <Tooltip title="Alerts • No alerts">
                <IconButton color="inherit">
                  <NotificationsIcon />
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid item>
              <IconButton color="inherit" sx={{ p: 0.5 }}>
                <Avatar src="/static/images/avatar/1.jpg" alt="My Avatar" />
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </ColorBar>
    </React.Fragment>
  );
}

Header.propTypes = {
  onDrawerToggle: PropTypes.func.isRequired,
};

export default Header;
