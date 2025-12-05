import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { apiService } from '@/services/apiService';

const HealthCheck = () => {
  const [isHealthy, setIsHealthy] = useState<boolean | null>(null);

  useEffect(() => {
    const checkHealth = async () => {
      const healthy = await apiService.getHealthCheck();
      setIsHealthy(healthy);
    };

    checkHealth();
    const interval = setInterval(checkHealth, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, []);

  if (isHealthy === null) {
    return (
      <Badge variant="outline" className="animate-pulse">
        Checking...
      </Badge>
    );
  }

  return (
    <Badge variant={isHealthy ? "default" : "destructive"}>
      Backend: {isHealthy ? "Online" : "Offline"}
    </Badge>
  );
};

export default HealthCheck;