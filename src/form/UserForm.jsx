import React, { useEffect, useState } from "react";
import { ImSpinner3 } from "react-icons/im";
import { useNotification } from "../hooks";
import PosterSelector from "../components/PosterSelector";
import { Button } from "react-bootstrap";

const defaultUserInfo = {
  name: "",
  phone: "",
  address: "",
  birth: "",
  school: "",
  major: "",
  avatar: null,
};

const validateActor = ({ avatar, name }) => {
  
  if (!name.trim()) return { error: "User name is missing!" };

  if (avatar && !avatar.type?.startsWith("image"))
    return { error: "Invalid image / avatar file!" };

  return { error: null };
};

export default function UserForm({
  title,
  initialState,
  btnTitle,
  busy,
  onSubmit,
}) {
  const [userInfo, setUserInfo] = useState({ ...defaultUserInfo });
  const [selectedAvatarForUI, setSelectedAvatarForUI] = useState("https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp");
  const { updateNotification } = useNotification();

  const updatePosterForUI = (file) => {
    const url = URL.createObjectURL(file);
    setSelectedAvatarForUI(url);
  };

  const handleChange = ({ target }) => {
    const { value, files, name } = target;
    if (name === "avatar" && files.length > 0) {
      const file = files[0];
      updatePosterForUI(file);
      setUserInfo({ ...userInfo, [name]: file });
    } else {
      setUserInfo({ ...userInfo, [name]: value });
    }
    
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { error } = validateActor(userInfo);
    if (error) return updateNotification("error", error);

    // submit form
    const formData = new FormData();
    for (let key in userInfo) {
      if (key) formData.append(key, userInfo[key]);
    }
    onSubmit(formData);
  };

  useEffect(() => {
    if (initialState) {
      setUserInfo({ ...initialState, avatar: null });
      setSelectedAvatarForUI(initialState.avatar);
    }
  }, [initialState]);

  const { name, phone, address, birth, school, major } = userInfo;
  return (
    <form
      className="bg-light  p-3 rounded"
      
      onSubmit={handleSubmit}
    >
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="font-weight-bold text-xl text-dark">
          {title}
        </h1>
        <Button
          className="getstarted3"
          type="submit"
          variant="outline-*"
        >
          {busy ? <ImSpinner3 className="spinner-border" /> : btnTitle}
        </Button>
      </div>

      <div className="d-flex flex-column flex-md-row align-items-stretch">
        <div className="mr-md-3 mb-3 mb-md-0 ">
          <PosterSelector
            selectedPoster={selectedAvatarForUI}
            className="w-36 h-auto aspect-square object-cover"
            name="avatar"
            onChange={handleChange}
            label="Select avatar"
            accept="image/jpg, image/jpeg, image/png"
            style={{ width: '150px', height: '150px' }} 
          />
        </div>

        <div className="flex-grow d-flex flex-column space-y-2 w-100">
          <input
            placeholder="Enter name"
            type="text"
            className="form-control border-bottom bg-transparent mb-1"
            name="name"
            value={name}
            onChange={handleChange}
          />
          <input
            placeholder="Enter Phone"
            type="text"
            className="form-control border-bottom bg-transparent mb-1"
            name="phone"
            value={phone}
            onChange={handleChange}
          />
          <input
            placeholder="Enter Address"
            type="text"
            className="form-control border-bottom bg-transparent mb-1"
            name="address"
            value={address}
            onChange={handleChange}
          />
          <input
            placeholder="Enter Birth Date"
            type="text"
            className="form-control border-bottom bg-transparent mb-1"
            name="birth"
            value={birth}
            onChange={handleChange}
          />
          <input
            placeholder="Enter School"
            type="text"
            className="form-control border-bottom bg-transparent mb-2"
            name="school"
            value={school}
            onChange={handleChange}
          />
          <input
            placeholder="Enter Major"
            type="text"
            className="form-control border-bottom bg-transparent "
            name="major"
            value={major}
            onChange={handleChange}
          />
        </div>
      </div>
    </form>
  );
}

