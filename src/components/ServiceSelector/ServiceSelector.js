import React from 'react';

const ServiceSelector = ({ service, selectedServices, onServiceToggle }) => (
  <label>
    <input
      type="checkbox"
      checked={selectedServices.includes(service.id)}
      onChange={() => onServiceToggle(service.id)}
    />
    {service.name}
  </label>
);

export default ServiceSelector;
