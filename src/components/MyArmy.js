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
        <div className="col-md-12">
            <h4>My army</h4>
            <div className="row">
                {MyArmyBots.map((item) => (
                    <div key={item.id} className="col-md-4 mb-3">
                        <div className="card bg-dark text-white" style={{ width: '19rem' }}>
                            <img src={item.avatar_url} className="card-img h-25" alt={item.name} />
                            <div className="card-img-overlay position-relative">
                                <h5 className="card-title">{item.name}</h5>
                                <p className="card-text position-absolute bottom-0 start-0 end-0 bg-dark text-white p-2">{item.catchphrase}</p>
                            </div>
                            <div className="card-footer bg-transparent border-0">
                                <div className="last-updates">
                                    <h6>Last Updates</h6>
                                    <p>Date: {formatDate(item.updated_at)}</p>
                                    <p>Time: {formatTime(item.updated_at)}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </>
    
    
    )
}