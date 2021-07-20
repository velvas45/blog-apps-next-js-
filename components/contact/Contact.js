import React from 'react'
import classes from './contact.module.css'
import Notification from '../ui/Notification'

async function sendContactData(contactDetails) {
    const response = await fetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify(contactDetails),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    
    const data = await response.json()

    if(!response.ok){
        throw new Error(data.message || 'Something went wrong!')
    }
}

export default function ContactForm() {
    const [enteredEmail, setEnteredEmail] = React.useState()
    const [enteredName, setEnteredName] = React.useState()
    const [enteredMessage, setEnteredMessage] = React.useState()
    const [requestStatus, setRequestStatus] = React.useState()
    const [requestError, setRequestError] = React.useState()

    React.useEffect(() => {
        if(requestStatus === 'success' || requestStatus === 'error'){
            const timer = setTimeout(() => {
                setRequestError(null);
                setRequestStatus(null)
            }, 2000)

            return () => clearTimeout(timer)
        }
    },[requestStatus])

    const sendMessageHandler = async (e) => {
        e.preventDefault()

        setRequestStatus('pending')

        // send http request
        try{
            await sendContactData({
                email: enteredEmail,
                name: enteredName,
                message: enteredMessage
            })
            setRequestStatus('success')
            setEnteredEmail('')
            setEnteredMessage('')
            setEnteredName('')
        } catch(err){
            console.log(err.message)
            setRequestError(err.message)
            setRequestStatus('error')
        }

    }

    let notification;
    
    if(requestStatus === 'pending'){
        notification = {
            status: requestStatus,
            title: 'Sending Message...',
            message: 'Your message is on its way!'
        }
    }

    if(requestStatus === 'success'){
        notification = {
            status: requestStatus,
            title: 'Success!',
            message: 'Message sent successfully!'
        }
    }

    if(requestStatus === 'error'){
        notification = {
            status: requestStatus,
            title: 'Error!',
            message: requestError
        }
    }
    

    return (
        <section className={classes.contact}>
            <h1>How can i help you?</h1>
            <form className={classes.form} onSubmit={sendMessageHandler}>
                <div className={classes.controls}>
                    <div className={classes.control}>
                        <label htmlFor="email">Your Email</label>
                        <input id="email" name="enteredEmail" type="email" required value={enteredEmail || ''} onChange={(e) => setEnteredEmail(e.target.value)}/>
                    </div>

                    <div className={classes.control}>
                        <label htmlFor="name">Your Name</label>
                        <input id="name" name="name" type="text" required value={enteredName || ""} onChange={(e) => setEnteredName(e.target.value)}/>
                    </div>
                </div>
                <div className={classes.control}>
                    <label htmlFor="message">Your Message</label>
                    <textarea id="message" rows="5" value={enteredMessage || ""} required onChange={(e) => setEnteredMessage(e.target.value)}></textarea>
                </div>

                <div className={classes.actions}>
                    <button>Send Message</button>
                </div>
            </form>

            {notification && <Notification status={notification.status} title={notification.title} message={notification.message}/>}
        </section>
    )
}
