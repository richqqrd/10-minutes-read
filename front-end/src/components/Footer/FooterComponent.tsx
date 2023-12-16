import React  from 'react';
import check from '../../check.svg';




export const FooterComponent = function() {
        return (
            <div className="App-footer-container">
                <div className='App-footer'>
                    <img className="footer-check" src={check} alt="check"/>                
                    <div className="footer-text">Kostenlose Retouren</div>
                    <img className="footer-check" src={check} alt="check"/>                
                    <div className="footer-text">Gratis-Buchversand innerhalb Deutschland</div>
                    <img className="footer-check" src={check} alt="check"/>                
                    <div className="footer-text">Click & Collect</div>
                </div>
            </div>
        )
    }

