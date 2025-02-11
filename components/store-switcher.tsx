"use client"

import { PopoverTrigger, Popover, PopoverContent } from "@/components/ui/popover"
import { useeStoreModal } from "@/hooks/use-store-model";
import { Store } from "@prisma/client"
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState,useEffect } from "react";
import { Button } from "./ui/button";
import { Check, ChevronsUpDown,Store as StoreIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { CommandEmpty, CommandGroup,CommandList,CommandInput, CommandItem, Command } from "./ui/command";

type PopoverTriggerProps = React.ComponentPropsWithRef<typeof PopoverTrigger>

interface StoreSwitcherProps extends PopoverTriggerProps {
  items?: Store[]
}

const StoreSwitcher = ({ className, items = [] }: StoreSwitcherProps) => {
  const storeModal = useeStoreModal();
  const params = useParams();
  const router = useRouter();

  const formattedItems = items.map((item) => ({
    label: item.name,
    value: item.id
  }));
  const currentStore = formattedItems.find((item) => item.value === params.storeId);

  const [open, setOpen] = useState(false);

  const onStoreSelect = (store: { value: string, label: string }) => {
    setOpen(false);
    router.push(`/${store.value}`);
  }

  return (
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            role="combobox"
            aria-expanded={open}
            aria-label="Select a Store"
            className={cn("w-[200px] justify-between", className)}
          >
            <StoreIcon className="mr-2 h-4 w-4" />
            {currentStore?.label || "Select a store"}
            <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandList>
              <CommandInput placeholder="Search store" />
              <CommandEmpty>No store found</CommandEmpty>
              <CommandGroup heading="Stores">
                {formattedItems.map((store)=>(
                   <CommandItem key={store.value}
                   onSelect={()=>onStoreSelect(store)}
                   className="text-sm">
                   <StoreIcon className="mr-2 h-4 w-4"/>
                   {store.label}
                    <Check className={cn("ml-auto h-4 w-4",currentStore?.value=== store.value
                        ? "opacity-100"
                        : "opacity-0"
                    )}/>
                   </CommandItem>
                ))}

              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default StoreSwitcher;
