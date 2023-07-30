import { useState } from "react";
import ContactModal from "./ContactModal";
import { IoPersonAdd } from "react-icons/io5";

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
      <button className="mt-2 lg:mt-5 lg:mr-3 mr-1" onClick={openModal}>
        <IoPersonAdd className="h-11 w-10 text-tahiti-150" />
      </button>
      {isModalOpen && <ContactModal onClose={closeModal} />}
    </div>
  );
}

export default AddContact;
