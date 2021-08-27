import React from 'react'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content container-row justify-content-center">
        <p>Homenum Revelio</p>
      </div>
      <div className="footer-content container-row justify-content-start">
        <a href='https://github.com/MaggieLiz' target='_blank' rel='noreferrer'>Maggie Ward</a>
        <p>&nbsp;|&nbsp;</p>
        <a href='https://github.com/VanessaSwanson' target='_blank' rel='noreferrer'>Vanessa Swanson</a>
        <p>&nbsp;|&nbsp;</p>
        <a href='https://github.com/vjmreysantos' target='_blank' rel='noreferrer'>Victor Reysantos</a>
      </div>
      <div className="footer-content container-row justify-content-end">
        <p>&nbsp;Copyright &copy; 2021 All Rights Reserved</p>
      </div>
    </footer>
  )
}

export default Footer