import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingPage from './LoadingPage'


const UserProfileDropdown = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("response-token");
  const navigate = useNavigate();

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const handleLogout = () => {
    setLoading(true);
    axios
      .post(
        `/apigateway/api/user/logout`,
        {
          deviceInfo: {
            deviceId: "D1",
            deviceType: "DEVICE_TYPE_ANDROID",
            notificationToken: null,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          setTimeout(() => {
            toast.success("Logout-Successful.", {
              position: "top-center",
              theme: "colored"
          });
            navigate("/");
            window.location.reload();
            localStorage.clear();
            setLoading(false);
          }, 4000);  

        }
      })
      .catch((error) => {
        localStorage.clear();
        toast.error("Server error,Cannot Logout.", {
          position: "top-center",
          theme: "colored",
        });
        console.error("Logout error:", error);
        window.location.reload();
        setLoading(false);
      });
  };

  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
         {loading ? <LoadingPage/> : ''}
      <DropdownToggle className="btn btn-floating dropdown-toggle hidden-arrow bg-dark rounded-circle mx-2">
        <i className="fas fa-user-alt" />
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem style={{ fontSize: "16px", padding: "10px" }} className=" d-flex justify-content-between">
            <Link to="/MyProfileDetails">My Profile</Link> 
            <i className="fas fa-user-alt " />
            
        </DropdownItem>
        <DropdownItem style={{ fontSize: "16px", padding: "10px" }} className=" d-flex justify-content-between"
          onClick={handleLogout}>
         Logout
          <i className="fas fa-door-open " />
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default UserProfileDropdown;
