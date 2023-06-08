import FlightsPage from "./pages/FlightsPage.tsx";
import "./App.css"

function App() {

  return (
    <div className="app">
        <header className="header">
            <div className="container">
                <strong>Avia flights</strong>
            </div>
        </header>
        <main className="content">
            <FlightsPage />
        </main>
    </div>
  )
}

export default App
