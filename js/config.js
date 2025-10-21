/**
 * Configuration settings for the portfolio
 */
const PortfolioConfig = {
  // Animation settings
  animationDuration: 600,
  transitionEasing: 'cubic-bezier(0.4, 0, 0.2, 1)',
  
  // Image paths
  images: {
    team: 'images/Capstone_Images/Picture1.png',
    client: 'images/Capstone_Images/Picture2.png',
    device: 'images/Capstone_Images/Picture3.png',
    webapp: 'images/Capstone_Images/Picture4.png',
    desktop: 'images/Capstone_Images/Picture5.png'
  },
  
  // Breakpoints
  breakpoints: {
    mobile: 768,
    tablet: 1024
  },
  
  // Personal information (customize these)
  personal: {
    name: 'Your Name',
    title: 'Aspiring Developer',
    email: 'rolandoceleste763@gmail.com',
    linkedin: 'https://linkedin.com/in/yourprofile',
    github: 'https://github.com/yourusername'
  }
};

export default PortfolioConfig;
