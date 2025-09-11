import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Area,
  AreaChart,
} from "recharts";
import {
  TrendingUp,
  Users,
  FileText,
  Clock,
  Download,
  Filter,
  Calendar,
  BarChart3,
  PieChart as PieChartIcon,
  Activity,
  Target,
} from "lucide-react";

export default function Analytics() {
  const [timeRange, setTimeRange] = useState("7d");

  // Sample data for charts
  const responseData = [
    { name: "Mon", responses: 45, completions: 38 },
    { name: "Tue", responses: 52, completions: 47 },
    { name: "Wed", responses: 38, completions: 34 },
    { name: "Thu", responses: 67, completions: 58 },
    { name: "Fri", responses: 89, completions: 82 },
    { name: "Sat", responses: 34, completions: 29 },
    { name: "Sun", responses: 28, completions: 24 },
  ];

  const formPerformanceData = [
    { name: "Customer Feedback", responses: 245, completion: 87 },
    { name: "Product Registration", responses: 189, completion: 92 },
    { name: "Event Registration", responses: 156, completion: 78 },
    { name: "Bug Reports", responses: 78, completion: 65 },
    { name: "Contact Form", responses: 234, completion: 89 },
  ];

  const responseSourceData = [
    { name: "Direct Link", value: 45, color: "#8B5CF6" },
    { name: "Social Media", value: 30, color: "#06B6D4" },
    { name: "Email Campaign", value: 15, color: "#10B981" },
    { name: "QR Code", value: 10, color: "#F59E0B" },
  ];

  const deviceData = [
    { name: "Desktop", value: 55, color: "#8B5CF6" },
    { name: "Mobile", value: 35, color: "#06B6D4" },
    { name: "Tablet", value: 10, color: "#10B981" },
  ];

  const trendData = [
    { month: "Jan", responses: 320, completion: 85 },
    { month: "Feb", responses: 450, completion: 88 },
    { month: "Mar", responses: 380, completion: 82 },
    { month: "Apr", responses: 520, completion: 90 },
    { month: "May", responses: 680, completion: 87 },
    { month: "Jun", responses: 750, completion: 89 },
  ];

  const stats = [
    {
      title: "Total Responses",
      value: "2,847",
      change: "+12.5%",
      trend: "up",
      icon: Users,
      description: "This month",
    },
    {
      title: "Completion Rate",
      value: "87.2%",
      change: "+3.2%",
      trend: "up",
      icon: Target,
      description: "Average across all forms",
    },
    {
      title: "Active Forms",
      value: "18",
      change: "+2",
      trend: "up",
      icon: FileText,
      description: "Currently collecting responses",
    },
    {
      title: "Avg. Time",
      value: "3:24",
      change: "-15s",
      trend: "up",
      icon: Clock,
      description: "To complete forms",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
          <p className="text-muted-foreground">
            Track your form performance and user engagement
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <Calendar className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 3 months</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button className="gradient-primary text-white border-0">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="glass hover-lift">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className={`${
                        stat.trend === "up"
                          ? "text-success border-success"
                          : "text-destructive border-destructive"
                      }`}
                    >
                      <TrendingUp className="w-3 h-3 mr-1" />
                      {stat.change}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {stat.description}
                    </span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Response Trends */}
        <Card className="lg:col-span-2 glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary" />
              Response Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={responseData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis
                  dataKey="name"
                  className="text-muted-foreground"
                  fontSize={12}
                />
                <YAxis className="text-muted-foreground" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="responses"
                  stroke="hsl(var(--primary))"
                  fill="hsl(var(--primary))"
                  fillOpacity={0.2}
                />
                <Area
                  type="monotone"
                  dataKey="completions"
                  stroke="hsl(var(--accent))"
                  fill="hsl(var(--accent))"
                  fillOpacity={0.2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Response Sources */}
        <Card className="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChartIcon className="w-5 h-5 text-primary" />
              Response Sources
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={responseSourceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {responseSourceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-4">
              {responseSourceData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm text-muted-foreground">
                      {item.name}
                    </span>
                  </div>
                  <span className="text-sm font-medium">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics */}
      <Tabs defaultValue="forms" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 max-w-md">
          <TabsTrigger value="forms">Forms</TabsTrigger>
          <TabsTrigger value="devices">Devices</TabsTrigger>
          <TabsTrigger value="geographic">Geographic</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="forms" className="space-y-4">
          <Card className="glass">
            <CardHeader>
              <CardTitle>Form Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={formPerformanceData} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis type="number" className="text-muted-foreground" fontSize={12} />
                  <YAxis
                    type="category"
                    dataKey="name"
                    className="text-muted-foreground"
                    fontSize={12}
                    width={120}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="responses" fill="hsl(var(--primary))" radius={4} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="devices" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="glass">
              <CardHeader>
                <CardTitle>Device Usage</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={deviceData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {deviceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="glass">
              <CardHeader>
                <CardTitle>Device Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {deviceData.map((device, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{device.name}</span>
                      <span className="text-sm text-muted-foreground">
                        {device.value}%
                      </span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${device.value}%`,
                          backgroundColor: device.color,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <Card className="glass">
            <CardHeader>
              <CardTitle>6-Month Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis
                    dataKey="month"
                    className="text-muted-foreground"
                    fontSize={12}
                  />
                  <YAxis className="text-muted-foreground" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="responses"
                    stroke="hsl(var(--primary))"
                    strokeWidth={3}
                    dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 6 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="completion"
                    stroke="hsl(var(--accent))"
                    strokeWidth={3}
                    dot={{ fill: "hsl(var(--accent))", strokeWidth: 2, r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}