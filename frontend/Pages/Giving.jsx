import Footer from '../Sections/HomepageSections/Footer';
import Navbar from '../Sections/HomepageSections/Navbar';
import GivingHeader from '../Sections/GivingSections/GivingHeader';
import GivingBibleVerse from '../Sections/GivingSections/GivingBibleVerse';
import GivingBankingDetails from '../Sections/GivingSections/GivingBankingDetails';
import GivingBuildingProject from '../Sections/GivingSections/GivingBuildingProject';
import GivingThankYou from '../Sections/GivingSections/GivingThankYou';

const Giving = () => {
  

  return (
    <>
    <Navbar/>
      <div className="giving-page" style={{ 
          maxWidth: '800px', 
          margin: '0 auto', 
          padding: 'var(--space-6)',
          textAlign: 'center'
        }}>
          <GivingHeader/>
          <GivingBibleVerse/>
          <GivingBankingDetails/>
          <GivingBuildingProject/>
         <GivingThankYou/>
        </div>
      <Footer/>
    </>
    
  );
};

export default Giving;