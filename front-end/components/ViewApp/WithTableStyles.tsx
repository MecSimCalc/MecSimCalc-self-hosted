import { Container, styled } from "@mui/material";

// https://github.com/jupyter/notebook/blob/9de5042e1058dc8aef7632f313e3e86c33390d31/notebook/static/notebook/less/renderedhtml.less#L77-L109
const WithTableStyles = styled(Container)(({ theme }) => ({
  table: {
    marginLeft: "auto",
    marginRight: "auto",
    border: "none",
    borderCollapse: "collapse",
    borderSpacing: 0,
    color: "@rendered_html_border_color",
    tableLayout: "fixed",
  },
  thead: {
    borderBottom: "1px solid @rendered_html_border_color",
    verticalAlign: "bottom",
  },
  "tr, th, td": {
    textAlign: "right",
    verticalAlign: "middle",
    padding: "0.5em 0.5em",
    lineHeight: "normal",
    whiteSpace: "normal",
    maxWidth: "none",
    border: "none",
  },
  th: {
    fontWeight: "bold",
  },
  "tbody tr:nth-of-type(odd)": {
    background: "#f5f5f5",
  },
  "tbody tr:hover": {
    background: "rgba(66, 165, 245, 0.2)",
  },
  "* + table": { marginTop: "1em" },
}));

export default WithTableStyles;
