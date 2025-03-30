import LoginDiv from "./LoginDiv";
import SignInpage from "./SignInpage";
const HandlingSignIn = ({ signingIn,signInToUp,loginTOhome,homepage }) => {
  
  return (
    <>
     
      {signingIn === "SignIn" && (
        <LoginDiv signInToUp={signInToUp} loginTOhome={loginTOhome} homepage={homepage}></LoginDiv>
      )}
      {signingIn === "SignUp" && (
        <SignInpage
          signInToUp={signInToUp}
          loginTOhome={loginTOhome}
          homepage={homepage}
        ></SignInpage>
      )}
    </>
  );
};
export default HandlingSignIn;
