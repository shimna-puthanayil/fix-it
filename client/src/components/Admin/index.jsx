import Autocomplete, { autocompleteClasses } from "@mui/material/Autocomplete";

import Stack from "@mui/material/Stack";

import { createTheme, useTheme, ThemeProvider } from "@mui/material/styles";
const top100Films = [
  { title: "The Shawshank Redemption", year: 1994 },
  { title: "The Godfather", year: 1972 },
  { title: "The Godfather: Part II", year: 1974 },
  { title: "The Dark Knight", year: 2008 },
  { title: "12 Angry Men", year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: "Pulp Fiction", year: 1994 },
];
// Theme.ts
const customTheme = (outerTheme) =>
  createTheme({
    palette: {
      mode: outerTheme.palette.mode,
    },
    components: {
      MuiAutocomplete: {
        defaultProps: {
          renderOption: (props, option, state, ownerState) => (
            <Box
              sx={{
                borderRadius: "8px",
                margin: "5px",
                [`&.${autocompleteClasses.option}`]: {
                  padding: "8px",
                },
              }}
              component="li"
              {...props}
            >
              {ownerState.getOptionLabel(option)}
            </Box>
          ),
        },
      },
    },
  });
function MovieSelect() {
  return (
    <Autocomplete
      options={top100Films}
      getOptionLabel={(option) => `${option.title} (${option.year})`}
      id="movie-customized-option-demo"
      disableCloseOnSelect
      renderInput={(params) => (
        <TextField {...params} label="Choose a movie" variant="standard" />
      )}
    />
  );
}

export default function AddComplaint() {
  const outerTheme = useTheme();
  return (
    <ThemeProvider theme={customTheme(outerTheme)}>
      <Stack spacing={5} sx={{ width: 300 }}>
        <MovieSelect />
      </Stack>
    </ThemeProvider>
  );
}
