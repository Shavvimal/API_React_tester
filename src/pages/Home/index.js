import React, { useState, useRef } from 'react';
import './styleHome.css'
import {Button} from '../../components';
import { createClient } from '@supabase/supabase-js'
import JSONPretty from 'react-json-pretty';
import 'react-json-pretty/themes/monikai.css';


const Home = () => {
    
    const supabaseUrl = 'https://xjpcntvnzjibfebgiczg.supabase.co'
    
    const supabaseKey = process.env.API_ANON
    const supabaseKeyService = process.env.API_SERVICE

    const AccessTokenShav = process.env.API_SHAVHUGAN
    const AccessTokenShavG = process.env.API_SHAVGRAPHICS
    
    const supabase = createClient(supabaseUrl, supabaseKey)
    const supabaseServ = createClient(supabaseUrl, supabaseKeyService)
    
    const { user, error } = supabase.auth.setAuth(AccessTokenShav)
    
    const [output, setOutput] = useState()

    var JSONPrettyMon = require('react-json-pretty/dist/monikai');

    const clear = () => {
        setOutput("")
    }

    const API1 = async () => {
        let { data: profile, error } = await supabase
        .from('profile')
        .select('*').eq('email', 'shavhugan@gmail.com')

        // fetch actual email from AsyncStorage

        let { data: private_profile, error2 } = await supabase
        .from('private_profile')
        .select('*')

        setOutput(`[${JSON.stringify(profile).replace('[', '').replace(']', '')}, ${JSON.stringify(private_profile).replace('[', '').replace(']', '')}]`)
    }

    const API2 = async () => {

        const { data, error } = await supabase
        .from('private_profile')
        .update({ country_id: 2,
                date_of_birth: '11-27-1998'
                                         })
        .match({ user_id: '1cd5b79a-ba8d-4788-b7eb-d73954885cae' })

        console.log(error)
    }

    const log = () => {
        console.log(supabaseKeyShavGraphics)
    }

    return (
        <>
        <div className="grid place-items-center">
        <h1 className="mt-6 text-white font-bold text-3xl"> React-Supabase API Tester</h1>
            <div className="grid grid-cols-6 gap-4 my-4">
            <Button text="API 1" onClickFun={API1}/>
            <Button text="API 2" onClickFun={API2}/>
            <Button text="API 3" onClickFun={API1}/>
            <Button text="API 4" onClickFun={API1}/>
            <Button text="API 5" onClickFun={API1}/>
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
            <Button text="log" onClickFun={log}/>
            <Button text="Clear" onClickFun={clear}/>
            
            </div>
            <JSONPretty id="json-pretty" data={output} theme={JSONPrettyMon}></JSONPretty>
            </div>
        </>
    )
}

export default Home;
