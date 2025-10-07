import { ArrowLeft, Camera, Mail, User, Shield } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";
import { Switch } from "./ui/switch";

interface UserProfileProps {
  onBack: () => void;
}

export function UserProfile({ onBack }: UserProfileProps) {
  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Button>Save Changes</Button>
      </div>

      {/* Profile Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start gap-6">
            <div className="relative">
              <Avatar className="w-24 h-24">
                <AvatarImage src="" alt="User" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
              <Button
                size="icon"
                variant="secondary"
                className="absolute bottom-0 right-0 rounded-full w-8 h-8"
              >
                <Camera className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex-1">
              <h2>Alex Davis</h2>
              <p className="text-muted-foreground">alex.davis@company.com</p>
              <div className="flex gap-2 mt-3">
                <Badge>Admin</Badge>
                <Badge variant="outline">Verified</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Personal Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" defaultValue="Alex" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" defaultValue="Davis" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input id="email" type="email" defaultValue="alex.davis@company.com" className="pl-10" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="role">Job Title</Label>
            <Input id="role" defaultValue="Senior Documentation Manager" />
          </div>
        </CardContent>
      </Card>

      {/* Role & Permissions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Role & Permissions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p>Current Role</p>
                <p className="text-sm text-muted-foreground">
                  Administrator - Full access to all features
                </p>
              </div>
              <Badge>Admin</Badge>
            </div>
            <Separator />
            <div>
              <h4 className="mb-3">Permissions</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="create-docs">Create Documents</Label>
                  <Switch id="create-docs" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="edit-docs">Edit Documents</Label>
                  <Switch id="edit-docs" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="delete-docs">Delete Documents</Label>
                  <Switch id="delete-docs" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="share-docs">Share Documents</Label>
                  <Switch id="share-docs" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="manage-users">Manage Users</Label>
                  <Switch id="manage-users" defaultChecked />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Preferences */}
      <Card>
        <CardHeader>
          <CardTitle>Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="notifications">Email Notifications</Label>
            <Switch id="notifications" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="auto-save">Auto-save Documents</Label>
            <Switch id="auto-save" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="dark-mode">Dark Mode</Label>
            <Switch id="dark-mode" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
