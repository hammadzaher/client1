import { Upload, File, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";

interface UploadModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpload: () => void;
}

export function UploadModal({ open, onOpenChange, onUpload }: UploadModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Upload Document</DialogTitle>
          <DialogDescription>
            Upload a new document to your library. Supported formats: PDF, DOCX, MD, TXT
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Upload Area */}
          <div className="border-2 border-dashed rounded-lg p-8 text-center hover:bg-accent/50 transition-colors cursor-pointer">
            <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <p className="mb-2">Drag and drop your file here</p>
            <p className="text-sm text-muted-foreground mb-4">or</p>
            <Button variant="outline">Browse Files</Button>
          </div>

          {/* File Info */}
          <div className="space-y-2">
            <Label htmlFor="title">Document Title</Label>
            <Input id="title" placeholder="Enter document title..." />
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <Label>Tags</Label>
            <div className="flex gap-2 flex-wrap">
              <Badge variant="secondary">
                Finance
                <X className="w-3 h-3 ml-1 cursor-pointer" />
              </Badge>
              <Badge variant="secondary">
                Report
                <X className="w-3 h-3 ml-1 cursor-pointer" />
              </Badge>
              <Button variant="outline" size="sm">
                Add Tag
              </Button>
            </div>
          </div>

          {/* Preview */}
          <div className="border rounded-lg p-4 bg-accent/30">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded flex items-center justify-center">
                <File className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <p>financial-report.pdf</p>
                <p className="text-sm text-muted-foreground">2.4 MB</p>
              </div>
              <Button variant="ghost" size="icon">
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={() => { onUpload(); onOpenChange(false); }}>
            Upload Document
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
