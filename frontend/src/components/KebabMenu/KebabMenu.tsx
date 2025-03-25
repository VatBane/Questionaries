import React from "react";

const KebabMenu = () => {
    const [isOpen, setIsOpen] = React.useState(false);

    const onClick = () => {
        setIsOpen(!isOpen);
    }

    return (
        <div className="kebab" onClick={onClick}>
            <ul className="dropdown">
                <li>Edit</li>
                <li>Delete</li>
            </ul>
        </div>
    )
}

export default KebabMenu;