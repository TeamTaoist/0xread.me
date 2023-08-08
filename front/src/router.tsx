import { Route, Routes } from "react-router-dom";
import HomePage from "./views/home";
import ActivityPage from "./views/activity";
import ManagerPage from "./views/manager";

function RouterLink() {
    return (
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/activities" element={<ActivityPage />} />
        <Route path="/manager" element={<ManagerPage />} />
      </Routes>
    );
}

export default RouterLink;
