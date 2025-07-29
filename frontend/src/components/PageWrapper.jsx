// components/PageWrapper.jsx
import { useEffect, useState } from "react";
import PageLoader from "./PageLoader";

export default function PageWrapper({ children }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 700); // المدة 0.7 ثانية
    return () => clearTimeout(timer);
  }, []);

  return loading ? <PageLoader /> : <>{children}</>;
}
