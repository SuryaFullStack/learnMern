import "./App.css";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import NavBar from "./components/NavBar";
import DataTable from "./components/DataTable";

function App() {
  return (
    <Container maxWidth="xl" disableGutters>
      <NavBar />
      <Box sx={{ p: 4 }}>
        <DataTable />
      </Box>
    </Container>
  );
}

export default App;
