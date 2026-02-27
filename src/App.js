import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Region from './components/Region'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Region />} />
      <Route path="/region" element={<Region />} />
    </Routes>
  )
}

export default App