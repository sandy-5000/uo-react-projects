import "./css/MailModal.css"
import { useEffect, useState } from "react"


export default function MailModal({ list, setMailModal }) {

    const [animation, setAnimation] = useState('')
    const [recipient, setRecipient] = useState('')

    const [failed, setFailed] = useState(false)
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
        setAnimation('top-show')
    }, [])

    const closeMailModal = () => {
        setAnimation('')
        setFailed(false)
        setSuccess(false)
        setTimeout(() => {
            setMailModal(false)
        }, 250)
    }

    const sendMail = () => {
        if (recipient.trim() === '') {
            return
        }

        const subject = 'Movies Recommended'
        const body = 'Movies List:\n' + list.map((x, index) => `${index + 1}) ${x.name}`).join('\n')
        const key = 'UOL'

        let url = 'http://www.hyd.int.untd.com/~nsivan/mail/sendmail.php'
        let data = {
            recipient: recipient.trim(),
            subject,
            body,
            key
        }
        console.log(data)

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(response => {
                console.log(response)
                if (response.code === 0) {
                    setSuccess(true)
                } else {
                    setFailed(true)
                }
            })
            .catch(error => {
                setFailed(true)
                console.log(failed)
                console.log('Error:', error)
            })
    }

    return (
        <div className="z-10 absolute w-full left-0 top-0 py-5 flex justify-center">
            <div className={"lg:w-4/12 md:w-6/12 w-11/12 bg-slate-100 rounded-md p-3 top-hidden " + animation}>
                <div className="m-header flex justify-between">
                    <span className="block font-semibold">MailBox</span>
                    <button type="button" onClick={closeMailModal} className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100">
                        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div className="m-body">
                    <label htmlFor="email" className="block mb-2">Enter Email</label>
                    <input type="email" name="email" id="email" value={recipient} onChange={(e) => setRecipient(e.target.value)} placeholder="Enter Email" className="email rounded-sm px-3 py-2 bg-white" />
                    <div className="h-10">
                        {
                            success &&
                            <p className="my-2 px-2 text-green-700 e-success">Email send successfully</p>
                        }
                        {
                            failed &&
                            <p className="my-2 px-2 text-red-500 e-fail">Failed to send Email</p>
                        }
                    </div>
                </div>
                <div className="m-footer flex mt-2 justify-end">
                    <button type="button" className="bg-slate-700 hover:bg-slate-800 font-semibold rounded-md p-2 px-3 text-white" onClick={closeMailModal}>Close</button>
                    <span className="px-1"></span>
                    <button type="button" className="bg-indigo-700 hover:bg-indigo-800 font-semibold rounded-md p-2 px-3 text-white" onClick={sendMail}>Send Mail</button>
                </div>
            </div>
        </div>
    )
}