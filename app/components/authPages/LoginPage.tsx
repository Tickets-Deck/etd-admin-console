"use client"
import { ReactElement, FunctionComponent, useState, useEffect, FormEvent } from "react";
import { signIn, useSession } from "next-auth/react";
import { catchError } from "@/app/constants/catchError";
import { redirect, useRouter } from "next/navigation";
import ComponentLoader from "../Loader/ComponentLoader";
import { StatusCodes } from "@/app/models/IStatusCodes";
import { ApplicationRoutes } from "@/app/constants/applicationRoutes";
import { StorageKeys } from "@/app/constants/storageKeys";
import { EmailIcon, EyeIcon, PasswordIcon } from "../SVGs/SVGicons";
import { useOnline } from "@/app/hooks/useOnline";

interface LoginProps {

}

const Login: FunctionComponent<LoginProps> = (): ReactElement => {

    const isUserOnline = useOnline();
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const router = useRouter();
    const { data: session, status } = useSession();

    const [email, setEmail] = useState(retrieveNewlyCreatedUserEmail() ?? '');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const [emailErrorMsg, setEmailErrorMsg] = useState(false);
    const [passwordErrorMsg, setPasswordErrorMsg] = useState(false);

    const [message, setMessage] = useState('');

    function retrieveNewlyCreatedUserEmail() {
        const newlyCreatedUserEmail = sessionStorage.getItem(StorageKeys.NewlyCreatedUserEmail);

        if (newlyCreatedUserEmail && newlyCreatedUserEmail !== "" && newlyCreatedUserEmail !== null) {
            return newlyCreatedUserEmail;
        }
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {

        // Prevent default form submission
        e.preventDefault();

        // if user is login
        if(!isUserOnline) {
            setMessage("It appears that you are offline. Please check your network connectivity, and try again.")
            return;
        }
        
        // Unset message
        setMessage('');

        if (!email || !password) {
            if (!email) {
                setEmailErrorMsg(true);
            } else {
                setEmailErrorMsg(false);
            }
            if (!password) {
                setPasswordErrorMsg(true);
            } else {
                setPasswordErrorMsg(false);
            }
            return;
        }
        setEmailErrorMsg(false);
        setPasswordErrorMsg(false);

        // Start loader
        setIsLoading(true);

        const userInformation = {
            email,
            password,
            redirect: false,
        };

        // console.log(userInformation);

        await signIn('credentials', { ...userInformation })
            .then(async (response) => {
                // console.log("login response: ", response);

                // If we have an error
                if (response?.error && !response.error.includes("prisma.users.findUnique" || "Authentication failed")) {
                    setMessage(response.error);
                    // Close loader
                    setIsLoading(false);
                    return;
                }

                if (response && response.status == StatusCodes.Unauthorized) {
                    // Close loader
                    setIsLoading(false);
                    setMessage("An error occurred while logging in. Please check your credentials and try again.");
                    return;
                }
                // console.log('Login successful');
            })
            .catch((error) => {
                // console.log("Error logging in: ", error);
                setMessage("An error occurred while logging in. Please try again.");
                catchError(error);
                // Close loader
                setIsLoading(false);
            })
    }

    useEffect(() => {
        if (status === "authenticated" && session) {
            // Refresh the page so we get the new session state to the server side
            router.refresh();
            // Fetch user information
            // handleFetchUserInformation();
            // Clear newly created user email
            sessionStorage.removeItem(StorageKeys.NewlyCreatedUserEmail);
            // Push to homepage 
            router.push(ApplicationRoutes.Home);
        }
    }, [status]);

    // useEffect(() => {
    //     if (retrieveNewlyCreatedUserEmail()) {
    //         setEmail(retrieveNewlyCreatedUserEmail() as string);
    //     }
    // }, [retrieveNewlyCreatedUserEmail()])

    return (
        <div className="min-h-[100vh] p-5 pt-20 pb-20 grid place-items-center bg-gray-800 md:(py-12 flex)">
            {/* <div className="bg-gray-700 text-white rounded-2xl flex w-full max-w-[500px] h-fit overflow-hidden sm:(w-[70vw] mx-auto) md:(max-w-[500px]) lg:(w-[35vw])"> */}
            <div className="p-6 w-full flex flex-col gap-6 bg-gray-700 text-white rounded-2xl">
                <div className="flex flex-col items-center gap-1 mb-2">
                    <h3 className="font-semibold">Welcome</h3>
                    <p className="text-lg text-center">Log into your account</p>
                </div>
                <form className="flex flex-col gap-4 w-full min-w-0" onSubmit={(e) => handleSubmit(e)}>
                    <div className="flex gap-2 flex-col md:(gap-4 flex-row)">
                        <label htmlFor="email" className="text-base font-light">Email address</label>
                        <div className="flex rounded-md overflow-hidden">
                            <span className="p-2 bg-white/10 w-10 grid place-items-center">
                                <EmailIcon />
                            </span>
                            <input
                                className="w-full outline-none border-none bg-white/10 text-white text-base"
                                type="email"
                                name="email"
                                placeholder="email@example.com"
                                value={email}
                                onChange={(e) => {
                                    // If we have a value, clear email error message
                                    if (e.target.value) {
                                        setEmailErrorMsg(false);
                                        setMessage("");
                                    }
                                    setEmail(e.target.value);
                                }}
                            />
                        </div>
                        {
                            emailErrorMsg &&
                            <span className="text-red-500">Please enter your email address</span>
                        }
                    </div>
                    <div className="flex gap-2 flex-col md:(gap-4 flex-row)">
                        <label htmlFor="password" className="text-base font-light">Password</label>
                        <div className="flex items-center rounded-md overflow-hidden bg-white/10">
                            <span className="p-2 loginw-10 grid place-items-center">
                                <PasswordIcon />
                            </span>
                            <input
                                className="w-full outline-none border-none bg-transparent text-white text-base"
                                type={isPasswordVisible ? "text" : "password"}
                                name="password"
                                placeholder="password"
                                onChange={(e) => {
                                    // If we have a value, clear email error message
                                    if (e.target.value) {
                                        setPasswordErrorMsg(false);
                                        setMessage("");
                                    }
                                    setPassword(e.target.value);
                                }}
                            />
                            <span
                                // className={styles.clickable}
                                onClick={() => setIsPasswordVisible(!isPasswordVisible)}>
                                <EyeIcon clicked={!isPasswordVisible} />
                            </span>
                        </div>
                        {
                            passwordErrorMsg &&
                            <span className="text-red-500">Please enter your password</span>
                        }
                    </div>
                    {
                        message &&
                        <span className="text-red-500">{message}</span>
                    }
                    <button
                        className="py-2 relative rounded-md overflow-hidden outline-none border-none cursor-pointer mt-4 bg-white text-gray-800 text-center hover:opacity-80"
                        type="submit"
                        disabled={isLoading}>
                        Log in
                        {isLoading && <ComponentLoader isSmallLoader customBackground="#fff" customLoaderColor="#111111" />}
                    </button>
                </form>
            </div>
            {/* </div> */}
        </div>
    );
}

export default Login;