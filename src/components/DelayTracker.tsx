import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Clock, Zap, Activity, AlertCircle } from "lucide-react";

interface DelayData {
  id: string;
  operation: string;
  duration: number;
  timestamp: Date;
  status: "completed" | "running" | "failed";
}

export function DelayTracker() {
  const [delays, setDelays] = useState<DelayData[]>([]);
  const [isTracking, setIsTracking] = useState(false);
  const [currentOperation, setCurrentOperation] = useState<string | null>(null);

  // Simulate tracking delays
  const operations = [
    "Database Query",
    "API Request", 
    "File Upload",
    "Data Processing",
    "Authentication",
    "Cache Update"
  ];

  const simulateDelay = async () => {
    const operation = operations[Math.floor(Math.random() * operations.length)];
    const startTime = Date.now();
    
    setCurrentOperation(operation);
    setIsTracking(true);

    // Simulate random delay between 100ms to 3000ms
    const delayTime = Math.random() * 2900 + 100;
    
    await new Promise(resolve => setTimeout(resolve, delayTime));
    
    const endTime = Date.now();
    const duration = endTime - startTime;
    
    const newDelay: DelayData = {
      id: Math.random().toString(36).substr(2, 9),
      operation,
      duration,
      timestamp: new Date(),
      status: duration > 2000 ? "failed" : "completed"
    };

    setDelays(prev => [newDelay, ...prev.slice(0, 9)]);
    setIsTracking(false);
    setCurrentOperation(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-performance-excellent text-performance-excellent";
      case "failed": return "bg-performance-poor text-performance-poor";
      default: return "bg-performance-warning text-performance-warning";
    }
  };

  const getDurationColor = (duration: number) => {
    if (duration < 500) return "text-performance-excellent";
    if (duration < 1000) return "text-performance-good";
    if (duration < 2000) return "text-performance-warning";
    return "text-performance-poor";
  };

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary" />
          Real-time Delay Tracker
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Button 
            onClick={simulateDelay} 
            disabled={isTracking}
            className="bg-gradient-primary hover:opacity-90"
          >
            {isTracking ? (
              <>
                <Activity className="h-4 w-4 mr-2 animate-spin" />
                Tracking...
              </>
            ) : (
              <>
                <Zap className="h-4 w-4 mr-2" />
                Simulate Operation
              </>
            )}
          </Button>
        </div>

        {isTracking && currentOperation && (
          <div className="space-y-2 p-4 bg-muted/20 rounded-lg border animate-scale-in">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Tracking: {currentOperation}</span>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 bg-primary rounded-full animate-pulse" />
                <span className="text-xs text-muted-foreground">Running</span>
              </div>
            </div>
            <Progress value={undefined} className="h-2" />
          </div>
        )}

        <div className="space-y-2">
          <h4 className="text-sm font-medium text-muted-foreground">Recent Operations</h4>
          {delays.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <AlertCircle className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No operations tracked yet</p>
            </div>
          ) : (
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {delays.map((delay) => (
                <div 
                  key={delay.id} 
                  className="flex items-center justify-between p-3 bg-card/50 rounded-lg border animate-fade-in"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{delay.operation}</span>
                      <Badge 
                        variant="outline" 
                        className={getStatusColor(delay.status)}
                      >
                        {delay.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {delay.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-bold ${getDurationColor(delay.duration)}`}>
                      {delay.duration}ms
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}