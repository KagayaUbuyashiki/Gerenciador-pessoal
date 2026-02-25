import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Navbar } from "./components/Navbar"

import { Home } from "./pages/Home"
import { TaskMaster } from "./pages/TaskMaster"
import { ConnectHub } from "./pages/ConnectHub"
import { MoneyFlow } from "./pages/MoneyFlow"

export function App() {
  return (
    <BrowserRouter>

    <Navbar />
    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tasks" element={<TaskMaster />} />
        <Route path="/contacts" element={<ConnectHub />} />
        <Route path="/finance" element={<MoneyFlow />} />
      </Routes>
    </BrowserRouter>
  )
}