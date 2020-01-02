import React, { useState } from 'react';
import Autosuggest from 'react-autosuggest';
import styled from 'styled-components';
import Tile from '@kiwicom/orbit-components/lib/Tile';
import InputField from '@kiwicom/orbit-components/lib/InputField';
import { Movie } from './Movie.js';

const imdb = require('imdb-api');

const MovieInputWrapper = styled.div`
    .react-autosuggest__suggestions-list {
        list-style: none;
        padding: 0;
        margin-top: -20px;
        li {
            margin: 0;
        }
    }
`;

const movies = [
    {
        name: 'Buddy der Weihnachtself',
        year: 2003,
        imdb_url: 'https://www.imdb.com/title/tt0319343/',
    },
    {
        name: 'Titanic',
        year: 1999,
        imdb_url: 'https://www.imdb.com/title/tt03asf3/',
    },
];

// Teach Autosuggest how to calculate suggestions for any given input value.
const getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    const query = encodeURIComponent(inputValue);
    const url = `https://www.omdbapi.com/?apikey=91ffa603&page=1&r=json&s=${query}`;

    if (value.length < 3) return Promise.resolve([]);

    return fetch(url)
        .then(res => {
            return res.json();
        })
        .then(results => {
            console.log(results);
            if (results.Error) return Promise.reject(results.Error);
            return results.Search.length < 1
                ? []
                : results.Search.map(result => {
                      return {
                          name: result.Title,
                          year: result.Year,
                          imdb_url: `https://www.imdb.com/title/${result.imdbId}/`,
                      };
                  });
        });
};

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => {
    return suggestion.name;
};

const InputWrapper = styled.div`
    margin: 1em 0;
`;

const renderInputComponent = inputProps => {
    return (
        <InputWrapper>
            <InputField {...inputProps} />
        </InputWrapper>
    );
};

class Example extends React.Component {
    constructor() {
        super();

        // Autosuggest is a controlled component.
        // This means that you need to provide an input value
        // and an onChange handler that updates this value (see below).
        // Suggestions also need to be provided to the Autosuggest,
        // and they are initially empty because the Autosuggest is closed.
        this.state = {
            value: '',
            suggestions: [],
        };
    }

    onChange = (event, { newValue }) => {
        this.setState({
            value: newValue,
        });
    };

    // Use your imagination to render suggestions.
    renderSuggestion = suggestion => {
        return <Movie suggestion movie={suggestion} />;
    };

    // Autosuggest will call this function every time you need to update suggestions.
    // You already implemented this logic above, so just use it.
    onSuggestionsFetchRequested = ({ value }) => {
        getSuggestions(value).then(suggs => {
            this.setState({
                suggestions: suggs,
            });
        });
    };

    // Autosuggest will call this function every time you need to clear suggestions.
    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: [],
        });
    };

    handleSuggestionSelected = (event, { suggestion }) => {
        this.props.markToAdd(suggestion);
        this.setState({
            value: '',
        });
    };

    render() {
        const { value, suggestions } = this.state;

        // Autosuggest will pass through all these props to the input.
        const inputProps = {
            placeholder: 'Enter a movie',
            value,
            onChange: this.onChange,
        };

        // Finally, render it!
        return (
            <MovieInputWrapper>
                <Autosuggest
                    suggestions={suggestions}
                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                    getSuggestionValue={getSuggestionValue}
                    renderSuggestion={this.renderSuggestion}
                    inputProps={inputProps}
                    renderInputComponent={renderInputComponent}
                    onSuggestionSelected={this.handleSuggestionSelected}
                />
            </MovieInputWrapper>
        );
    }
}

export default Example;
