import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
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
import { useQuery, useMutation, NetworkStatus } from "@apollo/client";
import Select from "@mui/material/Select";
import { FormHelperText } from "@material-ui/core";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
//import methods from files
import Auth from "../../utils/auth";
import { QUERY_PROPERTIES_BY_USER } from "../../utils/queries";
// import global state
import { useComplaintContext } from "../../utils/GlobalState";
import AddHomeWorkIcon from "@mui/icons-material/AddHomeWork";
import { ADD_PROPERTY, UPDATE_PROPERTY } from "../../utils/mutations";
import { QUERY_USERS } from "../../utils/queries";
import {
  UPDATE_USERS,
  CLEAR_UPDATE_PROPERTY,
  CLEAR_CURRENT_SELECTED_ITEM,
} from "../../utils/actions";

const ColorButton = styled(Button)(({ theme }) => ({
  color: "white",
  fontWeight: "bold",
  width: "80%",
  background: "linear-gradient(to right ,#86AEAF,#457373, #457373,#86AEAF)",
}));

export default function AddProperty() {
  let owners,
    agents,
    tenants = [];
  let propertyId;
  const [state, dispatch] = useComplaintContext();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const { loading, data } = useQuery(QUERY_USERS);
  const [addProperty] = useMutation(ADD_PROPERTY, {
    refetchQueries: [QUERY_PROPERTIES_BY_USER, "propertiesByUser"],
    fetchPolicy: "network-only",
  });

  const [updateProperty] = useMutation(UPDATE_PROPERTY, {
    refetchQueries: [QUERY_PROPERTIES_BY_USER, "propertiesByUser"],
  });

  useEffect(() => {
    if (data) {
      //dispatches the action UPDATE_USERS to update the state with users
      dispatch({
        type: UPDATE_USERS,
        users: data.users,
      });
    }
  }, [loading, data, dispatch]);

  function filterUsers(role) {
    //returns users based on role
    return state.users.filter((user) => user.role === role);
  }
  tenants = filterUsers("tenant");
  owners = filterUsers("owner");
  agents = filterUsers("agent");

  let [owner, setOwner] = useState("");
  let [agent, setAgent] = useState("");
  let [tenant, setTenant] = useState("");
  let [address, setAddress] = useState("");
  let [errorMessage, setErrorMessage] = useState("");

  if (state.updateProperty) {
    const { id } = useParams();
    const selectedProperty = state.properties.find(
      (property) => property._id === id
    );

    [owner, setOwner] = useState(selectedProperty.owner._id);
    [agent, setAgent] = useState(selectedProperty.agent._id);
    [tenant, setTenant] = useState(selectedProperty.tenant._id);
    [address, setAddress] = useState(selectedProperty.address);
    propertyId = selectedProperty._id;
  }
  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };
  const handleOwnerChange = (event) => {
    setOwner(event.target.value);
  };
  const handleAgentChange = (event) => {
    setAgent(event.target.value);
  };
  const handleTenantChange = (event) => {
    setTenant(event.target.value);
  };
  const handleInputOnFocusOut = (e) => {
    const value = e.target.value;
    console.log("changed");
    const temp = { ...errors };
    // check if the fields are invalid and set error message
    if (value) {
      temp.address = !address ? "Please enter address" : "";
      temp.owner = !owner ? "Please select owner" : "";
      temp.agent = !agent ? "Please select agent" : "";
      temp.tenant = !tenant ? "Please select tenant" : "";
    }
    //set error messages in errors
    setErrors({
      ...temp,
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (validate()) {
        const property = {};
        (property.address = address),
          (property.owner = owner),
          (property.agent = agent),
          (property.tenant = tenant);

        if (Auth.loggedIn()) {
          //update property details
          if (state.updateProperty) {
            const response = await updateProperty({
              variables: {
                propertyDetails: property,
                propertyId: propertyId,
              },
            });
            dispatch({
              type: CLEAR_UPDATE_PROPERTY,
            });
          } else {
            //add property details
            const response = await addProperty({
              variables: {
                propertyDetails: property,
              },
            });

            dispatch({
              type: CLEAR_CURRENT_SELECTED_ITEM,
            });
          }
          navigate("/properties");
        }
      }
    } catch (error) {
      setErrorMessage("Something went wrong!");
    }
  };
  //function to  validate field
  const validate = (data) => {
    let temp = { ...errors };
    // check if the fields are entered and set error messages if empty
    temp.address = !address ? "Please enter address" : "";
    temp.owner = !owner ? "Please select owner" : "";
    temp.agent = !agent ? "Please select agent" : "";
    temp.tenant = !tenant ? "Please select tenant" : "";
    setErrors({
      ...temp,
    });
    return Object.values(temp).every((x) => x == "");
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

          {state.updateProperty ? (
            <Typography component="h1" variant="h5">
              Update Property Details
            </Typography>
          ) : (
            <Typography component="h1" variant="h5">
              Enter Property Details
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
                    value={address}
                    onChange={handleAddressChange}
                    error={errors.address ? true : false}
                    helperText={errors.address}
                    id="standard-multiline-static"
                    label="Address"
                    name="address"
                    multiline
                    variant="standard"
                    aria-readonly
                    onBlur={handleInputOnFocusOut}
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
                    error={errors.role ? true : false}
                  >
                    {owners.map((owner) => (
                      <MenuItem key={owner._id} value={owner._id}>
                        {owner.username}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText sx={{ color: "red" }}>
                    {errors.owner}
                  </FormHelperText>
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
                    error={errors.role ? true : false}
                  >
                    {agents.map((agent) => (
                      <MenuItem key={agent._id} value={agent._id}>
                        {agent.username}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText sx={{ color: "red" }}>
                    {errors.agent}
                  </FormHelperText>
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
                    error={errors.role ? true : false}
                  >
                    {tenants.map((tenant) => (
                      <MenuItem key={tenant._id} value={tenant._id}>
                        {tenant.username}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText sx={{ color: "red" }}>
                    {errors.tenant}
                  </FormHelperText>
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
