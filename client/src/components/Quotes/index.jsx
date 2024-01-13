import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
import Fab from '@mui/material/Fab';
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import { randomId, randomArrayItem } from "@mui/x-data-grid-generator";
import { UPDATE_QUOTES } from "../../utils/actions";
// import global state
import { useComplaintContext } from "../../utils/GlobalState";
const roles = ["Market", "Finance", "Development"];
let quotes = [];
const randomRole = () => {
  return randomArrayItem(roles);
};
const initialRows = [
  {
    id: randomId(),
    name: "hello",
    address: "25",
    quote: 1,
  },
  {
    id: randomId(),
    name: "hello",
    address: "25",
    quote: 1,
  },
  {
    id: randomId(),
    name: "hello",
    address: "25",
    quote: 1,
  },
  {
    id: randomId(),
    name: "hello",
    address: "25",
    quote: 1,
  },
  {
    id: randomId(),
    name: "hello",
    address: "25",
    quote: 1,
  },
];
function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = randomId();
    setRows((oldRows) => [
      ...oldRows,
      { id, name: "", address: "", isNew: true },
    ]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
    }));
  };

  return (
    <GridToolbarContainer>
      <ColorButton
        startIcon={
          <Fab color="primary" aria-label="add">
            <AddIcon />
          </Fab>
        }
        onClick={handleClick}
      >
        Add quote
      </ColorButton>
    </GridToolbarContainer>
  );
}
const ColorButton = styled(Button)(({ theme }) => ({
  color: "#457373",
  fontWeight: "bold",
}));
export default function FullFeaturedCrudGrid() {
  const [state, dispatch] = useComplaintContext();

  // dispatch({
  //   type: CLEAR_QUOTES,
  //   quotes: [],
  // });

  const quotesOfComplaint = state.complaints.find(
    (x) => x._id === state.selectedComplaint.id
  ).quotes;
  console.log(quotesOfComplaint);
  const suggestedQuotes = [];
  for (let i = 0; i < quotesOfComplaint.length; i++) {
    const quote = {};
    (quote.id = randomId()),
      (quote.name = quotesOfComplaint[i].businessName),
      (quote.address = quotesOfComplaint[i].address),
      (quote.quote = quotesOfComplaint[i].quote),
      suggestedQuotes.push(quote);
  }
  console.log(suggestedQuotes);
  quotes = suggestedQuotes;
  console.log(quotes);
  const [rows, setRows] = React.useState(suggestedQuotes);
  const [rowModesModel, setRowModesModel] = React.useState({});

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    console.log();
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    console.log(updatedRow);
    console.log(rows);
    const quote = {};
    (quote.id = updatedRow.id),
      (quote.name = updatedRow.name),
      (quote.address = updatedRow.address),
      (quote.quote = updatedRow.quote);
    const isLargeNumber = (quote) => quote.id === updatedRow.id;
    const index = quotes.findIndex(isLargeNumber);
    if (index >= 0) {
      quotes.splice(index, 1);
    }
    quotes.push(quote);
    console.log(quotes);
    // adding new/updated  quote details to state quotes
    dispatch({
      type: UPDATE_QUOTES,
      quotes: quotes,
    });

    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns = [
    {
      field: "name",
      headerName: "Business Name",
      renderHeader: () => <strong>{"Business Name "}</strong>,
      headerClassName: "super-app-theme--header",
      width: 300,
      align: "left",
      headerAlign: "left",
      editable: true,
    },
    {
      field: "address",
      headerName: "Address",
      renderHeader: () => <strong>{" Address "}</strong>,
      headerClassName: "super-app-theme--header",
      width: 310,
      editable: true,
      valueOptions: ["Market", "Finance", "Development"],
    },
    {
      field: "quote",
      headerName: "Quote",
      renderHeader: () => <strong>{"Quote "}</strong>,
      headerClassName: "super-app-theme--header",
      type: "number",
      width: 200,
      align: "left",
      headerAlign: "left",
      editable: true,
    },

    {
      field: "actions",
      type: "actions",
      renderHeader: () => <strong>{"actions "}</strong>,
      headerClassName: "super-app-theme--header",
      headerName: "Actions",
      width: 250,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <Box
      sx={{
        height: 500,
        width: "100%",
        "& .actions": {
          color: "text.secondary",
        },
        "& .textPrimary": {
          color: "text.primary",
        },
        "& .super-app-theme--header": {
          backgroundColor: "#101F33",
          color: "white",
        },
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slots={{
          toolbar: EditToolbar,
        }}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
      />
    </Box>
  );
}
