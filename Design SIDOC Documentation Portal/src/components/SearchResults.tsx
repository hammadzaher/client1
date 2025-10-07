import { ArrowLeft, FileText, Filter, Calendar, User as UserIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Card, CardContent } from "./ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface SearchResultsProps {
  searchQuery: string;
  onBack: () => void;
  onViewDocument: (id: number) => void;
}

export function SearchResults({ searchQuery, onBack, onViewDocument }: SearchResultsProps) {
  const results = [
    {
      id: 1,
      title: "Q4 Financial Report",
      snippet: "This comprehensive financial report provides an in-depth analysis of our Q4 performance...",
      author: "Sarah Chen",
      date: "2024-10-05",
      tags: ["Finance", "Report"],
      type: "Document"
    },
    {
      id: 2,
      title: "Product Roadmap 2025",
      snippet: "Strategic planning document outlining our product development priorities for the upcoming year...",
      author: "Mike Johnson",
      date: "2024-10-04",
      tags: ["Product", "Planning"],
      type: "Document"
    },
    {
      id: 3,
      title: "API Documentation v2.0",
      snippet: "Complete technical documentation for our REST API endpoints, authentication, and best practices...",
      author: "Alex Kumar",
      date: "2024-10-03",
      tags: ["Technical", "API"],
      type: "Documentation"
    },
  ];

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <div className="flex-1">
          <h1>Search Results</h1>
          <p className="text-muted-foreground">
            Found {results.length} results for "{searchQuery}"
          </p>
        </div>
      </div>

      {/* Search & Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <Input
              placeholder="Search documents..."
              defaultValue={searchQuery}
              className="flex-1"
            />
            <div className="flex gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="document">Documents</SelectItem>
                  <SelectItem value="report">Reports</SelectItem>
                  <SelectItem value="guide">Guides</SelectItem>
                </SelectContent>
              </Select>
              
              <Select defaultValue="any">
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Tags" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any Tag</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="product">Product</SelectItem>
                  <SelectItem value="technical">Technical</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                More Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <div className="space-y-4">
        {results.map((result) => (
          <Card
            key={result.id}
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => onViewDocument(result.id)}
          >
            <CardContent className="p-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h3 className="truncate">{result.title}</h3>
                    <Badge variant="outline">{result.type}</Badge>
                  </div>
                  <p className="text-muted-foreground mb-3 line-clamp-2">
                    {result.snippet}
                  </p>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <UserIcon className="w-4 h-4" />
                      {result.author}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {result.date}
                    </div>
                    <div className="flex gap-1">
                      {result.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-2">
        <Button variant="outline" disabled>
          Previous
        </Button>
        <Button variant="outline">1</Button>
        <Button variant="outline">2</Button>
        <Button variant="outline">3</Button>
        <Button variant="outline">Next</Button>
      </div>
    </div>
  );
}
