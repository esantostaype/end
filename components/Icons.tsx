import { FC } from 'react';

interface Props {
    fill?: string;
    height: number;
    width: number;
}

export const Logo:FC<Props> = ({ height, width, fill='#000' }) => (
    <svg
        aria-hidden="true"
        focusable="false"
        height={ height }
        role="presentation"
        viewBox="0 0 123 45"
        width={ width }
        fill={ fill }
    >
	    <path d="M0 0v44.83h24.167v-7.575H8.595V25.458h11.398v-7.576H8.595V7.575h14.948V0zM57.488 0v26.575h-.124L45.405 0H36v44.83h7.848V15.896h.123l13.143 28.936h8.222V0zM80 0h11.958c9.842 0 15.323 4.222 15.696 15.523v13.784c-.373 11.3-5.854 15.523-15.696 15.523H80V0zm8.595 37.255h2.99c4.734 0 7.474-2.235 7.474-8.94V16.516c0-6.334-2.118-8.942-7.474-8.942h-2.99v29.68zM114 44.817h8.844V36H114z"></path>
    </svg>
);

export const MinusIcon:FC<Props> = ({ height, width, fill='#000' }) => (
    <svg
        aria-hidden="true"
        focusable="false"
        height={ height }
        role="presentation"
        viewBox="0 0 8 8"
        width={ width }
        fill={ fill }
    >
	    <rect y="3.5" width="8" height="1"/>
    </svg>
);

export const PlusIcon:FC<Props> = ({ height, width, fill='#000' }) => (
    <svg
        aria-hidden="true"
        focusable="false"
        height={ height }
        role="presentation"
        viewBox="0 0 8 8"
        width={ width }
        fill={ fill }
    >
	    <polygon points="8,3.5 4.5,3.5 4.5,0 3.5,0 3.5,3.5 0,3.5 0,4.5 3.5,4.5 3.5,8 4.5,8 4.5,4.5 8,4.5"/>
    </svg>
);

export const SearchIcon:FC<Props> = ({ height, width, fill='#000' }) => (
    <svg
        aria-hidden="true"
        focusable="false"
        height={ height }
        role="presentation"
        viewBox="0 0 32 32"
        width={ width }
        fill={ fill }
    >
	    <path d="M31.5,28.8l-7.3-7.3c1.7-2.3,2.7-5.2,2.7-8.1C26.9,6,20.9,0,13.5,0S0,6,0,13.5s6,13.5,13.5,13.5c2.9,0,5.7-0.9,8.1-2.7 l7.3,7.3c0.8,0.7,2,0.6,2.7-0.2C32.2,30.6,32.2,29.5,31.5,28.8L31.5,28.8z M3.8,13.5c0-5.3,4.3-9.6,9.6-9.6s9.6,4.3,9.6,9.6 s-4.3,9.6-9.6,9.6C8.2,23.1,3.9,18.8,3.8,13.5z"/>
    </svg>
);

export const CartIcon:FC<Props> = ({ height, width, fill='#000' }) => (
    <svg
        aria-hidden="true"
        focusable="false"
        height={ height }
        role="presentation"
        viewBox="0 0 32 32"
        width={ width }
        fill={ fill }
    >
	    <circle cx="12" cy="28.7" r="2.7"/>
	    <circle cx="26.7" cy="28.7" r="2.7"/>
	    <path d="M31.7,7.8c-0.3-0.3-0.6-0.5-1-0.5H9.1L8,1.7C7.8,1.1,7.3,0.7,6.7,0.7H1.3C0.6,0.7,0,1.3,0,2s0.6,1.3,1.3,1.3h4.2l1.1,5.5 c0,0,0,0.1,0,0.1l2.2,11.1c0.4,1.9,2,3.2,3.9,3.2c0,0,0.1,0,0.1,0h12.9c1.9,0,3.6-1.3,4-3.2L32,8.9C32.1,8.5,31.9,8.1,31.7,7.8z M27.2,19.6c-0.1,0.6-0.7,1.1-1.4,1.1h-13c-0.7,0-1.2-0.4-1.3-1.1L9.6,10h19.4L27.2,19.6z"/>
    </svg>
);

