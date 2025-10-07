import { useState } from "react";
import { ArrowLeft, Save, Eye, Upload } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Card, CardContent } from "./ui/card";

interface DocumentEditorProps {
  documentId?: number;
  onBack: () => void;
  onSave: () => void;
}

export function DocumentEditor({ onBack, onSave }: DocumentEditorProps) {
  const [title, setTitle] = useState("Q4 Financial Report");
  const [content, setContent] = useState(`# Executive Summary

This comprehensive financial report provides an in-depth analysis of our Q4 performance, highlighting key achievements, challenges, and strategic recommendations for the upcoming quarter.

## Financial Overview

Revenue for Q4 exceeded expectations, reaching $12.5M, representing a 23% increase year-over-year.

### Key Metrics

- Total Revenue: $12.5M (+23% YoY)
- Gross Margin: 68% (+3% from Q3)
- Operating Expenses: $4.2M
- Net Income: $3.8M

## Strategic Initiatives

Our strategic focus on product innovation and customer success has yielded significant results.`);

  const [tags, setTags] = useState(["Finance", "Report", "Q4"]);

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <div className="flex gap-2">
          <Button variant="outline">
            Save as Draft
          </Button>
          <Button onClick={onSave}>
            <Save className="w-4 h-4 mr-2" />
            Publish
          </Button>
        </div>
      </div>

      {/* Document Title */}
      <div className="space-y-4">
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Document title..."
          className="text-2xl border-0 px-0 focus-visible:ring-0"
        />
        <div className="flex gap-2">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
          <Button variant="outline" size="sm">
            Add Tag
          </Button>
        </div>
      </div>

      {/* Editor */}
      <Tabs defaultValue="edit" className="w-full">
        <TabsList>
          <TabsTrigger value="edit">Edit</TabsTrigger>
          <TabsTrigger value="preview">
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="edit" className="mt-4">
          <Card>
            <CardContent className="p-6">
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Start writing your document..."
                className="min-h-[600px] font-mono resize-none border-0 focus-visible:ring-0"
              />
              <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
                <span>Markdown supported</span>
                <span>•</span>
                <span>Auto-saved 2 minutes ago</span>
                <Button variant="ghost" size="sm" className="ml-auto">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Image
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preview" className="mt-4">
          <Card>
            <CardContent className="p-8 prose prose-slate max-w-none">
              <h1>Executive Summary</h1>
              <p>
                This comprehensive financial report provides an in-depth analysis of our Q4 performance,
                highlighting key achievements, challenges, and strategic recommendations for the upcoming quarter.
              </p>
              
              <h2>Financial Overview</h2>
              <p>
                Revenue for Q4 exceeded expectations, reaching $12.5M, representing a 23% increase
                year-over-year.
              </p>

              <h3>Key Metrics</h3>
              <ul>
                <li>Total Revenue: $12.5M (+23% YoY)</li>
                <li>Gross Margin: 68% (+3% from Q3)</li>
                <li>Operating Expenses: $4.2M</li>
                <li>Net Income: $3.8M</li>
              </ul>

              <h2>Strategic Initiatives</h2>
              <p>
                Our strategic focus on product innovation and customer success has yielded significant results.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
