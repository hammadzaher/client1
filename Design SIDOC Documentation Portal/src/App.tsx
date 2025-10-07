import { useState } from "react";
import { SidebarProvider } from "./components/ui/sidebar";
import { TopNav } from "./components/TopNav";
import { AppSidebar } from "./components/AppSidebar";
import { Dashboard } from "./components/Dashboard";
import { DocumentList } from "./components/DocumentList";
import { DocumentViewer } from "./components/DocumentViewer";
import { DocumentEditor } from "./components/DocumentEditor";
import { UserProfile } from "./components/UserProfile";
import { SearchResults } from "./components/SearchResults";
import { UploadModal } from "./components/UploadModal";
import { DeleteModal } from "./components/DeleteModal";
import { ShareModal } from "./components/ShareModal";
import { Toaster } from "./components/ui/sonner";
import { toast } from "sonner@2.0.3";

type Page = "dashboard" | "documents" | "tags" | "shared" | "recent" | "viewer" | "editor" | "profile" | "search";

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("dashboard");
  const [selectedDocumentId, setSelectedDocumentId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Modal states
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [documentToDelete, setDocumentToDelete] = useState<number | null>(null);
  const [documentToShare, setDocumentToShare] = useState<number | null>(null);

  const handleNavigate = (page: string) => {
    setCurrentPage(page as Page);
  };

  const handleSearch = (query: string) => {
    if (query.trim()) {
      setSearchQuery(query);
      setCurrentPage("search");
    }
  };

  const handleViewDocument = (id: number) => {
    setSelectedDocumentId(id);
    setCurrentPage("viewer");
  };

  const handleEditDocument = (id: number) => {
    setSelectedDocumentId(id);
    setCurrentPage("editor");
  };

  const handleDeleteDocument = (id: number) => {
    setDocumentToDelete(id);
    setDeleteModalOpen(true);
  };

  const handleShareDocument = (id: number) => {
    setDocumentToShare(id);
    setShareModalOpen(true);
  };

  const confirmDelete = () => {
    toast.success("Document deleted successfully");
    setDeleteModalOpen(false);
    setDocumentToDelete(null);
  };

  const handleUpload = () => {
    toast.success("Document uploaded successfully");
  };

  const handleSave = () => {
    toast.success("Document saved successfully");
    setCurrentPage("documents");
  };

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return (
          <Dashboard
            onNavigate={handleNavigate}
            onUpload={() => setUploadModalOpen(true)}
            onViewDocument={handleViewDocument}
          />
        );
      case "documents":
      case "tags":
      case "shared":
      case "recent":
        return (
          <DocumentList
            onViewDocument={handleViewDocument}
            onEditDocument={handleEditDocument}
            onDeleteDocument={handleDeleteDocument}
            onShareDocument={handleShareDocument}
          />
        );
      case "viewer":
        return (
          <DocumentViewer
            documentId={selectedDocumentId!}
            onBack={() => setCurrentPage("documents")}
            onEdit={() => handleEditDocument(selectedDocumentId!)}
            onShare={() => handleShareDocument(selectedDocumentId!)}
          />
        );
      case "editor":
        return (
          <DocumentEditor
            documentId={selectedDocumentId || undefined}
            onBack={() => setCurrentPage("documents")}
            onSave={handleSave}
          />
        );
      case "profile":
        return <UserProfile onBack={() => setCurrentPage("dashboard")} />;
      case "search":
        return (
          <SearchResults
            searchQuery={searchQuery}
            onBack={() => setCurrentPage("dashboard")}
            onViewDocument={handleViewDocument}
          />
        );
      default:
        return (
          <Dashboard
            onNavigate={handleNavigate}
            onUpload={() => setUploadModalOpen(true)}
            onViewDocument={handleViewDocument}
          />
        );
    }
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-background">
        <AppSidebar
          currentPage={currentPage}
          onNavigate={handleNavigate}
          onUpload={() => setUploadModalOpen(true)}
        />
        <div className="flex-1 flex flex-col overflow-hidden">
          <TopNav
            onSearch={handleSearch}
            onProfileClick={() => setCurrentPage("profile")}
          />
          <main className="flex-1 overflow-auto">
            {renderPage()}
          </main>
        </div>
      </div>

      {/* Modals */}
      <UploadModal
        open={uploadModalOpen}
        onOpenChange={setUploadModalOpen}
        onUpload={handleUpload}
      />
      <DeleteModal
        open={deleteModalOpen}
        onOpenChange={setDeleteModalOpen}
        onConfirm={confirmDelete}
        documentTitle="Q4 Financial Report"
      />
      <ShareModal
        open={shareModalOpen}
        onOpenChange={setShareModalOpen}
        documentTitle="Q4 Financial Report"
      />
      
      <Toaster />
    </SidebarProvider>
  );
}
