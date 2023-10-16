import React from 'react';
import { ErrorMessage } from 'formik';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

class LocationSearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      street: '',
      locality: '',
      city: '',
      latLng: null,
    };
  }

  handleChange = (address, isSuggestion) => {
    if (!address) {
      // Si la dirección es vacía, restablecer los valores de locality y city
      this.setState({
        street: '',
        locality: '',
        city: '',
      });
    } else {
      // Si es una sugerencia, actualiza street y activa la obtención de datos
      if (isSuggestion) {
        this.setState({ street: address }, () => {
          this.handleSelect(address);
        });
      } else {
        this.setState({ street: address });
      }
    }
  };

  handleSelect = (address) => {
    geocodeByAddress(address)
      .then((results) => {
        const result = results[0];
        return Promise.all([getLatLng(result), result.address_components]);
      })
      .then(([latLng, addressComponents]) => {
        this.setState({
          latLng,
          locality: this.extractAddressComponent(addressComponents, 'locality'),
          city: this.extractAddressComponent(addressComponents, 'administrative_area_level_1'),
        });

        console.log('Success', latLng, this.state.locality, this.state.city);
      })
      .catch((error) => console.error('Error', error));
  };

  extractAddressComponent = (addressComponents, type) => {
    const component = addressComponents.find((comp) => comp.types.includes(type));
    return component ? component.long_name : '';
  };

  render() {
    return (
      <div>
        <PlacesAutocomplete
          value={this.state.street}
          onChange={(address) => this.handleChange(address, false)}
          onSelect={(address) => this.handleSelect(address)}
          googleCallbackName="initOne"
        >
          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <div>
              <label>Street:</label>
              <input
                {...getInputProps({
                  placeholder: 'Search Places ...',
                  className: 'location-search-input',
                })}
              />
              <ErrorMessage
                name="address.street"
                component="div"
                className="text-red-600 text-sm"
              />
              <div className="autocomplete-dropdown-container">
                {loading && <div>Loading...</div>}
                {suggestions.map((suggestion) => {
                  const className = suggestion.active
                    ? 'suggestion-item--active'
                    : 'suggestion-item';
                  const style = suggestion.active
                    ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                    : { backgroundColor: '#ffffff', cursor: 'pointer' };
                  return (
                    <div
                      {...getSuggestionItemProps(suggestion, {
                        className,
                        style,
                      })}
                    >
                      <span>{suggestion.description}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete>

        <div>
          <label>Locality:</label>
          <input type="text" value={this.state.locality} readOnly />
        </div>
        <div>
          <label>City:</label>
          <input type="text" value={this.state.city} readOnly />
        </div>
      </div>
    );
  }
}

export default LocationSearchInput;

