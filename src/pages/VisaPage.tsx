import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShieldCheck, ChevronRight, CheckCircle2, CloudUpload, Sparkles, Send, HelpCircle } from 'lucide-react';

const mockVisaRequirements: Record<string, {
  processingTime: string;
  validity: string;
  fees: string;
  documents: string[];
}> = {
  'United Arab Emirates (UAE)': {
    processingTime: '3 – 5 Working Days',
    validity: '30 / 60 Days Single Entry',
    fees: 'From $150 USD',
    documents: [
      'Color scan of Passport bio-page (Minimum 6 months validity)',
      'Passport size photograph with white background',
      'Confirmed return flight suites tickets',
      'Hotel reservation details or sponsor resident address'
    ]
  },
  'Schengen Area (Europe)': {
    processingTime: '10 – 15 Working Days',
    validity: 'Based on itinerary plans',
    fees: 'From $220 USD (Incl. appointment & premium concierge fee)',
    documents: [
      'Fully completed Schengen Visa application questionnaire',
      'Passport with at least 2 blank pages & bio scan',
      '3-Year Income Tax Returns (ITR) or proof of corporate tax payment',
      'Last 6 months active bank account statements with bank stamp',
      'Confirmed round-trip flights & premium travel medical protection insurance'
    ]
  },
  'United Kingdom (UK)': {
    processingTime: '15 – 20 Working Days',
    validity: '6 Months Standard Multi-Entry',
    fees: 'From $260 USD',
    documents: [
      'Original passport & color scans of previous visas',
      'Formal employment certification letters or corporate registry documents',
      'Personal & Business Bank accounts statements (Last 6 months)',
      'Detailed travel itinerary timeline & hotel booking previews'
    ]
  },
  'United States (USA)': {
    processingTime: 'Depends on appointment dates (Priority booking available)',
    validity: '10 Years B1/B2 Visa Multi-Entry',
    fees: 'From $350 USD (Priority consultation + DS-160 application)',
    documents: [
      'Passport scanning & old travel history records',
      'DS-160 confirmation code submission details',
      'Personal financial records & asset valuations reports',
      'Customized mock interview coaching workbook'
    ]
  },
  'Singapore': {
    processingTime: '4 – 6 Working Days',
    validity: 'Up to 2 Years Multiple Entry',
    fees: 'From $95 USD',
    documents: [
      'Passport bio-data page scan',
      'White background portrait photo',
      'Confirmed flight and accommodation vouchers',
      'V39A Letter of Introduction (secured by our local concierge partner)'
    ]
  }
};

