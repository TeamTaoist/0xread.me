import { Route, Routes } from "react-router-dom";
import HomePage from "./views/home";
import ActivityPage from "./views/activity";

function RouterLink() {
    return (
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/activities" element={<ActivityPage />} />
      </Routes>
    );
}

export default RouterLink;
