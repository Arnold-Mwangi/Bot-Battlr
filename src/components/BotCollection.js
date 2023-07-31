import { useContext, useEffect, useRef } from 'react'
import { AppContext } from '../BotContext'
import '../CSS/styles.css'


export default function BotCollection() {

    const { Bots, MyArmyBots, showAlert, dispatch } = useContext(AppContext)


    const toastRef = useRef(null)



    const handleAddToMyArmy = (item) => {

        // const isInBot = MyArmyBots.find((bot) => bot.id === item.id)

        // if (!isInBot) {
        //     dispatch({ type: "ADD_TO_ARMY", payload: item })
        // } else {
        //     dispatch({ type: 'SET_SHOW_ALERT', payload: true })


        // }
    };
    const handleShowDetails = (item) => {
        dispatch({ type: 'SHOW_BOT_DETAILS', payload: item });

    }

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
            <div className='col-md-5'>

                <nav className="navbar navbar-expand-md navbar-dark bg-dark flex-md-column">
                    <div className="navbar-nav flex-column">
                        {Bots.map((item) => (
                            <p key={item.id} className="nav-link" activeClassName="active"  onClick={()=>handleShowDetails (item)} style={{ color: 'white' }}>
                                <img src={item.avatar_url} className="card-img-top" alt="..." />
                                {item.name}</p>
                                
                            
                        ))}
                    </div>
                </nav>

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
            </div>

        </>
    )
}