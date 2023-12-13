import { PDFViewer, renderToFile, PDFDownloadLink } from "@react-pdf/renderer";
import {
  Route,
  Routes,
  Navigate,
  BrowserRouter
} from "react-router-dom";
import { Template1Form, Template2Form } from "./forms";
import { Template1, Template2 } from "./formTemplates";
import LandingPage from "./LandingPage";
import Login from "./Login";
import Register from "./Register";
import Navbar from "./Navbar";
import Authenticate from "./middleware/Authenticate";


function App() {
  return (
    <BrowserRouter>
        <Navbar />
      <Routes>
        {/* <Route
        path="/download"
        element={
          <PDFDownloadLink document={<Template2 />} fileName="somename.pdf">
            {({ blob, url, loading, error }) =>
              loading ? "Loading document..." : "Download now!"
            }
          </PDFDownloadLink>
        }
      /> */}
        {/* <Route
        path="/view"
        element={
          <PDFViewer>
            <Template1 />
          </PDFViewer>
        }
      /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" index element={<Register />} />
        <Route element={<Authenticate/>}>
          <Route path="/" index element={<LandingPage />} />
          <Route path="/template1" index element={<Template1Form />} />
          <Route path="/template2" element={<Template2Form />} />
        </Route>
        {/* <Route
        path="/t2"
        element={
          <PDFViewer>
            <Template2 />
          </PDFViewer>
        }
      /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
