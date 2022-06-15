import { useState, useEffect } from 'react'
import { search } from 'fast-fuzzy'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

import people from './data/people.json'

import useDebouncedValue from './utils/useDebouncedValue'


function App() {

  const [selectedName, setSelectedName] = useState()
  const [query, setQuery] = useState('')
  const [autoCompleteResults, setAutoCompleteResults] = useState([])
  const searchTerm = useDebouncedValue(query, 500)

  const handleSelectedPersonChange = (value) => {
    if (!value) {
      setSelectedName()
    } else {
      setAutoCompleteResults([])
      setSelectedName(value.name)
    }
  }

  const handleSearchInputChange = (event, value) => {
    setQuery(value)
  }
  
  useEffect(() => {
    
    const fetchAutoCompleteSuggestions = async (searchTerm = '') => {
      const suggestions = search(searchTerm, people, {keySelector: (obj) => obj.name}).slice(0, 5)
      setAutoCompleteResults([...suggestions]) 
    }
    
    if (!searchTerm) {
      return setAutoCompleteResults([])
		}

		fetchAutoCompleteSuggestions(searchTerm)
	}, [searchTerm])


  return (
    <Container maxWidth="sm">
      <Box mt={3}>
        <Autocomplete
          id="star-search"
          options={ autoCompleteResults }
          open={(searchTerm && !selectedName) ? true : false}
          // option label will error on garbage input values without suggestions, set to empty string fallback
          getOptionLabel={ option => option.name ? option.name : '' }
          onInputChange={ (event, value) => handleSearchInputChange(event, value) }
          onChange={ (event, value) => {
            if (autoCompleteResults.length) handleSelectedPersonChange(value)
          }}
          blurOnSelect
          renderInput={(params) => (
            <TextField
              {...params}
              label="🔍 Search for Movie Stars!"
              margin="normal"
              variant="outlined"
              helperText="Actors, Directors, Writers, Producers..."
            />
          )}
        />
        {
          selectedName &&
            <Typography variant="subtitle1">Selected Person:&nbsp;<i>{selectedName}</i></Typography>
        }
      </Box>
    </Container>
  );
}

export default App;
