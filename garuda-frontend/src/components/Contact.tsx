import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      setIsSubmitting(true);
      // Simulate API call
      setTimeout(() => {
        console.log('Contact form submitted:', formData);
        alert('Thank you for your message! We\'ll get back to you soon.');
        setFormData({
          name: '',
          email: '',
          subject: '',
          category: '',
          message: ''
        });
        setIsSubmitting(false);
      }, 1500);
    }
  };

  const isFormValid = 
    formData.name.trim() &&
    formData.email.trim() &&
    formData.subject.trim() &&
    formData.category &&
    formData.message.trim();

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'info@pickups.id',
      description: 'Send us an email anytime'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+62 21 1234 5678',
      description: 'Call us during business hours'
    },
    {
      icon: MapPin,
      label: 'Address',
      value: 'Jakarta, Indonesia',
      description: 'Visit our headquarters'
    },
    {
      icon: Clock,
      label: 'Business Hours',
      value: 'Mon - Fri, 9AM - 6PM',
      description: 'Western Indonesia Time (WIB)'
    }
  ];

  return (
    <div className="p-8 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-[#fbfffe]">Contact Us</h1>
        <p className="text-[#6d676e] text-lg max-w-2xl mx-auto">
          Have questions about basketball programs, scouting, or want to get involved? 
          We'd love to hear from you. Reach out and let's grow Indonesian basketball together.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Form */}
        <div className="lg:col-span-2">
          <Card className="bg-[#fbfffe] border-[#6d676e]/20">
            <CardHeader>
              <CardTitle className="text-2xl text-[#1b1b1e] flex items-center gap-2">
                <Send className="w-6 h-6 text-[#f46036]" />
                Send us a Message
              </CardTitle>
              <p className="text-[#6d676e]">
                Fill out the form below and we'll respond within 24 hours.
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name and Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-[#1b1b1e] font-medium">
                      Full Name *
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="bg-white border-[#6d676e]/30 focus:border-[#f46036] focus:ring-[#f46036] text-[#1b1b1e]"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-[#1b1b1e] font-medium">
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="bg-white border-[#6d676e]/30 focus:border-[#f46036] focus:ring-[#f46036] text-[#1b1b1e]"
                      required
                    />
                  </div>
                </div>

                {/* Subject and Category */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-[#1b1b1e] font-medium">
                      Subject *
                    </Label>
                    <Input
                      id="subject"
                      type="text"
                      placeholder="What's this about?"
                      value={formData.subject}
                      onChange={(e) => handleInputChange('subject', e.target.value)}
                      className="bg-white border-[#6d676e]/30 focus:border-[#f46036] focus:ring-[#f46036] text-[#1b1b1e]"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[#1b1b1e] font-medium">
                      Category *
                    </Label>
                    <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                      <SelectTrigger className="bg-white border-[#6d676e]/30 focus:border-[#f46036]">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General Inquiry</SelectItem>
                        <SelectItem value="training">Training Programs</SelectItem>
                        <SelectItem value="clubs">Basketball Clubs</SelectItem>
                        <SelectItem value="scouting">Scouting Services</SelectItem>
                        <SelectItem value="partnership">Partnership</SelectItem>
                        <SelectItem value="technical">Technical Support</SelectItem>
                        <SelectItem value="media">Media & Press</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-[#1b1b1e] font-medium">
                    Message *
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us more about your inquiry, questions, or how we can help you..."
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    className="min-h-32 bg-white border-[#6d676e]/30 focus:border-[#f46036] focus:ring-[#f46036] text-[#1b1b1e]"
                    required
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={!isFormValid || isSubmitting}
                  className="w-full bg-[#f46036] hover:bg-[#f46036]/90 text-white font-medium py-3"
                >
                  {isSubmitting ? (
                    <>Sending Message...</>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Contact Information */}
        <div className="space-y-6">
          <Card className="bg-[#fbfffe] border-[#6d676e]/20">
            <CardHeader>
              <CardTitle className="text-xl text-[#1b1b1e]">Get in Touch</CardTitle>
              <p className="text-[#6d676e] text-sm">
                Multiple ways to reach out to our team
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              {contactInfo.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-[#f46036]/10 rounded-lg flex items-center justify-center">
                      <Icon className="w-5 h-5 text-[#f46036]" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-[#1b1b1e]">{item.label}</h4>
                      <p className="text-[#1b1b1e] font-medium">{item.value}</p>
                      <p className="text-sm text-[#6d676e]">{item.description}</p>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Quick Info Card */}
          <Card className="bg-[#f46036] border-[#f46036]">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-white mb-3">Need Immediate Help?</h3>
              <p className="text-white/90 text-sm mb-4">
                For urgent inquiries about ongoing tournaments, player emergencies, or time-sensitive matters, please call us directly.
              </p>
              <Button 
                variant="secondary" 
                className="w-full bg-white text-[#f46036] hover:bg-white/90 font-medium"
              >
                <Phone className="w-4 h-4 mr-2" />
                Call Now
              </Button>
            </CardContent>
          </Card>

          {/* FAQ Link Card */}
          <Card className="bg-[#fbfffe] border-[#6d676e]/20">
            <CardContent className="p-6 text-center">
              <h3 className="font-semibold text-[#1b1b1e] mb-2">Frequently Asked Questions</h3>
              <p className="text-sm text-[#6d676e] mb-4">
                Check out our FAQ section for quick answers to common questions.
              </p>
              <Button 
                variant="outline" 
                className="border-[#f46036] text-[#f46036] hover:bg-[#f46036] hover:text-white"
              >
                View FAQ
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}