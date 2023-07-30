import {createContext, useState} from 'react'

export const AppContext = createContext(null)

export default function BotContext(){

    const [Bots, setBots] = useState(null)

    return(
        <AppContext.Provider>
            <BotCollection />
            <MyArmy />
        </AppContext.Provider>
    )
}