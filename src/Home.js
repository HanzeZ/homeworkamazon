import React from 'react'
import './Home.css'
import Product from './Product'
function Home() {
    return (
        <div className="home">
            <div className="home__container">
                <img className="home__image"src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg" alt=""/>

                <div className="home__row">
                    <Product id="11111" title="The lean startup something something The lean startup something something The lean startup something something" price={29.99} image="https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._AC_SY400_.jpg" rating={5}/>
                    <Product id="22222" title="Acer Swift 3 Intel Evo Thin & Light Laptop, 14 Full HD, Intel Core i7-1165G7, Intel Iris Xe Graphics, 8GB LPDDR4X, 256GB NVMe SSD, Wi-Fi 6, Fingerprint Reader, Back-lit KB, SF314-59-75QC" image="https://images-na.ssl-images-amazon.com/images/I/71dHWxX7C0L._AC_SL1500_.jpg" price={669.99} rating={4}/>
                </div>
                <div className="home__row">
                    <Product id="33333" title="BAYKA French Press Coffee Tea Maker, 304 Stainless Steel Coffee Press with 4 Level Filtration System, Heat Resistant Thickened Borosilicate Glass, 34 Ounce, Copper" image="https://images-na.ssl-images-amazon.com/images/I/71dMl1-%2BZ9L._AC_SL1500_.jpg" price={16.99} rating={3}/>                    
                    <Product id="44444" title="BONAOK Bluetooth Karaoke Wireless Microphone,3-in-1 Portable Handheld Karaoke Mic Speaker Machine Christmas Birthday Home Party for Android/iPhone/PC or All Smartphone" image="https://images-na.ssl-images-amazon.com/images/I/615TETF3OAL._AC_SL1500_.jpg" price={20.39} rating={5}/>                   
                    <Product id="55555" title="USB C Female to USB Male Adapter (2 Pack),Type C to USB A Charger Cable Adapter for iPhone 11 12 Pro Max,Airpods iPad,Samsung Galaxy Note 10 S20 Plus 20 S20+ 20+ Ultra,Google Pixel 5 4 4a 3 3A 2 XL" price={8.49} rating={4} image="https://images-na.ssl-images-amazon.com/images/I/81b98T3zHDL._AC_SL1200_.jpg"/>                   
                </div>
                <div className="home__row">
                    <Product id="66666" title="Mdbebbron 120 inch Projection Screen 16:9 HD Foldable Anti-Crease Portable Projector Movies Screen for Home Theater Outdoor Indoor Support Double Sided Projection" price={23.99} rating={5} image="https://images-na.ssl-images-amazon.com/images/I/81RIoVN1MWL._AC_SL1500_.jpg"/>                   
                </div>
            </div>
        </div>
    )
}

export default Home
