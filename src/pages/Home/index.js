import React, { useState, useRef } from 'react';
import './styleHome.css'
import {Button} from '../../components';
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

    const clear = () => {
        setOutput("")
    }

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
            <div className="grid grid-cols-6 gap-4 my-4">
            <Button text="API 1" onClickFun={API1}/>
            <Button text="API 2" onClickFun={API1}/>
            <Button text="API 3" onClickFun={API1}/>
            <Button text="API 4" onClickFun={API1}/>
            <Button text="API 5" onClickFun={API1}/>
            <Button text="API 6" onClickFun={API1}/>
            <Button text="API 7" onClickFun={API1}/>
            <Button text="API 8" onClickFun={API1}/>
            <Button text="API 9" onClickFun={API1}/>
            <Button text="API 10" onClickFun={API1}/>
            <Button text="API 11" onClickFun={API1}/>
            <Button text="API 12" onClickFun={API1}/>
            <Button text="API 13" onClickFun={API1}/>
            <Button text="API 14" onClickFun={API1}/>
            <Button text="API 15" onClickFun={API1}/>
            <Button text="API 16" onClickFun={API1}/>
            <Button text="API 17" onClickFun={API1}/>
            <Button text="API 18" onClickFun={API1}/>
            <Button text="API 19" onClickFun={API1}/>
            <Button text="API 20" onClickFun={API1}/>
            <Button text="API 21" onClickFun={API1}/>
            <Button text="API 22" onClickFun={API1}/>
            <Button text="API 23" onClickFun={API1}/>
            <Button text="API 24" onClickFun={API1}/>
            <Button text="API 25" onClickFun={API1}/>
            <Button text="API 26" onClickFun={API1}/>
            <Button text="API 27" onClickFun={API1}/>
            <Button text="API 28" onClickFun={API1}/>
            <Button text="API 29" onClickFun={API1}/>
            <Button text="Clear" onClickFun={clear}/>
            
            </div>
            <JSONPretty id="json-pretty" data={output} theme={JSONPrettyMon}></JSONPretty>
            </div>
        </>
    )
}

export default Home;
