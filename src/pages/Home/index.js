import React, { useState, useRef } from 'react';
import './styleHome.css'
import { NavLink } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js'
import JSONPretty from 'react-json-pretty';
import 'react-json-pretty/themes/monikai.css';

const supabaseUrl = 'https://xjpcntvnzjibfebgiczg.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhqcGNudHZuemppYmZlYmdpY3pnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDg3MTQ4MjUsImV4cCI6MTk2NDI5MDgyNX0.-PjM0_qTNNW1P5vSsqCPAwEeO-R9e9PjZCUAzRm7yWg'
const supabase = createClient(supabaseUrl, supabaseKey)

const Home = () => {

    
    const [output, setOutput] = useState()


    const pressed = async () => {
        let { data: profile, error } = await supabase
        .from('profile')
        .select('*')
        setOutput(JSON.stringify(profile))
    }

    var JSONPrettyMon = require('react-json-pretty/dist/monikai');


    return (
        <><div className="grid place-items-center">
            <div className="flex flex-row">

            <button onClick={pressed} className="mt-12 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-2 rounded-full"> 
            Button
            </button>

            <button onClick={pressed} className="mt-12 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-2 rounded-full"> 
            Button
            </button>
            
            </div>
            <JSONPretty id="json-pretty" data={output} theme={JSONPrettyMon}></JSONPretty>
            </div>
        </>
    )
}

export default Home;
