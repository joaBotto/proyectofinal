import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserProperties, deleteProperty, updateProperty } from '../../redux/actions'; // Asegúrate de importar las acciones necesarias
import { useParams } from 'react-router-dom';

function UserPropertiesList() {
  const { userId } = useParams();
  const userProperties = useSelector((state) => state.userProperties);
  const dispatch = useDispatch();
  const [propertyToEdit, setPropertyToEdit] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [bedrooms, setBedrooms] = useState(0);
  const [bathrooms, setBathrooms] = useState(0);
  const [address, setAddress] = useState({});
  const [availableDates, setAvailableDates] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    dispatch(fetchUserProperties(userId));
  }, [dispatch, userId]);

  const handleDelete = (propertyId) => {
    dispatch(deleteProperty(propertyId)); // Implementa la acción para eliminar la propiedad
  };

  const handleEdit = (propertyId) => {
    setPropertyToEdit(propertyId); // Establece la propiedad que se va a editar
    const propertyToEdit = userProperties.find((property) => property.id === propertyId);
    if (propertyToEdit) {
      setTitle(propertyToEdit.title);
      setDescription(propertyToEdit.description);
      setPrice(propertyToEdit.price);
      setBedrooms(propertyToEdit.bedrooms);
      setBathrooms(propertyToEdit.bathrooms);
      setAddress(propertyToEdit.address || {});
      setAvailableDates(propertyToEdit.availableDates || []);
      setImages(propertyToEdit.images || []);
    }
  };

  const handleUpdate = (propertyId, newTitle, newDescription, newPrice, newBedrooms, newBathrooms, newAddress, newAvailableDates, newImages) => {
    dispatch(updateProperty(propertyId, newTitle, newDescription, newPrice, newBedrooms, newBathrooms, newAddress, newAvailableDates, newImages)); // Implementa la acción para editar la propiedad
    setPropertyToEdit(null); // Limpia la propiedad que se estaba editando
  };

  return (
    <div>
      <h1>Publicaciones del Usuario</h1>
      <ul>
        {userProperties.map((property) => (
          <li key={property.id}>
            <h2>
              {property.id === propertyToEdit ? (
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              ) : (
                property.title
              )}
            </h2>
            {/* Campo para mostrar y editar el precio */}
            <p>
              Precio: {property.id === propertyToEdit ? (
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              ) : (
                property.price
              )}
            </p>
            {/* Campo para mostrar y editar los dormitorios */}
            <p>
              Dormitorios: {property.id === propertyToEdit ? (
                <input
                  type="number"
                  value={bedrooms}
                  onChange={(e) => setBedrooms(e.target.value)}
                />
              ) : (
                property.bedrooms
              )}
            </p>
            {/* Campo para mostrar y editar los baños */}
            <p>
              Baños: {property.id === propertyToEdit ? (
                <input
                  type="number"
                  value={bathrooms}
                  onChange={(e) => setBathrooms(e.target.value)}
                />
              ) : (
                property.bathrooms
              )}
            </p>
            {/* Campo para mostrar y editar la dirección */}
            <p>
              Dirección: {property.id === propertyToEdit ? (
                <input
                  type="text"
                  value={address.street || ''}
                  onChange={(e) =>
                    setAddress({ ...address, street: e.target.value })
                  }
                />
              ) : (
                `${address.street || ''}, ${address.city || ''}, ${address.state || ''} ${address.zipCode || ''}`
              )}
            </p>
            {/* Campo para mostrar y editar las fechas disponibles */}
            <p>
              Fechas Disponibles: {property.id === propertyToEdit ? (
                <input
                  type="text"
                  value={availableDates.join(', ')}
                  onChange={(e) =>
                    setAvailableDates(e.target.value.split(', '))
                  }
                />
              ) : (
                availableDates.join(', ')
              )}
            </p>
            {/* Campo para mostrar y editar las imágenes */}
            <p>
              Imágenes: {property.id === propertyToEdit ? (
                <input
                  type="text"
                  value={images.join(', ')}
                  onChange={(e) => setImages(e.target.value.split(', '))}
                />
              ) : (
                images.join(', ')
              )}
            </p>
            {property.id === propertyToEdit ? (
              <button onClick={() => handleUpdate(property.id, title, description, price, bedrooms, bathrooms, address, availableDates, images)}>
                Guardar
              </button>
            ) : (
              <>
                <button onClick={() => handleDelete(property.id)}>Eliminar</button>
                <button onClick={() => handleEdit(property.id)}>Modificar</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );  
}

export default UserPropertiesList;
