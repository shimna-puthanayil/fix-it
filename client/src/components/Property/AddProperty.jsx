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
import Auth from "../../utils/auth";
import { QUERY_PROPERTY } from "../../utils/queries";
// import global state
import { useComplaintContext } from "../../utils/GlobalState";
import AddHomeWorkIcon from "@mui/icons-material/AddHomeWork";
import { ADD_PROPERTY } from "../../utils/mutations";
const ColorButton = styled(Button)(({ theme }) => ({
  color: "white",
  fontWeight: "bold",
  width: "80%",
  background: "linear-gradient(to right ,#86AEAF,#457373, #457373,#86AEAF)",
}));

export default function AddProperty() {
  // const complaintId = state.selectedComplaint.id;
  const agents = [],
    owners = [],
    tenants = [];
  const [state, dispatch] = useComplaintContext();
  const navigate = useNavigate();
  //mutation to add/update approved quote for complaint
  const [addApprovedQuote] = useMutation(ADD_PROPERTY, {
    refetchQueries: [QUERY_PROPERTY, "properties"],
  });
  const [owner, setOwner] = useState("");
  const [agent, setAgent] = useState("");
  const [tenant, setTenant] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleOwnerChange = (event) => {
    setOwner(event.target.value);
  };
  const handleAgentChange = (event) => {
    setAgent(event.target.value);
  };
  const handleTenantChange = (event) => {
    setTenant(event.target.value);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log(quotes);
      if (Auth.loggedIn()) {
        //get selected quote and update approvedQuote in collection complaint
        const response = await addApprovedQuote({
          variables: {
            approvedQuote: quotes,
            complaintId: complaintId,
          },
        });
        navigate("/profile");
      }
    } catch (error) {
      setErrorMessage("Something went wrong!");
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
            }}
          >
            <AddHomeWorkIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Enter Property Details
          </Typography>

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
                <FormControl variant="standard" sx={{ m: 1 }} fullWidth>
                  <InputLabel id="label-role">Owner</InputLabel>
                  <Select
                    required
                    labelId="label-owner"
                    id="owner"
                    value={owner}
                    label="Owner"
                    name="owner"
                    onChange={handleOwnerChange}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>

                    {agents.map((quote) => (
                      <MenuItem key="" value=""></MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl variant="standard" sx={{ m: 1 }} fullWidth>
                  <InputLabel id="label-role">Agent</InputLabel>
                  <Select
                    required
                    labelId="label-agent"
                    id="agent"
                    value={agent}
                    label="Agent"
                    name="agent"
                    onChange={handleAgentChange}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>

                    {owners.map((quote) => (
                      <MenuItem key="" value=""></MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl variant="standard" sx={{ m: 1 }} fullWidth>
                  <InputLabel id="label-role">Tenant</InputLabel>
                  <Select
                    required
                    labelId="label-tenant"
                    id="tenant"
                    value={tenant}
                    label="Tenant"
                    name="tenant"
                    onChange={handleTenantChange}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>

                    {tenants.map((quote) => (
                      <MenuItem key="" value=""></MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

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