export const BagIcon:FC<Props> = ({ height, width, fill='#000' }) => (
    <svg
        aria-hidden="true"
        focusable="false"
        height={ height }
        role="presentation"
        viewBox="0 0 32 32"
        width={ width }
        fill={ fill }
    >
	    <path d="M3.6,32c-0.7-0.3-0.9-0.9-0.8-1.6c0.3-3.6,0.7-7.2,1-10.8c0.3-3.5,0.6-6.9,0.9-10.4C4.8,8.3,5.2,7.9,6,7.9 c1.3,0,2.5,0,3.9,0c0-0.2,0-0.3,0-0.4c0-1,0-2,0.2-3c0.8-3,3.9-4.9,6.9-4.4C19.9,0.6,22,3,22.1,6c0,0.6,0,1.3,0,2c0.2,0,0.3,0,0.4,0 c1.2,0,2.3,0,3.5,0c0.8,0,1.2,0.4,1.3,1.2c0.1,1.5,0.3,2.9,0.4,4.4c0.2,2.2,0.4,4.5,0.6,6.7c0.2,2,0.4,3.9,0.5,5.9 c0.1,1.4,0.2,2.9,0.4,4.3c0.1,0.8-0.1,1.3-0.8,1.6C20.1,32,11.9,32,3.6,32z M9.9,10.2c-0.9,0-1.8,0-2.6,0c-0.3,0-0.3,0.1-0.4,0.4 c-0.1,1.5-0.3,3-0.4,4.5c-0.2,2.2-0.4,4.5-0.6,6.7c-0.2,2-0.4,4-0.5,5.9c-0.1,0.6-0.1,1.3-0.2,2c7.2,0,14.4,0,21.7,0 c-0.1-0.8-0.1-1.5-0.2-2.3c-0.2-2-0.3-3.9-0.5-5.9c-0.2-2.2-0.4-4.4-0.6-6.6c-0.1-1.5-0.3-2.9-0.4-4.4c0-0.2-0.1-0.3-0.3-0.3 c-0.3,0-0.6,0-1,0c-0.6,0-1.1,0-1.7,0c0,0.1,0,0.2,0,0.3c0,0.6,0,1.1,0,1.7c0,0.7-0.5,1.2-1.1,1.2c-0.6,0-1.1-0.5-1.1-1.1 c0-0.4,0-0.9,0-1.3c0-0.2,0-0.5,0-0.7c-2.6,0-5.1,0-7.6,0c0,0.7,0,1.3,0,2c0,0.6-0.3,1-0.8,1.2c-0.8,0.2-1.5-0.3-1.5-1.1 C9.9,11.6,9.9,10.9,9.9,10.2z M19.8,7.9c0-0.7,0-1.3,0-1.9c0-1.7-1.2-3.1-2.8-3.6c-1.7-0.4-3.4,0.2-4.3,1.6 c-0.8,1.2-0.5,2.5-0.6,3.8C14.7,7.9,17.2,7.9,19.8,7.9z"/>
    </svg>
);

