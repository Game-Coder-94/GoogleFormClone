import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  BarChart3,
  FileText,
  Users,
  TrendingUp,
  Plus,
  Eye,
  Edit,
  Copy,
  Trash2,
} from "lucide-react";

export default function Dashboard() {
  const [forms] = useState([
    {
      id: 1,
      title: "Customer Feedback Survey",
      responses: 245,
      status: "active",
      lastModified: "2 days ago",
    },
    {
      id: 2,
      title: "Employee Satisfaction Form",
      responses: 89,
      status: "draft",
      lastModified: "1 week ago",
    },
    {
      id: 3,
      title: "Product Registration",
      responses: 512,
      status: "active",
      lastModified: "3 days ago",
    },
  ]);

  const stats = [
    {
      title: "Total Forms",
      value: "24",
      change: "+12%",
      icon: FileText,
      trend: "up",
    },
    {
      title: "Total Responses",
      value: "1,847",
      change: "+23%",
      icon: Users,
      trend: "up",
    },
    {
      title: "Completion Rate",
      value: "87.2%",
      change: "+5.4%",
      icon: TrendingUp,
      trend: "up",
    },
    {
      title: "Active Forms",
      value: "18",
      change: "+3",
      icon: BarChart3,
      trend: "up",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's what's happening with your forms.
          </p>
        </div>
        <Button className="gradient-primary text-white border-0 hover:opacity-90 transition-smooth">
          <Plus className="w-4 h-4 mr-2" />
          Create New Form
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="glass hover-lift">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-success font-medium mt-1">
                    {stat.change} from last month
                  </p>
                </div>
                <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Forms */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Recent Forms</span>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {forms.map((form) => (
              <div
                key={form.id}
                className="flex items-center justify-between p-4 rounded-lg border border-card-border hover:bg-secondary/50 transition-smooth"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-primary-light rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">{form.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {form.responses} responses • {form.lastModified}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge
                    variant={form.status === "active" ? "default" : "secondary"}
                    className={
                      form.status === "active"
                        ? "bg-success text-success-foreground"
                        : ""
                    }
                  >
                    {form.status}
                  </Badge>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Copy className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}