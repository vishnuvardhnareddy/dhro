import React from 'react';
import { useParams } from 'react-router-dom';

const MocktestForm = () => {
    const { id } = useParams(); // Destructure 'id' from the params object

    return (
        <h1>MocktestForm {id}</h1> // Display the 'id' value
    );
};

export default MocktestForm;