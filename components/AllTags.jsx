import React, { useEffect, useState } from 'react';

const FetchAllTags = () => {

    const [tags, setTags] = useState([]);

    useEffect(() => {
        const fetchTags = async () => {
            const response = await fetch('/api/tags');
            const data = await response.json();
            setTags(data);
        }
        fetchTags();
    }, []);

    return (<>
        <ul className='tags-list'>
            {tags.map((tag, index) => (
                <li key={index}>
                    <a href={"/search?keyword=" + tag}>
                        {tag}
                    </a>
                </li>
            ))}
        </ul>
    </>);
}

export default FetchAllTags;