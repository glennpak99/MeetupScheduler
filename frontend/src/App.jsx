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
  const days = ["monday","tuesday","wednesday","thursday","friday","saturday","sunday"];
  const result = {};

  days.forEach(day => {
    const allRanges = contacts.map(contact => {
      const slots = contact.availability?.[day] || [];
      return slots.map(slot => {
        const [start, end] = slot.split("-").map(Number);
        return [start, end];
      });
    });

    let overlaps = allRanges[0] || [];
    allRanges.slice(1).forEach(userRanges => {
      const newOverlaps = [];
      overlaps.forEach(([oStart, oEnd]) => {
        userRanges.forEach(([uStart, uEnd]) => {
          const start = Math.max(oStart, uStart);
          const end = Math.min(oEnd, uEnd);        
          if (start < end) {                       
            newOverlaps.push([start, end]);      
          }
        });
      });
      overlaps = newOverlaps;                     
    });

    if (overlaps.length === 0) {
      result[day] = "No common availability";
    } else {
      result[day] = overlaps.map(([start,end]) => `${start}-${end}`).join(", ");
    }
  });

  console.log(result);
  alert(JSON.stringify(result, null, 2));
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
