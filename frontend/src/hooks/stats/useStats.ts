import { useEffect, useState } from "react";
import { fetchStats } from "../../services/statsService";

export const useStats = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats()
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  return { data, loading };
};
