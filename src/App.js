import { Routes, Route } from "react-router-dom";
import AddLesson from "./Add/AddLesson";
import AddSpeaker from "./Add/AddSpeaker";
import Lessons from "./Components/Lessons";
import Speakers from "./Components/Speakers";
import Editlesson from "./Edit/Edit_Lesson";
import EditSpeaker from "./Edit/Edit_Speaker";
import ForgotPassword from "./ForgotPassword/ForgotPassword";
import Layout from "./Layout";
import Login from "./Login/Login";
import ViewSpeaker from "./View/ViewSpeaker";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/speakers" element={<Layout><Speakers /></Layout>} />
        <Route path="/speakers/edit-speaker/:id" element={<Layout><EditSpeaker /></Layout>} />
        <Route path="/speakers/add-speaker" element={<Layout><AddSpeaker /></Layout>} />
        <Route path="/speakers/view-speaker/:id" element={<Layout><ViewSpeaker /></Layout>} />
        <Route path="/lessons" element={<Layout><Lessons /></Layout>} />
        <Route path="/lessons/add-lesson" element={<Layout><AddLesson /></Layout>} />
        <Route path="/lessons/edit-lesson/:id" element={<Layout><Editlesson /></Layout>} />
        <Route path="/forget-pass" element={<ForgotPassword />} />
      </Routes>
    </div>
  );
}

export default App;
