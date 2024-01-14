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
import { QUERY_COMPLAINTS_RAISED } from "../../../utils/queries";
// import global state
import { useComplaintContext } from "../../../utils/GlobalState";
import { Divider } from "@mui/material";
import { ADD_APPROVED_QUOTE } from "../../../utils/mutations";
import { CLEAR_UPDATE_COMPLAINT } from "../../../utils/actions";
const ColorButton = styled(Button)(({ theme }) => ({
  color: "white",
  fontWeight: "bold",
  width: "80%",
  background: "linear-gradient(to right ,#86AEAF,#457373, #457373,#86AEAF)",
}));

export default function ApproveComplaint() {
  const [state, dispatch] = useComplaintContext();
  const navigate = useNavigate();
  //mutation to add/update approved quote for complaint
  const [addApprovedQuote] = useMutation(ADD_APPROVED_QUOTE, {
    refetchQueries: [QUERY_COMPLAINTS_RAISED, "complaintsRaised"],
  });
  const [quotes, setQuotes] = useState(state.selectedComplaint.approvedQuote);
  const [errorMessage, setErrorMessage] = useState("");

  const complaintId = state.selectedComplaint.id;
  const quotesOfComplaint = state.complaints.find(
    (x) => x._id === state.selectedComplaint.id
  ).quotes;

  const handleQuotesChange = (event) => {
    setQuotes(event.target.value);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (Auth.loggedIn()) {
        //get selected quote and update approvedQuote in collection complaint
        const response = await addApprovedQuote({
          variables: {
            approvedQuote: quotes,
            complaintId: complaintId,
          },
        });
        dispatch({
          type: CLEAR_UPDATE_COMPLAINT,
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
                  <TextField
                    value={state.selectedComplaint.status}
                    id="standard-multiline-static"
                    label="Status"
                    name="status"
                    multiline
                    variant="standard"
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl variant="standard" sx={{ m: 1 }} fullWidth>
                  <InputLabel id="label-role">Quotes</InputLabel>
                  <Select
                    required
                    labelId="label-status"
                    id="quotes"
                    value={quotes}
                    label="Quotes"
                    name="quotes"
                    onChange={handleQuotesChange}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>

                    {quotesOfComplaint.map((quote) => (
                      <MenuItem
                        key={quote.businessName}
                        value={`Business Name : ${quote.businessName}  |  Address : ${quote.address}  |   Quote : $${quote.quote}`}
                      >
                        <Box
                          sx={{
                            width: "100%",
                            p: 2,
                            bgcolor: "#eaeff1",
                          }}
                        >
                          <Typography mr={1}>
                            <strong>Business Name : </strong>
                            {quote.businessName}
                          </Typography>

                          <Typography mr={1}>
                            <strong> Address : </strong> {quote.address}
                          </Typography>

                          <Typography mr={1}>
                            <strong>Quote : $</strong> {quote.quote}
                          </Typography>
                        </Box>
                        <Divider />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <ColorButton
              type="submit"
              variant="contained"
              sx={{
                mt:4,
                mb: 5,
                mx: "auto",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              Approve
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
