import { useState } from 'react';
import { X } from 'lucide-react';
import authImg from "../assets/authImg.png"
export default function LoginRegisterModal() {
  const [isOpen, setIsOpen] = useState(true);
  const [mobileNumber, setMobileNumber] = useState('');

  const handleSendOTP = () => {
    console.log('Sending OTP to:', mobileNumber);
   
  };

  const handleGoogleSignIn = () => {
    console.log('Sign in with Google');
  
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl max-w-2xl w-full flex overflow-hidden shadow-2xl relative">
        {/* Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-6 right-6 text-gray-600 hover:text-gray-900 z-10 cursor-pointer"
        >
          <X size={24} />
        </button>

        {/* Left Side - Image */}
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-blue-50 to-purple-50 items-center justify-center p-8">
          <img 
            src={authImg} 
            alt="Login illustration" 
            className="w-full h-full object-contain"
          />
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-5 mt-5 text-center">
            Login or Register
          </h2>
          <p className="text-gray-600 text-sm mb-2 max-md:mb-4 max-md:text-center">
            for Better Experience, Order tracking<br />
            &Regular updates
          </p>

          {/* Mobile Number Input */}
          <div className="mb-6">
            <div className="flex items-center border-2 border-gray-300 rounded-lg px-4 py-3 focus-within:border-blue-500 transition-colors">
              <span className="text-gray-700 font-medium mr-2">+91-</span>
              <input
                type="tel"
                placeholder="Mobile Number"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                className="flex-1 outline-none text-gray-900"
                maxLength={10}
              />
            </div>
          </div>

          {/* Send OTP Button */}
          <button
            onClick={handleSendOTP}
            className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 rounded-lg mb-6 transition-colors"
          >
            Send OTP
          </button>

          {/* Terms */}
          <p className="text-xs text-gray-500 text-center mb-6">
            By signing up, you agree to the{' '}
            <a href="#" className="text-blue-600 underline">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="text-blue-600 underline">
              Privacy Policy
            </a>
            , including{' '}
            <a href="#" className="text-blue-600 underline">
              Cookie Use
            </a>
            .
          </p>

          {/* Google Sign In */}
          <button
            onClick={handleGoogleSignIn}
            className="w-full border-2 border-gray-300 hover:border-gray-400 bg-white text-gray-700 font-medium py-3 rounded-full flex items-center justify-center gap-3 transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Sign up with Google
          </button>
        </div>
      </div>
    </div>
  );
}