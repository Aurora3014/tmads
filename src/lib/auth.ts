// lib/auth.js
import { auth } from './firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, getAuth } from 'firebase/auth';
import Cookies from 'js-cookie';
import { expireTime } from '../constant'

// Signup
export const signup = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

// Login
export const login = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log(userCredential)
    Cookies.set('auth', "logged in!", {expires: expireTime})
    Cookies.set('user', JSON.stringify(userCredential.user), {expires: expireTime})
    // localStorage.setItem('auth', JSON.stringify(userCredential.user))
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

// Logout
export const logout = async () => {
  try {
    Cookies.remove('auth');
    Cookies.remove('user');
    await signOut(auth);

  } catch (error) {
    throw error;
  }
};

//get signed email
export const getEmail = async () => {
  try {
    const auth = getAuth()
    return auth.currentUser?.email
  } catch (error) {
    throw error;
  }
}