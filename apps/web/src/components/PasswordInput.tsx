import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react'; // or any icon library
import './PasswordInput.css';

const PasswordInput = ({
    password,
    setPassword,
    placeholder,
    required = false,
}: {
    password: string;
    setPassword: (value: string) => void;
    placeholder: string;
    required?: boolean;
}) => {
    const [show, setShow] = useState(false);

    return (
        <div className="password-field">
            <input
                type={show ? 'text' : 'password'}
                placeholder={placeholder}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required={required}
            />

            <button type="button" className="toggle" onClick={() => setShow((prev) => !prev)}>
                {show ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
        </div>
    );
};

export default PasswordInput;
