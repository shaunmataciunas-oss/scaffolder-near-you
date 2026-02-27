import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowRight, Loader2, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const EmailSignupForm = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      toast({
        variant: "destructive",
        title: "Invalid Email",
        description: "Please enter a valid email address.",
      });
      return;
    }

    setLoading(true);

    // Simulate API call and store in localStorage
    setTimeout(() => {
      const subscribers = JSON.parse(localStorage.getItem('shop_subscribers') || '[]');
      
      if (subscribers.includes(email)) {
        toast({
          title: "Already Subscribed",
          description: "You're already on the list! We'll be in touch.",
        });
        setLoading(false);
        setSubscribed(true);
        return;
      }

      subscribers.push({ email, date: new Date().toISOString() });
      localStorage.setItem('shop_subscribers', JSON.stringify(subscribers));

      toast({
        title: "You're on the list! 🚀",
        description: "Thanks! We'll notify you when the shop launches.",
      });

      setLoading(false);
      setSubscribed(true);
      setEmail('');
    }, 1500);
  };

  if (subscribed) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-brand-secondary/50 border border-brand-yellow/30 p-8 rounded-xl text-center max-w-md mx-auto"
      >
        <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-green-500" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">You're All Set!</h3>
        <p className="text-gray-400">
          We've added you to our exclusive early access list. Keep an eye on your inbox for updates.
        </p>
        <Button 
          variant="ghost" 
          className="mt-4 text-brand-yellow hover:text-white"
          onClick={() => setSubscribed(false)}
        >
          Register another email
        </Button>
      </motion.div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative flex items-center">
          <Mail className="absolute left-4 w-5 h-5 text-gray-500 z-10" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="w-full pl-12 pr-4 py-4 bg-white dark:bg-zinc-900 border-2 border-transparent focus:border-brand-yellow rounded-xl shadow-lg text-gray-900 dark:text-white placeholder-gray-500 outline-none transition-all"
            disabled={loading}
          />
        </div>
        <Button
          type="submit"
          disabled={loading}
          className="w-full mt-4 bg-brand-yellow hover:bg-brand-yellow/90 text-brand-black font-bold h-12 text-lg shadow-lg hover:shadow-brand-yellow/20 transition-all rounded-xl"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Joining...
            </>
          ) : (
            <>
              Notify Me
              <ArrowRight className="ml-2 h-5 w-5" />
            </>
          )}
        </Button>
      </form>
      <p className="text-xs text-center text-gray-500 mt-4">
        We respect your privacy. No spam, ever.
      </p>
    </div>
  );
};

export default EmailSignupForm;