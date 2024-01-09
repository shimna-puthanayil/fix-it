import * as React from "react";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import DnsRoundedIcon from "@mui/icons-material/DnsRounded";
import PermMediaOutlinedIcon from "@mui/icons-material/PhotoSizeSelectActual";
import PublicIcon from "@mui/icons-material/Public";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import Typography from "@mui/material/Typography";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import Avatar from "@mui/material/Avatar";
import { CURRENT_SELECTED_ITEM } from "../../utils/actions";
// import global state
import { useComplaintContext } from "../../utils/GlobalState";

let categories = [
  {
    id: "Complaints",
    children: [
      { id: "Open", icon: <DnsRoundedIcon /> },
      { id: "In Progress", icon: <PermMediaOutlinedIcon /> },
      { id: "Resolved", icon: <PublicIcon /> },
    ],
  },
  {
    id: "Properties",
    children: [{ id: "Houses", icon: <HomeIcon /> }],
  },
];

const categoriesForTenants = [
  {
    id: "Complaints",
    children: [
      { id: "My Complaints", icon: <QuestionAnswerIcon /> },
      { id: "Add Complaint", icon: <NoteAddIcon /> },
    ],
  },
];
const item = {
  py: "2px",
  px: 3,
  color: "rgba(255, 255, 255, 0.7)",
  "&:hover, &:focus": {
    bgcolor: "rgba(255, 255, 255, 0.08)",
  },
};

const itemCategory = {
  boxShadow: "0 -1px 0 rgb(255,255,255,0.1) inset",
  py: 1.5,
  px: 3,
};

export default function Navigator(props) {
  const { ...other } = props;
  const [state, dispatch] = useComplaintContext();
  // click event for items on navigation bar
  const handleClick = async (childId) => {
    dispatch({
      type: CURRENT_SELECTED_ITEM,
      selectedItem: childId,
    });
  };
  if (state.role === "tenant") categories = categoriesForTenants;

  return (
    <Drawer variant="permanent" {...other}>
      <List disablePadding>
        {/* Logo  */}
        <ListItem
          sx={{ ...item, ...itemCategory, fontSize: 22, color: "#fff" }}
        >
          <Avatar
            alt="logo"
            src="./images/logo.png"
            sx={{ width: 56, height: 56 }}
            ml={2}
          />
          <Typography
            variant="h5"
            display="block"
            color={"#86AEAF"}
            fontWeight={"bold"}
            fontFamily={"Alice"}
            ml={2}
            align="left"
            color="grey.700"
            sx={{
              backgroundcolor: "primary",
              backgroundImage: `linear-gradient(to bottom,#B2C9CB,#6E9B9B,#B2C9CB)`,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            FIX - IT
          </Typography>
        </ListItem>

        {categories.map(({ id, children }) => (
          <Box key={id} sx={{ bgcolor: "#101F33" }}>
            <ListItem sx={{ py: 2, px: 3 }}>
              <ListItemText sx={{ color: "#fff" }}>{id}</ListItemText>
            </ListItem>
            {children.map(({ id: childId, icon, active }) => (
              <ListItem disablePadding key={childId}>
                <ListItemButton
                  selected={active}
                  sx={item}
                  onClick={() => handleClick(childId)}
                >
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText>{childId}</ListItemText>
                </ListItemButton>
              </ListItem>
            ))}
            <Divider sx={{ mt: 2 }} />
          </Box>
        ))}
      </List>
    </Drawer>
  );
}
