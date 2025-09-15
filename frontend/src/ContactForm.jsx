import {useState} from "react"

const ContactForm = ({existingContact = {}, updateCallback}) => {
    const [firstName, setFirstName] = useState(existingContact.firstName || "")
    const [lastName, setLastName] = useState(existingContact.lastName || "")
    const [nickname, setNickname] = useState(existingContact.nickname || "")
    const [monday, setMonday] = useState(existingContact.monday || "")
    const [tuesday, setTuesday] = useState(existingContact.tuesday || "")
    const [wednesday, setWednesday] = useState(existingContact.wednesday || "")
    const [thursday, setThursday] = useState(existingContact.thursday || "")
    const [friday, setFriday] = useState(existingContact.friday || "")
    const [saturday, setSaturday] = useState(existingContact.saturday || "")
    const [sunday, setSunday] = useState(existingContact.sunday || "")

    const updating = Object.entries(existingContact).length !== 0

    const daysOfWeek = ["monday",]

    const onSubmit = async(e) => {
        e.preventDefault()

        const data = {
            firstName,
            lastName,
            nickname,
            monday,
            tuesday,
            wednesday,
            thursday,
            friday,
            saturday,
            sunday
        }
        const url = "http://127.0.0.1:5000/" + (updating ? `update_contact/${existingContact.id}` : "create_contact")
        const options = {
            method: updating ? "PATCH":  "POST", 
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
        const response = await fetch(url, options)
        if(response.status !== 201 && response.status !== 200) {
            const data = await response.json()
            alert(data.message)
        } else {
            updateCallback()
            // successful
        }
    }
    
    return (
        <form onSubmit = {onSubmit}>
            <div>
                <label htmlFor = "firstName">First Name:</label>
                <input 
                    type = "text" 
                    id = "firstName" 
                    value = {firstName} 
                    onChange = {(e) => setFirstName(e.target.value)}
                />
                <label htmlFor = "lastName">Last Name:</label>
                <input 
                    type = "text" 
                    id = "lastName" 
                    value = {lastName} 
                    onChange = {(e) => setLastName(e.target.value)}
                />
                <label htmlFor = "nickname">Nickname:</label>
                <input 
                    type = "text" 
                    id = "nickname" 
                    value = {nickname} 
                    onChange = {(e) => setNickname(e.target.value)}
                />
                <p>
                    <label htmlFor = "monday">Monday:</label>
                    <input
                        type = "text"
                        id = "monday"
                        value = {monday}
                        onChange = {(e) => setMonday(e.target.value)}
                    />
                </p>
                <hr />
                <p>
                    <label htmlFor = "tuesday">Tuesday:</label>
                    <input
                        type = "text"
                        id = "tuesday"
                        value = {tuesday}
                        onChange = {(e) => setTuesday(e.target.value)}
                    />
                </p>
                <p>
                    <label htmlFor = "wednesday">Wednesday:</label>
                    <input
                        type = "text"
                        id = "wednesday"
                        value = {wednesday}
                        onChange = {(e) => setWednesday(e.target.value)}
                    />
                </p>
                <p>
                    <label htmlFor = "thursday">Thursday:</label>
                    <input
                        type = "text"
                        id = "thursday"
                        value = {thursday}
                        onChange = {(e) => setThursday(e.target.value)}
                    />
                </p>
                <p>
                    <label htmlFor = "friday">Friday:</label>
                    <input
                        type = "text"
                        id = "friday"
                        value = {friday}
                        onChange = {(e) => setFriday(e.target.value)}
                    />
                </p>
                <p>
                    <label htmlFor = "saturday">Saturday:</label>
                    <input
                        type = "text"
                        id = "saturday"
                        value = {saturday}
                        onChange = {(e) => setSaturday(e.target.value)}
                    />
                </p>
                <p>
                    <label htmlFor = "sunday">Sunday:</label>
                    <input
                        type = "text"
                        id = "sunday"
                        value = {sunday}
                        onChange = {(e) => setSunday(e.target.value)}
                    />
                </p>
            </div>
            <button type = "submit"> {updating ? "Update" : "Create" }
            </button>
        </form>
    )
}

export default ContactForm 