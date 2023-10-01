import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ThemeConfig from './common/theme'
import Home from './modules/home'

const App = (): JSX.Element => {
  return (
    <ThemeConfig>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </ThemeConfig>
  )
}

export default App
