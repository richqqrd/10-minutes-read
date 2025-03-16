import React from 'react';
import { legalTexts } from '../../config/legalTexts';

const AboutRoute = () => {
    return (
        <div className='py-5 px-5 mx-auto max-w-xl'>
            <div>
                <h1 className='font-bold pb-5 text-4xl'>Impressum</h1>
                <p>Angaben gemäß § 5 TMG</p>
                <p>{legalTexts.company.name}<br />
                    {legalTexts.company.address.split('\n').map((line, i) => (
                        <React.Fragment key={i}>
                            {line}<br />
                        </React.Fragment>
                    ))}
                </p>

                <p className='pt-3'>
                    <strong>Vertreten durch: </strong><br />
                    {legalTexts.company.representedBy}
                </p>

                <p className="pt-3">
                    <strong>Kontakt:</strong><br />
                    Telefon: {legalTexts.contact.phone}<br />
                    Fax: {legalTexts.contact.fax}<br />
                    E-Mail: <a href={`mailto:${legalTexts.contact.email}`}>{legalTexts.contact.email}</a>
                </p>

                <p className='pt-3'>
                    <strong>Umsatzsteuer-ID: </strong><br />
                    Umsatzsteuer-Identifikationsnummer gemäß §27a Umsatzsteuergesetz: {legalTexts.taxInfo.vatId}
                </p>

                <p className='pt-3'>
                    <strong>Wirtschafts-ID: </strong><br />
                    {legalTexts.taxInfo.businessId}
                </p>

                <p className='pt-3'>
                    <strong>Aufsichtsbehörde:</strong><br />
                    {legalTexts.supervisoryAuthority}
                </p>

                <p className='pt-3'>
                    <strong>Haftungsausschluss: </strong>
                </p>

                <p className='pt-3'>
                    <strong>Haftung für Inhalte</strong><br />
                    {legalTexts.disclaimer.contentLiability}
                </p>

                <p className='pt-3'>
                    <strong>Haftung für Links</strong><br />
                    {legalTexts.disclaimer.linksLiability}
                </p>

                <p className='pt-3'>
                    <strong>Urheberrecht</strong><br />
                    {legalTexts.copyright}
                </p>

                <p className='pt-3'>
                    <strong>Datenschutz</strong><br />
                    {legalTexts.dataProtection}
                </p>

                <p className='pt-3'>
                    <strong>Google Analytics</strong><br />
                    {legalTexts.googleAnalytics}
                </p>

                <p className='pt-3'>
                    <strong>Google AdSense</strong><br />
                    {legalTexts.googleAdsense}
                </p>
            </div>
        </div>
    );
};

export default AboutRoute;