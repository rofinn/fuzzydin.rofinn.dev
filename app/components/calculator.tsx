'use client'

import { useState } from 'react';

import Form from './form';
import Table from './table';
import { Results } from '../types';



export default function Calculator() {
    const [results, setResults] = useState<Results>(
        {
            result: 0,
            skier: { codes: [], weights: [] },
            boot: { codes: [], weights: [] },
        }
    )

    return (
        <>
            <Form setResults={setResults} />
            <Table results={results} />
        </>
    )
}
