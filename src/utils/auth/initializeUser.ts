import { removeLoginData, setLoginData } from "@/redux/features/Authentication/authSlice";
import { fetchUserByToken } from "./fetchUserByToken";
import { AppDispatch } from "@/redux/app/store";
import { User } from '@/interfaces/User';


export const initializeUser = async (token: string, refreshToken: string,dispatch: AppDispatch) => {
    try {
      const user: User = await fetchUserByToken(token, refreshToken);
      if (user) {
        // Dispatch the setLoginData action with the user data
        (dispatch as AppDispatch)(setLoginData(user));
      } else {
        // If user is null, dispatch the removeLoginData action to reset the authentication state
        (dispatch as AppDispatch)(removeLoginData());
      }
    } catch (error) {
      console.error('Error initializing user:', error);
      // Handle the error if necessary
    }
  };