import React from "react";

const commonPosterUI =
"d-flex justify-content-center align-items-center border border-dashed rounded aspect-video  cursor-pointer";


export default function PosterSelector({
  name,
  accept,
  label,
  selectedPoster,
  className,
  onChange,
}) {


  return (
    <div>
      <input
        accept={accept}
        onChange={onChange}
        name={name}
        id={name}
        type="file"
        hidden
      />
      <label htmlFor={name}>
        {selectedPoster ? (
          <img
            className={commonPosterUI + " object-cover " + className}
            src={selectedPoster}
            alt=""
            style={{ width: '400px', height: 'auto', }}
          />
        ) : (
          <PosterUI className={className} label={label} style={{ width: '400px', height: 'auto' }}/>
        )}
      </label>
    </div>
  );
}

const PosterUI = ({ label, className }) => {
  return (
    <div className={commonPosterUI + " " + className}>
      <span className="text-center" style={{ maxWidth: '450px', height: '250px', alignContent: "center", alignItems: "center", padding: 100 }}>{label}</span>
    </div>
  );
};
