import React from "react";
import { ImSpinner3 } from "react-icons/im";
import { Button } from "react-bootstrap";

export default function Submit({ value, busy, type, onClick }) {
  return (
    
    <Button
      type={type || "submit"}
      variant="outline-*"
      className="getstarted2 align-items-center " style={{textDecoration: 'none', outline: "none"}}
      onClick={onClick}
    >
      {busy ? <ImSpinner3 className="animate-spin" /> : value}
    </Button>
  );
}
