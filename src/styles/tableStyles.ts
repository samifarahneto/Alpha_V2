import { Theme } from "@mui/material/styles";

export const tableStyles = (theme: Theme) => ({
  tableContainer: {
    width: "100%",
    boxShadow: "none",
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    overflow: "hidden",
  },
  table: {
    minWidth: 650,
    "& .MuiTableCell-root": {
      padding: theme.spacing(2),
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
  },
  tableHead: {
    backgroundColor: theme.palette.background.default,
    "& .MuiTableCell-head": {
      fontWeight: 600,
      color: theme.palette.text.primary,
      fontSize: "0.875rem",
      textTransform: "uppercase",
      letterSpacing: "0.5px",
    },
  },
  tableBody: {
    "& .MuiTableRow-root": {
      "&:hover": {
        backgroundColor: theme.palette.action.hover,
      },
      "&:last-child td": {
        borderBottom: 0,
      },
    },
  },
  tableCell: {
    fontSize: "0.875rem",
    color: theme.palette.text.primary,
  },
  tableRow: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default,
    },
  },
  actionsCell: {
    width: "150px",
    "& .MuiButton-root": {
      minWidth: "auto",
      padding: theme.spacing(0.5, 1),
      margin: theme.spacing(0, 0.5),
      fontSize: "0.75rem",
    },
  },
  responsiveTable: {
    [theme.breakpoints.down("sm")]: {
      "& .MuiTableCell-root": {
        padding: theme.spacing(1),
        fontSize: "0.75rem",
      },
      "& .MuiButton-root": {
        padding: theme.spacing(0.25, 0.5),
        fontSize: "0.7rem",
      },
    },
  },
});
