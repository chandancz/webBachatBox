import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BarChart3, LineChart, PieChart, TrendingUp } from "lucide-react";

interface ChartData {
  time: string;
  response: number;
  memory: number;
  cpu: number;
}

export function InteractiveChart() {
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [chartType, setChartType] = useState<'bar' | 'line' | 'pie'>('line');
  const [isLive, setIsLive] = useState(false);

  // Generate initial data
  useEffect(() => {
    const generateData = () => {
      const data: ChartData[] = [];
      for (let i = 0; i < 10; i++) {
        data.push({
          time: new Date(Date.now() - (9 - i) * 60000).toLocaleTimeString('en-US', { 
            hour12: false, 
            hour: '2-digit', 
            minute: '2-digit' 
          }),
          response: Math.floor(Math.random() * 500 + 200),
          memory: Math.floor(Math.random() * 80 + 20),
          cpu: Math.floor(Math.random() * 60 + 10)
        });
      }
      setChartData(data);
    };

    generateData();
  }, []);

  // Live data updates
  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      setChartData(prev => {
        const newData = [...prev.slice(1)];
        newData.push({
          time: new Date().toLocaleTimeString('en-US', { 
            hour12: false, 
            hour: '2-digit', 
            minute: '2-digit' 
          }),
          response: Math.floor(Math.random() * 500 + 200),
          memory: Math.floor(Math.random() * 80 + 20),
          cpu: Math.floor(Math.random() * 60 + 10)
        });
        return newData;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [isLive]);

  const getMaxValue = (key: keyof ChartData) => {
    if (key === 'time') return 0;
    return Math.max(...chartData.map(d => d[key] as number));
  };

  const renderBarChart = () => (
    <div className="space-y-4">
      {['response', 'memory', 'cpu'].map((metric) => {
        const latestValue = chartData[chartData.length - 1]?.[metric as keyof ChartData] as number || 0;
        const maxValue = getMaxValue(metric as keyof ChartData);
        
        return (
          <div key={metric} className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="capitalize font-medium">{metric} {metric === 'response' ? '(ms)' : '(%)'}</span>
              <span className="font-bold text-primary">{latestValue}</span>
            </div>
            <div className="h-4 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-primary transition-all duration-500 ease-out"
                style={{ width: `${(latestValue / maxValue) * 100}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );

  const renderLineChart = () => (
    <div className="h-48 relative">
      <svg width="100%" height="100%" className="overflow-visible">
        {['response', 'memory', 'cpu'].map((metric, metricIndex) => {
          const color = ['hsl(var(--performance-excellent))', 'hsl(var(--performance-good))', 'hsl(var(--performance-warning))'][metricIndex];
          const maxValue = getMaxValue(metric as keyof ChartData);
          
          const points = chartData.map((data, index) => {
            const x = (index / (chartData.length - 1)) * 100;
            const y = 100 - ((data[metric as keyof ChartData] as number / maxValue) * 80);
            return `${x},${y}`;
          }).join(' ');

          return (
            <g key={metric}>
              <polyline
                points={points}
                fill="none"
                stroke={color}
                strokeWidth="2"
                className="animate-fade-in"
                style={{ 
                  vectorEffect: 'non-scaling-stroke',
                  filter: 'drop-shadow(0 0 8px currentColor)',
                  opacity: 0.8
                }}
              />
              {chartData.map((data, index) => (
                <circle
                  key={index}
                  cx={`${(index / (chartData.length - 1)) * 100}%`}
                  cy={`${100 - ((data[metric as keyof ChartData] as number / maxValue) * 80)}%`}
                  r="3"
                  fill={color}
                  className="animate-scale-in hover:scale-150 transition-transform"
                />
              ))}
            </g>
          );
        })}
      </svg>
    </div>
  );

  const chartIcons = {
    bar: BarChart3,
    line: LineChart,
    pie: PieChart
  };

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Performance Analytics
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge 
              variant={isLive ? "default" : "outline"}
              className={isLive ? "bg-performance-excellent animate-pulse-glow" : ""}
            >
              {isLive ? "Live" : "Static"}
            </Badge>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsLive(!isLive)}
            >
              {isLive ? "Stop" : "Start"} Live
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          {Object.entries(chartIcons).map(([type, Icon]) => (
            <Button
              key={type}
              variant={chartType === type ? "default" : "outline"}
              size="sm"
              onClick={() => setChartType(type as 'bar' | 'line' | 'pie')}
              className="flex items-center gap-2"
            >
              <Icon className="h-4 w-4" />
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </Button>
          ))}
        </div>

        <div className="min-h-[200px]">
          {chartType === 'bar' && renderBarChart()}
          {chartType === 'line' && renderLineChart()}
          {chartType === 'pie' && (
            <div className="flex items-center justify-center h-48 text-muted-foreground">
              <div className="text-center animate-float">
                <PieChart className="h-12 w-12 mx-auto mb-2" />
                <p>Pie chart visualization coming soon</p>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-3 gap-4 pt-4 border-t">
          {['Response Time', 'Memory Usage', 'CPU Usage'].map((label, index) => {
            const metric = ['response', 'memory', 'cpu'][index];
            const latestValue = chartData[chartData.length - 1]?.[metric as keyof ChartData] as number || 0;
            const color = ['text-performance-excellent', 'text-performance-good', 'text-performance-warning'][index];
            
            return (
              <div key={label} className="text-center">
                <p className="text-xs text-muted-foreground">{label}</p>
                <p className={`text-lg font-bold ${color}`}>
                  {latestValue}{metric === 'response' ? 'ms' : '%'}
                </p>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}