import { useState, useEffect } from "react";
import ContactModal from "./ContactModal";

function AddContact() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <button onClick={openModal}>Add Contact</button>
      {isModalOpen && <ContactModal onClose={closeModal} />}
    </div>
  );
}

export default AddContact;
