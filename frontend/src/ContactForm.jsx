import {useState} from "react"

const ContactForm = ({existingContact = {}, updateCallback}) => {
    const [firstName, setFirstName] = useState(existingContact.firstName || "")
    const [lastName, setLastName] = useState(existingContact.lastName || "")
    const [nickname, setNickname] = useState(existingContact.nickname || "")
    const [availability, setAvailability] = useState(existingContact.availability || {})

    const updating = Object.entries(existingContact).length !== 0

    const daysOfWeek = ["monday","tuesday","wednesday","thursday","friday","saturday","sunday"];

    const onSubmit = async(e) => {
        e.preventDefault()
        const parsedAvailability = {};
            for (const day of daysOfWeek) {
                const val = availability[day];
                if (typeof val === "string") {
                    parsedAvailability[day] = val.split(",").map(slot => slot.trim());
                } else if (Array.isArray(val)) {
                    parsedAvailability[day] = val; // already an array
                } else {
                    parsedAvailability[day] = [];
                }
            }
        const data = {
            firstName,
            lastName,
            nickname,
            availability: parsedAvailability
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
                {daysOfWeek.map(day => (
                    <p key={day}>
                        <label htmlFor={day}>{day.charAt(0).toUpperCase() + day.slice(1)}:</label>
                        <input
                        type="text"
                        id={day}
                        placeholder="e.g., 1-4,6-9,13-18"
                        value={availability[day] || ""}
                        onChange={(e) =>
                            setAvailability({ ...availability, [day]: e.target.value })
                        }
                        />
                    </p>
                    ))}
            </div>
            <button type = "submit"> {updating ? "Update" : "Create" }
            </button>
        </form>
    )
}

export default ContactForm 