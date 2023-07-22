import React from "react";
import { BiEdit } from "react-icons/bi";

function EditProfileButton(props) {
  return (
    <button type={props.type}>
      <BiEdit />

      {/* {props.buttonName} */}
    </button>
  );
}

export default EditProfileButton;
