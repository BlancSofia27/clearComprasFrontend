import React, { useState, useEffect } from 'react';
import { getUserById, updateUser } from '../../supabaseApi'; // Asegúrate de importar las funciones correctas
import { useAuth0 } from '@auth0/auth0-react';
import { uploadFile } from '../../firebase/config'; // Asegúrate de importar la función correcta

const EditProfileButton: React.FC = () => {
  const [profileData, setProfileData] = useState({
    header: '',
    logo: '',
    instagram: '',
    businessName: '',
    direction: '',
    whatsapp: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [headerFile, setHeaderFile] = useState<File | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [headerPreview, setHeaderPreview] = useState<string | ArrayBuffer | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | ArrayBuffer | null>(null);
  const { user } = useAuth0();
  const userId = user?.sub;

  useEffect(() => {
    if (userId) {
      const fetchProfileData = async () => {
        try {
          const data = await getUserById(userId);
          setProfileData(data);
          setHeaderPreview(data.header);
          setLogoPreview(data.logo);
        } catch (err) {
          setError('Error al cargar los datos del perfil');
        } finally {
          setLoading(false);
        }
      };

      fetchProfileData();
    }
  }, [userId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'header' | 'logo') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === 'header') {
          setHeaderPreview(reader.result);
        } else if (type === 'logo') {
          setLogoPreview(reader.result);
        }
      };
      reader.readAsDataURL(file);
      if (type === 'header') {
        setHeaderFile(file);
      } else if (type === 'logo') {
        setLogoFile(file);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setModalContent('¿Estás seguro de que quieres guardar los cambios?');
    setIsModalOpen(true);
  };

  const handleConfirm = async () => {
    try {
      let updatedProfileData = { ...profileData };
      
      if (headerFile) {
        const headerUrl = await uploadFile(headerFile);
        updatedProfileData.header = headerUrl;
      }
      
      if (logoFile) {
        const logoUrl = await uploadFile(logoFile);
        updatedProfileData.logo = logoUrl;
      }

      await updateUser(userId, updatedProfileData);
      setModalContent('¡Cambios guardados exitosamente!');
      setTimeout(() => {
        setIsModalOpen(false);
      }, 3000); // Cierra el modal después de 2 segundos
    } catch (err) {
      setError('Error al guardar los cambios');
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Editar Perfil
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-bold mb-4">Editar Perfil</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="businessName" className="block text-sm font-medium">Nombre del Negocio:</label>
                <input
                  type="text"
                  id="businessName"
                  name="businessName"
                  value={profileData.businessName}
                  onChange={handleChange}
                  className="border border-gray-300 p-2 rounded w-full"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="direction" className="block text-sm font-medium">Dirección:</label>
                <input
                  type="text"
                  id="direction"
                  name="direction"
                  value={profileData.direction}
                  onChange={handleChange}
                  className="border border-gray-300 p-2 rounded w-full"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="whatsapp" className="block text-sm font-medium">WhatsApp:</label>
                <input
                  type="text"
                  id="whatsapp"
                  name="whatsapp"
                  value={profileData.whatsapp}
                  onChange={handleChange}
                  className="border border-gray-300 p-2 rounded w-full"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="header" className="block text-sm font-medium">Header:</label>
                <input
                  type="file"
                  id="header"
                  onChange={(e) => handleImageChange(e, 'header')}
                  className="border border-gray-300 p-2 rounded w-full"
                />
                {headerPreview && (
                  <img src={headerPreview as string} alt="Header Preview" className="mt-2 w-full h-32 object-cover" />
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="logo" className="block text-sm font-medium">Logo:</label>
                <input
                  type="file"
                  id="logo"
                  onChange={(e) => handleImageChange(e, 'logo')}
                  className="border border-gray-300 p-2 rounded w-full"
                />
                {logoPreview && (
                  <img src={logoPreview as string} alt="Logo Preview" className="mt-2 w-full h-32 object-cover" />
                )}
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="submit"
                  onClick={handleConfirm}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Guardar cambios
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfileButton;
