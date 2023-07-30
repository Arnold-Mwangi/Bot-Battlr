import { useContext, useEffect, useRef } from 'react'
import { AppContext } from '../BotContext'
import '../CSS/styles.css'


export default function BotCollection() {

    const { Bots, showAlert, dispatch } = useContext(AppContext)


    const toastRef = useRef(null)



    // const handleAddToMyArmy = (item) => {

    //     // const isInBot = MyArmyBots.find((bot) => bot.id === item.id)

    //     // if (!isInBot) {
    //     //     dispatch({ type: "ADD_TO_ARMY", payload: item })
    //     // } else {
    //     //     dispatch({ type: 'SET_SHOW_ALERT', payload: true })


    //     // }
    // };
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
            <div
                className="col-md-9 h-100 mt-1"
                style={{
                    overflowY: 'auto', // Add vertical scroll if the content overflows
                    maxHeight: '100vh', // Set the maximum height of the container
                }}
            >
                <nav className="navbar navbar-expand-md navbar-dark bg-dark flex-md-column">
                    <div className="navbar-nav flex-column" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0px' }}>
                        {Bots.map((item) => (
                            <p
                                key={item.id}
                                className="nav-link"
                                activeClassName="active"
                                onClick={() => handleShowDetails(item)}
                                style={{
                                    color: 'white',
                                    borderBottom: '1px solid white', // Add bottom border
                                    borderLeft: '1px solid white',   // Add left border
                                    borderRight: '1px solid white',  // Add right border
                                    display: 'flex',
                                    alignItems: 'center',
                                    marginBottom: '5px', // Add some space between the paragraphs
                                    width: '100%', // Ensure the paragraphs fit within the grid columns
                                    paddingLeft: '5px', // Add left padding for better spacing
                                }}
                            >
                                <img
                                    src={item.avatar_url}
                                    className="rounded-circle me-2"
                                    alt={item.name}
                                    style={{ width: '40px', height: '40px' }}
                                />
                                {item.name}
                            </p>
                        ))}
                    </div>
                </nav>

                <div
                    ref={toastRef}
                    className={`toast position-fixed top-0 bg-warning start-50 translate-middle-x ${showAlert ? 'show' : ''
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