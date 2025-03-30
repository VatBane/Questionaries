import React from "react";
import "./KebabMenu.css"; // Import styles


interface KebabMenuProps {
    onDelete: () => void;
}


const KebabMenu: React.FC<KebabMenuProps> = ({onDelete}) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const menuRef = React.useRef<HTMLDivElement>(null);

    // Toggle menu visibility
    const toggleMenu = () => setIsOpen((prev) => !prev);

    // Close menu when clicking outside
    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="kebab-menu" ref={menuRef}>
            {/* Kebab Icon Button */}
            <button onClick={toggleMenu} className="kebab-button">
                ⋮
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="menu-dropdown">
                    <button className="menu-item">Edit</button>
                    <button className="menu-item" onClick={onDelete}>Delete</button>
                </div>
            )}
        </div>
    );
};

export default KebabMenu;
