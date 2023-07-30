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
                <div className="row d-flex justify-content-start">
                    {MyArmyBots.map((item) => (
                        <div key={item.id} className="col-md-4">
                            <div className="card m-2 text-white bg-dark" style={{ borderRadius: '10px', overflow: 'hidden' }}>
                                <img src={item.avatar_url} className="card-img" alt={item.name} style={{ height: '200px', objectFit: 'cover' }} />
                                <div className="card-body">
                                    <h5 className="card-title">{item.name}</h5>
                                </div>
                                <div className="card-footer bg-white border-top-0">
                                    <p className="card-text text-success">{item.catchphrase}</p>
                                    <p className="card-text text-muted mb-0">Last Updated:</p>
                                    <p className="card-text text-muted">Date: {formatDate(item.updated_at)}</p>
                                    <p className="card-text text-muted">Time: {formatTime(item.updated_at)}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>


        </>
    )
}