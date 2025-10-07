import { Copy, Mail, Link, Check } from "lucide-react";
import { useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface ShareModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  documentTitle?: string;
}

export function ShareModal({ open, onOpenChange, documentTitle }: ShareModalProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Share Document</DialogTitle>
          <DialogDescription>
            Share "{documentTitle || 'this document'}" with others
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Share Link */}
          <div className="space-y-2">
            <Label>Share Link</Label>
            <div className="flex gap-2">
              <Input
                readOnly
                value="https://sidoc.app/docs/q4-financial-report"
                className="flex-1"
              />
              <Button variant="outline" onClick={handleCopy}>
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
          </div>

          {/* Email Invite */}
          <div className="space-y-2">
            <Label htmlFor="email">Invite by Email</Label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter email address..."
                  className="pl-10"
                />
              </div>
              <Select defaultValue="view">
                <SelectTrigger className="w-[120px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="view">Can View</SelectItem>
                  <SelectItem value="edit">Can Edit</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Access Control */}
          <div className="space-y-2">
            <Label>Who has access</Label>
            <div className="border rounded-lg divide-y">
              <div className="p-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-sm">SC</span>
                  </div>
                  <div>
                    <p className="text-sm">Sarah Chen</p>
                    <p className="text-xs text-muted-foreground">sarah.chen@company.com</p>
                  </div>
                </div>
                <Select defaultValue="owner">
                  <SelectTrigger className="w-[100px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="owner">Owner</SelectItem>
                    <SelectItem value="edit">Can Edit</SelectItem>
                    <SelectItem value="view">Can View</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="p-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-sm">MJ</span>
                  </div>
                  <div>
                    <p className="text-sm">Mike Johnson</p>
                    <p className="text-xs text-muted-foreground">mike.j@company.com</p>
                  </div>
                </div>
                <Select defaultValue="edit">
                  <SelectTrigger className="w-[100px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="edit">Can Edit</SelectItem>
                    <SelectItem value="view">Can View</SelectItem>
                    <SelectItem value="remove">Remove</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Link Settings */}
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex items-center gap-2">
              <Link className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">Anyone with the link can view</span>
            </div>
            <Button variant="outline" size="sm">
              Change
            </Button>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button>Send Invite</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
