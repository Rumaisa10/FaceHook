import { useNavigate } from "react-router-dom";
import LogOut from "../../assets/icons/logout.svg";
import { useAuth } from "../../hooks/useAuth";

export default function Logout() {
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const handlelogout = () => {
    setAuth({});
    navigate("/login");
  };

  return (
    <button className="icon-btn" onClick={handlelogout}>
      <img src={LogOut} alt="Logout" />
    </button>
  );
}
