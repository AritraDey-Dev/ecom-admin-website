"use client"
import { useeStoreModal } from "@/hooks/use-store-model"
import { Modal } from "../ui/modal"

export const StoreModal=()=>{
   const storeModal=useeStoreModal();
  return(

   <Modal title="Create Store" description="Add a new store to manage products and catgories"
   isOpen={storeModal.isOpen}
   onClose={storeModal.onclose}>
    Future Create store from
   </Modal>
   )
}