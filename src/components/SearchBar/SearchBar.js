import styles from "../SearchBar/SearchBar.module.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

function SearchBar(props) {
    const [countries, setCountries] = useState([]);
    const [error, setError] = useState("");
    const [loading, toggleLoading] = useState(false);

    function keyPressCheck(e) {
        if (e.keyCode === 13) {
            props.fetchSearchData();
        }
    }

    useEffect(() => {
        async function fetchCountryData() {
            setError("");
            toggleLoading(true);
            try {
                const response = await axios.get(
                    'https://unogs-unogs-v1.p.rapidapi.com/aaapi.cgi',
                    {
                        params: {t: 'lc', q: 'available'},
                        headers: {
                            'x-rapidapi-key': '5f8cd96691msh979b7a58ac3d79bp1afb83jsndb0fb614cce9',
                            'x-rapidapi-host': 'unogs-unogs-v1.p.rapidapi.com',
                        },
                    }
                );
                setCountries(response.data.ITEMS);
            } catch (e) {
                setError("Something went wrong... 😢");
                console.error(e);
            }
            toggleLoading(false);
        }
        fetchCountryData();
    }, []);

    return (
        <>
            <input
                className={styles['search-new']}
                type="text"
                value={props.searchText}
                onChange={(event) => props.setSearchText(event.target.value)}
                placeholder="Please enter country"
                onKeyDown={keyPressCheck}
                list='countries'
            />
            <datalist id="countries">
                {countries &&
                countries.map((country) => {
                    return <option value={country[1].toUpperCase()}>{country[2]}</option>
                })}
            </datalist>
            <button
                type="submit"
                className={styles.searchNew}
                onClick={props.fetchSearchData}
                disabled={!props.searchText}
            >
                Search
            </button>
            {error && <p className={styles.error}>{error}</p>}
            {loading && <p>Data is being loaded...</p>}
        </>
    );
}

export default SearchBar;


