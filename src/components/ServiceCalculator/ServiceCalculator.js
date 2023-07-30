import React, { useState } from 'react';
import YearSelector from '../YearSelector/YearSelector';
import ServiceSelector from '../ServiceSelector/ServiceSelector';
import data from '../../assets/Items.json';
import {
  Page,
  Wrapper,
  HeadText,
  ErrorText,
  HeadSmallText,
} from './ServiceCalculator.style';

const ServiceCalculator = () => {
  const [selectedYear, setSelectedYear] = useState(data.years[0]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  const toggleService = (service) => {
    const serviceData = data.services.find((s) => s.id === service);

    if (selectedServices.includes(service)) {
      setSelectedServices((prev) => prev.filter((s) => s !== service));
      if (serviceData.restrictions) {
        setSelectedServices((prev) =>
          prev.filter((s) => !serviceData.restrictions.includes(s))
        );
      }
    } else {
      if (
        serviceData.dependencies &&
        !serviceData.dependencies.every((dependency) =>
          selectedServices.includes(dependency)
        )
      ) {
        const missingDependencies = serviceData.dependencies.filter(
          (dependency) => !selectedServices.includes(dependency)
        );
        const missingDependencyNames = missingDependencies
          .map((id) => {
            const service = data.services.find((s) => s.id === id);
            return service.name;
          })
          .join(', ');

        setErrorMessage(
          `Nie możesz dodać usługi ${serviceData.name} bez dodania ${missingDependencyNames}.`
        );
        return;
      }
      setErrorMessage(null);
      setSelectedServices((prev) => [...prev, service]);
    }
  };

  const calculatePrice = () => {
    let price = 0;
    let services = [...selectedServices];
    let appliedPromotions = [];

    data.bundles.forEach((bundle) => {
      if (bundle.services.every((s) => services.includes(s))) {
        price += bundle.prices[selectedYear];
        appliedPromotions.push(bundle.name);
        bundle.services.forEach((s) => {
          services = services.filter((service) => service !== s);
        });
        services = services.filter((service) => {
          const serviceData = data.services.find((s) => s.id === service);
          return (
            !serviceData.bundleFree ||
            !serviceData.bundleFree.some(
              (freeBundle) =>
                JSON.stringify(freeBundle.sort()) ===
                JSON.stringify(bundle.services.sort())
            )
          );
        });
      }
    });

    services.forEach((service) => {
      const serviceData = data.services.find((s) => s.id === service);
      if (serviceData) {
        price += serviceData.prices[selectedYear];
      }
    });

    return {
      price,
      appliedPromotions,
    };
  };

  const { price, appliedPromotions } = calculatePrice();

  return (
    <Page>
      <Wrapper>
        <HeadText>Kalkulator usług</HeadText>
        <YearSelector
          selectedYear={selectedYear}
          years={data.years}
          onYearChange={(e) => setSelectedYear(e.target.value)}
        />
        <HeadSmallText>Usługi</HeadSmallText>
        {data.services.map((service) => (
          <ServiceSelector
            key={service.id}
            service={service}
            selectedServices={selectedServices}
            onServiceToggle={toggleService}
          />
        ))}

        <HeadSmallText>Suma: {price} zł</HeadSmallText>
        {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
        {appliedPromotions.length > 0 && (
          <>
            <HeadSmallText>Zastosowane promocje</HeadSmallText>
            <ul>
              {appliedPromotions.map((promo, index) => (
                <li key={index}>{promo}</li>
              ))}
            </ul>
          </>
        )}
      </Wrapper>
    </Page>
  );
};

export default ServiceCalculator;
