import React, { useEffect, useState, useRef } from "react";

const Dropdown = ({ options, giveValue, disabled, preSelected, label }: any) => {
    const [showMenu, setShowMenu]: any = useState(false);
    const [selectedValue, setSelectedValue]: any = useState();
    const [searchValue, setSearchValue]: any = useState("");
    const inputRef: any = useRef();
    const menuRef: any = useRef();
    const [dropUp, setDropUp] = useState(false);

    useEffect(() => {
        if (preSelected?.length > 0) {
            const Check = options.filter((option: any) => {
                return option.value === preSelected;
            });

            if (Check.length === 0) {
                setSelectedValue(preSelected);
                giveValue(preSelected);
            } else {
                setSelectedValue(Check[0]?.label);
                giveValue(Check[0].value);
            }
        } else {
            setSelectedValue("");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [preSelected]);


    useEffect(() => {
        const handler = (e: any) => {
            if (inputRef.current && !inputRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };
        window.addEventListener("click", handler);
        return () => {
            window.removeEventListener("click", handler);
        };
    }, [inputRef]);

    const searchRef: any = useRef();
    useEffect(() => {
        setSearchValue("");
        if (showMenu && searchRef.current) {
            searchRef.current.focus();
        }
    }, [showMenu]);

    const handleInputClick = (e: any) => {
        if (!showMenu) {
            const triggerRect = inputRef.current.getBoundingClientRect();
            const dropdownHeight = 180;
            const spaceBelow = window.innerHeight - triggerRect.bottom;
            const spaceAbove = triggerRect.top;

            if (spaceBelow < dropdownHeight && spaceAbove > dropdownHeight) {
                setDropUp(true);
            } else {
                setDropUp(false);
            }
        }
        setShowMenu(!showMenu);

    };

    const getDisplay = () => {
        if (selectedValue) {
            return selectedValue;
        }
    };

    const onItemClick = (option: any) => {
        giveValue(option.value);
        setSelectedValue(option.label);
    };

    const getOptions = () => {
        if (!searchValue) {
            return options;
        }
        return options.filter(
            (option: any) =>
                option?.label.toLowerCase().indexOf(searchValue.toLowerCase()) >= 0
        );
    };

    return (
        <>
            <div className='dropdown-container'>
                <label className='ab_label_text'>{label}</label>
                <div className={`drop_second-div ${(showMenu || selectedValue) ? "active" : ""}`}
                    ref={inputRef}
                    onClick={(e) => disabled ? null : handleInputClick(e)}
                >
                    <div className="dropdown-selected-value" dangerouslySetInnerHTML={{__html: getDisplay()}}></div>
                    <div className="iconsvg">
                        {
                            showMenu ? (
                                <i className="fa-solid fa-chevron-up"></i>
                            ) :
                                (
                                    <i className="fa-solid fa-chevron-down"></i>
                                )
                        }

                    </div>
                </div>

                {showMenu &&
                    <div className='dropdown-menu' ref={menuRef} style={{
                        position: 'absolute',
                        top: dropUp ? 'auto' : '100%',
                        bottom: dropUp ? '60%' : 'auto',
                    }}>
                        {getOptions().map((option: any) => (
                            <div className='dropdown-item' onClick={() => onItemClick(option)} key={option.value} dangerouslySetInnerHTML={{__html: option?.label}} >
                            </div>
                        ))}
                    </div>
                }
            </div>
        </>
    )
}

export default Dropdown