export const VisaPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('United Arab Emirates (UAE)');
  const [uploadProgress, setUploadProgress] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [form, setForm] = useState({ name: '', email: '', phone: '', note: '' });
  const [submitted, setSubmitted] = useState(false);

  const req = mockVisaRequirements[selectedCountry] || mockVisaRequirements['United Arab Emirates (UAE)'];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const fileName = e.target.files[0].name;
      setUploadProgress(true);
      setTimeout(() => {
        setUploadedFiles(prev => [...prev, fileName]);
        setUploadProgress(false);
      }, 1500);
    }
  };

  const handleVisaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.name && form.email) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setUploadedFiles([]);
        setForm({ name: '', email: '', phone: '', note: '' });
      }, 4000);
    }
  };

  const filteredCountries = Object.keys(mockVisaRequirements).filter(c =>
    c.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="pt-28 pb-20 min-h-screen bg-slate-50 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-0 left-0 w-[450px] h-[450px] bg-brand-blue/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-20 right-0 w-[400px] h-[400px] bg-brand-purple/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-purple/5 border border-brand-purple/10 text-brand-purple"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Global Immigration Desk</span>
          </motion.div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-brand-blue tracking-tight leading-tight">
            Fast-Track Visa Assistance
          </h1>
          <p className="text-slate-500 font-semibold text-xs sm:text-sm leading-relaxed">
            Fast-track applications, document validation, premium appointments, and interview coaching. Select your destination to check requirements.
          </p>
        </div>

        {/* Dynamic Country Search Selector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left panel: Country list & Search */}
          <div className="lg:col-span-4 space-y-6">
            <div className="glass-card p-5 space-y-4">
              <h3 className="text-xs font-bold text-brand-purple uppercase tracking-widest">Select Destination</h3>
              
              {/* Search Bar */}
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search countries..."
                  className="glass-input pl-10 py-2.5 text-xs font-semibold w-full"
                />
              </div>

              {/* Country Buttons List */}
              <div className="space-y-1.5 max-h-60 overflow-y-auto pr-1">
                {filteredCountries.map((c) => {
                  const isActive = selectedCountry === c;
                  return (
                    <button
                      key={c}
                      onClick={() => setSelectedCountry(c)}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-left transition-all ${
                        isActive
                          ? 'bg-brand-blue text-white shadow-brand-glow'
                          : 'bg-white border border-soft-border text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <span>{c}</span>
                      <ChevronRight className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                    </button>
                  );
                })}
                {filteredCountries.length === 0 && (
                  <div className="text-center py-4 text-xs font-semibold text-slate-400">
                    No matching destinations found.
                  </div>
                )}
              </div>
            </div>

            {/* Helpline Card */}
            <div className="glass-card p-5 space-y-4">
              <h4 className="text-xs font-bold text-brand-blue uppercase tracking-wider flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-brand-purple" />
                <span>Custom Destinations?</span>
              </h4>
              <p className="text-slate-500 text-[10px] leading-relaxed font-semibold">
                Applying to Australia, Canada, Schengen Area, or custom multi-stop routes? Our Gurgaon immigration specialists prepare DS-160, Visa questionnaires, and cover sheets.
              </p>
              <a
                href="/contact"
                className="btn-navy w-full !py-2.5 !text-[10px] uppercase tracking-wider font-extrabold text-center block"
              >
                Inquire Gurgaon Desk
              </a>
            </div>
          </div>

          {/* Right panel: Requirements & Uploader form */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Country Specifications Card */}
            <motion.div
              key={selectedCountry}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card p-6 sm:p-8 space-y-6 border-l-4 border-brand-purple"
            >
              {/* Specs Header */}
              <div className="border-b border-soft-border pb-4 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] text-brand-purple font-bold uppercase tracking-widest block">Visa parameters for</span>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-brand-blue">{selectedCountry}</h3>
                </div>
                
                {/* Specs pill badges */}
                <div className="flex flex-wrap gap-2 text-[10px] font-bold">
                  <span className="px-2.5 py-1 rounded-full bg-brand-purple/5 text-brand-purple border border-brand-purple/10">
                    {req.processingTime}
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100">
                    {req.fees}
                  </span>
                </div>
              </div>

              {/* Document checklist */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-brand-blue uppercase tracking-wider">Required Document Checklist</h4>
                <div className="grid grid-cols-1 gap-3">
                  {req.documents.map((doc, idx) => (
                    <div key={idx} className="flex gap-3 items-start bg-slate-50 border border-soft-border p-3.5 rounded-xl">
                      <div className="w-5 h-5 rounded-full bg-brand-purple/5 border border-brand-purple/10 flex items-center justify-center shrink-0 mt-0.5 text-brand-purple font-bold text-[10px]">
                        {idx + 1}
                      </div>
                      <span className="text-slate-600 text-xs font-semibold leading-relaxed">{doc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interactive uploader & Inquiry form */}
              <div className="border-t border-soft-border pt-6 space-y-6">
                <h4 className="text-xs font-bold text-brand-blue uppercase tracking-wider">Submit Pre-requisite scans</h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  
                  {/* File Upload card */}
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold text-brand-purple uppercase tracking-wider block">Passport bio-data / photos</label>
                    <div className="border-2 border-dashed border-soft-border rounded-2xl p-6 text-center hover:border-brand-purple transition-all duration-300 relative bg-slate-50 flex flex-col items-center justify-center min-h-[140px] cursor-pointer">
                      <input
                        type="file"
                        onChange={handleFileUpload}
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                        disabled={uploadProgress}
                      />
                      {uploadProgress ? (
                        <div className="space-y-2">
                          <div className="w-8 h-8 rounded-full border-2 border-brand-purple border-t-transparent animate-spin mx-auto" />
                          <span className="text-[10px] text-slate-500 font-bold block">Processing scan encryption...</span>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <CloudUpload className="w-8 h-8 text-brand-purple mx-auto animate-bounce" />
                          <span className="text-xs font-bold text-brand-blue block">Upload Passport Scan / File</span>
                          <span className="text-[9px] text-slate-400 block">PDF, JPG, PNG (Max 10MB)</span>
                        </div>
                      )}
                    </div>

                    {/* Uploaded files status queue */}
                    <AnimatePresence>
                      {uploadedFiles.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0 }}
                          className="space-y-1.5"
                        >
                          {uploadedFiles.map((file, i) => (
                            <div key={i} className="flex items-center justify-between bg-emerald-50 border border-emerald-100 rounded-lg px-3 py-1.5 text-[10px] font-semibold text-emerald-700">
                              <span className="truncate max-w-[200px]">✓ {file}</span>
                              <span className="text-[8px] uppercase font-bold bg-emerald-100 px-1.5 py-0.5 rounded">Encrypted</span>
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Booking Query checkout */}
                  <div className="space-y-4">
                    <label className="text-[10px] font-bold text-brand-purple uppercase tracking-wider block">Submit Visa Request</label>
                    
                    <AnimatePresence mode="wait">
                      {submitted ? (
                        <motion.div
                          key="success"
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0 }}
                          className="p-4 rounded-xl bg-emerald-50 border border-emerald-100 text-center space-y-2"
                        >
                          <CheckCircle2 className="w-6 h-6 text-emerald-500 mx-auto" />
                          <span className="text-xs font-bold text-emerald-700 block">Visa Inquiry Registered!</span>
                          <p className="text-[9px] text-slate-500 font-semibold leading-relaxed">
                            Thank you. Our Gurgaon desk is compiling application logs.
                          </p>
                        </motion.div>
                      ) : (
                        <motion.form
                          key="form"
                          onSubmit={handleVisaSubmit}
                          className="space-y-3"
                        >
                          <input
                            type="text"
                            required
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            placeholder="Full Name"
                            className="glass-input w-full text-xs py-2 px-3 font-semibold"
                          />
                          <input
                            type="email"
                            required
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            placeholder="Email Address"
                            className="glass-input w-full text-xs py-2 px-3 font-semibold"
                          />
                          <input
                            type="tel"
                            value={form.phone}
                            onChange={(e) => setForm({ ...form, phone: e.target.value })}
                            placeholder="Phone Number"
                            className="glass-input w-full text-xs py-2 px-3 font-semibold"
                          />
                          <button
                            type="submit"
                            className="btn-gold w-full !py-2.5 !text-xs font-extrabold uppercase tracking-wider shadow"
                          >
                            <Send className="w-3.5 h-3.5" />
                            <span>Request Booking desk</span>
                          </button>
                        </motion.form>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Assurance */}
                <div className="flex gap-2.5 items-start text-[10px] text-slate-500 border-t border-soft-border pt-4">
                  <ShieldCheck className="w-4 h-4 text-brand-purple shrink-0 mt-0.5" />
                  <span>
                    100% Secure document uploads. Nishtha Travel Concierge adheres to strict GDPR & Gurgaon privacy protocols. We will never share your visa paperwork.
                  </span>
                </div>

              </div>

            </motion.div>

          </div>

        </div>

      </div>
    </div>
  );
};
