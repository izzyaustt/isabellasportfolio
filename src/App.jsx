import { useState } from "react";
import { DesktopPage } from "./pages/DesktopPage";
import { LandingPage } from "./pages/LandingPage";

export default function App() {
  const[hasEntered, setHasEntered] = useState(false);
  if (!hasEntered){
    return <LandingPage onEnter={()=>setHasEntered(true)}/>
  }
  
  return <DesktopPage />;
}