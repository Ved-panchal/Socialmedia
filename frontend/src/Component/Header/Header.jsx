import React, { useState } from 'react'
import './Header.css'
import { Link } from 'react-router-dom'
import {
    Home,
    HomeOutlined,
    Add,
    AddOutlined,
    SearchOutlined,
    Search,
    AccountCircle,
    AccountCircleOutlined,
    ChatBubble,
    ChatBubbleOutline
} from '@mui/icons-material'

const Header = () => {

    const [tab,setTab] = useState(window.location.pathname);

    return (
        <div className="header">
            <Link to="/" onClick={() => setTab("/")}>
            {
                tab === "/" ? <Home style={{color:"var(--socials-secondary)"}}/> : <HomeOutlined/>
            }
            </Link>

            <Link to="/newpost" onClick={() => setTab("/newpost")}>
            {
                tab === "/newpost" ? <Add style={{color:"var(--socials-secondary)"}}/> : <AddOutlined/>
            }
            </Link>
            
            <Link to="/search" onClick={() => setTab("/search")}>
            {
                tab === "/search" ? <Search style={{color:"var(--socials-secondary)"}}/> : <SearchOutlined/>
            }
            </Link>
            
            <Link to="/account" onClick={() => setTab("/account")}>
            {
                tab === "/account" ? <AccountCircle style={{color:"var(--socials-secondary)"}}/> : <AccountCircleOutlined/>
            }
            </Link>

            <Link to="/chat" onClick={() => setTab("/chat")}>
            {
                tab === "/chat" ? <ChatBubble style={{color:"var(--socials-secondary)"}}/> : <ChatBubbleOutline/>
            }
            </Link>

        </div>
    )
}

export default Header
