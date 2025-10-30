import React, { useState } from 'react';
import { MapPinIcon, PhoneIcon, EnvelopeIcon, ClockIcon } from '@heroicons/react/24/outline';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitStatus(''), 5000);
    }, 2000);
  };

  const contactInfo = [
    {
      icon: MapPinIcon,
      title: 'Visit Our Store',
      details: ['123 Fashion Avenue', 'New York, NY 10001', 'United States'],
      description: 'Located in the heart of Manhattan'
    },
    {
      icon: PhoneIcon,
      title: 'Call Us',
      details: ['+1 (555) 123-4567', '+1 (555) 987-6543'],
      description: 'Mon-Fri 9AM-8PM, Sat-Sun 10AM-6PM'
    },
    {
      icon: EnvelopeIcon,
      title: 'Email Us',
      details: ['info@nesswear.com', 'support@nesswear.com'],
      description: 'We respond within 24 hours'
    }
  ];

  // Social links removed as the Follow Us card has been removed

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-linear-to-br from-purple-900 via-purple-800 to-pink-800 text-white py-12 md:py-14">
        <div className="absolute inset-0 bg-black/15"></div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Get In Touch
            </h1>
            <p className="text-lg md:text-xl font-body text-purple-100 max-w-2xl mx-auto">
              We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-xl p-5 w-full max-w-xl lg:max-w-2xl mx-auto">
              <div className="mb-6">
                <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-900 mb-3">
                  Send us a Message
                </h2>
                <p className="text-gray-600 font-body text-sm md:text-base">
                  Have a question or want to work with us? Fill out the form below and we'll get back to you.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2 font-body">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 font-body"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2 font-body">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 font-body"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2 font-body">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 font-body"
                    placeholder="What's this about?"
                  />
                </div>

                <div className="space-y-3">
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2 font-body">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 font-body resize-none"
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-linear-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-xl font-semibold font-body hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>

                {submitStatus === 'success' && (
                  <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-xl font-body">
                    Thank you! Your message has been sent successfully. We'll get back to you soon.
                  </div>
                )}
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-900 mb-4">
                  Contact Information
                </h2>
                <p className="text-gray-600 font-body text-base md:text-lg mb-6">
                  We're here to help and answer any question you might have. We look forward to hearing from you!
                </p>
              </div>

              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex items-start space-x-4 p-5 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200">
                    <div className="shrink-0">
                      <div className="w-11 h-11 bg-linear-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                        <item.icon className="w-5 h-5 text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-1.5 font-body">
                        {item.title}
                      </h3>
                      <div className="space-y-1">
                        {item.details.map((detail, idx) => (
                          <p key={idx} className="text-gray-600 font-body text-sm md:text-base">
                            {detail}
                          </p>
                        ))}
                      </div>
                      <p className="text-xs md:text-sm text-gray-500 font-body mt-1.5">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Media removed as requested */}
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-12 md:py-14 bg-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-900 mb-3">
              Visit Our Store
            </h2>
            <p className="text-gray-600 font-body text-base md:text-lg">
              Come and experience our fashion collection in person at our flagship store.
            </p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="h-80 md:h-96 bg-linear-to-br from-purple-100 to-pink-100 flex items-center justify-center">
              <div className="text-center">
                <MapPinIcon className="w-14 h-14 text-purple-600 mx-auto mb-3" />
                <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-1.5 font-body">
                  Interactive Map Coming Soon
                </h3>
                <p className="text-gray-600 font-body text-sm md:text-base">
                  We're working on adding an interactive map to help you find us easily.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 md:py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-900 mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 font-body text-base md:text-lg">
              Find answers to common questions about our products and services.
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                question: "Bangladesh e delivery koto dine pai?",
                answer: "Dhaka city te 1–3 working din, nationwide 2–5 working din. Remote area te 5–7 din lagte pare (courier dependency)."
              },
              {
                question: "Payment method ki ki ache?",
                answer: "Cash on Delivery (COD), bKash, Nagad, Rocket ebong debit/credit card supported. Online payment e instant confirmation deya hoy."
              },
              {
                question: "Return/Exchange policy ki?",
                answer: "Product receive er 7 din er moddhe unused & tags intact thakle return/exchange kora jabe. Hygiene items & used products return hobe na. Courier charge apply korte pare."
              },
              {
                question: "Order track korbo kivabe?",
                answer: "Order confirm howar por SMS/Email e tracking ID pathano hoy. Shei ID diye courier site e ba amader order details page e track korte parben."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-5">
                <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2.5 font-body">
                  {faq.question}
                </h3>
                <p className="text-gray-600 font-body text-sm md:text-base">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
