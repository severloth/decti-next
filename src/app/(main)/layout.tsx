
import { FC, PropsWithChildren } from "react";
import Image from 'next/image';
import Link from "next/link";
import { Button } from "@mui/material";

const MainLayout: FC<PropsWithChildren> = ({ children }) => {


    return <>
        <div className="flex">
            <div>
                <nav style={{display:'flex', padding:'30px', height:'100vh', backgroundColor:'#00627E', width:'250px', justifyContent:'space-between', flexDirection:'column', alignItems:'center'}}>
                    <div className="logo" style={{display:'flex', textAlign:'center', alignItems:'center', flexDirection:'column'}}>
                        <Image
                            src="/logoBlanco.png"
                            alt="logo"
                            width={100}
                            height={100}
                        />
                        <h2 style={{color:'white', width:'100%', margin:'20px', fontWeight:'700'}}>Usina Tecnológica de San Miguel</h2>
                    </div>
                    <ul style={{display:'flex',flexDirection:'column', alignItems:'center', width:'100%'}}>
                        <li style={{width:'300px', display:'flex', justifyContent:'center', margin:'10px'}}><Link href="/home" style={{paddingLeft:'100px', paddingRight:'100px', paddingBottom:'5px', paddingTop:'5px', fontSize:'20px', color:'white'}}>Home</Link></li>
                        <li style={{width:'300px', display:'flex', justifyContent:'center', margin:'10px', }}><Link href="/profile" style={{ paddingLeft:'100px', paddingRight:'100px', paddingBottom:'5px', paddingTop:'5px', fontSize:'20px', color:'white'}}>Profile</Link></li>
                        {/* <li style={{width:'300px', display:'flex', justifyContent:'center', margin:'10px'}}><Link href="/logout" style={{paddingLeft:'100px', paddingRight:'100px', paddingBottom:'5px', paddingTop:'5px', fontSize:'20px'}}>Logout</Link></li> */}
                    </ul>
                    <Button style={{width:'200px', margin:'10px'}}>Logout</Button>
                </nav>
            </div>
            <main style={{width:'100%', height:'100vh'}}>{children}</main>

        </div>
    </>

}

export default MainLayout;