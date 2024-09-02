import { Card, Col, Row } from 'antd'
import React from 'react'
import ContactForm from '../components/ContactForm'
import { ClockCircleOutlined, EnvironmentOutlined, MailOutlined, MobileOutlined, WhatsAppOutlined } from '@ant-design/icons'
import FourImageSection from '../components/FourImageSection'

const Contact = () => {
  return (
    <div>
      <div>
        <div className='container-fuild'>
          <div className='row g-0'>
            <div className='col-12'>
              <div className='inner-banner'>
                <img className='w-100' src={`${process.env.PUBLIC_URL}/images/about-banner-img.jpg`} alt="logo" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className='pb-0'>
        <div className="container">
          <Row className='contact-cart-group-first'>
            <Card>
              <MobileOutlined style={{ color: 'red' }} />
              <h5>Phone</h5>
              <p>+91 93276479954</p>
            </Card>
            <Card>
              <MailOutlined style={{ color: 'red' }} />
              <h5>Email</h5>
              <p>sales@safarcars@gmail.com</p>
            </Card>
            <Card>
              <EnvironmentOutlined style={{ color: 'red' }} />
              <h5>Location</h5>
              <p>Valsad, Gujrat, India</p>
            </Card>
          </Row>

          <Row className='form-section'>
            <Col style={{ backgroundColor: '#f5f5f5' }}>
              <ContactForm />
            </Col>
            <Col className='contact_info' >
              <Card style={{ backgroundColor: '#f5f5f5' }}>
                <div>
                  <h5>Buy Car</h5>
                  <div style={{ marginTop: '15px' }}>
                    <MobileOutlined style={{ color: 'red', marginRight: '10px' }} />
                    <span>+91 9327 647 995</span>
                  </div>
                  <div style={{ marginTop: '10px' }}>
                    <MobileOutlined style={{ color: 'red', marginRight: '10px' }} />
                    <span>+91 9327 647 995</span>
                  </div>
                  <div style={{ marginTop: '10px' }}>
                    <WhatsAppOutlined style={{ color: 'green', marginRight: '10px' }} />
                    <span>+91 9327 647 995</span>
                  </div>
                  <div style={{ marginTop: '10px' }}>
                    <WhatsAppOutlined style={{ color: 'green', marginRight: '10px' }} />
                    <span>+91 9327 647 995</span>
                  </div>

                </div>
                <div style={{ marginTop: '20px' }}>
                  <h5>Sell Car</h5>
                  <div style={{ marginTop: '15px' }}>
                    <MobileOutlined style={{ color: 'red', marginRight: '10px' }} />
                    <span>+91 9327 647 995</span>
                  </div>
                  <div style={{ marginTop: '10px' }}>
                    <WhatsAppOutlined style={{ color: 'green', marginRight: '10px' }} />
                    <span>+91 9327 647 995</span>
                  </div>

                </div>

                <div style={{ marginTop: '20px' }}>
                  <h5>Finance</h5>
                  <div style={{ marginTop: '15px' }}>
                    <MobileOutlined style={{ color: 'red', marginRight: '10px' }} />
                    <span>+91 9327 647 995</span>
                  </div>
                </div>

                <div style={{ marginTop: '20px' }}>
                  <h5>Insurance</h5>
                  <div style={{ marginTop: '15px' }}>
                    <MobileOutlined style={{ color: 'red', marginRight: '10px' }} />
                    <span>+91 9327 647 995</span>
                  </div>
                </div>

                <div style={{ marginTop: '20px' }}>
                  <h5>Opening Hours</h5>
                  <div style={{ marginTop: '15px' }}>
                    <ClockCircleOutlined style={{ color: 'red', marginRight: '10px' }} />
                    <span>10:00 AM To 07:30 PM  || Monday to Sunday</span>
                  </div>
                </div>

                <div style={{ marginTop: '20px' }}>
                  <h5>Email</h5>
                  <div style={{ marginTop: '15px' }}>
                    <MailOutlined style={{ color: 'red', marginRight: '10px' }} />
                    <span>sales@safarcars@gmail.com</span>
                  </div>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      </section>

      <section>
        <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d612.1760733018001!2d72.9726052!3d22.5847515!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e4fa868f1ee5d%3A0x7ac64b7b58e9230f!2sCARS24%20Network%20-%20Sell%20Car%20in%20Anand!5e1!3m2!1sen!2sin!4v1723607303837!5m2!1sen!2sin"
          width="100%"
          height="600"
          title='Safar Cars'
          style={{ border: '0' }}
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </section>

      <section style={{paddingTop:'0'}}>
        <FourImageSection />
      </section>

    </div>
  )
}

export default Contact
