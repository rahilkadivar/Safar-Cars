import { Checkbox, Collapse, Radio, Slider } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addFilteredData, clearAllFilter } from '../redux/productSlice';

const { Panel } = Collapse;

const ProductFilter = () => {
  const data = useSelector((state) => state.product.data);
  const clearFilter = useSelector((state) => state.product.clearFilter);
  const dispatch = useDispatch();

  const currentYear = new Date().getFullYear();
  const defaultFilters = {
    priceRange: [0, 2000000],
    yearRange: [2000, currentYear],
    brands: [],
    kmDriven: null,
    fuelType: [],
    bodyType: [],
    transmission: [],
    owner: [],
    seats: [],
    features: [],
  };

  const [filters, setFilters] = useState(defaultFilters);

  const handleClearAll = () => setFilters(defaultFilters);

  const handleFilterChange = (key, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: value,
    }));
  };

  const filteredData = useMemo(() => {
    return data.filter((item) =>
      item.price >= filters.priceRange[0] &&
      item.price <= filters.priceRange[1] &&
      (!filters.brands.length || filters.brands.includes(item.make)) &&
      item.manufacturing_year >= filters.yearRange[0] &&
      item.manufacturing_year <= filters.yearRange[1] &&
      (filters.kmDriven === null || item.km_driven <= filters.kmDriven) &&
      (!filters.fuelType.length || filters.fuelType.includes(item.fuel_type)) &&
      (!filters.bodyType.length || filters.bodyType.includes(item.body_type)) &&
      (!filters.transmission.length || filters.transmission.includes(item.transmission)) &&
      (!filters.owner.length || filters.owner.includes(item.owners)) &&
      (!filters.seats.length || filters.seats.includes(item.seating_capacity)) &&
      (!filters.features.length || filters.features.some((feature) => item.features.includes(feature)))
    );
  }, [data, filters]);

  useEffect(() => {
    dispatch(addFilteredData(filteredData));
    dispatch(clearAllFilter(false));
  }, [filteredData, dispatch]);

  useEffect(() => {
    if (clearFilter) handleClearAll();
  }, [clearFilter]);

  const renderCheckboxGroup = (label, key, options) => (
    <div  className='product_sidebar'>
      <h6>Filter by {label}</h6>
      <div className='sidaebar-widget'>
      {options.map((option, index) => (
        <Checkbox
          key={index}
          value={option}
          onChange={(e) => handleFilterChange(key, e.target.checked ? [...filters[key], option] : filters[key].filter((v) => v !== option))}
          checked={filters[key].includes(option)}
        >
          {option}
        </Checkbox>
      ))}
      </div>
    </div>
  );

  return (
    <div>
      <div className='product_sidebar'>
        <h6>Filter by Price</h6>
        <Slider
          range
          value={filters.priceRange}
          min={0}
          max={2000000}
          step={50000}
          onChange={(value) => handleFilterChange('priceRange', value)}
          style={{ }}
        />
        <p>Selected Range: ₹{filters.priceRange[0]} - ₹{filters.priceRange[1]}</p>
      </div>

      {renderCheckboxGroup('Brand', 'brands', [...new Set(data.map((item) => item.make))])}

      <div  className='product_sidebar' style={{ marginBottom: '20px' }}>
        <h6>Filter by Year</h6>
        <Slider
          range
          value={filters.yearRange}
          min={2000}
          max={currentYear}
          onChange={(value) => handleFilterChange('yearRange', value)}
          style={{  }}
        />
        <p>Selected Range: {filters.yearRange[0]} - {filters.yearRange[1]}</p>
      </div>

      <div  className='product_sidebar' style={{ marginBottom: '20px' }}>
        <h6>Filter by KM Driven</h6>
        <div className='sidaebar-widget'>
        <Radio.Group onChange={(e) => handleFilterChange('kmDriven', e.target.value)} value={filters.kmDriven}>
          {[10000, 30000, 50000, 75000, 100000].map((km, index) => (
            <Radio.Button key={index} value={km}>{`${km.toLocaleString()} kms or less`}</Radio.Button>
          ))}
        </Radio.Group>
        </div>
      </div>

      {renderCheckboxGroup('Fuel Type', 'fuelType', [...new Set(data.map((item) => item.fuel_type))])}
      {renderCheckboxGroup('Body Type', 'bodyType', [...new Set(data.map((item) => item.body_type))])}
      {renderCheckboxGroup('Transmission', 'transmission', [...new Set(data.map((item) => item.transmission))])}

      <Collapse>
        <Panel header="Filter by Owner" key="1">
          {renderCheckboxGroup('Owner', 'owner', [...new Set(data.map((item) => item.owners))])}
        </Panel>
        <Panel header="Filter by Seats" key="2">
          {renderCheckboxGroup('Seats', 'seats', [...new Set(data.map((item) => item.seating_capacity))])}
        </Panel>
        <Panel header="Filter by Features" key="3">
          {renderCheckboxGroup('Feature', 'features', [...new Set(data.flatMap((item) => item.features))])}
        </Panel>
      </Collapse>
    </div>
  );
};

