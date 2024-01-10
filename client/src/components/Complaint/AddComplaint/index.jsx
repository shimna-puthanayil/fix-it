import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import { useMutation } from "@apollo/client";
//import methods from files
import Auth from "../../../utils/auth";
import { ADD_COMPLAINT } from "../../../utils/mutations";
import { QUERY_COMPLAINTS_RAISED } from "../../../utils/queries";
const ColorButton = styled(Button)(({ theme }) => ({
  color: "white",
  fontWeight: "bold",
  width: "80%",
  background: "linear-gradient(to right ,#86AEAF,#457373, #457373,#86AEAF)",
}));

export default function AddComplaint() {
  const navigate = useNavigate();
  const [addComplaint] = useMutation(ADD_COMPLAINT, {
    refetchQueries: [QUERY_COMPLAINTS_RAISED, "complaintsRaised"],
  });
  const [complaint, setComplaint] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputOnFocusOut = (e) => {
    const type = e.target.name;
    const value = e.target.value;
    // check if any field left empty and email is invalid and set error message
    if (!value) {
      setErrorMessage("Please enter complaint ");
    } else {
      setErrorMessage("");
      setComplaint("");
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = new FormData(event.currentTarget);
      if (Auth.loggedIn()) {
        console.log("complaint");
        console.log(complaint);
        const response = await addComplaint({
          variables: {
            complaint: complaint,
          },
        });
        setComplaint("");
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
          <Avatar sx={{ m: 1, bgcolor: "#457373" }}>
            <DriveFileRenameOutlineIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Raise A Complaint
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
                    value={complaint}
                    onChange={(e) => setComplaint(e.target.value)}
                    id="standard-multiline-static"
                    label="Complaint"
                    name="complaint"
                    multiline
                    variant="standard"
                  />
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