export const UserIcon:FC<Props> = ({ height, width, fill='#000' }) => (
    <svg
        aria-hidden="true"
        focusable="false"
        height={ height }
        role="presentation"
        viewBox="0 0 32 32"
        width={ width }
        fill={ fill }
    >
	    <path d="M30.4,23.9c-0.2-2.1-0.7-3.7-1.6-5.2c-1.1-1.9-2.8-3-5.1-3.3c-0.6-0.1-1.6-0.1-2.5,0.5c-0.3,0.2-0.6,0.4-0.9,0.6l-0.2,0.1 c-2.8,1.5-5.5,1.5-8.3,0c-0.2-0.1-0.4-0.2-0.5-0.3c-0.3-0.2-0.6-0.4-1-0.5c-0.3-0.2-0.7-0.3-1.1-0.3c-1.1,0-2.2,0.2-3.2,0.7 c-1.5,0.7-2.5,1.9-3.3,3.6c-0.9,2.1-1.3,4.4-1.2,7.1c0.1,2.4,1.7,4.2,4.3,4.9c0.3,0.1,0.6,0.1,0.8,0.2L7,32L25,32l0.1,0 c0,0,0.1,0,0.1,0c3.1-0.3,5.3-2.4,5.3-5.3C30.6,25.7,30.5,24.8,30.4,23.9z M18.6,29.6l-2.9,0l-7.9,0c0,0,0,0,0,0 c-0.9,0-1.7-0.1-2.3-0.5c-1-0.5-1.5-1.3-1.5-2.4c-0.1-2.4,0.2-4.3,1-6c0.3-0.8,0.8-1.4,1.4-2c0.7-0.6,1.5-0.9,2.6-1 c0,0,0.1,0.1,0.2,0.1c0.3,0.1,0.5,0.3,0.7,0.4c0.5,0.3,1,0.6,1.5,0.8c3.4,1.5,6.8,1.3,10.1-0.5l0.2-0.1c0.2-0.1,0.5-0.3,0.7-0.5 c0.3-0.2,0.6-0.3,1.1-0.2c1.3,0.2,2.3,0.9,3,2.1c0.6,1.1,1,2.3,1.2,4c0.1,0.7,0.1,1.5,0.1,2.4c0,2-1.3,3.2-3.5,3.2 C22.5,29.6,20.6,29.6,18.6,29.6z M15.8,15.5c0.2,0,0.4,0,0.5,0c2.5-0.2,4.6-1.4,6.1-3.6c1-1.5,1.4-3.3,1.1-5.4c-0.4-2.9-2.8-5.7-5.7-6.3 c-0.3-0.1-0.6-0.1-0.8-0.2L16.5,0l-1.5,0l-0.3,0c-0.2,0-0.4,0.1-0.6,0.1c-1.7,0.3-3.1,1.2-4.3,2.6C8,4.9,7.5,8.4,8.7,11 C10,13.8,12.8,15.5,15.8,15.5z M10.4,7.7c0.1-3,2.4-5.3,5.3-5.3c0,0,0.1,0,0.1,0c3,0.1,5.3,2.5,5.3,5.4v0c0,1.4-0.6,2.7-1.6,3.7 c-1,1-2.4,1.6-3.8,1.6c0,0,0,0,0,0c-1.4,0-2.8-0.6-3.8-1.7C10.9,10.5,10.4,9.1,10.4,7.7z"/>
    </svg>
);

export const ErrorIcon:FC<Props> = ({ height, width, fill='#000' }) => (
    <svg
        aria-hidden="true"
        focusable="false"
        height={ height }
        role="presentation"
        viewBox="0 0 24 24"
        width={ width }
        fill={ fill }
    >
	    <path d="M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
    </svg>
);

export const WarningIcon:FC<Props> = ({ height, width, fill='#000' }) => (
    <svg
        aria-hidden="true"
        focusable="false"
        height={ height }
        role="presentation"
        viewBox="0 0 24 24"
        width={ width }
        fill={ fill }
    >
	    <path d="M12 5.99L19.53 19H4.47L12 5.99M12 2L1 21h22L12 2zm1 14h-2v2h2v-2zm0-6h-2v4h2v-4z"/>
    </svg>
);

export const InfoIcon:FC<Props> = ({ height, width, fill='#000' }) => (
    <svg
        aria-hidden="true"
        focusable="false"
        height={ height }
        role="presentation"
        viewBox="0 0 24 24"
        width={ width }
        fill={ fill }
    >
	    <path d="M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20, 12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10, 10 0 0,0 12,2M11,17H13V11H11V17Z"/>
    </svg>
);

