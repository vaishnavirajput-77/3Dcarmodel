import { useState, Suspense } from 'react'
import { Hexagon, RotateCcw, Settings, LayoutGrid, ChevronLeft, ChevronRight } from 'lucide-react'
import Scene from './components/3d/Scene'
import './App.css'

function App() {
  const [isInterior, setIsInterior] = useState(false)
  const [openDoors, setOpenDoors] = useState(false)
  const [openHood, setOpenHood] = useState(false)

  return (
    <div className="app-container">
      <Suspense fallback={<div className="loader">INITIALIZING...</div>}>
        <div className="canvas-container">
          <Scene
            isInterior={isInterior}
            openDoors={openDoors}
            openHood={openHood}
            setOpenDoors={setOpenDoors}
            setOpenHood={setOpenHood}
            setIsInterior={setIsInterior}
          />
        </div>
      </Suspense>

      <div className="ui-layer">
        {/* Top Navigation */}
        <div className="top-nav">
          <div className="nav-links">
            <span className="active">ULTRA</span>
            <span>FUTURISTIC</span>
            <span>LUXURY</span>
          </div>
          <button className="nav-btn">
            <Hexagon size={14} color="#00e5ff" />
            LASER INTERIOR
          </button>
        </div>

        {/* Bottom Bar */}
        <div className="bottom-bar">
          <div className="control-panel">
            <div className="panel-segment border-right">
              <div className="panel-btn">
                <ChevronLeft size={16} />
                <span>Control</span>
                <ChevronRight size={16} />
              </div>
              <div className="panel-btn" onClick={() => { setOpenDoors(false); setOpenHood(false); }}>
                <RotateCcw size={16} />
                <span>Rotate</span>
              </div>
            </div>

            <button
              className="main-action-btn"
              onClick={() => setIsInterior(!isInterior)}
            >
              {isInterior ? 'Exit Interior' : 'Enter Interior'}
            </button>

            <div className="panel-segment">
              <div className="panel-btn">
                <Settings size={16} />
                <span>Customize</span>
              </div>
              <div className="panel-btn">
                <LayoutGrid size={16} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
