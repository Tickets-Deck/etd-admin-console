import Login from "@/components/authPages/LoginPage";
import { ReactElement, FunctionComponent } from "react";

interface SignInProps {

}

const SignIn: FunctionComponent<SignInProps> = (): ReactElement => {
    return (<Login />);
}

export default SignIn;