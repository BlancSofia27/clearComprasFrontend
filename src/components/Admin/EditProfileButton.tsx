import React, { useState, useEffect } from 'react';
import { getUserById, updateUser } from '../../supabaseApi'; 
import { useAuth0 } from '@auth0/auth0-react';
import { uploadFile } from '../../firebase/config';
import Swal from 'sweetalert2';
import Loader from '../Loader';

interface ProfileData {
  header: string;
  logo: string;
  instagram: string;
  businessName: string;
  direction: string;
  whatsapp: string;
}

const EditProfileButton: React.FC = () => {
  const [profileData, setProfileData] = useState<ProfileData>({
    header: '',
    logo: '',
    instagram: '',
    businessName: '',
    direction: '',
    whatsapp: ''
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'header' | 'logo'): void => {
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

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const handleConfirm = async (): Promise<void> => {
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

      if (userId) {
        await updateUser(userId, updatedProfileData);
      } else {
        setError('Error: No se pudo obtener el ID del usuario.');
      }

      
      
      
      Swal.fire({
        title: "¡Actualizado!",
        text: "El perfil se ha actualizado correctamente.",
        icon: "success",
        timer: 3000,
        showConfirmButton: false
      });
      
      setIsModalOpen(false);

      setTimeout(() => window.location.reload(), 3000);
    } catch (err) {
      setError('Error al guardar los cambios');
    }
  };

  const handleCancel = (): void => {
    setIsModalOpen(false);
  };

  if (loading) return <Loader/>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-500 xs:text-xs m-1 xl:text-md text-white px-4 py-2 rounded"
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
                <label htmlFor="instagram" className="block text-sm font-medium">Instagram:</label>
                <input
                  type="text"
                  id="instagram"
                  name="instagram"
                  value={profileData.instagram}
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
                <label htmlFor="whatsapp" className="block text-sm font-medium">WhatsApp:(ej +543442457109)</label>
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
                <label className="block text-sm font-medium">Logo:(Recomendado 200x200px)</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageChange(e, 'logo')}
                  className="mt-2"
                />
                {logoPreview && <img src={logoPreview as string} alt="Logo preview" className="mt-2 w-20 h-20 object-cover" />}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium">Header:(Recomendado 1300x400px)</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageChange(e, 'header')}
                  className="mt-2"
                />
                {headerPreview && <img src={headerPreview as string} alt="Header preview" className="mt-2 w-full h-20 object-cover" />}
              </div>

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  onClick={handleConfirm}
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  Confirmar
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
