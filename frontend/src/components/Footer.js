import React, { Component } from 'react';
import '../styles/footer.css';
import { TiArrowSortedUp ,TiArrowSortedDown} from "react-icons/ti";
import { IoLogoInstagram } from "react-icons/io5";
import { FaLinkedin ,FaCcApplePay, FaPaypal} from "react-icons/fa";
import { CgPaypal } from "react-icons/cg";
import { SiPhonepe } from "react-icons/si";
import { LiaCcAmex ,LiaFlagUsaSolid} from "react-icons/lia";

class Footer extends Component {
state = {
    showMettaMuse: false,
    showQuickLinks: false,
    showFollowUs: false,
};

toggleSection = (section) => {
    this.setState(prev => ({ [section]: !prev[section] }));
};

render() {
    return (
        <div className="footer">
            <div className='first-con'>
                <div className="newsletter">
                    <h4>BE THE FIRST TO KNOW</h4>
                    <p>Sign up for updates from metta muse.</p>
                    <div className="newsletter-input">
                        <input type="email" placeholder="Enter your e-mail..." className='input-field'/>
                        <button>SUBSCRIBE</button>
                    </div>
                </div>
                <hr/>
                <div className="contactus-and-currency">
                    <div className="contact">
                        <h4>CONTACT US</h4>
                        <p>+44 221 133 5360</p>
                        <p>customercare@mettamuse.com</p>
                    </div>
                   <hr/> 

                    <div className="currency">
                        <h4>CURRENCY</h4>
                        <p><LiaFlagUsaSolid/> USD</p>
                        <p>Transactions will be completed in Euros and a currency reference is available on hover.</p>
                    </div>
                </div>
           </div>
            <hr />
            <div className='second-con'>
            <div className='large-devices'>
                    <h3>metta muse</h3>
                    <ul>
                    <li>About Us</li>
                        <li>Stories</li>
                        <li>Artisans</li>
                        <li>Boutiques</li>
                        <li>Contact Us</li>
                        <li>EU Compliances Docs</li>
                    </ul>
                </div>

                <div className='large-devices'>
                    <h3>QUICK LINKS</h3>
                    <ul>
                    <li>Orders & Shipping</li>
                        <li>Join/Login as a Seller</li>
                        <li>Payment & Pricing</li>
                        <li>Return & Refunds</li>
                        <li>FAQs</li>
                        <li>Privacy Policy</li>
                        <li>Terms & Conditions</li> 
                    </ul>
                </div>
                <div className='folow-us'>
                <div className='large-devices'>
                    <h3>FOLLOW US</h3>
                    <ul className='social-icons'>
                        <li><IoLogoInstagram size={40}/></li>
                        <li><FaLinkedin size={40}/></li>
                    </ul>
                </div>
                <div className="payment-methods large-devices">
                <h3>metta muse ACCEPTS</h3>
                <div className="payment-icons">
                    <span><FaCcApplePay/></span>
                    <span><FaPaypal/></span>
                    <span><CgPaypal/></span>
                    <span><LiaCcAmex/></span>
                    <span><SiPhonepe/></span>
                </div>
            </div>
            </div>
                </div>

                <div className='second-con'>
            <div className="collapsible-section-small-devices">
                    <div className="section-header" onClick={() => this.toggleSection('showMettaMuse')}>
                        <h4>metta muse</h4>
                        <span>{this.state.showMettaMuse ? <TiArrowSortedUp/> : <TiArrowSortedDown/>}</span>
                    </div>
                    {this.state.showMettaMuse && (
                        <ul>
                            <li>About Us</li>
                            <li>Stories</li>
                            <li>Artisans</li>
                            <li>Boutiques</li>
                            <li>Contact Us</li>
                            <li>EU Compliances Docs</li>
                        </ul>
                    )}
                </div>

                
                <div className="collapsible-section-small-devices">
                    <div className="section-header" onClick={() => this.toggleSection('showQuickLinks')}>
                        <h4>QUICK LINKS</h4>
                        <span>{this.state.showQuickLinks ? <TiArrowSortedUp/> : <TiArrowSortedDown/>}</span>
                    </div>
                    {this.state.showQuickLinks && (
                        <ul>
                            <li>Orders & Shipping</li>
                            <li>Join/Login as a Seller</li>
                            <li>Payment & Pricing</li>
                            <li>Return & Refunds</li>
                            <li>FAQs</li>
                            <li>Privacy Policy</li>
                            <li>Terms & Conditions</li>
                        </ul>
                    )}
                </div>

                <div className="collapsible-section-small-devices">
                    <div className="section-header" onClick={() => this.toggleSection('showFollowUs')}>
                        <h4>FOLLOW US</h4>
                        <span>{this.state.showFollowUs ? <TiArrowSortedUp/> : <TiArrowSortedDown/>}</span>
                    </div>
                    {this.state.showFollowUs && (
                        <div className="social-icons">
                            <span><IoLogoInstagram size={50}/></span> 
                            <span><FaLinkedin size={50}/></span> 
                        </div>
                    )}
                </div>
                    <hr/>
                <div className="payment-methods collapsible-section-small-devices">
                    <h4>metta muse ACCEPTS</h4>
                    <div className="payment-icons">
                        <span><FaCcApplePay/></span>
                        <span><FaPaypal/></span>
                        <span><CgPaypal/></span>
                        <span><LiaCcAmex/></span>
                        <span><SiPhonepe/></span>
                    </div>
                </div>
                </div>
                <hr/>
            <div className="copyright">
                <p>Copyright © 2023 mettamuse. All rights reserved.</p>
            </div>
        </div>
    );
}
}

export default Footer;