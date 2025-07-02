import React from 'react';
import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';

const Layout = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-gray-50 via-primary-50 to-primary-100"
    >
      <div className="container mx-auto px-4 py-6 md:py-8">
        <Outlet />
      </div>
    </motion.div>
  );
};

export default Layout;