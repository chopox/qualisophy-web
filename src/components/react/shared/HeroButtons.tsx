import React from 'react';
import { useTranslations } from '@/hooks/useTranslations';
import { Button } from '@/components/react/shared/Button';

export const HeroButtons = () => {
  const  t  = useTranslations(); 

  return (
    <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
      <a href="/learning">
        <Button variant="primary" size="sm">
          {t("button.viewCourses")}
        </Button>
      </a>
      <a href="/partnership">
        <Button variant="primary" size="sm">
          {t("button.collaborate")}
        </Button>
      </a>
    </div>
  );
};