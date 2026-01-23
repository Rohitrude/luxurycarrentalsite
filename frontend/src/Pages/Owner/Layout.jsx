import React, { useEffect, useState } from 'react';
import NavbarOwner from '../../components/Owner/NavbarOwner';
import Sidebar from '../../components/Owner/Sidebar';
import { Outlet } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';

const Layout = ()=> {
    const {isOwner, navigate} = useAppContext();
    const [showSidebar, setShowSidebar] = useState(false);

    useEffect(()=>{
        if(!isOwner){
            navigate('/');
        }
    },[isOwner]);
    return(
       <div className="flex flex-col">
            <NavbarOwner setShowSidebar={setShowSidebar} showSidebar={showSidebar} />
            <div className="flex relative">
                <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
                <div className="flex-1">
                    <Outlet/>
                </div>
            </div>
        </div>
    )
}

export default Layout;