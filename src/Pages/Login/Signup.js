import React, { useState } from 'react';
import { useCreateUserWithEmailAndPassword, useSignInWithEmailAndPassword, useSignInWithGoogle, useUpdateProfile } from 'react-firebase-hooks/auth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import auth from '../../firebase.init'
import Loading from '../Shared/Loading';
import Fade from 'react-reveal/Fade';
import { FcGoogle } from "react-icons/fc";

const Login = () => {
    const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);

    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true });

    const [updateProfile, updating, updateError] = useUpdateProfile(auth);
    const navigate = useNavigate();

    if (loading || gLoading || updating) {
        return <Loading />
    }

    if (gUser || user) {
        console.log(gUser, user);
    }
    let signInError;
    if (error || gError || updateError) {
        signInError = <p className='text-red-500'><small>{error?.message || gError?.message} || {updateError?.message}</small></p>
    }
    let passError;
    const handleSignup = async (event) => {
        event.preventDefault();
        const name = event.target.name.value;
        const email = event.target.email.value;
        const password = event.target.password.value;
        const confirnPassword = event.target.confirm-password.value;

        // if (password !== confirnPassword) {
        //     return passError = <p>Password don't match</p>
        // }
        await createUserWithEmailAndPassword(email, password);
        await updateProfile({ displayName: name });
    }


    return (
        <section class="h-screen-[-80px]">
            <div class="container px-6 py-12 h-full pt-10">
                <div class="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
                    <div class="md:w-8/12 lg:w-6/12 mb-12 md:mb-0 mt-10">
                        <img
                            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                            class="w-full"
                            alt="Phone" />
                    </div>
                    <div class="md:w-8/12 lg:w-5/12 lg:ml-20 mt-10">
                        <form onSubmit={handleSignup}>
                            <div class="mb-6">
                                <input
                                    type="text"
                                    name='name'
                                    class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    placeholder="Your name" />
                            </div>
                            <div class="mb-6">
                                <input
                                    type="email"
                                    name='email'
                                    class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    placeholder="Email address" />
                            </div>


                            <div class="mb-6">
                                <input
                                    type="password"
                                    name='password'
                                    class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    placeholder="Password" />
                            </div>
                            <div class="mb-3">
                                <input
                                    type="confirm-password"
                                    name='confirm-pass'
                                    class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    placeholder="Confirm Password" />
                            </div>

                            <div class="form-group form-check mb-4">
                                <Link to="/login">Don't have an account? Login</Link>
                            </div>
                            {passError}
                            {signInError}
                            <button
                                type="submit"
                                class="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
                                data-mdb-ripple="true"
                                data-mdb-ripple-color="light">
                                Sign in
                            </button>

                            <div
                                class="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                                <p class="text-center font-semibold mx-4 mb-0">OR</p>
                            </div>

                        </form>
                        <a
                            class="px-7 py-3 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center items-center mb-3"
                            style={{ backgroundColor: "#4285F4" }}
                            onClick={() => signInWithGoogle()}
                            href="#!"
                            role="button"
                            data-mdb-ripple="true"
                            data-mdb-ripple-color="light">
                            <FcGoogle size={25} className="mr-4" />
                            Continue with Google
                        </a>
                    </div>
                </div>
            </div>
        </section >
    );
};

export default Login;