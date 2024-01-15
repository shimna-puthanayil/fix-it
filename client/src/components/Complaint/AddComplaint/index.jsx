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
import {
  CLEAR_UPDATE_COMPLAINT,
  CLEAR_CURRENT_SELECTED_ITEM,
} from "../../../utils/actions";
import { ADD_COMPLAINT, UPDATE_COMPLAINT } from "../../../utils/mutations";
import { QUERY_COMPLAINTS_RAISED } from "../../../utils/queries";
// import global state
import { useComplaintContext } from "../../../utils/GlobalState";
const ColorButton = styled(Button)(({ theme }) => ({
  color: "white",
  fontWeight: "bold",
  width: "80%",
  background: "linear-gradient(to right ,#86AEAF,#457373, #457373,#86AEAF)",
}));

export default function AddComplaint() {
  const [state, dispatch] = useComplaintContext();
  const navigate = useNavigate();
  const [addComplaint] = useMutation(ADD_COMPLAINT, {
    refetchQueries: [QUERY_COMPLAINTS_RAISED, "complaintsRaised"],
  });
  const [updateComplaint] = useMutation(UPDATE_COMPLAINT, {
    refetchQueries: [QUERY_COMPLAINTS_RAISED, "complaintsRaised"],
  });
  let [complaint, setComplaint] = useState("");
  if (state.updateComplaint) {
    [complaint, setComplaint] = useState(state.selectedComplaint.complaint);
  }
  const [errorMessage, setErrorMessage] = useState("");
  const [errors, setErrors] = useState({});
  const handleInputOnFocusOut = (e) => {
    const value = e.target.value;

    const temp = { ...errors };
    // check if the complaint is invalid and set error message
    if (value) {
      temp.complaint = !value ? "Please enter complaint" : "";
    }
    //set error messages in errors
    setErrors({
      ...temp,
    });
  };
  //function to  validate field
  const validate = (data) => {
    let temp = { ...errors };
    // check if the complaint is entered and set error message if empty
    temp.complaint = !complaint ? "Please enter complaint" : "";
    setErrors({
      ...temp,
    });
    return Object.values(temp).every((x) => x == "");
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = new FormData(event.currentTarget);
      if (Auth.loggedIn()) {
        if (validate(data)) {
          if (state.updateComplaint) {
            const response = await updateComplaint({
              variables: {
                complaint: complaint,
                quotes: [],
                status: "",
                complaintId: state.selectedComplaint.id,
              },
            });
            dispatch({
              type: CLEAR_UPDATE_COMPLAINT,
            });
          } else {
            const response = await addComplaint({
              variables: {
                complaint: complaint,
              },
            });
            dispatch({
              type: CLEAR_CURRENT_SELECTED_ITEM,
            });
          }
          setComplaint("");
          navigate("/profile");
        }
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
        sm={12}
        md={12}
        component={Paper}
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

          {state.updateComplaint ? (
            <Typography component="h1" variant="h5">
              Update Complaint{" "}
            </Typography>
          ) : (
            <Typography component="h1" variant="h5">
              Raise A Complaint{" "}
            </Typography>
          )}

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
                    onBlur={handleInputOnFocusOut}
                    error={errors.complaint ? true : false}
                    helperText={errors.complaint}
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
