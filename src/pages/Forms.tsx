import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Plus,
  Search,
  Filter,
  Grid3X3,
  List,
  Eye,
  Edit,
  Copy,
  Trash2,
  MoreVertical,
  Calendar,
  Users,
} from "lucide-react";

export default function Forms() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");

  const forms = [
    {
      id: 1,
      title: "Customer Feedback Survey",
      description: "Collect valuable feedback from our customers",
      responses: 245,
      status: "active",
      created: "2024-01-15",
      lastModified: "2 days ago",
      category: "feedback",
    },
    {
      id: 2,
      title: "Employee Satisfaction Form",
      description: "Annual employee satisfaction assessment",
      responses: 89,
      status: "draft",
      created: "2024-01-20",
      lastModified: "1 week ago",
      category: "hr",
    },
    {
      id: 3,
      title: "Product Registration",
      description: "New product registration and warranty form",
      responses: 512,
      status: "active",
      created: "2024-01-10",
      lastModified: "3 days ago",
      category: "product",
    },
    {
      id: 4,
      title: "Event Registration",
      description: "Registration form for upcoming webinar",
      responses: 156,
      status: "active",
      created: "2024-01-25",
      lastModified: "5 hours ago",
      category: "event",
    },
    {
      id: 5,
      title: "Bug Report Form",
      description: "Report bugs and technical issues",
      responses: 78,
      status: "archived",
      created: "2024-01-05",
      lastModified: "2 weeks ago",
      category: "support",
    },
    {
      id: 6,
      title: "Contact Us Form",
      description: "General inquiries and contact information",
      responses: 324,
      status: "active",
      created: "2024-01-12",
      lastModified: "1 day ago",
      category: "general",
    },
  ];

  const filteredForms = forms.filter((form) =>
    form.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    form.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-success text-success-foreground";
      case "draft":
        return "bg-warning text-warning-foreground";
      case "archived":
        return "bg-muted text-muted-foreground";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  const FormCard = ({ form }: { form: typeof forms[0] }) => (
    <Card className="glass hover-lift group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold mb-2">{form.title}</CardTitle>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {form.description}
            </p>
          </div>
          <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
            <MoreVertical className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center justify-between mb-4">
          <Badge className={getStatusColor(form.status)}>
            {form.status}
          </Badge>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              {form.responses}
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {form.lastModified}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="flex-1">
            <Eye className="w-4 h-4 mr-2" />
            View
          </Button>
          <Button variant="outline" size="sm" className="flex-1">
            <Edit className="w-4 h-4 mr-2" />
            Edit
          </Button>
          <Button variant="ghost" size="sm">
            <Copy className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const FormListItem = ({ form }: { form: typeof forms[0] }) => (
    <div className="flex items-center justify-between p-4 rounded-lg border border-card-border hover:bg-secondary/50 transition-smooth group">
      <div className="flex items-center gap-4 flex-1">
        <div className="w-10 h-10 bg-primary-light rounded-lg flex items-center justify-center">
          <Users className="w-5 h-5 text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="font-medium text-foreground">{form.title}</h3>
          <p className="text-sm text-muted-foreground">{form.description}</p>
        </div>
        <div className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
          <span>{form.responses} responses</span>
          <span>{form.lastModified}</span>
          <Badge className={getStatusColor(form.status)}>
            {form.status}
          </Badge>
        </div>
      </div>
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
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
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Forms</h1>
          <p className="text-muted-foreground">
            Create, manage, and organize your forms
          </p>
        </div>
        <Button className="gradient-primary text-white border-0 hover:opacity-90 transition-smooth">
          <Plus className="w-4 h-4 mr-2" />
          Create New Form
        </Button>
      </div>

      {/* Filters & Search */}
      <Card className="glass">
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search forms..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <div className="flex items-center border border-card-border rounded-lg p-1">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <Grid3X3 className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Forms Display */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5 max-w-md">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="draft">Draft</TabsTrigger>
          <TabsTrigger value="archived">Archived</TabsTrigger>
          <TabsTrigger value="shared">Shared</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredForms.map((form) => (
                <FormCard key={form.id} form={form} />
              ))}
            </div>
          ) : (
            <Card className="glass">
              <CardContent className="p-0">
                <div className="space-y-1">
                  {filteredForms.map((form) => (
                    <FormListItem key={form.id} form={form} />
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}