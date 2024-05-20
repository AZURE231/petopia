import Link from 'next/link';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
export function Footer() {
  return (
    <footer className="bg-orange-50 rounded-t-3xl shadow p-4 mt-10">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between ">
          <ul className="flex flex-col md:flex-row items-center justify-center mb-6 font-medium text-gray-500 sm:mb-0">
            <li>
              <Link href="/" className="hover:underline md:me-6 w-fit">
                Trang chủ
              </Link>
            </li>
            <li>
              <Link href="/search" className="hover:underline md:me-6 w-fit">
                Nhận nuôi
              </Link>
            </li>
            <li>
              <Link href="/give-pet" className="hover:underline md:me-6 w-fit">
                Cho thú cưng
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:underline w-fit">
                Tin tức
              </Link>
            </li>
          </ul>

          {/* social icon */}
          <ul className="flex flex-wrap items-center justify-center mb-6 text-sm font-medium text-gray-500 sm:mb-0">
            <li>
              <Link
                href="https://www.facebook.com/groups/708101489324804"
                className="text-gray-500 hover:text-gray-600 me-10"
              >
                <FaFacebook size={32} />
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="text-gray-500 hover:text-gray-600 me-10"
              >
                <FaTwitter size={32} />
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="text-gray-500 hover:text-gray-600 me-10"
              >
                <FaInstagram size={32} />
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="text-gray-500 hover:text-gray-600 me-10"
              >
                <FaYoutube size={32} />
              </Link>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
        <div className="text-3xl text-center pb-6">
          <span className="text-yellow-300">Pet</span>opia
        </div>
        <span className="block text-sm text-gray-500">
          © 2024{' '}
          <Link href="/" className="hover:underline">
            Petopia™
          </Link>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}
