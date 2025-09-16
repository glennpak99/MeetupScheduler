import React from "react"

const ContactList = ({contacts, updateContact, updateCallback}) => {
    const onDelete = async (id) => {
        try {
            const options = {
                method: "DELETE"
            }
            const response = await fetch (`http://127.0.0.1:5000/delete_contact/${id}`, options)
            if(response.status === 200) {
                updateCallback()
            } else {
                console.error("Failed to delete")
            }
        } catch (error) {
            alert(error)
        }
    }
    
    const days = ["monday","tuesday","wednesday","thursday","friday","saturday","sunday"];
    
    return <div>
        <h2>
            Users
        </h2>
        <table>
            <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Nickname</th>
                    {days.map((day) => <th key={day}>{day.charAt(0).toUpperCase() + day.slice(1)}</th>)}
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {contacts.map((contact) =>  (
                    <tr key = {contact.id}>
                        <td>{contact.firstName}</td>
                        <td>{contact.lastName}</td>
                        <td>{contact.nickname}</td>
                        {days.map((day) => (
                            <td key={day}>
                                {contact.availability?.[day]?.join(", ") || "N/A"}
                            </td>
                        ))}
                        <td>
                            <button onClick = {() => updateContact(contact)}>Update</button>
                            <button onClick ={() => onDelete(contact.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
}

export default ContactList