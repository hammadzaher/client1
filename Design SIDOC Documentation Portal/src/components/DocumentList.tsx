import { useState } from "react";
import { FileText, MoreVertical, Eye, Edit, Trash2, Share, Filter } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Card, CardContent } from "./ui/card";

interface DocumentListProps {
  onViewDocument: (id: number) => void;
  onEditDocument: (id: number) => void;
  onDeleteDocument: (id: number) => void;
  onShareDocument: (id: number) => void;
}

export function DocumentList({
  onViewDocument,
  onEditDocument,
  onDeleteDocument,
  onShareDocument,
}: DocumentListProps) {
  const [view, setView] = useState<"table" | "card">("table");
  const [sortBy, setSortBy] = useState("date");

  const documents = [
    { id: 1, title: "Q4 Financial Report", author: "Sarah Chen", date: "2024-10-05", tags: ["Finance", "Report"], status: "Published" },
    { id: 2, title: "Product Roadmap 2025", author: "Mike Johnson", date: "2024-10-04", tags: ["Product", "Planning"], status: "Draft" },
    { id: 3, title: "API Documentation v2.0", author: "Alex Kumar", date: "2024-10-03", tags: ["Technical", "API"], status: "Published" },
    { id: 4, title: "Marketing Strategy", author: "Emily Davis", date: "2024-10-02", tags: ["Marketing"], status: "Published" },
    { id: 5, title: "Employee Handbook 2025", author: "HR Department", date: "2024-10-01", tags: ["HR", "Policy"], status: "Draft" },
    { id: 6, title: "Q3 Performance Review", author: "Sarah Chen", date: "2024-09-30", tags: ["Finance", "Report"], status: "Published" },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1>All Documents</h1>
          <p className="text-muted-foreground">Manage and organize your documentation</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      {/* Filters & Sort */}
      <div className="flex gap-4 items-center">
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="date">Date Modified</SelectItem>
            <SelectItem value="title">Title</SelectItem>
            <SelectItem value="author">Author</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex gap-1 ml-auto">
          <Button
            variant={view === "table" ? "default" : "outline"}
            size="sm"
            onClick={() => setView("table")}
          >
            Table
          </Button>
          <Button
            variant={view === "card" ? "default" : "outline"}
            size="sm"
            onClick={() => setView("card")}
          >
            Cards
          </Button>
        </div>
      </div>

      {/* Table View */}
      {view === "table" && (
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Date Modified</TableHead>
                <TableHead>Tags</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {documents.map((doc) => (
                <TableRow key={doc.id} className="cursor-pointer hover:bg-accent/50">
                  <TableCell onClick={() => onViewDocument(doc.id)}>
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-muted-foreground" />
                      {doc.title}
                    </div>
                  </TableCell>
                  <TableCell>{doc.author}</TableCell>
                  <TableCell>{doc.date}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {doc.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={doc.status === "Published" ? "default" : "outline"}>
                      {doc.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onViewDocument(doc.id)}>
                          <Eye className="w-4 h-4 mr-2" />
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onEditDocument(doc.id)}>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onShareDocument(doc.id)}>
                          <Share className="w-4 h-4 mr-2" />
                          Share
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => onDeleteDocument(doc.id)}
                          className="text-destructive"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Card View */}
      {view === "card" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {documents.map((doc) => (
            <Card
              key={doc.id}
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onViewDocument(doc.id)}
            >
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6 text-primary" />
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onViewDocument(doc.id)}>
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onEditDocument(doc.id)}>
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onShareDocument(doc.id)}>
                        <Share className="w-4 h-4 mr-2" />
                        Share
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onDeleteDocument(doc.id)}
                        className="text-destructive"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <h3 className="mb-2">{doc.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {doc.author} • {doc.date}
                </p>
                <div className="flex gap-2 flex-wrap">
                  {doc.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
