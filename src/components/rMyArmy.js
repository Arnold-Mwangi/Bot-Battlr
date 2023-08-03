import { AppContext } from "../BotContext"
import { useContext } from "react"
import { parseISO, format } from 'date-fns'
import '../CSS/styles.css'

export default function MyArmy() {

    const { MyArmyBots } = useContext(AppContext)
    console.log(MyArmyBots)

    const formatDate = (dateString) => {
        const dateObject = parseISO(dateString)
        return format(dateObject, "yyyy-MM-dd")

    }

    const formatTime = (dateString) => {
        const dateObject = parseISO(dateString)
        return format(dateObject, "HH:mm:ss");

    }


    return (
        <>
            <div className="col-md-3 ">
                <h4>My army</h4>
                {MyArmyBots.map((item) => (
                    <div key={item.id} className="card m-2  text-white" style={{ width: '18rem' }}>
                        <img src={item.avatar_url} className="card-img" alt={item.name} />
                        <div className="card-img-overlay">
                            <p className="card-text">{item.name}</p>
                            <p className="card-text">{item.catchphrase}</p>

                            <div class="list-group list-group-flush bg-transparent">
                                <h4 class="list-group-item">Last Updates</h4>
                                <p className=" list-group-item">
                                    Date: {formatDate(item.updated_at)}
                                </p>

                                <p className="list-group-item">
                                    Time: {formatTime(item.updated_at)}
                                </p>

                            </div>


                        </div>
                    </div>
                ))}
            </div>


        </>
    )
}