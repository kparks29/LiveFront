import { ChevronDownIcon, SewingPinFilledIcon } from "@radix-ui/react-icons";
import { useState } from "react";

interface LocationFilerProps {
  location?: Optional<string>
}

export default function LocationFiler({ location = 'Select your location'}: LocationFilerProps) {
  const [showLocationOptions, setShowLocationOptions] = useState<boolean>(false)

  const handleToggleShowLocation = () => {
    setShowLocationOptions(prev => !prev)
  }

  return (
    <div className="flex items-center">
      <SewingPinFilledIcon />
      Near 
      <span 
        onClick={() => handleToggleShowLocation()}
        className="text-blue-600 underline-offset-1 flex items-center p-1"
      >{location}<ChevronDownIcon className={`size-6 transition-transform duration-200 ${showLocationOptions ? '-rotate-180' : ''}`} /></span>
    </div>
  )
}