import { Theme } from "@mui/material/styles";

export const tableStyles = (theme: Theme) => ({
  tableContainer: {
    width: "100%",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
    border: "none",
    borderRadius: "8px",
    overflow: "auto",
    background: "#ffffff",
    WebkitOverflowScrolling: "touch",
    [theme.breakpoints.up("sm")]: {
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
      borderRadius: "12px",
      overflow: "hidden",
    },
  },
  table: {
    width: "100%",
    minWidth: "600px",
    tableLayout: "auto" as const,
    [theme.breakpoints.up("sm")]: {
      minWidth: "100%",
      tableLayout: "fixed" as const,
    },
    "& .MuiTableCell-root": {
      padding: theme.spacing(0.75),
      borderBottom: `1px solid ${theme.palette.divider}`,
      transition: "all 0.3s ease",
      height: "32px",
      fontSize: "0.7rem",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      [theme.breakpoints.up("sm")]: {
        padding: theme.spacing(1),
        height: "36px",
        fontSize: "0.75rem",
        whiteSpace: "normal",
      },
    },
  },
  tableHead: {
    background: "#eaf2f5",
    position: "sticky",
    top: 0,
    zIndex: 1,
    "& .MuiTableCell-head": {
      fontWeight: 700,
      color: "#1a237e",
      fontSize: "0.7rem",
      textTransform: "uppercase",
      letterSpacing: "0.5px",
      padding: theme.spacing(0.75),
      borderBottom: `2px solid #c1dce0`,
      height: "32px",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      [theme.breakpoints.up("sm")]: {
        fontSize: "0.75rem",
        letterSpacing: "1px",
        padding: theme.spacing(1),
        height: "36px",
        whiteSpace: "normal",
      },
    },
  },
  tableBody: {
    "& .MuiTableRow-root": {
      height: "32px",
      [theme.breakpoints.up("sm")]: {
        height: "36px",
      },
      "&:hover": {
        backgroundColor: "#d9e6ec",
        "& .MuiTableCell-root": {
          color: theme.palette.primary.main,
        },
      },
      "&:last-child td": {
        borderBottom: 0,
      },
      transition: "all 0.3s ease",
    },
  },
  tableCell: {
    color: theme.palette.text.primary,
    fontWeight: 500,
    "&:first-of-type": {
      borderLeft: `3px solid transparent`,
    },
    "&:hover": {
      "&:first-of-type": {
        borderLeft: `3px solid ${theme.palette.primary.main}`,
      },
    },
  },
  tableRow: {
    "&:nth-of-type(odd)": {
      backgroundColor: "#ffffff",
    },
    "&:nth-of-type(even)": {
      backgroundColor: "#f5f5f5",
    },
  },
  actionsCell: {
    width: "auto",
    minWidth: "120px",
    [theme.breakpoints.up("sm")]: {
      width: "180px",
    },
    "& .MuiButton-root": {
      minWidth: "auto",
      padding: theme.spacing(0.25, 0.5),
      margin: theme.spacing(0, 0.5),
      fontSize: "0.65rem",
      fontWeight: 600,
      borderRadius: "4px",
      textTransform: "none",
      transition: "all 0.3s ease",
      height: "22px",
      [theme.breakpoints.up("sm")]: {
        padding: theme.spacing(0.25, 0.75),
        fontSize: "0.7rem",
        height: "24px",
      },
      "&:hover": {
        transform: "translateY(-1px)",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  statusCell: {
    "& .MuiChip-root": {
      borderRadius: "4px",
      fontWeight: 600,
      padding: theme.spacing(0.25, 0.5),
      height: "20px",
      fontSize: "0.65rem",
      [theme.breakpoints.up("sm")]: {
        fontSize: "0.7rem",
      },
    },
  },
  numericCell: {
    fontFamily: "'Roboto Mono', monospace",
    fontWeight: 600,
  },
  linkCell: {
    color: theme.palette.primary.main,
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
});
