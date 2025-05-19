import { useEffect } from "react";
import { actions } from "../actions";
import MyPosts from "../components/profile/MyPosts";
import ProfileInfo from "../components/profile/ProfileInfo";
import { useAuth } from "../hooks/useAuth";
import useAxios from "../hooks/useAxios";
import useProfile from "../hooks/useProfile";

const ProfilePage = () => {
  const { api } = useAxios();
  const { auth } = useAuth();
  const { state, dispatch } = useProfile();

  useEffect(() => {
    console.log("Actions Object:", actions);
    console.log("Profile Actions:", actions.profile);

    dispatch({ type: actions.profile.DATA_FETCHING });
    const fetchProfile = async () => {
      try {
        const response = await api.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/profile/${auth?.user?.id}`
        );
        if (response.status === 200) {
          dispatch({ type: actions.profile.DATA_FETCHED, data: response.data });
        }
      } catch (error) {
        console.log(error);
        dispatch({
          type: actions.profile.DATA_FETCHED_ERROR,
          error: error.message,
        });
      }
    };
    fetchProfile();
  }, []);

  if (state?.loading) {
    return <div>fetching profile</div>;
  }

  return (
    <>
      <ProfileInfo></ProfileInfo>
      <MyPosts></MyPosts>
    </>
  );
};

export default ProfilePage;
