import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/navbar";
import { Footer } from "./components/footer";
import { HomePage } from "./pages/home";
import { ProgramsPage } from "./pages/programs";
import { ProgramDetailPage } from "./pages/program-detail";
import { CommunityPage } from "./pages/community";
import { DonatePage } from "./pages/donate";
import { VolunteerPage } from "./pages/volunteer";
import { StoriesPage } from "./pages/stories";
import { AboutPage } from "./pages/about";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#FFF9F5]">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/programs" element={<ProgramsPage />} />
          <Route path="/programs/:id" element={<ProgramDetailPage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/donate" element={<DonatePage />} />
          <Route path="/volunteer" element={<VolunteerPage />} />
          <Route path="/stories" element={<StoriesPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}