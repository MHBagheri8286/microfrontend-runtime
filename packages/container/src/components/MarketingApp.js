import { mount } from 'marketing/MarketingApp';
import React, { useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default () => {
  const ref = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const onParentNavigateRef = useRef(null);

  useEffect(() => {
    const { onParentNavigate } = mount(ref.current, {
      initialPath: location.pathname,
      onNavigate: ({ pathname: nextPathname }) => {
        navigate(nextPathname);
      },
    });

    onParentNavigateRef.current = onParentNavigate;
  }, []);

  useEffect(() => {
    if (onParentNavigateRef.current) {
      onParentNavigateRef.current({ pathname: location.pathname });
    }
  }, [location]);

  return <div ref={ref} />;
};