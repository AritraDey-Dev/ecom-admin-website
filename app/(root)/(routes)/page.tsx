"use client"
import { Modal } from '@/components/ui/modal';
import { useeStoreModal } from '@/hooks/use-store-model';
import { UserButton } from '@clerk/nextjs';
import { useEffect} from 'react';

function SetupPage() {
    const onOpen=useeStoreModal((state)=>state.onOpen)
     const isOpen=useeStoreModal((state)=>state.isOpen)
     useEffect(()=>{
        if(!isOpen){
            onOpen()};
        },[])
     
    return (
        <>  Navbar</>
    );
    }
export default SetupPage;


