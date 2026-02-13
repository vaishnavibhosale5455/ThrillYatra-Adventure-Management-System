import React from 'react'
import Slides from './Slides'
import Category from './Category';
import ThrillYatraStats from './ThrillYatraStats';
import WhyThrillYatraSection from './WhyThrillYatraSection';
// import Section2 from './Section2';
import Footer from './Footer';

function Home() {
  return (
    <div>
      <Slides/>
      <Category/>
      
      <WhyThrillYatraSection/>
      <ThrillYatraStats/>
      {/* <Section2/> */}
      <Footer/>
    </div>
  )
}

export default Home;