import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import MesDemandesPage from './pages/MesDemandesPage';
import NouvelleDemandePage from './pages/NouvelleDemandePage';
import ConfirmationPage from './pages/citoyen/ConfirmationPage';
import AgentDashboardPage from './pages/agent/AgentDashboardPage';
import AgentListeDemandesPage from './pages/agent/AgentListeDemandesPage';
import AgentDetailDemandePage from './pages/agent/AgentDetailDemandePage';
import AgentArchivesPage from './pages/agent/AgentArchivesPage';
import AgentProfilPage from './pages/agent/AgentProfilPage';
import ProfilPage from './pages/ProfilPage';
import NotificationsPage from './pages/NotificationsPage';

import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminDemandesPage from './pages/admin/AdminDemandesPage';
import AdminRessourcesPage from './pages/admin/AdminRessourcesPage';
import AdminSystemePage from './pages/admin/AdminSystemePage';
import AdminStatistiquesPage from './pages/admin/AdminStatistiquesPage';
import AdminLogsPage from './pages/admin/AdminLogsPage';
import AdminProfilPage from './pages/admin/AdminProfilPage';
import AdminDetailAgentPage from './pages/admin/AdminDetailAgentPage';
import AdminDetailDocumentPage from './pages/admin/AdminDetailDocumentPage';
import AdminDetailDemandePage from './pages/admin/AdminDetailDemandePage';
import AdminDetailServicePage from './pages/admin/AdminDetailServicePage';
import AdminDetailRolePage from './pages/admin/AdminDetailRolePage';
import AdminAjouterAgentPage from './pages/admin/AdminAjouterAgentPage';
import AdminAjouterDocumentPage from './pages/admin/AdminAjouterDocumentPage';
import AdminAjouterServicePage from './pages/admin/AdminAjouterServicePage';
import AdminAjouterRolePage from './pages/admin/AdminAjouterRolePage';

/**
 * Protected Route Component
 */
const ProtectedRoute = ({ children, roles = [] }) => {
  const { user, loading, isAuthenticated } = useAuth();
  const location = useLocation();

  if (loading) return <div>Chargement...</div>;

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Simplified role check for agents
  const userRole = user.role;
  const isAdmin = userRole === 'ADMIN' || user.isAdmin === true;
  const isAgent = userRole.startsWith('AGENT_') || userRole === 'SUPERVISEUR' || user.isAgent === true;
  
  const hasAccess = roles.length === 0 || 
                    roles.includes(userRole) || 
                    (roles.includes('ADMIN') && isAdmin) ||
                    (roles.includes('AGENT') && isAgent);

  if (!hasAccess) {
    // Redirect to their respective home dashboard if they try to access something they shouldn't
    if (isAdmin) return <Navigate to="/admin/dashboard" replace />;
    if (isAgent) return <Navigate to="/agent/dashboard" replace />;
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

const AppRouter = () => {
  const { user } = useAuth();
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Citoyen Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute roles={['CITOYEN']}>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/demandes"
        element={
          <ProtectedRoute roles={['CITOYEN']}>
            <MesDemandesPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/demandes/nouvelle"
        element={
          <ProtectedRoute roles={['CITOYEN']}>
            <NouvelleDemandePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/demandes/confirmation"
        element={
          <ProtectedRoute roles={['CITOYEN']}>
            <ConfirmationPage />
          </ProtectedRoute>
        }
      />

      {/* Agent Routes */}
      <Route
        path="/agent/dashboard"
        element={
          <ProtectedRoute roles={['AGENT']}>
            <AgentDashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/agent/demandes"
        element={
          <ProtectedRoute roles={['AGENT', 'ADMIN']}>
            <AdminDemandesPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/agent/demandes/:id"
        element={
          <ProtectedRoute roles={['AGENT', 'ADMIN']}>
            <AdminDetailDemandePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/agent/archives"
        element={
          <ProtectedRoute roles={['AGENT']}>
            <AgentArchivesPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/agent/profil"
        element={
          <ProtectedRoute roles={['AGENT']}>
            <Navigate to={`/admin/agents/${user?._id}`} replace />
          </ProtectedRoute>
        }
      />

      {/* Admin Routes */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute roles={['ADMIN']}>
            <AdminDashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/demandes"
        element={
          <ProtectedRoute roles={['ADMIN']}>
            <AdminDemandesPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/demandes/:id"
        element={
          <ProtectedRoute roles={['ADMIN']}>
            <AdminDetailDemandePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/ressources"
        element={
          <ProtectedRoute roles={['ADMIN']}>
            <AdminRessourcesPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/systeme"
        element={
          <ProtectedRoute roles={['ADMIN']}>
            <AdminSystemePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/statistiques"
        element={
          <ProtectedRoute roles={['ADMIN']}>
            <AdminStatistiquesPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/logs"
        element={
          <ProtectedRoute roles={['ADMIN']}>
            <AdminLogsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/profil"
        element={
          <ProtectedRoute roles={['ADMIN']}>
            <AdminProfilPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/agents/:id"
        element={
          <ProtectedRoute roles={['ADMIN', 'AGENT']}>
            <AdminDetailAgentPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/documents/:id"
        element={
          <ProtectedRoute roles={['ADMIN']}>
            <AdminDetailDocumentPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/services/:id"
        element={
          <ProtectedRoute roles={['ADMIN']}>
            <AdminDetailServicePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/roles/:id"
        element={
          <ProtectedRoute roles={['ADMIN']}>
            <AdminDetailRolePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/agents/nouveau"
        element={
          <ProtectedRoute roles={['ADMIN']}>
            <AdminAjouterAgentPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/documents/nouveau"
        element={
          <ProtectedRoute roles={['ADMIN']}>
            <AdminAjouterDocumentPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/services/nouveau"
        element={
          <ProtectedRoute roles={['ADMIN']}>
            <AdminAjouterServicePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/roles/nouveau"
        element={
          <ProtectedRoute roles={['ADMIN']}>
            <AdminAjouterRolePage />
          </ProtectedRoute>
        }
      />

      {/* Shared Protected Routes */}
      <Route
        path="/profil"
        element={
          <ProtectedRoute roles={['CITOYEN', 'ADMIN']}>
            <ProfilPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/notifications"
        element={
          <ProtectedRoute roles={['CITOYEN', 'AGENT', 'ADMIN']}>
            <NotificationsPage />
          </ProtectedRoute>
        }
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRouter;
