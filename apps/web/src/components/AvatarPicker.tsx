import React, { useState } from 'react';
import './AvatarPicker.css';
import { BACKEND_URL } from '../api/apiClient';

interface AvatarPickerProps {
    value?: string;
    onChange: (value: string) => void;
}

// List of avatars
const avatarOptions = [
    { value: 'aussieAvatar.svg', label: 'Aussie Agent', image: 'aussieAvatar.svg' },
    { value: 'basicAvatar.svg', label: 'Agent Basic', image: 'basicAvatar.svg' },
    { value: 'yellowAvatar.svg', label: 'Agent Yellow', image: 'yellowAvatar.svg' },

    { value: 'blackAvatar.svg', label: 'Agent Black', image: 'blackAvatar.svg' },
    { value: 'grayAvatar.svg', label: 'Agent Gray', image: 'grayAvatar.svg' },
    { value: 'whiteAvatar.svg', label: 'Agent White', image: 'whiteAvatar.svg' },

    { value: 'purpleAvatar.svg', label: 'Agent Purple', image: 'purpleAvatar.svg' },
    { value: 'pinkAvatar.svg', label: 'Agent Pink', image: 'pinkAvatar.svg' },
    { value: 'redAvatar.svg', label: 'Agent Red', image: 'redAvatar.svg' },

    { value: 'blueAvatar.svg', label: 'Agent Blue', image: 'blueAvatar.svg' },
    { value: 'cyanAvatar.svg', label: 'Agent Cyan', image: 'cyanAvatar.svg' },
    { value: 'greenAvatar.svg', label: 'Agent Green', image: 'greenAvatar.svg' },
];

const AvatarPicker: React.FC<AvatarPickerProps> = ({ value, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);

    const selectedAvatar = avatarOptions.find((opt) => opt.value === value);

    return (
        <div className="avatar-picker-container">
            <div
                className="avatar-square"
                onClick={() => setIsOpen(true)}
                title="Click to select avatar"
            >
                {selectedAvatar ? (
                    <img
                        src={`${BACKEND_URL.replace('/api', '')}/avatars/${selectedAvatar.image}`}
                        alt={selectedAvatar.label}
                        className="avatar-image"
                    />
                ) : (
                    <div className="avatar-placeholder">
                        {!localStorage.getItem('user') ? (
                            <>?</>
                        ) : (
                            <img
                                width={'100%'}
                                src={`${BACKEND_URL.replace('/api', '')}/avatars/${
                                    JSON.parse(localStorage.getItem('user')!, (key, value) => {
                                        if (key === '') {
                                            return {
                                                avatar: value.avatar ?? 'basicAvatar.svg',
                                            };
                                        }
                                        return value;
                                    }).avatar
                                }`}
                            />
                        )}
                    </div>
                )}
            </div>

            {isOpen && (
                <div className="avatar-overlay" onClick={() => setIsOpen(false)}>
                    <div className="avatar-grid" onClick={(e) => e.stopPropagation()}>
                        {avatarOptions.map((avatar) => (
                            <div
                                key={avatar.value}
                                className={`avatar-option ${
                                    avatar.value === value ? 'selected' : ''
                                }`}
                                onClick={() => {
                                    onChange(avatar.value);
                                    setIsOpen(false);
                                }}
                            >
                                <img
                                    src={`${BACKEND_URL.replace('/api', '')}/avatars/${
                                        avatar.image
                                    }`}
                                    alt={avatar.label}
                                    className="avatar-image"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AvatarPicker;
