import React, { useState, useRef, useEffect } from 'react';

const DropdownC = ({ options }: any) => {
    const [isOpen, setIsOpen]: any = useState(false);
    const [dropUp, setDropUp]: any = useState(false);
    const dropdownRef: any = useRef(null);
    const triggerRef: any = useRef(null);

    useEffect(() => {
        const handleWindowClick = (e: any) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target) &&
                triggerRef.current &&
                !triggerRef.current.contains(e.target)
            ) {
                setIsOpen(false);
            }
        };

        window.addEventListener('click', handleWindowClick);

        return () => {
            window.removeEventListener('click', handleWindowClick);
        };
    }, []);

    const handleToggle = () => {
        if (!isOpen) {
            const triggerRect = triggerRef.current.getBoundingClientRect();
            const dropdownHeight = 200; // Adjust this to your dropdown's height or calculate dynamically
            const spaceBelow = window.innerHeight - triggerRect.bottom;
            const spaceAbove = triggerRect.top;

            if (spaceBelow < dropdownHeight && spaceAbove > dropdownHeight) {
                setDropUp(true);
            } else {
                setDropUp(false);
            }
        }
        setIsOpen(!isOpen);
    };

    return (
        <div style={{position: "relative"}}> 
            <button ref={triggerRef} onClick={handleToggle} type='button'>
                Toggle Dropdown
            </button>
            {isOpen && (
                <div
                    ref={dropdownRef}
                    style={{
                        position: 'absolute',
                        top: dropUp ? 'auto' : '100%',
                        bottom: dropUp ? '100%' : 'auto',
                    }}
                >
                    <ul>
                        {options.map((option: any, index: any) => (
                            <li key={index}>{option}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default DropdownC;
