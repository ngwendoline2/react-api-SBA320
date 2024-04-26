import React, { useState } from 'react';
import axios from 'axios';
const Search = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [counties, setCounties] = useState([]);
    const apiKey = 'YOUR_API_KEY';
    const handleSearch = async () => {
        try {
            const response = await axios.get(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=counties+in+city+of+chicago&key=${apiKey}`);
            setCounties(response.data.results);
        } catch (error) {
            console.error('Error fetching counties:', error);
        }
    };
    return (
        <div>
            <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for counties in Chicago..."
            />
            <button onClick={handleSearch}>Search</button>
            <div>
                {counties.length > 0 && (
                    <ul>
                        {counties.map((county) => (
                            <li key={county.id}>{county.name}</li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};
export default Search;