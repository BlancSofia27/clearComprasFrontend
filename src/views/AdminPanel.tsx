import React from 'react';
import { Link } from 'react-router-dom';
import AdminPostsList from '../components/Admin/AdminPostsList';
import ProfileAdmin from '../components/Admin/ProfileAdmin';


const AdminPanel: React.FC = () => {
  return (
    <>
    <div className="flex flex-row p-2 bg-slate">
      <h1 className="xs:text-xs xl:text-2xl font-bold mb-4 text-white mx-2 justify-center">Panel de Administración</h1>
      {/* Botón para publicar nueva prenda */}
      <Link to="/NewPublic">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 xl:px-4 xl:mx-4 xs:text-xs xs:p-2 mx-2 rounded">
          Publicar nueva prenda
        </button>
      </Link>
      <Link to="/">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 xl:px-4 xl:mx-4 xs:text-xs xs:p-2 mx-2 rounded">
          Volver al Inicio
        </button>
      </Link>
      {/* Aquí puedes agregar más contenido del panel de administración */}
    </div>
    <ProfileAdmin/>
    
  <AdminPostsList/>
  </>
  );
};

export default AdminPanel;
