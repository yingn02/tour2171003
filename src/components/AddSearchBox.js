import React, { useState } from 'react';

function AddSearchBox({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = () => {
        onSearch(searchTerm); // 검색어를 부모 컴포넌트로 전달
    };

    return (
        <div>
            <input
                type="text"
                placeholder="검색 예) 박물관"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            &emsp;
            <button onClick={handleSearch}>검색</button>
        </div>
    );
}

export default AddSearchBox;