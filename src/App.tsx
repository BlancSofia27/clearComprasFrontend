import React from "react"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom"
import Inicio from "./views/Inicio"
import AdminPanel from "./views/AdminPanel"
import PostForm from "./views/postForm"
import ProtectedRoute from "./components/ProtectedRoute"
import Profile from "./views/Profile"
import FAQComponent from "./components/Faq"



const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Define la ruta principal */}
          <Route path="/" element={<Inicio />} />
            <Route path="/profile/:userId" element={<Profile />} />
            <Route path="/PreguntasFrecuentes" element={<FAQComponent/>}/>
          {/*otras rutas */}
          <Route element={<ProtectedRoute />}>
          </Route>
            <Route path="/adminPanel" element={<AdminPanel />} />
            <Route path="/NewPublic" element={<PostForm />} />
          {/* Redirecciona rutas no válidas al inicio */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
