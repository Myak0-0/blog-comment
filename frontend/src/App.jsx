import Layout from "./pages/Layout"
import Articles from "./pages/Articles"
import OneArticle from "./pages/OneArticle"
import NoPage from "./pages/NoPage"
import NewArticle from "./pages/NewArticle"

import { BrowserRouter, Routes, Route } from "react-router-dom"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<Articles/>}/>
          <Route path='/articles/:id' element={<OneArticle/>}/>
          <Route path='/create/article' element={<NewArticle/>}/>
          <Route path="*" element={<NoPage/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