export default ProductFilter;






















































// import { Checkbox, Collapse, Radio, Slider } from 'antd';
// import React, { useEffect, useMemo, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux';
// import { addFilteredData, clearAllFilter } from '../redux/productSlice';

// const { Panel } = Collapse;

// const ProductFilter = () => {

//     const data = useSelector((state) => state.product.data);
//     const clearFilter = useSelector((state) => state.product.clearFilter);
//     const dispatch = useDispatch();

//     // Defaul Value
//     const currentYear = new Date().getFullYear();
//     const defaultPriceRange = [0, 2000000];
//     const defaultYearRange = [2000, currentYear];
//     const defaultBrands = [];
//     const defaultKmDriven = null;
//     const defaultFuelType = [];
//     const defaultBodyType = [];
//     const defaultTransmission = [];
//     const defaultOwner = [];
//     const defaultSeats = [];
//     const defaultFeatures = [];


//     // Create State
//     const [priceRange, setPriceRange] = useState(defaultPriceRange);
//     const [selectedBrands, setSelectedBrands] = useState(defaultBrands);
//     const [yearRange, setYearRange] = useState(defaultYearRange);
//     const [selectedKmDriven, setSelectedKmDriven] = useState(defaultKmDriven);
//     const [selectedFuelType, setSelectedFuelType] = useState(defaultFuelType);
//     const [selectedBodyType, setSelectedBodyType] = useState(defaultBodyType);
//     const [selectedTransmission, setSelectedTransmission] = useState(defaultTransmission);
//     const [selectedOwner, setSelectedOwner] = useState(defaultOwner);
//     const [selectedSeats, setSelectedSeats] = useState(defaultSeats);
//     const [selectedFeatures, setSelectedFeatures] = useState(defaultFeatures);


//     // Clear Filter Function
//     const handleClearAll = () => {
//         setPriceRange(defaultPriceRange);
//         setYearRange(defaultYearRange);
//         setSelectedBrands(defaultBrands);
//         setSelectedKmDriven(defaultKmDriven);
//         setSelectedFuelType(defaultFuelType);
//         setSelectedBodyType(defaultBodyType);
//         setSelectedTransmission(defaultTransmission);
//         setSelectedOwner(defaultOwner);
//         setSelectedSeats(defaultSeats);
//         setSelectedFeatures(defaultFeatures);
//     };


//     //   Filter Logic
//     const filteredData = useMemo(() => {
//         return data.filter(item =>
//             item.price >= priceRange[0] &&
//             item.price <= priceRange[1] &&
//             (selectedBrands.length === 0 || selectedBrands.includes(item.make)) &&
//             (item.manufacturing_year >= yearRange[0] && item.manufacturing_year <= yearRange[1]) &&
//             (selectedKmDriven === null || item.km_driven <= selectedKmDriven) &&
//             (selectedFuelType.length === 0 || selectedFuelType.includes(item.fuel_type)) &&
//             (selectedBodyType.length === 0 || selectedBodyType.includes(item.body_type)) &&
//             (selectedTransmission.length === 0 || selectedTransmission.includes(item.transmission)) &&
//             (selectedOwner.length === 0 || selectedOwner.includes(item.owners)) &&
//             (selectedSeats.length === 0 || selectedSeats.includes(item.seating_capacity)) &&
//             (selectedFeatures.length === 0 || selectedFeatures.some(feature => item.features.includes(feature)))
//         );
//     }, [data, priceRange, selectedBrands, yearRange, selectedKmDriven, selectedFuelType, selectedBodyType, selectedTransmission, selectedOwner, selectedSeats, selectedFeatures]);


