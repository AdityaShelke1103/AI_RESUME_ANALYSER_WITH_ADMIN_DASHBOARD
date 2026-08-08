'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import ArticleIcon from '@mui/icons-material/Article';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HistoryIcon from '@mui/icons-material/History';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

const Sidebar = () => {
    const pathname = usePathname();

    const navItems = [
        {
            href: '/Dashboard',
            label: 'Dashboard',
            icon: DashboardIcon,
        },
        {
            href: '/History',
            label: 'History',
            icon: HistoryIcon,
        },
        {
            href: '/AdminPage',
            label: 'AdminPage',
            icon: AdminPanelSettingsIcon,
        },
        {
            href: '/Adminregistration',
            label: 'Admin Job Posting',
            icon: AdminPanelSettingsIcon,
        },
    ];

    return (
        <div className="h-screen w-[250px] border-r border-black bg-blue-700 flex flex-col text-white p-4">
            <div className="mx-auto">
                <ArticleIcon sx={{ fontSize: 54 }} />
            </div>

            <div className="text-2xl font-bold mx-auto">
                Resume Screening
            </div>

            <div className="mt-10 flex flex-col gap-3">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-2 p-3 rounded-md transition-colors ${isActive
                                ? 'bg-white text-blue-700 font-semibold'
                                : 'text-white hover:bg-blue-600'
                                }`}
                        >
                            <Icon sx={{ fontSize: 24 }} />
                            <span>{item.label}</span>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default Sidebar;