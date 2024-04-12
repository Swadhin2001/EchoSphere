import "./App.css";
import {Routes, Route} from 'react-router-dom'
import SignInPage from "./_auth/forms/SignInForm";
import SignUpPage from "./_auth/forms/SignUpForm";
import AuthLayout from "./_auth/AuthLayout";
import Home from "./_root/pages/Home";
import RootLayout from "./_root/RootLayout";
import { Toaster } from "@/components/ui/toaster"


function App() {
  return (
    <main className="flex h-screen">
      <Routes>
        {/* Public Routes */}
        <Route element = {<AuthLayout/>}>
          <Route path="/sign-in" element= {<SignInPage/>}/>
          <Route path="/sign-up" element= {<SignUpPage/>}/>
        </Route>

        {/* Private Routes */}
        <Route element = {<RootLayout/>}>
          <Route index element= {<Home/>}/>
        </Route>
      </Routes>
      <Toaster/>
    </main>
  );
}

export default App;
