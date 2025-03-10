import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const MocktestForm = () => {
    const [data, setData] = useState(null)
    useEffect(() => {
        const fetchData = async () => {

            const data = await axios.get(`http://localhost:5000/api/testseries/mocktests/${id}`)
            setData(data);
        }
        fetchData();
        console.log(data); // Log the 'id' value
    }, [])
    const { id } = useParams(); // Destructure 'id' from the params object

    return (
        <h1>MocktestForm {id}</h1> // Display the 'id' value
    );
};

export default MocktestForm;