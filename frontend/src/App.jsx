import { useState, useEffect } from 'react'
import './App.css'
import ContactList from './ContactList'
import ContactForm from './ContactForm'

function App() {
  const [contacts, setContacts] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentContact, setCurrentContact] = useState({})

  // Fetch contacts from backend
  useEffect(() => {
    fetchContacts()
  }, [])

  const fetchContacts = async () => {
    const response = await fetch("http://127.0.0.1:5000/contacts")
    const data = await response.json()
    setContacts(data.contacts)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setCurrentContact({})
  }

  const openCreateModal = () => {
    if (!isModalOpen) setIsModalOpen(true)
  }

  const openEditModal = (contact) => {
    if (isModalOpen) return
    setCurrentContact(contact)
    setIsModalOpen(true)
  }

  const onUpdate = () => {
    closeModal()
    fetchContacts()
  }

  // Calculate common availability
  const calculateTimesAvailable = () => {
    const days = ["monday","tuesday","wednesday","thursday","friday","saturday","sunday"]
    const result = {}

    days.forEach(day => {
      const allSlots = contacts.map(contact => contact.availability?.[day] || [])

      const parsed = allSlots.map(slots => {
        let hours = new Set()
        slots.forEach(slot => {
          const [start, end] = slot.split("-").map(Number)
          for (let i = start; i <= end; i++) hours.add(i)
        })
        return hours
      })

      let intersection = parsed[0] || new Set()
      parsed.slice(1).forEach(s => {
        intersection = new Set([...intersection].filter(x => s.has(x)))
      })

      const sorted = [...intersection].sort((a,b) => a-b)
      const ranges = []
      let rangeStart = null

      for (let i = 0; i < sorted.length; i++) {
        if (rangeStart === null) rangeStart = sorted[i]
        if (sorted[i+1] !== sorted[i]+1) {
          ranges.push(rangeStart === sorted[i] ? `${rangeStart}` : `${rangeStart}-${sorted[i]}`)
          rangeStart = null
        }
      }

      result[day] = ranges.length ? ranges.join(", ") : "No common availability"
    })

    console.log(result)
    alert(JSON.stringify(result, null, 2))
  }

  return (
    <>
      <ContactList 
        contacts={contacts} 
        updateContact={openEditModal} 
        updateCallback={onUpdate}
      />
      <button onClick={openCreateModal}>Create New User</button>
      <button onClick={calculateTimesAvailable}>Calculate Times Available</button>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <ContactForm 
              existingContact={currentContact} 
              updateCallback={onUpdate} 
            />
          </div>
        </div>
      )}
    </>
  )
}

export default App