//     // Handel Change Function
//     const handlePriceChange = (value) => {
//         setPriceRange(value);
//     };

//     const handleBrandChange = (e) => {
//         const brand = e.target.value;
//         setSelectedBrands(prevBrands =>
//             prevBrands.includes(brand)
//                 ? prevBrands.filter(b => b !== brand)
//                 : [...prevBrands, brand]
//         );
//     };

//     const handleYearChange = (value) => {
//         setYearRange(value);
//     };

//     const handleKmDrivenChange = (e) => {
//         setSelectedKmDriven(e.target.value);
//     };

//     const handleFuelTypeChange = (e) => {
//         const fuelType = e.target.value;
//         setSelectedFuelType(prevFuelType =>
//             prevFuelType.includes(fuelType)
//                 ? prevFuelType.filter(b => b !== fuelType)
//                 : [...prevFuelType, fuelType]
//         );
//     };

//     const handleBodyTypeChange = (e) => {
//         const bodyType = e.target.value;
//         setSelectedBodyType(prevBodyType =>
//             prevBodyType.includes(bodyType)
//                 ? prevBodyType.filter(b => b !== bodyType)
//                 : [...prevBodyType, bodyType]
//         );
//     };

//     const handleTransmissionChange = (e) => {
//         const transmission = e.target.value;
//         setSelectedTransmission(prevTransmission =>
//             prevTransmission.includes(transmission)
//                 ? prevTransmission.filter(b => b !== transmission)
//                 : [...prevTransmission, transmission]
//         );
//     };

//     const handleOwnerChange = (e) => {
//         const owners = e.target.value;
//         setSelectedOwner(prevOwner =>
//             prevOwner.includes(owners)
//                 ? prevOwner.filter(b => b !== owners)
//                 : [...prevOwner, owners]
//         );
//     };

//     const handleSeatsChange = (e) => {
//         const seating = e.target.value;
//         setSelectedSeats(prevSeats =>
//             prevSeats.includes(seating)
//                 ? prevSeats.filter(b => b !== seating)
//                 : [...prevSeats, seating]
//         );
//     };

//     const handleFeaturesChange = (e) => {
//         const features = e.target.value;
//         setSelectedFeatures(prevFeatures =>
//             prevFeatures.includes(features)
//                 ? prevFeatures.filter(b => b !== features)
//                 : [...prevFeatures, features]
//         );
//     };


//     // Unique Items

//     const brands = useMemo(() => {
//         const uniqueBrands = [...new Set(data.map(item => item.make))];
//         return uniqueBrands;
//     }, [data]);

//     const kmDrivenRanges = [
//         { label: '10,000 kms or less', value: 10000 },
//         { label: '30,000 kms or less', value: 30000 },
//         { label: '50,000 kms or less', value: 50000 },
//         { label: '75,000 kms or less', value: 75000 },
//         { label: '1,00,000 kms or less', value: 100000 },
//     ];

//     const fuelTypes = useMemo(() => {
//         const uniqueFuelType = [...new Set(data.map(item => item.fuel_type))];
//         return uniqueFuelType;
//     }, [data]);

//     const bodyType = useMemo(() => {
//         const uniqueBodyType = [...new Set(data.map(item => item.body_type))];
//         return uniqueBodyType;
//     }, [data]);

//     const transmission = useMemo(() => {
//         const uniqueTransmission = [...new Set(data.map(item => item.transmission))];
//         return uniqueTransmission;
//     }, [data]);

//     const owners = useMemo(() => {
//         const uniqueOwner = [...new Set(data.map(item => item.owners))];
//         return uniqueOwner;
//     }, [data]);

//     const seating = useMemo(() => {
//         const uniqueSeats = [...new Set(data.map(item => item.seating_capacity))];
//         return uniqueSeats;
//     }, [data]);

//     const features = useMemo(() => {
//         const uniqueFeatures = [...new Set(data.flatMap(item => item.features))];
//         return uniqueFeatures;
//     }, [data]);


//     // UseEffect Set Data in Redux filteredData
//     useEffect(() => {
//         dispatch(addFilteredData(filteredData));
//         dispatch(clearAllFilter(false));
//     }, [filteredData])

//     useEffect(() => {
//         if (clearFilter) {
//             handleClearAll();
//         }
//     }, [clearFilter])

