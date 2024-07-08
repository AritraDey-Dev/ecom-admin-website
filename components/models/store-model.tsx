"use client"
import { useeStoreModal } from '@/hooks/use-store-model';
import { Modal } from "../ui/modal";
import * as z from 'zod';
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormItem, FormField, FormLabel, FormControl } from "../ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';


const formSchema = z.object({
   name: z.string().min(1),
});

export const StoreModal = () => {
   const storeModal = useeStoreModal();

   const [loading, setLoading] = useState(false);

   const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         name: ""
      }
   });

   const onSubmit = async (values: z.infer<typeof formSchema>) => {
      try {
         setLoading(true);
         const response = await axios.post('/api/stores', values)
         console.log(response.data);
         window.location.assign(`${response.data.id}`);
      } catch (e) {
         toast.error("Something Went wrong")
      } finally {
         setLoading(false);
      }
   };

   return (
      <Modal
         title="Create Store"
         description="Add a new store to manage products and categories"
         isOpen={storeModal.isOpen}
         onClose={storeModal.onclose}
      >
         <div>
            <div className="space-y-4 py-2 pb-4">
               <FormProvider {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)}>
                     <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Name</FormLabel>
                              <FormControl>
                                 <Input disabled={loading} placeholder="E-commerce" {...field} />
                              </FormControl>
                           </FormItem>
                        )}
                     />
                     <div className="pt-6 space-x-2 flex items-center justify-end">
                        <Button type="button" onClick={storeModal.onclose}>Cancel</Button>
                        <Button type="submit">Submit</Button>
                     </div>
                  </form>
               </FormProvider>
            </div>
         </div>
      </Modal>
   );
}
