import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCompass, faHome } from '@fortawesome/free-solid-svg-icons';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        <div className="mb-8">
          <FontAwesomeIcon
            icon={faCompass}
            className="text-purple-500 text-6xl mb-4 animate-spin-slow"
          />
          <h1 className="text-4xl font-bold text-gray-900 mb-2">页面未找到</h1>
          <p className="text-gray-600 text-lg">
            抱歉，您访问的页面似乎已经迷路了。让我们帮您回到正确的路径。
          </p>
        </div>

        <div className="space-y-4">
          <Link
            to="/"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 md:py-4 md:text-lg md:px-10 transition-all duration-200 w-full"
          >
            <FontAwesomeIcon icon={faHome} className="mr-2" />
            返回首页
          </Link>

          <div className="text-sm text-gray-500">
            如果您认为这是一个错误，请
            <a
              href="mailto:hello@pixpet.h7ml.cn"
              className="text-purple-600 hover:text-purple-700 underline ml-1"
            >
              联系我们
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
