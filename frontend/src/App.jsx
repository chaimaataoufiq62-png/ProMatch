import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';  // ← Chemin correct

// Pages d'authentification
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// Pages Candidat
import CandidateDashboard from './pages/candidate/Dashboard';
import CandidateProfile from './pages/candidate/Profile';
import CandidateChallenges from './pages/candidate/Challenges';
import CandidateSubmissions from './pages/candidate/Submissions';

// Pages Entreprise
import CompanyDashboard from './pages/company/Dashboard';
import CompanyProfile from './pages/company/Profile';
import CompanyChallenges from './pages/company/Challenges';
import CompanyCreateChallenge from './pages/company/CreateChallenge';
import CompanyCandidates from './pages/company/Candidates';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Routes publiques */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Navigate to="/login" />} />

          {/* Routes Candidat protégées */}
          <Route
            path="/candidate"
            element={
              <PrivateRoute allowedRole="candidate">
                <CandidateDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/candidate/profile"
            element={
              <PrivateRoute allowedRole="candidate">
                <CandidateProfile />
              </PrivateRoute>
            }
          />
          <Route
            path="/candidate/challenges"
            element={
              <PrivateRoute allowedRole="candidate">
                <CandidateChallenges />
              </PrivateRoute>
            }
          />
          <Route
            path="/candidate/submissions"
            element={
              <PrivateRoute allowedRole="candidate">
                <CandidateSubmissions />
              </PrivateRoute>
            }
          />

          {/* Routes Entreprise protégées */}
          <Route
            path="/company"
            element={
              <PrivateRoute allowedRole="company">
                <CompanyDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/company/profile"
            element={
              <PrivateRoute allowedRole="company">
                <CompanyProfile />
              </PrivateRoute>
            }
          />
          <Route
            path="/company/challenges"
            element={
              <PrivateRoute allowedRole="company">
                <CompanyChallenges />
              </PrivateRoute>
            }
          />
          <Route
            path="/company/challenges/create"
            element={
              <PrivateRoute allowedRole="company">
                <CompanyCreateChallenge />
              </PrivateRoute>
            }
          />
          <Route
            path="/company/candidates"
            element={
              <PrivateRoute allowedRole="company">
                <CompanyCandidates />
              </PrivateRoute>
            }
          />

          {/* Route 404 */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;