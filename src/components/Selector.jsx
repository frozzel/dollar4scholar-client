import React from "react";

export default function Selector({ name, options, value, label, onChange }) {
  return (
    <select
      className="form-select border p-1 pr-3 rounded"
      id={name}
      name={name}
      value={value}
      onChange={onChange}
    >
      <option value="">{label}</option>
      {options.map(({ title, value }) => {
        return (
          <option key={title} value={value}>
            {title}
          </option>
        );
      })}
    </select>
  );
}
