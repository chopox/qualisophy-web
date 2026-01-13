import React from "react";
import { Button } from "@/components/react/shared/Button";

// Define the props that this card will accept
interface ContentCardProps {
  title: string;
  description: string;
  imageUrl: string;
  buttonText: string;
  buttonHref: string;
}

export const ContentCard: React.FC<ContentCardProps> = ({
  title,
  description,
  imageUrl,
  buttonText,
  buttonHref,
}) => {
  return (
    <div className="group flex flex-col h-[460px] bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden">
      <div className="h-48 overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      {/* 2. The 'flex-grow' on this div will make it occupy the rest of the 460px */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="font-heading text-xl font-semibold text-secondary-DEFAULT">
          {title}
        </h3>

        {/* 3. The 'flex-grow' on the paragraph will make it stretch and push the button down */}
        <p className="font-body text-base text-neutral-700 mt-2 flex-grow">
          {description}
        </p>

        <a href={buttonHref} className="block mt-6">
          <Button variant="primary" size="sm" fullWidth>
            {buttonText}
          </Button>
        </a>
      </div>
    </div>
  );
};
