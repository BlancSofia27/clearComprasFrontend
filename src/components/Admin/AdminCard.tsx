import React, { useState, useRef, useEffect } from "react"
import Modal from "react-modal"
import Slider from "react-slick"
import Swal from "sweetalert2"
import { updatePost, deletePost } from "../../supabaseApi"

interface MyAdminCard {
  post: {
    id: string
    title: string
    price: number
    imageUrl: string
    imageUrl1?: string
    imageUrl2?: string
    size: string[]
    category: string
    brand: string
    color: string
  }
}

const MyAdminCard: React.FC<MyAdminCard> = ({ post }) => {
  const {
    id,
    title,
    price,
    imageUrl,
    imageUrl1,
    imageUrl2,
    size,
    category,
    brand,
    color,
  } = post

  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [showButtons, setShowButtons] = useState(false) // Estado para mostrar botones
  const [editedTitle, setEditedTitle] = useState(title)
  const [editedPrice, setEditedPrice] = useState(price)
  const [editedCategory, setEditedCategory] = useState(category)
  const [editedBrand, setEditedBrand] = useState(brand)
  const [editedColor, setEditedColor] = useState(color)
  const [selectedSizes, setSelectedSizes] = useState<string[]>(size)
  const imageRef = useRef<HTMLImageElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)

  const sizes = [
    "Único",
    "S",
    "M",
    "L",
    "XL",
    "XXL",
    "34",
    "35",
    "36",
    "37",
    "38",
    "39",
    "40",
    "41",
    "42",
    "43",
    "44",
    "45",
  ]

  const categories = [
    "Remeras",
    "Polleras",
    "Top Casual",
    "Jeans",
    "Pantalones",
    "Camperas y Buzos",
    "Zapatos",
    "Bikinis",
    "Deportivo",
    "Noche y Fiesta",
    "Marroquineria y Accesorios",
    "Electronica",
    "Otros",
  ]

  const colors = [
    "Negro",
    "Blanco",
    "Rojo",
    "Azul",
    "Rosa",
    "Marron",
    "Verde",
    "Violeta",
  ]

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
  }

  const images = [imageUrl, imageUrl1, imageUrl2].filter(Boolean) as string[]

  const handleSizeClick = (clickedSize: string) => {
    setSelectedSizes((prevSizes) =>
      prevSizes.includes(clickedSize)
        ? prevSizes.filter((s) => s !== clickedSize)
        : [...prevSizes, clickedSize]
    )
  }

  const handleEdit = async () => {
    try {
      await updatePost({
        id,
        title: editedTitle,
        price: editedPrice,
        category: editedCategory,
        brand: editedBrand,
        color: editedColor,
        size: selectedSizes,
      })

      Swal.fire({
        title: "¡Actualizado!",
        text: "El producto se ha actualizado correctamente.",
        icon: "success",
        timer: 3000,
        showConfirmButton: false,
      })

      setTimeout(() => {
        window.location.reload()
      }, 3000)
    } catch (error) {
      console.error("Error updating product", error)
      Swal.fire({
        title: "Error",
        text: "Hubo un problema al actualizar el producto.",
        icon: "error",
      })
    } finally {
      setModalIsOpen(false)
    }
  }

  const handleDelete = async () => {
    try {
      const result = await Swal.fire({
        title: "¿Quieres eliminar el producto?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Eliminar",
      })

      if (result.isConfirmed) {
        await deletePost(id)

        await Swal.fire({
          title: "¡Eliminado!",
          text: "El producto se ha eliminado correctamente.",
          icon: "success",
          timer: 3000,
          showConfirmButton: false,
        })

        setTimeout(() => {
          window.location.reload()
        }, 3000)
      }
    } catch (error) {
      console.error("Error al eliminar el producto", error)
      await Swal.fire({
        title: "Error",
        text: "Hubo un problema al eliminar el producto.",
        icon: "error",
      })
    }
  }

  // Manejar clics fuera de la imagen para ocultar los botones
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        imageRef.current &&
        !imageRef.current.contains(event.target as Node) &&
        buttonsRef.current &&
        !buttonsRef.current.contains(event.target as Node)
      ) {
        setShowButtons(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className="flex flex-col xl:w-[220px] xl:h-[510px] xs:w-[150px] xs:h-[330px] mx-auto m-4 bg-white shadow-md rounded-md overflow-hidden">
      <div className="relative group">
        <Slider {...settings}>
          {images.map((image, index) => (
            <div key={index}>
              <img
                src={image}
                alt={`Product Image ${index + 1}`}
                className="object-cover w-full xl:h-[260px] xs:h-36"
                onClick={() => setShowButtons(!showButtons)} // Mostrar botones al hacer click
                ref={index === 0 ? imageRef : undefined} // Asignar el ref solo a la primera imagen
              />
            </div>
          ))}
        </Slider>

        {/* Fondo negro con opacidad que solo aparece cuando showButtons es true */}
        {showButtons && (
          <div className="absolute xl:h-[260px] xs:h-36 inset-0 bg-black bg-opacity-30 transition-opacity duration-300"></div>
        )}

        {/* Botones que solo se muestran cuando showButtons es true */}
        {showButtons && (
          <div
            ref={buttonsRef}
            className="absolute inset-0 flex items-center justify-center transition-opacity duration-300"
          >
            <button
              onClick={(e) => {
                e.stopPropagation() // Evitar que el clic en el botón cierre el contenedor
                setModalIsOpen(true)
              }}
              className="bg-blue-500 text-white xl:px-4 xl:py-1 xs:px-2 rounded mr-2"
            >
              Editar
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation() // Evitar que el clic en el botón cierre el contenedor
                handleDelete()
              }}
              className="bg-red-500 text-white xl:px-4 xl:py-1 xs:px-2 rounded"
            >
              Eliminar
            </button>
          </div>
        )}
      </div>

      <div className="xl:p-4 xs:p-2 xl:text-md xs:text-sm xs:mt-3">
        <div className="flex items-center xl:text-lg xs:text-sm font-semibold text-center justify-center h-12 w-full">
          {title}
        </div>
        <div className="flex xl:flex-row xs:flex-col justify-between">
          <p className="text-gray-600 px-2">${price}</p>
          <p className="text-gray-600 px-2">{brand}</p>
        </div>
        <p className="xs:hidden xl:flex text-gray-600">{category}</p>
        <div className="mb-2">
          <p className="xs:hidden xl:flex text-gray-600 mb-2">Talle</p>
          <div className="flex flex-row gap-2 xl:text-md xl:m-1 xs:text-xs overflow-y-hidden overflow-x-auto">
            {size.map((s, index) => (
              <span
                key={index}
                className="bg-gray-200 text-gray-700 xl:px-2 xl:py-1 rounded p-1 h-6 my-1"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
        <p className="flex text-gray-600">Color: {color}</p>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Edit Post Modal"
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 "
        overlayClassName="fixed inset-0"
      >
        <div className="bg-white p-6 rounded-lg w-full max-w-lg overflow-y-auto xl:h-[500px]">
          <h2 className="text-xl font-bold mb-4">Editar Producto</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleEdit()
            }}
          >
            <div className="mb-4">
              <label className="block text-gray-700">Título</label>
              <input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Precio</label>
              <input
                type="number"
                value={editedPrice}
                onChange={(e) => setEditedPrice(parseFloat(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Categoría</label>
              <select
                value={editedCategory}
                onChange={(e) => setEditedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              >
                {categories.map((cat, index) => (
                  <option key={index} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Marca</label>
              <input
                type="text"
                value={editedBrand}
                onChange={(e) => setEditedBrand(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Color</label>
              <select
                value={editedColor}
                onChange={(e) => setEditedColor(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              >
                {colors.map((color, index) => (
                  <option key={index} value={color}>
                    {color}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Talles</label>
              <div className="flex flex-wrap gap-2">
                {sizes.map((s, index) => (
                  <span
                    key={index}
                    onClick={() => handleSizeClick(s)}
                    className={`cursor-pointer px-2 py-1 border rounded-md ${
                      selectedSizes.includes(s)
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Guardar
              </button>
              <button
                type="button"
                onClick={() => setModalIsOpen(false)}
                className="ml-2 bg-gray-500 text-white px-4 py-2 rounded-md"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  )
}

export default MyAdminCard