//     return (
//         <div>
//             <div style={{ marginBottom: '20px' }}>
//                 <h6>Filter by Price</h6>
//                 <Slider
//                     range
//                     value={priceRange}
//                     min={0}
//                     max={2000000}
//                     step={50000}
//                     onChange={handlePriceChange}
//                     style={{ width: '300px' }}
//                 />
//                 <p>Selected Range: ₹{priceRange[0]} - ₹{priceRange[1]}</p>
//             </div>

//             <div style={{ marginBottom: '20px' }}>
//                 <h6>Filter by Brand</h6>
//                 {brands.map((brand, index) => (
//                     <Checkbox
//                         key={index}
//                         value={brand}
//                         onChange={handleBrandChange}
//                         checked={selectedBrands.includes(brand)}
//                     >
//                         {brand}
//                     </Checkbox>
//                 ))}
//             </div>

//             <div style={{ marginBottom: '20px' }}>
//                 <h6>Filter by Year</h6>
//                 <Slider
//                     range
//                     value={yearRange}
//                     min={2000}
//                     max={currentYear}
//                     onChange={handleYearChange}
//                     style={{ width: '300px' }}
//                 />
//                 <p>Selected Range: {yearRange[0]} - {yearRange[1]}</p>
//             </div>

//             <div style={{ marginBottom: '20px' }}>
//                 <h6>Filter by KM Driven</h6>
//                 <Radio.Group onChange={handleKmDrivenChange} value={selectedKmDriven}>
//                     {kmDrivenRanges.map((range, index) => (
//                         <Radio.Button key={index} value={range.value}>
//                             {range.label}
//                         </Radio.Button>
//                     ))}
//                 </Radio.Group>
//             </div>

//             <div style={{ marginBottom: '20px' }}>
//                 <h6>Filter by Fuel Type</h6>
//                 {fuelTypes.map((item, index) => (
//                     <Checkbox
//                         key={index}
//                         value={item}
//                         onChange={handleFuelTypeChange}
//                         checked={selectedFuelType.includes(item)}
//                     >
//                         {item}
//                     </Checkbox>
//                 ))}
//             </div>

//             <div style={{ marginBottom: '20px' }}>
//                 <h6>Filter by Body Type</h6>
//                 {bodyType.map((item, index) => (
//                     <Checkbox
//                         key={index}
//                         value={item}
//                         onChange={handleBodyTypeChange}
//                         checked={selectedBodyType.includes(item)}
//                     >
//                         {item}
//                     </Checkbox>
//                 ))}
//             </div>

//             <div style={{ marginBottom: '20px' }}>
//                 <h6>Filter by Transmission</h6>
//                 {transmission.map((item, index) => (
//                     <Checkbox
//                         key={index}
//                         value={item}
//                         onChange={handleTransmissionChange}
//                         checked={selectedTransmission.includes(item)}
//                     >
//                         {item}
//                     </Checkbox>
//                 ))}
//             </div>

//             <Collapse>
//                 <Panel header="Filter by Owner" key="1">
//                     <div style={{ marginBottom: '20px' }}>
//                         <h6>Filter by Owner</h6>
//                         {owners.map((item, index) => (
//                             <Checkbox
//                                 key={index}
//                                 value={item}
//                                 onChange={handleOwnerChange}
//                                 checked={selectedOwner.includes(item)}
//                             >
//                                 {item}
//                             </Checkbox>
//                         ))}
//                     </div>
//                 </Panel>
//             </Collapse>

//             <Collapse>
//                 <Panel header="Filter by Owner" key="2">
//                     <div style={{ marginBottom: '20px' }}>
//                         {seating.map((item, index) => (
//                             <Checkbox
//                                 key={index}
//                                 value={item}
//                                 onChange={handleSeatsChange}
//                                 checked={selectedSeats.includes(item)}
//                             >
//                                 {item}
//                             </Checkbox>
//                         ))}
//                     </div>
//                 </Panel>
//             </Collapse>

//             <Collapse>
//                 <Panel header="Filter by Feature" key="3">
//                     <div style={{ marginBottom: '20px' }}>
//                         {features.map((item, index) => (
//                             <Checkbox
//                                 key={index}
//                                 value={item}
//                                 onChange={handleFeaturesChange}
//                                 checked={selectedFeatures.includes(item)}
//                             >
//                                 {item}
//                             </Checkbox>
//                         ))}
//                     </div>
//                 </Panel>
//             </Collapse>
//         </div>
//     )
// }

// export default ProductFilter
