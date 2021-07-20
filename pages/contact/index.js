import React from 'react'
import Head from 'next/head'
import ContactForm from '../../components/contact/Contact'

function ContactPage() {
    return (
        <>
            <Head>
                <title>Contact Me</title>
                <meta name='description' content='Send me your messages!'/>
            </Head>
            <ContactForm/>
        </>
    )
}

export default ContactPage
