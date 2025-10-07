import { ArrowLeft, Edit, Share, Download, History, MoreVertical } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { Separator } from "./ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface DocumentViewerProps {
  documentId: number;
  onBack: () => void;
  onEdit: () => void;
  onShare: () => void;
}

export function DocumentViewer({ documentId, onBack, onEdit, onShare }: DocumentViewerProps) {
  const document = {
    title: "Q4 Financial Report",
    author: "Sarah Chen",
    date: "October 5, 2025",
    lastModified: "2 hours ago",
    tags: ["Finance", "Report", "Q4"],
    status: "Published",
    version: "v2.1",
  };

  const versions = [
    { version: "v2.1", date: "Oct 5, 2025", author: "Sarah Chen", note: "Final review updates" },
    { version: "v2.0", date: "Oct 4, 2025", author: "Sarah Chen", note: "Major revision" },
    { version: "v1.5", date: "Oct 3, 2025", author: "Mike Johnson", note: "Added charts" },
  ];

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onEdit}>
            <Edit className="w-4 h-4 mr-2" />
            Edit
          </Button>
          <Button variant="outline" onClick={onShare}>
            <Share className="w-4 h-4 mr-2" />
            Share
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Duplicate</DropdownMenuItem>
              <DropdownMenuItem>Move to...</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Document Info */}
      <div>
        <h1 className="mb-2">{document.title}</h1>
        <div className="flex items-center gap-4 text-muted-foreground">
          <span>By {document.author}</span>
          <span>•</span>
          <span>{document.date}</span>
          <span>•</span>
          <span>Last modified {document.lastModified}</span>
        </div>
        <div className="flex gap-2 mt-4">
          {document.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
          <Badge>{document.status}</Badge>
        </div>
      </div>

      <Separator />

      {/* Main Content */}
      <Card>
        <CardContent className="p-8 prose prose-slate max-w-none">
          <h2>Executive Summary</h2>
          <p>
            This comprehensive financial report provides an in-depth analysis of our Q4 performance,
            highlighting key achievements, challenges, and strategic recommendations for the upcoming quarter.
          </p>
          
          <h2>Financial Overview</h2>
          <p>
            Revenue for Q4 exceeded expectations, reaching $12.5M, representing a 23% increase
            year-over-year. This growth was primarily driven by our enterprise segment, which saw
            a 45% increase in new customer acquisitions.
          </p>

          <h3>Key Metrics</h3>
          <ul>
            <li>Total Revenue: $12.5M (+23% YoY)</li>
            <li>Gross Margin: 68% (+3% from Q3)</li>
            <li>Operating Expenses: $4.2M</li>
            <li>Net Income: $3.8M</li>
            <li>Customer Acquisition Cost: $850 (-15%)</li>
          </ul>

          <h2>Strategic Initiatives</h2>
          <p>
            Our strategic focus on product innovation and customer success has yielded significant
            results. The launch of our new analytics platform contributed to a 30% increase in
            customer engagement metrics.
          </p>

          <h3>Future Outlook</h3>
          <p>
            Looking ahead to Q1 2026, we anticipate continued growth momentum. Our pipeline is
            strong, with projected revenue targets of $14M. Key priorities include expanding our
            enterprise sales team and launching two major product features.
          </p>

          <h2>Recommendations</h2>
          <ol>
            <li>Increase investment in enterprise sales by 25%</li>
            <li>Accelerate product development timeline for AI features</li>
            <li>Expand customer success team to support growth</li>
            <li>Optimize marketing spend based on Q4 performance data</li>
          </ol>
        </CardContent>
      </Card>

      {/* Version History */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <History className="w-5 h-5" />
            <h3>Version History</h3>
          </div>
          <div className="space-y-3">
            {versions.map((v) => (
              <div
                key={v.version}
                className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent/50"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span>{v.version}</span>
                    {v.version === document.version && (
                      <Badge variant="outline">Current</Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {v.author} • {v.date} • {v.note}
                  </p>
                </div>
                <Button variant="ghost" size="sm">
                  Restore
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
