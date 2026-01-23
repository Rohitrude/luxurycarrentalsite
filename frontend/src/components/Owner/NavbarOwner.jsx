import React from 'react';
import {assets} from '../../assets/assets';
import { Link } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';

const NavbarOwner = ({setShowSidebar, showSidebar})=> {

const {user} = useAppContext();

    return(
        <div className="flex items-center justify-between px-4 md:px-10 py-4 text-gray-500 border-b border-borderColor relative">

            <div className="flex gap-3">
                {!showSidebar ? (
                <button className="md:hidden text-xl" onClick={()=>setShowSidebar(true)}>☰</button>
                ) : (
                    <button className="md:hidden text-xl z-60 " onClick={()=>setShowSidebar(false)}>✕</button>
                )}

                <Link to="/">
                    <img src={assets.logo} alt="" className="h-8" style={{
                        filter: "brightness(0) saturate(100%) invert(62%) sepia(98%) saturate(749%) hue-rotate(72deg) brightness(97%) contrast(101%)"
                    }} />
                </Link>
            </div>

            <p>Welcome, {user?.name || "Owner"}</p>

        </div>

    )
}

export default NavbarOwner;