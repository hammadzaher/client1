import {
  Home,
  FileText,
  Tags,
  Share2,
  Clock,
  Upload,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";

interface AppSidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onUpload: () => void;
}

export function AppSidebar({ currentPage, onNavigate, onUpload }: AppSidebarProps) {
  const menuItems = [
    { icon: Home, label: "Dashboard", id: "dashboard" },
    { icon: FileText, label: "All Documents", id: "documents" },
    { icon: Tags, label: "Tags & Labels", id: "tags" },
    { icon: Share2, label: "Shared", id: "shared" },
    { icon: Clock, label: "Recent", id: "recent" },
  ];

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    onClick={() => onNavigate(item.id)}
                    isActive={currentPage === item.id}
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={onUpload} className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <Upload className="w-4 h-4" />
                  <span>Upload Document</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
