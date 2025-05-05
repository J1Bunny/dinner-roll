import React, { useState } from 'react';
import './App.css'; // Assuming you have this CSS file

function CheckboxList({ options }) {
  const [checkedItems, setCheckedItems] = useState({});
  const [randomOptions, setRandomOptions] = useState({}); // State to hold random options for each checkbox

  const handleChange = (event) => {
    const { name, checked } = event.target;
    setCheckedItems((prevState) => ({ ...prevState, [name]: checked }));
  };

  const handleGenerateAllRandomOptions = () => {
    const newRandomOptions = {};
    options.forEach((option) => {
      const dieOptionsString = option.dieOptions;
      if (dieOptionsString) {
        const optionsArray = dieOptionsString.split(',').map(opt => opt.trim());
        if (optionsArray.length > 0) {
          const randomIndex = Math.floor(Math.random() * optionsArray.length);
          newRandomOptions[option.value] = optionsArray[randomIndex];
        } else {
          newRandomOptions[option.value] = 'No options';
        }
      } else {
        newRandomOptions[option.value] = 'No options list';
      }
    });
    setRandomOptions(newRandomOptions);
  };

  return (
    <div className="checkbox-list">
      <button onClick={handleGenerateAllRandomOptions}>Roll</button>
      <br></br>
      {options.map((option) => (
        <div key={option.value}>
          <input
            type="checkbox"
            name={option.value}
            checked={checkedItems[option.value] || false}
            onChange={handleChange}
          />
          <label htmlFor={option.value}>{option.label}</label>
          {randomOptions[option.value] && (
            <span>: {randomOptions[option.value]}</span>
          )}
        </div>
      ))}
    </div>
  );
}

function App() {
  const diceList = [
    { dieType: 'cheese', dieOptions: 'cheddar, swiss, pepperjack, brie, blue, gruyere' },
    { dieType: 'fruit', dieOptions: 'grapes, berries, banana chips, dried apricots, cherries, oranges' },
    { dieType: 'spreads', dieOptions: 'coarse mustard, fig spread, lavender jelly, pesto, raspberry jam, sweet mustard' },
    { dieType: 'meat', dieOptions: 'prosciutto, ham, salami, hickory stick, sausage, smoked salmon' },
    { dieType: 'bread', dieOptions: 'toast, crackers, saltines, baguette, triscuits, multigrain' },
    { dieType: 'beer', dieOptions: 'stout, ipa, pilsner, microbrew, sour, wheat' },
    { dieType: 'wine', dieOptions: 'red, white, sparkling, sweet, rose, spice' },
    { dieType: 'extras', dieOptions: 'chocolate, nuts, pickles, olives, ginger, bruschetta' }
  ];

  const [numberOfCheckboxes, setNumberOfCheckboxes] = useState(diceList.length);
  const [dynamicOptions, setDynamicOptions] = useState([]);

  React.useEffect(() => {
    setDynamicOptions(
      Array.from({ length: numberOfCheckboxes }, (_, index) => ({
        label: diceList[index]?.dieType || `Option ${index + 1}`,
        value: `dynamicOption${index + 1}`,
        dieOptions: diceList[index]?.dieOptions || '', // Pass dieOptions to the options array
      }))
    );
  }, [numberOfCheckboxes, diceList]);

  const handleInputChange = (event) => {
    setNumberOfCheckboxes(parseInt(event.target.value, 10) || 0);
  };

  return (
    <div>
      <h2>Dinner Roll</h2>
      <CheckboxList options={dynamicOptions} />
    </div>
  );
}

export default App;