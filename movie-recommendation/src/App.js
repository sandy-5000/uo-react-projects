import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ReadMore from './pages/ReadMore'
import PageNotFound from './pages/PageNotFound'
import { useState } from 'react'

function App() {

	const [elementProps, setElementProps] = useState({})

	return (
		<BrowserRouter>
			<Routes path="/">
				<Route index element={<Home readMore={setElementProps} />} />
				<Route path="home" element={<Home readMore={setElementProps} />} />
				<Route path="readmore" element={<ReadMore item={elementProps} />} />
				<Route path="*" element={<PageNotFound />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App
