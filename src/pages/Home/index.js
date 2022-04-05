import React, { useState, useRef } from 'react';
import './styleHome.css'
import { NavLink } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js'
import JSONPretty from 'react-json-pretty';
import 'react-json-pretty/themes/monikai.css';

const supabaseUrl = 'https://xjpcntvnzjibfebgiczg.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhqcGNudHZuemppYmZlYmdpY3pnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDg3MTQ4MjUsImV4cCI6MTk2NDI5MDgyNX0.-PjM0_qTNNW1P5vSsqCPAwEeO-R9e9PjZCUAzRm7yWg'
const supabaseAnon = createClient(supabaseUrl, supabaseKey)
const supabaseSigned = createClient(supabaseUrl, supabaseKey)

const Home = () => {
    const [output, setOutput] = useState()
    var JSONPrettyMon = require('react-json-pretty/dist/monikai');

    const API1 = async () => {
        let { data: profile, error } = await supabaseAnon
        .from('profile')
        .select('*')
        setOutput(JSON.stringify(profile))
    }

    return (
        <>
        <div className="grid place-items-center">
        <h1 className="mt-6 text-white font-bold text-3xl"> React-Supabase API Tester</h1>
            <div className="flex flex-row my-4">

            <button onClick={API1} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mx-2 rounded-full"> 
            1
            </button>

            <button onClick={API1} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mx-2 rounded-full"> 
            2
            </button>

            </div>
            <JSONPretty id="json-pretty" data={output} theme={JSONPrettyMon}></JSONPretty>
            </div>
        </>
    )
}

export default Home;
