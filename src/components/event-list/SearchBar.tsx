import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

export default function SearchBar() {
  return (
    <div className="relative block w-full p-4 items-center justify-start hover:cursor-pointer">
      <MagnifyingGlassIcon className="absolute top-7 left-6 size-6 text-gray-500" />
      <input type="search" name="search" className="h-12 w-full rounded-lg border-gray-300 bg-gray-50 text-gray-900 border ps-10 pe-2 text-md hover:shadow-sm transition-shadow duration-200" />
    </div>
  )
}