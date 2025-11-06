import React from 'react';
import {assets} from '../../assets/assets';
import { Link } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';

const NavbarOwner = ()=> {

const {user} = useAppContext();

    return(
        <div className="flex items-center justify-between px-6 md:px-10
        py-4 text-gray-500 border-b border-borderColor relative transition-all">

            <Link to='/'>
            <img src={assets.logo} alt="" className="h-8" style={{
            filter:
              "brightness(0) saturate(100%) invert(62%) sepia(98%) saturate(749%) hue-rotate(72deg) brightness(97%) contrast(101%)",
          }} />
            </Link>
            <p>Welcom, {user?.name || "Owner" }</p>
        </div>
    )
}

export default NavbarOwner;