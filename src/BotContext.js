import {createContext, useReducer, useEffect} from 'react'
import MyArmy from './components/MyArmy'
import BotCollection from './components/BotCollection'
import axios from 'axios'

export const AppContext = createContext([])

const botReducer = (state, action) =>{
    switch (action.type) {
        case "SET_BOTS":
            return {...state, Bots: action.payload}
            
        case "ADD_TO_ARMY":
            return {...state, MyArmyBots:[...state.MyArmyBots, action.payload]}
        
            case "SET_SHOW_ALERT":
                return {...state, showAlert: action.payload}
    
        default:
            return state
    }
}

export default function BotContext(){

    const [state, dispatch] = useReducer(botReducer, {Bots: [], MyArmyBots: [], showAlert: false});

    useEffect(()=>{
        axios
        .get("http://localhost:40001/bots")
        .then(res=>{
            dispatch({type: "SET_BOTS", payload: res.data})
            // setBots(res.data)
            console.log("data fetched");
        })
    }, [])
   

    return(
        <AppContext.Provider 
        value ={{...state, dispatch}}
        >
             <MyArmy />
            <BotCollection />
           
        </AppContext.Provider>
    )
}