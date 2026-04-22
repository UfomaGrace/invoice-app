import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

export default function FilterDropdown({ filter, setFilter }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const options = [
    { value: "draft", label: "Draft" },
    { value: "pending", label: "Pending" },
    { value: "paid", label: "Paid" },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleStatus = (status) => {
    if (filter === "status") {
      setFilter("all");
      // } else if (filter === status) {
      //   setFilter('all');
    } else {
      setFilter(status);
    }
  };

  //   const isSelected = (status) => filter === status || filter === 'all';
  const isSelected = (status) => {
    return filter === status;
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 font-bold text-sm text-[#0C0E16] dark:text-white"
      >
        Filter by status
        <ChevronDown
          size={18}
          className={`transition-transform text-[#7C5DFA] font-bold ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 shadow-xl rounded-md py-2 z-50 bg-white">
          {options.map((option) => (
            <label
              key={option.value}
              className="flex items-center gap-3 px-5 py-3 cursor-pointer font-bold text-sm"
            >
              <div className="relative">
                <input
                  type="checkbox"
                  checked={isSelected(option.value)}
                  onChange={() => toggleStatus(option.value)}
                  className="peer w-5 h-5 appearance-none border-transparent rounded
               bg-[#DFE3FA] cursor-pointer
               hover:border-2 hover:border-[#7C5DFA] transition-colors duration-300
               checked:border checked:border-[#7C5DFA] checked:bg-[#7C5DFA]"
                />

                {/* Custom Check Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute left-1/2 top-2/5 -translate-x-1/2 -translate-y-1/2 w-4 h-4 
               text-white pointer-events-none opacity-0 peer-checked:opacity-100"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <span className="select-none">{option.label}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
