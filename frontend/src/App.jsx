import React, { useRef } from 'react'
import Sidenav from './components/Sidenav'
import Hero from './components/Hero'
import Footer from './components/Footer'
import News from './components/News'
import About from './components/About'
import Contact from './components/Contact'


function App() {
  const homeRef = useRef(null)
  const aboutRef = useRef(null)
  const newsRef = useRef(null)
  const contactRef = useRef(null)
  const footerRef = useRef(null)

  return (
    <div>
      <Sidenav
        homeRef={homeRef}
        aboutRef={aboutRef}
        newsRef={newsRef}
        contactRef={contactRef}
        footerRef={footerRef}
      />
      <div ref={homeRef}><Hero /></div>
      <div ref={aboutRef}><About /></div>
      <div ref={newsRef}><News /></div>
      <div ref={contactRef}><Contact /></div>
      <div ref={contactRef}><Footer /></div>
      
    </div>
  )
}

export default App
