import { createContext, useReducer, useEffect } from 'react'
import MyArmy from './components/MyArmy'
import BotCollection from './components/BotCollection'
import BotDetails from './components/BotDetails'
import Header from './components/Header'

import axios from 'axios'

export const AppContext = createContext([])

const botReducer = (state, action) => {
    switch (action.type) {
        case "SET_BOTS":
            return { ...state, Bots: action.payload }

        case "ADD_TO_ARMY":
            return { ...state, MyArmyBots: [...state.MyArmyBots, action.payload] }

            case "REMOVE_FROM_ARMY":
                return { ...state, MyArmyBots: state.MyArmyBots.filter(bot => bot.id !== action.payload.id)};

        case "SET_SHOW_ALERT":
            return { ...state, showAlert: action.payload }

        case "SHOW_BOT_DETAILS":
            return { ...state, botDetails: action.payload }

        default:
            return state
    }
}

export default function BotContext() {

    const [state, dispatch] = useReducer(botReducer, { Bots: [], MyArmyBots: [], showAlert: false, botDetails: null });


    useEffect(() => {
        axios
            .get("https://bots-lab.onrender.com/bots")
            .then(res => {
                dispatch({ type: "SET_BOTS", payload: res.data })
                // setBots(res.data)

                //set initial bot details
                if (res.data.length > 0) {
                    dispatch({ type: "SHOW_BOT_DETAILS", payload: res.data[0] });
                }
                console.log("data fetched");
            })
    }, [])


    return (
        <AppContext.Provider value={{ ...state, dispatch }}>
        <Header />
        <div className="container-fluid" style={{ margin: 0, padding: 0 }}>
          <div className="row">
            {/* BotCollection as sidebar */}
            <div className="col-md-3">
              <BotCollection />
            </div>
      
            {/* BotDetails and MyArmy stacked on top of each other */}
            <div className="col-md-9">
              <div className="column">
                <div className="col-md-12 position-sticky top-0">
                  <BotDetails />
                  <MyArmy />
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 position-sticky top-0">
                 
                </div>
              </div>
            </div>
          </div>
        </div>
      </AppContext.Provider>
      
    )
}