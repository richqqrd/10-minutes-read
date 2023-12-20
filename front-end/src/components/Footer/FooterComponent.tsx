import React  from 'react';
import check from '../../check.svg';
import { NavLink } from 'react-router-dom';




export const FooterComponent = function() {
        return (
            <div className="bg-gray-200 py-3">
                <div className='flex items-center justify-center'>
                    <img src={check} alt="check"/>                
                    <div className="pr-3">Kostenlose Retouren</div>
                    <img src={check} alt="check"/>                
                    <div className="pr-3">Gratis-Buchversand innerhalb Deutschland</div>
                    <img src={check} alt="check"/>                
                    <div className="pr-3">Click & Collect</div>
                </div>
                <NavLink to="/about" className="font-bold text-lg">About</NavLink>
            </div>
        )
    }

