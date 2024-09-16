import React, { useState } from 'react';

interface FAQ {
  question: string;
  answer: string;
}


const faqs: FAQ[] = [

    {
      question: '¿Cómo puedo publicar mi catálogo?',
      answer: 'Para publicar tu catálogo, debes registrarte en la web con un correo o tu Facebook, crear una cuenta, y contactarte al número +54 9 11 66941550 por WhatsApp. Ahí vas a enviar los datos de tu negocio. Te recomendamos que uses un email/Facebook que le pertenezca al negocio, no uno personal.'
    },
    {
      question: '¿Cuál es la finalidad de la plataforma?',
      answer: 'Los usuarios pueden buscar productos por nombre o categoría y ver una lista de resultados. Los precios, stock de tallas y artículos de diferentes comerciantes estarán disponibles para que los usuarios los comparen o busquen según su necesidad.'
    },
    {
      question: '¿Necesito tener tienda física para publicar?',
      answer: 'No, la plataforma está creada tanto para locales físicos como para vendedores online.'
    },
    {
      question: '¿Hay algún costo por publicar mi catálogo?',
      answer: 'La suscripción mensual a la plataforma es de $30.000 ARS. Esta da acceso a tu panel de administración para publicar y llevar un control de stock de tu catálogo virtual.'
    },
    {
      question: '¿Cómo puedo gestionar mi inventario?',
      answer: 'En tu panel de administración, puedes agregar, editar y eliminar productos, así como controlar la disponibilidad del inventario en tiempo real.'
    },
    {
      question: '¿Cómo pueden los usuarios contactar a mi comercio?',
      answer: 'Los usuarios pueden contactarte directamente a través de los detalles de contacto en tu perfil de comercio o a través de un producto que hayas publicado.'
    },
    {
      question: '¿Qué hay en Mi Perfil?',
      answer: 'En tu perfil, los usuarios pueden ver todos los productos que publicas y los datos de contacto. Contas con un header y una foto de perfil para que publiques el logo de tu negocio.'
    },
    {
      question: '¿Cuáles son los medios de pago?',
      answer: 'Transferencia bancaria, Mercado Pago y Rapipago.'
    },
    {
      question: '¿Puedo publicar desde más de un dispositivo?',
      answer: 'Sí, al iniciar sesión desde otros dispositivos, podes ingresar al panel de administración desde múltiples usuarios.'
    },
  ];
  

const FAQComponent: React.FC = () => {
  const [selectedQuestion, setSelectedQuestion] = useState<number | null>(null);

  const toggleAnswer = (index: number) => {
    setSelectedQuestion(selectedQuestion === index ? null : index);
  };

  return (
    <>
      
        <div className="w-full mx-auto justify-center h-full font-normal bg-gray-100 shadow-2xl text-gray-700">
          <h1 className="text-2xl font-bold text-center mb-6 p-5 bg-gradient-to-r from-blue-300 to-celeste w-full text-white">
            Preguntas Frecuentes
          </h1>
          <div className="space-y-4 xl:px-16 xs:px-3">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b-2 pb-2">
                <h2
                  className="text-xl cursor-pointer flex justify-between"
                  onClick={() => toggleAnswer(index)}
                >
                  {faq.question}
                  <span>
                    {selectedQuestion === index ? (
                      <button
                        className="group cursor-pointer outline-none hover:rotate-90 duration-300"
                        title="Subtract"
                      >
                        <svg
                          className="stroke-blue-300 fill-none group-hover:fill-blue-500 group-active:stroke-blue-400 group-active:fill-blue-300 group-active:duration-0 duration-300"
                          viewBox="0 0 24 24"
                          height="50px"
                          width="50px"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeWidth="1.5"
                            d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                          />
                          <path strokeWidth="1.5" d="M8 12H16" />
                        </svg>
                      </button>
                    ) : (
                      <button
                        className="group cursor-pointer outline-none hover:rotate-90 duration-300"
                        title="Add New"
                      >
                        <svg
                          className="stroke-blue-300 fill-none group-hover:fill-blue-500 group-active:stroke-blue-400 group-active:fill-blue-300 group-active:duration-0 duration-300"
                          viewBox="0 0 24 24"
                          height="50px"
                          width="50px"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeWidth="1.5"
                            d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                          />
                          <path strokeWidth="1.5" d="M8 12H16" />
                          <path strokeWidth="1.5" d="M12 16V8" />
                        </svg>
                      </button>
                    )}
                  </span>
                </h2>
                {selectedQuestion === index && (
                  <p className="mt-2">{faq.answer}</p>
                )}
              </div>
            ))}
          </div>
        </div>
     
    </>
  );
};

export default FAQComponent;
