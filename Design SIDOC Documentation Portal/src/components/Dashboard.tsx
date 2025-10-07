import { FileText, Clock, Share2, TrendingUp, Plus, Upload } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

interface DashboardProps {
  onNavigate: (page: string) => void;
  onUpload: () => void;
  onViewDocument: (id: number) => void;
}

export function Dashboard({ onNavigate, onUpload, onViewDocument }: DashboardProps) {
  const stats = [
    { icon: FileText, label: "Total Documents", value: "248", color: "text-blue-600" },
    { icon: Share2, label: "Shared Documents", value: "42", color: "text-green-600" },
    { icon: Clock, label: "Recent Activity", value: "18", color: "text-orange-600" },
    { icon: TrendingUp, label: "This Week", value: "+12", color: "text-purple-600" },
  ];

  const recentDocs = [
    { id: 1, title: "Q4 Financial Report", author: "Sarah Chen", date: "2 hours ago", tags: ["Finance", "Report"] },
    { id: 2, title: "Product Roadmap 2025", author: "Mike Johnson", date: "5 hours ago", tags: ["Product", "Planning"] },
    { id: 3, title: "API Documentation v2.0", author: "Alex Kumar", date: "1 day ago", tags: ["Technical", "API"] },
    { id: 4, title: "Marketing Strategy", author: "Emily Davis", date: "2 days ago", tags: ["Marketing"] },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1>Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's what's happening.</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={onUpload}>
            <Upload className="w-4 h-4 mr-2" />
            Upload Document
          </Button>
          <Button variant="outline" onClick={() => onNavigate("documents")}>
            <Plus className="w-4 h-4 mr-2" />
            New Document
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm text-muted-foreground">{stat.label}</CardTitle>
              <stat.icon className={`w-4 h-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Documents</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentDocs.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center justify-between p-4 rounded-lg border hover:bg-accent/50 cursor-pointer transition-colors"
                onClick={() => onViewDocument(doc.id)}
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="mb-1">{doc.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {doc.author} • {doc.date}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  {doc.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <Button variant="ghost" className="w-full mt-4" onClick={() => onNavigate("documents")}>
            View All Documents
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
