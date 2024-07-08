import { create } from "zustand";

interface useStoreModalstore {
    isOpen:boolean;
    onOpen:()=>void;
    onclose:()=>void;
}

export const useeStoreModal=create<useStoreModalstore>((set)=>({
    isOpen:false,
    onOpen:()=>set({isOpen:true}),
    onclose:()=>set({isOpen:false})

}))