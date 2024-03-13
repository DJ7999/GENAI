// Autocomplete.js

import React, { useState } from 'react';
import Autosuggest from 'react-autosuggest';

const AutocompleteGoal = ({ suggestions, onSelect }) => {
  const [value, setValue] = useState('');
  const [suggestionsList, setSuggestionsList] = useState([]);

  const getSuggestions = (inputValue) => {
    const inputValueLowerCase = inputValue.toLowerCase();
    return suggestions.filter(
      (item) => item.name.toLowerCase().includes(inputValueLowerCase)
    );
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestionsList(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestionsList([]);
  };

  const onSuggestionSelected = (event, { suggestion }) => {
    setValue(suggestion.name);
    onSelect(suggestion);
  };

  const onChange = (event, { newValue }) => {
    setValue(newValue);
  };

  const getSuggestionValue = (suggestion) => suggestion.name;

  const renderSuggestion = (suggestion) => (
    <div>{suggestion.name}</div>
  );

  const theme = {
    container: {
      position: 'relative',
    },
    suggestionsContainer: {
      position: 'absolute',
      zIndex: 1,
      backgroundColor: '#333', // Dark background color
      color: '#fff', // White text color
      border: '1px solid #555', // Dark border color
    },
    suggestion: {
      padding: '10px',
      cursor: 'pointer',
    },
    suggestionHighlighted: {
      backgroundColor: '#555', // Darker background color for highlighted suggestion
    },
  };

  const inputProps = {
    placeholder: 'Type to search...',
    value,
    onChange,
  };

  return (
    <Autosuggest
      suggestions={suggestionsList}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      onSuggestionSelected={onSuggestionSelected}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      inputProps={inputProps}
      theme={theme}
    />
  );
};

export default AutocompleteGoal;
