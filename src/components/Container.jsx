import React from "react";

export default function Container({ children, className }) {
  return (
    <div className={"container-fluid mx-auto " + className}>{children}</div>
  );
}
