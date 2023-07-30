import { useContext, useEffect, useRef } from 'react'
import { AppContext } from '../BotContext'

export default function BotCollection() {

    const { Bots, MyArmyBots, showAlert, dispatch } = useContext(AppContext)

    const toastRef = useRef(null)



    const handleAddToMyArmy = (item) => {

        const isInBot = MyArmyBots.find((bot) => bot.id === item.id)

        if (!isInBot) {
            dispatch({ type: "ADD_TO_ARMY", payload: item })
        } else {
            dispatch({ type: 'SET_SHOW_ALERT', payload: true })


        }
    };

    useEffect(() => {
        if (showAlert) {
            // show toast
            const toastElement = toastRef.current;
            toastElement.classList.add('show')

            // Hide the toast after 3 seconds
            setTimeout(() => {
                dispatch({ type: 'SET_SHOW_ALERT', payload: false });
                toastElement.classList.remove('show')
            }, 1000);
        }
    }, [showAlert, dispatch]);

    return (
        <>
            <div className='col-md-4'>
                <div
                    ref={toastRef}
                    className={`toast position-fixed top-0 start-50 translate-middle-x ${showAlert ? 'show' : ''
                        }`}
                    role="alert"
                    aria-live="assertive"
                    aria-atomic="true"
                    style={{ zIndex: '9999' }}
                >
                    <div className="toast-header">
                        <strong className="me-auto">Notification</strong>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="toast"
                            aria-label="Close"
                            onClick={() => dispatch({ type: 'SET_SHOW_ALERT', payload: false })}
                        ></button>
                    </div>
                    <div className="toast-body">This bot is already in the Army.</div>
                </div>
                {Bots.map((item) => (
                    <div key={item.id} className="card m-2" style={{ width: '18rem' }} onClick={() => handleAddToMyArmy(item)}>
                        <img src={item.avatar_url} className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">{item.name}</h5>

                        </div>
                    </div>
                ))}
            </div>

        </>
    )
}