import { IconType } from "react-icons";

interface AuthSocialButtonProps {
  icon: IconType;
  onClick: () => void;
}

const AuthSocialButton: React.FC<AuthSocialButtonProps> = ({
  icon: Icon,
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
            inline-flex
            justify-center
            w-full
            rounded-md
            bg-white
            px-4
            ring-1
            ring-inset
            ring-gray-300
            hover:bg-gray-50
            focus:outline-offset-0
            text-gray-500
            shadow-sm
            py-2
            "
    >
      <Icon />
    </button>
  );
};

export default AuthSocialButton;
