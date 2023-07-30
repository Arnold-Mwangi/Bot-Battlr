import { AppContext } from "../BotContext"
import { useContext } from "react"
import { parseISO, format } from 'date-fns'
import axios from "axios"
import '../CSS/styles.css'

export default function BotDetails() {

    const { botDetails, MyArmyBots, Bots, dispatch } = useContext(AppContext);

    const formatDate = (dateString) => {
        const dateObject = parseISO(dateString)
        return format(dateObject, "yyyy-MM-dd")

    }

    const formatTime = (dateString) => {
        const dateObject = parseISO(dateString)
        return format(dateObject, "HH:mm:ss");

    }
    const handleAddToMyArmy = (botDetails) => {

        const isInBot = MyArmyBots.find((bot) => bot.id === botDetails.id)

        if (!isInBot) {
            dispatch({ type: "ADD_TO_ARMY", payload: botDetails })
        } else {
            dispatch({ type: 'SET_SHOW_ALERT', payload: true })


        }
    };
    const handleDischarge = (botDetails) => {

        //delete from server
        axios.delete(`http://localhost:40001/bots/${botDetails.id}`)

        //delete from Army squad

        dispatch({ type: "REMOVE_FROM_ARMY", payload: botDetails })

        //Delete from parent state

        const isInBots = Bots.find((bot) => bot.id === botDetails.id)

        if (isInBots) {
            dispatch({ type: "SET_BOTS", payload: Bots.filter(bot => bot.id !== botDetails.id) })
        }

        // find id of next bot in Bots state
        const nextBotIndex = Bots.findIndex((bot)=>bot.id === botDetails.id + 1)

        // update show details to the next bot in bots state or set null if there is no next        
        dispatch({ type: "SHOW_BOT_DETAILS", payload: Bots[nextBotIndex] || null });

    }
    return (
        <div className="col-md-12 d-flex justify-content-center align-items-center mt-5">
            {botDetails ? (
                <div className="w-75 mx-auto">
                    <div className="card p-0 border-0 bg-secondary text-white" style={{ maxHeight: '400px' }}>
                        <div className="card-body">

                            <img
                                src={botDetails.avatar_url}
                                className="card-img-top img-fluid rounded-circle mx-auto mb-3"
                                alt="..."
                                style={{ maxWidth: '200px', maxHeight: '200px', objectFit: 'cover' }}
                            />
                            <h5 className="card-title text-center">{botDetails.name}</h5>
                            <div className="d-flex justify-content-center"> {/* Add this div to center the table */}
                                <table className="table table-bordered table-striped text-white" style={{ maxWidth: '500px' }}>
                                    <tbody>
                                        <tr>
                                            <th className="fw-bold">Health</th>
                                            <th className="fw-bold">Damage</th>
                                            <th className="fw-bold">Armor</th>
                                            <th colSpan="2" className="fw-bold">Last Update</th>
                                        </tr>
                                        <tr>
                                            <td>{botDetails.health}</td>
                                            <td>{botDetails.damage}</td>
                                            <td>{botDetails.armor}</td>
                                            <th>Date</th>
                                            <th>Time</th>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td>{formatDate(botDetails.updated_at)}</td>
                                            <td>{formatTime(botDetails.updated_at)}</td>
                                        </tr>
                                    </tbody>




                                </table>
                            </div>
                            <div className="overlay-content position-absolute top-50 start-50 translate-middle w-100 h-100">
                                {/* Add your overlay content here */}
                                <button className="btn btn-success m-2" onClick={() => handleAddToMyArmy(botDetails)}>Add to Army</button>
                                <button className="btn btn-danger m-2" onClick={() => handleDischarge(botDetails)}>Discharge Bot</button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <p>Please select a bot to view its details.</p>
            )}
        </div>


    );
}