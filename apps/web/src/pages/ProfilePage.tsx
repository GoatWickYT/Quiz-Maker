import apiClient, { BACKEND_URL, token } from '../api/apiClient';
import '../index.css';
import './ProfilePage.css';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import type { User } from '../types/User';
import AvatarPicker from '../components/AvatarPicker'; // your picker
import { toast } from 'react-toastify';
import PasswordInput from '../components/PasswordInput';

const ProfilePage = () => {
    const user: User = JSON.parse(localStorage.getItem('user')!);
    const { t } = useTranslation();

    const [isEditing, setIsEditing] = useState(false);
    const [username, setUsername] = useState(user.username);
    const [avatar, setAvatar] = useState(user.avatar);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();

        console.log(user.username);

        if (user.username !== username)
            apiClient
                .patch(
                    `users/${user.id}/name`,
                    { username },
                    { headers: { Authorization: `Bearer ${token}` } },
                )
                .then(() => toast.success(`${t('toast-suc-upd-username')}`))
                .catch(() => toast.error(`${t('toast-err-upd-username')}`));

        if (user.avatar !== avatar)
            apiClient
                .patch(
                    `users/${user.id}/avatar`,
                    { avatar },
                    { headers: { Authorization: `Bearer ${token}` } },
                )
                .then(() => toast.success(`${t('toast-suc-upd-avatar')}`))
                .catch((resp) => {
                    console.log(resp);
                    toast.error(`${t('toast-err-upd-avatar')}`);
                });

        if (confirmPassword !== '' && newPassword !== '') {
            if (confirmPassword !== newPassword)
                return toast.error(`${t('toast-err-upd-psw-match')}`);
            else
                apiClient
                    .patch(
                        `users/${user.id}/password`,
                        { password: newPassword },
                        { headers: { Authorization: `Bearer ${token}` } },
                    )
                    .then(() => toast.success(`${t('toast-suc-upd-psw')}`))
                    .catch(() => toast.error(`${t('toast-err-upd-psw')}`));
        }

        localStorage.setItem(
            'user',
            JSON.stringify({
                id: user.id,
                username: username,
                avatar: avatar,
            }),
        );

        setIsEditing(false);
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
    };

    const handleCancel = () => {
        setIsEditing(false);
        setUsername(user.username);
        setAvatar(user.avatar);
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
    };

    return (
        <main>
            <div className="profile-container">
                <div className="profile-container-inner">
                    <div className="profile-card">
                        <h2>{t('prf-file')}</h2>

                        {!isEditing ? (
                            <div className="profile-description">
                                {/* Username */}
                                <div className="profile-field-row">
                                    <span className="profile-field-name">{t('prf-name')}:</span>
                                    <span className="profile-field-value">
                                        {username.charAt(0).toUpperCase() + username.slice(1)}
                                    </span>
                                </div>

                                {/* Codename */}
                                <div className="profile-field-row">
                                    <span className="profile-field-name">{t('prf-codename')}:</span>
                                    <span className="profile-field-value">
                                        {username.charAt(0).toUpperCase()}
                                    </span>
                                </div>

                                {/* Number */}
                                <div className="profile-field-row">
                                    <span className="profile-field-name">{t('prf-number')}:</span>
                                    <span className="profile-field-value">
                                        A-
                                        {Math.floor(Math.random() * 10000)
                                            .toString()
                                            .padStart(4, '0')}
                                    </span>
                                </div>

                                {/* Password */}
                                <div className="profile-field-row">
                                    <span className="profile-field-name">{t('prf-password')}:</span>
                                    <span className="profile-field-value">
                                        <button onClick={() => setIsEditing(true)}>
                                            {t('prf-change')}
                                        </button>
                                    </span>
                                </div>
                            </div>
                        ) : (
                            <form className="profile-description" onSubmit={handleSave}>
                                {/* Username */}
                                <div className="profile-field-row">
                                    <span className="profile-field-name">{t('prf-name')}:</span>
                                    <input
                                        type="text"
                                        value={username}
                                        placeholder={user.username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="profile-field-input"
                                        required
                                    />
                                </div>

                                {/* Avatar */}
                                <div className="profile-field-row">
                                    <span className="profile-field-name">{t('prf-avatar')}:</span>
                                    <AvatarPicker
                                        value={`${BACKEND_URL.replace(
                                            '/api',
                                            '',
                                        )}/assets/${avatar}`}
                                        onChange={setAvatar}
                                    />
                                </div>

                                {/* Password change */}
                                <div className="profile-field-row">
                                    <span className="profile-field-name">{t('prf-password')}:</span>
                                    <div className="profile-password-fields">
                                        <PasswordInput
                                            placeholder={t('prf-old-password')}
                                            password={oldPassword}
                                            setPassword={setOldPassword}
                                        />
                                        <PasswordInput
                                            placeholder={t('prf-new-password')}
                                            password={newPassword}
                                            setPassword={setNewPassword}
                                        />
                                        <PasswordInput
                                            placeholder={t('prf-confirm-password')}
                                            password={confirmPassword}
                                            setPassword={setConfirmPassword}
                                        />
                                    </div>
                                </div>

                                {/* Save / Cancel buttons */}
                                <div className="profile-form-buttons">
                                    <button type="submit">{t('prf-save')}</button>
                                    <button type="button" onClick={handleCancel}>
                                        {t('prf-cancel')}
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>

                    {/* Avatar preview */}
                    <div className="profile-notes">
                        <img
                            className="profile-notes-image"
                            src={`${BACKEND_URL.replace('/api', '')}/avatars/${avatar}`}
                            alt="avatar"
                        />
                    </div>
                </div>
            </div>
        </main>
    );
};

export default ProfilePage;
