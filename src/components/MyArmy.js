import { AppContext } from "../BotContext"
import { useContext } from "react"

export default function MyArmy(){

    const{MyArmyBots} = useContext(AppContext)
    console.log(MyArmyBots)

    return(
        <>
        <h1>My army</h1>
        {MyArmyBots.map((item)=>(
            <div key ={item.id}className="card bg-dark text-white">
            <img src={item.avatar_url} className="card-img" alt={item.name} />
            <div className="card-img-overlay">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
              <p className="card-text">Last updated 3 mins ago</p>
            </div>
          </div>
        ))}

        </>
    )
}