import React from 'react'
import { Form } from 'react-bootstrap'

export default function FormInput({name,placeholder,label, ...rest}) {
  return (
    <div className="flex flex-col-reverse p-2">
      <Form.Group>
    <Form.Control
      id={name}
      name={name}
      className=""
      placeholder={placeholder}
      {...rest}
    />
    <Form.Label
      className=""
      htmlFor={name}
    >
      {label}
    </Form.Label>
  </Form.Group>
  </div>
  )
}
