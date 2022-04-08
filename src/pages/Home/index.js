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

    // returns all values for a certain key
    function findAllByKey(obj, keyToFind) {
        return Object.entries(obj)
          .reduce((acc, [key, value]) => (key === keyToFind)
            ? acc.concat(value)
            : (typeof value === 'object')
            ? acc.concat(findAllByKey(value, keyToFind))
            : acc
          , [])
      }

    // boils down array to unique ones
    const unique = (value, index, self) => {
    return self.indexOf(value) === index
    }

    const clear = () => {
        setOutput("")
    }

    const API1 = async () => {
        // Get your own Profile details
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
        // Update your profile details 
        // const user_id = 'b50cb036-1a04-4bd9-a8f9-0ed8bb69d78f'
        const user_id = '1cd5b79a-ba8d-4788-b7eb-d73954885cae'

        const { data, error } = await supabase
        .from('private_profile')
        .update({ country_id: 2,
                date_of_birth: '10-28-1998',
                last_login: new Date().toISOString()
                })
        .match({ user_id: user_id })
        
        error ? setOutput(error) : setOutput(data)
    }

    const API3 = async (e) => {
        // POST new profile picture & Update Profile Table with URL to new profile picture
        // const user_id = 'b50cb036-1a04-4bd9-a8f9-0ed8bb69d78f'
        const user_id = '1cd5b79a-ba8d-4788-b7eb-d73954885cae'
        // get file 
        const profilePicture = e.target.files[0]
        const timestamp = new Date().toISOString()
        const filename = `${user_id}/${timestamp}.${profilePicture.name.split(".").pop()}`

        // Upload the image to the users folder in profile pictures 
        const { data, error } = await supabase
          .storage
          .from('profilepictures')
          .upload(filename, profilePicture, {
            cacheControl: '3600',
            upsert: false
        })
        
        // Update Profile Table with URL to new profile picture. 
        const { data2, error2 } = await supabase
        .from('profile')
        .update({ profile_photo_url: `${timestamp}.${profilePicture.name.split(".").pop()}` })
        .eq('user_id', user_id)
        
        error ? setOutput(error) : setOutput(data)
    }

    const API6 = async () => {
        // GET Lists a user is watching
        //const user_id = 'b50cb036-1a04-4bd9-a8f9-0ed8bb69d78f'
        const user_id = '1cd5b79a-ba8d-4788-b7eb-d73954885cae'

        const { data, error, count } = await supabase
        .from('lists')
        .select('*, watching!inner(*)', { count: 'exact' })
        .eq('watching.user_id', user_id) // user is this in watching, returns lists that should match in the other table

        error ? setOutput(error) : setOutput(data)
        console.log(count)

    }

    const API7 = async () => {
        // returns all lists with pins that a user is watching

        //const user_id = 'b50cb036-1a04-4bd9-a8f9-0ed8bb69d78f'
        const user_id = '1cd5b79a-ba8d-4788-b7eb-d73954885cae'

        const { data, error, count } = await supabase
        .from('lists')
        //selects all lists, returns all poeple watching, and all pins in that list that match that list 
        .select('*, watching!inner(user_id), pin!lists_pin!inner(*)', { count: 'exact' })
        .eq('watching.user_id', user_id) // user is this in watching, returns lists that should match in the other table

        error ? setOutput(error) : setOutput(data)
        console.log(count)
    }

    const API8 = async (user_id) => {
        // Return Array of all unique Pins from lists that a user is watching
        // GET Comments from lists > Pins a user is watching

        //const user_id = 'b50cb036-1a04-4bd9-a8f9-0ed8bb69d78f'
        const { data, error, count } = await supabase
        .from('lists')
        //selects all lists, returns all poeple watching, and all pins in that list that match that list 
        .select('list_id, watching!inner(user_id), pin!lists_pin!inner(pin_id)', { count: 'exact' })
        .eq('watching.user_id', user_id) // user is this in watching, returns lists that should match in the other table
        
        // console.log(data)

        const array = findAllByKey(data, 'pin_id').filter(unique)

        error ? setOutput(error) : setOutput(array)
        
        return array
    }

    const API9 = async () => {
        // GET all Comments on Pins from lists a user is watching 
        // most recent comments on lists we are watching, with details of pins.
        // ordered by datetime
        const user_id = '1cd5b79a-ba8d-4788-b7eb-d73954885cae'
        const array = await API8(user_id)
        //console.log(array)
        const { data, error } = await supabase
        .from('comments')
        .select('*, pin!inner(pin_id, pin_photo_url, pin_name, label_id )')
        .in('pin_id', array)
        .order('post_date', { ascending: false })

        error ? setOutput(error) : setOutput(data)
    }

    const API10 = async (pin) => {
        // user sees a pin. Which lists do i follow that this is in?

        //const user_id = 'b50cb036-1a04-4bd9-a8f9-0ed8bb69d78f'
        const user_id = '1cd5b79a-ba8d-4788-b7eb-d73954885cae'

        const { data, error, count } = await supabase
        .from('lists')
        //selects all lists, returns all poeple watching, and all pins in that list that match that list 
        .select('list_id, title, watching!inner(user_id), pin!lists_pin!inner(pin_id)', { count: 'exact' })
        .eq('watching.user_id', user_id) // user is this in watching, returns lists that should match in the other table
        .eq('pin.pin_id', pin)

        error ? setOutput(error) : setOutput(data)
    }

    const API11 = async () => {
        // Fetch your own Lists with the respective Pins

        //const user_id = 'b50cb036-1a04-4bd9-a8f9-0ed8bb69d78f'
        const user_id = '1cd5b79a-ba8d-4788-b7eb-d73954885cae'

        const { data, error, count } = await supabase
        .from('lists')
        .select('*, pin!lists_pin!inner(*)', { count: 'exact' })
        .eq('user_id', user_id)

        error ? setOutput(error) : setOutput(data)
        console.log(count)
    }
    

    const API12 = async (pin) => {
        // See if a pin was visted or not

        //const user_id = 'b50cb036-1a04-4bd9-a8f9-0ed8bb69d78f'
        const user_id = '1cd5b79a-ba8d-4788-b7eb-d73954885cae'
        const timestamp = new Date().toISOString()

        const { data, error } = await supabase
        .from('pin')
        .select('visited')
        .eq('pin_id', pin)

        error ? setOutput(error) : setOutput(data)
        return data[0].visited
    }

    const API14 = async (pin) => {
        // See notes of 1 pin

        //const user_id = 'b50cb036-1a04-4bd9-a8f9-0ed8bb69d78f'
        const user_id = '1cd5b79a-ba8d-4788-b7eb-d73954885cae'
        const timestamp = new Date().toISOString()

        const { data, error } = await supabase
        .from('pin')
        .select('notes')
        .eq('pin_id', pin)

        error ? setOutput(error) : setOutput(data)
        return data[0].notes
    }

    const API13 = async (pin) => {
        // Click on "visited" on own pins, add notes if they have any, and this will update visyed with a visited date
        //const user_id = 'b50cb036-1a04-4bd9-a8f9-0ed8bb69d78f'
        const user_id = '1cd5b79a-ba8d-4788-b7eb-d73954885cae'
    
        const visited = await API12(pin)
        const timestamp = new Date()
        
        const note = "a note on this pin"
        const old_note =  note ? await API14(pin) : ""

        // conditionally render a body for the update depending on if there is a pin available
        const body = note ?
        { visited_time: timestamp, 
            visited: !visited,
            notes: `${old_note} \n ${timestamp.toDateString()} \n ${note}` }
        :{ visited_time: timestamp.toISOString(), 
            visited: !visited }
        
        const { data, error } = await supabase
        .from('pin')
        .update(body)
        .match({ pin_id: pin })

        error ? setOutput(error) : setOutput(data)
    }

    const API15 = async (user_id) => {
        //See Pins that have been visited in lists that you follow. Retuns array of pin_id's

        //const user_id = 'b50cb036-1a04-4bd9-a8f9-0ed8bb69d78f'
        const { data, error, count } = await supabase
        .from('lists')
        //selects all lists, returns all poeple watching, and all pins in that list that match that list 
        .select('list_id, watching!inner(user_id), pin!lists_pin!inner(pin_id)', { count: 'exact' })
        .eq('watching.user_id', user_id) // user is this in watching, returns lists that should match in the other table
        .eq('pin.visited', true) // user is this in watching, returns lists that should match in the other table
        
        // console.log(data)

        const array = findAllByKey(data, 'pin_id').filter(unique)

        error ? setOutput(error) : setOutput(array)
        
        return array
    }

    const API16 = async () => {
        //See most recent Pins that have been visited in lists that you follow. With lists details

        //const user_id = 'b50cb036-1a04-4bd9-a8f9-0ed8bb69d78f'
        const user_id = '1cd5b79a-ba8d-4788-b7eb-d73954885cae'
        const array = await API15(user_id)

        let { data, error } = await supabase
        .from('pin')
        .select('*')
        .in('pin_id', array)
        .order('visited_time', { ascending: false })

        error ? setOutput(error) : setOutput(data)      

    }


    const log = () => {
        const event = new Date();
        console.log(new Date().toISOString());
    }

    return (
        <>
        <div className="grid place-items-center">
        <h1 className="mt-6 text-white font-bold text-3xl"> API Tester</h1>
            <div className="grid grid-cols-6 gap-4 my-4">
            <Button text="API 1" onClickFun={API1}/>
            <Button text="API 2" onClickFun={API2}/>
            <div>
                <label htmlFor="files" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mx-2 rounded-full">API 3</label>
                <input id="files" className='hidden' type="file" onChange={API3}/>
            </div>

            {/* <div>
                <label htmlFor="files2" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mx-2 rounded-full">API 4</label>
                <input id="files2" className='hidden' type="file" onChange={API4}/>
            </div> */}

            <Button text="API 6" onClickFun={API6}/>
            <Button text="API 7" onClickFun={API7}/>
            <Button text="API 8" onClickFun={() => API8('1cd5b79a-ba8d-4788-b7eb-d73954885cae')}/>
            <Button text="API 9" onClickFun={API9}/>
            <Button text="API 10" onClickFun={() => API10(39)}/>
            <Button text="API 11" onClickFun={API11}/>
            <Button text="API 12" onClickFun={() => API12(3)}/>
            <Button text="API 13" onClickFun={() => API13(3)}/>
            <Button text="API 14" onClickFun={() => API14(3)}/>
            <Button text="API 15" onClickFun={() => API15('1cd5b79a-ba8d-4788-b7eb-d73954885cae')}/>
            <Button text="API 16" onClickFun={API16}/>
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
