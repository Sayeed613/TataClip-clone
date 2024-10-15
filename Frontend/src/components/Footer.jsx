import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className=" text-black  py-10">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Company Info */}
        <div>
          <h3 className="text-lg font-bold mb-4">Company</h3>
          <ul className="space-y-2">
            <li><a href="/about" className="hover:underline">About Us</a></li>
            <li><a href="/careers" className="hover:underline">Careers</a></li>
            <li><a href="/press" className="hover:underline">Press</a></li>
            <li><a href="/blog" className="hover:underline">Blog</a></li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="text-lg font-bold mb-4">Customer Service</h3>
          <ul className="space-y-2">
            <li><a href="/contact" className="hover:underline">Contact Us</a></li>
            <li><a href="/faq" className="hover:underline">FAQ</a></li>
            <li><a href="/returns" className="hover:underline">Returns & Refunds</a></li>
            <li><a href="/shipping" className="hover:underline">Shipping Info</a></li>
          </ul>
        </div>

        {/* Social Media Links */}
        <div>
          <h3 className="text-lg font-bold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="https://facebook.com" className="hover:text-gray-400">
              <FaFacebookF />
            </a>
            <a href="https://twitter.com" className="hover:text-gray-400">
              <FaTwitter />
            </a>
            <a href="https://instagram.com" className="hover:text-gray-400">
              <FaInstagram />
            </a>
            <a href="https://linkedin.com" className="hover:text-gray-400">
              <FaLinkedinIn />
            </a>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div>
          <h3 className="text-lg font-bold mb-4">Newsletter</h3>
          <p className="text-sm mb-4">Subscribe to get the latest updates on new products and sales.</p>
          <form className="flex space-x-2">
            <input
              type="email"
              className="w-full px-4 py-2 rounded bg-gray-800 text-white"
              placeholder="Enter your email"
            />
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Subscribe</button>
          </form>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="mt-10 border-t border-gray-800 pt-6 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} Your Company Name. All rights reserved.</p>
        <div className="flex justify-center space-x-6 mt-4">
          <a href="/terms" className="hover:underline">Terms & Conditions</a>
          <a href="/privacy" className="hover:underline">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
