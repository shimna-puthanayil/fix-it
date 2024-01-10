import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import { styled } from "@mui/material/styles";
import { useMutation } from "@apollo/client";
import Select from "@mui/material/Select";
import SpeakerNotesIcon from "@mui/icons-material/SpeakerNotes";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
//import methods from files
import Auth from "../../../utils/auth";
import { UPDATE_COMPLAINT } from "../../../utils/mutations";
import { QUERY_COMPLAINTS_RAISED } from "../../../utils/queries";
// import global state
import { useComplaintContext } from "../../../utils/GlobalState";
import Quotes from "../../Quotes";
const ColorButton = styled(Button)(({ theme }) => ({
  color: "white",
  fontWeight: "bold",
  width: "80%",
  background: "linear-gradient(to right ,#86AEAF,#457373, #457373,#86AEAF)",
}));

export default function ComplaintDetails() {
  // const complaintId = state.selectedComplaint.id;

  const [state, dispatch] = useComplaintContext();
  const navigate = useNavigate();
  const [updateComplaint] = useMutation(UPDATE_COMPLAINT, {
    refetchQueries: [QUERY_COMPLAINTS_RAISED, "complaintsRaised"],
  });

  const [status, setStatus] = useState(state.selectedComplaint.status);
  const [quotes, setQuotes] = useState(state.selectedComplaint.quotes);
  const [errorMessage, setErrorMessage] = useState("");
  const complaintId = state.selectedComplaint.id;
  console.log(complaintId);
  // const handleInputOnFocusOut = (e) => {
  //   const type = e.target.name;
  //   const value = e.target.value;
  //   // check if any field left empty and email is invalid and set error message
  //   if (!value) {
  //     setErrorMessage("Please enter quotes ");
  //   } else {
  //     setErrorMessage("");

  //     setStatus("");
  //   }
  // };
  const handleChange = (event) => {
    setStatus(event.target.value);
  };
  const handleQuotesChange = (event) => {
    setQuotes(event.target.value);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = new FormData(event.currentTarget);
      if (Auth.loggedIn()) {
        const response = await updateComplaint({
          variables: {
            quotes: quotes,
            status: status,
            complaintId: complaintId,
          },
        });
        navigate("/profile");
      }
    } catch (error) {
      setErrorMessage("Please enter required fields");
    }
  };

  return (
    <Grid
      container
      component="main"
      sx={{
        height: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <CssBaseline />

      <Grid
        item
        xs={12}
        sm={8}
        md={10}
        component={Paper}
        elevation={6}
        square
        sx={{
          width: "100%",
        }}
      >
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar
            sx={{
              backgroundImage: `linear-gradient(to bottom,#86AEAF,#457373,#86AEAF)`,

              width: 56,
              height: 56,
              m: 1,
              bgcolor: "#457373",
            }}
          >
            <SpeakerNotesIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Complaint
          </Typography>
          <Typography component="h5">{state.selectedComplaint.date}</Typography>
          <Box
            width={"80%"}
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={10}>
              <Grid item xs={12}>
                <FormControl sx={{ m: 1 }} fullWidth>
                  <TextField
                    value={state.selectedComplaint.address}
                    onChange={(e) => setComplaint(e.target.value)}
                    id="standard-multiline-static"
                    label="Address"
                    name="address"
                    multiline
                    variant="standard"
                    aria-readonly
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl sx={{ m: 1 }} fullWidth>
                  <TextField
                    value={state.selectedComplaint.complaint}
                    onChange={(e) => setComplaint(e.target.value)}
                    id="standard-multiline-static"
                    label="Complaint"
                    name="complaint"
                    multiline
                    variant="standard"
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl sx={{ m: 1 }} fullWidth>
                  <InputLabel id="label-role">Status</InputLabel>
                  <Select
                    required
                    labelId="label-status"
                    id="status"
                    value={status}
                    label="Status"
                    name="status"
                    onChange={handleChange}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={"open"}>Open</MenuItem>
                    <MenuItem value={"in progress"}>In Progress</MenuItem>
                    <MenuItem value={"resolved"}>Resolved</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl sx={{ m: 1 }} fullWidth>
                  <TextField
                    value={quotes}
                    id="standard-multiline-static"
                    label="Quotes"
                    name="quotes"
                    multiline
                    variant="standard"
                    onChange={handleQuotesChange}
                  />
                </FormControl>
              </Grid>
            </Grid>
            <Quotes />
            <ColorButton
              type="submit"
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                mx: "auto",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              Submit
            </ColorButton>
          </Box>
        </Box>
        {/* if state of error message changes */}
        {errorMessage && (
          <Typography ml={4} color="red">
            {errorMessage}
          </Typography>
        )}
      </Grid>
    </Grid>
  );
}
