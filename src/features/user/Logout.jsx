import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "./userSlice";

function Logout({ history }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(logoutUser(history));
    alert("Chau valor");
  }, []);

  return null;
}

export default Logout;
