import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { FiLogOut, FiUser } from 'react-icons/fi';

import DropdownContent from './content';
import DropdownItem from './item';
import { modals } from '@/constants/modals';
import { openModal } from '@/store/slices/modal/slice';
import { logout } from '@/store/slices/auth/thunk';
import { useNavigate } from 'react-router-dom';
import type { AppDispatch } from '@/store/store';
import { toast } from 'react-toastify';
import { clearUser } from '@/store/slices/user/slice';
import { setIsAuthenticated } from '@/store/slices/auth/slice';

const UserMenuDropdown = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen((prevState) => !prevState);
  };

  const handleLogout = async () => {
    await dispatch(logout());
    dispatch(clearUser());
    dispatch(setIsAuthenticated(false));

    toast.success('You have been logged out successfully');
    navigate('/login');
  };

  const handleUserInfo = () => {
    dispatch(openModal({ name: modals.userInfo }));
  };

  return (
    <div ref={dropdownRef}>
      <button
        onClick={toggleMenu}
        className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 cursor-pointer dark:hover:bg-gray-600 transition-colors"
        aria-label="Open user menu"
      >
        <FiUser size={20} />
      </button>
      <DropdownContent open={isOpen}>
        <ul>
          <DropdownItem onClick={handleUserInfo}>
            <li className="flex items-center gap-2">
              <FiUser size={20} />
              <span>User Info</span>
            </li>
          </DropdownItem>
          <DropdownItem onClick={handleLogout}>
            <li className="flex items-center gap-2">
              <FiLogOut size={20} />
              <span>Logout</span>
            </li>
          </DropdownItem>
        </ul>
      </DropdownContent>
    </div>
  );
};

export default UserMenuDropdown;
