import React, { useState } from 'react';
import AddSearchBox from './components/AddSearchBox';
import AddTypeFilter from './components/AddTypeFilter';
import AddRegionFilter from './components/AddRegionFilter';
import AddMap from "./components/AddMap";
import AddWeather from './components/AddWeather';
import AddNews from './components/AddNews';
import AddBottomBar from './components/AddBottomBar';

function App() {
    //const [searchQuery, setSearchQuery] = useState('');
    const [selectedType, setSelectedType] = useState('');
    const [selectedRegion, setSelectedRegion] = useState('');
    const [data, setData] = useState(null);

    const onDataFetched = (data) => {
        setData(data);
    };

    return (
        <>
            <div>
                <AddSearchBox 
                selectedType={selectedType}
                selectedRegion={selectedRegion}
                onDataFetched={onDataFetched}
                />
            </div>
            <br />
            <div>
                <AddTypeFilter onSelect={(value) => setSelectedType(value)} />
                &emsp;
                <AddRegionFilter onSelect={(value) => setSelectedRegion(value)} />
            </div>
            <br />
            <div style={{ display: 'flex' }}>
                <div>
                    <AddMap />
                </div>
                &emsp;
                <div>
                    <div>
                        <AddWeather cdata={data} />
                    </div>
                    <br />
                    <div>
                        <AddNews cdata={data} />
                    </div>
                </div>
            </div>
            <br />
            <AddBottomBar cdata={data} />
        </>
    );
}

export default App;