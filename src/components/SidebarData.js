import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';

export const SidebarData = [
    {
        title: 'Top Validators',
        path: '#',
        icon: <IoIcons.IoMdAnalytics/>,

        iconClosed: <RiIcons.RiArrowDownSFill/>,
        iconOpened: <RiIcons.RiArrowUpSFill/>,

        subNav: [
            {
                title: 'By Least Commission Cut',
                path: '/validators/commission',
                icon: <IoIcons.IoIosPaper/>
            },

            {
                title: 'By Most Token Amount',
                path: '/validators/tokens',
                icon: <IoIcons.IoIosPaper/>
            },

            {
                title: 'By Most Voting Power',
                path: '/validators/votingPower',
                icon: <IoIcons.IoIosPaper/>
            },
            {
                title: 'By Most Prosperity Priority',
                path: '/validators/prosperityPriority',
                icon: <IoIcons.IoIosPaper/>
            },
            {
                title: 'By Total Tokens Delegated',
                path: '/validators/tokensDelegated',
                icon: <IoIcons.IoIosPaper/>
            },
            {
                title: 'By Commission Earned',
                path: '/validators/commissionEarned',
                icon: <IoIcons.IoIosPaper/>
            },
            {
                title: 'By Outstanding Rewards',
                path: '/validators/outstandingRewards',
                icon: <IoIcons.IoIosPaper/>
            },
            {
                title: 'By Number of Delegations',
                path: '/validators/numberOfDelegation',
                icon: <IoIcons.IoIosPaper/>
            },

        ]
    },

    {
        title: 'Top Tokens',
        path: '#',
        icon: <IoIcons.IoMdAnalytics/>,

        iconClosed: <RiIcons.RiArrowDownSFill/>,
        iconOpened: <RiIcons.RiArrowUpSFill/>,

        subNav: [
            {
                title: 'By Token Supply',
                path: '/tokens/supply',
                icon: <IoIcons.IoIosPaper/>
            },
            {
                title: 'In Community Pool',
                path: '/tokens/pool',
                icon: <IoIcons.IoIosPaper/>
            }
        ]
    },

    {
        title: 'Top Delegators',
        path: '#',
        icon: <IoIcons.IoMdAnalytics/>,

        iconClosed: <RiIcons.RiArrowDownSFill/>,
        iconOpened: <RiIcons.RiArrowUpSFill/>,

        subNav: [
            {
                title: 'By Rewards Earned',
                path: '/delegators/rewards',
                icon: <IoIcons.IoIosPaper/>
            },
            {
                title: 'Number Of Delegation',
                path: '/delegators/delegations',
                icon: <IoIcons.IoIosPaper/>
            }
        ]
    }


];
