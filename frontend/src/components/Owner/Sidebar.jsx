import React, {useState} from 'react';
import {assets, ownerMenuLinks} from '../../assets/assets';
import {NavLink, useLocation} from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';


const Sidebar = ({showSidebar, setShowSidebar})=> {

    const {user, axios, fetchUser} = useAppContext();
    const location = useLocation();    

    const [image, setImage] = useState('')

    const updateImage = async ()=>{   
        try {
            const formData = new FormData();
            formData.append('image', image);

            const {data} = await axios.post('/api/owner/update-image', formData);

            if(data.success){
                fetchUser();
                toast.success(data.message);
                setImage('');
            }else{
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    return(
        <>
        
        <div className={`fixed md:static top-0 left-0 z-50 min-h-screen md:flex 
            flex-col items-center pt-8 w-full md:w-60 border-r border-borderColor
             text-sm bg-white transition-transform duration-300 
             ${showSidebar ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>

            <div className="group relative">
                <label htmlFor="image">
                <div className="flex justify-center md:justify-start w-full">
                    <div className="flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-full p-[5px] border-2 border-primary">
                        <img
                        src={image ? URL.createObjectURL(image) : user?.image}
                        alt="profile"
                        className="w-full h-full rounded-full border border-gray-400"
                        />
                    </div>
                </div>

                    <input type="file" id="image" accept="image/*" hidden onChange={e => setImage(e.target.files[0])} />

                    <div className="absolute hidden md:group-hover:flex top-0 right-0 left-0 bottom-0 bg-black/10 rounded-full items-center justify-center cursor-pointer">
                        <img src={assets.edit_icon} alt="" />
                    </div>
                </label>
            </div>

            {image && (
                <button className="absolute top-2 right-2 flex p-2 gap-1 bg-primary/10 text-primary cursor-pointer" onClick={updateImage}>
                    Save
                    <img src={assets.check_icon} width={13} alt="" />
                </button>
            )}

            <p className="mt-2 text-base hidden md:block">{user?.name}</p>

            <div className="w-full">
                {ownerMenuLinks.map((link, index) => (
                    <NavLink key={index} to={link.path} onClick={() => setShowSidebar(false)} 
                    className={`relative flex items-center gap-2 w-full py-3 pl-4 first:mt-6 
                    ${link.path === location.pathname ? 'bg-primary/10 text-primary' : 'text-gray-600 hover:bg-gray-100'}`}>
                        <img src={link.path === location.pathname ? link.coloredIcon : link.icon} alt="car-icon" />
                        <span className="inline">{link.name}</span>
                        <div className={`${link.path === location.pathname && 'bg-primary'} w-1.5 h-8 rounded-lg right-0 absolute`}></div>
                    </NavLink>
                ))}
            </div>

        </div>

        {/* Mobile Overlay */}
        {showSidebar && <div className="fixed inset-0 bg-black/40 z-40 md:hidden" onClick={()=>setShowSidebar(false)}></div>}
        </>
    )
}

export default Sidebar;