export const SuccessIcon:FC<Props> = ({ height, width, fill='#000' }) => (
    <svg
        aria-hidden="true"
        focusable="false"
        height={ height }
        role="presentation"
        viewBox="0 0 24 24"
        width={ width }
        fill={ fill }
    >
	    <path d="M20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4C12.76,4 13.5,4.11 14.2, 4.31L15.77,2.74C14.61,2.26 13.34,2 12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0, 0 22,12M7.91,10.08L6.5,11.5L11,16L21,6L19.59,4.58L11,13.17L7.91,10.08Z"/>
    </svg>
);

export const LoginIcon:FC<Props> = ({ height, width, fill='#000' }) => (
    <svg
        aria-hidden="true"
        focusable="false"
        height={ height }
        role="presentation"
        viewBox="0 0 24 24"
        width={ width }
        fill={ fill }
    >
	    <path d="M11 7 9.6 8.4l2.6 2.6H2v2h10.2l-2.6 2.6L11 17l5-5-5-5zm9 12h-8v2h8c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-8v2h8v14z"/>
    </svg>
);

export const InventoryIcon:FC<Props> = ({ height, width, fill='#000' }) => (
    <svg
        aria-hidden="true"
        focusable="false"
        height={ height }
        role="presentation"
        viewBox="0 0 24 24"
        width={ width }
        fill={ fill }
    >
	    <path d="M20 2H4c-1 0-2 .9-2 2v3.01c0 .72.43 1.34 1 1.69V20c0 1.1 1.1 2 2 2h14c.9 0 2-.9 2-2V8.7c.57-.35 1-.97 1-1.69V4c0-1.1-1-2-2-2zm-1 18H5V9h14v11zm1-13H4V4h16v3z"/>
    </svg>
);

export const RegisterIcon:FC<Props> = ({ height, width, fill='#000' }) => (
    <svg
        aria-hidden="true"
        focusable="false"
        height={ height }
        role="presentation"
        viewBox="0 0 24 24"
        width={ width }
        fill={ fill }
    >
	    <path d="M11 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0-6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zM5 18c.2-.63 2.57-1.68 4.96-1.94l2.04-2c-.39-.04-.68-.06-1-.06-2.67 0-8 1.34-8 4v2h9l-2-2H5zm15.6-5.5-5.13 5.17-2.07-2.08L12 17l3.47 3.5L22 13.91z"/>
    </svg>
);

export const OrdersIcon:FC<Props> = ({ height, width, fill='#000' }) => (
    <svg
        aria-hidden="true"
        focusable="false"
        height={ height }
        role="presentation"
        viewBox="0 0 24 24"
        width={ width }
        fill={ fill }
    >
	    <path d="M18 6h-2c0-2.21-1.79-4-4-4S8 3.79 8 6H6c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-6-2c1.1 0 2 .9 2 2h-4c0-1.1.9-2 2-2zm6 16H6V8h2v2c0 .55.45 1 1 1s1-.45 1-1V8h4v2c0 .55.45 1 1 1s1-.45 1-1V8h2v12z"/>
    </svg>
);

export const LogoutIcon:FC<Props> = ({ height, width, fill='#000' }) => (
    <svg
        aria-hidden="true"
        focusable="false"
        height={ height }
        role="presentation"
        viewBox="0 0 24 24"
        width={ width }
        fill={ fill }
    >
	    <path d="m17 8-1.41 1.41L17.17 11H9v2h8.17l-1.58 1.58L17 16l4-4-4-4zM5 5h7V3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h7v-2H5V5z"/>
    </svg>
);

export const DeleteIcon:FC<Props> = ({ height, width, fill='#000' }) => (
    <svg
        aria-hidden="true"
        focusable="false"
        height={ height }
        role="presentation"
        viewBox="0 0 24 24"
        width={ width }
        fill={ fill }
    >
	    <path d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z"/>
    </svg>
);